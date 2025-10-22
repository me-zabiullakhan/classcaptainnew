

import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import type { Staff } from '../types';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';
import { KeyIcon } from './icons/KeyIcon';

const ToggleSwitch: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
    <button
        type="button"
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${checked ? 'bg-indigo-600' : 'bg-gray-300'}`}
        onClick={onChange}
        aria-pressed={checked}
    >
        <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}
        />
    </button>
);


interface StaffManagerPageProps {
  onBack: () => void;
  staff: Staff[];
  onManageAccess: (staffId: string) => void;
  onShowDevPopup: (featureName: string) => void;
  onToggleStatus: (staffId: string) => void;
}

export function StaffManagerPage({ onBack, staff, onManageAccess, onShowDevPopup, onToggleStatus }: StaffManagerPageProps): React.ReactNode {
  
  const activeStaff = staff.filter(s => s.isActive);

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go to staff options">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold ml-2">Active Staff</h1>
      </header>
      <main className="flex-grow p-4 overflow-y-auto">
        {activeStaff.length === 0 ? (
          <div className="text-center py-20 px-4">
            <p className="text-lg text-gray-500 mb-4">No active staff members found.</p>
            <p className="text-gray-400">Go to Staff Options to add a new staff member.</p>
          </div>
        ) : (
          <div className="space-y-4 pb-4">
            {activeStaff.map(member => (
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
                       <div className="flex flex-col items-end">
                          <ToggleSwitch checked={member.isActive} onChange={() => onToggleStatus(member.id)} />
                          <span className="text-xs text-gray-400 mt-1">{member.isActive ? 'Active' : 'Inactive'}</span>
                      </div>
                  </div>
                </div>

                <div className="border-t mt-4 pt-3 flex justify-end space-x-2">
                    <button
                      onClick={() => onShowDevPopup('Edit Staff')}
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
                      onClick={() => onShowDevPopup('Delete Staff')}
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
    </div>
  );
}