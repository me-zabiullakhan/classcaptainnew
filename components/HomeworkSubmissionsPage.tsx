
import React, { useState, useEffect, useMemo } from 'react';
import type { Homework, Student, HomeworkSubmission } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { db } from '../firebaseConfig';
import { collection, doc, onSnapshot, updateDoc, serverTimestamp } from 'firebase/firestore';

interface HomeworkSubmissionsPageProps {
  onBack: () => void;
  homework: Homework;
  students: Student[];
  academyId: string;
}

type SubmissionStatus = 'Pending' | 'Submitted' | 'Checked';

export function HomeworkSubmissionsPage({ onBack, homework, students, academyId }: HomeworkSubmissionsPageProps) {
    const [submissions, setSubmissions] = useState<Record<string, HomeworkSubmission>>({});
    const [isLoading, setIsLoading] = useState(true);

    const studentsInBatch = useMemo(() => students.filter(s => s.isActive && s.batches.includes(homework.batchName)), [students, homework.batchName]);

    useEffect(() => {
        const submissionsRef = collection(db, `academies/${academyId}/homework/${homework.id}/submissions`);
        const unsubscribe = onSnapshot(submissionsRef, (snapshot) => {
            const subs: Record<string, HomeworkSubmission> = {};
            snapshot.forEach(doc => {
                subs[doc.id] = { id: doc.id, ...doc.data() } as HomeworkSubmission;
            });
            setSubmissions(subs);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, [academyId, homework.id]);

    const getStudentStatus = (studentId: string): SubmissionStatus => {
        const submission = submissions[studentId];
        if (!submission) return 'Pending';
        return submission.status === 'Checked' ? 'Checked' : 'Submitted';
    };

    const handleMarkAsChecked = async (studentId: string) => {
        const submissionRef = doc(db, `academies/${academyId}/homework/${homework.id}/submissions`, studentId);
        try {
            await updateDoc(submissionRef, { status: 'Checked' });
        } catch (error) {
            console.error("Failed to mark as checked:", error);
            alert("Failed to update status. Please try again.");
        }
    };
    
    const getStatusColor = (status: SubmissionStatus) => {
        switch (status) {
            case 'Pending': return 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
            case 'Submitted': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300';
            case 'Checked': return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300';
        }
    };

    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <div className="ml-2">
                    <h1 className="text-xl font-bold">Submissions</h1>
                    <p className="text-sm opacity-90">{homework.title}</p>
                </div>
            </header>

            <main className="flex-grow p-4 overflow-y-auto">
                {isLoading ? <p>Loading submissions...</p> : studentsInBatch.length === 0 ? (
                    <p className="text-center text-gray-500 py-10">No students in this batch.</p>
                ) : (
                    <div className="space-y-3">
                        {studentsInBatch.map(student => {
                            const status = getStudentStatus(student.id);
                            const submission = submissions[student.id];
                            return (
                                <div key={student.id} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-gray-800 dark:text-gray-100">{student.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{student.rollNumber}</p>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(status)}`}>
                                            {status}
                                        </span>
                                    </div>
                                    {submission && (
                                        <div className="mt-3 pt-3 border-t dark:border-gray-700 flex justify-between items-center">
                                            <div>
                                                <a href={submission.fileUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                                                    View Submission
                                                </a>
                                                <p className="text-xs text-gray-400">Submitted on: {submission.submittedAt.toDate().toLocaleDateString()}</p>
                                            </div>
                                            {status === 'Submitted' && (
                                                <button onClick={() => handleMarkAsChecked(student.id)} className="px-3 py-1 text-xs font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">
                                                    Mark as Checked
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}
