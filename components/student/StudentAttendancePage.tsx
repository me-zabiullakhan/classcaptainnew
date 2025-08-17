import React from 'react';
import type { Student, AttendanceStatus } from '../../types';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../icons/ArrowRightIcon';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';
import { XCircleIcon } from '../icons/XCircleIcon';
import { CheckIcon } from '../icons/CheckIcon';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

interface StudentAttendancePageProps {
    student: Student;
    academyId: string;
    onBack: () => void;
}

const StatusIcon = ({ status }: { status: AttendanceStatus }) => {
    switch (status) {
        case 'Present':
            return <CheckCircleIcon className="w-6 h-6 text-green-500" aria-label="Present" />;
        case 'Absent':
            return <XCircleIcon className="w-6 h-6 text-red-500" aria-label="Absent" />;
        case 'Leave':
            return (
                <div className="w-6 h-6 rounded-full bg-orange-400 flex items-center justify-center" aria-label="Leave">
                    <CheckIcon className="w-4 h-4 text-white" />
                </div>
            );
        case 'Holiday':
            return (
                <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center" aria-label="Holiday">
                    <CheckIcon className="w-4 h-4 text-white" />
                </div>
            );
        default:
            return null;
    }
};

const SummaryItem = ({ label, value, color }: { label: string, value: number, color: string }) => (
    <div className="text-center">
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
    </div>
);

const LegendItem = ({ status, label }: { status: AttendanceStatus, label: string }) => (
    <div className="flex items-center space-x-2">
        <StatusIcon status={status} />
        <span className="text-sm text-gray-600">{label}</span>
    </div>
);

export function StudentAttendancePage({ student, academyId, onBack }: StudentAttendancePageProps): React.ReactNode {
    const [currentDate, setCurrentDate] = React.useState(new Date());
    const [attendanceData, setAttendanceData] = React.useState<Record<string, AttendanceStatus>>({});
    const [summary, setSummary] = React.useState({ present: 0, absent: 0, leave: 0, holiday: 0 });
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const fetchData = React.useCallback(async () => {
        setIsLoading(true);
        setError(null);
        if (!student || !academyId || student.batches.length === 0) {
            setAttendanceData({});
            setSummary({ present: 0, absent: 0, leave: 0, holiday: 0 });
            setIsLoading(false);
            return;
        }

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const dateStrings: string[] = Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        });

        const newAttendanceData: Record<string, AttendanceStatus> = {};
        
        try {
            const batchesRef = collection(db, `academies/${academyId}/batches`);
            const q = query(batchesRef, where('name', 'in', student.batches));
            const batchDocsSnapshot = await getDocs(q);
            const studentBatchIds = batchDocsSnapshot.docs.map(d => d.id);
            
            for (const batchId of studentBatchIds) {
                const docRefs = dateStrings.map(dateString =>
                    doc(db, `academies/${academyId}/batches/${batchId}/attendance`, dateString)
                );

                const docSnaps = await Promise.all(docRefs.map(ref => getDoc(ref)));

                docSnaps.forEach((docSnap, index) => {
                    if (docSnap.exists()) {
                        const dayData = docSnap.data();
                        const status = dayData[student.id];
                        if (status) {
                            const dayNumber = String(index + 1);
                            const existingStatus = newAttendanceData[dayNumber];
                            const priority: Record<AttendanceStatus, number> = { 'Present': 4, 'Leave': 3, 'Holiday': 2, 'Absent': 1, 'Not Set': 0 };

                            if (!existingStatus || priority[status] > priority[existingStatus]) {
                                newAttendanceData[dayNumber] = status;
                            }
                        }
                    }
                });
            }

            setAttendanceData(newAttendanceData);

            const newSummary = Object.values(newAttendanceData).reduce((acc, status) => {
                if (status === 'Present') acc.present++;
                else if (status === 'Absent') acc.absent++;
                else if (status === 'Leave') acc.leave++;
                else if (status === 'Holiday') acc.holiday++;
                return acc;
            }, { present: 0, absent: 0, leave: 0, holiday: 0 });
            setSummary(newSummary);

        } catch (err: any) {
            console.error("Error fetching student attendance: ", err);
            if (err.code === 'unavailable') {
                setError("You appear to be offline. Please check your internet connection and try again.");
            } else {
                setError("Could not load attendance data. Please try again later.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [currentDate, student, academyId]);
    
    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDateChange = (direction: 'prev' | 'next') => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
            return newDate;
        });
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return (
        <div className="bg-slate-100 flex flex-col h-screen animate-fade-in md:max-w-lg md:mx-auto md:shadow-2xl">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back to dashboard">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Attendance</h1>
            </header>
            
            <main className="flex-grow p-4 overflow-y-auto">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                    <h3 className="text-center font-bold text-gray-700 mb-3">This Month's Summary</h3>
                    <div className="grid grid-cols-4 gap-2">
                        <SummaryItem label="Present" value={summary.present} color="text-green-500" />
                        <SummaryItem label="Absent" value={summary.absent} color="text-red-500" />
                        <SummaryItem label="Leave" value={summary.leave} color="text-orange-400" />
                        <SummaryItem label="Holiday" value={summary.holiday} color="text-purple-500" />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <button onClick={() => handleDateChange('prev')} className="p-2 rounded-full hover:bg-gray-100"><ArrowLeftIcon className="w-5 h-5" /></button>
                        <h2 className="text-lg font-bold text-indigo-700">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                        <button onClick={() => handleDateChange('next')} className="p-2 rounded-full hover:bg-gray-100"><ArrowRightIcon className="w-5 h-5" /></button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-gray-500 mb-2">
                        {daysOfWeek.map(day => <div key={day}>{day}</div>)}
                    </div>

                    {isLoading ? (
                         <div className="flex justify-center items-center py-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                            <p className="ml-3 text-gray-600">Loading attendance...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-10 px-4 bg-red-50 text-red-700 rounded-lg">
                            <p className="font-bold mb-2">Failed to Load Data</p>
                            <p className="text-sm">{error}</p>
                            <button
                                onClick={fetchData}
                                className="mt-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Retry
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-7 gap-1">
                            {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`}></div>)}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const day = i + 1;
                                const status = attendanceData[String(day)];
                                return (
                                    <div key={day} className="flex flex-col items-center justify-start h-12">
                                        <span className="text-sm text-gray-800">{day}</span>
                                        {status && <div className="mt-1"><StatusIcon status={status} /></div>}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <LegendItem status="Present" label="Present" />
                        <LegendItem status="Absent" label="Absent" />
                        <LegendItem status="Leave" label="Leave" />
                        <LegendItem status="Holiday" label="Holiday" />
                    </div>
                </div>
            </main>
        </div>
    );
}