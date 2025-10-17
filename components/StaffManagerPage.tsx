
import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { PlusIcon } from './icons/PlusIcon';
import type { Staff } from '../types';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';
import { KeyIcon } from './icons/KeyIcon';

interface StaffManagerPageProps {
  onBack: () => void;
  onCreate: () => void;
  staff: Staff[];
  onManageAccess: (staffId: string) => void;
}

export function StaffManagerPage({ onBack, onCreate, staff, onManageAccess }: StaffManagerPageProps): React.ReactNode {
  return (
    <div className="animate-fade-in flex flex-col h-full">
      <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md w-full -mx-3 sm:-mx-4 mt-[-1rem]">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go to dashboard">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold ml-2">Staff Manager</h1>
      </header>
      <main className="flex-grow pt-6">
        {staff.length === 0 ? (
          <div className="text-center py-20 px-4">
            <p className="text-lg text-gray-500 mb-4">No staff members have been added yet.</p>
            <p className="text-gray-400">Click the <span className="font-bold text-indigo-500">+</span> button to add your first staff member.</p>
          </div>
        ) : (
          <div className="space-y-4 pb-20">
            {staff.map(member => (
              <div key={member.id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-indigo-500 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl">
                            {member.name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-gray-800">{member.name}</h3>
                            <p className="text-sm text-gray-500 mb-1">{member.staffId}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${member.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {member.isActive ? 'Active' : 'Inactive'}
                      </span>
                  </div>
                </div>

                <div className="border-t mt-4 pt-3 flex justify-end space-x-2">
                    <button
                      onClick={() => alert('Edit feature is under development.')}
                      className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                      aria-label={`Edit staff ${member.name}`}
                    >
                      <PencilIcon className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => onManageAccess(member.id)}
                      className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                      aria-label={`Manage access for ${member.name}`}
                    >
                      <KeyIcon className="w-4 h-4" />
                      <span>Manage Access</span>
                    </button>
                    <button
                      onClick={() => alert('Delete feature is under development.')}
                      className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
                      aria-label={`Delete staff ${member.name}`}
                    >
                      <TrashIcon className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <button
        onClick={onCreate}
        className="absolute bottom-4 right-4 bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        aria-label="Add New Staff"
      >
        <PlusIcon className="w-8 h-8" />
      </button>
    </div>
  );
}