
import React from 'react';
import type { Student } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

export function RegistrationFormListPage({ onBack, students, onSelectStudent }: { onBack: () => void; students: Student[]; onSelectStudent: (studentId: string) => void; }) {
    return (
        <div className="animate-fade-in flex flex-col h-full">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Select Student for Form</h1>
            </header>
            <main className="flex-grow p-4 overflow-y-auto">
                 {students.length > 0 ? (
                    <div className="space-y-3 pb-4">
                        {students.map(student => (
                             <button 
                                key={student.id} 
                                onClick={() => onSelectStudent(student.id)}
                                className="w-full bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-left flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-bold text-indigo-800">{student.name}</p>
                                    <p className="text-sm text-gray-500">{student.id}</p>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full ${student.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {student.isActive ? 'Active' : 'Inactive'}
                                </span>
                             </button>
                        ))}
                    </div>
                 ) : (
                    <div className="text-center py-20 px-4">
                        <p className="text-lg text-gray-500">No students found.</p>
                        <p className="text-sm text-gray-400 mt-2">Add a student to view their registration form.</p>
                    </div>
                 )}
            </main>
        </div>
    );
}
