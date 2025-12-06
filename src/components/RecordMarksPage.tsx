import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import type { Exam, Student, ExamMarks, Academy } from '../types';
import { db } from '../firebaseConfig';
import { collection, doc, writeBatch, getDocs } from 'firebase/firestore';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { SendMarksSmsModal } from './SendMarksSmsModal';
import { ArrowUpTrayIcon } from './icons/ArrowUpTrayIcon';
import { LoadingSpinner } from './LoadingSpinner';

interface RecordMarksPageProps {
  onBack: () => void;
  exam: Exam;
  students: Student[];
  academy: Academy;
  isDemoMode: boolean;
  onPublish: (examId: string, status: 'Published' | 'Draft') => Promise<void>;
}

const SaveSuccessModal = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
        <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg max-w-sm mx-auto text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/40 mb-5">
                <CheckCircleIcon className="h-9 w-9 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Success!</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
                Marks have been saved successfully.
            </p>
            <button
                onClick={onClose}
                className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
            >
                OK
            </button>
        </div>
    </div>
);

const PublishConfirmationModal = ({ onConfirm, onCancel, isPublishing }: { onConfirm: () => void; onCancel: () => void; isPublishing: boolean }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
        <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg max-w-sm mx-auto text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/40 mb-5">
                <ArrowUpTrayIcon className="h-9 w-9 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Confirm Publication</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to publish these results? They will become visible to students in their dashboard.
            </p>
            <div className="flex flex-col sm:flex-row-reverse gap-3">
                <button
                    onClick={onConfirm}
                    disabled={isPublishing}
                    className="w-full sm:w-auto flex-1 bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors shadow-md disabled:bg-green-300"
                >
                    {isPublishing ? 'Publishing...' : 'Yes, Publish'}
                </button>
                <button
                    onClick={onCancel}
                    disabled={isPublishing}
                    className="w-full sm:w-auto flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
);

const PublishSuccessModal = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
        <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg max-w-sm mx-auto text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/40 mb-5">
                <CheckCircleIcon className="h-9 w-9 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Results Published!</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
                Your marks are published and can be viewed by students in their dashboard.
            </p>
            <button
                onClick={onClose}
                className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
            >
                OK
            </button>
        </div>
    </div>
);


export function RecordMarksPage({ onBack, exam, students, academy, isDemoMode, onPublish }: RecordMarksPageProps) {
    const [marks, setMarks] = useState<Record<string, number | null>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isSmsModalOpen, setIsSmsModalOpen] = useState(false);
    const [showSaveSuccess, setShowSaveSuccess] = useState(false);
    const [showPublishConfirm, setShowPublishConfirm] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    const [showPublishSuccess, setShowPublishSuccess] = useState(false);

    const studentsInBatch = students.filter(s => s.isActive && s.batches.includes(exam.batchName));

    const fetchMarks = useCallback(async () => {
        if (isDemoMode) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        const marksCollectionRef = collection(db, `academies/${academy.id}/exams/${exam.id}/marks`);
        const querySnapshot = await getDocs(marksCollectionRef);
        const fetchedMarks: Record<string, number | null> = {};
        querySnapshot.forEach(doc => {
            fetchedMarks[doc.id] = doc.data().marksObtained;
        });
        setMarks(fetchedMarks);
        setIsLoading(false);
    }, [academy.id, exam.id, isDemoMode]);

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
            
            const markDocRef = doc(db, `academies/${academy.id}/exams/${exam.id}/marks`, studentId);
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
            setShowSaveSuccess(true);
        } catch (error) {
            console.error("Error saving marks:", error);
            alert("Failed to save marks.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleConfirmPublish = async () => {
        if(isDemoMode) { alert("Demo mode."); return; }
        
        setIsPublishing(true);
        try {
            await onPublish(exam.id, 'Published');
            setShowPublishConfirm(false);
            setShowPublishSuccess(true);
        } catch (error) {
             alert(`Failed to publish results.`);
        } finally {
            setIsPublishing(false);
        }
    };

    const handleUnpublish = async () => {
        if(isDemoMode) { alert("Demo mode."); return; }
        if (!window.confirm("Are you sure you want to unpublish the results? Students will no longer be able to see them.")) return;

        try {
            await onPublish(exam.id, 'Draft');
            alert(`Results have been successfully unpublished!`);
        } catch (error) {
             alert(`Failed to update status.`);
        }
    };

    return (
        <>
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
                {isLoading ? <LoadingSpinner message="Loading student marks..." /> : (
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
                    <button onClick={() => setShowPublishConfirm(true)} className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700">Publish Results</button>
                 ) : (
                    <button onClick={() => setIsSmsModalOpen(true)} className="w-full bg-sky-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-600">Send Marks to Parents</button>
                 )}
                <button onClick={handleSave} disabled={isSaving} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300">
                    {isSaving ? 'Saving...' : 'Save Marks'}
                </button>
                {exam.resultStatus === 'Published' && (
                    <button onClick={handleUnpublish} className="w-full bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-600">Unpublish Results</button>
                )}
            </footer>
        </div>
        {isSmsModalOpen && (
            <SendMarksSmsModal
                onClose={() => setIsSmsModalOpen(false)}
                students={studentsInBatch}
                marks={marks}
                exam={exam}
                academy={academy}
            />
        )}
        {showSaveSuccess && <SaveSuccessModal onClose={() => setShowSaveSuccess(false)} />}
        {showPublishConfirm && (
            <PublishConfirmationModal 
                onConfirm={handleConfirmPublish}
                onCancel={() => setShowPublishConfirm(false)}
                isPublishing={isPublishing}
            />
        )}
        {showPublishSuccess && (
            <PublishSuccessModal onClose={() => setShowPublishSuccess(false)} />
        )}
        </>
    );
}
