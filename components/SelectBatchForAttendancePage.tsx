
import React from 'react';
import type { Batch } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { SearchIcon } from './icons/SearchIcon';

interface SelectBatchForAttendancePageProps {
  onBack: () => void;
  batches: Batch[];
  onSelectBatch: (batchId: string) => void;
}

const BatchAttendanceCard = ({ batch, onSelect }: { batch: Batch; onSelect: () => void; }) => (
  <button onClick={onSelect} className="w-full bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-left">
    <div className="flex justify-between items-start mb-4">
      <h3 className="font-bold text-indigo-800 text-base">{batch.name}</h3>
      <span className="text-sm text-gray-500 font-medium">{batch.time}</span>
    </div>
    <div className="grid grid-cols-3 text-center">
      <div>
        <p className="text-sm text-green-500">Present</p>
        <p className="font-bold text-lg text-gray-800">0</p>
      </div>
      <div>
        <p className="text-sm text-red-500">Absent</p>
        <p className="font-bold text-lg text-gray-800">0</p>
      </div>
      <div>
        <p className="text-sm text-orange-500">Leave</p>
        <p className="font-bold text-lg text-gray-800">0</p>
      </div>
    </div>
  </button>
);

export function SelectBatchForAttendancePage({ onBack, batches, onSelectBatch }: SelectBatchForAttendancePageProps): React.ReactNode {
  return (
    <div className="animate-fade-in flex flex-col h-full">
      <header className="bg-indigo-700 text-white p-3 flex items-center justify-between shadow-md w-full -mx-3 sm:-mx-4 mt-[-1rem]">
        <div className="flex items-center">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back to dashboard">
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold ml-2">Select Batch</h1>
        </div>
        <button className="p-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Search batches">
          <SearchIcon className="w-6 h-6" />
        </button>
      </header>

      <main className="flex-grow pt-4 pb-4">
        {batches.length > 0 ? (
          <div className="space-y-3">
            {batches.map(batch => (
              <BatchAttendanceCard key={batch.id} batch={batch} onSelect={() => onSelectBatch(batch.id)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4">
            <p className="text-lg text-gray-500">No batches with active students found.</p>
            <p className="text-sm text-gray-400 mt-2">Please create a batch and add students to take attendance.</p>
          </div>
        )}
      </main>
    </div>
  );
}
