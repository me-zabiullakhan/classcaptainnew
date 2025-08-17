

import React from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import type { Academy } from '../types';
import { LogoIcon } from './icons/LogoIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { PauseIcon } from './icons/PauseIcon';
import { PlayIcon } from './icons/PlayIcon';
import { TrashIcon } from './icons/TrashIcon';

interface SuperAdminPanelProps {
    onLogout: () => void;
}

export function SuperAdminPanel({ onLogout }: SuperAdminPanelProps): React.ReactNode {
    const [academies, setAcademies] = React.useState<Academy[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [actionError, setActionError] = React.useState<string | null>(null);

    const fetchAcademies = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const querySnapshot = await getDocs(collection(db, 'academies'));
            const academyList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                status: doc.data().status || 'active', // Default to active
            } as Academy));
            setAcademies(academyList);
        } catch (err: any) {
            console.error("Error fetching academies:", err);
            setError("Failed to fetch academy data. Check Firestore rules and connection.");
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        fetchAcademies();
    }, []);

    const toggleAcademyStatus = async (academy: Academy) => {
        setActionError(null);
        const newStatus = academy.status === 'active' ? 'paused' : 'active';
        const academyRef = doc(db, 'academies', academy.id);
        try {
            await updateDoc(academyRef, { status: newStatus });
            setAcademies(prev => prev.map(a => a.id === academy.id ? { ...a, status: newStatus } : a));
        } catch (err) {
            console.error("Error updating academy status:", err);
            setActionError(`Failed to update status for ${academy.name}. Please try again.`);
        }
    };

    const deleteAcademy = async (academyId: string, academyName: string) => {
        setActionError(null);
        if (!window.confirm(`Are you sure you want to delete ${academyName}? This action is irreversible and will delete the academy's main record.`)) {
            return;
        }
        // Note: This only deletes the academy document itself. Deleting all sub-collections (students, batches)
        // is a complex operation and is best handled by a Firebase Cloud Function for production environments.
        try {
            await deleteDoc(doc(db, 'academies', academyId));
            setAcademies(prev => prev.filter(a => a.id !== academyId));
        } catch (err) {
            console.error("Error deleting academy:", err);
            setActionError(`Failed to delete academy ${academyName}. Please try again.`);
        }
    };
    
    return (
        <div className="bg-gray-900 text-gray-100 min-h-screen font-sans">
            <header className="bg-gray-800 p-4 shadow-lg flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <LogoIcon className="w-10 h-10 text-indigo-500" />
                    <h1 className="text-xl font-bold">Super Admin Panel</h1>
                </div>
                <button onClick={onLogout} className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
                    <LogoutIcon className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </header>
            
            <main className="p-4 md:p-8">
                {isLoading && <p className="text-center">Loading academies...</p>}
                {error && <p className="text-center text-red-400">{error}</p>}
                {actionError && (
                    <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative mb-4" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{actionError}</span>
                        <button onClick={() => setActionError(null)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <span className="text-2xl">&times;</span>
                        </button>
                    </div>
                )}
                {!isLoading && !error && (
                    <div className="space-y-4">
                        {academies.map(academy => (
                            <div key={academy.id} className="bg-gray-800 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <h2 className="font-bold text-lg text-indigo-400">{academy.name}</h2>
                                    <p className="text-xs text-gray-400">ID: {academy.id}</p>
                                    <p className="text-sm text-gray-300 mt-1">{academy.adminEmail}</p>
                                </div>
                                <div className="flex items-center gap-3 self-end sm:self-center">
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${academy.status === 'active' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}`}>
                                        {academy.status === 'active' ? 'Active' : 'Paused'}
                                    </span>
                                    <button onClick={() => toggleAcademyStatus(academy)} className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors" title={academy.status === 'active' ? 'Pause Academy' : 'Resume Academy'}>
                                        {academy.status === 'active' ? <PauseIcon className="w-5 h-5"/> : <PlayIcon className="w-5 h-5" />}
                                    </button>
                                    <button onClick={() => deleteAcademy(academy.id, academy.name)} className="p-2 bg-red-800 hover:bg-red-700 rounded-full transition-colors" title="Delete Academy">
                                        <TrashIcon className="w-5 h-5"/>
                                    </button>
                                </div>
                            </div>
                        ))}
                         {academies.length === 0 && (
                            <p className="text-center text-gray-500">No academies registered yet.</p>
                         )}
                    </div>
                )}
            </main>
        </div>
    );
}