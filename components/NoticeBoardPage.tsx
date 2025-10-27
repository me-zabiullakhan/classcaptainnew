
import React, { useState, useMemo } from 'react';
import type { Notice } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { PlusIcon } from './icons/PlusIcon';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';
import { XMarkIcon } from './icons/XMarkIcon';
import { CustomDropdown } from './CustomDropdown';
import { Timestamp, serverTimestamp } from 'firebase/firestore';
import { storage } from '../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FileTextIcon } from './icons/FileTextIcon';

const TARGET_AUDIENCE: Notice['targetAudience'][] = ['All', 'Students', 'Staff'];

interface NoticeModalProps {
    onClose: () => void;
    onSave: (data: Omit<Notice, 'id' | 'createdAt'>, noticeId?: string) => Promise<void>;
    noticeToEdit?: Notice | null;
    isDemoMode: boolean;
    academyId: string;
}

const NoticeModal: React.FC<NoticeModalProps> = ({ onClose, onSave, noticeToEdit, isDemoMode, academyId }) => {
    const isEditMode = !!noticeToEdit;
    const [formData, setFormData] = useState({
        title: noticeToEdit?.title || '',
        description: noticeToEdit?.description || '',
        targetAudience: noticeToEdit?.targetAudience || 'All',
        expiryDate: noticeToEdit?.expiryDate.toDate().toISOString().split('T')[0] || '',
    });
    const [file, setFile] = useState<File | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

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
        if (!formData.title || !formData.description || !formData.expiryDate) {
            alert("Title, Description, and Expiry Date are required.");
            return;
        }
        setIsSaving(true);
        
        try {
            let attachmentUrl: string | undefined = noticeToEdit?.attachmentUrl;
            let attachmentName: string | undefined = noticeToEdit?.attachmentName;
            let storagePath: string | undefined = noticeToEdit?.storagePath;

            if (file) {
                storagePath = `academies/${academyId}/notice_attachments/${Date.now()}_${file.name}`;
                const storageRef = ref(storage, storagePath);
                const uploadTask = uploadBytesResumable(storageRef, file);

                await new Promise<void>((resolve, reject) => {
                    uploadTask.on('state_changed', 
                        (snapshot) => setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
                        (error) => {
                            console.error("Upload failed:", error);
                            alert("File upload failed.");
                            reject(error);
                        },
                        async () => {
                            attachmentUrl = await getDownloadURL(uploadTask.snapshot.ref);
                            attachmentName = file.name;
                            resolve();
                        }
                    );
                });
            }

            await onSave({
                ...formData,
                targetAudience: formData.targetAudience as Notice['targetAudience'],
                expiryDate: formData.expiryDate as any,
                attachmentUrl,
                attachmentName,
                storagePath,
            }, noticeToEdit?.id);
            onClose();
        } catch (error) {
            console.error(error);
            alert("Failed to save notice.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-lg mx-auto flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{isEditMode ? 'Edit Notice' : 'New Notice'}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><XMarkIcon className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSave} className="flex-grow overflow-y-auto pr-2 space-y-4">
                    <input type="text" name="title" placeholder="Notice Title" value={formData.title} onChange={handleChange} required className="w-full p-3 bg-gray-50 dark:bg-gray-700 border rounded-lg" />
                    <textarea name="description" placeholder="Message / Description" value={formData.description} onChange={handleChange} rows={5} required className="w-full p-3 bg-gray-50 dark:bg-gray-700 border rounded-lg" />
                    <CustomDropdown label="Target Audience" options={TARGET_AUDIENCE.map(p => ({ value: p, label: p }))} selectedValue={formData.targetAudience} onSelect={val => setFormData(p => ({ ...p, targetAudience: val }))} />
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Expiry Date</label>
                        <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required className="w-full mt-1 p-3 bg-gray-50 dark:bg-gray-700 border rounded-lg" />
                    </div>
                    <div>
                        <label htmlFor="file-upload" className="w-full p-3 bg-gray-50 dark:bg-gray-700 border-2 border-dashed rounded-lg flex flex-col items-center cursor-pointer hover:border-indigo-500">
                           <span className="text-indigo-600 font-semibold">Attach File (Optional)</span>
                           {file && <span className="text-sm text-gray-500 mt-1">{file.name}</span>}
                           {isEditMode && !file && noticeToEdit?.attachmentName && <span className="text-sm text-gray-500 mt-1">Current: {noticeToEdit.attachmentName}</span>}
                        </label>
                        <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" />
                    </div>
                    {isSaving && file && <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${uploadProgress}%` }}></div></div>}
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-lg bg-gray-200 dark:bg-gray-600 font-bold">Cancel</button>
                        <button type="submit" disabled={isSaving} className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-bold disabled:bg-indigo-300">{isSaving ? 'Saving...' : 'Save Notice'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const NoticeCard: React.FC<{ notice: Notice; onEdit: (task: Notice) => void; onDelete: (id: string) => void; }> = ({ notice, onEdit, onDelete }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">{notice.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Expires: {notice.expiryDate.toDate().toLocaleDateString()} | For: {notice.targetAudience}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{notice.description}</p>
                    {notice.attachmentUrl && (
                        <a href={notice.attachmentUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                            <FileTextIcon className="w-4 h-4" />
                            <span>{notice.attachmentName || 'View Attachment'}</span>
                        </a>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <button onClick={() => onEdit(notice)} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full"><PencilIcon className="w-4 h-4" /></button>
                    <button onClick={() => onDelete(notice.id)} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full"><TrashIcon className="w-4 h-4" /></button>
                </div>
            </div>
        </div>
    );
};

interface NoticeBoardPageProps {
  onBack: () => void;
  notices: Notice[];
  onSaveNotice: (data: Omit<Notice, 'id' | 'createdAt'>, noticeId?: string) => Promise<void>;
  onDeleteNotice: (notice: Notice) => Promise<void>;
  isDemoMode: boolean;
  academyId: string;
}

export function NoticeBoardPage({ onBack, notices, onSaveNotice, onDeleteNotice, isDemoMode, academyId }: NoticeBoardPageProps) {
    const [showModal, setShowModal] = useState(false);
    const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
    const [activeFilter, setActiveFilter] = useState<'Active' | 'Expired'>('Active');

    const filteredNotices = useMemo(() => {
        const now = new Date();
        return notices
            .filter(n => activeFilter === 'Active' ? n.expiryDate.toDate() >= now : n.expiryDate.toDate() < now)
            .sort((a,b) => b.createdAt.toMillis() - a.createdAt.toMillis());
    }, [notices, activeFilter]);
    
    const handleEdit = (notice: Notice) => {
        setEditingNotice(notice);
        setShowModal(true);
    };

    const handleAddNew = () => {
        setEditingNotice(null);
        setShowModal(true);
    };

    return (
        <>
            <div className="animate-fade-in flex flex-col h-full">
                <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                    <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-bold ml-2">Notice Board</h1>
                </header>
                <div className="p-2 bg-white dark:bg-gray-800 shadow-sm flex-shrink-0">
                    <div className="flex justify-around bg-gray-100 dark:bg-gray-900 p-1 rounded-lg">
                        <button onClick={() => setActiveFilter('Active')} className={`w-full py-2 rounded-md font-semibold ${activeFilter === 'Active' ? 'bg-indigo-600 text-white' : 'dark:text-gray-300'}`}>Active</button>
                        <button onClick={() => setActiveFilter('Expired')} className={`w-full py-2 rounded-md font-semibold ${activeFilter === 'Expired' ? 'bg-indigo-600 text-white' : 'dark:text-gray-300'}`}>Expired</button>
                    </div>
                </div>
                <main className="flex-grow p-4 overflow-y-auto">
                    {filteredNotices.length === 0 ? (
                        <div className="text-center py-20 px-4">
                            <p className="text-lg text-gray-500 dark:text-gray-400">No {activeFilter.toLowerCase()} notices.</p>
                            {activeFilter === 'Active' && <p className="text-gray-400 dark:text-gray-500">Click the <span className="font-bold text-indigo-500">+</span> button to add one.</p>}
                        </div>
                    ) : (
                        <div className="space-y-3 pb-20">
                            {filteredNotices.map(notice => (
                                <NoticeCard key={notice.id} notice={notice} onEdit={handleEdit} onDelete={() => onDeleteNotice(notice)} />
                            ))}
                        </div>
                    )}
                </main>
                <button onClick={handleAddNew} className="absolute bottom-20 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-110" aria-label="Add New Notice">
                    <PlusIcon className="w-8 h-8" />
                </button>
            </div>
            {showModal && <NoticeModal onClose={() => setShowModal(false)} onSave={onSaveNotice} noticeToEdit={editingNotice} isDemoMode={isDemoMode} academyId={academyId} />}
        </>
    );
}