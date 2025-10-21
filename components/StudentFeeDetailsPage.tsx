
import React from 'react';
import type { Student, FeeCollection } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { CalendarIcon } from './icons/CalendarIcon';

interface StudentFeeDetailsPageProps {
  onBack: () => void;
  student: Student;
  feeCollections: FeeCollection[];
  onSavePayment: (paymentData: Omit<FeeCollection, 'id'>) => Promise<void>;
}

const getPendingMonths = (student: Student, paidMonths: Set<string>): string[] => {
    if (!student.admissionDate || !student.feeType) return [];

    const pending: string[] = [];
    const admissionDate = new Date(student.admissionDate);
    const today = new Date();
    
    if (student.feeType === 'Monthly') {
        let currentDate = new Date(admissionDate.getFullYear(), admissionDate.getMonth(), 1);
        while (currentDate <= today) {
            const monthString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
            if (!paidMonths.has(monthString)) {
                pending.push(monthString);
            }
            currentDate.setMonth(currentDate.getMonth() + 1);
        }
    } else { // Handles 'Yearly'
        let cycleStartDate = new Date(admissionDate.getFullYear(), admissionDate.getMonth(), 1);
        while (cycleStartDate <= today) {
            const cycleStartString = `${cycleStartDate.getFullYear()}-${String(cycleStartDate.getMonth() + 1).padStart(2, '0')}`;
            if (!paidMonths.has(cycleStartString)) {
                pending.push(cycleStartString);
            }
            cycleStartDate.setFullYear(cycleStartDate.getFullYear() + 1);
        }
    }

    return pending;
};

