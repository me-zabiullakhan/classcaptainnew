
import React from 'react';
import type { Academy } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { CheckIcon } from './icons/CheckIcon';
import { XMarkIcon } from './icons/XMarkIcon';
import { PLATFORM_CONFIG } from '../platformConfig';

// Add this global declaration for TypeScript to recognize the Razorpay script
declare global {
    interface Window {
        Razorpay: any;
    }
}

interface SubscriptionPageProps {
    onBack: () => void;
    academy: Academy;
    onSubscribe: (plan: 'monthly' | 'quarterly' | 'yearly', months: number, paymentDetails: { paymentId: string; amount: number }) => Promise<void>;
    isModal?: boolean;
}

interface PlanCardProps {
    title: string;
    price: string;
    period: string;
    features: string[];
    isPopular?: boolean;
    onSelect: () => void;
    isCurrent: boolean;
    isLoading: boolean;
    disabled: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({ title, price, period, features, isPopular, onSelect, isCurrent, isLoading, disabled }) => (
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

const formatLimit = (limit: number) => limit === Infinity ? 'Unlimited' : limit;

const plans = [
    { 
        id: 'monthly', 
        title: 'Monthly', 
        price: '₹499', 
        period: 'mo', 
        months: 1, 
        amount: 49900, 
        features: [`Up to ${formatLimit(PLATFORM_CONFIG.plans.monthly.limit)} students`, "All core features", "Email support"] 
    },
    { 
        id: 'quarterly', 
        title: 'Quarterly', 
        price: '₹1299', 
        period: '3-mo', 
        months: 3, 
        amount: 129900, 
        features: [`Up to ${formatLimit(PLATFORM_CONFIG.plans.quarterly.limit)} students`, "All core features", "Priority email support"], 
        isPopular: true 
    },
    { 
        id: 'yearly', 
        title: 'Yearly', 
        price: '₹4999', 
        period: 'yr', 
        months: 12, 
        amount: 499900, 
        features: [`${formatLimit(PLATFORM_CONFIG.plans.yearly.limit)} students`, "All core features", "Phone & email support"] 
    },
];

export function SubscriptionPage({ onBack, academy, onSubscribe, isModal = false }: SubscriptionPageProps) {
    const [isLoading, setIsLoading] = React.useState<string | null>(null);

    const handlePayment = async (plan: typeof plans[0]) => {
        const platformKey = PLATFORM_CONFIG.razorpayKeyId;

        if (!platformKey || platformKey.includes('YOUR_PLATFORM_KEY')) {
            alert("Payment configuration is missing. Please contact the platform administrator.");
            return;
        }

        setIsLoading(plan.id);

        const options = {
            key: platformKey, // Use the Platform's Key ID
            amount: plan.amount,
            currency: "INR",
            name: "Class Captain Subscription",
            description: `Payment for ${plan.title} Plan`,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCAyOCAyNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAgMTIgSDE4IFYxNSBIMjIgVjIxIEg2IFYxNSBIMTAgVjEyIFoiIGZpbGw9IiNENUwMDAwIi8+PHBhdGggZD0iTTggNSBIMjAgTDE4IDExIEgxMCBaIiBmaWxsPSIjRDUwMDAwIi8+PC9zdmc+",
            handler: async (response: any) => {
                try {
                    await onSubscribe(plan.id as any, plan.months, { paymentId: response.razorpay_payment_id, amount: plan.amount });
                } catch (error) {
                    console.error("Firestore update failed after payment:", error);
                    alert("Payment was successful, but we couldn't update your subscription. Please contact support.");
                } finally {
                    setIsLoading(null);
                }
            },
            prefill: {
                name: academy.adminName || academy.name,
                email: academy.adminEmail,
                contact: academy.contactPhone || ""
            },
            notes: {
                academy_id: academy.id,
                academy_name: academy.name
            },
            theme: {
                color: "#4f46e5"
            },
            modal: {
                ondismiss: () => {
                    setIsLoading(null);
                }
            }
        };

        try {
            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response: any){
                alert("Payment failed. Please try again. Error: " + response.error.description);
                console.error('Payment Failed:', response.error);
                setIsLoading(null);
            });
            rzp.open();
        } catch (error) {
            console.error("Razorpay Error:", error);
            alert("Could not initialize payment gateway. Please check your internet connection and try again.");
            setIsLoading(null);
        }
    };

    const StatusIndicator = () => {
        const { subscriptionStatus, trialEndsAt, subscriptionEndsAt } = academy;
        let text = "Your subscription is expired.";
        let color = "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300";
        let dateInfo = "";

        if (subscriptionStatus === 'trialing' && trialEndsAt) {
            const daysLeft = Math.ceil((trialEndsAt.toMillis() - Date.now()) / (1000 * 60 * 60 * 24));
            text = daysLeft > 0 ? `Trial Active: ${daysLeft} day(s) remaining.` : "Trial Expired";
            color = daysLeft > 0 ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300" : color;
            dateInfo = `Expires on: ${trialEndsAt.toDate().toLocaleDateString()}`;
        } else if (subscriptionStatus === 'active' && subscriptionEndsAt) {
            const endDate = subscriptionEndsAt.toDate().toLocaleDateString();
            text = `Plan Active: ${academy.plan ? academy.plan.charAt(0).toUpperCase() + academy.plan.slice(1) : ''}`;
            color = "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300";
            dateInfo = `Expires on: ${endDate}`;
        }
        
        return (
            <div className={`p-4 rounded-lg flex flex-col items-center justify-center ${color} mb-6 border`}>
                <span className="font-bold text-lg">{text}</span>
                {dateInfo && <span className="text-sm mt-1 opacity-90">{dateInfo}</span>}
            </div>
        );
    };

    const plansContent = (
         <>
            <StatusIndicator />
            <div className="text-center my-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Choose Your Plan</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Select the perfect plan for your institute's needs.</p>
            </div>
            <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8 mb-8">
                {plans.map(plan => (
                    <PlanCard 
                        key={plan.id}
                        title={plan.title}
                        price={plan.price}
                        period={plan.period}
                        features={plan.features}
                        isPopular={plan.isPopular}
                        onSelect={() => handlePayment(plan)}
                        isCurrent={academy.plan === plan.id && academy.subscriptionStatus === 'active'}
                        isLoading={isLoading === plan.id}
                        disabled={!!isLoading}
                    />
                ))}
            </div>
        </>
    );

    if (isModal) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
                <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
                    <header className="flex-shrink-0 p-4 flex justify-between items-center border-b dark:border-gray-700 bg-white dark:bg-gray-800 rounded-t-2xl">
                         <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Subscription & Billing</h1>
                         <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                            <XMarkIcon className="w-6 h-6 text-gray-600 dark:text-gray-300"/>
                        </button>
                    </header>
                    <main className="flex-grow p-4 overflow-y-auto">
                        {plansContent}
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Subscription & Billing</h1>
            </header>
            <main className="flex-grow p-4 overflow-y-auto">
                {plansContent}
            </main>
        </div>
    );
}
