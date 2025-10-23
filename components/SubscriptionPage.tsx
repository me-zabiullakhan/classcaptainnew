import React from 'react';
import type { Academy } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { CheckIcon } from './icons/CheckIcon';

interface SubscriptionPageProps {
    onBack: () => void;
    academy: Academy;
    onSubscribe: (plan: 'monthly' | 'quarterly' | 'yearly', months: number) => Promise<void>;
}

const PlanCard = ({ title, price, period, features, isPopular, onSelect, isCurrent, isLoading, disabled }: {
    title: string;
    price: string;
    period: string;
    features: string[];
    isPopular?: boolean;
    onSelect: () => void;
    isCurrent: boolean;
    isLoading: boolean;
    disabled: boolean;
}) => (
    <div className={`relative border-2 rounded-xl p-6 ${isPopular ? 'border-indigo-600' : 'border-gray-200 dark:border-gray-700'} bg-white dark:bg-gray-800`}>
        {isPopular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>}
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h3>
        <p className="mt-4">
            <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{price}</span>
            <span className="text-base font-medium text-gray-500 dark:text-gray-400">/{period}</span>
        </p>
        <ul className="mt-6 space-y-4">
            {features.map(feature => (
                <li key={feature} className="flex items-center space-x-3">
                    <CheckIcon className="w-5 h-5 text-green-500" />
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                </li>
            ))}
        </ul>
        <button 
            onClick={onSelect}
            disabled={isCurrent || isLoading || disabled}
            className={`mt-8 w-full py-3 px-6 rounded-lg font-bold text-center transition-colors ${
                isCurrent 
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-300 dark:disabled:bg-indigo-800'
            }`}
        >
            {isLoading ? 'Processing...' : (isCurrent ? 'Current Plan' : 'Choose Plan')}
        </button>
    </div>
);

const plans = [
    { id: 'monthly', title: 'Monthly', price: '₹499', period: 'mo', months: 1, features: ["Up to 100 students", "All core features", "Email support"] },
    { id: 'quarterly', title: 'Quarterly', price: '₹1299', period: '3-mo', months: 3, features: ["Up to 300 students", "All core features", "Priority email support"], isPopular: true },
    { id: 'yearly', title: 'Yearly', price: '₹4999', period: 'yr', months: 12, features: ["Unlimited students", "All core features", "Phone & email support"] },
];

export function SubscriptionPage({ onBack, academy, onSubscribe }: SubscriptionPageProps) {
    const [isLoading, setIsLoading] = React.useState<string | null>(null);

    const handleSubscribe = async (plan: 'monthly' | 'quarterly' | 'yearly', months: number) => {
        setIsLoading(plan);
        try {
            await onSubscribe(plan, months);
        } catch (error) {
            console.error("Subscription failed:", error);
            alert("Subscription failed. Please try again.");
        } finally {
            setIsLoading(null);
        }
    };

    const StatusIndicator = () => {
        const { subscriptionStatus, trialEndsAt, subscriptionEndsAt } = academy;
        let text = "Your subscription is expired.";
        let color = "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300";

        if (subscriptionStatus === 'trialing' && trialEndsAt) {
            const daysLeft = Math.ceil((trialEndsAt.toMillis() - Date.now()) / (1000 * 60 * 60 * 24));
            text = daysLeft > 0 ? `You are on a trial with ${daysLeft} day(s) remaining.` : "Your trial has expired.";
            color = daysLeft > 0 ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300" : color;
        } else if (subscriptionStatus === 'active' && subscriptionEndsAt) {
            const endDate = subscriptionEndsAt.toDate().toLocaleDateString();
            text = `Your ${academy.plan || ''} plan is active until ${endDate}.`;
            color = "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300";
        }
        
        return <div className={`p-3 rounded-lg text-sm font-semibold text-center ${color}`}>{text}</div>;
    };

    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Subscription & Billing</h1>
            </header>
            <main className="flex-grow p-4 overflow-y-auto">
                <StatusIndicator />
                <div className="text-center my-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Choose Your Plan</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Select the perfect plan for your institute's needs.</p>
                </div>
                <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
                    {plans.map(plan => (
                        <PlanCard 
                            key={plan.id}
                            title={plan.title}
                            price={plan.price}
                            period={plan.period}
                            features={plan.features}
                            isPopular={plan.isPopular}
                            onSelect={() => handleSubscribe(plan.id as any, plan.months)}
                            isCurrent={academy.plan === plan.id && academy.subscriptionStatus === 'active'}
                            isLoading={isLoading === plan.id}
                            disabled={!!isLoading}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}