const PaymentModal = ({ month, student, onSave, onClose }: { month: string, student: Student, onSave: (data: Omit<FeeCollection, 'id'>) => Promise<void>, onClose: () => void }) => {
    const [paymentDate, setPaymentDate] = React.useState(new Date().toISOString().split('T')[0]);
    const [paymentMode, setPaymentMode] = React.useState<'Cash' | 'UPI' | 'Card' | 'Other'>('Cash');
    const [discount, setDiscount] = React.useState('0');
    const [isSaving, setIsSaving] = React.useState(false);
    const [saveError, setSaveError] = React.useState<string | null>(null);

    const totalAmount = student.feeAmount || 0;
    const discountAmount = parseFloat(discount) || 0;
    const finalAmount = Math.max(0, totalAmount - discountAmount);
    
    let monthFormatted;
    if (student.feeType === 'Yearly') {
        const startDate = new Date(month + '-02');
        const endDate = new Date(startDate);
        endDate.setFullYear(endDate.getFullYear() + 1);
        endDate.setDate(endDate.getDate() - 1);
        monthFormatted = `${startDate.toLocaleString('default', { month: 'long', year: 'numeric' })} - ${endDate.toLocaleString('default', { month: 'long', year: 'numeric' })}`;
    } else {
        monthFormatted = new Date(month + '-02').toLocaleString('default', { month: 'long', year: 'numeric' });
    }


    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setSaveError(null);
        try {
            await onSave({
                studentId: student.id,
                studentName: student.name,
                studentRollNumber: student.rollNumber,
                batchNames: student.batches,
                paymentDate: paymentDate as any, // Will be converted to timestamp in App.tsx
                feeForMonth: month,
                totalAmount: totalAmount,
                discount: discountAmount,
                amountPaid: finalAmount,
                paymentMode: paymentMode,
                createdAt: new Date() as any, // Placeholder, will be replaced
            });
            // On success, the parent component will close the modal
        } catch (error: any) {
            if (error.code === 'demo-mode') {
                setSaveError(error.message);
            } else {
                setSaveError("Save failed. Check connection and try again.");
            }
            console.error(error);
            setIsSaving(false); // Only stop saving on error, success unmounts
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in p-4">
            <form onSubmit={handleSave} className="bg-white rounded-lg shadow-xl m-4 w-full max-w-sm flex flex-col">
                <h3 className="text-lg font-bold p-4 border-b text-center bg-gray-50 rounded-t-lg">Collect Fee for {monthFormatted}</h3>
                <div className="p-4 space-y-4">
                    <div>
                        <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-700">Payment Date</label>
                        <div className="relative mt-1">
                            <input id="paymentDate" type="date" value={paymentDate} onChange={e => setPaymentDate(e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                            <label htmlFor="paymentDate" className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                                <CalendarIcon className="w-5 h-5 text-gray-400" />
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Payment Mode</label>
                        <select value={paymentMode} onChange={e => setPaymentMode(e.target.value as any)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                            <option>Cash</option>
                            <option>UPI</option>
                            <option>Card</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Discount (₹)</label>
                        <input type="number" value={discount} onChange={e => setDiscount(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="0" />
                    </div>
                    <div className="border-t pt-3 mt-3 space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-gray-600">Total Amount:</span> <span className="font-semibold">₹{totalAmount.toFixed(2)}</span></div>
                        <div className="flex justify-between text-red-600"><span className="text-gray-600">Discount:</span> <span className="font-semibold">- ₹{discountAmount.toFixed(2)}</span></div>
                        <div className="flex justify-between text-lg font-bold text-indigo-700"><span className="text-gray-800">Final Amount:</span> <span>₹{finalAmount.toFixed(2)}</span></div>
                    </div>
                     {saveError && <div className="bg-red-50 text-red-700 text-sm text-center p-3 rounded-lg border border-red-200">{saveError}</div>}
                </div>
                <div className="p-4 bg-gray-50 rounded-b-lg grid grid-cols-2 gap-3">
                    <button type="button" onClick={onClose} disabled={isSaving} className="w-full bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
                    <button type="submit" disabled={isSaving} className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-300">
                        {isSaving ? 'Saving...' : 'Collect Fee'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export function StudentFeeDetailsPage({ onBack, student, feeCollections, onSavePayment }: StudentFeeDetailsPageProps) {
    const [selectedMonth, setSelectedMonth] = React.useState<string | null>(null);
    const [showSuccess, setShowSuccess] = React.useState(false);
    
    const paidMonths = new Set(feeCollections.map(fc => fc.feeForMonth));
    const pendingMonths = getPendingMonths(student, paidMonths);

    const handleSave = async (data: Omit<FeeCollection, 'id'>) => {
        try {
            await onSavePayment(data);
            setSelectedMonth(null);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
        } catch (error) {
            // Re-throw the error so the modal can catch it and display the message
            throw error;
        }
    };

    return (
        <>
            <div className="bg-slate-100 flex flex-col h-full animate-fade-in">
                <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0">
                    <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back to student selection">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-bold ml-2">Student Fee Details</h1>
                </header>

                <div className="p-4 bg-white border-b flex-shrink-0">
                    <h2 className="text-lg font-bold text-gray-800">{student.name}</h2>
                    <p className="text-sm text-gray-500">{student.rollNumber}</p>
                    <p className="text-sm text-indigo-600 font-semibold mt-1">{student.feeType} Fee: ₹{student.feeAmount || 0}</p>
                </div>

                <main className="flex-grow p-4 overflow-y-auto">
                    <h3 className="font-bold text-gray-700 mb-3">Pending Fees</h3>
                    {pendingMonths.length > 0 ? (
                        <div className="space-y-3">
                            {pendingMonths.map(month => {
                                const monthDate = new Date(month + '-02'); // Use day 2 to avoid timezone issues
                                let monthLabel;
                                if (student.feeType === 'Yearly') {
                                    const endDate = new Date(monthDate);
                                    endDate.setFullYear(endDate.getFullYear() + 1);
                                    endDate.setDate(endDate.getDate() - 1);
                                    monthLabel = `Year: ${monthDate.getFullYear()} - ${endDate.getFullYear()}`;
                                } else {
                                    monthLabel = `${monthDate.toLocaleString('default', { month: 'long' })}, ${monthDate.getFullYear()}`;
                                }
                                return (
                                    <div key={month} className="bg-white p-3 rounded-lg shadow-sm border flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-gray-800">{monthLabel}</p>
                                            <p className="text-sm text-red-600">Amount Due: ₹{student.feeAmount || 0}</p>
                                        </div>
                                        <button onClick={() => setSelectedMonth(month)} className="bg-green-600 text-white font-bold py-1.5 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm">
                                            Pay Now
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-20 px-4 bg-green-50 rounded-lg">
                             <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
                            <p className="text-lg text-green-800 mt-4 font-semibold">All fees paid!</p>
                            <p className="text-sm text-gray-600 mt-2">There are no pending fees for this student.</p>
                        </div>
                    )}
                </main>
            </div>
            {selectedMonth && <PaymentModal month={selectedMonth} student={student} onSave={handleSave} onClose={() => setSelectedMonth(null)} />}
            {showSuccess && (
                <div className="fixed top-5 right-5 bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg animate-fade-in z-50">
                    Payment Saved Successfully!
                </div>
            )}
        </>
    );
}
