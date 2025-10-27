import React from 'react';
import type { Student } from '../../types';
import { FeesIcon } from '../icons/FeesIcon';

export const FeeReminderPopup: React.FC<{
  pendingMonths: string[];
  totalDue: number;
  studentFeeType: Student['feeType'];
  onClose: () => void;
  onNavigate: (page: string) => void;
}> = ({ pendingMonths, totalDue, studentFeeType, onClose, onNavigate }) => {
    
    const handlePayNow = () => {
        onNavigate('fee-status');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-sm mx-auto text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/40 mb-5">
                    <FeesIcon className="h-9 w-9 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-3">Fee Reminder</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">You have pending fees for the following {studentFeeType === 'Yearly' ? 'year(s)' : 'month(s)'}:</p>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-left text-sm mb-4">
                    <ul className="list-disc list-inside space-y-1">
                        {pendingMonths.map(month => {
                            const date = new Date(month + '-02');
                            const label = studentFeeType === 'Yearly' ? date.getFullYear() : date.toLocaleString('default', { month: 'long', year: 'numeric' });
                            return <li key={month}>{label}</li>;
                        })}
                    </ul>
                </div>
                <div className="text-lg font-bold mb-6">
                    Total Amount Due: <span className="text-red-600 dark:text-red-400">₹{totalDue.toFixed(2)}</span>
                </div>
                <div className="flex flex-col gap-3">
                    <button onClick={handlePayNow} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                        Pay Now
                    </button>
                    <button onClick={onClose} className="w-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};