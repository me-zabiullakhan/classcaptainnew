

import React, { useMemo } from 'react';
import type { Student, Batch } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { SearchIcon } from './icons/SearchIcon';

interface SelectStudentForFeesPageProps {
  onBack: () => void;
  batch: Batch;
  students: Student[];
  onSelectStudent: (studentId: string) => void;
}

export function SelectStudentForFeesPage({ onBack, batch, students, onSelectStudent }: SelectStudentForFeesPageProps): React.ReactNode {
  const [searchTerm, setSearchTerm] = React.useState('');

  const activeStudentsInBatch = useMemo(() => 
    students.filter(s => s.isActive && Array.isArray(s.batches) && s.batches.includes(batch.name)),
    [students, batch.name]
  );

  const filteredStudents = activeStudentsInBatch.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (student.rollNumber && student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <div className="flex-shrink-0 sticky top-0 z-10">
          <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md">
            <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back to batch selection">
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold ml-2">Select Student</h1>
          </header>
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/50 border-b dark:border-gray-700">
            <h2 className="font-semibold text-indigo-800 dark:text-indigo-200">{batch.name}</h2>
          </div>
      </div>

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

        {filteredStudents.length > 0 ? (
          <div className="space-y-3">
            {filteredStudents.map(student => (
              <button 
                key={student.id} 
                onClick={() => onSelectStudent(student.id)}
                className="w-full bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-left flex items-center space-x-3"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
                    {student.name.charAt(0)}
                </div>
                <div>
                    <h3 className="font-bold text-gray-800">{student.name}</h3>
                    <p className="text-sm text-gray-500">{student.rollNumber}</p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4">
            <p className="text-lg text-gray-500">No students found in this batch.</p>
            <p className="text-sm text-gray-400 mt-2">Try searching for a different student or check the active students list.</p>
          </div>
        )}
      </main>
    </div>
  );
}
