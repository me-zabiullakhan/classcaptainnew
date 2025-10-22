


import React from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from '@google/genai';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { BottomNav } from './components/BottomNav';
import { BatchesPage } from './components/BatchesPage';
import { NewBatchPage } from './components/NewBatchPage';
import { StudentOptionsPage } from './components/StudentOptionsPage';
import { FeesOptionsPage } from './components/FeesOptionsPage';
import { NewStudentPage } from './components/NewStudentPage';
import { SelectBatchForAttendancePage } from './components/SelectBatchForAttendancePage';
import { TakeAttendancePage } from './components/TakeAttendancePage';
import type { Batch, Student, CurrentUser, Academy, FeeCollection, Staff, BatchAccessPermissions } from './types';
import { ActiveStudentsPage } from './components/ActiveStudentsPage';
import { InactiveStudentsPage } from './components/InactiveStudentsPage';
import { BirthdayListPage } from './components/BirthdayListPage';
import { RegistrationFormListPage } from './components/RegistrationFormListPage';
import { RegistrationFormViewPage } from './components/RegistrationFormViewPage';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { MyAccountPage } from './components/MyAccountPage';
import { auth, db, firebaseConfig } from './firebaseConfig';
// FIX: Import FirestoreError to explicitly type the error object from onSnapshot.
import { collection, addDoc, onSnapshot, query, where, doc, runTransaction, increment, Timestamp, updateDoc, getDoc, getDocs, FirestoreError, documentId } from 'firebase/firestore';
import type firebase from 'firebase/compat/app';
import { SplashScreen } from './components/SplashScreen';
import { ConnectionErrorBanner } from './components/ConnectionErrorBanner';
import { OfflineIndicator } from './components/OfflineIndicator';
import { DataConsentModal } from './components/DataConsentModal';
import { SideNav } from './components/SideNav';
import { demoBatches, demoStudents, demoStaff } from './demoData';
import { EditStudentPage } from './components/EditStudentPage';
import { SelectBatchForFeesPage } from './components/SelectBatchForFeesPage';
import { SelectStudentForFeesPage } from './components/SelectStudentForFeesPage';
import { StudentFeeDetailsPage } from './components/StudentFeeDetailsPage';
import { FeeDuesListPage } from './components/FeeDuesListPage';
import { FeeCollectionReportPage } from './components/FeeCollectionReportPage';
import { StudentDashboardPage } from './components/student/StudentDashboardPage';
import { StudentFeeStatusPage } from './components/student/StudentFeeStatusPage';
import { StudentSideNav } from './components/student/StudentSideNav';
import { MyAcademyPage } from './components/student/MyAcademyPage';
import { StudentAttendancePage } from './components/student/StudentAttendancePage';
import { XMarkIcon } from './components/icons/XMarkIcon';
import { ChatbotIcon, SendIcon } from './components/icons/CentralIcon';
import { StaffManagerPage } from './components/StaffManagerPage';
import { NewStaffPage } from './components/NewStaffPage';
import { StaffDashboardPage } from './components/staff/StaffDashboardPage';
import { StaffSideNav } from './components/staff/StaffSideNav';
import { StaffHeader } from './components/staff/StaffHeader';
import { StaffBatchAccessPage } from './components/StaffBatchAccessPage';
import { WrenchIcon } from './components/icons/WrenchIcon';
import { SettingsPage } from './components/SettingsPage';
import { CustomSmsSettingsPage } from './components/CustomSmsSettingsPage';
import { SuperAdminPanel } from './components/SuperAdminPanel';
import { EditBatchPage } from './components/EditBatchPage';
import { StaffOptionsPage } from './components/StaffOptionsPage';
import { InactiveStaffPage } from './components/InactiveStaffPage';

type Message = {
    text: string;
    sender: 'user' | 'bot';
};

