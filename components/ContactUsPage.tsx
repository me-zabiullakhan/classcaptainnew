
import React from 'react';

export const ContactUsPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <div className="p-4">
            <button onClick={onBack} className="mb-4 text-blue-500">
                &larr; Back
            </button>
            <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
            <div className="space-y-4">
                <p>
                    If you have any questions about these Terms and Conditions, You can contact us:
                </p>
                <ul>
                    <li>By email: [Your Email]</li>
                    <li>By phone number: [Your Phone]</li>
                </ul>
                {/* Add more sections as needed */}
            </div>
        </div>
    );
};
