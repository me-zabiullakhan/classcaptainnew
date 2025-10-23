


import React, { useState, useEffect, useCallback } from 'react';
// Firebase
import { auth, db, firebaseConfig } from './firebaseConfig';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { collection, doc, onSnapshot, addDoc, updateDoc, setDoc, getDoc, query, where, getDocs, writeBatch, serverTimestamp, Timestamp, runTransaction } from 'firebase/firestore';

// Types
import type { CurrentUser, Academy, Batch, Student, Staff, FeeCollection, BatchAccessPermissions, ScheduleItem } from './types';

// Demo Data
import { demoStudents, demoBatches, demoStaff } from './demoData';

// Components
import { SplashScreen } from './components/SplashScreen';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { BottomNav } from './components/BottomNav';
import { SideNav } from './components/SideNav';
import { BatchesPage } from './components/BatchesPage';
import { NewBatchPage } from './components/NewBatchPage';
import { StudentOptionsPage } from './components/StudentOptionsPage';
import { NewStudentPage } from './components/NewStudentPage';
import { SelectBatchForAttendancePage } from './components/SelectBatchForAttendancePage';
import { TakeAttendancePage } from './components/TakeAttendancePage';
import { ActiveStudentsPage } from './components/ActiveStudentsPage';
import { BirthdayListPage } from './components/BirthdayListPage';
import { RegistrationFormListPage } from './components/RegistrationFormListPage';
import { RegistrationFormViewPage } from './components/RegistrationFormViewPage';
import { FeesOptionsPage } from './components/FeesOptionsPage';
import { SelectBatchForFeesPage } from './components/SelectBatchForFeesPage';
import { SelectStudentForFeesPage } from './components/SelectStudentForFeesPage';
import { StudentFeeDetailsPage } from './components/StudentFeeDetailsPage';
import { FeeCollectionReportPage } from './components/FeeCollectionReportPage';
import { FeeDuesListPage } from './components/FeeDuesListPage';
import { MyAccountPage } from './components/MyAccountPage';
import { ConfigurationWarning } from './components/ConfigurationWarning';
import { ConnectionErrorBanner } from './components/ConnectionErrorBanner';
import { OfflineIndicator } from './components/OfflineIndicator';
import { SuperAdminPanel } from './components/SuperAdminPanel';
import { DataConsentModal } from './components/DataConsentModal';
import { EditStudentPage } from './components/EditStudentPage';
import { InactiveStudentsPage } from './components/InactiveStudentsPage';
import { EditBatchPage } from './components/EditBatchPage';
import { ScheduleClassesPage } from './components/ScheduleClassesPage';
import { SubscriptionPage } from './components/SubscriptionPage';
import { SubscriptionExpiredPage } from './components/SubscriptionExpiredPage';
// Student view components
import { StudentDashboardPage } from './components/student/StudentDashboardPage';
import { StudentFeeStatusPage } from './components/student/StudentFeeStatusPage';
import { StudentSideNav } from './components/student/StudentSideNav';
import { MyAcademyPage } from './components/student/MyAcademyPage';
import { StudentAttendancePage } from './components/student/StudentAttendancePage';
import { StudentTimetablePage } from './components/student/StudentTimetablePage';
// Staff view components
import { StaffDashboardPage } from './components/staff/StaffDashboardPage';
import { StaffHeader } from './components/staff/StaffHeader';
import { StaffSideNav } from './components/staff/StaffSideNav';
import { StaffManagerPage } from './components/StaffManagerPage';
import { NewStaffPage } from './components/NewStaffPage';
import { StaffOptionsPage } from './components/StaffOptionsPage';
import { InactiveStaffPage } from './components/InactiveStaffPage';
import { StaffBatchAccessPage } from './components/StaffBatchAccessPage';
import { StaffSchedulePage } from './components/staff/StaffSchedulePage';
import { SettingsPage } from './components/SettingsPage';
import { CustomSmsSettingsPage } from './components/CustomSmsSettingsPage';
import { WrenchIcon } from './components/icons/WrenchIcon';

// Check if Firebase config is still the placeholder
const isPlaceholderConfig = firebaseConfig.apiKey.includes('placeholder');

