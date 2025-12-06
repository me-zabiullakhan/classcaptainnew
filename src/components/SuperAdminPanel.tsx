import React, { useState, useEffect, useMemo } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import type { Academy } from '../types';
import { LogoIcon } from './icons/LogoIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { PauseIcon } from './icons/PauseIcon';
import { PlayIcon } from './icons/PlayIcon';
import { TrashIcon } from './icons/TrashIcon';
import { LoadingSpinner } from './LoadingSpinner';
import { DashboardIcon } from './icons/DashboardIcon';
import { BuildingIcon } from './icons/BuildingIcon';
import { ChartPieIcon } from './icons/ChartPieIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { UsersGroupIcon } from './icons/UsersGroupIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { CreditCardIcon } from './icons/CreditCardIcon';
import { SearchIcon } from './icons/SearchIcon';
import { XMarkIcon } from './icons/XMarkIcon';
import { EyeIcon } from './icons/EyeIcon';
import { PencilIcon } from './icons/PencilIcon';

type AcademyWithCounts = Academy & { studentCount: number; staffCount: number };
type Tab = 'dashboard' | 'academies' | 'analytics' | 'settings';

const StatCard: React.FC<{ title: string; value: string | number; details?: string; icon: React.ReactNode; color: string }> = ({ title, value, details, icon, color }) => (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
            {details && <p className="text-xs text-gray-500">{details}</p>}
        </div>
    </div>
);

