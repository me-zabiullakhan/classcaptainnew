
import React from 'react';
import type { Batch, Student, AttendanceStatus, Academy } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { InfoIcon } from './icons/InfoIcon';
import { MoreVertIcon } from './icons/MoreVertIcon';
import { db } from '../firebaseConfig';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { XCircleIcon } from './icons/XCircleIcon';
import { UserIcon } from './icons/UserIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { BatchesIcon } from './icons/BatchesIcon';
import { XMarkIcon } from './icons/XMarkIcon';
import { SendAttendanceSmsModal } from './SendAttendanceSmsModal';
import { LoadingSpinner } from './LoadingSpinner';
import { EyeIcon } from './icons/EyeIcon';

interface TakeAttendancePageProps {
  onBack: () => void;
  batch: Batch;
  students: Student[];
  academy: Academy;
  isDemoMode: boolean;
  onShowImage: (src: string) => void;
  readOnly?: boolean;
}

const StudentInfoModal: React.FC<{ student: Student, onClose: () => void, onShowImage: (src: string) => void }> = ({ student, onClose, onShowImage }) => {
    const photoUrl = student.photo || `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(student.name)}`;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 pt-14 p-6 rounded-2xl shadow-lg w-full max-w-sm mx-auto text-left relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Close">
                    <XMarkIcon className="w-6 h-6" />
                </button>
                
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <button onClick={() => onShowImage(photoUrl)} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full">
                        <img src={photoUrl} alt={student.name} className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg bg-gray-200" />
                    </button>
                </div>
                
                <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-3">{student.name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Student ID: {student.rollNumber}</p>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <UserIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0"/>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Father's Name</p>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">{student.fatherName}</p>
                        </div>
                    </div>
                     <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <PhoneIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0"/>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Contact Number</p>
                            <a href={`tel:${student.mobile1}`} className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">{student.mobile1}</a>
                        </div>
                    </div>
                     <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <BatchesIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0"/>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Batches</p>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">{student.batches.join(', ')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const attendanceStatuses: AttendanceStatus[] = ['Present', 'Absent', 'Leave', 'Holiday'];

const StatusButton: React.FC<{ status: AttendanceStatus, isActive: boolean, onClick: () => void, disabled?: boolean }> = ({ status, isActive, onClick, disabled }) => {
    const getButtonColors = (status: AttendanceStatus, active: boolean, disabled: boolean) => {
        let base = 'px-3 py-1 text-xs rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 shadow-sm flex-grow text-center';
        
        if (disabled && !active) {
            return `${base} bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200`;
        }
        if (disabled && active) {
             base += ' cursor-not-allowed opacity-80';
        }

        switch (status) {
            case 'Present':
                return active ? `${base} bg-green-600 text-white focus:ring-green-500` : `${base} bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-500`;
            case 'Absent':
                return active ? `${base} bg-red-600 text-white focus:ring-red-500` : `${base} bg-red-100 text-red-800 hover:bg-red-200 focus:ring-red-500`;
            case 'Leave':
                return active ? `${base} bg-yellow-500 text-white focus:ring-yellow-400` : `${base} bg-yellow-100 text-yellow-800 hover:bg-yellow-200 focus:ring-yellow-400`;
            case 'Holiday':
                return active ? `${base} bg-purple-600 text-white focus:ring-purple-500` : `${base} bg-purple-100 text-purple-800 hover:bg-purple-200 focus:ring-purple-500`;
            case 'Not Set':
            default:
                return active ? `${base} bg-gray-600 text-white focus:ring-gray-500` : `${base} bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500`;
        }
    };
    return (
        <button onClick={onClick} disabled={disabled} className={getButtonColors(status, isActive, !!disabled)}>
            {status}
        </button>
    );
};

const StudentAttendanceCard: React.FC<{ student: Student, batch: Batch, status: AttendanceStatus, onStatusChange: (studentId: string, status: AttendanceStatus) => void, onShowInfo: (student: Student) => void, readOnly?: boolean }> = ({ student, batch, status, onStatusChange, onShowInfo, readOnly }) => {
    return (
        <div className="bg-white p-3 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-3">
                <div className="flex-1 min-w-0">
                    <p className="text-sm text-indigo-700 font-semibold truncate">{student.rollNumber || student.id}</p>
                    <p className="text-base font-bold text-gray-800 truncate">{student.name}</p>
                    <p className="text-xs text-gray-500 truncate">{batch.name}</p>
                </div>
                <button onClick={() => onShowInfo(student)} className="text-indigo-600 hover:text-indigo-800 transition-colors p-1 ml-2 rounded-full flex-shrink-0">
                    <InfoIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="flex space-x-1.5">
                {attendanceStatuses.map(s => (
                    <StatusButton key={s} status={s} isActive={status === s} onClick={() => onStatusChange(student.id, s)} disabled={readOnly} />
                ))}
            </div>
        </div>
    );
};

export function TakeAttendancePage({ onBack, batch, students, academy, isDemoMode, onShowImage, readOnly = false }: TakeAttendancePageProps): React.ReactNode {
    const [currentDate, setCurrentDate] = React.useState(new Date());
    const [attendance, setAttendance] = React.useState<Record<string, AttendanceStatus>>({});
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [savingError, setSavingError] = React.useState<string | null>(null);
    const [retryTrigger, setRetryTrigger] = React.useState(0);
    const [selectedStudentForInfo, setSelectedStudentForInfo] = React.useState<Student | null>(null);
    const [isSmsModalOpen, setIsSmsModalOpen] = React.useState(false);

    const studentsInBatch = React.useMemo(() => 
        students.filter(s => s.isActive && Array.isArray(s.batches) && s.batches.some(bName => bName.trim() === batch.name.trim())),
        [students, batch.name]
    );

    const getFormattedDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    const todayTimestamp = new Date().setHours(0, 0, 0, 0);
    const currentTimestamp = new Date(currentDate).setHours(0, 0, 0, 0);
    const isTodayOrFuture = currentTimestamp >= todayTimestamp;


    React.useEffect(() => {
        if (isDemoMode) {
            const initialState: Record<string, AttendanceStatus> = {};
            studentsInBatch.forEach(s => { initialState[s.id] = 'Not Set'; });
            setAttendance(initialState);
            setIsLoading(false);
            return;
        }

        if (!academy.id || !batch.id) return;

        setIsLoading(true);
        setError(null);
        setSavingError(null);
        const dateString = getFormattedDate(currentDate);
        const attendanceRef = doc(db, `academies/${academy.id}/batches/${batch.id}/attendance`, dateString);

        const unsubscribe = onSnapshot(attendanceRef, (docSnap) => {
            const fetchedData = docSnap.data() || {};
            const newAttendanceState: Record<string, AttendanceStatus> = {};
            studentsInBatch.forEach(s => {
                newAttendanceState[s.id] = fetchedData[s.id] || 'Not Set';
            });
            setAttendance(newAttendanceState);
            setIsLoading(false);
        }, (err) => {
            console.error("Error fetching attendance:", err);
            if (err.code === 'unavailable') {
                setError("You seem to be offline. Please check your connection.");
            } else {
                setError("Could not load attendance data. Please try again.");
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [currentDate, batch.id, academy.id, studentsInBatch, isDemoMode, retryTrigger]);


    const handleDateChange = (direction: 'prev' | 'next') => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
            return newDate;
        });
    };

    const handleStatusChange = async (studentId: string, status: AttendanceStatus) => {
        if (readOnly) return;
        
        setSavingError(null);
        const oldStatus = attendance[studentId];
        setAttendance(prev => ({ ...prev, [studentId]: status }));

        if (isDemoMode) return;

        try {
            const dateString = getFormattedDate(currentDate);
            const attendanceRef = doc(db, `academies/${academy.id}/batches/${batch.id}/attendance`, dateString);
            await setDoc(attendanceRef, { [studentId]: status }, { merge: true });
        } catch (error) {
            console.error("Failed to save attendance:", error);
            setAttendance(prev => ({...prev, [studentId]: oldStatus })); // Revert on error
            setSavingError("Failed to save. Check your connection.");
            setTimeout(() => setSavingError(null), 3000);
        }
    };

    const handleSetAll = async (status: AttendanceStatus) => {
        if (readOnly) return;

        setSavingError(null);
        const oldAttendance = { ...attendance };
        const newAttendance: Record<string, AttendanceStatus> = {};
        studentsInBatch.forEach(s => { newAttendance[s.id] = status; });
        setAttendance(newAttendance);

        if (isDemoMode) return;

        try {
            const dateString = getFormattedDate(currentDate);
            const attendanceRef = doc(db, `academies/${academy.id}/batches/${batch.id}/attendance`, dateString);
            await setDoc(attendanceRef, newAttendance, { merge: true });
        } catch (error) {
            console.error("Failed to set all attendance:", error);
            setAttendance(oldAttendance);
            setSavingError("Failed to save. Check your connection.");
            setTimeout(() => setSavingError(null), 3000);
        }
    };
    
    const handleRetry = () => {
        setRetryTrigger(c => c + 1);
    }

    const formattedDate = currentDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

    return (
        <div className="bg-slate-100 flex flex-col h-full animate-fade-in">
            <div className="flex-shrink-0 sticky top-0 z-10">
                <header className="bg-indigo-700 text-white p-3 flex items-center justify-between shadow-md">
                    <div className="flex items-center">
                        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800" aria-label="Go back">
                            <ArrowLeftIcon className="w-6 h-6" />
                        </button>
                        <h1 className="text-xl font-bold ml-2">
                            {readOnly ? 'View Attendance' : 'Take Attendance'}
                        </h1>
                    </div>
                    <div className="flex items-center space-x-2">
                        {!readOnly && <button onClick={() => setIsSmsModalOpen(true)} className="text-sm font-medium p-2 rounded-md hover:bg-indigo-800">SMS</button>}
                        <button className="p-1 rounded-full hover:bg-indigo-800">
                            <MoreVertIcon className="w-6 h-6" />
                        </button>
                    </div>
                </header>

                <div className="bg-indigo-900 text-white p-2 flex items-center justify-between">
                    <button onClick={() => handleDateChange('prev')} className="p-2 rounded-full hover:bg-indigo-800">
                        <ArrowLeftIcon className="w-5 h-5" />
                    </button>
                    <span className="font-bold text-lg">{formattedDate}</span>
                    <button onClick={() => handleDateChange('next')} className="p-2 rounded-full hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isTodayOrFuture}>
                        <ArrowRightIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
            
            {readOnly && (
                <div className="bg-yellow-100 p-2 text-center border-b border-yellow-200">
                    <p className="text-yellow-800 text-sm flex items-center justify-center gap-2">
                        <EyeIcon className="w-4 h-4" />
                        View Only Mode
                    </p>
                </div>
            )}

            {!readOnly && (
                <div className="p-2 text-center flex-shrink-0">
                     <p className="text-xs text-gray-500 mb-1">Click to set all students</p>
                     <div className="flex space-x-1.5 justify-center">
                        {attendanceStatuses.map(s => (
                            <StatusButton key={s} status={s} isActive={false} onClick={() => handleSetAll(s)} />
                        ))}
                     </div>
                </div>
            )}
            
            <main className="flex-grow p-2 sm:p-3 overflow-y-auto relative">
                 {savingError && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-lg animate-fade-in z-10 flex items-center space-x-2">
                        <XCircleIcon className="w-5 h-5" />
                        <span>{savingError}</span>
                    </div>
                )}
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <LoadingSpinner message="Loading attendance..." />
                    </div>
                ) : error ? (
                     <div className="text-center py-20 px-4">
                        <p className="text-lg text-red-600 font-semibold">{error}</p>
                        <button
                            onClick={handleRetry}
                            className="mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                ) : studentsInBatch.length > 0 ? (
                    <div className="space-y-3 pb-4">
                        {studentsInBatch.map(student => (
                            <StudentAttendanceCard
                                key={student.id}
                                student={student}
                                batch={batch}
                                status={attendance[student.id] || 'Not Set'}
                                onStatusChange={handleStatusChange}
                                onShowInfo={setSelectedStudentForInfo}
                                readOnly={readOnly}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 px-4">
                        <p className="text-lg text-gray-500">No active students found in this batch.</p>
                        <p className="text-sm text-gray-400 mt-2">Add students to this batch to take attendance.</p>
                    </div>
                )}
            </main>
            {selectedStudentForInfo && <StudentInfoModal student={selectedStudentForInfo} onClose={() => setSelectedStudentForInfo(null)} onShowImage={onShowImage} />}
            {isSmsModalOpen && (
                <SendAttendanceSmsModal
                    onClose={() => setIsSmsModalOpen(false)}
                    students={studentsInBatch}
                    attendance={attendance}
                    batch={batch}
                    academy={academy}
                    date={currentDate}
                />
            )}
        </div>
    );
}
