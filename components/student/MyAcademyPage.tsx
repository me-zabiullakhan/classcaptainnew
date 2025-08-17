import React from 'react';
import type { Academy } from '../../types';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { BuildingIcon } from '../icons/BuildingIcon';
import { EmailIcon } from '../icons/EmailIcon';
import { GlobeIcon } from '../icons/GlobeIcon';
import { PhoneIcon } from '../icons/PhoneIcon';

interface MyAcademyPageProps {
  academy: Academy;
  onBack: () => void;
}

const DetailRow = ({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string | null }) => {
    if (!value) return null;
    return (
        <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border">
            <div className="text-gray-400 mt-1 flex-shrink-0">{icon}</div>
            <div>
                <p className="text-xs text-gray-500 font-medium">{label}</p>
                <p className="text-gray-800 break-words">{value}</p>
            </div>
        </div>
    );
};


export function MyAcademyPage({ academy, onBack }: MyAcademyPageProps): React.ReactNode {
  return (
    <div className="bg-slate-100 flex flex-col h-screen animate-fade-in md:max-w-lg md:mx-auto md:shadow-2xl">
        <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0">
            <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back to dashboard">
                <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold ml-2">My Academy</h1>
        </header>
        <main className="flex-grow p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 text-center">
                <h2 className="text-2xl font-bold text-indigo-800">{academy.name}</h2>
                <p className="text-gray-500">Academy ID: {academy.academyId}</p>
            </div>

            <div className="space-y-4">
                <DetailRow icon={<EmailIcon className="w-5 h-5"/>} label="Contact Email" value={academy.contactEmail} />
                <DetailRow icon={<PhoneIcon className="w-5 h-5"/>} label="Contact Phone" value={academy.contactPhone} />
                {academy.contactPhoneAlt && <DetailRow icon={<PhoneIcon className="w-5 h-5"/>} label="Alternative Phone" value={academy.contactPhoneAlt} />}
                <DetailRow icon={<GlobeIcon className="w-5 h-5"/>} label="Website" value={academy.website} />
                <DetailRow icon={<BuildingIcon className="w-5 h-5"/>} label="Address" value={academy.address} />
            </div>
        </main>
    </div>
  );
}
