
import React from 'react';

export const TermsAndConditionsPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <div className="p-4">
            <button onClick={onBack} className="mb-4 text-blue-500">
                &larr; Back
            </button>
            <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
            <div className="space-y-4">
                <p>
                    Please read these terms and conditions carefully before using Our Service.
                </p>
                <h2 className="text-xl font-bold">Interpretation and Definitions</h2>
                <p>
                    The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                </p>
                {/* Add more sections as needed */}
            </div>
        </div>
    );
};
