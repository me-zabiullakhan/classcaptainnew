import React, { useState } from 'react';
import { CreditCardIcon } from './icons/CreditCardIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { SubscriptionPage } from './SubscriptionPage';
import type { Academy } from '../types';

interface SubscriptionExpiredPageProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
  academy: Academy;
  onSubscribe: (plan: 'monthly' | 'quarterly' | 'yearly', months: number) => Promise<void>;
}

export function SubscriptionExpiredPage({ onNavigate, onLogout, academy, onSubscribe }: SubscriptionExpiredPageProps): React.ReactNode {
    const [showPlans, setShowPlans] = useState(false);

    return (
        <>
            <div className="fixed inset-0 bg-gray-100 dark:bg-gray-900 flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg max-w-md mx-auto text-center animate-fade-in-up">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/40 mb-5">
                        <CreditCardIcon className="h-9 w-9 text-red-600 dark:text-red-400" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Subscription Expired</h2>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
                        Your trial period has ended. Please choose a subscription plan to continue using Class Captain and manage your institute.
                    </p>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => setShowPlans(true)}
                            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                        >
                            Choose a Plan
                        </button>
                        <button
                            onClick={onLogout}
                            className="w-full flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            <LogoutIcon className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
            {showPlans && (
                <SubscriptionPage 
                    isModal={true} 
                    onBack={() => setShowPlans(false)} 
                    academy={academy} 
                    onSubscribe={onSubscribe} 
                />
            )}
        </>
    );
}