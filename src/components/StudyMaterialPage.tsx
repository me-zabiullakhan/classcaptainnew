import React, { useState, useMemo } from 'react';
import type { StudyMaterial, Batch } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { PlusIcon } from './icons/PlusIcon';
import { SearchIcon } from './icons/SearchIcon';
import { TrashIcon } from './icons/TrashIcon';
import { PencilIcon } from './icons/PencilIcon';
import { FileTextIcon } from './icons/FileTextIcon';
import { LinkIcon } from './icons/LinkIcon';

interface StudyMaterialPageProps {
  onBack: () => void;
  materials: StudyMaterial[];
  batches: Batch[];
  onNavigate: (page: string, params?: { [key: string]: any }) => void;
  onDelete: (material: StudyMaterial) => Promise<void>;
}

const MaterialCard: React.FC<{
    material: StudyMaterial;
    onEdit: (id: string) => void;
    onDelete: (material: StudyMaterial) => void;
}> = ({ material, onEdit, onDelete }) => {
    
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-gray-400">
            <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 truncate">{material.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{material.batchName} &middot; {material.subject}</p>
                </div>
                <div className="flex-shrink-0 ml-2">
                    {material.fileType === 'file' ? 
                        <FileTextIcon className="w-6 h-6 text-gray-500" /> : 
                        <LinkIcon className="w-6 h-6 text-gray-500" />
                    }
                </div>
            </div>
            {material.description && <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{material.description}</p>}
            
            <div className="border-t dark:border-gray-700 mt-4 pt-3 flex justify-end space-x-2">
                <a href={material.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors">
                    <span>View</span>
                </a>
                <button onClick={() => onEdit(material.id)} className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <PencilIcon className="w-4 h-4" />
                    <span>Edit</span>
                </button>
                <button onClick={() => onDelete(material)} className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-100 dark:bg-red-900/40 rounded-md hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
                    <TrashIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};


export function StudyMaterialPage({ onBack, materials, batches, onNavigate, onDelete }: StudyMaterialPageProps) {
    const [batchFilter, setBatchFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMaterials = useMemo(() => {
        return materials
            .filter(m => batchFilter === 'all' || m.batchId === batchFilter)
            .filter(m => 
                m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                m.subject.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => b.uploadedAt.toMillis() - a.uploadedAt.toMillis());
    }, [materials, batchFilter, searchTerm]);

    return (
        <div className="animate-fade-in flex flex-col h-full">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Study Material</h1>
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

                {filteredMaterials.length === 0 ? (
                     <div className="text-center py-20 px-4">
                        <p className="text-lg text-gray-500 dark:text-gray-400">No study material found.</p>
                        <p className="text-gray-400 dark:text-gray-500">Click the <span className="font-bold text-indigo-500">+</span> button to upload.</p>
                    </div>
                ) : (
                    <div className="space-y-4 pb-20">
                        {filteredMaterials.map(material => (
                            <MaterialCard 
                                key={material.id} 
                                material={material}
                                onEdit={(id) => onNavigate('edit-study-material', { studyMaterialId: id })}
                                onDelete={onDelete}
                            />
                        ))}
                    </div>
                )}
            </main>

            <button
                onClick={() => onNavigate('upload-study-material')}
                className="absolute bottom-20 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-label="Upload New Material"
            >
                <PlusIcon className="w-8 h-8" />
            </button>
        </div>
    );
}