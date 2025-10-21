

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
import { collection, addDoc, onSnapshot, query, where, doc, runTransaction, increment, Timestamp, updateDoc, getDoc, FirestoreError } from 'firebase/firestore';
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
  const [dataConsentGiven, setDataConsentGiven] = React.useState(() => {
    try {
      return localStorage.getItem('dataConsentAccepted') === 'true';
    } catch (e) {
      console.error("Could not access localStorage. Proceeding without consent check.", e);
      return true;
    }
  });

  const [currentUser, setCurrentUser] = React.useState<CurrentUser | null>(null);
  const [currentAcademy, setCurrentAcademy] = React.useState<Academy | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [authPage, setAuthPage] = React.useState('login'); // 'login' or 'register'
  const [loginError, setLoginError] = React.useState<string | null>(null);
  const [isOffline, setIsOffline] = React.useState(false);
  const [criticalError, setCriticalError] = React.useState<string | null>(null);
  const [showDevPopup, setShowDevPopup] = React.useState<string | null>(null);

  const [page, setPage] = React.useState('dashboard');
  const [studentPage, setStudentPage] = React.useState('dashboard');
  const [staffPage, setStaffPage] = React.useState('dashboard');
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [isStudentNavOpen, setIsStudentNavOpen] = React.useState(false);
  const [isStaffNavOpen, setIsStaffNavOpen] = React.useState(false);
  const [batches, setBatches] = React.useState<Batch[]>([]);
  const [students, setStudents] = React.useState<Student[]>([]);
  const [staff, setStaff] = React.useState<Staff[]>([]);
  const [feeCollections, setFeeCollections] = React.useState<FeeCollection[]>([]);
  const [studentFeeCollections, setStudentFeeCollections] = React.useState<FeeCollection[]>([]);
  const [selectedBatchId, setSelectedBatchId] = React.useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = React.useState<string | null>(null);
  const [selectedStaffId, setSelectedStaffId] = React.useState<string | null>(null);
  const [batchFilter, setBatchFilter] = React.useState<string | null>(null);
  
  const [theme, setTheme] = React.useState<'light' | 'dark'>(() => {
    try {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark' || storedTheme === 'light') {
        return storedTheme;
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch (e) {
      // Ignore localStorage errors
    }
    return 'light';
  });

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.error("Could not save theme to localStorage", e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleShowDevPopup = (featureName: string) => setShowDevPopup(featureName);
  
  const isUsingPlaceholderConfig = firebaseConfig.apiKey === "AIzaSyA_Nvv_zzZP-15Xaw0qsddKu5eahac-OvY";
  const academyId = currentUser?.role === 'admin' ? currentUser.data.id : currentUser?.academyId;
  const isDemoMode = (currentUser?.role === 'admin' && currentUser.data.academyId === 'ACDEMO') || (currentUser?.role === 'staff' && currentUser.academyId === 'ACDEMO');


  const handleAcceptDataConsent = () => {
    try {
      localStorage.setItem('dataConsentAccepted', 'true');
      setDataConsentGiven(true);
    } catch (e) {
      console.error("Could not save data consent to localStorage. Proceeding anyway.", e);
      setDataConsentGiven(true);
    }
  };

  const handleFirestoreError = (err: unknown, context: string) => {
    console.error(`Firestore error fetching ${context}:`, err);
    if (isUsingPlaceholderConfig) return;

    // FIX: Safely access the error code property to avoid type errors with unknown error objects.
    const code = (err && typeof err === 'object' && 'code' in err) ? String((err as {code: unknown}).code) : undefined;


    if (code === 'unavailable' || code === 'cancelled') {
        setIsOffline(true);
        setCriticalError(null);
    } else {
        setCriticalError(`A critical error occurred while loading ${context}. Please refresh.`);
        setIsOffline(false);
    }
  };


  React.useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (typeof navigator.onLine === 'boolean' && !navigator.onLine) {
        handleOffline();
    }

    if (isUsingPlaceholderConfig) {
      setIsLoading(false);
      return;
    }
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const academiesRef = collection(db, 'academies');
        const q = query(academiesRef, where('adminUid', '==', user.uid));
        const unsubscribeFirestore = onSnapshot(q, (snapshot) => {
          if (!snapshot.empty) {
            const academyDoc = snapshot.docs[0];
            const academyData = { id: academyDoc.id, ...academyDoc.data() } as Academy;
            
            if (academyData.status === 'paused') {
                setCurrentUser(null);
                setCurrentAcademy(null);
                setLoginError("This academy account has been suspended. Please contact support.");
                auth.signOut();
            } else {
                setCurrentUser({ role: 'admin', data: academyData });
                setCurrentAcademy(academyData);
                setLoginError(null);
            }
            setIsOffline(false); 
            setCriticalError(null);
          } else {
            setLoginError("Your account was found, but it's not linked to any academy. Please register or contact support.");
            setCurrentUser(null);
            setCurrentAcademy(null);
          }
          setIsLoading(false);
        }, (err: unknown) => {
          handleFirestoreError(err, 'academy data');
          // FIX: Argument of type 'unknown' is not assignable to parameter of type 'string'.
          // The error from onSnapshot is a FirestoreError, so we can access .code directly.
          // Safely access the error code to prevent type errors.
          const code = (err && typeof err === 'object' && 'code' in err) ? String((err as {code: unknown}).code) : undefined;
          if (code !== 'unavailable' && code !== 'cancelled') {
              setCurrentUser(null);
              setCurrentAcademy(null);
          }
          setIsLoading(false);
        });
        return () => unsubscribeFirestore();
      } else {
        setCurrentUser(null);
        setCurrentAcademy(null);
        setIsLoading(false);
      }
    });

    return () => {
        unsubscribe();
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
    };
  }, [isUsingPlaceholderConfig]);

  React.useEffect(() => {
    if (isDemoMode) {
      setBatches(demoBatches);
      setStudents(demoStudents);
      setStaff(demoStaff);
      return;
    }

    if (!academyId || isUsingPlaceholderConfig) {
        setBatches([]);
        setStudents([]);
        setFeeCollections([]);
        setStaff([]);
        return;
    }

    const batchesQuery = query(collection(db, `academies/${academyId}/batches`));
    const unsubscribeBatches = onSnapshot(batchesQuery, (snapshot) => {
      setBatches(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Batch)));
      setIsOffline(false);
      setCriticalError(null);
    }, (err: FirestoreError) => handleFirestoreError(err, 'batches'));

    const studentsQuery = query(collection(db, `academies/${academyId}/students`));
    const unsubscribeStudents = onSnapshot(studentsQuery, (snapshot) => {
      setStudents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Student)));
      setIsOffline(false);
      setCriticalError(null);
    }, (err: FirestoreError) => handleFirestoreError(err, 'students'));
    
    const feeCollectionsQuery = query(collection(db, `academies/${academyId}/feeCollections`));
    // FIX: Explicitly type `err` as FirestoreError to resolve potential type inference issues.
    const unsubscribeFeeCollections = onSnapshot(feeCollectionsQuery, (snapshot) => {
      setFeeCollections(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FeeCollection)));
      setIsOffline(false);
      setCriticalError(null);
    }, (err: FirestoreError) => handleFirestoreError(err, 'fee collections'));

    const staffQuery = query(collection(db, `academies/${academyId}/staff`));
    const unsubscribeStaff = onSnapshot(staffQuery, (snapshot) => {
        setStaff(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Staff)));
        setIsOffline(false);
        setCriticalError(null);
    }, (err: FirestoreError) => handleFirestoreError(err, 'staff'));

    return () => {
      unsubscribeBatches();
      unsubscribeStudents();
      unsubscribeFeeCollections();
      unsubscribeStaff();
    };
  }, [academyId, isUsingPlaceholderConfig, isDemoMode]);

  React.useEffect(() => {
    if (currentUser?.role !== 'student' || !academyId || isUsingPlaceholderConfig) {
      setStudentFeeCollections([]);
      return;
    }

    const feeCollectionsQuery = query(
      collection(db, `academies/${academyId}/feeCollections`),
      where('studentId', '==', currentUser.data.id)
    );

    const unsubscribe = onSnapshot(feeCollectionsQuery, (snapshot) => {
      setStudentFeeCollections(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FeeCollection)));
      setIsOffline(false);
      setCriticalError(null);
    }, (err: FirestoreError) => handleFirestoreError(err, 'student fee collections'));

    return () => unsubscribe();
  }, [currentUser, academyId, isUsingPlaceholderConfig]);


  const handleLogin = async (user: CurrentUser) => {
      setIsLoading(true);
      if (user.role === 'student' || user.role === 'staff') {
          try {
              if (user.academyId === 'ACDEMO') {
                  setCurrentAcademy({
                      id: 'demo-academy-id',
                      academyId: 'ACDEMO',
                      name: 'SM TUTORIALS',
                      adminUid: 'demo-admin-uid',
                      adminEmail: 'demo@classcaptain.com',
                  });
              } else {
                  const academyDoc = await getDoc(doc(db, 'academies', user.academyId));
                  if (academyDoc.exists()) {
                      setCurrentAcademy({ id: academyDoc.id, ...academyDoc.data() } as Academy);
                  } else {
                      setLoginError(`Academy with ID ${user.academyId} not found.`);
                      setIsLoading(false);
                      return;
                  }
              }
          } catch(e) {
              console.error("Failed to fetch academy details:", e);
              setLoginError("Could not fetch academy details. Please try again.");
              setIsLoading(false);
              return;
          }
      } else if (user.role === 'admin') {
          setCurrentAcademy(user.data);
      }
      setCurrentUser(user);
      setPage('dashboard');
      setStudentPage('dashboard');
      setStaffPage('dashboard');
      setIsLoading(false);
  };

  const handleLoginAfterRegister = (academy: Academy) => {
    setCurrentUser({ role: 'admin', data: academy });
    setCurrentAcademy(academy);
    setPage('dashboard');
  };

  const handleLogout = async () => {
    if (currentUser?.role !== 'student') {
        await auth.signOut();
    }
    setCurrentUser(null);
    setCurrentAcademy(null);
    setPage('dashboard');
    setStudentPage('dashboard');
    setStaffPage('dashboard');
    setAuthPage('login');
    setLoginError(null);
    setIsNavOpen(false);
    setIsStudentNavOpen(false);
    setIsStaffNavOpen(false);
  };

  const addBatch = async (newBatchData: Omit<Batch, 'id' | 'currentStudents'>) => {
    if (isDemoMode) {
      setShowDevPopup("Adding and editing data is disabled in demo mode.");
      return;
    }
    if (!academyId) return;
    try {
        await addDoc(collection(db, `academies/${academyId}/batches`), {
          ...newBatchData,
          currentStudents: 0,
        });
        setPage('batches');
    } catch (e) {
        handleFirestoreError(e, 'adding batch');
        alert("Failed to create the new batch. Please check your connection and try again.");
    }
  };
  
  const addStudent = async (newStudentData: Omit<Student, 'id' | 'isActive'>) => {
    if (isDemoMode) {
      setShowDevPopup("Adding and editing data is disabled in demo mode.");
      return;
    }
     if (!academyId) return;

    try {
        await runTransaction(db, async (transaction) => {
            const batchRefsQuery = query(
                collection(db, `academies/${academyId}/batches`), 
                where("name", "in", newStudentData.batches)
            );
            const batchDocsSnapshot = await transaction.get(batchRefsQuery);
            const newStudentRef = doc(collection(db, `academies/${academyId}/students`));
            
            transaction.set(newStudentRef, { ...newStudentData, isActive: true });

            batchDocsSnapshot.forEach(batchDoc => {
                transaction.update(batchDoc.ref, { currentStudents: increment(1) });
            });
        });
        setPage('student-options');
    } catch (e) {
        handleFirestoreError(e, 'saving student data');
        alert("Failed to save student. Please try again.");
    }
  };
  
  const addStaff = async (newStaffData: Omit<Staff, 'id'>) => {
    if (isDemoMode) {
      setShowDevPopup("Adding and editing data is disabled in demo mode.");
      return;
    }
    if (!academyId) return;
    try {
        await addDoc(collection(db, `academies/${academyId}/staff`), newStaffData);
        setPage('staff-manager');
    } catch (e) {
        handleFirestoreError(e, 'adding staff');
        alert("Failed to create the new staff member. Please check your connection and try again.");
    }
  };

  const updateStaffBatchAccess = async (staffId: string, batchAccess: { [batchId: string]: BatchAccessPermissions }) => {
    if (isDemoMode) {
      setShowDevPopup("Editing data is disabled in demo mode.");
      return;
    }
    if (!academyId) return;
    try {
        const staffRef = doc(db, `academies/${academyId}/staff`, staffId);
        await updateDoc(staffRef, { batchAccess });
        setPage('staff-manager');
    } catch (e) {
        handleFirestoreError(e, 'updating staff access');
        alert("Failed to update staff permissions. Please try again.");
    }
  };

  const updateStudent = async (updatedStudentData: Omit<Student, 'id' | 'isActive'>) => {
    if (isDemoMode) {
      setShowDevPopup("Editing data is disabled in demo mode.");
      return;
    }
    if (!academyId || !selectedStudentId) return;

    const originalStudent = students.find(s => s.id === selectedStudentId);
    if (!originalStudent) {
        alert("Could not find the original student data to update.");
        return;
    }

    try {
        await runTransaction(db, async (transaction) => {
            const studentRef = doc(db, `academies/${academyId}/students`, selectedStudentId);
            
            const oldBatches = new Set(originalStudent.batches);
            const newBatches = new Set(updatedStudentData.batches);

            const batchesToAdd = [...newBatches].filter(b => !oldBatches.has(b));
            const batchesToRemove = [...oldBatches].filter(b => !newBatches.has(b));
            const allAffectedBatches = [...new Set([...batchesToAdd, ...batchesToRemove])];
            
            if (allAffectedBatches.length > 0) {
                 const batchRefsQuery = query(
                    collection(db, `academies/${academyId}/batches`), 
                    where("name", "in", allAffectedBatches)
                );
                const batchDocsSnapshot = await transaction.get(batchRefsQuery);

                batchDocsSnapshot.forEach(batchDoc => {
                    const batchName = batchDoc.data().name;
                    if (batchesToAdd.includes(batchName)) {
                        transaction.update(batchDoc.ref, { currentStudents: increment(1) });
                    }
                    if (batchesToRemove.includes(batchName)) {
                        transaction.update(batchDoc.ref, { currentStudents: increment(-1) });
                    }
                });
            }

            transaction.update(studentRef, { ...updatedStudentData, isActive: originalStudent.isActive });
        });
        setPage('active-students');
        setSelectedStudentId(null);
    } catch (e) {
        handleFirestoreError(e, 'updating student data');
        alert("Failed to update student. Please try again.");
    }
  };

  const toggleStudentStatus = async (studentId: string) => {
    if (isDemoMode) {
      const studentToToggle = students.find(s => s.id === studentId);
      if (!studentToToggle) return;
      setStudents(prevStudents => prevStudents.map(student => student.id === studentId ? { ...student, isActive: !student.isActive } : student));
      const studentCountChange = studentToToggle.isActive ? -1 : 1;
      setBatches(prevBatches => prevBatches.map(batch => {
          if (studentToToggle.batches.includes(batch.name)) {
            return { ...batch, currentStudents: batch.currentStudents + studentCountChange };
          }
          return batch;
        })
      );
      return;
    }

    if (!academyId) return;
    
    try {
        await runTransaction(db, async (transaction) => {
            const studentRef = doc(db, `academies/${academyId}/students`, studentId);
            const studentDoc = await transaction.get(studentRef);
            if (!studentDoc.exists()) throw new Error("Student document not found!");

            const studentData = studentDoc.data() as Student;
            let batchDocsSnapshot: Awaited<ReturnType<typeof transaction.get>> | null = null;
            
            if (studentData.batches && studentData.batches.length > 0) {
                 const batchRefsQuery = query(collection(db, `academies/${academyId}/batches`), where("name", "in", studentData.batches));
                 batchDocsSnapshot = await transaction.get(batchRefsQuery);
            }

            const newIsActive = !studentData.isActive;
            const studentCountChange = newIsActive ? 1 : -1;
            transaction.update(studentRef, { isActive: newIsActive });

            if (batchDocsSnapshot) {
                 batchDocsSnapshot.forEach(batchDoc => {
                     transaction.update(batchDoc.ref, { currentStudents: increment(studentCountChange) });
                 });
            }
        });
    } catch (e) {
        handleFirestoreError(e, 'updating student status');
        alert("Failed to update student status. Please try again.");
    }
  };
  
  const saveFeePayment = async (paymentData: Omit<FeeCollection, 'id'>) => {
    if (isDemoMode) {
        const error = new Error("Saving data is disabled in demo mode.");
        (error as any).code = 'demo-mode';
        throw error;
    }
    if (!academyId) throw new Error("Academy ID is not available.");

    try {
        await addDoc(collection(db, `academies/${academyId}/feeCollections`), {
            ...paymentData,
            paymentDate: Timestamp.fromDate(new Date(paymentData.paymentDate as any)),
            createdAt: Timestamp.now()
        });
    } catch (e) {
        handleFirestoreError(e, 'saving fee payment');
        throw e;
    }
  };
  
  const updateAcademyContactDetails = async (details: Partial<Academy>) => {
    if (isDemoMode) {
      setShowDevPopup("Editing data is disabled in demo mode.");
      return;
    }
    if (!academyId) return;
    try {
      const academyRef = doc(db, 'academies', academyId);
      await updateDoc(academyRef, details);
    } catch (error) {
      handleFirestoreError(error, 'updating academy contact details');
      alert("Failed to update contact details. Please try again.");
      throw error;
    }
  };


  const handleSelectBatchForAttendance = (batchId: string) => {
    setSelectedBatchId(batchId);
    if (currentUser?.role === 'staff') {
        setStaffPage('take-attendance');
    } else {
        setPage('take-attendance');
    }
  };

  const handleViewRegistrationForm = (studentId: string) => {
    setSelectedStudentId(studentId);
    setPage('registration-form-view');
  };

  const handleEditStudent = (studentId: string) => {
    setSelectedStudentId(studentId);
    setPage('edit-student');
  };

  const handleViewBatchStudents = (batchName: string) => {
    setBatchFilter(batchName);
    setPage('active-students');
  };

  const handleSelectBatchForFees = (batchId: string) => {
    setSelectedBatchId(batchId);
    if (currentUser?.role === 'staff') {
        setStaffPage('select-student-for-fees');
    } else {
        setPage('select-student-for-fees');
    }
  }

  const handleSelectStudentForFees = (studentId: string) => {
    setSelectedStudentId(studentId);
    if (currentUser?.role === 'staff') {
        setStaffPage('student-fee-details');
    } else {
        setPage('student-fee-details');
    }
  }

  const handleManageStaffAccess = (staffId: string) => {
    setSelectedStaffId(staffId);
    setPage('staff-batch-access');
  };
  
  if (!dataConsentGiven && !isUsingPlaceholderConfig) {
    return <DataConsentModal onAccept={handleAcceptDataConsent} />;
  }
  
  if (isLoading) {
    return <div className="bg-slate-50 dark:bg-gray-900 min-h-screen"><SplashScreen /></div>;
  }
  
  if (currentUser?.role === 'student') {
      if (!currentAcademy) {
          return <div className="bg-slate-50 dark:bg-gray-900 min-h-screen"><SplashScreen /></div>;
      }

      const renderStudentPage = () => {
          switch (studentPage) {
              case 'fee-status':
                  return (
                      <StudentFeeStatusPage
                          student={currentUser.data}
                          feeCollections={studentFeeCollections}
                          onBack={() => setStudentPage('dashboard')}
                      />
                  );
              case 'my-academy':
                  return (
                      <MyAcademyPage
                          academy={currentAcademy}
                          onBack={() => setStudentPage('dashboard')}
                      />
                  );
              case 'attendance':
                  return (
                      <StudentAttendancePage
                          student={currentUser.data}
                          academyId={academyId!}
                          onBack={() => setStudentPage('dashboard')}
                      />
                  );
              case 'dashboard':
              default:
                  return (
                      <StudentDashboardPage
                          student={currentUser.data}
                          academy={currentAcademy}
                          onNavigate={setStudentPage}
                          onToggleNav={() => setIsStudentNavOpen(true)}
                          theme={theme}
                          onToggleTheme={toggleTheme}
                          onShowDevPopup={handleShowDevPopup}
                      />
                  );
          }
      };

      return (
          <div>
              <StudentSideNav 
                  isOpen={isStudentNavOpen} 
                  onClose={() => setIsStudentNavOpen(false)}
                  onNavigate={setStudentPage}
                  onLogout={handleLogout}
              />
              {renderStudentPage()}
              <Chatbot />
          </div>
      );
  }

  if (currentUser?.role === 'staff') {
    if (!currentAcademy) {
        return <div className="bg-slate-50 dark:bg-gray-900 min-h-screen"><SplashScreen /></div>;
    }
    const staffData = currentUser.data;

    const renderStaffPage = () => {
        switch (staffPage) {
            case 'select-batch-attendance':
                const batchesWithAttendancePerm = batches.filter(b => staffData.batchAccess[b.id]?.attendance);
                return <SelectBatchForAttendancePage onBack={() => setStaffPage('dashboard')} batches={batchesWithAttendancePerm.filter(b => b.currentStudents > 0)} onSelectBatch={handleSelectBatchForAttendance} />;
            case 'take-attendance':
                const selectedBatchForAttendance = batches.find(b => b.id === selectedBatchId);
                if (!selectedBatchForAttendance || !staffData.batchAccess[selectedBatchForAttendance.id]?.attendance) {
                    setStaffPage('select-batch-attendance');
                    return null;
                }
                const batchStudents = students.filter(s => s.batches.includes(selectedBatchForAttendance.name) && s.isActive);
                return <TakeAttendancePage onBack={() => setStaffPage('select-batch-attendance')} batch={selectedBatchForAttendance} students={batchStudents} academyId={academyId!} isDemoMode={isDemoMode} />;
            case 'student-options':
                const canAccessStudents = Object.keys(staffData.batchAccess || {}).length > 0;
                if (!canAccessStudents) {
                    setStaffPage('dashboard');
                    return null;
                }
                return <StudentOptionsPage onBack={() => setStaffPage('dashboard')} onNavigate={setStaffPage} isStaffView={true} onShowDevPopup={handleShowDevPopup} />;
            case 'active-students':
                const accessibleBatchIds = Object.keys(staffData.batchAccess || {});
                const accessibleBatches = batches.filter(b => accessibleBatchIds.includes(b.id));
                const accessibleBatchNames = new Set(accessibleBatches.map(b => b.name));

                const visibleStudents = students.filter(student => 
                    student.batches.some(batchName => accessibleBatchNames.has(batchName))
                );

                return <ActiveStudentsPage 
                    onBack={() => setStaffPage('student-options')}
                    students={visibleStudents}
                    batches={accessibleBatches}
                    onToggleStudentStatus={toggleStudentStatus}
                    onEditStudent={handleEditStudent}
                    onViewStudent={handleViewRegistrationForm}
                    initialFilter={'all'}
                    staffPermissions={staffData.batchAccess}
                />;
            case 'dashboard':
            default:
                return (
                    <StaffDashboardPage
                        staff={currentUser.data}
                        academy={currentAcademy}
                        onNavigate={setStaffPage}
                        onShowDevPopup={handleShowDevPopup}
                    />
                );
        }
    };

    return (
        <div className="bg-slate-100 dark:bg-gray-900 h-screen font-sans flex flex-col md:max-w-lg md:mx-auto md:shadow-2xl">
            <StaffSideNav 
                isOpen={isStaffNavOpen} 
                onClose={() => setIsStaffNavOpen(false)}
                onNavigate={setStaffPage}
                onLogout={handleLogout}
                staff={currentUser.data}
                onShowDevPopup={handleShowDevPopup}
            />
            {staffPage === 'dashboard' && (
                <StaffHeader 
                    staffName={currentUser.data.name}
                    academyName={currentAcademy.name}
                    onToggleNav={() => setIsStaffNavOpen(true)}
                    onLogout={handleLogout}
                    theme={theme}
                    onToggleTheme={toggleTheme}
                />
            )}
            <main className="flex-grow relative flex flex-col">
                {renderStaffPage()}
            </main>
            <Chatbot />
        </div>
    );
}

  if (!currentUser) {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 font-sans min-h-screen">
            {!isUsingPlaceholderConfig && criticalError && <ConnectionErrorBanner message={criticalError} onClose={() => setCriticalError(null)} />}
            {!isUsingPlaceholderConfig && isOffline && <OfflineIndicator />}
            {authPage === 'login' && <LoginPage onLogin={handleLogin} onNavigateToRegister={() => setAuthPage('register')} externalError={loginError} clearExternalError={() => setLoginError(null)} />}
            {authPage === 'register' && <RegisterPage onRegisterSuccess={handleLoginAfterRegister} onNavigateToLogin={() => setAuthPage('login')} />}
        </div>
    );
  }

  const renderPage = () => {
    switch (page) {
      case 'select-batch-attendance':
        return <SelectBatchForAttendancePage onBack={() => setPage('dashboard')} batches={batches.filter(b => b.currentStudents > 0)} onSelectBatch={handleSelectBatchForAttendance} />;
      
      case 'take-attendance': {
        const selectedBatch = batches.find(b => b.id === selectedBatchId);
        if (!selectedBatch) {
            setPage('select-batch-attendance');
            return null;
        }
        const batchStudents = students.filter(s => s.batches.includes(selectedBatch.name) && s.isActive);
        return <TakeAttendancePage onBack={() => setPage('select-batch-attendance')} batch={selectedBatch} students={batchStudents} academyId={academyId!} isDemoMode={isDemoMode} />;
      }
      
      case 'fees-options':
        return <FeesOptionsPage onBack={() => setPage('dashboard')} onNavigate={setPage}/>;
      
      case 'select-batch-for-fees':
        return <SelectBatchForFeesPage onBack={() => setPage('fees-options')} batches={batches} onSelectBatch={handleSelectBatchForFees} />;
      
      case 'select-student-for-fees': {
        const selectedBatch = batches.find(b => b.id === selectedBatchId);
        if (!selectedBatch) {
            setPage('select-batch-for-fees');
            return null;
        }
        const batchStudents = students.filter(s => s.batches.includes(selectedBatch.name) && s.isActive);
        return <SelectStudentForFeesPage onBack={() => setPage('select-batch-for-fees')} batch={selectedBatch} students={batchStudents} onSelectStudent={handleSelectStudentForFees} />;
      }

      case 'student-fee-details': {
        const selectedStudent = students.find(s => s.id === selectedStudentId);
        if (!selectedStudent) {
            setPage('select-batch-for-fees');
            return null;
        }
        return <StudentFeeDetailsPage onBack={() => setPage('select-student-for-fees')} student={selectedStudent} feeCollections={feeCollections} onSavePayment={saveFeePayment} />;
      }

      case 'fee-dues-list':
        return <FeeDuesListPage onBack={() => setPage('fees-options')} students={students} batches={batches} feeCollections={feeCollections} />;
      
      case 'fee-collection-report':
        return <FeeCollectionReportPage onBack={() => setPage('fees-options')} feeCollections={feeCollections} />;
      
      case 'student-options':
        if (batchFilter) setBatchFilter(null);
        return <StudentOptionsPage onBack={() => setPage('dashboard')} onNavigate={setPage} onShowDevPopup={handleShowDevPopup} />;
      
      case 'new-student':
        return <NewStudentPage onBack={() => setPage('student-options')} onSave={addStudent} batches={batches} />;

      case 'active-students':
        return <ActiveStudentsPage 
                  onBack={() => {
                      if (batchFilter) {
                          setBatchFilter(null);
                          setPage('batches');
                      } else {
                          setPage('student-options');
                      }
                  }}
                  students={students}
                  batches={batches}
                  onToggleStudentStatus={toggleStudentStatus}
                  onEditStudent={handleEditStudent}
                  onViewStudent={handleViewRegistrationForm}
                  initialFilter={batchFilter || 'all'}
                />;
      
      case 'edit-student': {
        const selectedStudent = students.find(s => s.id === selectedStudentId);
        if (!selectedStudent) {
            setPage('active-students');
            return null;
        }
        return <EditStudentPage onBack={() => setPage('active-students')} onUpdate={updateStudent} student={selectedStudent} batches={batches} />;
      }
      
      case 'inactive-students':
        return <InactiveStudentsPage onBack={() => setPage('student-options')} students={students} batches={batches} onToggleStudentStatus={toggleStudentStatus} />;
      
      case 'birthday-list':
        return <BirthdayListPage onBack={() => setPage('student-options')} students={students} />;
      
      case 'registration-form-list':
        return <RegistrationFormListPage onBack={() => setPage('student-options')} students={students} onSelectStudent={handleViewRegistrationForm} />;
      
      case 'registration-form-view': {
        const selectedStudent = students.find(s => s.id === selectedStudentId);
        if (!selectedStudent) {
            setPage('registration-form-list');
            return null;
        }
        return <RegistrationFormViewPage onBack={() => setPage('registration-form-list')} student={selectedStudent} />;
      }

      case 'my-account':
        return <MyAccountPage 
                  onBack={() => setPage('dashboard')} 
                  onLogout={handleLogout} 
                  onSave={updateAcademyContactDetails} 
                  academy={currentUser.data as Academy} 
                />;
      
      case 'batches':
        return <BatchesPage onBack={() => setPage('dashboard')} onCreate={() => setPage('new-batch')} batches={batches} onViewStudents={handleViewBatchStudents} onShowDevPopup={handleShowDevPopup} />;
      
      case 'new-batch':
        return <NewBatchPage onBack={() => setPage('batches')} onSave={addBatch} />;
      
      case 'staff-manager':
        return <StaffManagerPage onBack={() => setPage('dashboard')} staff={staff} onCreate={() => setPage('new-staff')} onManageAccess={handleManageStaffAccess} onShowDevPopup={handleShowDevPopup} />;

      case 'new-staff':
        return <NewStaffPage onBack={() => setPage('staff-manager')} onSave={addStaff} />;

      case 'staff-batch-access': {
          const selectedStaff = staff.find(s => s.id === selectedStaffId);
          if (!selectedStaff) {
              setPage('staff-manager');
              return null;
          }
          return <StaffBatchAccessPage onBack={() => setPage('staff-manager')} staff={selectedStaff} batches={batches} onSave={updateStaffBatchAccess} />;
      }

      case 'dashboard':
      default:
        return (
          <Dashboard
            onNavigate={setPage}
            academy={currentUser.data as Academy}
            onShowDevPopup={handleShowDevPopup}
          />
        );
    }
  };

  return (
    <div className="bg-slate-100 dark:bg-gray-900 h-screen font-sans flex flex-col md:max-w-lg md:mx-auto md:shadow-2xl">
      <SideNav 
          isOpen={isNavOpen} 
          onClose={() => setIsNavOpen(false)}
          onNavigate={setPage}
          onLogout={handleLogout}
          onShowDevPopup={handleShowDevPopup}
      />
      {page === 'dashboard' && (
          <Header
            academyName={currentAcademy!.name}
            academyId={currentAcademy!.academyId}
            logoUrl={currentAcademy!.logoUrl}
            onLogout={handleLogout}
            onToggleNav={() => setIsNavOpen(true)}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
      )}

      {!isUsingPlaceholderConfig && criticalError && <ConnectionErrorBanner message={criticalError} onClose={() => setCriticalError(null)} />}
      {!isUsingPlaceholderConfig && isOffline && <OfflineIndicator />}

      <main className="flex-grow relative flex flex-col">
        {renderPage()}
      </main>

      <BottomNav onNavigate={setPage} activePage={page} />
      {showDevPopup && <DevelopmentPopup featureName={showDevPopup} onClose={() => setShowDevPopup(null)} />}
      <Chatbot />
    </div>
  );
}

// FIX: Export the App component as a default export.
export default App;