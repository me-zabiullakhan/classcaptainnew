
import React from 'react';
import type { Student } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { BirthdayIcon } from './icons/BirthdayIcon';

export function BirthdayListPage({ onBack, students }: { onBack: () => void; students: Student[] }) {
    const today = new Date();
    const todayMonthDay = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    // YYYY-MM-DD -> MM-DD
    const birthdayStudents = students.filter(s => s.dob.substring(5) === todayMonthDay && s.isActive);
    
    const todayFormatted = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    return (
        <div className="animate-fade-in flex flex-col h-full">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md w-full -mx-3 sm:-mx-4 mt-[-1rem]">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Today's Birthdays</h1>
            </header>
            <main className="flex-grow pt-4">
                <div className="text-center mb-6 p-4 bg-purple-50 rounded-lg">
                    <p className="font-semibold text-purple-800">{todayFormatted}</p>
                </div>
                {birthdayStudents.length > 0 ? (
                    <div className="space-y-3">
                        {birthdayStudents.map(student => (
                            <div key={student.id} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
                                <BirthdayIcon className="w-10 h-10 text-orange-500" />
                                <div>
                                    <p className="font-bold text-gray-800 text-lg">{student.name}</p>
                                    <p className="text-sm text-gray-500">Batch: {student.batches.join(', ')}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 px-4">
                         <BirthdayIcon className="w-24 h-24 text-purple-300 mx-auto" />
                        <p className="text-lg text-gray-500 mt-4">No birthdays today.</p>
                        <p className="text-sm text-gray-400 mt-2">Come back tomorrow to check again!</p>
                    </div>
                )}
            </main>
        </div>
    );
}
