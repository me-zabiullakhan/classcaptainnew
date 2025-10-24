

import React, { useState } from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { RefreshIcon } from './icons/RefreshIcon';
import type { Academy } from '../types';

// Define the structure for default templates and placeholders
type TemplateData = {
    title: string;
    template: string;
    placeholders: Record<string, string>;
};

const DEFAULT_TEMPLATES: Record<string, TemplateData> = {
    broadcast: {
        title: "Broadcast SMS",
        template: "Dear Parents, [MESSAGE]",
        placeholders: { '[MESSAGE]': 'Your custom message' }
    },
    studentRegistration: {
        title: "Student Registration SMS",
        template: "[STUDENT_NAME] is registered successfully with [ACADEMY_NAME] on date [DATE], FUTURE UPDATES WILL BE PROVIDED TO THIS NUMBER.\n\nThanks & Regards,\n[ACADEMY_NAME] ~",
        placeholders: {
            '[STUDENT_NAME]': 'for student name',
            '[ACADEMY_NAME]': 'for academy name',
            '[DATE]': 'for registration date',
        }
    },
    feeReminder: {
        title: "Fee Reminder SMS",
        template: "Gentle Fee Reminder.\nDear Parents, A fee of Rs. [FEES_AMOUNT] of [FEES_MONTHS] month(s) is pending for [STUDENT_NAME]([BATCH_NAME]). Kindly clear outstanding fee immediately to continue classes uninterrupted.\n\nThanks and Regards\n[ACADEMY_NAME] ~",
        placeholders: {
            '[STUDENT_NAME]': 'for student name',
            '[BATCH_NAME]': 'for batch name',
            '[ACADEMY_NAME]': 'for academy name',
            '[FEES_AMOUNT]': 'for amount',
            '[FEES_MONTHS]': 'for months'
        }
    },
    feeReceipt: {
        title: "Fee Receipt SMS",
        template: "Fees Rs. [FEES_AMOUNT] received from [STUDENT_NAME]([BATCH_NAME]) on date : [DATE]. Thanks and Regards [ACADEMY_NAME]",
        placeholders: {
            '[STUDENT_NAME]': 'for student name',
            '[BATCH_NAME]': 'for batch name',
            '[ACADEMY_NAME]': 'for academy name',
            '[FEES_AMOUNT]': 'for amount',
            '[DATE]': 'for payment date'
        }
    },
    salary: {
        title: "Salary SMS",
        template: "Salary Rs. [SALARY_AMOUNT] credit to [STAFF_NAME] on date : [DATE]. Thanks and Regards [ACADEMY_NAME]",
        placeholders: {
            '[STAFF_NAME]': 'for Staff Name',
            '[ACADEMY_NAME]': 'for academy name',
            '[SALARY_AMOUNT]': 'for amount',
            '[DATE]': 'for payment date'
        }
    },
    attendance: {
        title: "Attendance SMS",
        template: "Student : [STUDENT_NAME]([BATCH_NAME]) is *[STATUS]* for today's class Date : [DATE]\nRegards,\n[ACADEMY_NAME] ~\nNote: In case of queries call/message: *+91 9341771776*",
        placeholders: {
            '[STUDENT_NAME]': 'for student name',
            '[BATCH_NAME]': 'for batch name',
            '[STATUS]': 'for present/absent',
            '[DATE]': 'for attendance date'
        }
    },
    staffAttendance: {
        title: "Staff Attendance SMS",
        template: "Staff : [STAFF_NAME] is [STATUS] on [ACADEMY_NAME] Date : [DATE]",
        placeholders: {
            '[STAFF_NAME]': 'for student name',
            '[ACADEMY_NAME]': 'for academy name',
            '[STATUS]': 'for present/absent',
            '[DATE]': 'for attendance date'
        }
    },
    examMarks: {
        title: "Exam Marks SMS",
        template: "Student Name : [STUDENT_NAME]([BATCH_NAME])\nTopic : [EXAM_TOPIC]\nResult : [MARKS]/[MAX_MARKS] on [DATE]\nRegards,\n[ACADEMY_NAME] ~",
        placeholders: {
            '[STUDENT_NAME]': 'for student name',
            '[BATCH_NAME]': 'for batch name',
            '[ACADEMY_NAME]': 'for academy name',
            '[EXAM_TOPIC]': 'for exam topic',
            '[MARKS]': 'for obtained marks',
            '[MAX_MARKS]': 'for maximum marks',
            '[REMARKS]': 'for remarks',
            '[DATE]': 'for exam date'
        }
    },
    enquiryRegistered: {
        title: "Enquiry Registered SMS",
        template: "Welcome [STUDENT_NAME] to [ACADEMY_NAME]... You came to our academy enquiry for [ENQUIRY_TOPIC] on [DATE]",
        placeholders: {
            '[STUDENT_NAME]': 'for student name',
            '[ACADEMY_NAME]': 'for academy name',
            '[ENQUIRY_TOPIC]': 'for enquiry topic',
            '[DATE]': 'for enquiry date'
        }
    },
    birthdayWishes: {
        title: "Birthday Wishes SMS",
        template: "Dear [STUDENT_NAME],\n“Wishing you the best on your birthday and everything good in the year ahead.”\nFrom : [ACADEMY_NAME] ~",
        placeholders: {
            '[STUDENT_NAME]': 'for student name',
            '[ACADEMY_NAME]': 'for academy name'
        }
    }
};