function Chatbot(): React.ReactNode {
    const [isOpen, setIsOpen] = React.useState(false);
    const [messages, setMessages] = React.useState<Message[]>([
        { sender: 'bot', text: "Hi! I'm CANDY, your friendly assistant. How can I help you today?" }
    ]);
    const [inputValue, setInputValue] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [chat, setChat] = React.useState<Chat | null>(null);

    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    React.useEffect(() => {
        if (isOpen && !chat) {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
                const newChat = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: "You are CANDY, a friendly and helpful assistant for the Class Captain institute management app. Keep your answers concise, cheerful, and relevant to managing a school or institute. Your name is CANDY.",
                    },
                });
                setChat(newChat);
            } catch (error) {
                console.error("Failed to initialize Gemini AI:", error);
                setMessages(prev => [...prev, { sender: 'bot', text: "Sorry, I'm having trouble connecting right now. Please configure the API Key or try again later." }]);
            }
        }
    }, [isOpen, chat]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage: Message = { sender: 'user', text: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);
        
        if (!chat) {
            setMessages(prev => [...prev, { sender: 'bot', text: "Chat session not initialized. This could be due to a missing API key. Please check the configuration and try again." }]);
            setIsLoading(false);
            return;
        }

        try {
            const response: GenerateContentResponse = await chat.sendMessage({ message: userMessage.text });
            const botMessage: Message = { sender: 'bot', text: response.text };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Gemini API error:", error);
            setMessages(prev => [...prev, { sender: 'bot', text: "Oops! Something went wrong. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-20 right-4 bg-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 z-40 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
                aria-label="Open Chatbot"
            >
                <ChatbotIcon className="w-8 h-8" />
            </button>

            {isOpen && (
                <div className="fixed bottom-4 right-4 w-full max-w-sm h-[60vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col z-50 animate-fade-in-up">
                    <header className="bg-indigo-700 text-white p-4 rounded-t-2xl flex justify-between items-center">
                        <h2 className="font-bold text-lg">CANDY</h2>
                        <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-indigo-800 transition-colors">
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </header>

                    <main className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-700">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-xl ${msg.sender === 'user' ? 'bg-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100'}`}>
                                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="max-w-[80%] p-3 rounded-xl bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </main>

                    <footer className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-2xl">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Ask CANDY anything..."
                                className="w-full bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-800 dark:text-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={isLoading || !inputValue.trim()}
                                className="bg-indigo-600 text-white rounded-full p-3 flex-shrink-0 hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors"
                                aria-label="Send message"
                            >
                                <SendIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </footer>
                </div>
            )}
        </>
    );
}

function DevelopmentPopup({ featureName, onClose }: { featureName: string; onClose: () => void; }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in p-4" role="dialog" aria-modal="true" aria-labelledby="dev-popup-title">
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg max-w-sm mx-auto text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-amber-100 dark:bg-amber-900/40 mb-5">
                    <WrenchIcon className="h-9 w-9 text-amber-600 dark:text-amber-400" />
                </div>
                <h2 id="dev-popup-title" className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Feature Under Development</h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
                    The "<b>{featureName}</b>" feature is currently being built and will be available soon. Thank you for your patience!
                </p>
                <button 
                    onClick={onClose}
                    className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Got it!
                </button>
            </div>
        </div>
    );
}

function App(): React.ReactNode {
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState<CurrentUser | null>(null);
  const [currentPage, setCurrentPage] = React.useState('dashboard');
  const [batches, setBatches] = React.useState<Batch[]>([]);
  const [students, setStudents] = React.useState<Student[]>([]);
  const [staff, setStaff] = React.useState<Staff[]>([]);
  const [feeCollections, setFeeCollections] = React.useState<FeeCollection[]>([]);
  const [selectedBatchId, setSelectedBatchId] = React.useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = React.useState<string | null>(null);
  const [selectedStaffId, setSelectedStaffId] = React.useState<string | null>(null);
  const [initialStudentFilter, setInitialStudentFilter] = React.useState('all');
  const [authError, setAuthError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [connectionError, setConnectionError] = React.useState<string | null>(null);
  const [isOffline, setIsOffline] = React.useState(!navigator.onLine);
  const [showConsent, setShowConsent] = React.useState(() => !localStorage.getItem('dataConsentGiven'));
  const [isSideNavOpen, setIsSideNavOpen] = React.useState(false);
  const [theme, setTheme] = React.useState<'light' | 'dark'>(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });
  const [isDemoMode, setIsDemoMode] = React.useState(false);
  const [showDevPopup, setShowDevPopup] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  React.useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const createAcademyInFirestore = async (user: firebase.User, instituteName: string): Promise<Academy> => {
        return await runTransaction(db, async (transaction) => {
            const counterRef = doc(db, 'counters', 'academyCounter');
            const counterDoc = await transaction.get(counterRef);
            
            const lastId = counterDoc.exists() ? counterDoc.data().lastId : 0;
            const newIdNumber = lastId + 1;
            const formattedId = `AC${String(newIdNumber).padStart(4, '0')}`;
            
            const newAcademyRef = doc(collection(db, 'academies'));
            
            const academyDataForFirestore = {
                name: instituteName,
                adminEmail: user.email!,
                adminUid: user.uid,
                createdAt: new Date(),
                status: 'active' as const,
                academyId: formattedId,
            };
            transaction.set(newAcademyRef, academyDataForFirestore);
            
            transaction.set(counterRef, { lastId: newIdNumber }, { merge: !counterDoc.exists() });

            return {
                id: newAcademyRef.id,
                academyId: formattedId,
                name: instituteName,
                adminEmail: user.email!,
                adminUid: user.uid,
                status: 'active' as const,
            };
        });
    };

  React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const isGoogleRegFlow = sessionStorage.getItem('google_reg_flow') === 'true';
                    let academyData: Academy | null = null;
                    
                    const q = query(collection(db, "academies"), where("adminUid", "==", user.uid));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        const academyDoc = querySnapshot.docs[0];
                        academyData = { id: academyDoc.id, ...academyDoc.data() } as Academy;
                    } else if (isGoogleRegFlow && user.email) {
                        const instituteName = sessionStorage.getItem('google_reg_institute_name');
                        if (instituteName) {
                            console.log("Creating new academy via Google flow...");
                            academyData = await createAcademyInFirestore(user, instituteName);
                        } else {
                            throw new Error("Institute name not found during Google registration flow.");
                        }
                    }

                    if (academyData) {
                        setCurrentUser({
                            role: 'admin',
                            data: academyData,
                        });
                    } else {
                        // User is authenticated but has no academy record and is not in reg flow
                        setAuthError("No academy found for this account. Please register your academy.");
                        auth.signOut();
                        setCurrentUser(null);
                    }
                } catch (error) {
                    console.error("Auth State Change Error:", error);
                    setAuthError("An error occurred. Please try logging in again.");
                    auth.signOut();
                    setCurrentUser(null);
                } finally {
                    sessionStorage.removeItem('google_reg_flow');
                    sessionStorage.removeItem('google_reg_institute_name');
                    setIsLoading(false);
                }
            } else {
                setCurrentUser(null);
                setIsLoading(false);
            }
        });

        // Handle Google sign-in redirect result
        auth.getRedirectResult().catch(error => {
            console.error("Google Redirect Result Error:", error);
            setAuthError(error.message || "Failed to sign in with Google.");
        });

        return () => unsubscribe();
    }, []);

    const handleLogin = (user: CurrentUser) => {
        if (user.role === 'admin' && user.data.id === 'demo-academy-id') {
            setIsDemoMode(true);
        }
        if (user.role === 'student' && user.academyId === 'ACDEMO') {
            setIsDemoMode(true);
        }
        if (user.role === 'staff' && user.academyId === 'ACDEMO') {
             setIsDemoMode(true);
        }
        setCurrentUser(user);
    };

    const handleRegisterSuccess = (academy: Academy) => {
        handleLogin({
            role: 'admin',
            data: academy,
        });
    };

    const handleLogout = () => {
        if (currentUser?.role === 'superadmin') {
            setCurrentUser(null);
        } else {
            auth.signOut();
            setCurrentUser(null);
        }
        setBatches([]);
        setStudents([]);
        setStaff([]);
        setFeeCollections([]);
        setCurrentPage('dashboard');
        setIsDemoMode(false);
    };

    const academyId = currentUser?.role === 'admin' ? currentUser.data.id :
                      currentUser?.role === 'student' ? currentUser.academyId :
                      currentUser?.role === 'staff' ? currentUser.academyId : null;
    
    // Data fetching effect
    React.useEffect(() => {
        if (!academyId) {
            setDataLoaded(true);
            return;
        }

        if (isDemoMode) {
            setBatches(demoBatches);
            setStudents(demoStudents);
            setStaff(demoStaff);
            setDataLoaded(true);
            return;
        }

        setDataLoaded(false);
        const unsubscribers: (() => void)[] = [];
        const commonErrorHandler = (name: string) => (error: FirestoreError) => {
            console.error(`Error fetching ${name}:`, error);
            if (error.code === 'unavailable') {
                setConnectionError("Data sync failed. You seem to be offline.");
            } else if (error.code === 'permission-denied') {
                setConnectionError(`Permission denied to fetch ${name}. Check your app's security rules.`);
            } else {
                setConnectionError(`Failed to load ${name}. Please try again.`);
            }
        };

        if (currentUser?.role === 'admin') {
            const collectionsToFetch = [
                { name: 'batches', setter: setBatches },
                { name: 'students', setter: setStudents },
                { name: 'staff', setter: setStaff },
                { name: 'feeCollections', setter: setFeeCollections },
            ];
            collectionsToFetch.forEach(({ name, setter }) => {
                const q = query(collection(db, `academies/${academyId}/${name}`));
                const unsub = onSnapshot(q, 
                    (snapshot) => {
                        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                        setter(items as any);
                        setConnectionError(null);
                    },
                    commonErrorHandler(name)
                );
                unsubscribers.push(unsub);
            });
        } else if (currentUser?.role === 'student') {
            setStudents([currentUser.data]); // Only this student is relevant
            
            // Fetch only this student's fee collections
            const feeQuery = query(
                collection(db, `academies/${academyId}/feeCollections`),
                where('studentId', '==', currentUser.data.id)
            );
            const feeUnsub = onSnapshot(feeQuery, (snapshot) => {
                const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setFeeCollections(items as FeeCollection[]);
                setConnectionError(null);
            }, commonErrorHandler('your fee data'));
            unsubscribers.push(feeUnsub);

        } else if (currentUser?.role === 'staff') {
            const accessibleBatchIds = Object.keys(currentUser.data.batchAccess || {});
            if (accessibleBatchIds.length > 0) {
                // Fetch accessible batches
                const batchQuery = query(
                    collection(db, `academies/${academyId}/batches`),
                    where(documentId(), 'in', accessibleBatchIds)
                );
                const batchUnsub = onSnapshot(batchQuery, (snapshot) => {
                    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setBatches(items as Batch[]);
                    setConnectionError(null);

                    // Then, fetch students from these batches
                    const accessibleBatchNames = (items as Batch[]).map(b => b.name);
                    if (accessibleBatchNames.length > 0) {
                        const studentQuery = query(
                            collection(db, `academies/${academyId}/students`),
                            where('batches', 'array-contains-any', accessibleBatchNames)
                        );
                        const studentUnsub = onSnapshot(studentQuery, (studentSnapshot) => {
                            const studentItems = studentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                            setStudents(studentItems as Student[]);
                        }, commonErrorHandler('students'));
                        unsubscribers.push(studentUnsub);
                    } else {
                        setStudents([]);
                    }
                }, commonErrorHandler('batches'));
                unsubscribers.push(batchUnsub);
            } else {
                setBatches([]);
                setStudents([]);
            }
        }

        setDataLoaded(true);
        return () => {
            unsubscribers.forEach(unsub => unsub());
        };
    }, [currentUser, academyId, isDemoMode]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setIsSideNavOpen(false);
  };
  
  // Handlers
  const handleCreateBatch = async (batchData: Omit<Batch, 'id' | 'currentStudents' | 'isActive'>) => {
    if (isDemoMode) {
        const newBatch = { ...batchData, id: `demo-batch-${Date.now()}`, currentStudents: 0, isActive: true };
        setBatches(prev => [...prev, newBatch]);
        setCurrentPage('batches');
        return;
    }
    if (!academyId) return;
    try {
        await addDoc(collection(db, `academies/${academyId}/batches`), {
            ...batchData,
            currentStudents: 0,
            isActive: true
        });
        setCurrentPage('batches');
    } catch (error) {
        console.error("Error adding batch: ", error);
        alert("Failed to create batch. Please check your connection and try again.");
    }
  };

  const handleUpdateBatch = async (batchId: string, batchData: Omit<Batch, 'id' | 'currentStudents'>) => {
    if (isDemoMode) {
      setBatches(prev => prev.map(b => b.id === batchId ? { ...b, ...batchData, id: b.id, currentStudents: b.currentStudents } : b));
      setCurrentPage('batches');
      return;
    }
    if (!academyId) return;
    try {
      const batchRef = doc(db, `academies/${academyId}/batches`, batchId);
      await updateDoc(batchRef, batchData);
      setCurrentPage('batches');
    } catch (error) {
      console.error("Error updating batch: ", error);
      alert("Failed to update batch. Please check your connection and try again.");
    }
  };

  const handleCreateStudent = async (studentData: Omit<Student, 'id' | 'isActive' | 'rollNumber'>): Promise<Student | void> => {
    if (isDemoMode) {
        const nextId = students.length + 1;
        const newRollNumber = `STU${String(nextId).padStart(4, '0')}`;
        const newStudent: Student = { ...studentData, rollNumber: newRollNumber, id: `demo-student-${Date.now()}`, isActive: true };
        setStudents(prev => [...prev, newStudent]);
        return newStudent;
    }
    if (!academyId) return;
    try {
        const newStudent = await runTransaction(db, async (transaction) => {
            const counterRef = doc(db, `academies/${academyId}/counters`, 'studentCounter');
            const counterDoc = await transaction.get(counterRef);

            const lastId = counterDoc.exists() ? counterDoc.data().lastId : 0;
            const newIdNumber = lastId + 1;
            const formattedId = `STU${String(newIdNumber).padStart(4, '0')}`;

            const newStudentRef = doc(collection(db, `academies/${academyId}/students`));

            const fullStudentData: Student = {
                ...studentData,
                id: newStudentRef.id,
                rollNumber: formattedId,
                isActive: true
            };

            transaction.set(newStudentRef, {
                ...studentData,
                rollNumber: formattedId,
                isActive: true
            });
            
            transaction.set(counterRef, { lastId: newIdNumber }, { merge: !counterDoc.exists() });

            // Increment student count in batches
            studentData.batches.forEach(batchName => {
                const batchToUpdate = batches.find(b => b.name === batchName);
                if (batchToUpdate) {
                    const batchRef = doc(db, `academies/${academyId}/batches`, batchToUpdate.id);
                    transaction.update(batchRef, { currentStudents: increment(1) });
                }
            });
            return fullStudentData;
        });
        return newStudent;
    } catch (error) {
        console.error("Error adding student: ", error);
        alert("Failed to create student. Please check your connection and try again.");
    }
  };
  
  const handleUpdateStudent = async (studentData: Omit<Student, 'id' | 'isActive'>) => {
    if (isDemoMode) {
        setStudents(prev => prev.map(s => s.id === selectedStudentId ? { ...s, ...studentData, id: s.id, isActive: s.isActive } : s));
        setCurrentPage('active-students');
        return;
    }
    if (!academyId || !selectedStudentId) return;
    try {
        await runTransaction(db, async (transaction) => {
            const studentRef = doc(db, `academies/${academyId}/students`, selectedStudentId);
            const studentDoc = await transaction.get(studentRef);
            if (!studentDoc.exists()) {
                throw new Error("Student not found!");
            }
            const oldStudentData = studentDoc.data() as Student;

            // Only update batch counts if the student is currently active
            if (oldStudentData.isActive) {
                const oldBatches = new Set(oldStudentData.batches || []);
                const newBatches = new Set(studentData.batches || []);

                const batchesToRemoveFrom = [...oldBatches].filter(b => !newBatches.has(b));
                const batchesToAddTo = [...newBatches].filter(b => !oldBatches.has(b));
                
                batchesToRemoveFrom.forEach(batchName => {
                    const batchToUpdate = batches.find(b => b.name === batchName);
                    if (batchToUpdate) {
                        const batchRef = doc(db, `academies/${academyId}/batches`, batchToUpdate.id);
                        transaction.update(batchRef, { currentStudents: increment(-1) });
                    }
                });

                batchesToAddTo.forEach(batchName => {
                    const batchToUpdate = batches.find(b => b.name === batchName);
                    if (batchToUpdate) {
                        const batchRef = doc(db, `academies/${academyId}/batches`, batchToUpdate.id);
                        transaction.update(batchRef, { currentStudents: increment(1) });
                    }
                });
            }
            
            transaction.update(studentRef, studentData);
        });
        setCurrentPage('active-students');
    } catch (error) {
        console.error("Error updating student: ", error);
        alert("Failed to update student. Please check your connection and try again.");
    }
  }

  const handleCreateStaff = async (staffData: Omit<Staff, 'id'>) => {
    if (isDemoMode) {
        const newStaff = { ...staffData, id: `demo-staff-${Date.now()}` };
        setStaff(prev => [...prev, newStaff]);
        setCurrentPage('staff-manager');
        return;
    }
    if (!academyId) return;
    try {
        await addDoc(collection(db, `academies/${academyId}/staff`), staffData);
        setCurrentPage('staff-manager');
    } catch (error) {
        console.error("Error adding staff: ", error);
        alert("Failed to add staff member. Please try again.");
    }
  };

  const handleSavePayment = async (paymentData: Omit<FeeCollection, 'id'>) => {
    if (isDemoMode) {
        alert("DEMO MODE: Payment would be saved here.");
        const newPayment = {
            ...paymentData,
            id: `demo-fee-${Date.now()}`,
            paymentDate: Timestamp.fromDate(new Date(paymentData.paymentDate as unknown as string)),
            createdAt: Timestamp.now()
        };
        setFeeCollections(prev => [...prev, newPayment]);
        return;
    }
    if (!academyId) return;
    try {
        const dataToSave = {
            ...paymentData,
            paymentDate: Timestamp.fromDate(new Date(paymentData.paymentDate as unknown as string)),
            createdAt: Timestamp.now()
        };
        await addDoc(collection(db, `academies/${academyId}/feeCollections`), dataToSave);
    } catch (error) {
        console.error("Error saving payment: ", error);
        alert("Failed to save payment. Please check your connection.");
        throw error;
    }
  };

  const handleToggleStudentStatus = async (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    if (isDemoMode) {
        setStudents(prev => prev.map(s => s.id === studentId ? {...s, isActive: !s.isActive} : s));
        return;
    }

    if (!academyId) return;
    
    const studentRef = doc(db, `academies/${academyId}/students`, studentId);
    const newStatus = !student.isActive;
    const incrementValue = newStatus ? 1 : -1;

    try {
        await runTransaction(db, async (transaction) => {
            transaction.update(studentRef, { isActive: newStatus });
            
            student.batches.forEach(batchName => {
                const batchToUpdate = batches.find(b => b.name === batchName);
                if (batchToUpdate) {
                    const batchRef = doc(db, `academies/${academyId}/batches`, batchToUpdate.id);
                    // Prevent negative counts
                    const currentStudents = batchToUpdate.currentStudents || 0;
                    if (incrementValue === -1 && currentStudents <= 0) {
                        return;
                    }
                    transaction.update(batchRef, { currentStudents: increment(incrementValue) });
                }
            });
        });
    } catch (error) {
        console.error("Error toggling student status: ", error);
        alert("Failed to update student status.");
    }
  };

  const handleToggleStaffStatus = async (staffId: string) => {
    const staffMember = staff.find(s => s.id === staffId);
    if (!staffMember) return;

    if (isDemoMode) {
        setStaff(prev => prev.map(s => s.id === staffId ? {...s, isActive: !s.isActive} : s));
        return;
    }

    if (!academyId) return;
    
    const staffRef = doc(db, `academies/${academyId}/staff`, staffId);
    const newStatus = !staffMember.isActive;

    try {
        await updateDoc(staffRef, { isActive: newStatus });
    } catch (error) {
        console.error("Error toggling staff status: ", error);
        alert("Failed to update staff status.");
    }
  };

  const handleUpdateAcademyDetails = async (details: Partial<Academy>) => {
    if (isDemoMode) {
        alert("DEMO MODE: Details would be saved here.");
        if (currentUser?.role === 'admin') {
            const updatedAcademy = { ...currentUser.data, ...details };
            setCurrentUser({ ...currentUser, data: updatedAcademy });
        }
        return;
    }
    if (!academyId) return;
    try {
        const academyRef = doc(db, 'academies', academyId);
        await updateDoc(academyRef, details);
    } catch (error) {
        console.error("Error updating academy details:", error);
        alert("Failed to save details. Please check your connection.");
        throw error;
    }
  };

  const handleSaveStaffAccess = async (staffId: string, batchAccess: { [batchId: string]: BatchAccessPermissions }) => {
    if (isDemoMode) {
        setStaff(prev => prev.map(s => s.id === staffId ? { ...s, batchAccess } : s));
        setCurrentPage('staff-manager');
        return;
    }
    if (!academyId) return;
    try {
        const staffRef = doc(db, `academies/${academyId}/staff`, staffId);
        await updateDoc(staffRef, { batchAccess });
        setCurrentPage('staff-manager');
    } catch (error) {
        console.error("Error updating staff access: ", error);
        alert("Failed to save permissions. Please try again.");
    }
  };

  // Navigation helpers
  const navigateToNewBatch = () => setCurrentPage('new-batch');
  const navigateToNewStudent = () => setCurrentPage('new-student');
  const navigateToNewStaff = () => setCurrentPage('new-staff');
  const navigateToDashboard = () => setCurrentPage('dashboard');
  const navigateToBatches = () => setCurrentPage('batches');
  const navigateToStudentOptions = () => setCurrentPage('student-options');
  const navigateToFeesOptions = () => setCurrentPage('fees-options');
  const navigateToSelectBatchForAttendance = () => setCurrentPage('select-batch-attendance');
  const navigateToStaffOptions = () => setCurrentPage('staff-options');
  const navigateToSettings = () => setCurrentPage('settings');

  const navigateToTakeAttendance = (batchId: string) => {
    setSelectedBatchId(batchId);
    setCurrentPage('take-attendance');
  };
  
  const navigateToActiveStudentsFromBatch = (batchName: string) => {
    setInitialStudentFilter(batchName);
    setCurrentPage('active-students');
  };
  
  const navigateToEditStudent = (studentId: string) => {
      setSelectedStudentId(studentId);
      setCurrentPage('edit-student');
  };

  const navigateToEditBatch = (batchId: string) => {
    setSelectedBatchId(batchId);
    setCurrentPage('edit-batch');
  };
  
  const navigateToSelectBatchForFees = () => {
      setCurrentPage('select-batch-for-fees');
  };
  
  const navigateToSelectStudentForFees = (batchId: string) => {
      setSelectedBatchId(batchId);
      setCurrentPage('select-student-for-fees');
  };
  
  const navigateToStudentFeeDetails = (studentId: string) => {
      setSelectedStudentId(studentId);
      setCurrentPage('student-fee-details');
  };
  
  const navigateToViewStudentForm = (studentId: string) => {
      setSelectedStudentId(studentId);
      setCurrentPage('registration-form-view');
  };

  const navigateToStaffAccess = (staffId: string) => {
      setSelectedStaffId(staffId);
      setCurrentPage('staff-batch-access');
  };

  const renderContent = () => {
    if (showConsent) {
      return <DataConsentModal onAccept={() => {
        localStorage.setItem('dataConsentGiven', 'true');
        setShowConsent(false);
      }} />;
    }
    
    if (isLoading || !dataLoaded) {
      return <SplashScreen />;
    }

    if (!currentUser) {
        if (currentPage === 'register') {
            return <RegisterPage onRegisterSuccess={handleRegisterSuccess} onNavigateToLogin={() => setCurrentPage('login')} />;
        }
        return <LoginPage onLogin={handleLogin} onNavigateToRegister={() => setCurrentPage('register')} externalError={authError} clearExternalError={() => setAuthError(null)} />;
    }

    if (currentUser.role === 'superadmin') {
      return <SuperAdminPanel onLogout={handleLogout} />;
    }

    const academy = (currentUser.role === 'admin') 
      ? currentUser.data 
      : (currentUser.role === 'student')
        ? { id: currentUser.academyId, name: currentUser.academyName, academyId: '' } as Academy
        : (currentUser.role === 'staff')
          ? { id: currentUser.academyId, name: 'Staff View', academyId: '' } as Academy // Simplified for staff view
          : null;
          
    if (!academy) {
        return <SplashScreen />; // Or an error page
    }

    // STUDENT VIEW
    if (currentUser.role === 'student') {
        const student = currentUser.data;
        
        const studentScreens: { [key: string]: React.ReactNode } = {
          'dashboard': <StudentDashboardPage student={student} academy={academy} onNavigate={handleNavigate} onToggleNav={() => setIsSideNavOpen(true)} theme={theme} onToggleTheme={toggleTheme} onShowDevPopup={setShowDevPopup} />,
          'fee-status': <StudentFeeStatusPage student={student} feeCollections={feeCollections.filter(fc => fc.studentId === student.id)} onBack={navigateToDashboard} />,
          'my-academy': <MyAcademyPage academy={academy} onBack={navigateToDashboard} />,
          'attendance': <StudentAttendancePage student={student} academyId={academyId!} onBack={navigateToDashboard} />,
        };

        return (
            <div className="md:max-w-lg md:mx-auto md:shadow-2xl">
                {studentScreens[currentPage] || studentScreens['dashboard']}
                <StudentSideNav isOpen={isSideNavOpen} onClose={() => setIsSideNavOpen(false)} onNavigate={handleNavigate} onLogout={handleLogout} />
            </div>
        );
    }

    // STAFF VIEW
    if (currentUser.role === 'staff') {
      const staffMember = currentUser.data;
      const staffAcademy = { id: currentUser.academyId, name: "Academy", academyId: "Loading..." }
      
      const selectedBatchForAttendance = batches.find(b => b.id === selectedBatchId);
      const studentsForAttendance = selectedBatchForAttendance ? students.filter(s => s.batches.includes(selectedBatchForAttendance.name) && s.isActive) : [];
      
      const staffScreens: { [key: string]: React.ReactNode } = {
        'dashboard': <StaffDashboardPage onNavigate={handleNavigate} academy={academy} staff={staffMember} onShowDevPopup={setShowDevPopup} />,
        'active-students': <ActiveStudentsPage onBack={navigateToDashboard} students={students} batches={batches} onToggleStudentStatus={handleToggleStudentStatus} onEditStudent={navigateToEditStudent} onViewStudent={navigateToViewStudentForm} staffPermissions={staffMember.batchAccess} />,
        'select-batch-attendance': <SelectBatchForAttendancePage onBack={navigateToDashboard} batches={batches} onSelectBatch={navigateToTakeAttendance} />,
        'take-attendance': selectedBatchForAttendance ? <TakeAttendancePage onBack={navigateToSelectBatchForAttendance} batch={selectedBatchForAttendance} students={studentsForAttendance} academyId={academyId!} isDemoMode={isDemoMode} /> : null,
        'fees-options': <FeesOptionsPage onBack={navigateToDashboard} onNavigate={setCurrentPage} />,
        'select-batch-for-fees': <SelectBatchForFeesPage onBack={navigateToFeesOptions} batches={batches} onSelectBatch={navigateToSelectStudentForFees} />,
      };
      
      return (
        <div className="md:max-w-lg md:mx-auto md:shadow-2xl">
          {currentPage === 'dashboard' && (
            <StaffHeader staffName={staffMember.name} academyName={academy.name} onLogout={handleLogout} onToggleNav={() => setIsSideNavOpen(true)} theme={theme} onToggleTheme={toggleTheme} />
          )}
          {staffScreens[currentPage] || staffScreens['dashboard']}
          <StaffSideNav isOpen={isSideNavOpen} onClose={() => setIsSideNavOpen(false)} onNavigate={handleNavigate} onLogout={handleLogout} staff={staffMember} onShowDevPopup={setShowDevPopup} />
        </div>
      );
    }
    

    // ADMIN VIEW
    const selectedBatch = batches.find(b => b.id === selectedBatchId);
    const selectedStudent = students.find(s => s.id === selectedStudentId);
    const selectedStaff = staff.find(s => s.id === selectedStaffId);
    const studentsInSelectedBatch = selectedBatch ? students.filter(s => s.batches.includes(selectedBatch.name) && s.isActive) : [];

    const adminScreens: { [key: string]: React.ReactNode } = {
        'dashboard': <Dashboard onNavigate={handleNavigate} academy={academy} students={students} batches={batches} staff={staff} onShowDevPopup={setShowDevPopup} />,
        'batches': <BatchesPage onBack={navigateToDashboard} onCreate={navigateToNewBatch} batches={batches} onViewStudents={navigateToActiveStudentsFromBatch} onEditBatch={navigateToEditBatch} />,
        'new-batch': <NewBatchPage onBack={navigateToBatches} onSave={handleCreateBatch} />,
        'edit-batch': selectedBatch ? <EditBatchPage onBack={navigateToBatches} onSave={handleUpdateBatch} batch={selectedBatch} /> : null,
        'student-options': <StudentOptionsPage onBack={navigateToDashboard} onNavigate={setCurrentPage} onShowDevPopup={setShowDevPopup} />,
        'fees-options': <FeesOptionsPage onBack={navigateToDashboard} onNavigate={setCurrentPage} />,
        'new-student': <NewStudentPage onBack={navigateToStudentOptions} onSave={handleCreateStudent} batches={batches} academyId={academy?.academyId || ''} />,
        'select-batch-attendance': <SelectBatchForAttendancePage onBack={navigateToDashboard} batches={batches} onSelectBatch={navigateToTakeAttendance} />,
        'take-attendance': selectedBatch ? <TakeAttendancePage onBack={navigateToSelectBatchForAttendance} batch={selectedBatch} students={studentsInSelectedBatch} academyId={academyId!} isDemoMode={isDemoMode} /> : null,
        'active-students': <ActiveStudentsPage onBack={navigateToStudentOptions} students={students} batches={batches} onToggleStudentStatus={handleToggleStudentStatus} onEditStudent={navigateToEditStudent} onViewStudent={navigateToViewStudentForm} initialFilter={initialStudentFilter} />,
        'inactive-students': <InactiveStudentsPage onBack={navigateToStudentOptions} students={students} batches={batches} onToggleStudentStatus={handleToggleStudentStatus} />,
        'birthday-list': <BirthdayListPage onBack={navigateToStudentOptions} students={students} />,
        'registration-form-list': <RegistrationFormListPage onBack={navigateToStudentOptions} students={students} onSelectStudent={navigateToViewStudentForm} />,
        'registration-form-view': selectedStudent ? <RegistrationFormViewPage onBack={() => setCurrentPage('registration-form-list')} student={selectedStudent} /> : null,
        'edit-student': selectedStudent ? <EditStudentPage onBack={() => setCurrentPage('active-students')} onUpdate={handleUpdateStudent} student={selectedStudent} batches={batches} /> : null,
        'my-account': <MyAccountPage onBack={navigateToDashboard} onSave={handleUpdateAcademyDetails} academy={academy} onLogout={handleLogout} />,
        'select-batch-for-fees': <SelectBatchForFeesPage onBack={navigateToFeesOptions} batches={batches} onSelectBatch={navigateToSelectStudentForFees} />,
        'select-student-for-fees': selectedBatch ? <SelectStudentForFeesPage onBack={navigateToSelectBatchForFees} batch={selectedBatch} students={studentsInSelectedBatch} onSelectStudent={navigateToStudentFeeDetails} /> : null,
        'student-fee-details': selectedStudent ? <StudentFeeDetailsPage onBack={() => setCurrentPage('select-student-for-fees')} student={selectedStudent} feeCollections={feeCollections.filter(fc => fc.studentId === selectedStudent.id)} onSavePayment={handleSavePayment} /> : null,
        'fee-dues-list': <FeeDuesListPage onBack={navigateToFeesOptions} students={students} batches={batches} feeCollections={feeCollections} />,
        'fee-collection-report': <FeeCollectionReportPage onBack={navigateToFeesOptions} feeCollections={feeCollections} />,
        'staff-options': <StaffOptionsPage onBack={navigateToDashboard} onNavigate={setCurrentPage} />,
        'staff-manager': <StaffManagerPage onBack={() => handleNavigate('staff-options')} staff={staff} onManageAccess={navigateToStaffAccess} onShowDevPopup={setShowDevPopup} onToggleStatus={handleToggleStaffStatus} />,
        'new-staff': <NewStaffPage onBack={() => handleNavigate('staff-options')} onSave={handleCreateStaff} />,
        'inactive-staff': <InactiveStaffPage onBack={() => handleNavigate('staff-options')} staff={staff} onToggleStatus={handleToggleStaffStatus} />,
        'staff-batch-access': selectedStaff ? <StaffBatchAccessPage onBack={() => handleNavigate('staff-manager')} staff={selectedStaff} batches={batches} onSave={handleSaveStaffAccess} /> : null,
        'settings': <SettingsPage onBack={navigateToDashboard} onNavigate={setCurrentPage} onShowDevPopup={setShowDevPopup} />,
        'custom-sms-settings': <CustomSmsSettingsPage onBack={navigateToSettings} onShowDevPopup={setShowDevPopup} />
    };

    return (
        <div className="bg-slate-100 dark:bg-gray-900 h-screen font-sans flex flex-col md:max-w-lg md:mx-auto md:shadow-2xl">
            <SideNav isOpen={isSideNavOpen} onClose={() => setIsSideNavOpen(false)} onNavigate={handleNavigate} onLogout={handleLogout} onShowDevPopup={setShowDevPopup} />
            {currentPage === 'dashboard' && (
                <Header academyName={academy.name} academyId={academy.academyId} logoUrl={academy.logoUrl} onLogout={handleLogout} onToggleNav={() => setIsSideNavOpen(true)} theme={theme} onToggleTheme={toggleTheme} />
            )}
            {isOffline && <OfflineIndicator />}
            {connectionError && <ConnectionErrorBanner message={connectionError} onClose={() => setConnectionError(null)} />}
            <div className="flex-grow flex flex-col overflow-y-auto">
                {adminScreens[currentPage] || adminScreens['dashboard']}
            </div>
            {['dashboard', 'my-account'].includes(currentPage) && <BottomNav onNavigate={handleNavigate} activePage={currentPage} />}
            <Chatbot />
        </div>
    );
  };

  return (
    <>
      {renderContent()}
      {showDevPopup && <DevelopmentPopup featureName={showDevPopup} onClose={() => setShowDevPopup(null)} />}
    </>
  );
}

export default App;