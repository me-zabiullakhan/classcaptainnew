

import React, { useState, useEffect, useCallback } from 'react';
// Firebase
import { auth, db, firebaseConfig } from './firebaseConfig';
// FIX: Replaced V9 modular 'firebase/auth' imports with the V8 compat 'firebase/compat/app' to match the auth instance setup.
import firebase from 'firebase/compat/app';
import { collection, doc, onSnapshot, addDoc, updateDoc, setDoc, getDoc, query, where, getDocs, writeBatch, serverTimestamp, Timestamp, runTransaction, deleteDoc } from 'firebase/firestore';

// Types
import type { CurrentUser, Academy, Batch, Student, Staff, FeeCollection, BatchAccessPermissions, ScheduleItem, Transaction, Exam, Enquiry } from './types';

// Demo Data
import { demoStudents, demoBatches, demoStaff, demoTransactions, demoEnquiries } from './demoData';

// Components
import { SplashScreen } from './components/SplashScreen';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { CompleteRegistrationPage } from './components/auth/CompleteRegistrationPage';
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
import { IncomeExpensesPage } from './components/IncomeExpensesPage';
import { ManageExamsPage } from './components/ManageExamsPage';
import { CreateExamPage } from './components/CreateExamPage';
import { RecordMarksPage } from './components/RecordMarksPage';
import { EnquiryManagerPage } from './components/EnquiryManagerPage';
import { NewEnquiryPage } from './components/NewEnquiryPage';
import { ReportsPage } from './components/ReportsPage';
import { AttendanceReportPage } from './components/AttendanceReportPage';
// Student view components
import { StudentDashboardPage } from './components/student/StudentDashboardPage';
import { StudentFeeStatusPage } from './components/student/StudentFeeStatusPage';
import { StudentSideNav } from './components/student/StudentSideNav';
import { MyAcademyPage } from './components/student/MyAcademyPage';
import { StudentAttendancePage } from './components/student/StudentAttendancePage';
import { StudentTimetablePage } from './components/student/StudentTimetablePage';
import { StudentExamsPage } from './components/student/StudentExamsPage';
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

