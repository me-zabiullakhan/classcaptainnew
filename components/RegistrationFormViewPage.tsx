
import React from 'react';
import type { Student } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { MoreVertIcon } from './icons/MoreVertIcon';
import { LogoIcon } from './icons/LogoIcon';

const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '-';
    // Input is YYYY-MM-DD
    const [year, month, day] = dateString.split('-');
    if (!year || !month || !day) return dateString;
    // Return DD/MM/YYYY
    return `${day}/${month}/${year}`;
};

const FormRow = ({ label, value }: { label: string, value?: string | number | null }) => (
    <div className="grid grid-cols-3 gap-4 py-2 border-b border-gray-200">
        <p className="text-sm text-gray-600 font-medium col-span-1">{label}</p>
        <p className="text-sm text-gray-800 col-span-2">{value || '-'}</p>
    </div>
);

export function RegistrationFormViewPage({ onBack, student }: { onBack: () => void; student: Student }) {
    const [menuOpen, setMenuOpen] = React.useState(false);

    const handlePrint = () => {
        setMenuOpen(false);
        window.print();
    };
    
    return (
        <div className="bg-slate-200 min-h-screen">
            <header className="no-print bg-indigo-700 text-white p-3 flex items-center justify-between shadow-md sticky top-0 z-10">
                <div className="flex items-center">
                    <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-bold ml-2">Registration Form</h1>
                </div>
                <div className="relative">
                     <button onClick={() => setMenuOpen(prev => !prev)} className="p-1 rounded-full hover:bg-indigo-800">
                        <MoreVertIcon className="w-6 h-6" />
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                            <button onClick={handlePrint} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Download PDF
                            </button>
                        </div>
                    )}
                </div>
            </header>
            
            <main className="p-2 sm:p-4 md:p-8">
                <div className="printable-form bg-white max-w-4xl mx-auto p-8 shadow-2xl font-sans" id="registration-form">
                    {/* Form Header */}
                    <div className="flex justify-between items-start pb-4 border-b-2 border-gray-500">
                        <div className="flex items-center space-x-4">
                            <LogoIcon className="w-16 h-16 text-indigo-600" />
                            <div>
                                <h1 className="text-2xl font-extrabold text-gray-800 tracking-wider">CLASS CAPTAIN</h1>
                                <p className="text-xs text-gray-500">Institute Management System</p>
                            </div>
                        </div>
                         <div className="text-right text-xs text-gray-600">
                            <p>admin@classcaptain.com</p>
                            <p>+91 12345 67890</p>
                            <p>123 Academy Lane, Education City, India</p>
                        </div>
                    </div>
                    
                    <h2 className="text-center text-xl font-bold text-gray-700 my-6 underline underline-offset-4">STUDENT REGISTRATION FORM</h2>
                    
                    {/* Student Photo and Main Details */}
                    <div className="flex flex-col sm:flex-row gap-8 mb-8">
                        <div className="flex-grow space-y-2">
                             <FormRow label="Student Name" value={student.name} />
                             <FormRow label="Father's Name" value={student.fatherName} />
                             <FormRow label="Mother's Name" value={student.motherName} />
                             <FormRow label="Roll Number" value={student.rollNumber} />
                             <FormRow label="Student ID" value={student.id} />
                        </div>
                        <div className="w-32 h-40 border-2 border-gray-300 flex items-center justify-center text-gray-400 text-sm bg-gray-50 flex-shrink-0">
                            {student.photo ? <img src={student.photo} alt="Student" className="w-full h-full object-cover"/> : "Affix Photo"}
                        </div>
                    </div>
                    
                    {/* Personal & Contact Details */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-indigo-700 mb-2 border-b pb-1">Personal & Contact Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                            <FormRow label="Date of Birth" value={formatDate(student.dob)} />
                            <FormRow label="Gender" value={student.gender} />
                            <FormRow label="Mobile Number 1" value={student.mobile1} />
                            <FormRow label="Mobile Number 2" value={student.mobile2} />
                            <FormRow label="Address" value={student.address} />
                            <FormRow label="ID Number" value={student.idNumber} />
                        </div>
                    </div>

                    {/* Academic Details */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-indigo-700 mb-2 border-b pb-1">Academic Details</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                            <FormRow label="Admission Date" value={formatDate(student.admissionDate)} />
                            <FormRow label="Enrolled Batches" value={student.batches.join(', ')} />
                            <FormRow label="Fee Type" value={student.feeType} />
                            <FormRow label="Fee Amount" value={`₹${student.feeAmount}`} />
                            <FormRow label="Transport" value={student.transport === 'USE_TRANSPORT' ? 'Opted In' : 'Not Opted'} />
                         </div>
                    </div>

                    {/* Footer with Signatures */}
                    <div className="pt-16 mt-8 text-sm">
                        <div className="flex justify-between items-end">
                            <div className="text-center">
                                <div className="w-24 h-24 border-2 border-dashed border-gray-400 flex items-center justify-center">
                                    <p className="text-xs text-gray-500">Academy Seal</p>
                                </div>
                                <p className="mt-2 pt-2 border-t-2 border-gray-800 font-semibold">Authorised Signatory</p>
                            </div>
                            <div className="space-y-10">
                                <div className="text-center">
                                    <div className="w-48 h-10 border-b-2 border-gray-800"></div>
                                    <p className="mt-1 font-semibold">Parent/Guardian Signature</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-48 h-10 border-b-2 border-gray-800"></div>
                                    <p className="mt-1 font-semibold">Student Signature</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
