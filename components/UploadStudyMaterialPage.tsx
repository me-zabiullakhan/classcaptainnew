import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import type { Batch, StudyMaterial } from '../types';
import { CustomDropdown } from './CustomDropdown';
import { storage } from '../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { serverTimestamp } from 'firebase/firestore';

interface UploadStudyMaterialPageProps {
  onBack: () => void;
  onSave: (data: Omit<StudyMaterial, 'id'>) => Promise<void>;
  batches: Batch[];
  academyId: string;
  uploaderName: string;
  materialToEdit?: StudyMaterial;
  isDemoMode: boolean;
}

export function UploadStudyMaterialPage({ onBack, onSave, batches, academyId, uploaderName, materialToEdit, isDemoMode }: UploadStudyMaterialPageProps) {
    const isEditMode = !!materialToEdit;
    
    const [formData, setFormData] = useState({
        title: materialToEdit?.title || '',
        description: materialToEdit?.description || '',
        batchId: materialToEdit?.batchId || '',
        subject: materialToEdit?.subject || '',
        fileType: materialToEdit?.fileType || 'file' as 'file' | 'link',
        fileUrl: materialToEdit?.fileUrl || '',
    });
    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isSaving, setIsSaving] = useState(false);

    const activeBatches = batches.filter(b => b.isActive);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isDemoMode) {
            alert("This is a demo. Data cannot be saved.");
            return;
        }
        if (!formData.title || !formData.batchId || !formData.subject) {
            alert("Please fill Title, Batch, and Subject.");
            return;
        }
        if (formData.fileType === 'file' && !file && !isEditMode) {
            alert("Please select a file to upload.");
            return;
        }
         if (formData.fileType === 'link' && !formData.fileUrl) {
            alert("Please enter a link.");
            return;
        }

        setIsSaving(true);
        const selectedBatch = batches.find(b => b.id === formData.batchId);
        
        try {
            if (formData.fileType === 'file' && file) {
                // Upload file
                const storagePath = `academies/${academyId}/study_materials/${Date.now()}_${file.name}`;
                const storageRef = ref(storage, storagePath);
                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on('state_changed', 
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setUploadProgress(progress);
                    },
                    (error) => {
                        console.error("Upload failed:", error);
                        alert("File upload failed. Please try again.");
                        setIsSaving(false);
                    },
                    async () => {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        await onSave({
                            ...formData,
                            fileUrl: downloadURL,
                            fileName: file.name,
                            storagePath,
                            batchName: selectedBatch?.name || '',
                            uploadedAt: materialToEdit?.uploadedAt || serverTimestamp(),
                            uploadedBy: uploaderName,
                        });
                    }
                );
            } else { // Link or editing without changing file
                await onSave({
                    ...formData,
                    fileName: materialToEdit?.fileName,
                    storagePath: materialToEdit?.storagePath,
                    batchName: selectedBatch?.name || '',
                    uploadedAt: materialToEdit?.uploadedAt || serverTimestamp(),
                    uploadedBy: uploaderName,
                });
            }
        } catch (error) {
            alert((error as Error).message);
            setIsSaving(false);
        }
    };
    
    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">{isEditMode ? 'Edit Material' : 'Upload Material'}</h1>
            </header>
            
            <form onSubmit={handleSave} className="flex-grow flex flex-col">
                <main className="flex-grow p-4 overflow-y-auto space-y-4">
                    <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <CustomDropdown
                        label="Batch / Class"
                        options={activeBatches.map(b => ({ value: b.id, label: b.name }))}
                        selectedValue={formData.batchId}
                        onSelect={(value) => setFormData(p => ({ ...p, batchId: value }))}
                        placeholder="Select a batch"
                    />
                    <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <textarea name="description" placeholder="Description (Optional)" value={formData.description} onChange={handleChange} rows={3} className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                    
                     <div className="grid grid-cols-2 gap-2 p-1 bg-gray-200 dark:bg-gray-700 rounded-lg">
                        <button type="button" onClick={() => setFormData(p => ({ ...p, fileType: 'file' }))} className={`py-2 rounded-md font-semibold ${formData.fileType === 'file' ? 'bg-white dark:bg-gray-800 text-indigo-600 shadow' : 'text-gray-600 dark:text-gray-300'}`}>Upload File</button>
                        <button type="button" onClick={() => setFormData(p => ({ ...p, fileType: 'link' }))} className={`py-2 rounded-md font-semibold ${formData.fileType === 'link' ? 'bg-white dark:bg-gray-800 text-indigo-600 shadow' : 'text-gray-600 dark:text-gray-300'}`}>Add Link</button>
                    </div>

                    {formData.fileType === 'file' ? (
                        <div>
                            <label htmlFor="file-upload" className="w-full p-3 bg-white dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500">
                                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Choose file to upload</span>
                                {file && <span className="text-sm text-gray-500 mt-1">{file.name}</span>}
                                {isEditMode && !file && materialToEdit?.fileName && <span className="text-sm text-gray-500 mt-1">Current: {materialToEdit.fileName}</span>}
                            </label>
                            <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" />
                            {isSaving && uploadProgress > 0 && uploadProgress < 100 && (
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
                                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <input type="url" name="fileUrl" placeholder="https://example.com/video" value={formData.fileUrl} onChange={handleChange} required className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    )}

                </main>
                <footer className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
                    <button type="submit" disabled={isSaving} className="relative w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md disabled:bg-indigo-300 disabled:cursor-not-allowed overflow-hidden">
                        <span className="relative z-10">
                            {isSaving ? `Uploading... ${Math.round(uploadProgress)}%` : (isEditMode ? 'Update Material' : 'Save Material')}
                        </span>
                        {isSaving && (
                            <div 
                                className="absolute top-0 left-0 h-full bg-indigo-500 transition-all duration-200"
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                        )}
                    </button>
                </footer>
            </form>
        </div>
    );
}