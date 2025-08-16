import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { PlusIcon } from './icons/PlusIcon';
import type { Batch } from '../types';

interface BatchesPageProps {
  onBack: () => void;
  onCreate: () => void;
  batches: Batch[];
}

export function BatchesPage({ onBack, onCreate, batches }: BatchesPageProps): React.ReactNode {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-200 transition-colors" aria-label="Go to dashboard">
          <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 ml-2">Batches</h2>
      </div>

      {batches.length === 0 ? (
        <div className="text-center py-20 px-4">
          <p className="text-lg text-gray-500 mb-4">No batches have been created yet.</p>
          <p className="text-gray-400">Click the <span className="font-bold text-purple-500">+</span> button to add your first batch.</p>
        </div>
      ) : (
        <div className="space-y-4 pb-20">
          {batches.map(batch => (
            <div key={batch.id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow duration-200">
              <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-lg text-gray-800">{batch.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{batch.teacher || 'No Teacher'} &middot; {batch.location || 'No Location'}</p>
                </div>
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">{batch.time || 'Unscheduled'}</span>
              </div>
              <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                <span className="font-medium">{batch.currentStudents} / {batch.maxSlots} Students</span>
                <div className="flex space-x-1">
                    {batch.days.map(day => <span key={day} className="text-xs font-semibold">{day}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={onCreate}
        className="absolute bottom-4 right-4 bg-purple-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-600 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        aria-label="Create New Batch"
      >
        <PlusIcon className="w-8 h-8" />
      </button>
    </div>
  );
}