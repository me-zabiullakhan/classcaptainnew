
import React from 'react';

export const PrivacyPolicyPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <div className="p-4">
            <button onClick={onBack} className="mb-4 text-blue-500">
                &larr; Back
            </button>
            <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
            <div className="space-y-4">
                <p>
                    Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website.
                </p>
                <p>
                    We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
                </p>
                {/* Add more sections as needed */}
            </div>
        </div>
    );
};
