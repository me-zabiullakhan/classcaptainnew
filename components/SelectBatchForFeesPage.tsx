
import React from 'react';
import type { Batch } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { SearchIcon } from './icons/SearchIcon';

interface SelectBatchForFeesPageProps {
  onBack: () => void;
  batches: Batch[];
  onSelectBatch: (batchId: string) => void;
}

export function SelectBatchForFeesPage({ onBack, batches, onSelectBatch }: SelectBatchForFeesPageProps): React.ReactNode {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredBatches = batches.filter(batch =>
    batch.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <header className="bg-indigo-700 text-white p-3 flex items-center justify-between shadow-md flex-shrink-0">
        <div className="flex items-center">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back to fee options">
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold ml-2">Select Batch for Fees</h1>
        </div>
      </header>

      <main className="flex-grow p-4 overflow-y-auto">
        <div className="relative mb-4">
            <input
                type="text"
                placeholder="Search batch..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        {filteredBatches.length > 0 ? (
          <div className="space-y-3">
            {filteredBatches.map(batch => (
              <button 
                key={batch.id} 
                onClick={() => onSelectBatch(batch.id)}
                className="w-full bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-left"
              >
                <h3 className="font-bold text-indigo-800">{batch.name}</h3>
                <p className="text-sm text-gray-500">{batch.teacher} &middot; {batch.time}</p>
                <p className="text-sm text-gray-600 mt-2">{batch.currentStudents} / {batch.maxSlots} Students</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4">
            <p className="text-lg text-gray-500">No batches found.</p>
            <p className="text-sm text-gray-400 mt-2">Create a batch to start collecting fees.</p>
          </div>
        )}
      </main>
    </div>
  );
}
