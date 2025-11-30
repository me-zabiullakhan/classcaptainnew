
import React from 'react';

export const ShippingPolicyPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <div className="p-4">
            <button onClick={onBack} className="mb-4 text-blue-500">
                &larr; Back
            </button>
            <h1 className="text-2xl font-bold mb-4">Shipping Policy</h1>
            <div className="space-y-4">
                <p>
                    This is our Shipping Policy section. Please update this with your shipping information.
                </p>
                {/* Add more sections as needed */}
            </div>
        </div>
    );
};
