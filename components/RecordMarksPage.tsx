
import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import type { Exam, Student, ExamMarks } from '../types';
import { db } from '../firebaseConfig';
import { collection, doc, writeBatch, getDocs, updateDoc } from 'firebase/firestore';

interface RecordMarksPageProps {
  onBack: () => void;
  exam: Exam;
  students: Student[];
  academyId: string;
  isDemoMode: boolean;
}

export function RecordMarksPage({ onBack, exam, students, academyId, isDemoMode }: RecordMarksPageProps) {
    const [marks, setMarks] = useState<Record<string, number | null>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const studentsInBatch = students.filter(s => s.isActive && s.batches.includes(exam.batchName));

    const fetchMarks = useCallback(async () => {
        if (isDemoMode) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        const marksCollectionRef = collection(db, `academies/${academyId}/exams/${exam.id}/marks`);
        const querySnapshot = await getDocs(marksCollectionRef);
        const fetchedMarks: Record<string, number | null> = {};
        querySnapshot.forEach(doc => {
            fetchedMarks[doc.id] = doc.data().marksObtained;
        });
        setMarks(fetchedMarks);
        setIsLoading(false);
    }, [academyId, exam.id, isDemoMode]);

    useEffect(() => {
        fetchMarks();
    }, [fetchMarks]);
    
    const handleMarkChange = (studentId: string, value: string) => {
        const newMarks = { ...marks };
        const numValue = value === '' ? null : Number(value);
        if (numValue === null || (numValue >= 0 && numValue <= exam.maxMarks)) {
            newMarks[studentId] = numValue;
            setMarks(newMarks);
        }
    };
    
    const handleSave = async () => {
        if (isDemoMode) {
            alert("Demo mode: Cannot save marks.");
            return;
        }
        setIsSaving(true);
        const batch = writeBatch(db);
        studentsInBatch.forEach(student => {
            const studentId = student.id;
            const marksObtained = marks[studentId] ?? null;
            const status: ExamMarks['status'] = marksObtained === null 
                ? 'Not Graded' 
                : marksObtained >= exam.passingMarks ? 'Passed' : 'Failed';
            
            const markDocRef = doc(db, `academies/${academyId}/exams/${exam.id}/marks`, studentId);
            const markData: ExamMarks = {
                studentId,
                studentName: student.name,
                studentRollNumber: student.rollNumber,
                marksObtained,
                status,
            };
            batch.set(markDocRef, markData, { merge: true });
        });

        try {
            await batch.commit();
            alert("Marks saved successfully!");
        } catch (error) {
            console.error("Error saving marks:", error);
            alert("Failed to save marks.");
        } finally {
            setIsSaving(false);
        }
    };

    const handlePublish = async (status: 'Published' | 'Draft') => {
        if(isDemoMode) { alert("Demo mode."); return; }
        const confirmText = status === 'Published' 
            ? "Are you sure you want to publish the results? This will make them visible to students."
            : "Are you sure you want to unpublish the results? Students will no longer be able to see them.";
        if (!window.confirm(confirmText)) return;

        const examRef = doc(db, `academies/${academyId}/exams`, exam.id);
        try {
            await updateDoc(examRef, { resultStatus: status });
            alert(`Results have been ${status.toLowerCase()}!`);
        } catch (error) {
             alert(`Failed to update status.`);
        }
    }

    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <div className="ml-2">
                    <h1 className="text-xl font-bold">Record Marks</h1>
                    <p className="text-sm opacity-90">{exam.name} ({exam.batchName})</p>
                </div>
            </header>

            <main className="flex-grow p-4 overflow-y-auto">
                {isLoading ? <p className="text-center">Loading student marks...</p> : (
                    <div className="space-y-3">
                        {studentsInBatch.map(student => (
                            <div key={student.id} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-gray-800 dark:text-gray-100">{student.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{student.rollNumber}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="number"
                                        value={marks[student.id] ?? ''}
                                        onChange={e => handleMarkChange(student.id, e.target.value)}
                                        placeholder="-"
                                        className="w-20 p-2 text-center border rounded-md dark:bg-gray-700 dark:border-gray-600"
                                        max={exam.maxMarks}
                                        min={0}
                                    />
                                    <span className="text-gray-500">/ {exam.maxMarks}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            
            <footer className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700 flex-shrink-0 space-y-3">
                 {exam.resultStatus === 'Draft' ? (
                    <button onClick={() => handlePublish('Published')} className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700">Publish Results</button>
                 ) : (
                    <button onClick={() => handlePublish('Draft')} className="w-full bg-yellow-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-yellow-600">Unpublish Results</button>
                 )}
                <button onClick={handleSave} disabled={isSaving} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300">
                    {isSaving ? 'Saving...' : 'Save Marks'}
                </button>
            </footer>
        </div>
    );
}