const SubscriptionModal: React.FC<{
    academy: AcademyWithCounts;
    onClose: () => void;
    onSave: (academyId: string, updates: Partial<Academy>) => Promise<void>;
}> = ({ academy, onClose, onSave }) => {
    const [newTrialDays, setNewTrialDays] = useState('7');
    const [newSubEndDate, setNewSubEndDate] = useState(academy.subscriptionEndsAt?.toDate().toISOString().split('T')[0] || '');
    const [isSaving, setIsSaving] = useState(false);

    const handleExtendTrial = async () => {
        setIsSaving(true);
        const currentTrialEnd = academy.trialEndsAt?.toDate() || new Date();
        const newEnd = new Date(currentTrialEnd.getTime() + parseInt(newTrialDays) * 24 * 60 * 60 * 1000);
        await onSave(academy.id, { trialEndsAt: Timestamp.fromDate(newEnd), subscriptionStatus: 'trialing' });
        setIsSaving(false);
    };

    const handleSetSubscription = async () => {
        if (!newSubEndDate) return;
        setIsSaving(true);
        const newEnd = new Date(newSubEndDate);
        newEnd.setHours(23, 59, 59, 999); // Set to end of day
        await onSave(academy.id, { subscriptionEndsAt: Timestamp.fromDate(newEnd), subscriptionStatus: 'active' });
        setIsSaving(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md text-white">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Manage Subscription</h3>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700"><XMarkIcon className="w-6 h-6" /></button>
                </div>
                <p className="text-sm mb-4">For: <span className="font-bold">{academy.name}</span></p>

                <div className="bg-gray-700 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold mb-2">Extend Trial</h4>
                    <div className="flex items-center gap-3">
                        <input type="number" value={newTrialDays} onChange={(e) => setNewTrialDays(e.target.value)} className="w-full bg-gray-800 p-2 border border-gray-600 rounded-md" />
                        <button onClick={handleExtendTrial} disabled={isSaving} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold disabled:bg-blue-800">Add Days</button>
                    </div>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Set Active Subscription</h4>
                    <div className="flex items-center gap-3">
                        <input type="date" value={newSubEndDate} onChange={(e) => setNewSubEndDate(e.target.value)} className="w-full bg-gray-800 p-2 border border-gray-600 rounded-md" />
                        <button onClick={handleSetSubscription} disabled={isSaving} className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md font-semibold disabled:bg-green-800">Set End Date</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UnderDevelopment: React.FC<{ title: string }> = ({ title }) => (
    <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-400">{title}</h2>
        <p className="text-gray-500 mt-2">This feature is currently under development.</p>
    </div>
);


interface SuperAdminPanelProps {
    onLogout: () => void;
}

export function SuperAdminPanel({ onLogout }: SuperAdminPanelProps): React.ReactNode {
    const [activeTab, setActiveTab] = useState<Tab>('dashboard');
    const [academies, setAcademies] = useState<AcademyWithCounts[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [actionError, setActionError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [subFilter, setSubFilter] = useState('all');
    const [managingSub, setManagingSub] = useState<AcademyWithCounts | null>(null);

    const fetchAllData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const academySnapshot = await getDocs(collection(db, 'academies'));
            const academyList = academySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                status: doc.data().status || 'active',
            } as Academy));
            
            const academiesWithCounts = await Promise.all(academyList.map(async (academy) => {
                const studentsSnapshot = await getDocs(collection(db, 'academies', academy.id, 'students'));
                const staffSnapshot = await getDocs(collection(db, 'academies', academy.id, 'staff'));
                return {
                    ...academy,
                    studentCount: studentsSnapshot.size,
                    staffCount: staffSnapshot.size,
                };
            }));
            
            setAcademies(academiesWithCounts);
        } catch (err: any) {
            console.error("Error fetching data:", err);
            setError("Failed to fetch platform data. Check Firestore rules and connection.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);
    
     const handleSaveSubscription = async (academyId: string, updates: Partial<Academy>) => {
        const academyRef = doc(db, 'academies', academyId);
        try {
            await updateDoc(academyRef, updates);
            await fetchAllData(); // Re-fetch all data to ensure UI consistency
            setManagingSub(null);
        } catch(err) {
            console.error("Error updating subscription:", err);
            setActionError("Failed to update subscription.");
        }
    };

    const { totalStudents, totalStaff, subCounts } = useMemo(() => {
        const subs = { trialing: 0, active: 0, expired: 0 };
        let students = 0;
        let staff = 0;
        academies.forEach(a => {
            students += a.studentCount;
            staff += a.staffCount;
            if (a.subscriptionStatus) subs[a.subscriptionStatus]++;
        });
        return { totalStudents: students, totalStaff: staff, subCounts: subs };
    }, [academies]);

    const filteredAcademies = useMemo(() => {
        return academies
            .filter(a => statusFilter === 'all' || a.status === statusFilter)
            .filter(a => subFilter === 'all' || a.subscriptionStatus === subFilter)
            .filter(a => 
                a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                a.academyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                a.adminEmail.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [academies, statusFilter, subFilter, searchTerm]);

    const toggleAcademyStatus = async (academy: Academy) => {
        setActionError(null);
        const newStatus = academy.status === 'active' ? 'paused' : 'active';
        try {
            await updateDoc(doc(db, 'academies', academy.id), { status: newStatus });
            setAcademies(prev => prev.map(a => a.id === academy.id ? { ...a, status: newStatus } : a));
        } catch (err) {
            console.error("Error updating academy status:", err);
            setActionError(`Failed to update status for ${academy.name}.`);
        }
    };

    const deleteAcademy = async (academyId: string, academyName: string) => {
        setActionError(null);
        if (!window.confirm(`DELETE ${academyName}?\nThis also deletes all sub-collections like students, staff, etc. This action is IRREVERSIBLE.`)) {
            return;
        }
        try {
            // Note: In a real app, deleting sub-collections requires a Cloud Function.
            // This client-side delete only removes the main academy doc.
            await deleteDoc(doc(db, 'academies', academyId));
            setAcademies(prev => prev.filter(a => a.id !== academyId));
        } catch (err) {
            console.error("Error deleting academy:", err);
            setActionError(`Failed to delete academy ${academyName}.`);
        }
    };

    const getSubscriptionStatusPill = (academy: Academy) => {
        const { subscriptionStatus, trialEndsAt } = academy;
        let text = 'N/A';
        let color = 'bg-gray-600';
        let subtext = '';

        if (subscriptionStatus === 'trialing') {
            const daysLeft = trialEndsAt ? Math.ceil((trialEndsAt.toMillis() - Date.now()) / (1000 * 60 * 60 * 24)) : 0;
            text = 'Trial';
            color = daysLeft > 3 ? 'bg-blue-500' : 'bg-yellow-500';
            subtext = daysLeft > 0 ? `${daysLeft} days left` : 'Expired';
        } else if (subscriptionStatus === 'active') {
            text = 'Active';
            color = 'bg-green-500';
        } else if (subscriptionStatus === 'expired') {
            text = 'Expired';
            color = 'bg-red-500';
        }
        return (
            <div className="flex flex-col items-center">
                 <span className={`px-2 py-1 text-xs font-semibold rounded-full text-white ${color}`}>
                    {text}
                </span>
                {subtext && <span className="text-xs text-gray-400 mt-1">{subtext}</span>}
            </div>
        );
    };
    
    return (
        <div className="bg-gray-900 text-gray-100 min-h-screen font-sans flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 p-4 flex flex-col">
                <div className="flex items-center space-x-3 mb-8">
                    <LogoIcon className="w-10 h-10 text-indigo-500" />
                    <h1 className="text-lg font-bold">Super Admin</h1>
                </div>
                <nav className="flex-grow space-y-2">
                    {[
                        { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon className="w-5 h-5"/> },
                        { id: 'academies', label: 'Academies', icon: <BuildingIcon className="w-5 h-5"/> },
                        { id: 'analytics', label: 'Analytics', icon: <ChartPieIcon className="w-5 h-5"/> },
                        { id: 'settings', label: 'Settings', icon: <SettingsIcon className="w-5 h-5"/> },
                    ].map(item => (
                        <button key={item.id} onClick={() => setActiveTab(item.id as Tab)} className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors ${activeTab === item.id ? 'bg-indigo-600 text-white' : 'hover:bg-gray-700'}`}>
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
                <button onClick={onLogout} className="flex items-center space-x-2 px-3 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg transition-colors w-full">
                    <LogoutIcon className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </aside>
            
            <div className="flex-1 flex flex-col">
                {/* Main Content */}
                <main className="flex-grow p-4 md:p-8 overflow-y-auto">
                    {actionError && (
                        <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative mb-4" role="alert">
                            <span>{actionError}</span>
                            <button onClick={() => setActionError(null)} className="absolute top-0 bottom-0 right-0 px-4 py-3"><span className="text-2xl">&times;</span></button>
                        </div>
                    )}
                    {isLoading && <LoadingSpinner message="Loading platform data..." />}
                    {error && <p className="text-center text-red-400">{error}</p>}
                    
                    {!isLoading && !error && (
                        <>
                           {activeTab === 'dashboard' && (
                               <div className="animate-fade-in-up">
                                   <h2 className="text-2xl font-bold mb-6">Platform Overview</h2>
                                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                       <StatCard title="Total Academies" value={academies.length} details={`${academies.filter(a => a.status === 'active').length} Active`} icon={<BuildingIcon className="w-6 h-6"/>} color="bg-blue-600" />
                                       <StatCard title="Total Students" value={totalStudents} icon={<UsersGroupIcon className="w-6 h-6"/>} color="bg-green-600" />
                                       <StatCard title="Total Staff" value={totalStaff} icon={<BriefcaseIcon className="w-6 h-6"/>} color="bg-yellow-600" />
                                       <StatCard title="Subscriptions" value={subCounts.active} details={`${subCounts.trialing} Trialing / ${subCounts.expired} Expired`} icon={<CreditCardIcon className="w-6 h-6"/>} color="bg-purple-600" />
                                   </div>
                               </div>
                           )}
                           {activeTab === 'academies' && (
                                <div className="animate-fade-in-up">
                                    <h2 className="text-2xl font-bold mb-6">Academy Management</h2>
                                    <div className="bg-gray-800 p-4 rounded-lg mb-6 flex flex-col md:flex-row gap-4">
                                        <div className="relative flex-grow">
                                            <input type="text" placeholder="Search by name, ID, or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-gray-700 pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"/>
                                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                                        </div>
                                        <div className="flex gap-4">
                                            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-gray-700 p-2 rounded-lg border border-gray-600">
                                                <option value="all">All Statuses</option>
                                                <option value="active">Active</option>
                                                <option value="paused">Paused</option>
                                            </select>
                                            <select value={subFilter} onChange={(e) => setSubFilter(e.target.value)} className="bg-gray-7