
import React, { useState, useMemo } from 'react';
import type { Transaction } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { FilterIcon } from './icons/FilterIcon';
import { TrashIcon } from './icons/TrashIcon';
import { PencilIcon } from './icons/PencilIcon';

interface IncomeExpensesPageProps {
  onBack: () => void;
  transactions: Transaction[];
  isDemoMode: boolean;
  onSave: (data: Omit<Transaction, 'id' | 'createdAt' | 'attachmentUrl'>) => Promise<void>;
  onUpdate: (id: string, data: Partial<Omit<Transaction, 'id' | 'createdAt'>>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const CATEGORIES = {
    Income: ["Tuition Fees", "Admission Fees", "Stationery Sales", "Other Income"],
    Expense: ["Salary", "Rent", "Electricity Bill", "Maintenance", "Stationery Purchase", "Other Expense"]
};

const PAYMENT_METHODS: Transaction['paymentMethod'][] = ['Cash', 'UPI', 'Bank Transfer', 'Other'];

const TransactionForm = ({ onSave, onCancel, initialData, isDemoMode }: { 
    onSave: (data: any) => Promise<void>; 
    onCancel: () => void;
    initialData?: Transaction | null;
    isDemoMode: boolean;
}) => {
    const [formData, setFormData] = useState({
        type: initialData?.type || 'Expense',
        category: initialData?.category || '',
        amount: initialData?.amount || '',
        paymentMethod: initialData?.paymentMethod || 'Cash',
        description: initialData?.description || '',
        date: initialData?.date.toDate().toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'type') {
            setFormData(prev => ({ ...prev, type: value, category: '' }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isDemoMode) {
            alert("This is a demo. Data cannot be saved.");
            return;
        }
        setIsSaving(true);
        try {
            await onSave({ ...formData, amount: parseFloat(formData.amount as string) });
        } catch (error) {
            console.error(error);
            alert("Failed to save transaction.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                {(['Expense', 'Income'] as const).map(type => (
                    <button type="button" key={type} onClick={() => handleChange({ target: { name: 'type', value: type } } as any)} className={`py-3 rounded-lg font-bold text-center transition-colors ${formData.type === type ? (type === 'Income' ? 'bg-green-600 text-white' : 'bg-red-600 text-white') : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
                        {type}
                    </button>
                ))}
            </div>
             <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} required className="mt-1 w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600">
                    <option value="">Select Category</option>
                    {CATEGORIES[formData.type as 'Income' | 'Expense'].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>
             <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
                <input type="number" name="amount" value={formData.amount} onChange={handleChange} required placeholder="0.00" className="mt-1 w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Payment Method</label>
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required className="mt-1 w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600">
                    {PAYMENT_METHODS.map(method => <option key={method} value={method}>{method}</option>)}
                </select>
            </div>
             <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required className="mt-1 w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600" />
            </div>
             <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={3} placeholder="Add a note..." className="mt-1 w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"></textarea>
            </div>
            <div className="flex gap-3 pt-2">
                <button type="button" onClick={onCancel} disabled={isSaving} className="w-full py-2 px-4 rounded-md bg-gray-200 dark:bg-gray-600 font-semibold">Cancel</button>
                <button type="submit" disabled={isSaving} className="w-full py-2 px-4 rounded-md bg-indigo-600 text-white font-semibold disabled:bg-indigo-300">
                    {isSaving ? 'Saving...' : (initialData ? 'Update' : 'Save')}
                </button>
            </div>
        </form>
    );
};

export function IncomeExpensesPage({ onBack, transactions, onSave, onUpdate, onDelete, isDemoMode }: IncomeExpensesPageProps) {
    const [activeTab, setActiveTab] = useState('view'); // view, add, reports
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
    const [filterState, setFilterState] = useState({
        startDate: '',
        endDate: '',
        category: 'all'
    });
    
    const sortedTransactions = useMemo(() => [...transactions].sort((a, b) => b.date.toMillis() - a.date.toMillis()), [transactions]);
    
    const filteredTransactions = useMemo(() => {
        return sortedTransactions.filter(tx => {
            const txDate = tx.date.toDate();
            const start = filterState.startDate ? new Date(filterState.startDate) : null;
            const end = filterState.endDate ? new Date(filterState.endDate) : null;
            if(start) start.setHours(0,0,0,0);
            if(end) end.setHours(23,59,59,999);

            const dateMatch = (!start || txDate >= start) && (!end || txDate <= end);
            const categoryMatch = filterState.category === 'all' || tx.category === filterState.category;
            return dateMatch && categoryMatch;
        });
    }, [sortedTransactions, filterState]);
    
    const { totalIncome, totalExpenses, netBalance } = useMemo(() => {
        const totals = filteredTransactions.reduce((acc, tx) => {
            if (tx.type === 'Income') acc.totalIncome += tx.amount;
            else acc.totalExpenses += tx.amount;
            return acc;
        }, { totalIncome: 0, totalExpenses: 0 });
        return { ...totals, netBalance: totals.totalIncome - totals.totalExpenses };
    }, [filteredTransactions]);

    const allCategories = useMemo(() => ['all', ...new Set(transactions.map(t => t.category))], [transactions]);

    const handleSaveNew = async (data: any) => {
        await onSave(data);
        setActiveTab('view');
    };
    
    const handleUpdate = async (data: any) => {
        if(!editingTransaction) return;
        await onUpdate(editingTransaction.id, data);
        setEditingTransaction(null);
    };

    const handleDelete = async (id: string) => {
        if(window.confirm("Are you sure you want to delete this transaction?")) {
            await onDelete(id);
        }
    };
    
    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Income / Expenses</h1>
            </header>

            <div className="p-2 bg-white dark:bg-gray-800 shadow-sm flex-shrink-0">
                <div className="flex justify-around bg-gray-100 dark:bg-gray-900 p-1 rounded-lg">
                    <button onClick={() => setActiveTab('add')} className={`w-full py-2 rounded-md font-semibold ${activeTab === 'add' ? 'bg-indigo-600 text-white' : 'dark:text-gray-300'}`}>Add Entry</button>
                    <button onClick={() => setActiveTab('view')} className={`w-full py-2 rounded-md font-semibold ${activeTab === 'view' ? 'bg-indigo-600 text-white' : 'dark:text-gray-300'}`}>View All</button>
                    <button onClick={() => setActiveTab('reports')} className={`w-full py-2 rounded-md font-semibold ${activeTab === 'reports' ? 'bg-indigo-600 text-white' : 'dark:text-gray-300'}`}>Reports</button>
                </div>
            </div>

            <main className="flex-grow p-4 overflow-y-auto">
                {activeTab === 'add' && <TransactionForm onSave={handleSaveNew} onCancel={() => setActiveTab('view')} isDemoMode={isDemoMode} />}
                {activeTab === 'view' && (
                    <div className="space-y-4">
                        {/* Filters */}
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm space-y-3">
                           <div className="grid grid-cols-2 gap-3">
                               <input type="date" value={filterState.startDate} onChange={e => setFilterState(p => ({...p, startDate: e.target.value}))} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600" aria-label="Start Date"/>
                               <input type="date" value={filterState.endDate} onChange={e => setFilterState(p => ({...p, endDate: e.target.value}))} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600" aria-label="End Date"/>
                           </div>
                           <select value={filterState.category} onChange={e => setFilterState(p => ({...p, category: e.target.value}))} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600">
                               {allCategories.map(cat => <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>)}
                           </select>
                        </div>
                        {editingTransaction ? <TransactionForm onSave={handleUpdate} onCancel={() => setEditingTransaction(null)} initialData={editingTransaction} isDemoMode={isDemoMode}/> : 
                        filteredTransactions.length > 0 ? filteredTransactions.map(tx => (
                            <div key={tx.id} className={`p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border-l-4 ${tx.type === 'Income' ? 'border-green-500' : 'border-red-500'}`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-gray-800 dark:text-gray-100">{tx.category}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{tx.date.toDate().toLocaleDateString()}</p>
                                    </div>
                                    <p className={`font-bold text-lg ${tx.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>₹{tx.amount.toFixed(2)}</p>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{tx.description}</p>
                                <div className="flex justify-between items-center mt-3 pt-2 border-t dark:border-gray-700">
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">{tx.paymentMethod}</p>
                                    <div className="flex gap-2">
                                        <button onClick={() => setEditingTransaction(tx)} className="p-1.5 text-blue-600 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/40"><PencilIcon className="w-4 h-4"/></button>
                                        <button onClick={() => handleDelete(tx.id)} className="p-1.5 text-red-600 rounded-full hover:bg-red-100 dark:hover:bg-red-900/40"><TrashIcon className="w-4 h-4"/></button>
                                    </div>
                                </div>
                            </div>
                        )) : <p className="text-center text-gray-500 pt-10">No transactions found.</p>}
                    </div>
                )}
                {activeTab === 'reports' && (
                     <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                           <div className="grid grid-cols-2 gap-3">
                               <input type="date" value={filterState.startDate} onChange={e => setFilterState(p => ({...p, startDate: e.target.value}))} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600" aria-label="Start Date"/>
                               <input type="date" value={filterState.endDate} onChange={e => setFilterState(p => ({...p, endDate: e.target.value}))} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600" aria-label="End Date"/>
                           </div>
                        </div>
                        <div className="p-4 bg-green-100 dark:bg-green-900/40 rounded-lg text-center">
                            <p className="text-sm font-medium text-green-800 dark:text-green-300">Total Income</p>
                            <p className="text-3xl font-bold text-green-600 dark:text-green-400">₹{totalIncome.toFixed(2)}</p>
                        </div>
                         <div className="p-4 bg-red-100 dark:bg-red-900/40 rounded-lg text-center">
                            <p className="text-sm font-medium text-red-800 dark:text-red-300">Total Expenses</p>
                            <p className="text-3xl font-bold text-red-600 dark:text-red-400">₹{totalExpenses.toFixed(2)}</p>
                        </div>
                        <div className={`p-4 rounded-lg text-center ${netBalance >= 0 ? 'bg-blue-100 dark:bg-blue-900/40' : 'bg-orange-100 dark:bg-orange-900/40'}`}>
                            <p className={`text-sm font-medium ${netBalance >= 0 ? 'text-blue-800 dark:text-blue-300' : 'text-orange-800 dark:text-orange-300'}`}>Net Balance</p>
                            <p className={`text-3xl font-bold ${netBalance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>₹{netBalance.toFixed(2)}</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
