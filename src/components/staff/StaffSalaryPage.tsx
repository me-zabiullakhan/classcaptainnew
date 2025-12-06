
import React, { useMemo } from 'react';
import type { SalaryPayment, Staff } from '../../types';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { IncomeIcon } from '../icons/IncomeIcon';

interface StaffSalaryPageProps {
    onBack: () => void;
    staff: Staff;
    salaryPayments: SalaryPayment[];
}

export function StaffSalaryPage({ onBack, staff, salaryPayments }: StaffSalaryPageProps) {
    const myPayments = useMemo(() => {
        return salaryPayments
            .filter(p => p.staffId === staff.id)
            .sort((a, b) => b.paymentDate.toMillis() - a.paymentDate.toMillis());
    }, [salaryPayments, staff.id]);

    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">My Salary History</h1>
            </header>

            <main className="flex-grow p-4 overflow-y-auto">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                        <IncomeIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Received</p>
                        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                            ₹{myPayments.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
                        </p>
                    </div>
                </div>

                {myPayments.length === 0 ? (
                    <div className="text-center py-20 px-4">
                        <p className="text-lg text-gray-500 dark:text-gray-400">No salary records found.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {myPayments.map(payment => (
                            <div key={payment.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-orange-500">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-gray-800 dark:text-gray-100">
                                            {new Date(payment.month + '-01').toLocaleDateString('default', { month: 'long', year: 'numeric' })}
                                        </h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Paid on {payment.paymentDate.toDate().toLocaleDateString()}</p>
                                    </div>
                                    <span className="text-lg font-bold text-green-600">₹{payment.amount.toLocaleString()}</span>
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-300 flex justify-between border-t dark:border-gray-700 pt-2 mt-2">
                                    <span>Method: {payment.paymentMethod}</span>
                                    {payment.remarks && <span className="italic truncate max-w-[150px]">{payment.remarks}</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
