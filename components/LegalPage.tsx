
import React from 'react';

export const LegalPage: React.FC<{ onBack: () => void, onNavigate: (page: string) => void }> = ({ onBack, onNavigate }) => {
    const policies = [
        { name: 'Privacy Policy', page: 'privacy-policy' },
        { name: 'Terms and Conditions', page: 'terms-and-conditions' },
        { name: 'Shipping Policy', page: 'shipping-policy' },
        { name: 'Cancellation and Refund Policy', page: 'cancellation-and-refund-policy' },
        { name: 'Contact Us', page: 'contact-us' },
    ];

    return (
        <div className="p-4">
            <button onClick={onBack} className="mb-4 text-blue-500">
                &larr; Back
            </button>
            <h1 className="text-2xl font-bold mb-4">Legal & Policies</h1>
            <div className="space-y-4">
                {policies.map(policy => (
                    <div key={policy.page} className="p-4 border rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => onNavigate(policy.page)}>
                        <h2 className="text-lg font-semibold">{policy.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};
