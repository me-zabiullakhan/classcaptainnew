
import React from 'react';
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
import type { Batch, Student, CurrentUser, Academy } from './types';
import { ActiveStudentsPage } from './components/ActiveStudentsPage';
import { BirthdayListPage } from './components/BirthdayListPage';
import { RegistrationFormListPage } from './components/RegistrationFormListPage';
import { RegistrationFormViewPage } from './components/RegistrationFormViewPage';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { MyAccountPage } from './components/MyAccountPage';
import { auth, db, firebaseConfig } from './firebaseConfig';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { collection, addDoc, onSnapshot, query, where, doc, runTransaction, increment } from 'firebase/firestore';
import { SplashScreen } from './components/SplashScreen';
import { ConnectionErrorBanner } from './components/ConnectionErrorBanner';
import { OfflineIndicator } from './components/OfflineIndicator';
import { SuperAdminPanel } from './components/SuperAdminPanel';
import { ConfigurationWarning } from './components/ConfigurationWarning';
import { DataConsentModal } from './components/DataConsentModal';

function App(): React.ReactNode {
  const [dataConsentGiven, setDataConsentGiven] = React.useState(() => {
    try {
      // If localStorage is not available, default to true to avoid blocking the app.
      return localStorage.getItem('dataConsentAccepted') === 'true';
    } catch (e) {
      console.error("Could not access localStorage. Proceeding without consent check.", e);
      return true;
    }
  });

  const [currentUser, setCurrentUser] = React.useState<CurrentUser | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [authPage, setAuthPage] = React.useState('login'); // 'login' or 'register'
  const [loginError, setLoginError] = React.useState<string | null>(null);
  const [isOffline, setIsOffline] = React.useState(false);
  const [criticalError, setCriticalError] = React.useState<string | null>(null);

  const [page, setPage] = React.useState('dashboard');
  const [batches, setBatches] = React.useState<Batch[]>([]);
  const [students, setStudents] = React.useState<Student[]>([]);
  const [selectedBatchId, setSelectedBatchId] = React.useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = React.useState<string | null>(null);
  
  const isUsingPlaceholderConfig = firebaseConfig.apiKey === "AIzaSyA_Nvv_zzZP-15Xaw0qsddKu5eahac-OvY";
  const academyId = currentUser?.role === 'admin' ? currentUser.data.id : currentUser?.academyId;

  const handleAcceptDataConsent = () => {
    try {
      localStorage.setItem('dataConsentAccepted', 'true');
      setDataConsentGiven(true);
    } catch (e) {
      console.error("Could not save data consent to localStorage. Proceeding anyway.", e);
      // Let the user proceed even if localStorage fails to write.
      setDataConsentGiven(true);
    }
  };

  const handleFirestoreError = (err: any, context: string) => {
    console.error(`Firestore error fetching ${context}:`, err);
    if (isUsingPlaceholderConfig) return; // Don't show other errors if config is wrong

    // Firebase uses 'unavailable' for network issues and 'cancelled' if the client is offline.
    if (err.code === 'unavailable' || err.code === 'cancelled') {
        setIsOffline(true);
        setCriticalError(null);
    } else {
        setCriticalError(`A critical error occurred while loading ${context}. Please refresh.`);
        setIsOffline(false);
    }
  };


  React.useEffect(() => {
    if (isUsingPlaceholderConfig) {
      setIsLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const academiesRef = collection(db, 'academies');
        const q = query(academiesRef, where('adminUid', '==', user.uid));
        const unsubscribeFirestore = onSnapshot(q, (snapshot) => {
          if (!snapshot.empty) {
            const academyDoc = snapshot.docs[0];
            const academyData = { id: academyDoc.id, ...academyDoc.data() } as Academy;
            
            if (academyData.status === 'paused') {
                console.warn("Login attempt for a paused academy:", academyData.name);
                setCurrentUser(null);
                setLoginError("This academy account has been suspended. Please contact support.");
                firebaseSignOut(auth);
            } else {
                setCurrentUser({ role: 'admin', data: academyData });
                setLoginError(null);
            }

            setIsOffline(false); 
            setCriticalError(null);
          } else {
            console.warn("User authenticated but no academy document found in Firestore.");
            setCurrentUser(null);
          }
          setIsLoading(false);
        }, (err) => {
          handleFirestoreError(err, 'academy data');
          // Don't set current user to null here if offline, let cache work
          if (err.code !== 'unavailable' && err.code !== 'cancelled') {
              setCurrentUser(null);
          }
          setIsLoading(false);
        });
        return () => unsubscribeFirestore();
      } else {
        setCurrentUser(null);
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, [isUsingPlaceholderConfig]);

  React.useEffect(() => {
    if (!academyId || isUsingPlaceholderConfig) return;

    // Fetch Batches in real-time
    const batchesQuery = query(collection(db, `academies/${academyId}/batches`));
    const unsubscribeBatches = onSnapshot(batchesQuery, (snapshot) => {
      const batchesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Batch));
      setBatches(batchesData);
      setIsOffline(false);
      setCriticalError(null);
    }, (err) => handleFirestoreError(err, 'batches'));

    // Fetch Students in real-time
    const studentsQuery = query(collection(db, `academies/${academyId}/students`));
    const unsubscribeStudents = onSnapshot(studentsQuery, (snapshot) => {
      const studentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Student));
      setStudents(studentsData);
      setIsOffline(false);
      setCriticalError(null);
    }, (err) => handleFirestoreError(err, 'students'));

    return () => {
      unsubscribeBatches();
      unsubscribeStudents();
    };
  }, [academyId, isUsingPlaceholderConfig]);

  const handleLogin = (user: CurrentUser) => {
    setCurrentUser(user);
    setPage('dashboard');
  };

  const handleSuperAdminLogin = () => {
    setIsSuperAdmin(true);
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await firebaseSignOut(auth);
    setCurrentUser(null);
    setIsSuperAdmin(false);
    setPage('dashboard');
    setAuthPage('login');
    setLoginError(null);
  };

  const addBatch = async (newBatchData: Omit<Batch, 'id' | 'currentStudents'>) => {
    if (!academyId) return;
    try {
        await addDoc(collection(db, `academies/${academyId}/batches`), {
          ...newBatchData,
          currentStudents: 0,
        });
        setPage('batches');
    } catch (e) {
        console.error("Failed to add batch:", e);
        handleFirestoreError(e as any, 'adding batch');
        alert("Failed to create the new batch. Please check your connection and try again.");
    }
  };
  
  const addStudent = async (newStudentData: Omit<Student, 'id' | 'isActive'>) => {
     if (!academyId) return;

    try {
        await runTransaction(db, async (transaction) => {
            const batchRefsQuery = query(
                collection(db, `academies/${academyId}/batches`), 
                where("name", "in", newStudentData.batches)
            );
            const batchDocsSnapshot = await transaction.get(batchRefsQuery);

            const newStudentRef = doc(collection(db, `academies/${academyId}/students`));
            
            transaction.set(newStudentRef, {
                ...newStudentData,
                isActive: true
            });

            batchDocsSnapshot.forEach(batchDoc => {
                transaction.update(batchDoc.ref, { currentStudents: increment(1) });
            });
        });
        setPage('student-options');
    } catch (e) {
        console.error("Transaction failed: ", e);
        handleFirestoreError(e as any, 'saving student data');
        alert("Failed to save student. Please try again.");
    }
  };

  const toggleStudentStatus = async (studentId: string) => {
    if (!academyId) return;
    
    try {
        await runTransaction(db, async (transaction) => {
            const studentRef = doc(db, `academies/${academyId}/students`, studentId);
            const studentDoc = await transaction.get(studentRef);

            if (!studentDoc.exists()) {
                throw new Error("Student document not found!");
            }

            const studentData = studentDoc.data() as Student;
            let batchDocsSnapshot: Awaited<ReturnType<typeof transaction.get>> | null = null;
            
            if (studentData.batches && studentData.batches.length > 0) {
                 const batchRefsQuery = query(
                     collection(db, `academies/${academyId}/batches`), 
                     where("name", "in", studentData.batches)
                 );
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
        console.error("Toggle status transaction failed: ", e);
        handleFirestoreError(e as any, 'updating student status');
        alert("Failed to update student status. Please try again.");
    }
  };


  const handleSelectBatchForAttendance = (batchId: string) => {
    setSelectedBatchId(batchId);
    setPage('take-attendance');
  };

  const handleViewRegistrationForm = (studentId: string) => {
    setSelectedStudentId(studentId);
    setPage('registration-form-view');
  };
  
  if (!dataConsentGiven && !isUsingPlaceholderConfig) {
    return <DataConsentModal onAccept={handleAcceptDataConsent} />;
  }
  
  if (isLoading) {
    return (
        <div className="bg-slate-50 min-h-screen">
            {isUsingPlaceholderConfig && <ConfigurationWarning />}
            <SplashScreen />
        </div>
    );
  }
  
  if (isSuperAdmin) {
    return (
        <div>
            {isUsingPlaceholderConfig && <ConfigurationWarning />}
            <SuperAdminPanel onLogout={handleLogout} />
        </div>
    );
  }

  if (!currentUser) {
    return (
        <div className="bg-gray-50 font-sans min-h-screen">
            {isUsingPlaceholderConfig && <ConfigurationWarning />}
            {!isUsingPlaceholderConfig && criticalError && <ConnectionErrorBanner message={criticalError} onClose={() => setCriticalError(null)} />}
            {!isUsingPlaceholderConfig && isOffline && <OfflineIndicator />}
            {authPage === 'login' && <LoginPage onLogin={handleLogin} onSuperAdminLogin={handleSuperAdminLogin} onNavigateToRegister={() => setAuthPage('register')} externalError={loginError} clearExternalError={() => setLoginError(null)} />}
            {authPage === 'register' && <RegisterPage onRegisterSuccess={() => setAuthPage('login')} onNavigateToLogin={() => setAuthPage('login')} />}
        </div>
    );
  }

  const renderPage = () => {
    switch (page) {
      case 'select-batch-attendance':
        return <SelectBatchForAttendancePage onBack={() => setPage('dashboard')} batches={batches.filter(b => b.currentStudents > 0)} onSelectBatch={handleSelectBatchForAttendance} />;
      case 'fees-options':
        return <FeesOptionsPage onBack={() => setPage('dashboard')} />;
      case 'student-options':
        return <StudentOptionsPage onBack={() => setPage('dashboard')} onNavigate={setPage} />;
      case 'active-students':
        return <ActiveStudentsPage onBack={() => setPage('student-options')} students={students} batches={batches} onToggleStudentStatus={toggleStudentStatus} />;
      case 'birthday-list':
        return <BirthdayListPage onBack={() => setPage('student-options')} students={students} />;
      case 'registration-form-list':
        return <RegistrationFormListPage onBack={() => setPage('student-options')} students={students} onSelectStudent={handleViewRegistrationForm} />;
      case 'my-account':
        return <MyAccountPage onBack={() => setPage('dashboard')} onLogout={handleLogout} />;
      case 'batches':
        return <BatchesPage onBack={() => setPage('dashboard')} onCreate={() => setPage('new-batch')} batches={batches} />;
      case 'dashboard':
      default:
        return <Dashboard onNavigate={setPage} academy={currentUser.data as Academy} />;
    }
  };

  if (page === 'new-batch') {
    return (
        <div className="bg-white min-h-screen font-sans flex flex-col md:max-w-lg md:mx-auto md:shadow-2xl">
            <NewBatchPage onBack={() => setPage('batches')} onSave={addBatch} />
        </div>
    );
  }

  if (page === 'new-student') {
    return (
      <div className="bg-white min-h-screen font-sans flex flex-col md:max-w-lg md:mx-auto md:shadow-2xl">
        <NewStudentPage onBack={() => setPage('student-options')} onSave={addStudent} batches={batches} />
      </div>
    );
  }
  
  if (page === 'take-attendance') {
    const selectedBatch = batches.find(b => b.id === selectedBatchId);
    if (!selectedBatch) {
      setPage('select-batch-attendance');
      return null; 
    }
    const batchStudents = students.filter(s => s.batches.includes(selectedBatch.name) && s.isActive);
    
    return (
      <div className="bg-white min-h-screen font-sans flex flex-col md:max-w-lg md:mx-auto md:shadow-2xl">
        <TakeAttendancePage 
          onBack={() => setPage('select-batch-attendance')}
          batch={selectedBatch}
          students={batchStudents}
        />
      </div>
    );
  }
  
  if (page === 'registration-form-view') {
    const selectedStudent = students.find(s => s.id === selectedStudentId);
    if (!selectedStudent) {
        setPage('registration-form-list');
        return null;
    }
    return (
        <RegistrationFormViewPage onBack={() => setPage('registration-form-list')} student={selectedStudent} />
    );
  }
  
  const academyData = currentUser.role === 'admin' ? currentUser.data : null;

  return (
    <div className="bg-slate-100 min-h-screen font-sans flex flex-col md:max-w-lg md:mx-auto md:shadow-2xl">
      {isUsingPlaceholderConfig && <ConfigurationWarning />}
      {!isUsingPlaceholderConfig && criticalError && <ConnectionErrorBanner message={criticalError} onClose={() => setCriticalError(null)} />}
      {!isUsingPlaceholderConfig && isOffline && <OfflineIndicator />}
      {page === 'dashboard' && academyData && 
        <Header 
          academyName={academyData.name} 
          academyId={academyData.academyId} 
          onLogout={handleLogout} 
        />
      }
      <main className="flex-grow px-3 sm:px-4 py-4 relative">
        {renderPage()}
      </main>
      
      {page === 'dashboard' && <BottomNav onNavigate={setPage} activePage={page}/>}
    </div>
  );
}

export default App;
