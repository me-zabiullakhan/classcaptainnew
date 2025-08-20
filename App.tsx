

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
import type { Batch, Student, CurrentUser, Academy, FeeCollection } from './types';
import { ActiveStudentsPage } from './components/ActiveStudentsPage';
import { InactiveStudentsPage } from './components/InactiveStudentsPage';
import { BirthdayListPage } from './components/BirthdayListPage';
import { RegistrationFormListPage } from './components/RegistrationFormListPage';
import { RegistrationFormViewPage } from './components/RegistrationFormViewPage';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { MyAccountPage } from './components/MyAccountPage';
import { auth, db, firebaseConfig } from './firebaseConfig';
import { collection, addDoc, onSnapshot, query, where, doc, runTransaction, increment, Timestamp, updateDoc, getDoc } from 'firebase/firestore';
import { SplashScreen } from './components/SplashScreen';
import { ConnectionErrorBanner } from './components/ConnectionErrorBanner';
import { OfflineIndicator } from './components/OfflineIndicator';
import { DataConsentModal } from './components/DataConsentModal';
import { SideNav } from './components/SideNav';
import { demoBatches, demoStudents } from './demoData';
import { EditStudentPage } from './components/EditStudentPage';
import { SelectBatchForFeesPage } from './components/SelectBatchForFeesPage';
import { SelectStudentForFeesPage } from './components/SelectStudentForFeesPage';
import { StudentFeeDetailsPage } from './components/StudentFeeDetailsPage';
import { FeeDuesListPage } from './components/FeeDuesListPage';
import { FeeCollectionReportPage } from './components/FeeCollectionReportPage';
import { ContactUsPage } from './components/ContactUsPage';
import { StudentDashboardPage } from './components/student/StudentDashboardPage';
import { StudentFeeStatusPage } from './components/student/StudentFeeStatusPage';
import { StudentSideNav } from './components/student/StudentSideNav';
import { MyAcademyPage } from './components/student/MyAcademyPage';
import { StudentAttendancePage } from './components/student/StudentAttendancePage';

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

  const [page, setPage] = React.useState('dashboard');
  const [studentPage, setStudentPage] = React.useState('dashboard');
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [isStudentNavOpen, setIsStudentNavOpen] = React.useState(false);
  const [batches, setBatches] = React.useState<Batch[]>([]);
  const [students, setStudents] = React.useState<Student[]>([]);
  const [feeCollections, setFeeCollections] = React.useState<FeeCollection[]>([]);
  const [studentFeeCollections, setStudentFeeCollections] = React.useState<FeeCollection[]>([]);
  const [selectedBatchId, setSelectedBatchId] = React.useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = React.useState<string | null>(null);
  const [batchFilter, setBatchFilter] = React.useState<string | null>(null);
  
  const isUsingPlaceholderConfig = firebaseConfig.apiKey === "AIzaSyA_Nvv_zzZP-15Xaw0qsddKu5eahac-OvY";
  const academyId = currentUser?.role === 'admin' ? currentUser.data.id : currentUser?.academyId;
  const isDemoMode = currentUser?.role === 'admin' && currentUser.data.academyId === 'ACDEMO';

  const handleAcceptDataConsent = () => {
    try {
      localStorage.setItem('dataConsentAccepted', 'true');
      setDataConsentGiven(true);
    } catch (e) {
      console.error("Could not save data consent to localStorage. Proceeding anyway.", e);
      setDataConsentGiven(true);
    }
  };

  const handleFirestoreError = (err: any, context: string) => {
    console.error(`Firestore error fetching ${context}:`, err);
    if (isUsingPlaceholderConfig) return;

    if (err.code === 'unavailable' || err.code === 'cancelled') {
        setIsOffline(true);
        setCriticalError(null);
    } else {
        setCriticalError(`A critical error occurred while loading ${context}. Please refresh.`);
        setIsOffline(false);
    }
  };


  React.useEffect(() => {
    // Proactive network status monitoring
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Set initial status based on navigator.onLine
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
            // This case handles a valid Firebase Auth user who has no corresponding academy document.
            // This is an invalid state, so we provide feedback and sign them out.
            setLoginError("Your account was found, but it's not linked to any academy. Please register or contact support.");
            auth.signOut(); // Log them out of Firebase Auth to clear the invalid state.
            setCurrentUser(null);
            setCurrentAcademy(null);
          }
          setIsLoading(false);
        }, (err) => {
          handleFirestoreError(err, 'academy data');
          if (err.code !== 'unavailable' && err.code !== 'cancelled') {
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
      return;
    }

    if (!academyId || isUsingPlaceholderConfig || currentUser?.role !== 'admin') {
        setBatches([]);
        setStudents([]);
        setFeeCollections([]);
        return;
    }

    const batchesQuery = query(collection(db, `academies/${academyId}/batches`));
    const unsubscribeBatches = onSnapshot(batchesQuery, (snapshot) => {
      setBatches(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Batch)));
      setIsOffline(false);
      setCriticalError(null);
    }, (err) => handleFirestoreError(err, 'batches'));

    const studentsQuery = query(collection(db, `academies/${academyId}/students`));
    const unsubscribeStudents = onSnapshot(studentsQuery, (snapshot) => {
      setStudents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Student)));
      setIsOffline(false);
      setCriticalError(null);
    }, (err) => handleFirestoreError(err, 'students'));
    
    const feeCollectionsQuery = query(collection(db, `academies/${academyId}/feeCollections`));
    const unsubscribeFeeCollections = onSnapshot(feeCollectionsQuery, (snapshot) => {
      setFeeCollections(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FeeCollection)));
      setIsOffline(false);
      setCriticalError(null);
    }, (err) => handleFirestoreError(err, 'fee collections'));

    return () => {
      unsubscribeBatches();
      unsubscribeStudents();
      unsubscribeFeeCollections();
    };
  }, [academyId, isUsingPlaceholderConfig, isDemoMode, currentUser]);

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
    }, (err) => handleFirestoreError(err, 'student fee collections'));

    return () => unsubscribe();
  }, [currentUser, academyId, isUsingPlaceholderConfig]);


  const handleLogin = async (user: CurrentUser) => {
      setIsLoading(true);
      if (user.role === 'student') {
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
              console.error("Failed to fetch academy details for student:", e);
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
      setIsLoading(false);
  };

  const handleLoginAfterRegister = (academy: Academy) => {
    // The user is already authenticated in Firebase via createUserWithEmailAndPassword.
    // We can directly set the state to log them in to the app and go to the dashboard.
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
    setAuthPage('login');
    setLoginError(null);
    setIsNavOpen(false);
    setIsStudentNavOpen(false);
  };

  const addBatch = async (newBatchData: Omit<Batch, 'id' | 'currentStudents'>) => {
    if (isDemoMode) {
      alert("Adding and editing data is disabled in demo mode.");
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
        handleFirestoreError(e as any, 'adding batch');
        alert("Failed to create the new batch. Please check your connection and try again.");
    }
  };
  
  const addStudent = async (newStudentData: Omit<Student, 'id' | 'isActive'>) => {
    if (isDemoMode) {
      alert("Adding and editing data is disabled in demo mode.");
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
        handleFirestoreError(e as any, 'saving student data');
        alert("Failed to save student. Please try again.");
    }
  };

  const updateStudent = async (updatedStudentData: Omit<Student, 'id' | 'isActive'>) => {
    if (isDemoMode) {
      alert("Editing data is disabled in demo mode.");
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
        handleFirestoreError(e as any, 'updating student data');
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
        handleFirestoreError(e as any, 'updating student status');
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
        handleFirestoreError(e as any, 'saving fee payment');
        throw e; // Re-throw to be caught by the calling component for UI feedback
    }
  };
  
  const updateAcademyContactDetails = async (details: Partial<Academy>) => {
    if (isDemoMode) {
      alert("Editing data is disabled in demo mode.");
      return;
    }
    if (!academyId) return;
    try {
      const academyRef = doc(db, 'academies', academyId);
      await updateDoc(academyRef, details);
    } catch (e) {
      handleFirestoreError(e as any, 'updating academy contact details');
      alert("Failed to update contact details. Please try again.");
      throw e;
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
    setPage('select-student-for-fees');
  }

  const handleSelectStudentForFees = (studentId: string) => {
    setSelectedStudentId(studentId);
    setPage('student-fee-details');
  }
  
  if (!dataConsentGiven && !isUsingPlaceholderConfig) {
    return <DataConsentModal onAccept={handleAcceptDataConsent} />;
  }
  
  if (isLoading) {
    return <div className="bg-slate-50 min-h-screen"><SplashScreen /></div>;
  }
  
  if (currentUser?.role === 'student') {
      if (!currentAcademy) {
          return <div className="bg-slate-50 min-h-screen"><SplashScreen /></div>;
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
          </div>
      );
  }

  if (!currentUser) {
    return (
        <div className="bg-gray-50 font-sans min-h-screen">
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
      case 'fees-options':
        return <FeesOptionsPage onBack={() => setPage('dashboard')} onNavigate={setPage}/>;
      case 'select-batch-for-fees':
        return <SelectBatchForFeesPage onBack={() => setPage('fees-options')} batches={batches} onSelectBatch={handleSelectBatchForFees} />;
      case 'fee-dues-list':
        return <FeeDuesListPage onBack={() => setPage('fees-options')} students={students} batches={batches} feeCollections={feeCollections} />;
      case 'fee-collection-report':
        return <FeeCollectionReportPage onBack={() => setPage('fees-options')} feeCollections={feeCollections} />;
      case 'student-options':
        if (batchFilter) setBatchFilter(null);
        return <StudentOptionsPage onBack={() => setPage('dashboard')} onNavigate={setPage} />;
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
      case 'inactive-students':
        return <InactiveStudentsPage onBack={() => setPage('student-options')} students={students} batches={batches} onToggleStudentStatus={toggleStudentStatus} />;
      case 'birthday-list':
        return <BirthdayListPage onBack={() => setPage('student-options')} students={students} />;
      case 'registration-form-list':
        return <RegistrationFormListPage onBack={() => setPage('student-options')} students={students} onSelectStudent={handleViewRegistrationForm} />;
      case 'my-account':
        return <MyAccountPage onBack={() => setPage('dashboard')} onLogout={handleLogout} />;
      case 'contact-us':
        return <ContactUsPage onBack={() => setPage('dashboard')} onSave={updateAcademyContactDetails} academy={currentUser.data as Academy} />;
      case 'batches':
        return <BatchesPage onBack={() => setPage('dashboard')} onCreate={() => setPage('new-batch')} batches={batches} onViewStudents={handleViewBatchStudents} />;
      case 'dashboard':
      default:
        return <Dashboard onNavigate={setPage} academy={currentUser.data as Academy} />;
    }
  };
  
  if (page === 'select-student-for-fees') {
    const selectedBatch = batches.find(b => b.id === selectedBatchId);
    if (!selectedBatch) {
        setPage('select-batch-for-fees');
        return null;
    }
    const batchStudents = students.filter(s => s.batches.includes(selectedBatch.name) && s.isActive);
    return (
        <div className="bg-white min-h-screen font-sans flex flex-col md:max-w-lg md:mx-auto md:shadow-2xl">
            <SelectStudentForFeesPage onBack={() => setPage('select-batch-for-fees')} batch={selectedBatch} students={batchStudents} onSelectStudent={handleSelectStudentForFees} />
        </div>
    );
  }
  
  if (page === 'student-fee-details') {
    const selectedStudent = students.find(s => s.id === selectedStudentId);
    if (!selectedStudent) {
        setPage('select-batch-for-fees');
        return null;
    }
    return (
        <div className="bg-white min-h-screen font-sans flex flex-col md:max-w-lg md:mx-auto md:shadow-2xl">
            <StudentFeeDetailsPage 
                onBack={() => setPage('select-student-for-fees')} 
                student={selectedStudent} 
                feeCollections={feeCollections.filter(fc => fc.studentId === selectedStudent.id)}
                onSavePayment={saveFeePayment}
            />
        </div>
    );
  }

  if (page === 'new-batch') {
    return <div className="bg-white min-h-screen font-sans flex flex-col md:max-w-lg md:mx-auto md:shadow-2xl"><NewBatchPage onBack={() => setPage('batches')} onSave={addBatch} /></div>;
  }

  if (page === 'new-student') {
    return <div className="bg-white min-h-screen font-sans flex flex-col md:max-w-lg md:mx-auto md:shadow-2xl"><NewStudentPage onBack={() => setPage('student-options')} onSave={addStudent} batches={batches} /></div>;
  }
  
  if (page === 'edit-student') {
    const selectedStudent = students.find(s => s.id === selectedStudentId);
    if (!selectedStudent) {
        setPage('active-students');
        return null;
    }
    return <div className="bg-white min-h-screen font-sans flex flex-col md:max-w-lg md:mx-auto md:shadow-2xl"><EditStudentPage onBack={() => setPage('active-students')} onUpdate={updateStudent} student={selectedStudent} batches={batches} /></div>;
  }

  if (page === 'take-attendance') {
    const selectedBatch = batches.find(b => b.id === selectedBatchId);
    if (!selectedBatch || !academyId) {
      setPage('select-batch-attendance');
      return null; 
    }
    const batchStudents = students.filter(s => s.batches.includes(selectedBatch.name) && s.isActive);
    
    return <div className="bg-white min-h-screen font-sans flex flex-col md:max-w-lg md:mx-auto md:shadow-2xl"><TakeAttendancePage onBack={() => setPage('select-batch-attendance')} batch={selectedBatch} students={batchStudents} academyId={academyId} isDemoMode={isDemoMode} /></div>;
  }
  
  if (page === 'registration-form-view') {
    const selectedStudent = students.find(s => s.id === selectedStudentId);
    if (!selectedStudent) {
        setPage('registration-form-list');
        return null;
    }
    return <RegistrationFormViewPage onBack={() => setPage('active-students')} student={selectedStudent} />;
  }
  
  const academyData = currentUser.role === 'admin' ? currentUser.data : null;

  return (
    <div className="bg-slate-100 min-h-screen font-sans flex flex-col md:max-w-lg md:mx-auto md:shadow-2xl">
      <SideNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} onNavigate={setPage} onLogout={handleLogout} />
      {!isUsingPlaceholderConfig && criticalError && <ConnectionErrorBanner message={criticalError} onClose={() => setCriticalError(null)} />}
      {!isUsingPlaceholderConfig && isOffline && <OfflineIndicator />}
      {page === 'dashboard' && academyData && <Header academyName={academyData.name} academyId={academyData.academyId} onLogout={handleLogout} onToggleNav={() => setIsNavOpen(true)} />}
      <main className="flex-grow px-3 sm:px-4 py-4 relative">
        {renderPage()}
      </main>
      
      {page === 'dashboard' && <BottomNav onNavigate={setPage} activePage={page}/>}
    </div>
  );
}

export default App;