

import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { PlusIcon } from './icons/PlusIcon';
import type { Batch } from '../types';
import { PencilIcon } from './icons/PencilIcon';
import { StudentsIcon } from './icons/StudentsIcon';

interface BatchesPageProps {
  onBack: () => void;
  onCreate: () => void;
  batches: Batch[];
  onViewStudents: (batchName: string) => void;
  onEditBatch: (batchId: string) => void;
}

const formatTime12h = (timeString: string | undefined): string => {
    if (!timeString) {
      return 'Unscheduled';
    }
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)/;
    const match = timeString.match(timeRegex);
    
    if (!match) {
      return timeString;
    }
  
    let [_, hours, minutes] = match;
    let h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12; // the hour '0' should be '12'
    
    return `${h}:${minutes} ${ampm}`;
  };

export function BatchesPage({ onBack, onCreate, batches, onViewStudents, onEditBatch }: BatchesPageProps): React.ReactNode {
  return (
    <div className="animate-fade-in flex flex-col h-full">
      <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go to dashboard">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold ml-2">Batches</h1>
      </header>
      <main className="flex-grow p-4 overflow-y-auto">
        {batches.length === 0 ? (
          <div className="text-center py-20 px-4">
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">No batches have been created yet.</p>
            <p className="text-gray-400 dark:text-gray-500">Click the <span className="font-bold text-indigo-500">+</span> button to add your first batch.</p>
          </div>
        ) : (
          <div className="space-y-4 pb-20">
            {batches.map(batch => (
              <div key={batch.id} className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-l-4 ${batch.isActive ? 'border-indigo-500' : 'border-gray-400'} hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between`}>
                <div>
                  <div className="flex justify-between items-start">
                      <div>
                          <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">{batch.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{batch.teacher || 'No Teacher'} &middot; {batch.location || 'No Location'}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full flex-shrink-0">{formatTime12h(batch.time)}</span>
                         <span className={`text-xs px-2 py-1 rounded-full ${batch.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {batch.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">{batch.currentStudents} / {batch.maxSlots} Students</span>
                    <div className="flex space-x-1">
                        {batch.days.map(day => <span key={day} className="text-xs font-semibold">{day}</span>)}
                    </div>
                  </div>
                </div>

                <div className="border-t dark:border-gray-700 mt-4 pt-3 flex justify-end space-x-2">
                    <button
                      onClick={() => onEditBatch(batch.id)}
                      className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                      aria-label={`Edit batch ${batch.name}`}
                    >
                      <PencilIcon className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => onViewStudents(batch.name)}
                      className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
                      aria-label={`View students in ${batch.name}`}
                    >
                      <StudentsIcon className="w-4 h-4" />
                      <span>View Students</span>
                    </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <button
        onClick={onCreate}
        className="absolute bottom-20 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        aria-label="Create New Batch"
      >
        <PlusIcon className="w-8 h-8" />
      </button>
    </div>
  );
}