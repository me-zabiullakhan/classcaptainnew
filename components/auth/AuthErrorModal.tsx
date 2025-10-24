
import React from 'react';
import { WarningIcon } from '../icons/WarningIcon';
import { ClipboardDocumentIcon } from '../icons/ClipboardDocumentIcon';

interface AuthErrorModalProps {
    onClose: () => void;
}

const firestoreRules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // --- Default Deny All ---
    match /{document=**} {
      allow read, write: if false;
    }

    // --- ACADEMIES COLLECTION ---
    // Allow any authenticated user (including anonymous) to query ('list') and 
    // fetch ('get') academy documents. This is CRUCIAL for student/staff login 
    // to find the academy by its user-facing ID.
    match /academies/{document} {
      allow get, list: if request.auth != null;
    }

    // --- ACADEMY SUBCOLLECTIONS ---
    // Allow any authenticated user to read from subcollections (like students, staff).
    // This is needed to verify credentials and fetch data after a successful login.
    match /academies/{academyId}/{subcollection}/{docId} {
        allow read: if request.auth != null;
    }
    
    // --- ADMIN-ONLY WRITE ACCESS ---
    // Function to check if the user is the owner of the academy.
    function isOwner(academyId) {
      return request.auth.uid == get(/databases/$(database)/documents/academies/$(academyId)).data.adminUid;
    }

    // Allow admins to write to their academy document and all its subcollections.
    match /academies/{academyId}/{document=**} {
      allow write: if isOwner(academyId);
    }

    // --- USER MAPPING & COUNTERS ---
    // Allow users to create and read their own mapping doc during registration.
    match /users/{userId} {
      allow read, create: if request.auth.uid == userId;
    }
    
    // Allow admins to create/update student/staff ID counters.
    match /counters/{counterId} {
      allow write: if request.auth != null;
    }
  }
}`;

export function AuthErrorModal({ onClose }: AuthErrorModalProps) {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(firestoreRules).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100] p-4">
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-lg mx-auto text-left animate-fade-in-up max-h-[90vh] flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/40">
                        <WarningIcon className="h-7 w-7 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="flex-grow">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Login Failed: Configuration Required</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                           The student/staff login requires specific settings in your Firebase project. Please complete the one-time setup steps below.
                        </p>
                    </div>
                </div>

                <div className="space-y-4 overflow-y-auto pr-2 flex-grow">
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                        <h3 className="font-bold text-gray-800 dark:text-gray-200"><span className="font-mono bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm w-6 h-6 inline-flex items-center justify-center mr-2">1</span>Enable Anonymous Sign-In</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">This allows the app to temporarily get read-only access to verify student/staff details without a password.</p>
                        <ol className="list-decimal list-inside text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1 pl-2">
                           <li>Go to your <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">Firebase Console</a>.</li>
                           <li>Navigate to <span className="font-semibold">Authentication</span> → <span className="font-semibold">Sign-in method</span>.</li>
                           <li>Click <span className="font-semibold">Add new provider</span> and select <span className="font-semibold">Anonymous</span>.</li>
                           <li>Enable the provider and click Save.</li>
                        </ol>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-gray-800 dark:text-gray-200"><span className="font-mono bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm w-6 h-6 inline-flex items-center justify-center mr-2">2</span>Set Firestore Security Rules</h3>
                            <button onClick={handleCopy} className="flex items-center gap-1.5 px-2 py-1 text-xs font-semibold bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600">
                                <ClipboardDocumentIcon className="w-4 h-4" />
                                {copied ? 'Copied!' : 'Copy Rules'}
                            </button>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">These rules allow read access for login, while restricting all write operations to the academy admin.</p>
                         <ol className="list-decimal list-inside text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1 pl-2">
                           <li>Go to <span className="font-semibold">Firestore Database</span> → <span className="font-semibold">Rules</span> tab.</li>
                           <li>Replace the entire content with the code below.</li>
                        </ol>
                        <pre className="mt-2 text-xs bg-black text-white p-3 rounded-md overflow-x-auto"><code>{firestoreRules}</code></pre>
                    </div>
                </div>

                <div className="mt-6 flex-shrink-0">
                    <button 
                        onClick={onClose}
                        className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                    >
                        I've completed the steps, Try Again
                    </button>
                </div>
            </div>
        </div>
    );
}