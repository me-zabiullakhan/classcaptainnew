
import React from 'react';
import type { Student, Batch } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { SearchIcon } from './icons/SearchIcon';

// A simple toggle switch component
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


const StudentCard: React.FC<{ student: Student, onToggleStatus: (id: string) => void }> = ({ student, onToggleStatus }) => (
    <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-gray-400 flex flex-col">
        <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
                {student.photo ? (
                    <img src={student.photo} alt={student.name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-xl">
                        {student.name.charAt(0)}
                    </div>
                )}
                <div>
                    <h3 className="font-bold text-gray-800">{student.name}</h3>
                    <p className="text-sm text-gray-500">{student.rollNumber || student.id}</p>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <ToggleSwitch checked={student.isActive} onChange={() => onToggleStatus(student.id)} />
                <span className="text-xs text-gray-400 mt-1">{student.isActive ? 'Active' : 'Inactive'}</span>
            </div>
        </div>
        <div className="mt-3 text-xs text-gray-600">
            Batches: {student.batches.join(', ') || 'None'}
        </div>
    </div>
);


export function InactiveStudentsPage({ onBack, students, batches, onToggleStudentStatus }: { 
    onBack: () => void; 
    students: Student[]; 
    batches: Batch[]; 
    onToggleStudentStatus: (studentId: string) => void; 
}) {
    const [filter, setFilter] = React.useState('all');
    const [searchTerm, setSearchTerm] = React.useState('');

    const inactiveStudents = students.filter(s => !s.isActive);

    const filteredStudents = inactiveStudents
        .filter(student => filter === 'all' || student.batches.includes(filter))
        .filter(student => 
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (student.rollNumber && student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()))
        );

    return (
        <div className="animate-fade-in flex flex-col h-full">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Inactive Students</h1>
            </header>
            <main className="flex-grow p-4 overflow-y-auto">
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Search by name or roll no..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    <select
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                        className="w-full sm:w-auto px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="all">All Batches</option>
                        {batches.map(batch => (
                            <option key={batch.id} value={batch.name}>{batch.name}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-4 pb-4">
                    {filteredStudents.length > 0 ? (
                        filteredStudents.map(student => (
                            <StudentCard 
                                key={student.id} 
                                student={student} 
                                onToggleStatus={onToggleStudentStatus}
                             />
                        ))
                    ) : (
                        <div className="text-center py-20 px-4">
                            <p className="text-lg text-gray-500">No inactive students found.</p>
                            <p className="text-sm text-gray-400 mt-2">You can make a student inactive from the 'Active Students' list.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
