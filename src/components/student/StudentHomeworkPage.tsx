
import React, { useState, useMemo, useEffect } from 'react';
import type { Homework, Student, Batch, HomeworkSubmission } from '../../types';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { db, storage } from '../../firebaseConfig';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { LinkIcon } from '../icons/LinkIcon';
import { ArrowUpTrayIcon } from '../icons/ArrowUpTrayIcon';

interface StudentHomeworkPageProps {
  onBack: () => void;
  homework: Homework[];
  student: Student;
  academyId: string;
  batches: Batch[];
  isDemoMode: boolean;
}

const HomeworkCard: React.FC<{
    hw: Homework;
    student: Student;
    academyId: string;
    isDemoMode: boolean;
}> = ({ hw, student, academyId, isDemoMode }) => {
    const [submission, setSubmission] = useState<HomeworkSubmission | 'pending' | 'loading'>('loading');
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        const checkSubmission = async () => {
            const subRef = doc(db, `academies/${academyId}/homework/${hw.id}/submissions`, student.id);
            const docSnap = await getDoc(subRef);
            if (docSnap.exists()) {
                setSubmission({ id: docSnap.id, ...docSnap.data() } as HomeworkSubmission);
            } else {
                setSubmission('pending');
            }
        };
        checkSubmission();
    }, [academyId, hw.id, student.id]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file || isDemoMode) {
            if (isDemoMode) alert("This is a demo. Cannot submit homework.");
            return;
        }

        setIsUploading(true);
        const storagePath = `academies/${academyId}/homework_submissions/${hw.id}/${student.id}_${file.name}`;
        const storageRef = ref(storage, storagePath);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error("Upload failed:", error);
                alert("File upload failed.");
                setIsUploading(false);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                const submissionData: Omit<HomeworkSubmission, 'id'> = {
                    studentId: student.id,
                    studentName: student.name,
                    studentRollNumber: student.rollNumber,
                    submittedAt: serverTimestamp(),
                    fileUrl: downloadURL,
                    fileName: file.name,
                    storagePath,
                    status: 'Submitted'
                };
                const subRef = doc(db, `academies/${academyId}/homework/${hw.id}/submissions`, student.id);
                await setDoc(subRef, submissionData);
                setSubmission({ ...submissionData, id: student.id, submittedAt: new Date() } as any); // Optimistic update
                setIsUploading(false);
                setFile(null);
            }
        );
    };
    
    const getStatusInfo = () => {
        if (submission === 'loading') return { text: 'Loading...', color: 'bg-gray-200 text-gray-800' };
        if (submission === 'pending') return { text: 'Pending', color: 'bg-red-100 text-red-800' };
        if (submission.status === 'Checked') return { text: 'Checked', color: 'bg-green-100 text-green-800' };
        return { text: 'Submitted', color: 'bg-yellow-100 text-yellow-800' };
    };
    
    const { text, color } = getStatusInfo();

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">{hw.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{hw.batchName} &middot; {hw.subject}</p>
                </div>
                 <span className={`text-xs px-2 py-1 rounded-full font-semibold ${color}`}>{text}</span>
            </div>
            {hw.description && <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{hw.description}</p>}
            <p className="text-xs text-red-600 dark:text-red-400 font-semibold mt-1">Due: {hw.dueDate.toDate().toLocaleDateString()}</p>
            
            {hw.attachmentUrl && (
                <a href={hw.attachmentUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                    <LinkIcon className="w-4 h-4" />
                    <span>View Attachment</span>
                </a>
            )}

            <div className="mt-4 pt-4 border-t dark:border-gray-700">
                {submission === 'pending' ? (
                     <div>
                         <div className="flex items-center gap-2">
                            <label htmlFor={`file-upload-${hw.id}`} className="flex-grow p-2 text-center text-sm bg-gray-100 dark:bg-gray-700 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 truncate">
                                {file ? file.name : 'Choose File'}
                            </label>
                            <input id={`file-upload-${hw.id}`} type="file" onChange={handleFileChange} className="hidden" />
                            <button onClick={handleUpload} disabled={!file || isUploading} className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300">
                                <ArrowUpTrayIcon className="w-5 h-5"/>
                            </button>
                         </div>
                         {isUploading && <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 mt-2"><div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div></div>}
                     </div>
                ) : submission !== 'loading' && (
                    <div className="text-sm">
                        <p>You submitted: <a href={submission.fileUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">{submission.fileName || 'View File'}</a></p>
                        <p className="text-xs text-gray-500">on {submission.submittedAt.toDate().toLocaleString()}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export function StudentHomeworkPage({ onBack, homework, student, academyId, batches, isDemoMode }: StudentHomeworkPageProps) {
    
    const studentHomework = useMemo(() => {
        const studentBatchNames = new Set(student.batches);
        return homework
            .filter(h => studentBatchNames.has(h.batchName))
            .sort((a, b) => b.dueDate.toMillis() - a.dueDate.toMillis());
    }, [homework, student.batches]);

    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Homework</h1>
            </header>
            
            <main className="flex-grow p-4 overflow-y-auto">
                {studentHomework.length === 0 ? (
                     <div className="text-center py-20 px-4">
                        <p className="text-lg text-gray-500 dark:text-gray-400">No homework assigned for your batches yet.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {studentHomework.map(hw => (
                            <HomeworkCard key={hw.id} hw={hw} student={student} academyId={academyId} isDemoMode={isDemoMode} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
