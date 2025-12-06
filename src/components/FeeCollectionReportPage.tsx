import React, { useState } from 'react';
import type { FeeCollection } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { SearchIcon } from './icons/SearchIcon';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';
import { CalendarIcon } from './icons/CalendarIcon';

interface FeeCollectionReportPageProps {
  onBack: () => void;
  feeCollections: FeeCollection[];
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, data: { paymentDate: string; paymentMode: FeeCollection['paymentMode']; discount: number; }) => Promise<void>;
  isDemoMode: boolean;
}

const EditFeeModal = ({ fee, onSave, onClose, isDemoMode }: { fee: FeeCollection; onSave: (id: string, data: any) => Promise<void>; onClose: () => void; isDemoMode: boolean; }) => {
    const getSafeDateString = (d: any) => {
        if (!d) return new Date().toISOString().split('T')[0];
        if (typeof d.toDate === 'function') { // Firestore Timestamp
            return d.toDate().toISOString().split('T')[0];
        }
        // Fallback for strings or JS Date objects
        const date = new Date(d);
        if (!isNaN(date.getTime())) {
            return date.toISOString().split('T')[0];
        }
        return new Date().toISOString().split('T')[0];
    };

    const [formData, setFormData] = useState({
        paymentDate: getSafeDateString(fee.paymentDate),
        paymentMode: fee.paymentMode,
        discount: String(fee.discount),
    });
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    const totalAmount = fee.totalAmount;
    const discountAmount = parseFloat(formData.discount) || 0;
    const finalAmount = Math.max(0, totalAmount - discountAmount);
    
    const monthFormatted = new Date(fee.feeForMonth + '-02').toLocaleString('default', { month: 'long', year: 'numeric' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isDemoMode) {
            alert("Demo mode: Cannot update data.");
            return;
        }
        setIsSaving(true);
        setError('');
        try {
            await onSave(fee.id, {
                ...formData,
                discount: parseFloat(formData.discount)
            });
            onClose();
        } catch (err) {
            setError("Failed to update record. Please try again.");
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-xl m-4 w-full max-w-sm flex flex-col">
                <h3 className="text-lg font-bold p-4 border-b dark:border-gray-700 text-center bg-gray-50 dark:bg-gray-700/50 rounded-t-lg">Edit Fee for {monthFormatted}</h3>
                <div className="p-4 space-y-4">
                    <div>
                        <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Payment Date</label>
                        <div className="relative mt-1">
                            <input id="paymentDate" name="paymentDate" type="date" value={formData.paymentDate} onChange={handleChange} className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700" required />
                             <label htmlFor="paymentDate" className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400">
                                <CalendarIcon className="w-5 h-5" />
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Payment Mode</label>
                        <select name="paymentMode" value={formData.paymentMode} onChange={handleChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700">
                            <option>Cash</option> <option>UPI</option> <option>Card</option> <option>Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Discount (₹)</label>
                        <input type="number" name="discount" value={formData.discount} onChange={handleChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700" placeholder="0" />
                    </div>
                     <div className="border-t dark:border-gray-700 pt-3 mt-3 space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Total Amount:</span> <span className="font-semibold text-gray-800 dark:text-gray-100">₹{totalAmount.toFixed(2)}</span></div>
                        <div className="flex justify-between text-red-600"><span className="text-gray-600 dark:text-gray-400">Discount:</span> <span className="font-semibold">- ₹{discountAmount.toFixed(2)}</span></div>
                        <div className="flex justify-between text-lg font-bold text-indigo-700 dark:text-indigo-400"><span className="text-gray-800 dark:text-gray-100">Final Amount:</span> <span>₹{finalAmount.toFixed(2)}</span></div>
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                </div>
                 <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-b-lg grid grid-cols-2 gap-3">
                    <button type="button" onClick={onClose} disabled={isSaving} className="w-full bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 transition-colors">Cancel</button>
                    <button type="submit" disabled={isSaving} className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-300">
                        {isSaving ? 'Updating...' : 'Update Fee'}
                    </button>
                </div>
            </form>
        </div>
    );
};

const DeleteConfirmationModal = ({ onConfirm, onCancel, isDeleting }: { onConfirm: () => void; onCancel: () => void; isDeleting: boolean; }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/40 mb-5">
                <TrashIcon className="h-9 w-9 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Are you sure?</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
                This will permanently delete the fee record and its associated income transaction. This action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row-reverse gap-3">
                <button
                    onClick={onConfirm}
                    disabled={isDeleting}
                    className="w-full sm:w-auto flex-1 bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors shadow-md disabled:bg-red-300"
                >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
                <button
                    onClick={onCancel}
                    disabled={isDeleting}
                    className="w-full sm:w-auto flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
);


export function FeeCollectionReportPage({ onBack, feeCollections, onDelete, onUpdate, isDemoMode }: FeeCollectionReportPageProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [editingFee, setEditingFee] = React.useState<FeeCollection | null>(null);
  const [deletingFee, setDeletingFee] = React.useState<FeeCollection | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const sortedCollections = [...feeCollections].sort((a, b) => b.paymentDate.toMillis() - a.paymentDate.toMillis());

  const filteredCollections = sortedCollections.filter(fc =>
    fc.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fc.studentRollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (fee: FeeCollection) => {
    if (isDemoMode) {
        alert("Demo mode: Cannot delete data.");
        return;
    }
    setDeletingFee(fee);
  };

  const confirmDelete = async () => {
    if (!deletingFee) return;

    setIsDeleting(true);
    try {
        await onDelete(deletingFee.id);
        setDeletingFee(null); // Close modal on success
    } catch (error) {
        console.error("Failed to delete fee record:", error);
        alert("Failed to delete fee record. Please try again.");
    } finally {
        setIsDeleting(false);
    }
  };


  return (
    <>
    <div className="animate-fade-in flex flex-col h-full">
      <header className="bg-indigo-700 text-white p-3 flex items-center justify-between shadow-md flex-shrink-0 sticky top-0 z-10">
        <div className="flex items-center">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back to fee options">
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold ml-2">Fee Collection Report</h1>
        </div>
      </header>

      <main className="flex-grow p-4 overflow-y-auto">
        <div className="relative mb-4">
            <input
                type="text"
                placeholder="Search by name or roll no..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        {filteredCollections.length > 0 ? (
          <div className="space-y-3">
            {filteredCollections.map(fc => {
                const paymentDate = (fc.paymentDate as any)?.toDate ? (fc.paymentDate as any).toDate() : new Date(fc.paymentDate as any);
                const monthDate = new Date(fc.feeForMonth + '-02');
                return (
                    <div key={fc.id} className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-bold text-gray-800">{fc.studentName}</p>
                                <p className="text-sm text-gray-500">{fc.studentRollNumber}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg text-green-600">₹{fc.amountPaid.toFixed(2)}</p>
                                <p className="text-xs text-gray-500">{paymentDate.toLocaleDateString('en-GB')}</p>
                            </div>
                        </div>
                        <div className="text-xs text-gray-600 mt-2 pt-2 border-t">
                            <p>Fee for: <span className="font-semibold">{monthDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span></p>
                            {fc.discount > 0 && <p className="text-red-600">Discount: <span className="font-semibold">₹{fc.discount.toFixed(2)}</span></p>}
                        </div>
                        <div className="mt-2 pt-2 border-t flex justify-between items-center">
                            <p className="text-xs text-gray-500">Mode: <span className="font-semibold">{fc.paymentMode}</span></p>
                            <div className="flex space-x-2">
                                <button
                                  onClick={() => setEditingFee(fc)}
                                  className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                                >
                                  <PencilIcon className="w-4 h-4" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(fc)}
                                  className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
                                >
                                  <TrashIcon className="w-4 h-4" />
                                  <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
          </div>
        ) : (
          <div className="text-center py-20 px-4">
            <p className="text-lg text-gray-500">No fee collections recorded yet.</p>
            <p className="text-sm text-gray-400 mt-2">When you collect a fee, it will appear here.</p>
          </div>
        )}
      </main>
    </div>
    {editingFee && (
        <EditFeeModal 
          fee={editingFee}
          onSave={onUpdate}
          onClose={() => setEditingFee(null)}
          isDemoMode={isDemoMode}
        />
    )}
    {deletingFee && (
        <DeleteConfirmationModal
            onConfirm={confirmDelete}
            onCancel={() => setDeletingFee(null)}
            isDeleting={isDeleting}
        />
    )}
    </>
  );
}