const DevInProgressPopup: React.FC<{ featureName: string; onClose: () => void }> = ({ featureName, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
        <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg max-w-sm mx-auto text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 dark:bg-yellow-900/40 mb-5">
                <WrenchIcon className="h-9 w-9 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Feature Under Development</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
                The "{featureName}" feature is not yet implemented. Please check back later!
            </p>
            <button
                onClick={onClose}
                className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
            >
                Got it
            </button>
        </div>
    </div>
);


export default function App() {
    // Theme state
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          return 'dark';
        }
        return 'light';
    });

    // App state
    const [page, setPage] = useState('login');
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);

    // Data state
    const [academy, setAcademy] = useState<Academy | null>(null);
    const [batches, setBatches] = useState<Batch[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [staff, setStaff] = useState<Staff[]>([]);
    const [feeCollections, setFeeCollections] = useState<FeeCollection[]>([]);

    // Page-specific state
    const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
    const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
    const [studentListFilter, setStudentListFilter] = useState('all');

    // UI State
    const [connectionError, setConnectionError] = useState<string | null>(null);
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const [showConsent, setShowConsent] = useState(!localStorage.getItem('dataConsentAccepted'));
    const [showDevPopup, setShowDevPopup] = useState<string | null>(null);

    const isDemoMode = (currentUser?.role === 'admin' && currentUser.data.id === 'demo-academy-id') ||
        ((currentUser?.role === 'student' || currentUser?.role === 'staff') && currentUser.academyId === 'ACDEMO');

    // Theme effect
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    const handleToggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    // Online/Offline status effect
    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Auth effect
    useEffect(() => {
        if (isPlaceholderConfig) {
            setIsLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
            if (user) {
                const q = query(collection(db, "academies"), where("adminUid", "==", user.uid));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const academyDoc = querySnapshot.docs[0];
                    const academyData = { id: academyDoc.id, ...academyDoc.data() } as Academy;
                    setAcademy(academyData);
                    setCurrentUser({ role: 'admin', data: academyData });
                    setPage('dashboard');
                } else {
                     const isGoogleReg = sessionStorage.getItem('google_reg_flow') === 'true';
                     if (isGoogleReg) {
                        // Let the registration page handle it.
                     } else {
                        // User is authenticated but has no academy, might be an interrupted registration.
                        setAuthError("No academy found for your account. Please register.");
                        await signOut(auth);
                     }
                }
            } else {
                setCurrentUser(null);
                setAcademy(null);
            }
            setIsLoading(false);
        }, (error) => {
            console.error("Auth state error:", error);
            setConnectionError("Authentication service is unavailable. Please check your connection.");
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Firestore data listeners effect
    useEffect(() => {
        if (!currentUser || isPlaceholderConfig || isDemoMode) {
            if (isDemoMode) {
                setAcademy({ id: 'demo-academy-id', academyId: 'ACDEMO', name: 'Demo Academy', adminUid: 'demo-admin-uid', adminEmail: 'demo@classcaptain.com', status: 'active', subscriptionStatus: 'active' });
                setStudents(demoStudents);
                setBatches(demoBatches);
                setStaff(demoStaff);
                setFeeCollections([]);
            }
            return;
        };

        // FIX: The superadmin role does not have an academyId and should not trigger data fetching for an academy.
        if (currentUser.role === 'superadmin') {
            return;
        }

        const academyId = (currentUser.role === 'admin') ? currentUser.data.id : currentUser.academyId;
        if (!academyId) return;

        const unsubscribers: (() => void)[] = [];

        // Academy details for non-admins
        // FIX: The 'superadmin' role is already handled by a guard clause at the start of this effect.
        // This removes the redundant and incorrect type comparison.
        if (currentUser.role !== 'admin') {
            const academyDocRef = doc(db, 'academies', academyId);
            const unsubAcademy = onSnapshot(academyDocRef, (docSnap) => {
                if (docSnap.exists()) {
                    setAcademy({ id: docSnap.id, ...docSnap.data() } as Academy);
                }
            });
            unsubscribers.push(unsubAcademy);
        }

        const collectionsToSubscribe = ['batches', 'students', 'staff', 'fees'];
        const setters: any = {
            batches: setBatches,
            students: setStudents,
            staff: setStaff,
            fees: setFeeCollections
        };

        collectionsToSubscribe.forEach(coll => {
            if (coll === 'staff' && currentUser.role !== 'admin') return;
            
            const collRef = collection(db, `academies/${academyId}/${coll}`);
            const unsub = onSnapshot(collRef, (snapshot) => {
                const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
                setters[coll](list);
            }, (err) => console.error(`Error fetching ${coll}:`, err));
            unsubscribers.push(unsub);
        });


        return () => unsubscribers.forEach(unsub => unsub());

    }, [currentUser, isDemoMode]);

    // Subscription status check effect
    useEffect(() => {
        if (isPlaceholderConfig || !academy || currentUser?.role !== 'admin' || isDemoMode) return;

        const checkSubscription = async () => {
            const now = Timestamp.now();
            let shouldUpdate = false;
            let newStatus = academy.subscriptionStatus;
    
            if (academy.subscriptionStatus === 'trialing' && academy.trialEndsAt && academy.trialEndsAt < now) {
                newStatus = 'expired';
                shouldUpdate = true;
            } else if (academy.subscriptionStatus === 'active' && academy.subscriptionEndsAt && academy.subscriptionEndsAt < now) {
                newStatus = 'expired';
                shouldUpdate = true;
            }
    
            if (shouldUpdate) {
                try {
                    const academyRef = doc(db, 'academies', academy.id);
                    await updateDoc(academyRef, { subscriptionStatus: newStatus });
                    // The onSnapshot listener will update the local 'academy' state automatically.
                } catch (error) {
                    console.error("Error updating subscription status:", error);
                }
            }
        };
    
        checkSubscription();
    }, [academy, currentUser, isDemoMode]);


    // Handlers
    const handleLogin = (user: CurrentUser) => {
        setAuthError(null);
        setCurrentUser(user);
        if (user.role === 'admin') {
            setAcademy(user.data);
        } else if (user.role === 'superadmin') {
             setAcademy(null);
        }
        setPage('dashboard');
    };

    const handleRegisterSuccess = (academy: Academy) => {
        setAcademy(academy);
        setCurrentUser({ role: 'admin', data: academy });
        setPage('dashboard');
    }

    const handleLogout = async () => {
        setIsNavOpen(false);
        if(!isDemoMode) {
             try {
                await signOut(auth);
            } catch (error) {
                console.error("Logout Error:", error);
            }
        }
        setCurrentUser(null);
        setAcademy(null);
        setPage('login');
    };
    
    // CRUD Handlers
    const handleSaveBatch = async (batchData: Omit<Batch, 'id' | 'currentStudents' | 'isActive'>) => {
        if (!academy || isDemoMode) { alert("Demo mode: Cannot save data."); return; }
        await addDoc(collection(db, `academies/${academy.id}/batches`), { ...batchData, currentStudents: 0, isActive: true });
        setPage('batches');
    };

    const handleUpdateBatch = async (batchId: string, batchData: Omit<Batch, 'id' | 'currentStudents'>) => {
         if (!academy || isDemoMode) { alert("Demo mode: Cannot save data."); return; }
        const batchRef = doc(db, `academies/${academy.id}/batches`, batchId);
        await updateDoc(batchRef, batchData);
        setPage('batches');
    };

    const handleSaveStudent = async (studentData: Omit<Student, 'id' | 'isActive' | 'rollNumber'>): Promise<Student | void> => {
        if (!academy || isDemoMode) { alert("Demo mode: Cannot save data."); return; }
        
        try {
            const studentWithDefaults = await runTransaction(db, async (transaction) => {
                const counterRef = doc(db, 'counters', `studentCounter_${academy.id}`);
                const counterDoc = await transaction.get(counterRef);

                const lastId = counterDoc.exists() ? counterDoc.data().lastId : 0;
                const newIdNumber = lastId + 1;
                const rollNumber = `S${String(newIdNumber).padStart(4, '0')}`;

                const newStudentRef = doc(collection(db, `academies/${academy.id}/students`));
                const finalStudentData = {
                    ...studentData,
                    rollNumber,
                    isActive: true,
                    createdAt: serverTimestamp(),
                };
                transaction.set(newStudentRef, finalStudentData);
                transaction.set(counterRef, { lastId: newIdNumber }, { merge: !counterDoc.exists() });

                return { ...finalStudentData, id: newStudentRef.id };
            });

            // Update batch counts
            const batchUpdatePromises = studentData.batches.map(batchName => {
                const batchToUpdate = batches.find(b => b.name === batchName);
                if (batchToUpdate) {
                    const batchRef = doc(db, `academies/${academy.id}/batches`, batchToUpdate.id);
                    return updateDoc(batchRef, {
                        currentStudents: batchToUpdate.currentStudents + 1
                    });
                }
                return Promise.resolve();
            });
            await Promise.all(batchUpdatePromises);
            
            return studentWithDefaults;
        } catch (error) {
            console.error("Error saving student:", error);
            alert("Failed to save student. Please try again.");
        }
    };
    
    const handleUpdateStudent = async (studentData: Omit<Student, 'id' | 'isActive'>) => {
        if (!academy || !selectedStudentId || isDemoMode) { alert("Demo mode or error."); return; }
        const studentRef = doc(db, `academies/${academy.id}/students`, selectedStudentId);
        await updateDoc(studentRef, studentData);
        setPage('active-students');
    };

    const handleToggleStudentStatus = async (studentId: string) => {
        if (!academy || isDemoMode) { alert("Demo mode."); return; }
        const student = students.find(s => s.id === studentId);
        if (!student) return;
        const studentRef = doc(db, `academies/${academy.id}/students`, studentId);
        await updateDoc(studentRef, { isActive: !student.isActive });
    };
    
    const handleSavePayment = async (paymentData: Omit<FeeCollection, 'id'>) => {
        if (!academy) return;
        if (isDemoMode) {
            throw { code: 'demo-mode', message: 'This is a demo. Data cannot be saved.' };
        }
        await addDoc(collection(db, `academies/${academy.id}/fees`), {
            ...paymentData,
            paymentDate: Timestamp.fromDate(new Date(paymentData.paymentDate as any)),
            createdAt: serverTimestamp()
        });
    };
    
     const handleSaveStaff = async (staffData: Omit<Staff, 'id'>) => {
        if (!academy || isDemoMode) { alert("Demo mode."); return; }
        await addDoc(collection(db, `academies/${academy.id}/staff`), staffData);
        setPage('staff-manager');
    };
    
    const handleToggleStaffStatus = async (staffId: string) => {
        if (!academy || isDemoMode) { alert("Demo mode."); return; }
        const member = staff.find(s => s.id === staffId);
        if (!member) return;
        const staffRef = doc(db, `academies/${academy.id}/staff`, staffId);
        await updateDoc(staffRef, { isActive: !member.isActive });
    };
    
    const handleSaveStaffAccess = async (staffId: string, batchAccess: { [batchId: string]: BatchAccessPermissions }) => {
        if (!academy || isDemoMode) { alert("Demo mode."); return; }
        const staffRef = doc(db, `academies/${academy.id}/staff`, staffId);
        await updateDoc(staffRef, { batchAccess });
        setPage('staff-manager');
    };
    
    const handleSaveAcademyDetails = async (details: Partial<Academy>) => {
        if (!academy || isDemoMode) { alert("Demo mode."); return; }
        const academyRef = doc(db, 'academies', academy.id);
        await updateDoc(academyRef, details);
        setAcademy(prev => prev ? { ...prev, ...details } : null);
    };

    const handleSaveDailySchedule = async (date: string, batchId: string, scheduleItems: ScheduleItem[]) => {
        if (!academy || isDemoMode) {
            alert("Demo mode: Cannot save schedule.");
            throw new Error("Demo mode");
        }
        const scheduleRef = doc(db, `academies/${academy.id}/schedules`, date);
        try {
            await runTransaction(db, async (transaction) => {
                const scheduleDoc = await transaction.get(scheduleRef);
                if (!scheduleDoc.exists()) {
                    transaction.set(scheduleRef, { [batchId]: scheduleItems });
                } else {
                    transaction.update(scheduleRef, { [batchId]: scheduleItems });
                }
            });
        } catch (e) {
            console.error("Error saving schedule:", e);
            throw new Error("Failed to save schedule. Please try again.");
        }
    };
    
    const handleSubscribe = async (plan: 'monthly' | 'quarterly' | 'yearly', months: number) => {
        if (!academy || isDemoMode) { alert("Demo mode."); return; }

        const newExpiryDate = new Date();
        newExpiryDate.setMonth(newExpiryDate.getMonth() + months);

        const academyRef = doc(db, 'academies', academy.id);
        await updateDoc(academyRef, {
            subscriptionStatus: 'active',
            subscriptionEndsAt: Timestamp.fromDate(newExpiryDate),
            plan: plan
        });
        // The onSnapshot listener will update the academy state, and re-render the app
    };


    // Navigation handler
    const handleNavigate = (targetPage: string, params?: { [key: string]: any }) => {
        if (params?.batchId) setSelectedBatchId(params.batchId);
        if (params?.studentId) setSelectedStudentId(params.studentId);
        if (params?.staffId) setSelectedStaffId(params.staffId);
        if (params?.filter) setStudentListFilter(params.filter);
        setPage(targetPage);
        setIsNavOpen(false);
    };

    // Render logic
    if (isLoading) return <SplashScreen />;

    if (showConsent) {
        return <DataConsentModal onAccept={() => {
            localStorage.setItem('dataConsentAccepted', 'true');
            setShowConsent(false);
        }} />;
    }
    
    // Auth screens
    if (!currentUser) {
        return (
            <div className={`font-sans antialiased text-gray-900 bg-gray-50 dark:bg-gray-900 ${theme}`}>
                {isPlaceholderConfig && <ConfigurationWarning />}
                {page === 'register' ? (
                    <RegisterPage onRegisterSuccess={handleRegisterSuccess} onNavigateToLogin={() => setPage('login')} />
                ) : (
                    <LoginPage onLogin={handleLogin} onNavigateToRegister={() => setPage('register')} externalError={authError} clearExternalError={() => setAuthError(null)} />
                )}
            </div>
        );
    }
    
    const isSubscriptionExpired = currentUser?.role === 'admin' && academy?.subscriptionStatus === 'expired';
    if (isSubscriptionExpired) {
        return <SubscriptionExpiredPage onNavigate={handleNavigate} onLogout={handleLogout} />;
    }


    const renderPage = () => {
        if (!currentUser || (currentUser.role !== 'superadmin' && !academy)) {
            return null; // Should be handled by top-level conditional
        }
        
        // Find selected items
        const selectedBatch = batches.find(b => b.id === selectedBatchId);
        const selectedStudent = students.find(s => s.id === selectedStudentId);
        const selectedStaffMember = staff.find(s => s.id === selectedStaffId);

        switch(currentUser.role) {
            case 'admin':
                switch (page) {
                    case 'dashboard': return <Dashboard onNavigate={handleNavigate} academy={academy!} students={students} batches={batches} staff={staff} onShowDevPopup={setShowDevPopup} />;
                    case 'my-account': return <MyAccountPage onBack={() => setPage('dashboard')} onLogout={handleLogout} academy={academy!} onSave={handleSaveAcademyDetails} />;
                    case 'batches': return <BatchesPage onBack={() => setPage('dashboard')} onCreate={() => setPage('new-batch')} batches={batches} onViewStudents={(batchName) => handleNavigate('active-students', { filter: batchName })} onEditBatch={(batchId) => handleNavigate('edit-batch', { batchId })} />;
                    case 'new-batch': return <NewBatchPage onBack={() => setPage('batches')} onSave={handleSaveBatch} />;
                    case 'edit-batch': return selectedBatch ? <EditBatchPage onBack={() => setPage('batches')} batch={selectedBatch} onSave={handleUpdateBatch} /> : <p>Batch not found</p>;
                    case 'student-options': return <StudentOptionsPage onBack={() => setPage('dashboard')} onNavigate={handleNavigate} onShowDevPopup={setShowDevPopup} />;
                    case 'active-students': return <ActiveStudentsPage onBack={() => setPage('student-options')} students={students} batches={batches} onToggleStudentStatus={handleToggleStudentStatus} onEditStudent={(studentId) => handleNavigate('edit-student', { studentId })} onViewStudent={(studentId) => handleNavigate('view-registration-form', { studentId })} initialFilter={studentListFilter} />;
                    case 'inactive-students': return <InactiveStudentsPage onBack={() => setPage('student-options')} students={students} batches={batches} onToggleStudentStatus={handleToggleStudentStatus} />;
                    case 'new-student': return <NewStudentPage onBack={() => setPage('student-options')} batches={batches} onSave={handleSaveStudent} academyId={academy!.academyId} />;
                    case 'edit-student': return selectedStudent ? <EditStudentPage onBack={() => setPage('active-students')} student={selectedStudent} batches={batches} onUpdate={handleUpdateStudent} /> : <p>Student not found</p>;
                    case 'birthday-list': return <BirthdayListPage onBack={() => setPage('student-options')} students={students} />;
                    case 'registration-form-list': return <RegistrationFormListPage onBack={() => setPage('student-options')} students={students} onSelectStudent={(studentId) => handleNavigate('view-registration-form', { studentId })} />;
                    case 'view-registration-form': return selectedStudent ? <RegistrationFormViewPage onBack={() => setPage(studentListFilter === 'all' ? 'registration-form-list' : 'active-students')} student={selectedStudent} /> : <p>Student not found</p>;
                    case 'fees-options': return <FeesOptionsPage onBack={() => setPage('dashboard')} onNavigate={handleNavigate} />;
                    case 'select-batch-for-fees': return <SelectBatchForFeesPage onBack={() => setPage('fees-options')} batches={batches} onSelectBatch={(batchId) => handleNavigate('select-student-for-fees', { batchId })} />;
                    case 'select-student-for-fees': return selectedBatch ? <SelectStudentForFeesPage onBack={() => setPage('select-batch-for-fees')} batch={selectedBatch} students={students.filter(s => s.batches.includes(selectedBatch.name))} onSelectStudent={(studentId) => handleNavigate('student-fee-details', { studentId })} /> : <p>Batch not found</p>;
                    case 'student-fee-details': return selectedStudent ? <StudentFeeDetailsPage onBack={() => handleNavigate('select-student-for-fees', { batchId: selectedBatchId })} student={selectedStudent} feeCollections={feeCollections.filter(fc => fc.studentId === selectedStudent.id)} onSavePayment={handleSavePayment} /> : <p>Student not found</p>;
                    case 'fee-collection-report': return <FeeCollectionReportPage onBack={() => setPage('fees-options')} feeCollections={feeCollections} />;
                    case 'fee-dues-list': return <FeeDuesListPage onBack={() => setPage('fees-options')} students={students} batches={batches} feeCollections={feeCollections} />;
                    case 'select-batch-attendance': return <SelectBatchForAttendancePage onBack={() => setPage('dashboard')} batches={batches} onSelectBatch={(batchId) => handleNavigate('take-attendance', { batchId })} />;
                    case 'take-attendance': return selectedBatch ? <TakeAttendancePage onBack={() => setPage('select-batch-attendance')} batch={selectedBatch} students={students.filter(s => s.isActive && s.batches.includes(selectedBatch.name))} academyId={academy!.id} isDemoMode={isDemoMode} /> : <p>Batch not found.</p>;
                    case 'settings': return <SettingsPage onBack={() => setPage('dashboard')} onNavigate={handleNavigate} onShowDevPopup={setShowDevPopup} />;
                    case 'custom-sms-settings': return <CustomSmsSettingsPage onBack={() => setPage('settings')} onShowDevPopup={setShowDevPopup} />;
                    case 'staff-options': return <StaffOptionsPage onBack={() => setPage('dashboard')} onNavigate={handleNavigate} />;
                    case 'new-staff': return <NewStaffPage onBack={() => setPage('staff-options')} onSave={handleSaveStaff} />;
                    case 'staff-manager': return <StaffManagerPage onBack={() => setPage('staff-options')} staff={staff} onManageAccess={(staffId) => handleNavigate('staff-batch-access', { staffId })} onShowDevPopup={setShowDevPopup} onToggleStatus={handleToggleStaffStatus} />;
                    case 'inactive-staff': return <InactiveStaffPage onBack={() => setPage('staff-options')} staff={staff} onToggleStatus={handleToggleStaffStatus} />;
                    case 'staff-batch-access': return selectedStaffMember ? <StaffBatchAccessPage onBack={() => setPage('staff-manager')} staff={selectedStaffMember} batches={batches} onSave={handleSaveStaffAccess} /> : <p>Staff member not found</p>;
                    case 'schedule-classes': return <ScheduleClassesPage onBack={() => setPage('dashboard')} batches={batches} staff={staff} academyId={academy!.id} onSave={handleSaveDailySchedule} isDemoMode={isDemoMode} />;
                    case 'subscription': return <SubscriptionPage onBack={() => setPage('dashboard')} academy={academy!} onSubscribe={handleSubscribe} />;
                    default: return <Dashboard onNavigate={handleNavigate} academy={academy!} students={students} batches={batches} staff={staff} onShowDevPopup={setShowDevPopup} />;
                }
            case 'student':
                 switch (page) {
                    case 'dashboard': return <StudentDashboardPage student={currentUser.data} academy={academy!} onNavigate={handleNavigate} onToggleNav={() => setIsNavOpen(true)} theme={theme} onToggleTheme={handleToggleTheme} onShowDevPopup={setShowDevPopup} />;
                    case 'fee-status': return <StudentFeeStatusPage student={currentUser.data} feeCollections={feeCollections.filter(fc => fc.studentId === currentUser.data.id)} onBack={() => setPage('dashboard')} />;
                    case 'my-academy': return <MyAcademyPage academy={academy!} onBack={() => setPage('dashboard')} />;
                    case 'attendance': return <StudentAttendancePage student={currentUser.data} academyId={currentUser.academyId} onBack={() => setPage('dashboard')} />;
                    case 'timetable': return <StudentTimetablePage onBack={() => setPage('dashboard')} student={currentUser.data} academyId={currentUser.academyId} batches={batches} />;
                    default: return <StudentDashboardPage student={currentUser.data} academy={academy!} onNavigate={handleNavigate} onToggleNav={() => setIsNavOpen(true)} theme={theme} onToggleTheme={handleToggleTheme} onShowDevPopup={setShowDevPopup} />;
                 }
            case 'staff':
                const staffAccessibleBatchIds = Object.keys(currentUser.data.batchAccess || {});
                const staffAccessibleBatchNames = batches
                    .filter(b => staffAccessibleBatchIds.includes(b.id))
                    .map(b => b.name);
                const accessibleStudents = students.filter(s => 
                    s.batches.some(studentBatchName => staffAccessibleBatchNames.includes(studentBatchName))
                );

                 switch(page) {
                     case 'dashboard': return <StaffDashboardPage staff={currentUser.data} academy={academy!} onNavigate={handleNavigate} onShowDevPopup={setShowDevPopup} />;
                     case 'active-students': return <ActiveStudentsPage onBack={() => setPage('dashboard')} students={accessibleStudents} batches={batches} onToggleStudentStatus={async () => {}} onEditStudent={(studentId) => handleNavigate('edit-student', { studentId })} onViewStudent={(studentId) => handleNavigate('view-registration-form', { studentId })} initialFilter={studentListFilter} staffPermissions={currentUser.data.batchAccess} />;
                    case 'select-batch-for-fees': return <SelectBatchForFeesPage onBack={() => setPage('dashboard')} batches={batches} onSelectBatch={(batchId) => handleNavigate('select-student-for-fees', { batchId })} staffPermissions={currentUser.data.batchAccess} />;
                    case 'select-student-for-fees': return selectedBatch ? <SelectStudentForFeesPage onBack={() => setPage('select-batch-for-fees')} batch={selectedBatch} students={accessibleStudents.filter(s => s.batches.includes(selectedBatch.name))} onSelectStudent={(studentId) => handleNavigate('student-fee-details', { studentId })} /> : <p>Batch not found</p>;
                    case 'student-fee-details': return selectedStudent ? <StudentFeeDetailsPage onBack={() => handleNavigate('select-student-for-fees', { batchId: selectedBatchId })} student={selectedStudent} feeCollections={feeCollections.filter(fc => fc.studentId === selectedStudent.id)} onSavePayment={handleSavePayment} /> : <p>Student not found</p>;
                    case 'select-batch-attendance': return <SelectBatchForAttendancePage onBack={() => setPage('dashboard')} batches={batches} onSelectBatch={(batchId) => handleNavigate('take-attendance', { batchId })} staffPermissions={currentUser.data.batchAccess} />;
                    case 'take-attendance': return selectedBatch ? <TakeAttendancePage onBack={() => setPage('select-batch-attendance')} batch={selectedBatch} students={accessibleStudents.filter(s => s.isActive && s.batches.includes(selectedBatch.name))} academyId={academy!.id} isDemoMode={isDemoMode} /> : <p>Batch not found.</p>;
                    case 'class-schedule': return <StaffSchedulePage onBack={() => setPage('dashboard')} staff={currentUser.data} academyId={academy!.id} />;
                     default: return <StaffDashboardPage staff={currentUser.data} academy={academy!} onNavigate={handleNavigate} onShowDevPopup={setShowDevPopup} />;
                 }
            case 'superadmin':
                 return <SuperAdminPanel onLogout={handleLogout} />;
            default:
                 return <p>Invalid user role.</p>
        }
    };
    

    // Main App Screens
    return (
        <div className={`font-sans antialiased text-gray-900 bg-gray-100 dark:bg-gray-900 ${theme}`}>
            {showDevPopup && <DevInProgressPopup featureName={showDevPopup} onClose={() => setShowDevPopup(null)} />}
            { isPlaceholderConfig && <ConfigurationWarning /> }
            { connectionError && <ConnectionErrorBanner message={connectionError} onClose={() => setConnectionError(null)} /> }
            { isOffline && <OfflineIndicator /> }
            
            <div className="bg-slate-100 dark:bg-gray-900 min-h-screen flex flex-col">
            {currentUser.role === 'admin' && academy && (
                <>
                    {page === 'dashboard' && <Header
                        academy={academy}
                        onLogout={handleLogout}
                        onToggleNav={() => setIsNavOpen(true)}
                        onNavigate={handleNavigate}
                        theme={theme}
                        onToggleTheme={handleToggleTheme}
                    />}
                     <SideNav 
                        isOpen={isNavOpen}
                        onClose={() => setIsNavOpen(false)}
                        onNavigate={handleNavigate}
                        onLogout={handleLogout}
                        onShowDevPopup={setShowDevPopup}
                    />
                </>
            )}
            {currentUser.role === 'staff' && academy && (
                 <>
                    {page === 'dashboard' && <StaffHeader
                        staffName={currentUser.data.name}
                        academyName={academy.name}
                        onLogout={handleLogout}
                        onToggleNav={() => setIsNavOpen(true)}
                        theme={theme}
                        onToggleTheme={handleToggleTheme}
                    />}
                     <StaffSideNav 
                        isOpen={isNavOpen}
                        onClose={() => setIsNavOpen(false)}
                        onNavigate={handleNavigate}
                        onLogout={handleLogout}
                        staff={currentUser.data}
                        onShowDevPopup={setShowDevPopup}
                    />
                </>
            )}
             {currentUser.role === 'student' && (
                <StudentSideNav
                    isOpen={isNavOpen}
                    onClose={() => setIsNavOpen(false)}
                    onNavigate={handleNavigate}
                    onLogout={handleLogout}
                />
            )}
                <main className="flex-grow flex flex-col relative overflow-hidden">
                    <div className="flex-grow overflow-y-auto">
                        {renderPage()}
                    </div>
                </main>
            {currentUser.role === 'admin' && page === 'dashboard' && <BottomNav onNavigate={setPage} activePage={page} />}
            </div>
        </div>
    );
}