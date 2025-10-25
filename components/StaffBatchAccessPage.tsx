
import React from 'react';
import type { Staff, Batch, BatchAccessPermissions } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

// FIX: Changed 'onlineExam' to 'onlineQuiz' to match the type definition and added the missing 'schedule' permission.
const PERMISSION_KEYS: { key: keyof BatchAccessPermissions; label: string }[] = [
    { key: 'attendance', label: 'Attendance' },
    { key: 'editStudents', label: 'Edit Students' },
    { key: 'exams', label: 'Exams' },
    { key: 'fees', label: 'Fees' },
    { key: 'studyMaterial', label: 'Study Material' },
    { key: 'homework', label: 'Homework' },
    { key: 'onlineQuiz', label: 'Online Quiz' },
    { key: 'schedule', label: 'Manage Schedule' },
];

interface StaffBatchAccessPageProps {
  onBack: () => void;
  staff: Staff;
  batches: Batch[];
  onSave: (staffId: string, batchAccess: { [batchId: string]: BatchAccessPermissions }) => void;
}

export function StaffBatchAccessPage({ onBack, staff, batches, onSave }: StaffBatchAccessPageProps) {
  const [batchAccess, setBatchAccess] = React.useState<{ [batchId: string]: BatchAccessPermissions }>(() => {
    // Deep copy to avoid modifying original state
    return JSON.parse(JSON.stringify(staff.batchAccess || {}));
  });

  const handlePermissionChange = (batchId: string, permission: keyof BatchAccessPermissions) => {
    setBatchAccess(prev => {
      const newAccess = { ...prev };
      if (!newAccess[batchId]) {
        newAccess[batchId] = {};
      }
      newAccess[batchId][permission] = !newAccess[batchId][permission];
      return newAccess;
    });
  };
  
  const handleSave = () => {
    onSave(staff.id, batchAccess);
  };

  return (
    <div className="bg-slate-100 flex flex-col h-full animate-fade-in">
      <header className="bg-sky-600 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-sky-700 transition-colors" aria-label="Go back">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <div className="ml-2">
            <h1 className="text-xl font-bold">Batch Access</h1>
            <p className="text-sm opacity-90">{staff.name}</p>
        </div>
      </header>

      <main className="flex-grow p-4 overflow-y-auto">
        {batches.length > 0 ? (
          <div className="space-y-4">
            {batches.map(batch => (
              <div key={batch.id} className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-3">{batch.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                  {PERMISSION_KEYS.map(({ key, label }) => (
                    <label key={key} className="flex items-center space-x-3 cursor-pointer p-1">
                      <input
                        type="checkbox"
                        checked={!!batchAccess[batch.id]?.[key]}
                        onChange={() => handlePermissionChange(batch.id, key)}
                        className="h-5 w-5 rounded text-sky-600 border-gray-300 focus:ring-sky-500"
                      />
                      <span className="text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4">
            <p className="text-lg text-gray-500">No batches have been created.</p>
            <p className="text-sm text-gray-400 mt-2">Create batches first to assign permissions.</p>
          </div>
        )}
      </main>

      <footer className="p-4 bg-white border-t flex-shrink-0">
        <button
          onClick={handleSave}
          className="w-full bg-sky-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-700 transition-colors shadow-md"
        >
          SAVE
        </button>
      </footer>
    </div>
  );
}
