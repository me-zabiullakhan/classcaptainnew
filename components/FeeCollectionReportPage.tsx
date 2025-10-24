

import React from 'react';
import type { FeeCollection } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { SearchIcon } from './icons/SearchIcon';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';

interface FeeCollectionReportPageProps {
  onBack: () => void;
  feeCollections: FeeCollection[];
  onDelete: (id: string) => Promise<void>;
  onShowDevPopup: (featureName: string) => void;
  isDemoMode: boolean;
}

export function FeeCollectionReportPage({ onBack, feeCollections, onDelete, onShowDevPopup, isDemoMode }: FeeCollectionReportPageProps): React.ReactNode {
  const [searchTerm, setSearchTerm] = React.useState('');

  const sortedCollections = [...feeCollections].sort((a, b) => b.paymentDate.toMillis() - a.paymentDate.toMillis());

  const filteredCollections = sortedCollections.filter(fc =>
    fc.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fc.studentRollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (isDemoMode) {
        alert("Demo mode: Cannot delete data.");
        return;
    }
    if (window.confirm("Are you sure you want to delete this fee record? This will also delete the corresponding income transaction and cannot be undone.")) {
        try {
            await onDelete(id);
        } catch (error) {
            console.error("Failed to delete fee record:", error);
            alert("Failed to delete fee record. Please try again.");
        }
    }
  };


  return (
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
                const paymentDate = fc.paymentDate.toDate();
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
                                  onClick={() => onShowDevPopup('Edit Fee Collection')}
                                  className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                                >
                                  <PencilIcon className="w-4 h-4" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  onClick={() => handleDelete(fc.id)}
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
  );
}