

import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { RefreshIcon } from './icons/RefreshIcon';

const smsTemplates = [
  { title: "Broadcast SMS", template: "..." },
  { title: "Student Registration SMS", template: "[STUDENT_NAME] is registered successfully with [ACADEMY_NAME] on date [DATE]..." },
  { title: "Fee Reminder SMS", template: "Gentle Fee Reminder. ..." },
  { title: "Fee Receipt SMS", template: "Fees Rs. [FEES_AMOUNT] received from [STUDENT_NAME]([BATCH_NAME]) on date : [DATE]. Thanks a..." },
  { title: "Salary SMS", template: "Salary Rs. [SALARY_AMOUNT] credit to [STAFF_NAME] on date : [DATE]. Thanks and Regards [ACADEM..." },
  { title: "Attendance SMS", template: "Student : [STUDENT_NAME]([BATCH_NAME]) is *[STATUS]* for today's class..." },
  { title: "Staff Attendance SMS", template: "Staff : [STAFF_NAME] is [STATUS] on [ACADEMY_NAME] Date : [DATE]" },
  { title: "Exam Marks SMS", template: "Student Name : [STUDENT_NAME]([BATCH_NAME])..." },
  { title: "Enquiry Registered SMS", template: "Welcome [STUDENT_NAME] to [ACADEMY_NAME]..." },
  { title: "Birthday Wishes SMS", template: "Dear [STUDENT_NAME]..." },
];

// FIX: Changed to React.FC to correctly handle the 'key' prop during list rendering.
const SmsTemplateCard: React.FC<{ title: string; template: string; onClick: () => void; onReset: () => void; }> = ({ title, template, onClick, onReset }) => (
    <button onClick={onClick} className="w-full bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
        <div className="flex-1 overflow-hidden">
            <h3 className="font-semibold text-blue-600 dark:text-blue-400">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 truncate pr-2">{template}</p>
        </div>
        <button 
            onClick={(e) => {
                e.stopPropagation(); // Prevent the main button click
                onReset();
            }}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 flex-shrink-0"
            aria-label={`Reset ${title} template`}
        >
            <RefreshIcon className="w-5 h-5" />
        </button>
    </button>
);


export function CustomSmsSettingsPage({ onBack, onShowDevPopup }: { onBack: () => void; onShowDevPopup: (feature: string) => void; }) {

    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back to settings">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Custom SMS Settings</h1>
            </header>
            <main className="flex-grow p-4 overflow-y-auto">
                <div className="space-y-3">
                    {smsTemplates.map(item => (
                        <SmsTemplateCard 
                            key={item.title}
                            title={item.title}
                            template={item.template}
                            onClick={() => onShowDevPopup(`Edit ${item.title}`)}
                            onReset={() => onShowDevPopup(`Reset ${item.title}`)}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}