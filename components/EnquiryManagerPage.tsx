import React, { useState, useMemo } from 'react';
import type { Enquiry, EnquiryStatus } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { PlusIcon } from './icons/PlusIcon';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';
import { UserPlusIcon } from './icons/UserPlusIcon';
import { SearchIcon } from './icons/SearchIcon';

interface EnquiryManagerPageProps {
  onBack: () => void;
  enquiries: Enquiry[];
  onNavigate: (page: string, params?: { [key: string]: any }) => void;
  onDelete: (enquiryId: string) => Promise<void>;
  onUpdateStatus: (enquiryId: string, data: Partial<Enquiry>) => Promise<void>;
}

const EnquiryCard: React.FC<{ 
    enquiry: Enquiry; 
    onNavigate: EnquiryManagerPageProps['onNavigate'];
    onDelete: EnquiryManagerPageProps['onDelete'];
}> = ({ enquiry, onNavigate, onDelete }) => {
    
    const getStatusColor = (status: EnquiryStatus) => {
        switch (status) {
            case 'New': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300';
            case 'Follow-up': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300';
            case 'Converted': return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300';
            case 'Lost': return 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300';
        }
    };
    
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">{enquiry.studentName}</h3>
                    <a href={`tel:${enquiry.mobile}`} className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">{enquiry.mobile}</a>
                </div>
                 <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(enquiry.status)}`}>
                    {enquiry.status}
                </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Interested in: <span className="font-medium text-gray-700 dark:text-gray-200">{enquiry.interestedBatch}</span></p>
            {enquiry.notes && <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 italic">Notes: {enquiry.notes}</p>}
            
            <div className="border-t dark:border-gray-700 mt-4 pt-3 flex flex-wrap justify-end gap-2">
                {enquiry.status !== 'Converted' && (
                     <button onClick={() => onNavigate('new-student', { enquiryId: enquiry.id })} className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors">
                        <UserPlusIcon className="w-4 h-4" />
                        <span>Convert to Admission</span>
                    </button>
                )}
                <button onClick={() => onNavigate('edit-enquiry', { enquiryId: enquiry.id })} className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <PencilIcon className="w-4 h-4" />
                    <span>Edit</span>
                </button>
                <button onClick={() => onDelete(enquiry.id)} className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-100 dark:bg-red-900/40 rounded-md hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
                    <TrashIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
};

const TABS: { id: EnquiryStatus | 'All', label: string }[] = [
    { id: 'All', label: 'All' },
    { id: 'New', label: 'New' },
    { id: 'Follow-up', label: 'Follow-up' },
    { id: 'Converted', label: 'Converted' },
    { id: 'Lost', label: 'Lost' },
];

export function EnquiryManagerPage({ onBack, enquiries, onNavigate, onDelete, onUpdateStatus }: EnquiryManagerPageProps) {
    const [activeTab, setActiveTab] = useState<EnquiryStatus | 'All'>('All');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredEnquiries = useMemo(() => {
        return enquiries
            .filter(e => activeTab === 'All' || e.status === activeTab)
            .filter(e => e.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || e.mobile.includes(searchTerm))
            .sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
    }, [enquiries, activeTab, searchTerm]);

    const handleDelete = async (enquiryId: string) => {
        if(window.confirm("Are you sure you want to delete this enquiry?")) {
            await onDelete(enquiryId);
        }
    }

    return (
        <div className="animate-fade-in flex flex-col h-full">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Enquiry Manager</h1>
            </header>
            <div className="p-2 bg-white dark:bg-gray-800 shadow-sm flex-shrink-0">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by name or mobile..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <div className="flex justify-start space-x-2 overflow-x-auto mt-2 pb-1">
                    {TABS.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-1.5 text-sm font-semibold rounded-full flex-shrink-0 transition-colors ${activeTab === tab.id ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <main className="flex-grow p-4 overflow-y-auto">
                {filteredEnquiries.length === 0 ? (
                    <div className="text-center py-20 px-4">
                        <p className="text-lg text-gray-500 dark:text-gray-400">No enquiries found for this filter.</p>
                        <p className="text-gray-400 dark:text-gray-500">Click the <span className="font-bold text-indigo-500">+</span> button to add a new enquiry.</p>
                    </div>
                ) : (
                    <div className="space-y-4 pb-20">
                        {filteredEnquiries.map(enquiry => (
                           <EnquiryCard key={enquiry.id} enquiry={enquiry} onNavigate={onNavigate} onDelete={handleDelete} />
                        ))}
                    </div>
                )}
            </main>

            <button
                onClick={() => onNavigate('new-enquiry')}
                className="absolute bottom-20 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-label="Add New Enquiry"
            >
                <PlusIcon className="w-8 h-8" />
            </button>
        </div>
    );
}