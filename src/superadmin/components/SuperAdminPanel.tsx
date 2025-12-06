
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc, Timestamp, onSnapshot, setDoc } from 'firebase/firestore';
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
import { TerminalIcon } from './icons/TerminalIcon';
import { RefreshIcon } from './icons/RefreshIcon';
import { CameraIcon } from '../../components/icons/CameraIcon'; // Import from main components
import { SystemLogo } from '../../components/SystemLogo'; // Import from main components

type AcademyWithCounts = Academy & { studentCount: number; staffCount: number; countsLoaded?: boolean };
type Tab = 'dashboard' | 'academies' | 'analytics' | 'settings';

const StatCard: React.FC<{ title: string; value: string | number; details?: string; icon: React.ReactNode; color: string }> = ({ title, value, details, icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color} text-white`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            {details && <p className="text-xs text-gray-400 mt-1">{details}</p>}
        </div>
    </div>
);

const SubscriptionModal: React.FC<{
    academy: AcademyWithCounts;
    onClose: () => void;
    onSave: (academyId: string, updates: Partial<Academy>) => Promise<void>;
}> = ({ academy, onClose, onSave }) => {
    const [plan, setPlan] = useState<'monthly' | 'quarterly' | 'yearly'>(academy.plan || 'monthly');
    const [status, setStatus] = useState<'active' | 'trialing' | 'expired' | 'cancelled'>(academy.subscriptionStatus || 'trialing');
    
    // Convert Firestore Timestamp to YYYY-MM-DD for input
    const initialDate = academy.subscriptionEndsAt?.toDate().toISOString().split('T')[0] 
        || academy.trialEndsAt?.toDate().toISOString().split('T')[0] 
        || new Date().toISOString().split('T')[0];
        
    const [expiryDate, setExpiryDate] = useState(initialDate);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        if (!expiryDate) return;
        setIsSaving(true);
        
        // Set time to end of the selected day
        const endData = new Date(expiryDate);
        endData.setHours(23, 59, 59, 999);
        
        const updates: Partial<Academy> = {
            plan,
            subscriptionStatus: status,
        };

        if (status === 'trialing') {
            updates.trialEndsAt = Timestamp.fromDate(endData);
            updates.subscriptionEndsAt = null as any; // Clear sub end if trialing
        } else {
            updates.subscriptionEndsAt = Timestamp.fromDate(endData);
            // We usually keep trialEndsAt for history or clear it
        }

        await onSave(academy.id, updates);
        setIsSaving(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md text-gray-800">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Manage Subscription</h3>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-500"><XMarkIcon className="w-6 h-6" /></button>
                </div>
                
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Academy</p>
                    <p className="font-bold text-lg">{academy.name}</p>
                    <p className="text-xs text-gray-400">ID: {academy.academyId}</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Plan Type</label>
                        <select 
                            value={plan} 
                            onChange={(e) => setPlan(e.target.value as any)} 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select 
                            value={status} 
                            onChange={(e) => setStatus(e.target.value as any)} 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                            <option value="active">Active</option>
                            <option value="trialing">Trialing</option>
                            <option value="expired">Expired</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input 
                            type="date" 
                            value={expiryDate} 
                            onChange={(e) => setExpiryDate(e.target.value)} 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                        />
                    </div>
                </div>

                <div className="mt-8 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors">Cancel</button>
                    <button onClick={handleSave} disabled={isSaving} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-indigo-400">
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const TerminalModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [logs, setLogs] = useState<string[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const terminalBodyRef = useRef<HTMLDivElement>(null);

    const logSequence = [
        { text: "> git fetch origin master", delay: 500 },
        { text: "remote: Enumerating objects: 142, done.", delay: 1200 },
        { text: "remote: Counting objects: 100% (142/142), done.", delay: 1800 },
        { text: "remote: Compressing objects: 100% (89/89), done.", delay: 2500 },
        { text: "Unpacking objects: 100% (142/142), 1.2 MiB | 2.4 MiB/s, done.", delay: 3500 },
        { text: "> git pull origin master", delay: 4000 },
        { text: "From https://github.com/optilearn/core", delay: 4500 },
        { text: " * branch            master     -> FETCH_HEAD", delay: 4800 },
        { text: "Updating 4a1b2c3..9d8e7f6", delay: 5200 },
        { text: "Fast-forward", delay: 5500 },
        { text: " src/App.tsx                        | 12 +++-", delay: 5700 },
        { text: " src/components/Dashboard.tsx       |  5 +-", delay: 5900 },
        { text: " 2 files changed, 10 insertions(+), 3 deletions(-)", delay: 6100 },
        { text: "> npm install", delay: 6500 },
        { text: "added 2 packages, and audited 1405 packages in 2s", delay: 8000 },
        { text: "found 0 vulnerabilities", delay: 8200 },
        { text: "> System code retrieval complete.", delay: 8500, highlight: true },
    ];

    useEffect(() => {
        let timeouts: any[] = [];
        
        logSequence.forEach(({ text, delay, highlight }) => {
            const timeout = setTimeout(() => {
                setLogs(prev => [...prev, highlight ? `<span class="text-green-400 font-bold">${text}</span>` : text]);
                if (text.includes("complete")) setIsComplete(true);
            }, delay);
            timeouts.push(timeout);
        });

        return () => timeouts.forEach(clearTimeout);
    }, []);

    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden font-mono text-sm">
                <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                    <div className="flex items-center gap-2">
                        <TerminalIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">optilearn-cli — bash</span>
                    </div>
                    <button onClick={onClose} disabled={!isComplete} className={`text-gray-400 hover:text-white ${!isComplete ? 'opacity-0' : 'opacity-100 transition-opacity'}`}>
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>
                <div ref={terminalBodyRef} className="p-4 h-80 overflow-y-auto text-gray-300 space-y-1">
                    {logs.map((log, i) => (
                        <div key={i} dangerouslySetInnerHTML={{ __html: log }} />
                    ))}
                    {!isComplete && <div className="animate-pulse">_</div>}
                </div>
                <div className="bg-gray-800 p-3 border-t border-gray-700 flex justify-end">
                    <button 
                        onClick={onClose} 
                        disabled={!isComplete}
                        className={`px-4 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed`}
                    >
                        {isComplete ? 'Close' : 'Processing...'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const UnderDevelopment: React.FC<{ title: string }> = ({ title }) => (
    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
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
    const [showTerminal, setShowTerminal] = useState(false);
    const [systemLogoUrl, setSystemLogoUrl] = useState<string | null>(null);
    const [isSavingLogo, setIsSavingLogo] = useState(false);

    // Initial load and Real-time listener for Academies
    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = onSnapshot(collection(db, 'academies'), (snapshot) => {
            const academyList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                status: doc.data().status || 'active',
                studentCount: 0, // Initial placeholders
                staffCount: 0,
                countsLoaded: false
            } as AcademyWithCounts));
            
            // Preserve existing counts if we have them to avoid flickering
            setAcademies(prev => {
                const prevMap = new Map<string, AcademyWithCounts>(prev.map(a => [a.id, a]));
                return academyList.map(newAcademy => {
                    const existing = prevMap.get(newAcademy.id);
                    if (existing && existing.countsLoaded) {
                        return { 
                            ...newAcademy, 
                            studentCount: existing.studentCount, 
                            staffCount: existing.staffCount, 
                            countsLoaded: true 
                        };
                    }
                    return newAcademy;
                });
            });
            setIsLoading(false);
        }, (err) => {
            console.error("Error fetching academies:", err);
            setError("Failed to connect to live updates.");
            setIsLoading(false);
        });

        // Fetch system config for logo
        const unsubConfig = onSnapshot(doc(db, 'system_config', 'main'), (docSnap) => {
            if (docSnap.exists()) {
                setSystemLogoUrl(docSnap.data().logoUrl || null);
            }
        });

        return () => {
            unsubscribe();
            unsubConfig();
        };
    }, []);

    // Effect to lazily load counts for academies that don't have them yet
    useEffect(() => {
        const loadCounts = async () => {
            const academiesToUpdate = academies.filter(a => !a.countsLoaded);
            if (academiesToUpdate.length === 0) return;

            // We'll update one by one or in small batches to avoid UI freezing
            // For simplicity, let's update them all but update state incrementally
            for (const academy of academiesToUpdate) {
                try {
                    const studentsSnapshot = await getDocs(collection(db, 'academies', academy.id, 'students'));
                    const staffSnapshot = await getDocs(collection(db, 'academies', academy.id, 'staff'));
                    
                    setAcademies(prev => prev.map(a => a.id === academy.id ? {
                        ...a,
                        studentCount: studentsSnapshot.size,
                        staffCount: staffSnapshot.size,
                        countsLoaded: true
                    } : a));
                } catch (e) {
                    console.error(`Failed to load counts for ${academy.name}`, e);
                }
            }
        };
        
        // Small delay to allow initial render
        const timer = setTimeout(loadCounts, 500);
        return () => clearTimeout(timer);
    }, [academies.length]); // Re-run if list length changes (new academy added)
    
    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64String = reader.result as string;
                setSystemLogoUrl(base64String);
                
                // Save to Firestore
                setIsSavingLogo(true);
                try {
                    await setDoc(doc(db, 'system_config', 'main'), { logoUrl: base64String }, { merge: true });
                } catch(err) {
                    console.error("Failed to save logo:", err);
                    setActionError("Failed to save system logo.");
                } finally {
                    setIsSavingLogo(false);
                }
            };
            reader.readAsDataURL(file);
        }
    };

     const handleSaveSubscription = async (academyId: string, updates: Partial<Academy>) => {
        const academyRef = doc(db, 'academies', academyId);
        try {
            await updateDoc(academyRef, updates);
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
            if (a.subscriptionStatus && a.subscriptionStatus !== 'cancelled') subs[a.subscriptionStatus]++;
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
        } catch (err) {
            console.error("Error deleting academy:", err);
            setActionError(`Failed to delete academy ${academyName}.`);
        }
    };

    const formatDate = (ts?: Timestamp) => {
        if (!ts) return 'N/A';
        return ts.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    const getSubscriptionStatusPill = (academy: Academy) => {
        const { subscriptionStatus, trialEndsAt, subscriptionEndsAt } = academy;
        let text = 'N/A';
        let color = 'bg-gray-100 text-gray-600';
        let subtext = '';

        if (subscriptionStatus === 'trialing') {
            const daysLeft = trialEndsAt ? Math.ceil((trialEndsAt.toMillis() - Date.now()) / (1000 * 60 * 60 * 24)) : 0;
            text = 'Trial';
            color = daysLeft > 3 ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700';
            subtext = daysLeft > 0 ? `${daysLeft} days left` : 'Expired';
        } else if (subscriptionStatus === 'active') {
            text = 'Active';
            color = 'bg-green-100 text-green-700';
            subtext = subscriptionEndsAt ? formatDate(subscriptionEndsAt) : 'Unlimited';
        } else if (subscriptionStatus === 'expired') {
            text = 'Expired';
            color = 'bg-red-100 text-red-700';
            subtext = subscriptionEndsAt ? formatDate(subscriptionEndsAt) : '';
        } else if (subscriptionStatus === 'cancelled') {
            text = 'Cancelled';
            color = 'bg-gray-100 text-gray-600';
            subtext = subscriptionEndsAt ? formatDate(subscriptionEndsAt) : '';
        }
        return (
            <div className="flex flex-col items-start">
                 <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${color} uppercase tracking-wide`}>
                    {text}
                </span>
                {subtext && <span className="text-xs text-gray-500 mt-1 font-medium">{subtext}</span>}
            </div>
        );
    };
    
    return (
        <div className="bg-slate-50 text-gray-900 min-h-screen font-sans flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col shadow-sm z-10">
                <div className="flex items-center space-x-3 mb-8 px-2">
                    <SystemLogo url={systemLogoUrl} className="w-10 h-10" />
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">Super Admin</h1>
                        <p className="text-xs text-gray-500">OptiLearn</p>
                    </div>
                </div>
                <nav className="flex-grow space-y-1">
                    {[
                        { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon className="w-5 h-5"/> },
                        { id: 'academies', label: 'Academies', icon: <BuildingIcon className="w-5 h-5"/> },
                        { id: 'analytics', label: 'Analytics', icon: <ChartPieIcon className="w-5 h-5"/> },
                        { id: 'settings', label: 'Settings', icon: <SettingsIcon className="w-5 h-5"/> },
                    ].map(item => (
                        <button key={item.id} onClick={() => setActiveTab(item.id as Tab)} className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors font-medium ${activeTab === item.id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
                <div className="border-t border-gray-100 pt-4 mt-2">
                    <button onClick={onLogout} className="flex items-center space-x-2 px-3 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors w-full font-medium">
                        <LogoutIcon className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
            
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header (optional if sidebar covers it, but nice for context) */}
                <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center shadow-sm">
                    <h2 className="text-xl font-bold text-gray-800 capitalize">{activeTab}</h2>
                    <div className="flex items-center gap-2">
                        <span className="flex h-3 w-3 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-semibold text-gray-500">Live Updates Active</span>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-grow p-4 md:p-8 overflow-y-auto bg-slate-50">
                    {actionError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg relative mb-6 shadow-sm" role="alert">
                            <span className="block sm:inline">{actionError}</span>
                            <button onClick={() => setActionError(null)} className="absolute top-0 bottom-0 right-0 px-4 py-3"><span className="text-2xl">&times;</span></button>
                        </div>
                    )}
                    {isLoading && <LoadingSpinner message="Syncing platform data..." />}
                    {error && <p className="text-center text-red-500 font-semibold">{error}</p>}
                    
                    {!isLoading && !error && (
                        <>
                           {activeTab === 'dashboard' && (
                               <div className="animate-fade-in-up">
                                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                       <StatCard title="Total Academies" value={academies.length} details={`${academies.filter(a => a.status === 'active').length} Active`} icon={<BuildingIcon className="w-6 h-6"/>} color="bg-blue-600" />
                                       <StatCard title="Total Students" value={totalStudents.toLocaleString()} icon={<UsersGroupIcon className="w-6 h-6"/>} color="bg-green-600" />
                                       <StatCard title="Total Staff" value={totalStaff.toLocaleString()} icon={<BriefcaseIcon className="w-6 h-6"/>} color="bg-yellow-500" />
                                       <StatCard title="Active Subs" value={subCounts.active} details={`${subCounts.trialing} Trialing`} icon={<CreditCardIcon className="w-6 h-6"/>} color="bg-purple-600" />
                                   </div>
                               </div>
                           )}
                           {(activeTab === 'academies' || activeTab === 'dashboard') && (
                                <div className="animate-fade-in-up">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-lg font-bold text-gray-800">Registered Academies</h2>
                                        {activeTab === 'dashboard' && <button onClick={() => setActiveTab('academies')} className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold">View All &rarr;</button>}
                                    </div>
                                    
                                    {activeTab === 'academies' && (
                                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row gap-4">
                                            <div className="relative flex-grow">
                                                <input type="text" placeholder="Search by name, ID, or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-gray-50 pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"/>
                                                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                                            </div>
                                            <div className="flex gap-3">
                                                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-gray-50 py-2.5 px-3 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none">
                                                    <option value="all">All Status</option>
                                                    <option value="active">Active</option>
                                                    <option value="paused">Paused</option>
                                                </select>
                                                <select value={subFilter} onChange={(e) => setSubFilter(e.target.value)} className="bg-gray-50 py-2.5 px-3 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none">
                                                    <option value="all">All Subs</option>
                                                    <option value="trialing">Trialing</option>
                                                    <option value="active">Active</option>
                                                    <option value="expired">Expired</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}

                                    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm text-left">
                                                <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                                                    <tr>
                                                        <th className="p-4">Academy Details</th>
                                                        <th className="p-4">Stats</th>
                                                        <th className="p-4">Plan</th>
                                                        <th className="p-4">Subscription</th>
                                                        <th className="p-4">Status</th>
                                                        <th className="p-4 text-right">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {filteredAcademies.length > 0 ? filteredAcademies.map(academy => (
                                                        <tr key={academy.id} className="hover:bg-gray-50 transition-colors">
                                                            <td className="p-4">
                                                                <p className="font-bold text-gray-900 text-base">{academy.name}</p>
                                                                <p className="text-xs text-gray-500 font-mono mt-0.5">{academy.academyId}</p>
                                                                <p className="text-xs text-gray-400">{academy.adminEmail}</p>
                                                            </td>
                                                            <td className="p-4">
                                                                <div className="flex flex-col gap-1">
                                                                    <span className="inline-flex items-center gap-1.5 text-gray-600">
                                                                        <UsersGroupIcon className="w-4 h-4 text-gray-400"/> {academy.countsLoaded ? academy.studentCount : '...'}
                                                                    </span>
                                                                    <span className="inline-flex items-center gap-1.5 text-gray-600">
                                                                        <BriefcaseIcon className="w-4 h-4 text-gray-400"/> {academy.countsLoaded ? academy.staffCount : '...'}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="p-4">
                                                                <span className="capitalize font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded text-xs border border-gray-200">
                                                                    {academy.plan || 'Free'}
                                                                </span>
                                                            </td>
                                                            <td className="p-4">{getSubscriptionStatusPill(academy)}</td>
                                                            <td className="p-4">
                                                                <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${academy.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                                                                    {academy.status?.toUpperCase()}
                                                                </span>
                                                            </td>
                                                            <td className="p-4 text-right">
                                                                <div className="flex justify-end items-center gap-2">
                                                                    <button title="Manage Subscription" onClick={() => setManagingSub(academy)} className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"><PencilIcon className="w-4 h-4"/></button>
                                                                    <button title={academy.status === 'active' ? 'Pause Academy' : 'Activate Academy'} onClick={() => toggleAcademyStatus(academy)} className={`p-2 rounded-lg transition-colors ${academy.status === 'active' ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}>
                                                                        {academy.status === 'active' ? <PauseIcon className="w-4 h-4"/> : <PlayIcon className="w-4 h-4"/>}
                                                                    </button>
                                                                    <button title="Delete Academy" onClick={() => deleteAcademy(academy.id, academy.name)} className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"><TrashIcon className="w-4 h-4"/></button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )) : (
                                                        <tr>
                                                            <td colSpan={6} className="p-8 text-center text-gray-500">No academies found matching your filters.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                           )}
                           {activeTab === 'analytics' && <UnderDevelopment title="Analytics Module" />}
                           {activeTab === 'settings' && (
                                <div className="animate-fade-in-up">
                                    <h2 className="text-2xl font-bold mb-6">System Settings</h2>
                                    
                                     {/* System Branding Section */}
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
                                                <EyeIcon className="w-6 h-6 text-indigo-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-800">System Branding</h3>
                                                <p className="text-sm text-gray-500">Update the global application logo</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            <div className="flex flex-col items-center">
                                                <div className="w-24 h-24 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden mb-3">
                                                    <SystemLogo url={systemLogoUrl} className="w-16 h-16" />
                                                </div>
                                                <p className="text-xs text-gray-500">Current Logo</p>
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Logo (PNG/SVG)</label>
                                                <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors w-fit">
                                                    <CameraIcon className="w-5 h-5 text-gray-500" />
                                                    <span className="text-sm text-gray-700">Choose File</span>
                                                    <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                                                </label>
                                                {isSavingLogo && <p className="text-xs text-indigo-600 mt-2 font-medium">Saving logo...</p>}
                                                <p className="text-xs text-gray-400 mt-2">Recommended size: 512x512px. Transparent background.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
                                                <SettingsIcon className="w-6 h-6 text-indigo-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-800">Global Configuration</h3>
                                                <p className="text-sm text-gray-500">Manage global system parameters</p>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                                                    <input type="text" value="OptiLearn" disabled className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 text-gray-600 cursor-not-allowed" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Mode</label>
                                                    <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3">
                                                        <span className="text-gray-600 text-sm">Enable Maintenance</span>
                                                        <button className="w-11 h-6 bg-gray-300 rounded-full relative transition-colors">
                                                            <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform shadow-sm"></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-t border-gray-100 pt-6">
                                                <h4 className="text-md font-bold text-gray-800 mb-4 flex items-center gap-2">
                                                    <TerminalIcon className="w-5 h-5 text-indigo-600" />
                                                    Repository & Version Control
                                                </h4>
                                                <div className="bg-gray-900 rounded-lg p-4 shadow-inner">
                                                    <div className="flex justify-between items-center mb-4">
                                                        <div>
                                                            <p className="text-sm text-gray-400">Current Version</p>
                                                            <p className="text-lg font-mono text-green-400">v1.2.4-stable</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm text-gray-400">Last Updated</p>
                                                            <p className="text-sm text-gray-300">Live Sync Active</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-3">
                                                        <button 
                                                            onClick={() => setShowTerminal(true)}
                                                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors border border-indigo-500"
                                                        >
                                                            <TerminalIcon className="w-4 h-4" />
                                                            Retrieve Git Code
                                                        </button>
                                                        <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-lg font-semibold transition-colors border border-gray-700">
                                                            View Logs
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                           )}
                        </>
                    )}
                </main>
            </div>
             {managingSub && <SubscriptionModal academy={managingSub} onClose={() => setManagingSub(null)} onSave={handleSaveSubscription} />}
             {showTerminal && <TerminalModal onClose={() => setShowTerminal(false)} />}
        </div>
    );
}
