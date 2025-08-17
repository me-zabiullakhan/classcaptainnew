
import React from 'react';
import type { FeeCollection } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { SearchIcon } from './icons/SearchIcon';

interface FeeCollectionReportPageProps {
  onBack: () => void;
  feeCollections: FeeCollection[];
}

export function FeeCollectionReportPage({ onBack, feeCollections }: FeeCollectionReportPageProps): React.ReactNode {
  const [searchTerm, setSearchTerm] = React.useState('');

  const sortedCollections = [...feeCollections].sort((a, b) => b.paymentDate.toMillis() - a.paymentDate.toMillis());

  const filteredCollections = sortedCollections.filter(fc =>
    fc.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fc.studentRollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <header className="bg-indigo-700 text-white p-3 flex items-center justify-between shadow-md w-full -mx-3 sm:-mx-4 mt-[-1rem]">
        <div className="flex items-center">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back to fee options">
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold ml-2">Fee Collection Report</h1>
        </div>
      </header>

      <main className="flex-grow p-4">
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
                             <p>Mode: <span className="font-semibold">{fc.paymentMode}</span></p>
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