const templateKeys = Object.keys(DEFAULT_TEMPLATES);

const SmsTemplateCard: React.FC<{ title: string; template: string; onClick: () => void; onReset: () => void; }> = ({ title, template, onClick, onReset }) => (
    <div onClick={onClick} className="w-full bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
        <div className="flex-1 overflow-hidden">
            <h3 className="font-semibold text-blue-600 dark:text-blue-400">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 truncate pr-2">{template.replace(/\n/g, ' ')}</p>
        </div>
        <button 
            onClick={(e) => {
                e.stopPropagation(); // Prevent the main click
                if (window.confirm(`Are you sure you want to reset the "${title}" template to its default?`)) {
                    onReset();
                }
            }}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 flex-shrink-0"
            aria-label={`Reset ${title} template`}
        >
            <RefreshIcon className="w-5 h-5" />
        </button>
    </div>
);

const EditSmsModal: React.FC<{
    templateKey: string;
    currentTemplate: string;
    onSave: (newTemplate: string) => void;
    onClose: () => void;
}> = ({ templateKey, currentTemplate, onSave, onClose }) => {
    const [template, setTemplate] = useState(currentTemplate);
    const data = DEFAULT_TEMPLATES[templateKey];

    const handleSave = () => {
        onSave(template);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-lg mx-auto flex flex-col max-h-[90vh]">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">{data.title}</h2>
                <textarea
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    className="w-full flex-grow p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    rows={8}
                />
                <div className="mt-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Available Placeholders:</p>
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(data.placeholders).map(([key, desc]) => (
                            <div key={key} title={desc} className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-xs font-mono px-2 py-1 rounded-md cursor-help">
                                {key}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-2.5 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition-colors">CANCEL</button>
                    <button onClick={handleSave} className="px-6 py-2.5 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 transition-colors">SAVE</button>
                </div>
            </div>
        </div>
    );
};


export function CustomSmsSettingsPage({ onBack, academy, onSave }: { onBack: () => void; academy: Academy; onSave: (details: Partial<Academy>) => void; }) {
    const [editingTemplateKey, setEditingTemplateKey] = useState<string | null>(null);
    
    const currentTemplates = { ...Object.fromEntries(Object.entries(DEFAULT_TEMPLATES).map(([key, val]) => [key, val.template])), ...academy.smsTemplates };
    
    const handleSaveTemplate = (templateKey: string, newTemplate: string) => {
        const newSmsTemplates = {
            ...academy.smsTemplates,
            [templateKey]: newTemplate,
        };
        onSave({ smsTemplates: newSmsTemplates });
    };

    const handleResetTemplate = (templateKey: string) => {
        const newSmsTemplates = { ...academy.smsTemplates };
        delete newSmsTemplates[templateKey];
        onSave({ smsTemplates: newSmsTemplates });
    };

    return (
        <>
            <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
                <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                    <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back to settings">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-bold ml-2">Custom SMS Settings</h1>
                </header>
                <main className="flex-grow p-4 overflow-y-auto">
                    <div className="space-y-3">
                        {templateKeys.map(key => (
                            <SmsTemplateCard 
                                key={key}
                                title={DEFAULT_TEMPLATES[key].title}
                                template={currentTemplates[key]}
                                onClick={() => setEditingTemplateKey(key)}
                                onReset={() => handleResetTemplate(key)}
                            />
                        ))}
                    </div>
                </main>
            </div>
            {editingTemplateKey && (
                <EditSmsModal
                    templateKey={editingTemplateKey}
                    currentTemplate={currentTemplates[editingTemplateKey]}
                    onSave={(newTemplate) => handleSaveTemplate(editingTemplateKey, newTemplate)}
                    onClose={() => setEditingTemplateKey(null)}
                />
            )}
        </>
    );
}