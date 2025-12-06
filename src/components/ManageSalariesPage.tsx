
import React, { useState, useMemo } from 'react';
import type { Staff, SalaryPayment } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { CustomDropdown } from './CustomDropdown';
import { PlusIcon } from './icons/PlusIcon';
import { SearchIcon } from './icons/SearchIcon';
import { TrashIcon } from './icons/TrashIcon';
import { XMarkIcon } from './icons/XMarkIcon';

interface ManageSalariesPageProps {
  onBack: () => void;
  staff: Staff[];
  salaryPayments: SalaryPayment[];
  onSave: (data: Omit<SalaryPayment, 'id' | 'createdAt' | 'transactionId'>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isDemoMode: boolean;
}

const PAYMENT_METHODS = ['Cash', 'Bank Transfer', 'Cheque', 'UPI'];

const AddSalaryModal: React.FC<{
    onClose: () => void;
    staff: Staff[];
    onSave: (data: Omit<SalaryPayment, 'id' | 'createdAt' | 'transactionId'>) => Promise<void>;
}> = ({ onClose, staff, onSave }) => {
    const [formData, setFormData] = useState({
        staffId: '',
        month: new Date().toISOString().substring(0, 7), // YYYY-MM
        paymentDate: new Date().toISOString().split('T')[0],
        amount: '',
        paymentMethod: 'Bank Transfer',
        remarks: ''
    });
    const [isSaving, setIsSaving] = useState(false);

    const activeStaff = staff.filter(s => s.isActive);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.staffId || !formData.amount) {
            alert("Please select a staff member and enter an amount.");
            return;
        }
        setIsSaving(true);
        const selectedStaff = staff.find(s => s.id === formData.staffId);
        
        try {
            await onSave({
                staffId: formData.staffId,
                staffName: selectedStaff?.name || 'Unknown Staff',
                month: formData.month,
                paymentDate: new Date(formData.paymentDate) as any, // Cast to any to satisfy Timestamp in parent
                amount: parseFloat(formData.amount),
                paymentMethod: formData.paymentMethod as any,
                remarks: formData.remarks
            });
            onClose();
        } catch (error) {
            console.error(error);
            alert("Failed to save salary payment.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-lg mx-auto flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Pay Salary</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><XMarkIcon className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-2 pb-4">
                    <CustomDropdown 
                        label="Select Staff" 
                        options={activeStaff.map(s => ({ value: s.id, label: `${s.name} (${s.staffId})` }))}
                        selectedValue={formData.staffId}
                        onSelect={(val) => setFormData(p => ({ ...p, staffId: val }))}
                        placeholder="Choose Staff Member"
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Salary Month</label>
                            <input 
                                type="month" 
                                value={formData.month} 
                                onChange={e => setFormData(p => ({ ...p, month: e.target.value }))}
                                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment Date</label>
                            <input 
                                type="date" 
                                value={formData.paymentDate} 
                                onChange={e => setFormData(p => ({ ...p, paymentDate: e.target.value }))}
                                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Net Amount (₹)</label>
                        <input 
                            type="number" 
                            value={formData.amount} 
                            onChange={e => setFormData(p => ({ ...p, amount: e.target.value }))}
                            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="0.00"
                            required
                        />
                    </div>

                    <CustomDropdown
                        label="Payment Method"
                        options={PAYMENT_METHODS.map(m => ({ value: m, label: m }))}
                        selectedValue={formData.paymentMethod}
                        onSelect={(val) => setFormData(p => ({ ...p, paymentMethod: val }))}
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Remarks (Optional)</label>
                        <textarea 
                            value={formData.remarks} 
                            onChange={e => setFormData(p => ({ ...p, remarks: e.target.value }))}
                            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                            rows={2}
                            placeholder="Bonus, deductions, etc."
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">Cancel</button>
                        <button type="submit" disabled={isSaving} className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors disabled:bg-indigo-400">
                            {isSaving ? 'Processing...' : 'Record Payment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export function ManageSalariesPage({ onBack, staff, salaryPayments, onSave, onDelete, isDemoMode }: ManageSalariesPageProps) {
    const [showModal, setShowModal] = useState(false);
    const [selectedStaffFilter, setSelectedStaffFilter] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');

    const staffOptions = useMemo(() => [
        { value: 'all', label: 'All Staff' },
        ...staff.map(s => ({ value: s.id, label: s.name }))
    ], [staff]);

    const sortedPayments = useMemo(() => {
        return [...salaryPayments].sort((a, b) => b.paymentDate.toMillis() - a.paymentDate.toMillis());
    }, [salaryPayments]);

    const filteredPayments = useMemo(() => {
        return sortedPayments.filter(p => {
            const matchesStaff = selectedStaffFilter === 'all' || p.staffId === selectedStaffFilter;
            const matchesSearch = p.staffName.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesStaff && matchesSearch;
        });
    }, [sortedPayments, selectedStaffFilter, searchTerm]);

    const handleDelete = async (id: string) => {
        if (isDemoMode) {
            alert("Demo mode: Cannot delete records.");
            return;
        }
        if (window.confirm("Are you sure you want to delete this payment record? The associated expense transaction will also be deleted.")) {
            await onDelete(id);
        }
    };

    return (
        <>
            <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
                <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-30">
                    <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-bold ml-2">Manage Salaries</h1>
                </header>

                <main className="flex-grow flex flex-col overflow-hidden">
                    {/* Filter Section - Fixed at top, z-index higher than list to allow dropdown overlap */}
                    <div className="p-4 pb-0 z-20 relative flex-shrink-0">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm space-y-3">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search by staff name..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none"
                                />
                                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>
                            <CustomDropdown 
                                options={staffOptions}
                                selectedValue={selectedStaffFilter}
                                onSelect={setSelectedStaffFilter}
                                placeholder="All Staff"
                            />
                        </div>
                    </div>

                    {/* Scrollable List Section */}
                    <div className="flex-grow overflow-y-auto p-4 pt-4 z-10 relative">
                        {filteredPayments.length === 0 ? (
                            <div className="text-center py-20 px-4">
                                <p className="text-lg text-gray-500 dark:text-gray-400">No salary records found.</p>
                                <p className="text-sm text-gray-400 mt-2">Click the + button to record a salary payment.</p>
                            </div>
                        ) : (
                            <div className="space-y-3 pb-20">
                                {filteredPayments.map(payment => (
                                    <div key={payment.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-green-500 flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-gray-800 dark:text-gray-100">{payment.staffName}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Salary Month: {new Date(payment.month + '-01').toLocaleDateString('default', { month: 'long', year: 'numeric' })}</p>
                                            <p className="text-xs text-gray-400 mt-1">Paid on: {payment.paymentDate.toDate().toLocaleDateString()}</p>
                                            {payment.remarks && <p className="text-xs text-gray-500 mt-1 italic">"{payment.remarks}"</p>}
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-green-600">₹{payment.amount.toLocaleString()}</p>
                                            <p className="text-xs text-gray-500">{payment.paymentMethod}</p>
                                            <button 
                                                onClick={() => handleDelete(payment.id)} 
                                                className="mt-2 p-1.5 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                                                aria-label="Delete payment"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>

                <button
                    onClick={() => setShowModal(true)}
                    className="absolute bottom-20 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-110 z-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    aria-label="Pay Salary"
                >
                    <PlusIcon className="w-8 h-8" />
                </button>
            </div>
            {showModal && <AddSalaryModal onClose={() => setShowModal(false)} staff={staff} onSave={onSave} />}
        </>
    );
}
