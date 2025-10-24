
import React, { useState, useEffect, useMemo } from 'react';
import type { Student, Exam, ExamMarks } from '../../types';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

interface StudentExamsPageProps {
  onBack: () => void;
  student: Student;
  academyId: string;
}

export function StudentExamsPage({ onBack, student, academyId }: StudentExamsPageProps) {
    const [exams, setExams] = useState<Exam[]>([]);
    const [marks, setMarks] = useState<Record<string, ExamMarks>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'upcoming' | 'results'>('results');
    
    useEffect(() => {
        if (!academyId || student.batches.length === 0) {
            setIsLoading(false);
            return;
        }

        const fetchExamsAndMarks = async () => {
            setIsLoading(true);
            try {
                const q = query(collection(db, `academies/${academyId}/exams`), where('batchName', 'in', student.batches));
                const querySnapshot = await getDocs(q);
                const fetchedExams = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Exam));
                setExams(fetchedExams);

                const publishedExams = fetchedExams.filter(e => e.resultStatus === 'Published');
                const marksPromises = publishedExams.map(exam => 
                    getDoc(doc(db, `academies/${academyId}/exams/${exam.id}/marks`, student.id))
                );
                const marksSnapshots = await Promise.all(marksPromises);
                
                const fetchedMarks: Record<string, ExamMarks> = {};
                marksSnapshots.forEach((markSnap, index) => {
                    if (markSnap.exists()) {
                        fetchedMarks[publishedExams[index].id] = markSnap.data() as ExamMarks;
                    }
                });
                setMarks(fetchedMarks);

            } catch (error) {
                console.error("Error fetching exams/marks: ", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchExamsAndMarks();
    }, [academyId, student.batches, student.id]);

    const now = new Date();
    const upcomingExams = useMemo(() => exams.filter(e => e.date.toDate() >= now).sort((a,b) => a.date.toMillis() - b.date.toMillis()), [exams]);
    const completedExams = useMemo(() => exams.filter(e => e.date.toDate() < now && e.resultStatus === 'Published').sort((a,b) => b.date.toMillis() - a.date.toMillis()), [exams]);

    const examsToShow = activeTab === 'upcoming' ? upcomingExams : completedExams;

    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Exams</h1>
            </header>
             <div className="p-2 bg-white dark:bg-gray-800 shadow-sm flex-shrink-0">
                <div className="flex justify-around bg-gray-100 dark:bg-gray-900 p-1 rounded-lg">
                    <button onClick={() => setActiveTab('results')} className={`w-full py-2 rounded-md font-semibold ${activeTab === 'results' ? 'bg-indigo-600 text-white' : 'dark:text-gray-300'}`}>Results</button>
                    <button onClick={() => setActiveTab('upcoming')} className={`w-full py-2 rounded-md font-semibold ${activeTab === 'upcoming' ? 'bg-indigo-600 text-white' : 'dark:text-gray-300'}`}>Upcoming</button>
                </div>
            </div>
            <main className="flex-grow p-4 overflow-y-auto">
                {isLoading ? <p className="text-center">Loading exams...</p> : examsToShow.length === 0 ? (
                    <div className="text-center py-20 px-4">
                        <p className="text-lg text-gray-500">No {activeTab} exams found.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {examsToShow.map(exam => {
                            const studentMark = marks[exam.id];
                            return (
                                <div key={exam.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                                    <h3 className="font-bold text-gray-800 dark:text-gray-100">{exam.name} - <span className="text-indigo-600 dark:text-indigo-400">{exam.subject}</span></h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{exam.batchName}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Date: {exam.date.toDate().toLocaleDateString()}</p>
                                    
                                    {activeTab === 'results' && studentMark && (
                                        <div className="mt-3 pt-3 border-t dark:border-gray-700 flex justify-between items-center">
                                            <div>
                                                <p className="text-xs text-gray-500">Marks Obtained</p>
                                                <p className="text-xl font-bold">{studentMark.marksObtained ?? 'N/A'} / {exam.maxMarks}</p>
                                            </div>
                                            <span className={`px-3 py-1 text-sm font-bold rounded-full ${studentMark.status === 'Passed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{studentMark.status}</span>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}
