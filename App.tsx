

import React, { useState, useEffect, useMemo } from 'react';
import { Capacitor } from '@capacitor/core';
import { SplashScreen as CapSplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

// Firebase
import { auth, db, firebaseConfig, storage } from './firebaseConfig';
import { ref, deleteObject, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// FIX: Replaced V9 modular 'firebase/auth' imports with the V8 compat 'firebase/compat/app' to match the auth instance setup.
import firebase from 'firebase/compat/app';
// UPDATED: Added 'increment' and 'deleteField' to handle atomic counter updates and field deletion.
import { collection, doc, onSnapshot, addDoc, updateDoc, setDoc, getDoc, query, where, getDocs, writeBatch, serverTimestamp, Timestamp, runTransaction, deleteDoc, increment, deleteField } from 'firebase/firestore';

// Types
// FIX: Added TransportRoute to the type imports.
import type { CurrentUser, Academy, Batch, Student, Staff, FeeCollection, BatchAccessPermissions, ScheduleItem, Transaction, Exam, Enquiry, StudyMaterial, Homework, Quiz, QuizSubmission, LeaveRequest, Task, Notice, TransportRoute, DailySchedule, StaffAttendance } from './types';

// Demo Data
// FIX: Added demoTransportRoutes to the demo data imports.
import { demoStudents, demoBatches, demoStaff, demoTransactions, demoEnquiries, demoTransportRoutes, demoStaffAttendance } from './demoData';

// Components
import { SplashScreen } from './components/SplashScreen';
import { RoleSelectionPage } from './components/auth/RoleSelectionPage';
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
import { StudyMaterialPage } from './components/StudyMaterialPage';
import { UploadStudyMaterialPage } from './components/UploadStudyMaterialPage';
import { HomeworkPage } from './components/HomeworkPage';
import { AssignHomeworkPage } from './components/AssignHomeworkPage';
import { HomeworkSubmissionsPage } from './components/HomeworkSubmissionsPage';
import { ManageQuizzesPage } from './components/ManageQuizzesPage';
import { CreateQuizPage } from './components/CreateQuizPage';
import { QuizResultsPage } from './components/QuizResultsPage';
import { LeaveManagerPage } from './components/LeaveManagerPage';
import { TodoTaskPage } from './components/TodoTaskPage';
import { NoticeBoardPage } from './components/NoticeBoardPage';
import { NotificationsPage } from './components/NotificationsPage';

// Student view components
import { StudentDashboardPage } from './components/student/StudentDashboardPage';
import { StudentFeeStatusPage } from './components/student/StudentFeeStatusPage';
import { StudentSideNav } from './components/student/StudentSideNav';
import { MyAcademyPage } from './components/student/MyAcademyPage';
import { StudentAttendancePage } from './components/student/StudentAttendancePage';
import { StudentTimetablePage } from './components/student/StudentTimetablePage';
import { StudentExamsPage } from './components/student/StudentExamsPage';
import { StudentStudyMaterialPage } from './components/student/StudentStudyMaterialPage';
import { StudentHomeworkPage } from './components/student/StudentHomeworkPage';
import { StudentQuizzesPage } from './components/student/StudentQuizzesPage';
import { TakeQuizPage } from './components/student/TakeQuizPage';
import { QuizResultPage } from './components/student/QuizResultPage';
import { MyLeavePage } from './components/student/MyLeavePage';
import { ApplyLeavePage } from './components/student/ApplyLeavePage';
import { StudentNoticeBoardPage } from './components/student/StudentNoticeBoardPage';
import { StudentDetailsPage } from './components/student/StudentDetailsPage';
import { FullScreenImageViewer } from './components/FullScreenImageViewer';


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
import { StaffNoticeBoardPage } from './components/staff/StaffNoticeBoardPage';
import { StaffNotificationsPage } from './components/staff/StaffNotificationsPage';
import { MarkStaffAttendancePage } from './components/MarkStaffAttendancePage';
import { StaffAttendanceReportPage } from './components/StaffAttendanceReportPage';
import { StaffAttendancePage } from './components/staff/StaffAttendancePage';

// FIX: Added new transport components
import { TransportOptionsPage } from './components/TransportOptionsPage';
import { NewTransportRoutePage } from './components/NewTransportRoutePage';
import { EditTransportRoutePage } from './components/EditTransportRoutePage';
import { MapStudentsToRoutePage } from './components/MapStudentsToRoutePage';
import { StudentTransportPage } from './components/student/StudentTransportPage';
import { AIChatbot } from './components/AIChatbot';

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
const createAcademyInFirestore = async (user: firebase.User, instituteName: string, academyId: string, adminName: string): Promise<Academy> => {
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
        adminName: adminName,
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

    type Role = 'academy' | 'student' | 'staff';

    // App state
    const [page, setPage] = useState('role-selection');
    const [loginPageRole, setLoginPageRole] = useState<Role>('academy');
    const [pageParams, setPageParams] = useState<{[key: string]: any}>({});
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);

    // Data state
    const [academy, setAcademy] = useState<Academy | null>(null);
    const [batches, setBatches] = useState<Batch[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [staff, setStaff] = useState<Staff[]>([]);
    const [staffAttendance, setStaffAttendance] = useState<StaffAttendance[]>([]);
    const [feeCollections, setFeeCollections] = useState<FeeCollection[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [exams, setExams] = useState<Exam[]>([]);
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>([]);
    const [homework, setHomework] = useState<Homework[]>([]);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [quizSubmissions, setQuizSubmissions] = useState<QuizSubmission[]>([]);
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [notices, setNotices] = useState<Notice[]>([]);
    // FIX: Added state for transport routes.
    const [transportRoutes, setTransportRoutes] = useState<TransportRoute[]>([]);
    const [todaysAttendance, setTodaysAttendance] = useState<Record<string, any>>({});


    // Page-specific state
    const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
    const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
    const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
    const [selectedEnquiryId, setSelectedEnquiryId] = useState<string | null>(null);
    const [selectedStudyMaterialId, setSelectedStudyMaterialId] = useState<string | null>(null);
    const [selectedHomeworkId, setSelectedHomeworkId] = useState<string | null>(null);
    const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
    const [studentListFilter, setStudentListFilter] = useState('all');
    // FIX: Added state for selected transport route.
    const [selectedTransportRouteId, setSelectedTransportRouteId] = useState<string | null>(null);

    // UI State
    const [connectionError, setConnectionError] = useState<string | null>(null);
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const [showConsent, setShowConsent] = useState(!localStorage.getItem('dataConsentAccepted'));
    const [showDevPopup, setShowDevPopup] = useState<string | null>(null);
    const [imageToView, setImageToView] = useState<string | null>(null);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    // Capacitor platform setup
    useEffect(() => {
        const initializeApp = async () => {
            if (Capacitor.isNativePlatform()) {
                await StatusBar.setStyle({ style: Style.Light });
                await CapSplashScreen.hide();
            }
        };
        initializeApp();
    }, []);


    // Scroll to top on page change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

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

    const handleNavigate = (page: string, params?: {[key: string]: any}) => {
        setPageParams(params || {});
        setPage(page);
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
            setPage('login');
            return;
        }

        const unsubscribe = auth.onAuthStateChanged(async (user: firebase.User | null) => {
            try {
                if (user) {
                    if (user.isAnonymous) {
                        // This is a temporary session used by the student/staff login form
                        // to gain read access to Firestore. The login form handles the logic,
                        // so we just let the `finally` block dismiss the loading screen.
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
                            await auth.signOut();
                        }
                    } else {
                        // NO USER MAPPING FOUND.
                        const instituteName = sessionStorage.getItem('google_reg_institute_name') || sessionStorage.getItem('registration_institute_name');
                        const academyId = sessionStorage.getItem('google_reg_academy_id') || sessionStorage.getItem('registration_academy_id');
                        const adminName = sessionStorage.getItem('google_reg_admin_name') || sessionStorage.getItem('registration_admin_name');

                        if (instituteName && academyId && adminName) {
                            // NEW REGISTRATION FLOW
                            try {
                                const newAcademy = await createAcademyInFirestore(user, instituteName, academyId, adminName);
                                alert(`Registration successful! Your Academy ID is ${newAcademy.academyId}. Please save it for your students and staff to log in.`);
                                handleRegisterSuccess(newAcademy);
                            } catch (error: any) {
                                console.error("Error creating academy:", error);
                                setAuthError(error.message || "Failed to create your academy account. This can happen due to permission issues or a duplicate Academy ID. Please check your Firestore security rules and try again.");
                                await auth.signOut();
                            } finally {
                                sessionStorage.removeItem('google_reg_flow');
                                sessionStorage.removeItem('google_reg_institute_name');
                                sessionStorage.removeItem('google_reg_academy_id');
                                sessionStorage.removeItem('google_reg_admin_name');
                                sessionStorage.removeItem('registration_institute_name');
                                sessionStorage.removeItem('registration_academy_id');
                                sessionStorage.removeItem('registration_admin_name');
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
                    const lastSelectedRole = localStorage.getItem('lastSelectedRole');
                    if (lastSelectedRole) {
                        setLoginPageRole(lastSelectedRole as Role);
                        setPage('login');
                    } else {
                        setPage('role-selection');
                    }
                }
            } catch (error) {
                console.error("Critical error in auth state handler:", error);
                setAuthError("A critical error occurred. Please refresh and try again.");
                if (auth.currentUser) {
                    await auth.signOut().catch(e => console.error("Signout failed during error handling:", e));
                }
                setCurrentUser(null);
                setAcademy(null);
                setPage('login');
            } finally {
                setIsLoading(false);
            }
        }, (error) => {
            console.error("Auth state listener error:", error);
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
                setStaffAttendance(demoStaffAttendance);
                setFeeCollections([]);
                setTransactions(demoTransactions);
                setExams([]);
                setEnquiries(demoEnquiries);
                setStudyMaterials([]);
                setHomework([]);
                setQuizzes([]);
                setLeaveRequests([]);
                setTasks([]);
                setNotices([]);
                // FIX: Added demo data for transport routes.
                setTransportRoutes(demoTransportRoutes);
            }
            return;
        };

        const academyId = (currentUser.role === 'admin') ? currentUser.data.id : currentUser.academyId;
        if (!academyId) return;

        const unsubscribers: (() => void)[] = [];

        // Academy details for non-admins
        if (currentUser.role !== 'admin') {
            const academyDocRef = doc(db, 'academies', academyId);
            const unsubAcademy = onSnapshot(academyDocRef, (docSnap) => {
                if (docSnap.exists()) {
                    setAcademy({ id: docSnap.id, ...docSnap.data() } as Academy);
                }
            }, err => {
                console.error("Error fetching academy details:", err);
                setConnectionError("Failed to connect to the database. Some information may be missing.");
            });
            unsubscribers.push(unsubAcademy);
        }

        // FIX: Added 'transportRoutes' to the list of collections to subscribe to.
        const collectionsToSubscribe = ['batches', 'students', 'staff', 'fees', 'transactions', 'exams', 'enquiries', 'studyMaterial', 'homework', 'quizzes', 'leaveRequests', 'tasks', 'notices', 'transportRoutes', 'staffAttendance'];
        const setters: any = {
            batches: setBatches,
            students: setStudents,
            staff: setStaff,
            fees: setFeeCollections,
            transactions: setTransactions,
            exams: setExams,
            enquiries: setEnquiries,
            studyMaterial: setStudyMaterials,
            homework: setHomework,
            quizzes: setQuizzes,
            leaveRequests: setLeaveRequests,
            tasks: setTasks,
            notices: setNotices,
            // FIX: Added setter for transport routes.
            transportRoutes: setTransportRoutes,
            staffAttendance: setStaffAttendance,
        };

        collectionsToSubscribe.forEach(coll => {
            if (coll === 'staff' && currentUser.role !== 'admin') return;
            
            const collRef = collection(db, `academies/${academyId}/${coll}`);
            const unsub = onSnapshot(collRef, (snapshot) => {
                const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
                setters[coll](list);
                setConnectionError(null); // Clear error on successful fetch
            }, (err) => {
                console.error(`Error fetching ${coll}:`, err);
                setConnectionError("Failed to connect to the database. Some information may be missing or outdated.");
            });
            unsubscribers.push(unsub);
        });
        
        // Add a new listener for quiz submissions when a quiz is selected for viewing results.
        if (currentUser.role === 'admin' && academy && page === 'quiz-results' && selectedQuizId) {
            const submissionsRef = collection(db, `academies/${academy.id}/quizzes/${selectedQuizId}/submissions`);
            const unsubSubmissions = onSnapshot(submissionsRef, (snapshot) => {
                const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as QuizSubmission[];
                setQuizSubmissions(list);
            }, (err) => console.error(`Error fetching quiz submissions:`, err));
            unsubscribers.push(unsubSubmissions);
        } else {
            setQuizSubmissions([]); // Clear when not on the page
        }


        return () => unsubscribers.forEach(unsub => unsub());

    }, [currentUser, isDemoMode, page, selectedQuizId]);
    
    // Today's attendance listener for admin notifications
    useEffect(() => {
        if (currentUser?.role !== 'admin' || !academy || isDemoMode) {
            setTodaysAttendance({});
            return;
        }

        const todayString = new Date().toISOString().split('T')[0];
        const activeBatchesWithStudents = batches.filter(b => b.isActive && b.currentStudents > 0);
        const unsubscribers: (() => void)[] = [];

        activeBatchesWithStudents.forEach(batch => {
            const attendanceRef = doc(db, `academies/${academy.id}/batches/${batch.id}/attendance`, todayString);
            const unsub = onSnapshot(attendanceRef, (docSnap) => {
                setTodaysAttendance(prev => ({
                    ...prev,
                    [batch.id]: docSnap.exists() ? docSnap.data() : null // null means not found
                }));
            }, (err) => {
                 console.error(`Error fetching attendance for batch ${batch.id}:`, err);
            });
            unsubscribers.push(unsub);
        });

        // Cleanup old listeners when batches change
        return () => {
            unsubscribers.forEach(unsub => unsub());
            setTodaysAttendance(prev => {
                const newAttendanceState: Record<string, any> = {};
                const activeBatchIds = new Set(activeBatchesWithStudents.map(b => b.id));
                for (const batchId in prev) {
                    if (activeBatchIds.has(batchId)) {
                        newAttendanceState[batchId] = prev[batchId];
                    }
                }
                return newAttendanceState;
            });
        };
    }, [currentUser, academy, batches, isDemoMode]);


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

    // Notification logic
    const adminNewEnquiries = useMemo(() => enquiries.filter(e => e.status === 'New'), [enquiries]);
    const adminPendingLeaves = useMemo(() => leaveRequests.filter(lr => lr.status === 'Pending'), [leaveRequests]);
    
    const adminUnmarkedAttendanceBatches = useMemo(() => {
        if (currentUser?.role !== 'admin' || isDemoMode) return [];
        
        const activeBatchesWithStudents = batches.filter(b => b.isActive && b.currentStudents > 0);
        
        const allChecked = activeBatchesWithStudents.every(b => todaysAttendance.hasOwnProperty(b.id));

        if (!allChecked) {
            return []; // Don't show any notification until all checks are complete to avoid flicker
        }

        return activeBatchesWithStudents.filter(batch => {
            return todaysAttendance[batch.id] === null;
        });
    }, [currentUser, batches, todaysAttendance, isDemoMode]);


    const staffPendingLeaves = useMemo(() => {
        if (currentUser?.role !== 'staff') return [];
        
        const staffData = currentUser.data;
        const permittedBatchIds = Object.keys(staffData.batchAccess || {}).filter(
            batchId => staffData.batchAccess[batchId]?.leaveRequests
        );
        const permittedBatchNames = new Set(
            batches.filter(b => permittedBatchIds.includes(b.id)).map(b => b.name)
        );
        const permittedStudentIds = new Set(
            students.filter(s => s.batches.some(b => permittedBatchNames.has(b)))
                   .map(s => s.id)
        );

        return leaveRequests.filter(req => req.status === 'Pending' && req.userRole === 'student' && permittedStudentIds.has(req.userId));
    }, [currentUser, leaveRequests, batches, students]);

    const notificationCount = useMemo(() => {
        if (currentUser?.role === 'admin') {
            return adminNewEnquiries.length + adminPendingLeaves.length + adminUnmarkedAttendanceBatches.length;
        }
        if (currentUser?.role === 'staff') {
            return staffPendingLeaves.length;
        }
        return 0;
    }, [currentUser, adminNewEnquiries, adminPendingLeaves, staffPendingLeaves, adminUnmarkedAttendanceBatches]);


    // Handlers
    const handleLogin = (user: CurrentUser) => {
        setAuthError(null);
        setCurrentUser(user);
        if (user.role === 'admin') {
            setAcademy(user.data);
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
        localStorage.removeItem('lastSelectedRole');
        setPage('role-selection');
    };
    
    const handleCompleteRegistration = async (instituteName: string) => {
        if (!auth.currentUser) {
            setAuthError("Your session has expired. Please try logging in again.");
            setPage('login');
            return;
        }
        
        const baseId = instituteName.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().substring(0, 8);
        let academyId = baseId;
        let isUnique = false;
        let attempt = 0;

        while (!isUnique && attempt < 10) {
            const q = query(collection(db, "academies"), where("academyId", "==", academyId));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                isUnique = true;
            } else {
                attempt++;
                academyId = `${baseId}${attempt}`;
            }
        }
        
        if (!isUnique) {
            setAuthError("Could not generate a unique Academy ID. Please try another institute name.");
            return;
        }

        try {
            const newAcademy = await createAcademyInFirestore(auth.currentUser, instituteName, academyId, auth.currentUser.displayName || "Admin");
            alert(`Registration complete! Your Academy ID is ${newAcademy.academyId}.`);
            handleRegisterSuccess(newAcademy);
        } catch (error: any) {
            console.error("Error completing registration:", error);
            setAuthError(error.message || "Failed to complete your registration.");
        }
    };
    
    // Data Handlers
    const createDataHandler = (collectionName: string, successPage?: string) => async (data: any, docId?: string) => {
        if (!academy || isDemoMode) {
            alert("Cannot save data in demo mode.");
            throw new Error("Demo mode: cannot save data.");
        }
        
        const sanitizedData: { [key: string]: any } = {};
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                if (data[key] !== undefined) {
                    sanitizedData[key] = data[key];
                }
            }
        }

        const collectionRef = collection(db, `academies/${academy.id}/${collectionName}`);
        try {
            if (docId) {
                await updateDoc(doc(collectionRef, docId), sanitizedData);
            } else {
                await addDoc(collectionRef, sanitizedData);
            }
            if (successPage) setPage(successPage);
        } catch (error) {
            console.error(`Error saving ${collectionName}:`, error);
            alert(`Failed to save ${collectionName}.`);
            throw error;
        }
    };
    
    const createDeleteHandler = (collectionName: string) => async (docId: string) => {
         if (!academy || isDemoMode) {
            alert("Cannot delete data in demo mode.");
            return;
        }
        if (!window.confirm(`Are you sure you want to delete this ${collectionName.slice(0, -1)}?`)) return;
        try {
            await deleteDoc(doc(db, `academies/${academy.id}/${collectionName}`, docId));
        } catch (error) {
            console.error(`Error deleting ${collectionName}:`, error);
            alert(`Failed to delete ${collectionName}.`);
        }
    }
    
    const handleSaveBatch = async (batchData: Omit<Batch, 'id' | 'currentStudents'>, batchId?: string) => {
        if (!academy || isDemoMode) { throw new Error("Cannot save batch."); }
        const dataToSave = { ...batchData, isActive: batchData.isActive ?? true };
        try {
            if (batchId) {
                await updateDoc(doc(db, `academies/${academy.id}/batches`, batchId), dataToSave);
            } else {
                await addDoc(collection(db, `academies/${academy.id}/batches`), { ...dataToSave, currentStudents: 0 });
            }
            setPage('batches');
        } catch (error) {
            console.error("Error saving batch:", error);
            alert("Failed to save batch.");
            throw error;
        }
    };

    const handleSaveStudent = async (studentData: Omit<Student, 'id' | 'isActive'>, enquiryId?: string): Promise<Student | void> => {
        if (!academy || isDemoMode) { throw new Error("Cannot save student."); }
        const dataToSave = { ...studentData, isActive: true };
        try {
            const batch = writeBatch(db);
            const studentRef = doc(collection(db, `academies/${academy.id}/students`));
            batch.set(studentRef, dataToSave);
            
            // Update student counts in batches
            const studentBatches = batches.filter(b => studentData.batches.includes(b.name));
            studentBatches.forEach(b => {
                batch.update(doc(db, `academies/${academy.id}/batches`, b.id), { currentStudents: increment(1) });
            });

            // If converted from enquiry, update enquiry status
            if (enquiryId) {
                batch.update(doc(db, `academies/${academy.id}/enquiries`, enquiryId), { status: 'Converted' });
            }
            
            await batch.commit();
            return { id: studentRef.id, ...dataToSave };
        } catch (error) {
            console.error("Error saving student:", error);
            alert("Failed to save student.");
            throw error;
        }
    };
    
    const handleUpdateStudent = async (studentData: Omit<Student, 'id' | 'isActive'>) => {
        if (!academy || isDemoMode || !selectedStudentId) { return; }
        try {
            await updateDoc(doc(db, `academies/${academy.id}/students`, selectedStudentId), studentData);
            setPage('active-students');
        } catch (error) {
            console.error("Error updating student:", error);
            alert("Failed to update student.");
        }
    };
    
    const handleToggleStudentStatus = async (studentId: string) => {
        if (!academy || isDemoMode) { return; }
        const student = students.find(s => s.id === studentId);
        if (!student) return;
        try {
            const batch = writeBatch(db);
            const studentRef = doc(db, `academies/${academy.id}/students`, studentId);
            batch.update(studentRef, { isActive: !student.isActive });

            const incrementValue = student.isActive ? -1 : 1;
            const studentBatches = batches.filter(b => student.batches.includes(b.name));
            studentBatches.forEach(b => {
                batch.update(doc(db, `academies/${academy.id}/batches`, b.id), { currentStudents: increment(incrementValue) });
            });
            await batch.commit();
        } catch (error) {
            console.error("Error toggling student status:", error);
        }
    };
    
    const handleSaveFeePayment = async (paymentData: Omit<FeeCollection, 'id'>) => {
        if (!academy || isDemoMode) {
             throw { code: 'demo-mode', message: 'Cannot save payments in demo mode.' };
        }
        try {
            const batch = writeBatch(db);
            const feeRef = doc(collection(db, `academies/${academy.id}/fees`));
            const transactionRef = doc(collection(db, `academies/${academy.id}/transactions`));
            
            const finalPaymentData = {
                ...paymentData,
                paymentDate: Timestamp.fromDate(new Date(paymentData.paymentDate as any)),
                createdAt: serverTimestamp(),
                transactionId: transactionRef.id
            };
            batch.set(feeRef, finalPaymentData);
            
            const transactionData: Omit<Transaction, 'id'> = {
                type: 'Income',
                category: 'Tuition Fees',
                amount: paymentData.amountPaid,
                paymentMethod: paymentData.paymentMode,
                description: `Fee from ${paymentData.studentName} (${paymentData.studentRollNumber}) for ${paymentData.feeForMonth}`,
                date: finalPaymentData.paymentDate,
                createdAt: finalPaymentData.createdAt,
                feeCollectionId: feeRef.id
            };
            batch.set(transactionRef, transactionData);
            
            await batch.commit();
        } catch(e) {
            console.error("Error saving fee payment:", e);
            throw e;
        }
    };
    
    const handleDeleteFeeCollection = async (feeId: string) => {
        if (!academy || isDemoMode) { return; }
        const feeToDelete = feeCollections.find(f => f.id === feeId);
        if (!feeToDelete) return;
        
        try {
            const batch = writeBatch(db);
            batch.delete(doc(db, `academies/${academy.id}/fees`, feeId));
            if (feeToDelete.transactionId) {
                batch.delete(doc(db, `academies/${academy.id}/transactions`, feeToDelete.transactionId));
            }
            await batch.commit();
        } catch (error) {
            console.error("Error deleting fee collection:", error);
            throw error;
        }
    };
    
    const handleUpdateFeeCollection = async (feeId: string, data: any) => {
        if (!academy || isDemoMode) { return; }
        const feeToUpdate = feeCollections.find(f => f.id === feeId);
        if (!feeToUpdate) return;
        
        const newAmountPaid = feeToUpdate.totalAmount - data.discount;
        const updatedFeeData = {
            ...data,
            paymentDate: Timestamp.fromDate(new Date(data.paymentDate)),
            amountPaid: newAmountPaid
        };
        
        try {
            const batch = writeBatch(db);
            batch.update(doc(db, `academies/${academy.id}/fees`, feeId), updatedFeeData);
            if(feeToUpdate.transactionId) {
                batch.update(doc(db, `academies/${academy.id}/transactions`, feeToUpdate.transactionId), {
                    amount: newAmountPaid,
                    paymentMethod: data.paymentMode,
                    date: updatedFeeData.paymentDate,
                    description: `Fee from ${feeToUpdate.studentName} (${feeToUpdate.studentRollNumber}) for ${feeToUpdate.feeForMonth} (updated)`
                });
            }
            await batch.commit();
        } catch(error) {
            console.error("Error updating fee:", error);
            throw error;
        }
    };

    const handleSaveStaff = async (staffData: Omit<Staff, 'id'>) => {
        await createDataHandler('staff', 'staff-options')(staffData);
    };

    const handleToggleStaffStatus = async (staffId: string) => {
        if (!academy || isDemoMode) { return; }
        const staffMember = staff.find(s => s.id === staffId);
        if (!staffMember) return;
        try {
            await updateDoc(doc(db, `academies/${academy.id}/staff`, staffId), { isActive: !staffMember.isActive });
        } catch (error) {
            console.error("Error toggling staff status:", error);
        }
    };
    
    const handleUpdateStaffBatchAccess = async (staffId: string, batchAccess: { [batchId: string]: BatchAccessPermissions }) => {
        if (!academy || isDemoMode) { return; }
        try {
            await updateDoc(doc(db, `academies/${academy.id}/staff`, staffId), { batchAccess });
            setPage('staff-manager');
        } catch (error) {
            console.error("Error saving batch access:", error);
            alert("Failed to save permissions.");
        }
    };
    
    const handleSaveAcademyDetails = async (details: Partial<Academy>) => {
        if (!academy || isDemoMode) { return; }
        try {
            await updateDoc(doc(db, 'academies', academy.id), details);
        } catch (error) {
            console.error("Error saving academy details:", error);
            alert("Failed to save details.");
            throw error;
        }
    };
    
    const handleSaveSchedule = async (date: string, batchId: string, scheduleItems: ScheduleItem[]) => {
         if (!academy || isDemoMode) { throw new Error("Cannot save."); }
         try {
             const scheduleRef = doc(db, `academies/${academy.id}/schedules`, date);
             await setDoc(scheduleRef, { [batchId]: scheduleItems }, { merge: true });
         } catch(error) {
              console.error("Error saving schedule:", error);
              throw new Error("Failed to save schedule.");
         }
    };
    
    const handleSubscribe = async (plan: 'monthly' | 'quarterly' | 'yearly', months: number) => {
        if (!academy || isDemoMode) { return; }
        try {
            const now = new Date();
            const endDate = new Date(now.setMonth(now.getMonth() + months));
            await updateDoc(doc(db, 'academies', academy.id), {
                plan,
                subscriptionStatus: 'active',
                subscriptionEndsAt: Timestamp.fromDate(endDate),
                trialEndsAt: deleteField()
            });
            alert("Subscription updated successfully!");
        } catch (error) {
            console.error("Subscription update failed:", error);
            throw error;
        }
    };
    
    const handleSaveTransaction = createDataHandler('transactions');
    const handleUpdateTransaction = async (id: string, data: any) => await handleSaveTransaction(data, id);
    const handleDeleteTransaction = async (transactionId: string) => {
        if (!academy || isDemoMode) {
            throw new Error("Cannot delete data in demo mode.");
        }

        const transactionToDelete = transactions.find(t => t.id === transactionId);
        if (!transactionToDelete) {
            throw new Error("Could not find the transaction to delete.");
        }
        
        try {
            const batch = writeBatch(db);
            
            const transactionRef = doc(db, `academies/${academy.id}/transactions`, transactionId);
            batch.delete(transactionRef);
            
            if (transactionToDelete.feeCollectionId) {
                const feeRef = doc(db, `academies/${academy.id}/fees`, transactionToDelete.feeCollectionId);
                batch.delete(feeRef);
            }

            await batch.commit();
        } catch (error) {
            console.error(`Error deleting transaction:`, error);
            throw new Error(`Failed to delete transaction.`);
        }
    };
    
    const handleSaveExam = async (examData: Omit<Exam, 'id'>) => {
        const id = pageParams.examId;
        await createDataHandler('exams', 'manage-exams')(examData, id);
    };

    const handlePublishExam = async (examId: string, status: 'Published' | 'Draft') => {
        if (!academy || isDemoMode) { return; }
        try {
            await updateDoc(doc(db, `academies/${academy.id}/exams`, examId), { resultStatus: status });
        } catch (error) {
            console.error("Failed to update exam status:", error);
            alert("Failed to update status.");
            throw error;
        }
    };
    
    const handleSaveEnquiry = async (enquiryData: any) => {
        const {enquiryId, data} = enquiryData;
        await createDataHandler('enquiries', 'enquiry-manager')(data || enquiryData, enquiryId);
    };

    const handleDeleteEnquiry = createDeleteHandler('enquiries');

    const handleSaveStudyMaterial = async (data: Omit<StudyMaterial, 'id'>) => {
        const id = pageParams.studyMaterialId;
        await createDataHandler('studyMaterial', 'study-material')(data, id);
    };
    
    const handleDeleteStudyMaterial = async (material: StudyMaterial) => {
        if (!academy || isDemoMode) { return; }
        if (!window.confirm(`Delete "${material.title}"?`)) return;
        try {
            const batch = writeBatch(db);
            batch.delete(doc(db, `academies/${academy.id}/studyMaterial`, material.id));
            if(material.storagePath) {
                const fileRef = ref(storage, material.storagePath);
                await deleteObject(fileRef);
            }
            await batch.commit();
        } catch(error) {
            console.error("Error deleting material:", error);
            alert("Failed to delete material.");
        }
    };

    const handleSaveHomework = async (data: Omit<Homework, 'id'>) => {
        const id = pageParams.homeworkId;
        await createDataHandler('homework', 'homework')(data, id);
    };

    const handleDeleteHomework = async (homeworkToDelete: Homework) => {
        if (!academy || isDemoMode) { return; }
        if (!window.confirm(`Delete "${homeworkToDelete.title}"?`)) return;
        try {
            const batch = writeBatch(db);
            batch.delete(doc(db, `academies/${academy.id}/homework`, homeworkToDelete.id));
            if(homeworkToDelete.storagePath) {
                const fileRef = ref(storage, homeworkToDelete.storagePath);
                await deleteObject(fileRef);
            }
            await batch.commit();
        } catch(error) {
            console.error("Error deleting homework:", error);
            alert("Failed to delete homework.");
        }
    };
    
    const handleSaveQuiz = async (data: Omit<Quiz, 'id'>) => {
        const id = pageParams.quizId;
        await createDataHandler('quizzes', 'manage-quizzes')(data, id);
    };

    const handleDeleteQuiz = async (quizId: string) => {
        // In a real app, you would also delete all submissions in a subcollection,
        // likely with a cloud function. For now, just delete the quiz doc.
        await createDeleteHandler('quizzes')(quizId);
    };
    
    const handleUpdateLeaveStatus = async (id: string, status: 'Approved' | 'Rejected') => {
        if(!academy || isDemoMode) return;
        const reviewedBy = currentUser?.role === 'admin' ? academy.adminName : (currentUser as any)?.data.name;
        try {
            await updateDoc(doc(db, `academies/${academy.id}/leaveRequests`, id), {
                status,
                reviewedBy: reviewedBy || 'Admin',
                reviewedAt: serverTimestamp(),
            });
        } catch (error) {
            alert("Failed to update status.");
        }
    };
    
    const handleSaveTask = async (data: any, taskId?: string) => {
        const saveData = {
            ...data,
            dueDate: Timestamp.fromDate(new Date(data.dueDate)),
            createdAt: taskId ? undefined : serverTimestamp(),
            status: 'Pending'
        };
        if(!taskId) delete (saveData as any).id;

        await createDataHandler('tasks')(saveData, taskId);
    };

    const handleToggleTaskStatus = async (taskId: string, currentStatus: Task['status']) => {
        await createDataHandler('tasks')({ status: currentStatus === 'Pending' ? 'Completed' : 'Pending' }, taskId);
    };

    const handleDeleteTask = createDeleteHandler('tasks');
    
    const handleSaveNotice = async (data: Omit<Notice, 'id' | 'createdAt'>, noticeId?: string) => {
        const saveData = {
            ...data,
            expiryDate: Timestamp.fromDate(new Date(data.expiryDate as any)),
            createdAt: noticeId ? undefined : serverTimestamp(),
        };
        await createDataHandler('notices')(saveData, noticeId);
    };
    
    const handleDeleteNotice = async (notice: Notice) => {
        if (!academy || isDemoMode) { return; }
        if (!window.confirm(`Delete "${notice.title}"?`)) return;
        try {
            const batch = writeBatch(db);
            batch.delete(doc(db, `academies/${academy.id}/notices`, notice.id));
            if(notice.storagePath) {
                const fileRef = ref(storage, notice.storagePath);
                await deleteObject(fileRef);
            }
            await batch.commit();
        } catch(error) {
            console.error("Error deleting notice:", error);
            alert("Failed to delete notice.");
        }
    };

    const handleSaveTransportRoute = async (data: Omit<TransportRoute, 'id'>, routeId?: string) => {
        await createDataHandler('transportRoutes', 'transport-options')(data, routeId);
    };

    const handleDeleteTransportRoute = async (routeId: string) => {
        if (!academy || isDemoMode) { return; }
        
        try {
            const batch = writeBatch(db);
            // Delete the route
            batch.delete(doc(db, `academies/${academy.id}/transportRoutes`, routeId));
            
            // Unassign students from this route
            const studentsOnRoute = students.filter(s => s.transportRouteId === routeId);
            studentsOnRoute.forEach(s => {
                batch.update(doc(db, `academies/${academy.id}/students`, s.id), {
                    transport: 'NO_TRANSPORT_USE',
                    transportRouteId: deleteField(),
                    transportFee: deleteField(),
                });
            });
            await batch.commit();
        } catch (error) {
            console.error("Error deleting route:", error);
            throw error;
        }
    };
    
    const handleMapStudentsToRoute = async (routeId: string, assignedStudentIds: string[], unassignedStudentIds: string[]) => {
        if (!academy || isDemoMode) { return; }
        const route = transportRoutes.find(r => r.id === routeId);
        if (!route) return;

        try {
            const batch = writeBatch(db);
            assignedStudentIds.forEach(studentId => {
                batch.update(doc(db, `academies/${academy.id}/students`, studentId), {
                    transport: 'USE_TRANSPORT',
                    transportRouteId: routeId,
                    transportFee: route.monthlyFee
                });
            });
            unassignedStudentIds.forEach(studentId => {
                 batch.update(doc(db, `academies/${academy.id}/students`, studentId), {
                    transport: 'NO_TRANSPORT_USE',
                    transportRouteId: deleteField(),
                    transportFee: deleteField()
                });
            });
            await batch.commit();
            setPage('transport-options');
        } catch (error) {
            console.error("Error mapping students:", error);
            alert("Failed to update student assignments.");
        }
    };

    const handleSaveQuizSubmission = async (quizId: string, studentAnswers: Record<string, number>) => {
        if(!currentUser || currentUser.role !== 'student' || !academy) throw new Error("Invalid session");

        const quiz = quizzes.find(q => q.id === quizId);
        if(!quiz) throw new Error("Quiz not found");

        let score = 0;
        quiz.questions.forEach(q => {
            if(studentAnswers[q.id] === q.correctAnswerIndex) {
                score += (quiz.totalMarks / quiz.questions.length);
            }
        });

        const submissionData: Omit<QuizSubmission, 'id'> = {
            studentId: currentUser.data.id,
            studentName: currentUser.data.name,
            studentRollNumber: currentUser.data.rollNumber,
            answers: studentAnswers,
            score,
            totalMarks: quiz.totalMarks,
            submittedAt: serverTimestamp(),
        };

        await setDoc(doc(db, `academies/${academy.id}/quizzes/${quiz.id}/submissions`, currentUser.data.id), submissionData);
    };

    const handleSaveStaffAttendance = async (data: Partial<Omit<StaffAttendance, 'id'>>, id?: string): Promise<string | void> => {
        if (!academy || isDemoMode) {
            throw new Error("Cannot save data in demo mode.");
        }
        
        // Calculate duration
        let durationMinutes = 0;
        if (data.startTime && data.endTime) {
            const start = new Date(`1970-01-01T${data.startTime}`);
            const end = new Date(`1970-01-01T${data.endTime}`);
            if (end > start) {
                durationMinutes = (end.getTime() - start.getTime()) / 60000;
            }
        }

        const dataToSave = {
            ...data,
            durationMinutes
        };

        const collectionRef = collection(db, `academies/${academy.id}/staffAttendance`);
        try {
            if (id) {
                await updateDoc(doc(collectionRef, id), dataToSave);
            } else {
                const newDocRef = doc(collectionRef);
                await setDoc(newDocRef, dataToSave);
                return newDocRef.id;
            }
        } catch (error) {
            console.error(`Error saving staff attendance:`, error);
            alert(`Failed to save staff attendance.`);
            throw error;
        }
    };

    const handleDeleteStaffAttendance = createDeleteHandler('staffAttendance');


    if (isPlaceholderConfig) {
        return (
            <div className="min-h-screen flex flex-col">
                <ConfigurationWarning />
                <LoginPage onLogin={handleLogin} onNavigateToRegister={() => setPage('register')} externalError={authError} clearExternalError={() => setAuthError(null)} initialRole="academy" onGoBack={() => {}} />
            </div>
        );
    }

    if (isLoading) {
        return <SplashScreen />;
    }

    if (!currentUser) {
        switch (page) {
            case 'role-selection':
                return <RoleSelectionPage onSelectRole={(role) => {
                    localStorage.setItem('lastSelectedRole', role);
                    setLoginPageRole(role);
                    setPage('login');
                }} onBack={() => {
                     if (window.history.length > 1) {
                        window.history.back();
                    }
                }} />;
            case 'register':
                return <RegisterPage onNavigateToLogin={() => setPage('login')} />;
            case 'complete-registration':
                return <CompleteRegistrationPage onComplete={handleCompleteRegistration} onLogout={handleLogout} userEmail={auth.currentUser?.email || ''} externalError={authError} clearExternalError={() => setAuthError(null)} />;
            default:
                return <LoginPage 
                    onLogin={handleLogin} 
                    onNavigateToRegister={() => setPage('register')} 
                    externalError={authError} 
                    clearExternalError={() => setAuthError(null)}
                    initialRole={loginPageRole}
                    onGoBack={() => {
                        localStorage.removeItem('lastSelectedRole');
                        setPage('role-selection');
                    }}
                />;
        }
    }

    // After this point, currentUser is guaranteed to be defined.

    if (currentUser.role === 'admin' && academy?.subscriptionStatus === 'expired') {
        return <SubscriptionExpiredPage 
            onNavigate={setPage} 
            onLogout={handleLogout} 
            academy={academy}
            onSubscribe={handleSubscribe}
        />;
    }
    
    // FIX: Explicitly providing generic types for `findSelected` calls to ensure correct type inference. Without this, TypeScript may infer a less specific type, causing cascading type errors in components.
    const findSelected = <T extends {id: string}>(collection: T[], id: string | null): T | undefined => {
        return id ? collection.find(item => item.id === id) : undefined;
    };
    const selectedBatch = findSelected<Batch>(batches, selectedBatchId);
    const selectedStudent = findSelected<Student>(students, selectedStudentId);
    const selectedStaff = findSelected<Staff>(staff, selectedStaffId);
    const selectedExam = findSelected<Exam>(exams, selectedExamId);
    const selectedEnquiry = findSelected<Enquiry>(enquiries, selectedEnquiryId) || (pageParams.enquiryId && findSelected<Enquiry>(enquiries, pageParams.enquiryId as string));
    const selectedHomework = findSelected<Homework>(homework, selectedHomeworkId);
    const selectedQuiz = findSelected<Quiz>(quizzes, selectedQuizId);
    const selectedTransportRoute = findSelected<TransportRoute>(transportRoutes, selectedTransportRouteId);
    const selectedStudyMaterial = findSelected<StudyMaterial>(studyMaterials, selectedStudyMaterialId);


    const renderPage = () => {
        const student = currentUser.role === 'student' ? currentUser.data : null;
        
        switch (page) {
            case 'dashboard':
                if (currentUser.role === 'admin') return <Dashboard onNavigate={setPage} academy={academy!} students={students} batches={batches} staff={staff} transactions={transactions} onShowDevPopup={setShowDevPopup} />;
                if (currentUser.role === 'student') return <StudentDashboardPage student={currentUser.data} academy={academy!} feeCollections={feeCollections} batches={batches} onNavigate={setPage} onToggleNav={() => setIsNavOpen(true)} theme={theme} onToggleTheme={handleToggleTheme} onShowDevPopup={setShowDevPopup} />;
                if (currentUser.role === 'staff') return <StaffDashboardPage onNavigate={setPage} academy={academy!} staff={currentUser.data} onShowDevPopup={setShowDevPopup} />;
                return null;

            // Admin pages
            case 'batches':
                return <BatchesPage onBack={() => setPage('dashboard')} onCreate={() => setPage('new-batch')} batches={batches} onViewStudents={(batchName) => { setStudentListFilter(batchName); setPage('active-students'); }} onEditBatch={(batchId) => { setSelectedBatchId(batchId); setPage('edit-batch'); }} />;
            case 'new-batch':
                return <NewBatchPage onBack={() => setPage('batches')} onSave={handleSaveBatch} />;
            case 'edit-batch':
                return selectedBatch && <EditBatchPage onBack={() => setPage('batches')} onSave={(id, data) => handleSaveBatch(data, id)} batch={selectedBatch} />;
            case 'student-options':
                return <StudentOptionsPage onBack={() => setPage('dashboard')} onNavigate={setPage} onShowDevPopup={setShowDevPopup} />;
            case 'new-student':
                return <NewStudentPage onBack={() => setPage(selectedEnquiry ? 'enquiry-manager' : 'student-options')} onSave={handleSaveStudent} batches={batches} academyId={academy?.academyId || 'DEMO'} enquiryData={selectedEnquiry} students={students} />;
            case 'active-students':
                return <ActiveStudentsPage onBack={() => setPage('student-options')} students={students} batches={batches} onToggleStudentStatus={handleToggleStudentStatus} onEditStudent={(id) => { setSelectedStudentId(id); setPage('edit-student'); }} onViewStudent={(id) => { setSelectedStudentId(id); setPage('student-details')}} initialFilter={studentListFilter} staffPermissions={currentUser.role === 'staff' ? currentUser.data.batchAccess : undefined}/>;
            case 'edit-student':
                return selectedStudent && <EditStudentPage onBack={() => setPage('active-students')} onUpdate={handleUpdateStudent} student={selectedStudent} batches={batches} />;
            case 'inactive-students':
                return <InactiveStudentsPage onBack={() => setPage('student-options')} students={students} batches={batches} onToggleStudentStatus={handleToggleStudentStatus} />;
            case 'birthday-list':
                return <BirthdayListPage onBack={() => setPage('student-options')} students={students} />;
            case 'registration-form-list':
                return <RegistrationFormListPage onBack={() => setPage('student-options')} students={students} onSelectStudent={(id) => { setSelectedStudentId(id); setPage('registration-form-view'); }} />;
            case 'registration-form-view':
                return selectedStudent && academy && <RegistrationFormViewPage onBack={() => setPage('registration-form-list')} student={selectedStudent} transportRoutes={transportRoutes} academy={academy} />;
            case 'select-batch-attendance':
                 return <SelectBatchForAttendancePage onBack={() => setPage('dashboard')} batches={batches} onSelectBatch={(id) => { setSelectedBatchId(id); setPage('take-attendance'); }} academyId={academy!.id} staffPermissions={currentUser.role === 'staff' ? currentUser.data.batchAccess : undefined} />;
            case 'take-attendance':
                return selectedBatch && <TakeAttendancePage onBack={() => setPage('select-batch-attendance')} batch={selectedBatch} students={students} academy={academy!} isDemoMode={isDemoMode} onShowImage={setImageToView} />;
            case 'fees-options':
                return <FeesOptionsPage onBack={() => setPage('dashboard')} onNavigate={setPage} />;
            case 'select-batch-for-fees':
                return <SelectBatchForFeesPage onBack={() => setPage('fees-options')} batches={batches} onSelectBatch={(id) => { setSelectedBatchId(id); setPage('select-student-for-fees'); }} staffPermissions={currentUser.role === 'staff' ? currentUser.data.batchAccess : undefined} />;
            case 'select-student-for-fees':
                return selectedBatch && <SelectStudentForFeesPage onBack={() => setPage('select-batch-for-fees')} batch={selectedBatch} students={students} onSelectStudent={(id) => { setSelectedStudentId(id); setPage('student-fee-details'); }} />;
            case 'student-fee-details':
                return selectedStudent && <StudentFeeDetailsPage onBack={() => setPage('select-student-for-fees')} student={selectedStudent} feeCollections={feeCollections} onSavePayment={handleSaveFeePayment} academy={academy!} />;
            case 'fee-collection-report':
                return <FeeCollectionReportPage onBack={() => setPage('fees-options')} feeCollections={feeCollections} onDelete={handleDeleteFeeCollection} onUpdate={handleUpdateFeeCollection} isDemoMode={isDemoMode} />;
            case 'fee-dues-list':
                return <FeeDuesListPage onBack={() => setPage('fees-options')} students={students} batches={batches} feeCollections={feeCollections} academy={academy!} />;
            case 'staff-options':
                return <StaffOptionsPage onBack={() => setPage('dashboard')} onNavigate={setPage} />;
            case 'new-staff':
                return <NewStaffPage onBack={() => setPage('staff-options')} onSave={handleSaveStaff} staff={staff} />;
            case 'staff-manager':
                return <StaffManagerPage onBack={() => setPage('staff-options')} staff={staff} onToggleStatus={handleToggleStaffStatus} onManageAccess={(id) => { setSelectedStaffId(id); setPage('staff-batch-access'); }} onShowDevPopup={setShowDevPopup} />;
            case 'inactive-staff':
                return <InactiveStaffPage onBack={() => setPage('staff-options')} staff={staff} onToggleStatus={handleToggleStaffStatus} />;
            case 'staff-batch-access':
                return selectedStaff && <StaffBatchAccessPage onBack={() => setPage('staff-manager')} staff={selectedStaff} batches={batches} onSave={handleUpdateStaffBatchAccess} />;
            case 'mark-staff-attendance':
                return <MarkStaffAttendancePage onBack={() => setPage('staff-options')} batches={batches} staff={staff} academyId={academy!.id} isDemoMode={isDemoMode} staffAttendance={staffAttendance} onSave={handleSaveStaffAttendance} onDelete={handleDeleteStaffAttendance} />;
            case 'settings':
                return <SettingsPage onBack={() => setPage('dashboard')} onNavigate={setPage} onShowDevPopup={setShowDevPopup} />;
            case 'custom-sms-settings':
                return <CustomSmsSettingsPage onBack={() => setPage('settings')} academy={academy!} onSave={handleSaveAcademyDetails} />;
            case 'schedule-classes':
                return <ScheduleClassesPage onBack={() => setPage('dashboard')} batches={batches} staff={staff} academyId={academy!.id} onSave={handleSaveSchedule} isDemoMode={isDemoMode} />;
            case 'subscription':
                 return <SubscriptionPage onBack={() => setPage('dashboard')} academy={academy!} onSubscribe={handleSubscribe} />;
            case 'income-expenses':
                return <IncomeExpensesPage onBack={() => setPage('dashboard')} transactions={transactions} onSave={handleSaveTransaction} onUpdate={handleUpdateTransaction} onDelete={handleDeleteTransaction} isDemoMode={isDemoMode}/>
            case 'manage-exams':
                return <ManageExamsPage onBack={() => setPage('dashboard')} exams={exams} onNavigate={(page, params) => { if(params?.examId) setSelectedExamId(params.examId); handleNavigate(page, params); }} staffPermissions={currentUser.role === 'staff' ? currentUser.data.batchAccess : undefined} onPublish={handlePublishExam} />;
            case 'create-exam':
            case 'edit-exam':
                 // FIX: Explicitly specify generic type for `findSelected` to ensure correct type inference.
                 return <CreateExamPage onBack={() => setPage('manage-exams')} onSave={handleSaveExam} batches={batches} exam={pageParams.examId ? findSelected<Exam>(exams, pageParams.examId as string) : undefined} staffPermissions={currentUser.role === 'staff' ? currentUser.data.batchAccess : undefined} />;
            case 'record-marks':
                return selectedExam && <RecordMarksPage onBack={() => setPage('manage-exams')} exam={selectedExam} students={students} academy={academy!} isDemoMode={isDemoMode} onPublish={handlePublishExam} />;
            case 'enquiry-manager':
                return <EnquiryManagerPage onBack={() => setPage('dashboard')} enquiries={enquiries} onNavigate={(page, params) => { if(params?.enquiryId) setSelectedEnquiryId(params.enquiryId); handleNavigate(page, params); }} onDelete={handleDeleteEnquiry} onUpdateStatus={async (id, data) => await handleSaveEnquiry({ enquiryId: id, data})}/>;
            case 'new-enquiry':
            case 'edit-enquiry':
                // FIX: Explicitly specify generic type for `findSelected` to ensure correct type inference.
                return <NewEnquiryPage onBack={() => setPage('enquiry-manager')} onSave={handleSaveEnquiry} batches={batches} enquiry={pageParams.enquiryId ? findSelected<Enquiry>(enquiries, pageParams.enquiryId as string) : undefined} />;
            case 'reports-options':
                return <ReportsPage onBack={() => setPage('dashboard')} onNavigate={setPage} onShowDevPopup={setShowDevPopup} />;
            case 'attendance-report':
                return <AttendanceReportPage onBack={() => setPage('reports-options')} batches={batches} students={students} academyId={academy!.id} academy={academy!} />;
            case 'staff-attendance-report':
                return <StaffAttendanceReportPage onBack={() => setPage('reports-options')} staff={staff} staffAttendance={staffAttendance} />;
            case 'study-material':
                return <StudyMaterialPage onBack={() => setPage('dashboard')} materials={studyMaterials} batches={batches} onNavigate={(page, params) => { if(params?.studyMaterialId) setSelectedStudyMaterialId(params.studyMaterialId); handleNavigate(page, params); }} onDelete={handleDeleteStudyMaterial} />;
            case 'upload-study-material':
            case 'edit-study-material':
                // FIX: Explicitly specify generic type for `findSelected` to ensure correct type inference.
                return <UploadStudyMaterialPage onBack={() => setPage('study-material')} onSave={handleSaveStudyMaterial} batches={batches} academyId={academy!.id} uploaderName={academy!.adminName || 'Admin'} materialToEdit={pageParams.studyMaterialId ? findSelected<StudyMaterial>(studyMaterials, pageParams.studyMaterialId as string) : undefined} isDemoMode={isDemoMode} />;
            case 'homework':
                return <HomeworkPage onBack={() => setPage('dashboard')} homework={homework} batches={batches} onNavigate={(page, params) => { if(params?.homeworkId) setSelectedHomeworkId(params.homeworkId); handleNavigate(page, params); }} onDelete={handleDeleteHomework} />;
            case 'assign-homework':
            case 'edit-homework':
                // FIX: Explicitly specify generic type for `findSelected` to ensure correct type inference.
                return <AssignHomeworkPage onBack={() => setPage('homework')} onSave={handleSaveHomework} batches={batches} academyId={academy!.id} uploaderName={academy!.adminName || 'Admin'} homeworkToEdit={pageParams.homeworkId ? findSelected<Homework>(homework, pageParams.homeworkId as string) : undefined} isDemoMode={isDemoMode}/>;
            case 'homework-submissions':
                return selectedHomework && <HomeworkSubmissionsPage onBack={() => setPage('homework')} homework={selectedHomework} students={students} academyId={academy!.id} />;
            case 'manage-quizzes':
                return <ManageQuizzesPage onBack={() => setPage('dashboard')} quizzes={quizzes} onNavigate={(page, params) => { if(params?.quizId) setSelectedQuizId(params.quizId); handleNavigate(page, params); }} onDelete={handleDeleteQuiz} staffPermissions={currentUser.role === 'staff' ? currentUser.data.batchAccess : undefined} onShowDevPopup={setShowDevPopup} />;
            case 'create-quiz':
            case 'edit-quiz':
                 // FIX: Explicitly specify generic type for `findSelected` to ensure correct type inference.
                 return <CreateQuizPage onBack={() => setPage('manage-quizzes')} onSave={handleSaveQuiz} batches={batches} quiz={pageParams.quizId ? findSelected<Quiz>(quizzes, pageParams.quizId as string) : undefined} staffPermissions={currentUser.role === 'staff' ? currentUser.data.batchAccess : undefined} />;
            case 'quiz-results':
                return selectedQuiz && <QuizResultsPage onBack={() => setPage('manage-quizzes')} quiz={selectedQuiz} submissions={quizSubmissions} students={students} />;
            case 'leave-manager':
                return <LeaveManagerPage onBack={() => setPage('dashboard')} leaveRequests={leaveRequests} students={students} staff={staff} currentUser={currentUser} batches={batches} onUpdateStatus={handleUpdateLeaveStatus} />;
            case 'todo-task':
                return <TodoTaskPage onBack={() => setPage('dashboard')} tasks={tasks} staff={staff} onSaveTask={handleSaveTask} onToggleTaskStatus={handleToggleTaskStatus} onDeleteTask={handleDeleteTask} isDemoMode={isDemoMode} />;
            case 'notice-board':
                 return <NoticeBoardPage onBack={() => setPage('dashboard')} notices={notices} onSaveNotice={handleSaveNotice} onDeleteNotice={handleDeleteNotice} isDemoMode={isDemoMode} academyId={academy!.id} />;
            case 'transport-options':
                return <TransportOptionsPage onBack={() => setPage('dashboard')} onCreate={() => setPage('new-transport-route')} routes={transportRoutes} onNavigate={(page, params) => { if(params?.routeId) setSelectedTransportRouteId(params.routeId); handleNavigate(page, params); }} onDelete={handleDeleteTransportRoute} />;
            case 'new-transport-route':
                return <NewTransportRoutePage onBack={() => setPage('transport-options')} onSave={(data) => handleSaveTransportRoute(data)} />;
            case 'edit-transport-route':
                return selectedTransportRoute && <EditTransportRoutePage onBack={() => setPage('transport-options')} onSave={(id, data) => handleSaveTransportRoute(data, id)} route={selectedTransportRoute} />;
            case 'map-students-to-route':
                return selectedTransportRoute && <MapStudentsToRoutePage onBack={() => setPage('transport-options')} route={selectedTransportRoute} students={students} onSave={handleMapStudentsToRoute} />;


            case 'my-account':
                if (currentUser.role === 'admin') return <MyAccountPage onBack={() => setPage('dashboard')} onLogout={handleLogout} academy={academy!} onSave={handleSaveAcademyDetails} />;
                return null;
            case 'notifications':
                 if (currentUser.role === 'admin') return <NotificationsPage onBack={() => setPage('dashboard')} enquiries={adminNewEnquiries} leaveRequests={adminPendingLeaves} unmarkedAttendanceBatches={adminUnmarkedAttendanceBatches} onNavigate={setPage} />;
                 return null;
            case 'staff-notifications':
                 if (currentUser.role === 'staff') return <StaffNotificationsPage onBack={() => setPage('dashboard')} pendingLeaves={staffPendingLeaves} onNavigate={setPage} />;
                 return null;
            
            // Student Pages
            case 'student-details':
                return selectedStudent && <StudentDetailsPage onBack={() => setPage('active-students')} student={selectedStudent} feeCollections={feeCollections} academyId={academy!.id} onSavePayment={handleSaveFeePayment} transportRoutes={transportRoutes} onShowImage={setImageToView} academy={academy!} />;
            case 'fee-status':
                if(student) return <StudentFeeStatusPage student={student} feeCollections={feeCollections} onBack={() => setPage('dashboard')} />
                return null;
            case 'my-academy':
                if(academy) return <MyAcademyPage academy={academy} onBack={() => setPage('dashboard')} />
                return null;
            case 'attendance':
                if(student) return <StudentAttendancePage student={student} academyId={academy!.id} onBack={() => setPage('dashboard')} />
                return null;
            case 'timetable':
                 if(student) return <StudentTimetablePage onBack={() => setPage('dashboard')} student={student} academyId={academy!.id} batches={batches} />;
                 return null;
            case 'student-exams':
                if(student) return <StudentExamsPage onBack={() => setPage('dashboard')} student={student} academyId={academy!.id} />;
                return null;
            case 'student-study-material':
                if(student) return <StudentStudyMaterialPage onBack={() => setPage('dashboard')} materials={studyMaterials} student={student} />;
                return null;
            case 'student-homework':
                if(student) return <StudentHomeworkPage onBack={() => setPage('dashboard')} homework={homework} student={student} academyId={academy!.id} batches={batches} isDemoMode={isDemoMode} />;
                return null;
            case 'student-quizzes':
                if(student) return <StudentQuizzesPage onBack={() => setPage('dashboard')} quizzes={quizzes} student={student} onNavigate={(page, params) => { if(params?.quizId) setSelectedQuizId(params.quizId); setPage(page); }} academyId={academy!.id} />;
                return null;
            case 'take-quiz':
                return (student && selectedQuiz) && <TakeQuizPage onBack={() => setPage('student-quizzes')} quiz={selectedQuiz} onSaveSubmission={handleSaveQuizSubmission} studentId={student.id} academyId={academy!.id} />;
            case 'quiz-result':
                return (student && selectedQuiz) && <QuizResultPage onBack={() => setPage('student-quizzes')} quiz={selectedQuiz} studentId={student.id} academyId={academy!.id} />;
            case 'my-leave':
                 return <MyLeavePage onBack={() => setPage('dashboard')} onNavigate={setPage} currentUser={currentUser} leaveRequests={leaveRequests} />;
            case 'apply-leave':
                return <ApplyLeavePage onBack={() => setPage('my-leave')} onSave={createDataHandler('leaveRequests')} currentUser={currentUser} academyId={academy!.id} isDemoMode={isDemoMode} />;
            case 'student-notice-board':
                 return <StudentNoticeBoardPage onBack={() => setPage('dashboard')} notices={notices} />;
            case 'student-transport':
                 if(student) return <StudentTransportPage student={student} transportRoutes={transportRoutes} onBack={() => setPage('dashboard')} />;
                 return null;

            // Staff pages
            case 'class-schedule':
                if (currentUser.role === 'staff') return <StaffSchedulePage onBack={() => setPage('dashboard')} staff={currentUser.data} academyId={academy!.id} />;
                return null;
            case 'staff-notice-board':
                 if (currentUser.role === 'staff') return <StaffNoticeBoardPage onBack={() => setPage('dashboard')} notices={notices} />;
                 return null;
            case 'staff-attendance':
                 if (currentUser.role === 'staff') return <StaffAttendancePage onBack={() => setPage('dashboard')} staff={currentUser.data} staffAttendance={staffAttendance} />;
                 return null;

            default:
                // Fallback to dashboard if page is not found or user role doesn't match
                // FIX: Calling setPage during render causes an infinite loop.
                // Render the dashboard directly as a fallback.
                if (currentUser.role === 'admin') return <Dashboard onNavigate={setPage} academy={academy!} students={students} batches={batches} staff={staff} transactions={transactions} onShowDevPopup={setShowDevPopup} />;
                if (currentUser.role === 'student') return <StudentDashboardPage student={currentUser.data} academy={academy!} feeCollections={feeCollections} batches={batches} onNavigate={setPage} onToggleNav={() => setIsNavOpen(true)} theme={theme} onToggleTheme={handleToggleTheme} onShowDevPopup={setShowDevPopup} />;
                if (currentUser.role === 'staff') return <StaffDashboardPage onNavigate={setPage} academy={academy!} staff={currentUser.data} onShowDevPopup={setShowDevPopup} />;
                return null;
        }
    };
    
    // Simplified render logic
    const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <div className={`min-h-screen font-sans ${theme} bg-gray-100 dark:bg-gray-900`}>
            {connectionError && <ConnectionErrorBanner message={connectionError} onClose={() => setConnectionError(null)} />}
            {isOffline && <OfflineIndicator />}
            
            {currentUser?.role === 'admin' && academy && (
                 <>
                     {page === 'dashboard' && <Header academy={academy} onLogout={handleLogout} onToggleNav={() => setIsNavOpen(true)} theme={theme} onToggleTheme={handleToggleTheme} onNavigate={setPage} notificationCount={notificationCount} />}
                     <SideNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} onNavigate={setPage} onLogout={handleLogout} onShowDevPopup={setShowDevPopup} />
                     <main>{children}</main>
                     <BottomNav onNavigate={setPage} activePage={page} onOpenChatbot={() => setIsChatbotOpen(true)} />
                 </>
            )}
            
            {currentUser?.role === 'student' && academy && (
                <>
                    <StudentSideNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} onNavigate={setPage} onLogout={handleLogout} />
                    <main>{children}</main>
                </>
            )}

            {currentUser?.role === 'staff' && academy && (
                <>
                    {page === 'dashboard' && <StaffHeader staffName={currentUser.data.name} academyName={academy.name} onLogout={handleLogout} onToggleNav={() => setIsNavOpen(true)} theme={theme} onToggleTheme={handleToggleTheme} onNavigate={setPage} notificationCount={notificationCount} />}
                    <StaffSideNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} onNavigate={setPage} onLogout={handleLogout} staff={currentUser.data} onShowDevPopup={setShowDevPopup} />
                    <main>{children}</main>
                </>
            )}

            {showConsent && <DataConsentModal onAccept={() => { localStorage.setItem('dataConsentAccepted', 'true'); setShowConsent(false); }} />}
            {showDevPopup && <DevInProgressPopup featureName={showDevPopup} onClose={() => setShowDevPopup(null)} />}
            {imageToView && <FullScreenImageViewer src={imageToView} alt="Full screen view" onClose={() => setImageToView(null)} />}
             {isChatbotOpen && academy && (
                <AIChatbot
                    isOpen={isChatbotOpen}
                    onClose={() => setIsChatbotOpen(false)}
                    onNavigate={(page: string) => {
                        handleNavigate(page);
                        setIsChatbotOpen(false);
                    }}
                    students={students}
                    feeCollections={feeCollections}
                    batches={batches}
                    academyId={academy.id}
                />
            )}
        </div>
    );

    return <MainLayout>{renderPage()}</MainLayout>;
}