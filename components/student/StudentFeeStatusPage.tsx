
import React from 'react';
import type { Student, FeeCollection } from '../../types';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';

const getFeeStatusMonths = (student: Student, feeCollections: FeeCollection[]) => {
    const statusMonths: { month: string; status: 'Paid' | 'Pending'; details: FeeCollection | null }[] = [];
    if (!student.admissionDate || !student.feeType) return statusMonths;

    const paidMonthsMap = new Map<string, FeeCollection>();
    feeCollections.forEach(fc => {
        paidMonthsMap.set(fc.feeForMonth, fc);
    });

    const admissionDate = new Date(student.admissionDate);
    const today = new Date();
    
    if (student.feeType === 'Monthly') {
        let currentDate = new Date(admissionDate.getFullYear(), admissionDate.getMonth(), 1);
        while (currentDate <= today) {
            const monthString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
            if (paidMonthsMap.has(monthString)) {
                statusMonths.push({ month: monthString, status: 'Paid', details: paidMonthsMap.get(monthString)! });
            } else {
                statusMonths.push({ month: monthString, status: 'Pending', details: null });
            }
            currentDate.setMonth(currentDate.getMonth() + 1);
        }
    } else { // Yearly
        let cycleStartDate = new Date(admissionDate.getFullYear(), admissionDate.getMonth(), 1);
        while (cycleStartDate <= today) {
            const cycleStartString = `${cycleStartDate.getFullYear()}-${String(cycleStartDate.getMonth() + 1).padStart(2, '0')}`;
            if (paidMonthsMap.has(cycleStartString)) {
                statusMonths.push({ month: cycleStartString, status: 'Paid', details: paidMonthsMap.get(cycleStartString)! });
            } else {
                statusMonths.push({ month: cycleStartString, status: 'Pending', details: null });
            }
            cycleStartDate.setFullYear(cycleStartDate.getFullYear() + 1);
        }
    }
    
    // Reverse the array to show the most recent month first
    return statusMonths.reverse();
};

export function StudentFeeStatusPage({ student, feeCollections, onBack }: { student: Student, feeCollections: FeeCollection[], onBack: () => void }) {
    const feeStatusMonths = getFeeStatusMonths(student, feeCollections);

    return (
        <div className="bg-slate-100 flex flex-col h-screen animate-fade-in md:max-w-lg md:mx-auto md:shadow-2xl">
            <div className="flex-shrink-0 sticky top-0 z-10">
                <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md">
                    <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back to dashboard">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-bold ml-2">Tuition Fee Status</h1>
                </header>
                
                <div className="p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">{student.name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{student.rollNumber}</p>
                    <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold mt-1">{student.feeType} Fee: ₹{student.feeAmount || 0}</p>
                </div>
            </div>
            
            <main className="flex-grow p-4 overflow-y-auto">
                {feeStatusMonths.length > 0 ? (
                    <div className="space-y-3">
                        {feeStatusMonths.map(({ month, status, details }) => {
                            const monthDate = new Date(month + '-02');
                            let monthName;
                            if (student.feeType === 'Yearly') {
                                const endDate = new Date(monthDate);
                                endDate.setFullYear(endDate.getFullYear() + 1);
                                endDate.setDate(endDate.getDate() - 1);
                                monthName = `Year: ${monthDate.getFullYear()} - ${endDate.getFullYear()}`;
                            } else {
                                monthName = monthDate.toLocaleString('default', { month: 'long', year: 'numeric' });
                            }
                            const isPaid = status === 'Paid';

                            return (
                                <div key={month} className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${isPaid ? 'border-green-500' : 'border-red-500'}`}>
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold text-gray-800">{monthName}</p>
                                        <div className={`text-sm font-bold px-2 py-0.5 rounded-full ${isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {status}
                                        </div>
                                    </div>
                                    <div className="mt-2 text-sm text-gray-600 border-t pt-2">
                                        {isPaid && details ? (
                                            <>
                                                <p>Amount Paid: <span className="font-semibold text-gray-900">₹{details.amountPaid.toFixed(2)}</span></p>
                                                <p>Payment Date: <span className="font-semibold text-gray-900">{details.paymentDate.toDate().toLocaleDateString('en-GB')}</span></p>
                                                {details.discount > 0 && <p className="text-orange-600">Discount: <span className="font-semibold">₹{details.discount.toFixed(2)}</span></p>}
                                            </>
                                        ) : (
                                            <p>Amount Due: <span className="font-semibold text-red-700">₹{student.feeAmount?.toFixed(2) || '0.00'}</span></p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20 px-4">
                        <p className="text-lg text-gray-500">No fee records found.</p>
                        <p className="text-sm text-gray-400 mt-2">Your fee history will appear here once payments are recorded.</p>
                    </div>
                )}
            </main>
        </div>
    );
}