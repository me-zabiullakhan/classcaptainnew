
import React from 'react';
import type { Batch, Student, AttendanceStatus } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { InfoIcon } from './icons/InfoIcon';
import { MoreVertIcon } from './icons/MoreVertIcon';
import { db } from '../firebaseConfig';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { XCircleIcon } from './icons/XCircleIcon';

interface TakeAttendancePageProps {
  onBack: () => void;
  batch: Batch;
  students: Student[];
  academyId: string;
  isDemoMode: boolean;
}

const attendanceStatuses: AttendanceStatus[] = ['Present', 'Absent', 'Leave', 'Holiday'];

const StatusButton: React.FC<{ status: AttendanceStatus, isActive: boolean, onClick: () => void }> = ({ status, isActive, onClick }) => {
    const getButtonColors = (status: AttendanceStatus, active: boolean) => {
        const common = 'px-3 py-1 text-xs rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 shadow-sm flex-grow text-center';
        switch (status) {
            case 'Present':
                return active ? `${common} bg-green-600 text-white focus:ring-green-500` : `${common} bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-500`;
            case 'Absent':
                return active ? `${common} bg-red-600 text-white focus:ring-red-500` : `${common} bg-red-100 text-red-800 hover:bg-red-200 focus:ring-red-500`;
            case 'Leave':
                return active ? `${common} bg-yellow-500 text-white focus:ring-yellow-400` : `${common} bg-yellow-100 text-yellow-800 hover:bg-yellow-200 focus:ring-yellow-400`;
            case 'Holiday':
                return active ? `${common} bg-purple-600 text-white focus:ring-purple-500` : `${common} bg-purple-100 text-purple-800 hover:bg-purple-200 focus:ring-purple-500`;
            case 'Not Set':
            default:
                return active ? `${common} bg-gray-600 text-white focus:ring-gray-500` : `${common} bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500`;
        }
    };
    return (
        <button onClick={onClick} className={getButtonColors(status, isActive)}>
            {status}
        </button>
    );
};

const StudentAttendanceCard: React.FC<{ student: Student, batch: Batch, status: AttendanceStatus, onStatusChange: (studentId: string, status: AttendanceStatus) => void}> = ({ student, batch, status, onStatusChange }) => {
    return (
        <div className="bg-white p-3 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-3">
                <div className="flex-1">
                    <p className="text-sm text-indigo-700 font-semibold">{student.rollNumber || student.id}</p>
                    <p className="text-base font-bold text-gray-800">{student.name}</p>
                    <p className="text-xs text-gray-500">{batch.name}</p>
                </div>
                <div className="text-indigo-600">
                    <InfoIcon className="w-6 h-6" />
                </div>
            </div>
            <div className="flex space-x-1.5">
                {attendanceStatuses.map(s => (
                    <StatusButton key={s} status={s} isActive={status === s} onClick={() => onStatusChange(student.id, s)} />
                ))}
            </div>
        </div>
    );
};

export function TakeAttendancePage({ onBack, batch, students, academyId, isDemoMode }: TakeAttendancePageProps): React.ReactNode {
    const [currentDate, setCurrentDate] = React.useState(new Date());
    const [attendance, setAttendance] = React.useState<Record<string, AttendanceStatus>>({});
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [savingError, setSavingError] = React.useState<string | null>(null);
    const [retryTrigger, setRetryTrigger] = React.useState(0);


    const getFormattedDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    React.useEffect(() => {
        if (isDemoMode) {
            const initialState: Record<string, AttendanceStatus> = {};
            students.forEach(s => { initialState[s.id] = 'Not Set'; });
            setAttendance(initialState);
            setIsLoading(false);
            return;
        }

        if (!academyId || !batch.id) return;

        setIsLoading(true);
        setError(null);
        setSavingError(null);
        const dateString = getFormattedDate(currentDate);
        const attendanceRef = doc(db, `academies/${academyId}/batches/${batch.id}/attendance`, dateString);

        const unsubscribe = onSnapshot(attendanceRef, (docSnap) => {
            const fetchedData = docSnap.data() || {};
            const newAttendanceState: Record<string, AttendanceStatus> = {};
            students.forEach(s => {
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
    }, [currentDate, batch.id, academyId, students, isDemoMode, retryTrigger]);


    const handleDateChange = (direction: 'prev' | 'next') => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
            return newDate;
        });
    };

    const handleStatusChange = async (studentId: string, status: AttendanceStatus) => {
        setSavingError(null);
        const oldStatus = attendance[studentId];
        setAttendance(prev => ({ ...prev, [studentId]: status }));

        if (isDemoMode) return;

        try {
            const dateString = getFormattedDate(currentDate);
            const attendanceRef = doc(db, `academies/${academyId}/batches/${batch.id}/attendance`, dateString);
            await setDoc(attendanceRef, { [studentId]: status }, { merge: true });
        } catch (error) {
            console.error("Failed to save attendance:", error);
            setAttendance(prev => ({...prev, [studentId]: oldStatus })); // Revert on error
            setSavingError("Failed to save. Check your connection.");
            setTimeout(() => setSavingError(null), 3000);
        }
    };

    const handleSetAll = async (status: AttendanceStatus) => {
        setSavingError(null);
        const oldAttendance = { ...attendance };
        const newAttendance: Record<string, AttendanceStatus> = {};
        students.forEach(s => { newAttendance[s.id] = status; });
        setAttendance(newAttendance);

        if (isDemoMode) return;

        try {
            const dateString = getFormattedDate(currentDate);
            const attendanceRef = doc(db, `academies/${academyId}/batches/${batch.id}/attendance`, dateString);
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
                        <h1 className="text-xl font-bold ml-2">Take Attendance</h1>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="text-sm font-medium">SMS</button>
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
                    <button onClick={() => handleDateChange('next')} className="p-2 rounded-full hover:bg-indigo-800">
                        <ArrowRightIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
            
            <div className="p-2 text-center flex-shrink-0">
                 <p className="text-xs text-gray-500 mb-1">Click to set all students</p>
                 <div className="flex space-x-1.5 justify-center">
                    {attendanceStatuses.map(s => (
                        <StatusButton key={s} status={s} isActive={false} onClick={() => handleSetAll(s)} />
                    ))}
                 </div>
            </div>
            
            <main className="flex-grow p-2 sm:p-3 overflow-y-auto relative">
                 {savingError && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-lg animate-fade-in z-10 flex items-center space-x-2">
                        <XCircleIcon className="w-5 h-5" />
                        <span>{savingError}</span>
                    </div>
                )}
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-gray-500">Loading attendance...</p>
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
                ) : students.length > 0 ? (
                    <div className="space-y-3 pb-4">
                        {students.map(student => (
                            <StudentAttendanceCard
                                key={student.id}
                                student={student}
                                batch={batch}
                                status={attendance[student.id] || 'Not Set'}
                                onStatusChange={handleStatusChange}
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
        </div>
    );
}