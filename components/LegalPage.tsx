
import React, { useState } from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { XMarkIcon } from './icons/XMarkIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { LockIcon } from './icons/LockIcon';
import { FileTextIcon } from './icons/FileTextIcon';
import { CreditCardIcon } from './icons/CreditCardIcon';
import { DataUsageIcon } from './icons/DataUsageIcon';

type LegalSection = 'privacy' | 'refund' | 'subscription' | 'data' | 'terms';

interface LegalPageProps {
  onBack: () => void;
  initialSection?: LegalSection;
}

const SECTIONS: { id: LegalSection; title: string; icon: React.ReactNode }[] = [
    { id: 'privacy', title: 'Privacy Policy', icon: <LockIcon className="w-5 h-5" /> },
    { id: 'terms', title: 'Terms & Conditions', icon: <FileTextIcon className="w-5 h-5" /> },
    { id: 'refund', title: 'Refund Policy', icon: <CreditCardIcon className="w-5 h-5" /> },
    { id: 'subscription', title: 'Subscription Policy', icon: <ShieldCheckIcon className="w-5 h-5" /> },
    { id: 'data', title: 'Data Sharing', icon: <DataUsageIcon className="w-5 h-5" /> },
];

const LegalContent = ({ section }: { section: LegalSection }) => {
    switch (section) {
        case 'privacy':
            return (
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Privacy Policy</h3>
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    <p>At OptiLearn, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.</p>
                    
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mt-4">1. Information We Collect</h4>
                    <p>We collect information you provide directly to us, such as when you create an account, update your profile, or communicate with us. This may include name, email, phone number, and institute details.</p>
                    
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mt-4">2. How We Use Your Information</h4>
                    <p>We use the information we collect to provide, maintain, and improve our services, to process transactions, and to communicate with you.</p>
                    
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mt-4">3. Data Security</h4>
                    <p>We implement appropriate technical and organizational measures to protect the security of your personal information.</p>
                </div>
            );
        case 'refund':
            return (
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Refund Policy</h3>
                    <p>We strive to ensure your satisfaction with our services.</p>
                    
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mt-4">1. Trial Period</h4>
                    <p>We offer a 7-day free trial for new academies. You will not be charged during this period.</p>
                    
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mt-4">2. Subscription Refunds</h4>
                    <p>Subscriptions are billed in advance. We do not offer refunds for partial months or unused portions of annual subscriptions once the payment is processed, except where required by law.</p>
                    
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mt-4">3. Cancellation</h4>
                    <p>You may cancel your subscription at any time. Your access will continue until the end of the current billing cycle.</p>
                </div>
            );
        case 'subscription':
            return (
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Subscription Policy</h3>
                    
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mt-4">1. Billing Cycle</h4>
                    <p>The membership fee for the OptiLearn service will be charged to your Payment Method on the specific payment date indicated on the "Account" page.</p>
                    
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mt-4">2. Payment Methods</h4>
                    <p>To use the OptiLearn service you must provide one or more Payment Methods. You authorize us to charge any Payment Method associated to your account in case your primary Payment Method is declined.</p>
                    
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mt-4">3. Changes to Price</h4>
                    <p>We reserve the right to change our subscription plans or adjust pricing for our service or any components thereof in any manner and at any time as we may determine in our sole and absolute discretion.</p>
                </div>
            );
        case 'data':
            return (
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">App Data Sharing</h3>
                    
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mt-4">1. Third-Party Services</h4>
                    <p>We do not sell your personal data to third parties. We may share data with trusted third-party service providers (e.g., payment processors like Razorpay, cloud hosting like Firebase) solely for the purpose of providing our services.</p>
                    
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mt-4">2. Student Data</h4>
                    <p>Student data entered into the system belongs to the Academy. We act as a data processor. We do not use student data for marketing purposes.</p>
                    
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mt-4">3. Legal Requirements</h4>
                    <p>We may disclose your information if required to do so by law or in the good faith belief that such action is necessary to comply with a legal obligation.</p>
                </div>
            );
        case 'terms':
            return (
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Terms & Conditions</h3>
                    <p>Welcome to OptiLearn.</p>
                    
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mt-4">1. Acceptance of Terms</h4>
                    <p>By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.</p>
                    
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mt-4">2. User Accounts</h4>
                    <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms.</p>
                    
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mt-4">3. Intellectual Property</h4>
                    <p>The Service and its original content, features, and functionality are and will remain the exclusive property of OptiLearn and its licensors.</p>
                </div>
            );
        default:
            return <p>Select a section</p>;
    }
};

export function LegalPage({ onBack, initialSection = 'privacy' }: LegalPageProps) {
    const [activeSection, setActiveSection] = useState<LegalSection>(initialSection);

    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Legal & Policies</h1>
            </header>

            <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
                {/* Sidebar Menu */}
                <div className="w-full md:w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 overflow-y-auto flex-shrink-0">
                    <div className="p-2 space-y-1">
                        {SECTIONS.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                                    activeSection === item.id
                                        ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                            >
                                {item.icon}
                                {item.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <main className="flex-grow p-6 md:p-8 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 md:p-10 rounded-2xl shadow-sm">
                        <LegalContent section={activeSection} />
                    </div>
                </main>
            </div>
        </div>
    );
}

// Export a Modal version for use in Login/Registration screens
export function LegalModal({ onClose, initialSection = 'privacy' }: { onClose: () => void; initialSection?: LegalSection }) {
    const [activeSection, setActiveSection] = useState<LegalSection>(initialSection);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Legal Information</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <XMarkIcon className="w-6 h-6 text-gray-500" />
                    </button>
                </div>
                
                <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
                    <div className="w-full md:w-64 bg-gray-50 dark:bg-gray-800/50 border-r dark:border-gray-700 overflow-y-auto p-2 space-y-1 flex-shrink-0">
                        {SECTIONS.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                                    activeSection === item.id
                                        ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            >
                                {item.icon}
                                {item.title}
                            </button>
                        ))}
                    </div>
                    <div className="flex-grow p-6 overflow-y-auto bg-white dark:bg-gray-800">
                        <LegalContent section={activeSection} />
                    </div>
                </div>
                
                <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-right">
                    <button onClick={onClose} className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
