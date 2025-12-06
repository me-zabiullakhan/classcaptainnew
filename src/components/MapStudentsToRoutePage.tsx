import React, { useState, useMemo } from 'react';
import type { Student, TransportRoute } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { SearchIcon } from './icons/SearchIcon';

interface MapStudentsToRoutePageProps {
  onBack: () => void;
  route: TransportRoute;
  students: Student[];
  onSave: (routeId: string, assignedStudentIds: string[], unassignedStudentIds: string[]) => void;
}

export function MapStudentsToRoutePage({ onBack, route, students, onSave }: MapStudentsToRoutePageProps) {
  const [assignedIds, setAssignedIds] = useState<Set<string>>(() => 
    new Set(students.filter(s => s.transportRouteId === route.id).map(s => s.id))
  );
  const [searchTerm, setSearchTerm] = useState('');
  
  const initialAssignedIds = useMemo(() => new Set(students.filter(s => s.transportRouteId === route.id).map(s => s.id)), [students, route.id]);

  const { assigned, unassigned } = useMemo(() => {
    const assigned: Student[] = [];
    const unassigned: Student[] = [];

    students.filter(s => s.isActive).forEach(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchesSearch) return;

      if (assignedIds.has(student.id)) {
        assigned.push(student);
      } else if (!student.transportRouteId || student.transportRouteId === route.id) {
        // Show students who are unassigned OR were previously assigned to THIS route
        unassigned.push(student);
      }
    });
    return { assigned, unassigned };
  }, [students, assignedIds, searchTerm, route.id]);

  const toggleStudent = (studentId: string) => {
    setAssignedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(studentId)) {
        newSet.delete(studentId);
      } else {
        newSet.add(studentId);
      }
      return newSet;
    });
  };

  const handleSave = () => {
    const newAssigned = [...assignedIds].filter(id => !initialAssignedIds.has(id));
    const newUnassigned = [...initialAssignedIds].filter(id => !assignedIds.has(id));
    onSave(route.id, newAssigned, newUnassigned);
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900">
      <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800"><ArrowLeftIcon className="w-6 h-6" /></button>
        <div className="ml-2">
            <h1 className="text-xl font-bold">Assign Students</h1>
            <p className="text-sm opacity-90">{route.routeName}</p>
        </div>
      </header>

      <div className="p-4 flex-shrink-0">
         <div className="relative">
            <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <main className="flex-grow overflow-y-auto px-4 space-y-4">
        <section>
          <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-2">Assigned Students ({assigned.length})</h2>
          <div className="space-y-2">
            {assigned.map(s => (
              <button key={s.id} onClick={() => toggleStudent(s.id)} className="w-full text-left bg-white dark:bg-gray-800 p-2 rounded-md shadow-sm flex items-center justify-between">
                <div>
                    <p className="font-semibold">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.rollNumber}</p>
                </div>
                <span className="text-red-500 font-bold text-lg">-</span>
              </button>
            ))}
          </div>
        </section>
        <section>
          <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-2">Unassigned Students ({unassigned.length})</h2>
          <div className="space-y-2">
             {unassigned.map(s => (
              <button key={s.id} onClick={() => toggleStudent(s.id)} className="w-full text-left bg-white dark:bg-gray-800 p-2 rounded-md shadow-sm flex items-center justify-between">
                <div>
                    <p className="font-semibold">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.rollNumber}</p>
                </div>
                <span className="text-green-500 font-bold text-lg">+</span>
              </button>
            ))}
          </div>
        </section>
      </main>
      <footer className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
        <button onClick={handleSave} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg">Save Changes</button>
      </footer>
    </div>
  );
}