// FIX: Replaced V9 'User' type with V8 compat 'firebase.User'.
const createAcademyInFirestore = async (user: firebase.User, instituteName: string, academyId: string): Promise<Academy> => {
    // Final server-side-like check for uniqueness before creation
    const q = query(collection(db, "academies"), where("academyId", "==", academyId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        throw new Error(`Academy ID "${academyId}" is already taken. Please go back and choose another one.`);
    }

    const newAcademyRef = doc(collection(db, 'academies'));

    const academyData = {
        name: instituteName,
        adminEmail: user.email!,
        adminUid: user.uid,
        createdAt: Timestamp.now(),
        status: 'active' as const,
        academyId: academyId,
        subscriptionStatus: 'trialing' as const,
        trialEndsAt: Timestamp.fromMillis(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    };

    const userDocRef = doc(db, 'users', user.uid);
    const userMappingData = {
        academyId: newAcademyRef.id,
        role: 'admin'
    };

    try {
        const batch = writeBatch(db);
        batch.set(newAcademyRef, academyData);
        batch.set(userDocRef, userMappingData);
        await batch.commit();

        const docSnap = await getDoc(newAcademyRef);
        if (!docSnap.exists()) {
            throw new Error("Failed to verify academy creation in database.");
        }

        return {
            id: newAcademyRef.id,
            ...academyData,
        } as unknown as Academy;

    } catch (error) {
        console.error("Academy and user mapping creation failed:", error);
        throw error;
    }
};


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
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [exams, setExams] = useState<Exam[]>([]);
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

    // Page-specific state
    const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
    const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
    const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
    const [selectedEnquiryId, setSelectedEnquiryId] = useState<string | null>(null);
    const [studentListFilter, setStudentListFilter] = useState('all');

    // UI State
    const [connectionError, setConnectionError] = useState<string | null>(null);
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const [showConsent, setShowConsent] = useState(!localStorage.getItem('dataConsentAccepted'));
    const [showDevPopup, setShowDevPopup] = useState<string | null>(null);

    const isDemoMode = (currentUser?.role === 'admin' && currentUser.data.id === 'demo-academy-id') ||
        ((currentUser?.role === 'student' || currentUser?.role === 'staff') && currentUser.academyId === 'DEMO');

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
    
    const handleRegisterSuccess = (academy: Academy) => {
        setAcademy(academy);
        setCurrentUser({ role: 'admin', data: academy });
        setPage('dashboard');
    }

    // Auth effect
    useEffect(() => {
        if (isPlaceholderConfig) {
            setIsLoading(false);
            return;
        }

        // FIX: Replaced V9 'onAuthStateChanged(auth, ...)' with V8 'auth.onAuthStateChanged(...)' and updated 'User' type.
        const unsubscribe = auth.onAuthStateChanged(async (user: firebase.User | null) => {
            if (user) {
                if (user.isAnonymous) {
                    // This is a temporary session used by the student/staff login form
                    // to gain read access to Firestore. The login form itself handles
                    // the logic, so we should ignore this state change at the app level.
                    return;
                }

                const userDocRef = doc(db, "users", user.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    if (userData.role === 'admin' && userData.academyId) {
                        const academyDocRef = doc(db, "academies", userData.academyId);
                        const academyDocSnap = await getDoc(academyDocRef);

                        if (academyDocSnap.exists()) {
                            // ACADEMY FOUND - NORMAL LOGIN
                            const academyData = { id: academyDocSnap.id, ...academyDocSnap.data() } as Academy;
                            setAcademy(academyData);
                            setCurrentUser({ role: 'admin', data: academyData });
                            setPage('dashboard');
                        } else {
                            // BROKEN STATE: mapping exists, academy doc is gone. Go to complete registration.
                            setAuthError("Your academy data is missing. Please re-enter your institute's name to restore your account.");
                            setPage('complete-registration');
                        }
                    } else {
                        // User exists but is not an admin (student/staff). For admin login, this is an error.
                        setAuthError("Your account is not configured as an admin account.");
                        // FIX: Replaced V9 'signOut(auth)' with V8 'auth.signOut()'.
                        await auth.signOut();
                    }
                } else {
                    // NO USER MAPPING FOUND.
                    const instituteName = sessionStorage.getItem('google_reg_institute_name') || sessionStorage.getItem('registration_institute_name');
                    const academyId = sessionStorage.getItem('google_reg_academy_id') || sessionStorage.getItem('registration_academy_id');

                    if (instituteName && academyId) {
                        // NEW REGISTRATION FLOW
                        try {
                            const newAcademy = await createAcademyInFirestore(user, instituteName, academyId);
                            alert(`Registration successful! Your Academy ID is ${newAcademy.academyId}. Please save it for your students and staff to log in.`);
                            handleRegisterSuccess(newAcademy);
                        } catch (error: any) {
                            console.error("Error creating academy:", error);
                            setAuthError(error.message || "Failed to create your academy account. This can happen due to permission issues or a duplicate Academy ID. Please check your Firestore security rules and try again.");
                            // FIX: Replaced V9 'signOut(auth)' with V8 'auth.signOut()'.
                            await auth.signOut();
                        } finally {
                            sessionStorage.removeItem('google_reg_flow');
                            sessionStorage.removeItem('google_reg_institute_name');
                            sessionStorage.removeItem('google_reg_academy_id');
                            sessionStorage.removeItem('registration_institute_name');
                            sessionStorage.removeItem('registration_academy_id');
                        }
                    } else {
                        // ORPHANED AUTH USER: Logged in, but no data and not in reg flow. Go to complete registration.
                        setAuthError("Your registration is incomplete. Please enter your institute name to continue.");
                        setPage('complete-registration');
                    }
                }
            } else {
                // User is signed out.
                setCurrentUser(null);
                setAcademy(null);
                setPage('login');
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
                setAcademy({ id: 'demo-academy-id', academyId: 'DEMO', name: 'Demo Academy', adminUid: 'demo-admin-uid', adminEmail: 'demo@classcaptain.com', status: 'active', subscriptionStatus: 'active' });
                setStudents(demoStudents);
                setBatches(demoBatches);
                setStaff(demoStaff);
                setFeeCollections([]);
                setTransactions(demoTransactions);
                setExams([]);
                setEnquiries(demoEnquiries);
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

        const collectionsToSubscribe = ['batches', 'students', 'staff', 'fees', 'transactions', 'exams', 'enquiries'];
        const setters: any = {
            batches: setBatches,
            students: setStudents,
            staff: setStaff,
            fees: setFeeCollections,
            transactions: setTransactions,
            exams: setExams,
            enquiries: setEnquiries,
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

    const handleLogout = async () => {
        setIsNavOpen(false);
        if(!isDemoMode) {
             try {
                // FIX: Replaced V9 'signOut(auth)' with V8 'auth.signOut()'.
                await auth.signOut();
            } catch (error) {
                console.error("Logout Error:", error);
            }
        }
        setCurrentUser(null);
        setAcademy(null);
        setPage('login');
    };
    
    const handleCompleteRegistration = async (instituteName: string) => {
        const user = auth.currentUser;
        if (user) {
            try {
                // For simplified flow, we'll ask them to retry registration if academyId is missing
                alert("Please restart the registration process and choose an Academy ID.");
                // FIX: Replaced V9 'signOut(auth)' with V8 'auth.signOut()'.
                await auth.signOut();
            } catch (error) {
                console.error("Error during incomplete registration flow:", error);
                setAuthError("Failed to complete your academy account. Please try again.");
                // FIX: Replaced V9 'signOut(auth)' with V8 'auth.signOut()'.
                await auth.signOut();
            }
        } else {
            setAuthError("You are not signed in. Please log in again.");
            setPage('login');
        }
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

    const handleSaveStudent = async (studentData: Omit<Student, 'id' | 'isActive' | 'rollNumber'>, enquiryId?: string): Promise<Student | void> => {
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
                
                if (enquiryId) {
                    const enquiryRef = doc(db, `academies/${academy.id}/enquiries`, enquiryId);
                    transaction.update(enquiryRef, { status: 'Converted' });
                }

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
            
            return studentWithDefaults as Student;
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
        
        const batch = writeBatch(db);
        const feeCollectionRef = doc(collection(db, `academies/${academy.id}/fees`));
        const transactionRef = doc(collection(db, `academies/${academy.id}/transactions`));
        const paymentTimestamp = Timestamp.fromDate(new Date(paymentData.paymentDate as any));

        // 1. Set the Fee Collection document with a link to the transaction
        batch.set(feeCollectionRef, {
            ...paymentData,
            paymentDate: paymentTimestamp,
            createdAt: serverTimestamp(),
            transactionId: transactionRef.id,
        });

        // 2. Set the corresponding Income Transaction document with a link to the fee collection
        const feeForMonthDate = new Date(paymentData.feeForMonth + '-02');
        const monthFormatted = feeForMonthDate.toLocaleString('default', { month: 'long', year: 'numeric' });
        const transactionData: Omit<Transaction, 'id' | 'createdAt' | 'attachmentUrl'> & { feeCollectionId?: string } = {
            type: 'Income',
            category: 'Tuition Fees',
            amount: paymentData.amountPaid,
            paymentMethod: paymentData.paymentMode as Transaction['paymentMethod'],
            description: `Fee from ${paymentData.studentName} (${paymentData.studentRollNumber}) for ${monthFormatted}`,
            date: paymentTimestamp,
            feeCollectionId: feeCollectionRef.id,
        };
        batch.set(transactionRef, {
            ...transactionData,
            createdAt: serverTimestamp()
        });

        await batch.commit();
    };
    
     const handleSaveStaff = async (staffData: Omit<Staff, 'id'>) => {
        if (!academy || isDemoMode) { alert("Demo mode."); return; }
        // Uniqueness check
        const q = query(collection(db, `academies/${academy.id}/staff`), where('staffId', '==', staffData.staffId));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            alert(`Staff ID "${staffData.staffId}" is already in use. Please choose a unique ID.`);
            return;
        }
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
                    transaction.set(scheduleRef, { [batchId]: scheduleItems }, { merge: true });
                }
            });
        } catch (error) {
            console.error("Error saving daily schedule:", error);
            alert("Failed to save schedule.");
            throw error;
        }
    };
    
    const handleSaveTransaction = async (data: Omit<Transaction, 'id' | 'createdAt' | 'attachmentUrl'>) => {
        if (!academy || isDemoMode) { throw new Error("Demo mode"); }
        await addDoc(collection(db, `academies/${academy.id}/transactions`), {
            ...data,
            date: Timestamp.fromDate(new Date(data.date as any)),
            createdAt: serverTimestamp()
        });
    };

    const handleUpdateTransaction = async (id: string, data: Partial<Omit<Transaction, 'id' | 'createdAt'>>) => {
        if (!academy || isDemoMode) { throw new Error("Demo mode"); }
        const txRef = doc(db, `academies/${academy.id}/transactions`, id);
        const updateData: any = { ...data };
        if (data.date) {
            updateData.date = Timestamp.fromDate(new Date(data.date as any));
        }
        await updateDoc(txRef, updateData);
    };

    const handleDeleteTransaction = async (txId: string) => {
        if (!academy || isDemoMode) { throw new Error("Demo mode"); }
        const txRef = doc(db, `academies/${academy.id}/transactions`, txId);
        const txSnap = await getDoc(txRef);
        if (txSnap.exists() && txSnap.data().feeCollectionId) {
            alert("This transaction is linked to a fee payment. Please delete it from the Fee Collection Report to ensure data consistency.");
            throw new Error("Cannot delete fee-linked transaction.");
        }
        await deleteDoc(txRef);
    };

    const handleDeleteFeeCollection = async (feeId: string) => {
        if (!academy || isDemoMode) { throw new Error("Demo mode"); }
        const feeRef = doc(db, `academies/${academy.id}/fees`, feeId);
        const feeSnap = await getDoc(feeRef);
        if (!feeSnap.exists()) return;
        const feeData = feeSnap.data() as FeeCollection;

        const batch = writeBatch(db);
        batch.delete(feeRef);
        if (feeData.transactionId) {
            const txRef = doc(db, `academies/${academy.id}/transactions`, feeData.transactionId);
            batch.delete(txRef);
        }
        await batch.commit();
    };

    const handleUpdateFeeCollection = async (feeId: string, data: { paymentDate: string; paymentMode: FeeCollection['paymentMode']; discount: number; }) => {
        if (!academy || isDemoMode) { throw new Error("Demo mode"); }
        const feeRef = doc(db, `academies/${academy.id}/fees`, feeId);
        const feeSnap = await getDoc(feeRef);
        if (!feeSnap.exists()) return;
        const feeData = feeSnap.data() as FeeCollection;
        
        const newAmountPaid = feeData.totalAmount - data.discount;

        const batch = writeBatch(db);
        batch.update(feeRef, {
            ...data,
            amountPaid: newAmountPaid,
            paymentDate: Timestamp.fromDate(new Date(data.paymentDate))
        });
        
        if (feeData.transactionId) {
            const txRef = doc(db, `academies/${academy.id}/transactions`, feeData.transactionId);
            batch.update(txRef, {
                amount: newAmountPaid,
                paymentMethod: data.paymentMode,
                date: Timestamp.fromDate(new Date(data.paymentDate))
            });
        }
        await batch.commit();
    };

    const handleSaveExam = async (examData: Omit<Exam, 'id'>) => {
        if (!academy || isDemoMode) { throw new Error("Demo mode"); }
        if (selectedExamId) { // Update
            const examRef = doc(db, `academies/${academy.id}/exams`, selectedExamId);
            await updateDoc(examRef, examData);
        } else { // Create
            await addDoc(collection(db, `academies/${academy.id}/exams`), examData);
        }
        setPage('manage-exams');
        setSelectedExamId(null);
    };

    const handlePublishExamResults = async (examId: string, status: 'Published' | 'Draft') => {
        if (!academy || isDemoMode) { throw new Error("Demo mode"); }
        const examRef = doc(db, `academies/${academy.id}/exams`, examId);
        await updateDoc(examRef, { resultStatus: status });
    };
    
    const handleSaveEnquiry = async (data: any) => {
        if (!academy || isDemoMode) { throw new Error("Demo mode"); }
        if (data.enquiryId) { // Update from NewEnquiryPage
             const enquiryRef = doc(db, `academies/${academy.id}/enquiries`, data.enquiryId);
             await updateDoc(enquiryRef, data.data);
        } else { // Create from NewEnquiryPage
             await addDoc(collection(db, `academies/${academy.id}/enquiries`), data);
        }
        setPage('enquiry-manager');
        setSelectedEnquiryId(null);
    };

    const handleUpdateEnquiryStatus = async (enquiryId: string, data: Partial<Enquiry>) => {
        if (!academy || isDemoMode) { throw new Error("Demo mode"); }
        const enquiryRef = doc(db, `academies/${academy.id}/enquiries`, enquiryId);
        await updateDoc(enquiryRef, data);
    };

    const handleDeleteEnquiry = async (enquiryId: string) => {
        if (!academy || isDemoMode) { throw new Error("Demo mode"); }
        await deleteDoc(doc(db, `academies/${academy.id}/enquiries`, enquiryId));
    };

    const handleNavigate = (page: string, params: { [key: string]: any } = {}) => {
        if (params.batchId !== undefined) setSelectedBatchId(params.batchId);
        if (params.studentId !== undefined) setSelectedStudentId(params.studentId);
        if (params.batchName !== undefined) setStudentListFilter(params.batchName);
        if (params.staffId !== undefined) setSelectedStaffId(params.staffId);
        if (params.examId !== undefined) setSelectedExamId(params.examId);
        if (params.enquiryId !== undefined) setSelectedEnquiryId(params.enquiryId);
        setPage(page);
    };

    if (isPlaceholderConfig) {
        return <ConfigurationWarning />;
    }

    if (isLoading) {
        return <SplashScreen />;
    }
    
    if (showConsent && !isDemoMode) {
        return <DataConsentModal onAccept={() => {
            localStorage.setItem('dataConsentAccepted', 'true');
            setShowConsent(false);
        }} />;
    }

    if (currentUser?.role === 'admin' && academy?.subscriptionStatus === 'expired') {
        return <SubscriptionExpiredPage onNavigate={handleNavigate} onLogout={handleLogout} />;
    }
    
    const selectedBatch = batches.find(b => b.id === selectedBatchId);
    const selectedStudent = students.find(s => s.id === selectedStudentId);
    const selectedStaff = staff.find(s => s.id === selectedStaffId);
    const selectedExam = exams.find(e => e.id === selectedExamId);
    const selectedEnquiry = enquiries.find(e => e.id === selectedEnquiryId);

    const renderPage = (pageName: string) => {
        switch (pageName) {
            case 'dashboard':
                if (currentUser?.role === 'admin' && academy) return <Dashboard onNavigate={handleNavigate} academy={academy} students={students} batches={batches} staff={staff} onShowDevPopup={setShowDevPopup} />;
                if (currentUser?.role === 'student' && academy) return <StudentDashboardPage student={currentUser.data} academy={academy} onNavigate={handleNavigate} onToggleNav={() => setIsNavOpen(true)} theme={theme} onToggleTheme={handleToggleTheme} onShowDevPopup={setShowDevPopup}/>;
                if (currentUser?.role === 'staff' && academy) return <StaffDashboardPage onNavigate={handleNavigate} academy={academy} staff={currentUser.data} onShowDevPopup={setShowDevPopup}/>;
                return null;

            // Admin Pages
            case 'batches': return <BatchesPage onBack={() => setPage('dashboard')} onCreate={() => setPage('new-batch')} batches={batches} onViewStudents={(batchName) => handleNavigate('active-students', { batchName })} onEditBatch={(batchId) => handleNavigate('edit-batch', { batchId })} />;
            case 'new-batch': return <NewBatchPage onBack={() => setPage('batches')} onSave={handleSaveBatch} />;
            case 'edit-batch': return selectedBatch && <EditBatchPage onBack={() => setPage('batches')} onSave={handleUpdateBatch} batch={selectedBatch} />;
            case 'student-options': return <StudentOptionsPage onBack={() => setPage('dashboard')} onNavigate={handleNavigate} onShowDevPopup={setShowDevPopup} />;
            case 'new-student': return academy && <NewStudentPage onBack={() => setPage(selectedEnquiryId ? 'enquiry-manager' : 'student-options')} onSave={handleSaveStudent} batches={batches} academyId={academy.academyId} enquiryData={selectedEnquiry} />;
            case 'edit-student': return selectedStudent && <EditStudentPage onBack={() => setPage('active-students')} onUpdate={handleUpdateStudent} student={selectedStudent} batches={batches} />;
            case 'active-students': return <ActiveStudentsPage onBack={() => setPage('student-options')} students={students} batches={batches} onToggleStudentStatus={handleToggleStudentStatus} onEditStudent={(studentId) => handleNavigate('edit-student', { studentId })} onViewStudent={(studentId) => handleNavigate('registration-form-view', { studentId })} initialFilter={studentListFilter} />;
            case 'inactive-students': return <InactiveStudentsPage onBack={() => setPage('student-options')} students={students} batches={batches} onToggleStudentStatus={handleToggleStudentStatus} />;
            case 'birthday-list': return <BirthdayListPage onBack={() => setPage('student-options')} students={students} />;
            case 'registration-form-list': return <RegistrationFormListPage onBack={() => setPage('student-options')} students={students} onSelectStudent={(studentId) => handleNavigate('registration-form-view', { studentId })} />;
            case 'registration-form-view': return selectedStudent && <RegistrationFormViewPage onBack={() => setPage('registration-form-list')} student={selectedStudent} />;
            case 'select-batch-attendance': return academy && <SelectBatchForAttendancePage onBack={() => setPage('dashboard')} batches={batches} onSelectBatch={(batchId) => handleNavigate('take-attendance', { batchId })} academyId={academy.id} />;
            case 'take-attendance': return selectedBatch && academy && <TakeAttendancePage onBack={() => setPage('select-batch-attendance')} batch={selectedBatch} students={students.filter(s => s.batches.includes(selectedBatch.name))} academy={academy} isDemoMode={isDemoMode} />;
            case 'fees-options': return <FeesOptionsPage onBack={() => setPage('dashboard')} onNavigate={handleNavigate} />;
            case 'select-batch-for-fees': return <SelectBatchForFeesPage onBack={() => setPage('fees-options')} batches={batches} onSelectBatch={(batchId) => handleNavigate('select-student-for-fees', { batchId })} />;
            case 'select-student-for-fees': return selectedBatch && <SelectStudentForFeesPage onBack={() => setPage('select-batch-for-fees')} batch={selectedBatch} students={students.filter(s => s.batches.includes(selectedBatch.name))} onSelectStudent={(studentId) => handleNavigate('student-fee-details', { studentId })} />;
            case 'student-fee-details': return selectedStudent && <StudentFeeDetailsPage onBack={() => setPage('select-student-for-fees')} student={selectedStudent} feeCollections={feeCollections.filter(fc => fc.studentId === selectedStudent.id)} onSavePayment={handleSavePayment} />;
            case 'fee-collection-report': return <FeeCollectionReportPage onBack={() => setPage('fees-options')} feeCollections={feeCollections} onDelete={handleDeleteFeeCollection} onUpdate={handleUpdateFeeCollection} isDemoMode={isDemoMode}/>;
            case 'fee-dues-list': return academy && <FeeDuesListPage onBack={() => setPage('fees-options')} students={students} batches={batches} feeCollections={feeCollections} academy={academy} />;
            case 'my-account': return academy && <MyAccountPage onBack={() => setPage('dashboard')} academy={academy} onSave={handleSaveAcademyDetails} onLogout={handleLogout} />;
            case 'staff-options': return <StaffOptionsPage onBack={() => setPage('dashboard')} onNavigate={handleNavigate} />;
            case 'new-staff': return <NewStaffPage onBack={() => setPage('staff-options')} onSave={handleSaveStaff} />;
            case 'staff-manager': return <StaffManagerPage onBack={() => setPage('staff-options')} staff={staff} onManageAccess={(staffId) => handleNavigate('staff-batch-access', { staffId })} onToggleStatus={handleToggleStaffStatus} onShowDevPopup={setShowDevPopup} />;
            case 'inactive-staff': return <InactiveStaffPage onBack={() => setPage('staff-options')} staff={staff} onToggleStatus={handleToggleStaffStatus} />;
            case 'staff-batch-access': return selectedStaff && <StaffBatchAccessPage onBack={() => setPage('staff-manager')} staff={selectedStaff} batches={batches} onSave={handleSaveStaffAccess} />;
            case 'schedule-classes': return academy && <ScheduleClassesPage onBack={() => setPage('dashboard')} batches={batches} staff={staff} academyId={academy.id} onSave={handleSaveDailySchedule} isDemoMode={isDemoMode} />;
            case 'subscription': return academy && <SubscriptionPage onBack={() => setPage('dashboard')} academy={academy} onSubscribe={async (plan, months) => {}} />;
            case 'income-expenses': return <IncomeExpensesPage onBack={() => setPage('dashboard')} transactions={transactions} onSave={handleSaveTransaction} onUpdate={handleUpdateTransaction} onDelete={handleDeleteTransaction} isDemoMode={isDemoMode}/>;
            case 'manage-exams': return <ManageExamsPage onBack={() => setPage('dashboard')} exams={exams} onNavigate={handleNavigate} onPublish={handlePublishExamResults}/>;
            case 'create-exam': return <CreateExamPage onBack={() => setPage('manage-exams')} batches={batches} onSave={handleSaveExam} exam={selectedExam} />;
            case 'record-marks': return selectedExam && academy && <RecordMarksPage onBack={() => setPage('manage-exams')} exam={selectedExam} students={students} academyId={academy.id} isDemoMode={isDemoMode}/>;
            case 'enquiry-manager': return <EnquiryManagerPage onBack={() => setPage('dashboard')} enquiries={enquiries} onNavigate={handleNavigate} onDelete={handleDeleteEnquiry} onUpdateStatus={handleUpdateEnquiryStatus} />;
            case 'new-enquiry': return <NewEnquiryPage onBack={() => setPage('enquiry-manager')} batches={batches} onSave={handleSaveEnquiry} enquiry={selectedEnquiry}/>;
            case 'edit-enquiry': return selectedEnquiry && <NewEnquiryPage onBack={() => setPage('enquiry-manager')} batches={batches} onSave={handleSaveEnquiry} enquiry={selectedEnquiry}/>;
            case 'settings': return <SettingsPage onBack={() => setPage('dashboard')} onNavigate={handleNavigate} onShowDevPopup={setShowDevPopup} />;
            case 'custom-sms-settings': return academy && <CustomSmsSettingsPage onBack={() => setPage('settings')} academy={academy} onSave={handleSaveAcademyDetails} />;
            case 'reports-options': return <ReportsPage onBack={() => setPage('dashboard')} onNavigate={handleNavigate} onShowDevPopup={setShowDevPopup} />;
            case 'attendance-report': return academy && <AttendanceReportPage onBack={() => setPage('reports-options')} batches={batches} students={students} academyId={academy.id} />;
            
            // Student Pages
            case 'fee-status': return currentUser?.role === 'student' && <StudentFeeStatusPage student={currentUser.data} feeCollections={feeCollections} onBack={() => setPage('dashboard')} />;
            case 'my-academy': return academy && <MyAcademyPage academy={academy} onBack={() => setPage('dashboard')} />;
            case 'attendance': return currentUser?.role === 'student' && <StudentAttendancePage student={currentUser.data} academyId={currentUser.academyId} onBack={() => setPage('dashboard')} />;
            case 'timetable': return currentUser?.role === 'student' && <StudentTimetablePage onBack={() => setPage('dashboard')} student={currentUser.data} academyId={currentUser.academyId} batches={batches} />;
            case 'student-exams': return currentUser?.role === 'student' && <StudentExamsPage onBack={() => setPage('dashboard')} student={currentUser.data} academyId={currentUser.academyId} />;

            // Staff Pages
            case 'class-schedule': return currentUser?.role === 'staff' && <StaffSchedulePage onBack={() => setPage('dashboard')} staff={currentUser.data} academyId={currentUser.academyId} />;

            default: return <div>Page not found</div>;
        }
    };
    
    let mainContent;

    if (!currentUser) {
        mainContent = (
            <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="w-full max-w-md mx-auto">
                    {page === 'login' && <LoginPage onLogin={handleLogin} onNavigateToRegister={() => setPage('register')} externalError={authError} clearExternalError={() => setAuthError(null)} />}
                    {page === 'register' && <RegisterPage onNavigateToLogin={() => setPage('login')} />}
                    {page === 'complete-registration' && auth.currentUser && (
                        <CompleteRegistrationPage
                            onComplete={handleCompleteRegistration}
                            onLogout={handleLogout}
                            userEmail={auth.currentUser.email || 'your email'}
                            externalError={authError}
                            clearExternalError={() => setAuthError(null)}
                        />
                    )}
                </div>
            </div>
        );
    } else if (currentUser.role === 'superadmin') {
        mainContent = <SuperAdminPanel onLogout={handleLogout} />;
    } else if (currentUser.role === 'admin' && academy) {
        mainContent = (
             <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
                <Header academy={academy} onLogout={handleLogout} onToggleNav={() => setIsNavOpen(true)} onNavigate={handleNavigate} theme={theme} onToggleTheme={handleToggleTheme} />
                <SideNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} onNavigate={handleNavigate} onLogout={handleLogout} onShowDevPopup={setShowDevPopup}/>
                <div className="flex-grow overflow-y-auto pb-16">
                    {renderPage(page)}
                </div>
                <BottomNav onNavigate={handleNavigate} activePage={page} />
            </div>
        );
    } else if (currentUser.role === 'student' && academy) {
         mainContent = (
             <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
                <StudentSideNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} onNavigate={handleNavigate} onLogout={handleLogout} />
                {renderPage(page)}
            </div>
        );
    } else if (currentUser.role === 'staff' && academy) {
        mainContent = (
             <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
                <StaffHeader staffName={currentUser.data.name} academyName={academy.name} onLogout={handleLogout} onToggleNav={() => setIsNavOpen(true)} theme={theme} onToggleTheme={handleToggleTheme}/>
                <StaffSideNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} onNavigate={handleNavigate} onLogout={handleLogout} staff={currentUser.data} onShowDevPopup={setShowDevPopup} />
                {renderPage(page)}
            </div>
        );
    } else {
        mainContent = <SplashScreen />; // Or some error state
    }
    
    return (
        <>
            {connectionError && <ConnectionErrorBanner message={connectionError} onClose={() => setConnectionError(null)} />}
            {isOffline && <OfflineIndicator />}
            {showDevPopup && <DevInProgressPopup featureName={showDevPopup} onClose={() => setShowDevPopup(null)} />}
            {mainContent}
        </>
    );
}
