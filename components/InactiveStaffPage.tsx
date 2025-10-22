import React from 'react';
import type { Staff } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { SearchIcon } from './icons/SearchIcon';

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

const StaffCard: React.FC<{ staff: Staff, onToggleStatus: (id: string) => void }> = ({ staff, onToggleStatus }) => (
    <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-gray-400 flex flex-col">
        <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
                {staff.photo ? (
                    <img src={staff.photo} alt={staff.name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-xl">
                        {staff.name.charAt(0)}
                    </div>
                )}
                <div>
                    <h3 className="font-bold text-gray-800">{staff.name}</h3>
                    <p className="text-sm text-gray-500">{staff.staffId}</p>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <ToggleSwitch checked={staff.isActive} onChange={() => onToggleStatus(staff.id)} />
                <span className="text-xs text-gray-400 mt-1">{staff.isActive ? 'Active' : 'Inactive'}</span>
            </div>
        </div>
    </div>
);

export function InactiveStaffPage({ onBack, staff, onToggleStatus }: { 
    onBack: () => void; 
    staff: Staff[]; 
    onToggleStatus: (staffId: string) => void; 
}) {
    const [searchTerm, setSearchTerm] = React.useState('');

    const inactiveStaff = staff.filter(s => !s.isActive);

    const filteredStaff = inactiveStaff.filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.staffId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="animate-fade-in flex flex-col h-full">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Inactive Staff</h1>
            </header>
            <main className="flex-grow p-4 overflow-y-auto">
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Search by name or staff ID..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                <div className="space-y-4 pb-4">
                    {filteredStaff.length > 0 ? (
                        filteredStaff.map(member => (
                            <StaffCard 
                                key={member.id} 
                                staff={member} 
                                onToggleStatus={onToggleStatus}
                             />
                        ))
                    ) : (
                        <div className="text-center py-20 px-4">
                            <p className="text-lg text-gray-500">No inactive staff found.</p>
                            <p className="text-sm text-gray-400 mt-2">You can make a staff member inactive from the 'Active Staff' list.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
