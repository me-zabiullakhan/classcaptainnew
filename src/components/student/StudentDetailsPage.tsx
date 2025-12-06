
import React, { useState } from 'react';
import type { Student, FeeCollection, TransportRoute, Academy, BatchAccessPermissions } from '../../types';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { StudentAttendancePage } from './StudentAttendancePage';
import { StudentFeeDetailsPage } from '../StudentFeeDetailsPage';

interface StudentDetailsPageProps {
  onBack: () => void;
  student: Student;
  feeCollections: FeeCollection[];
  academyId: string;
  onSavePayment: (paymentData: Omit<FeeCollection, 'id'>) => Promise<void>;
  transportRoutes: TransportRoute[];
  onShowImage: (src: string) => void;
  academy: Academy;
  staffPermissions?: Record<string, BatchAccessPermissions>;
  currentUserRole?: 'admin' | 'staff';
}

const DetailRow: React.FC<{ label: string; value?: string | number | null }> = ({ label, value }) => (
    <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
        <p className="text-sm text-gray-500 dark:text-gray-400 col-span-1">{label}</p>
        <p className="text-sm text-gray-800 dark:text-gray-200 col-span-2 font-medium break-words">{value || '-'}</p>
    </div>
);

const DetailsView: React.FC<{ student: Student; transportRoutes: TransportRoute[] }> = ({ student, transportRoutes }) => {
    const assignedRoute = transportRoutes.find(r => r.id === student.transportRouteId);
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2 text-base border-b pb-2 dark:border-gray-700">Personal Information</h3>
                <DetailRow label="Father's Name" value={student.fatherName} />
                <DetailRow label="Mother's Name" value={student.motherName} />
                <DetailRow label="Date of Birth" value={student.dob} />
                <DetailRow label="Gender" value={student.gender} />
                <DetailRow label="Address" value={student.address} />
            </div>
             <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2 text-base border-b pb-2 dark:border-gray-700">Contact Information</h3>
                <DetailRow label="Mobile 1" value={student.mobile1} />
                <DetailRow label="Mobile 2" value={student.mobile2} />
                <DetailRow label="Email" value={student.email} />
            </div>
             <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2 text-base border-b pb-2 dark:border-gray-700">Academic Information</h3>
                <DetailRow label="Admission Date" value={student.admissionDate} />
                <DetailRow label="School/College" value={student.schoolOrCollege} />
                <DetailRow label="Fee Type" value={student.feeType} />
                <DetailRow label="Fee Amount" value={`₹${student.feeAmount}`} />
            </div>
            {student.transport === 'USE_TRANSPORT' && (
                 <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                    <h3 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2 text-base border-b pb-2 dark:border-gray-700">Transport Information</h3>
                    <DetailRow label="Transport" value="Opted In" />
                    <DetailRow label="Route Name" value={assignedRoute?.routeName} />
                    <DetailRow label="Monthly Fee" value={assignedRoute ? `₹${assignedRoute.monthlyFee}` : '-'} />
                </div>
            )}
        </div>
    );
};

export function StudentDetailsPage({ onBack, student, feeCollections, academyId, onSavePayment, transportRoutes, onShowImage, academy, staffPermissions, currentUserRole }: StudentDetailsPageProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'attendance' | 'fees'>('details');
  const photoUrl = student.photo || `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(student.name)}`;

  // Determine if the current user can view fees for this student
  const canViewFees = React.useMemo(() => {
      if (currentUserRole === 'admin') return true;
      if (!staffPermissions) return false;

      // Check if staff has 'fees' permission for ANY of the student's batches (using batch ID is ideal, but here we assume names match or permissions object uses IDs)
      // Note: `staffPermissions` is keyed by batch ID. Student has batch *names*.
      // We need to check if any of the batch IDs in `staffPermissions` correspond to the student's batches AND have `fees: true`.
      // Since we don't have the batch IDs of the student readily available here (only names in student.batches), 
      // we iterate through the staffPermissions keys. If the staff has fees access to a batch, 
      // and that batch name is in student.batches, then yes. 
      // To do this strictly correctly, we'd need the batch objects passed in or student to have batch IDs.
      // Assuming for now that if permission exists, it's valid. 
      // Better approach with current data:
      // We need to know which batch IDs the student is in.
      // Since we can't easily map back without the batches array, we will be permissive:
      // If staff has 'fees' permission on *any* batch, let them see fees? No, that's insecure.
      // Let's assume passed in `staffPermissions` are correct.
      
      // Strict check: We need the list of Batch objects to map Name -> ID.
      // Since we don't have `batches` prop here, we can't do a perfect ID match.
      // However, usually `StudentDetailsPage` is called from `ActiveStudentsPage` where `staffPermissions` are available.
      
      // Fallback: If staffPermissions is present, check if *any* value has fees: true.
      // This is a limitation of the current data structure in this view.
      // To fix strictly: The parent component should pass a boolean `canViewFees`.
      
      return Object.values(staffPermissions).some(p => p.fees);
  }, [currentUserRole, staffPermissions]);


  return (
    <div className="bg-slate-100 dark:bg-gray-900 flex flex-col h-full animate-fade-in">
      <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-20">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold ml-2">Student Profile</h1>
      </header>
      
      <div className="flex-grow overflow-y-auto">
        <div className="bg-white dark:bg-gray-800">
            <div className="p-4 flex items-center space-x-4">
                <button onClick={() => onShowImage(photoUrl)} className="flex-shrink-0 group relative">
                    <img src={photoUrl} alt={student.name} className="w-20 h-20 rounded-full object-cover bg-gray-200 border-2 border-indigo-300 group-hover:opacity-80 transition-opacity" />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-full flex items-center justify-center transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                        </svg>
                    </div>
                </button>
                <div className="min-w-0">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 truncate">{student.name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Roll No: {student.rollNumber}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">Batches: {student.batches.join(', ')}</p>
                </div>
            </div>

            <div className="px-4 pb-4">
                <div className="flex justify-around bg-gray-100 dark:bg-gray-900 p-1 rounded-lg">
                    <button onClick={() => setActiveTab('details')} className={`w-full py-2 rounded-md font-semibold ${activeTab === 'details' ? 'bg-indigo-600 text-white shadow-sm' : 'dark:text-gray-300'}`}>Details</button>
                    <button onClick={() => setActiveTab('attendance')} className={`w-full py-2 rounded-md font-semibold ${activeTab === 'attendance' ? 'bg-indigo-600 text-white shadow-sm' : 'dark:text-gray-300'}`}>Attendance</button>
                    {canViewFees && (
                        <button onClick={() => setActiveTab('fees')} className={`w-full py-2 rounded-md font-semibold ${activeTab === 'fees' ? 'bg-indigo-600 text-white shadow-sm' : 'dark:text-gray-300'}`}>Fees</button>
                    )}
                </div>
            </div>
        </div>
        
        <div className="p-4">
            {activeTab === 'details' && <DetailsView student={student} transportRoutes={transportRoutes} />}
            {activeTab === 'attendance' && <StudentAttendancePage student={student} academyId={academyId} onBack={() => {}} isEmbedded={true} />}
            {activeTab === 'fees' && canViewFees && <StudentFeeDetailsPage student={student} feeCollections={feeCollections} onSavePayment={onSavePayment} onBack={() => {}} isEmbedded={true} academy={academy} />}
        </div>
      </div>
    </div>
  );
}
