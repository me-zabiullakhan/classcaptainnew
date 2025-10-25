import React, { useMemo } from 'react';
import type { StudyMaterial, Student } from '../../types';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { FileTextIcon } from '../icons/FileTextIcon';
import { LinkIcon } from '../icons/LinkIcon';

interface StudentStudyMaterialPageProps {
  onBack: () => void;
  materials: StudyMaterial[];
  student: Student;
}

const MaterialCard: React.FC<{ material: StudyMaterial }> = ({ material }) => {
    return (
        <a 
            href={material.fileUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center space-x-4 hover:shadow-md transition-shadow"
        >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                {material.fileType === 'file' ? 
                    <FileTextIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" /> : 
                    <LinkIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                }
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-800 dark:text-gray-100 truncate">{material.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{material.subject}</p>
                 <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {material.uploadedAt.toDate().toLocaleDateString()}
                 </p>
            </div>
        </a>
    );
};

export function StudentStudyMaterialPage({ onBack, materials, student }: StudentStudyMaterialPageProps) {
    const studentMaterials = useMemo(() => {
        const studentBatchNames = new Set(student.batches);
        return materials
            .filter(m => studentBatchNames.has(m.batchName))
            .sort((a, b) => b.uploadedAt.toMillis() - a.uploadedAt.toMillis());
    }, [materials, student.batches]);

    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Study Material</h1>
            </header>
            
            <main className="flex-grow p-4 overflow-y-auto">
                {studentMaterials.length === 0 ? (
                     <div className="text-center py-20 px-4">
                        <p className="text-lg text-gray-500 dark:text-gray-400">No study material has been uploaded for your batches yet.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {studentMaterials.map(material => (
                            <MaterialCard key={material.id} material={material} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
