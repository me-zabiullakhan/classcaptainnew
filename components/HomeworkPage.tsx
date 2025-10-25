
import React, { useState, useMemo } from 'react';
import type { Homework, Batch } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { PlusIcon } from './icons/PlusIcon';
import { SearchIcon } from './icons/SearchIcon';
import { TrashIcon } from './icons/TrashIcon';
import { PencilIcon } from './icons/PencilIcon';
import { FileTextIcon } from './icons/FileTextIcon';
import { LinkIcon } from './icons/LinkIcon';

interface HomeworkPageProps {
  onBack: () => void;
  homework: Homework[];
  batches: Batch[];
  onNavigate: (page: string, params?: { [key: string]: any }) => void;
  onDelete: (homework: Homework) => Promise<void>;
}

const HomeworkCard: React.FC<{
    homework: Homework;
    onEdit: (id: string) => void;
    onDelete: (homework: Homework) => void;
    onViewSubmissions: (id: string) => void;
}> = ({ homework, onEdit, onDelete, onViewSubmissions }) => {
    
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-green-500">
            <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 truncate">{homework.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{homework.batchName} &middot; {homework.subject}</p>
                </div>
                <p className="text-xs text-red-600 dark:text-red-400 font-semibold flex-shrink-0 ml-2">Due: {homework.dueDate.toDate().toLocaleDateString()}</p>
            </div>
            {homework.description && <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{homework.description}</p>}
            
            <div className="border-t dark:border-gray-700 mt-4 pt-3 flex flex-wrap justify-end gap-2">
                <button onClick={() => onViewSubmissions(homework.id)} className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors">
                    <span>View Submissions</span>
                </button>
                <button onClick={() => onEdit(homework.id)} className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <PencilIcon className="w-4 h-4" />
                    <span>Edit</span>
                </button>
                <button onClick={() => onDelete(homework)} className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-100 dark:bg-red-900/40 rounded-md hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
                    <TrashIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};


export function HomeworkPage({ onBack, homework, batches, onNavigate, onDelete }: HomeworkPageProps) {
    const [batchFilter, setBatchFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredHomework = useMemo(() => {
        return homework
            .filter(h => batchFilter === 'all' || h.batchId === batchFilter)
            .filter(h => 
                h.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                h.subject.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => b.assignedAt.toMillis() - a.assignedAt.toMillis());
    }, [homework, batchFilter, searchTerm]);

    return (
        <div className="animate-fade-in flex flex-col h-full">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Homework</h1>
            </header>
            
            <main className="flex-grow p-4 overflow-y-auto">
                <div className="space-y-4 mb-4">
                     <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by title or subject..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    <select
                        value={batchFilter}
                        onChange={e => setBatchFilter(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="all">All Batches</option>
                        {batches.filter(b => b.isActive).map(batch => (
                            <option key={batch.id} value={batch.id}>{batch.name}</option>
                        ))}
                    </select>
                </div>

                {filteredHomework.length === 0 ? (
                     <div className="text-center py-20 px-4">
                        <p className="text-lg text-gray-500 dark:text-gray-400">No homework assigned.</p>
                        <p className="text-gray-400 dark:text-gray-500">Click the <span className="font-bold text-indigo-500">+</span> button to assign homework.</p>
                    </div>
                ) : (
                    <div className="space-y-4 pb-20">
                        {filteredHomework.map(hw => (
                            <HomeworkCard 
                                key={hw.id} 
                                homework={hw}
                                onEdit={(id) => onNavigate('edit-homework', { homeworkId: id })}
                                onDelete={onDelete}
                                onViewSubmissions={(id) => onNavigate('homework-submissions', { homeworkId: id })}
                            />
                        ))}
                    </div>
                )}
            </main>

            <button
                onClick={() => onNavigate('assign-homework')}
                className="absolute bottom-20 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-label="Assign New Homework"
            >
                <PlusIcon className="w-8 h-8" />
            </button>
        </div>
    );
}
