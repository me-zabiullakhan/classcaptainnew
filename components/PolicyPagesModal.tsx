
import React, { useState } from 'react';

interface PolicyPagesModalProps {
    onClose: () => void;
    onSubmit: (policyData: any) => void;
}

const PolicySection = ({ title, name, options, selected, onChange, icon }) => (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-lg font-semibold flex items-center text-gray-800 dark:text-gray-100">
            {icon}
            <span className="ml-2">{title}</span>
            <span className="ml-2 text-sm font-normal bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full dark:bg-orange-900/40 dark:text-orange-300">Missing</span>
        </h3>
        <div className="mt-4 space-y-3">
            {options.map(option => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={selected === option.value}
                        onChange={e => onChange(name, e.target.value)}
                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-indigo-600 dark:ring-offset-gray-800"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{option.label}</span>
                </label>
            ))}
        </div>
    </div>
);

const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

const BoxIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m0 0v10l8 4m0-14L4 7" />
    </svg>
);

const DocumentIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);


export function PolicyPagesModal({ onClose, onSubmit }: PolicyPagesModalProps) {
    const [policyChoices, setPolicyChoices] = useState({
        contactUs: '',
        shippingPolicy: '',
        terms: '',
    });

    const handleChoiceChange = (section: string, value: string) => {
        setPolicyChoices(prev => ({ ...prev, [section]: value }));
    };

    const handleSubmit = () => {
        onSubmit(policyChoices);
    };

    const contactOptions = [
        { label: 'Yes I have the link for this', value: 'link' },
        { label: 'No, create this page for me', value: 'create' },
    ];

    const shippingOptions = [
        { label: 'Yes I have the link for this', value: 'link' },
        { label: 'No, create this page for me', value: 'create' },
        { label: 'NA', value: 'na' },
    ];
    
    const termsOptions = [
        { label: 'Yes I have the link for this', value: 'link' },
        { label: 'No, create this page for me', value: 'create' },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md">
                <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Required policy pages on your website</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-6 space-y-5">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        If you don't have any of these required pages/details, we'll help you create them.
                    </p>
                    
                    <PolicySection 
                        title="Contact Us"
                        name="contactUs"
                        icon={<PhoneIcon />}
                        options={contactOptions}
                        selected={policyChoices.contactUs}
                        onChange={handleChoiceChange}
                    />

                    <PolicySection
                        title="Shipping Policy"
                        name="shippingPolicy"
                        icon={<BoxIcon />}
                        options={shippingOptions}
                        selected={policyChoices.shippingPolicy}
                        onChange={handleChoiceChange}
                    />

                    <PolicySection
                        title="Terms and Conditions"
                        name="terms"
                        icon={<DocumentIcon />}
                        options={termsOptions}
                        selected={policyChoices.terms}
                        onChange={handleChoiceChange}
                    />
                </div>
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="w-full sm:w-auto bg-blue-600 text-white font-bold py-2 px-8 rounded-lg hover:bg-blue-700 transition-colors shadow-md disabled:bg-blue-400"
                    >
                        Proceed
                    </button>
                </div>
            </div>
        </div>
    );
}
