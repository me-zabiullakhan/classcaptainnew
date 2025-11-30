
import React from 'react';

export const CancellationAndRefundPolicyPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <div className="p-4">
            <button onClick={onBack} className="mb-4 text-blue-500">
                &larr; Back
            </button>
            <h1 className="text-2xl font-bold mb-4">Cancellation and Refund Policy</h1>
            <div className="space-y-4">
                <p>
                    This is our Cancellation and Refund Policy section. Please update this with your policy details.
                </p>
                {/* Add more sections as needed */}
            </div>
        </div>
    );
};
