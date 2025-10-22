

import React from 'react';
import type { Student, Batch, BatchAccessPermissions } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { SearchIcon } from './icons/SearchIcon';
import { PencilIcon } from './icons/PencilIcon';
import { RegistrationFormIcon } from './icons/RegistrationFormIcon';

const ToggleSwitch: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
    <button
        type="button"
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${checked ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
        onClick={onChange}
        aria-pressed={checked}
    >
        <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}
        />
    </button>
);


const StudentCard: React.FC<{ 
    student: Student;
    batches: Batch[];
    onToggleStatus: (id: string) => void; 
    onEditStudent: (id: string) => void;
    onViewStudent: (id: string) => void;
    staffPermissions?: Record<string, BatchAccessPermissions>;
}> = ({ student, batches, onToggleStatus, onEditStudent, onViewStudent, staffPermissions }) => {

    const canEdit = React.useMemo(() => {
        if (!staffPermissions) return true; // Default to true for admin view

        // Get the Batch objects the student is enrolled in
        const studentBatches = batches.filter(b => student.batches.includes(b.name));

        // Check if the staff has 'editStudents' permission for at least one of those batches
        return studentBatches.some(batch => staffPermissions[batch.id]?.editStudents);
    }, [student.batches, batches, staffPermissions]);


    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-indigo-500 flex flex-col">
            <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                    {student.photo ? (
                        <img src={student.photo} alt={student.name} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold text-xl">
                            {student.name.charAt(0)}
                        </div>
                    )}
                    <div>
                        <h3 className="font-bold text-gray-800 dark:text-gray-100">{student.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{student.rollNumber || student.id}</p>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    {canEdit ? (
                        <>
                            <ToggleSwitch checked={student.isActive} onChange={() => onToggleStatus(student.id)} />
                            <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">{student.isActive ? 'Active' : 'Inactive'}</span>
                        </>
                    ) : (
                         <span className={`text-xs px-2 py-1 rounded-full ${student.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {student.isActive ? 'Active' : 'Inactive'}
                        </span>
                    )}
                </div>
            </div>
            <div className="mt-3 text-xs text-gray-600 dark:text-gray-300">
                Batches: {student.batches.join(', ') || 'None'}
            </div>
            <div className="border-t dark:border-gray-700 mt-3 pt-3 flex justify-end space-x-2">
                {canEdit && (
                    <button
                      onClick={() => onEditStudent(student.id)}
                      className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                      aria-label={`Edit details for ${student.name}`}
                    >
                      <PencilIcon className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                )}
                <button
                  onClick={() => onViewStudent(student.id)}
                  className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
                  aria-label={`View details for ${student.name}`}
                >
                  <RegistrationFormIcon className="w-4 h-4" />
                  <span>View Details</span>
                </button>
            </div>
        </div>
    );
};


export function ActiveStudentsPage({ onBack, students, batches, onToggleStudentStatus, onEditStudent, onViewStudent, initialFilter = 'all', staffPermissions }: { 
    onBack: () => void; 
    students: Student[]; 
    batches: Batch[]; 
    onToggleStudentStatus: (studentId: string) => void; 
    onEditStudent: (studentId: string) => void;
    onViewStudent: (studentId: string) => void;
    initialFilter?: string; 
    staffPermissions?: { [batchId: string]: BatchAccessPermissions };
}) {
    const [filter, setFilter] = React.useState(initialFilter);
    const [searchTerm, setSearchTerm] = React.useState('');

    const activeStudents = students.filter(s => s.isActive);

    const filteredStudents = activeStudents
        .filter(student => filter === 'all' || student.batches.includes(filter))
        .filter(student => 
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (student.rollNumber && student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()))
        );

    return (
        <div className="animate-fade-in flex flex-col h-full">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Active Students</h1>
            </header>
            <main className="flex-grow p-4 overflow-y-auto">
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Search by name or roll no..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                        />
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    <select
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                        className="w-full sm:w-auto px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="all">All Batches</option>
                        {batches.filter(b => b.isActive).map(batch => (
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
                                batches={batches}
                                onToggleStatus={onToggleStudentStatus}
                                onEditStudent={onEditStudent}
                                onViewStudent={onViewStudent}
                                staffPermissions={staffPermissions}
                             />
                        ))
                    ) : (
                        <div className="text-center py-20 px-4">
                            <p className="text-lg text-gray-500 dark:text-gray-400">No active students found.</p>
                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Try adjusting your filters or adding a new student.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}