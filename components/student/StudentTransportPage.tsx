import React from 'react';
import type { Student, TransportRoute } from '../../types';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { PhoneIcon } from '../icons/PhoneIcon';

interface StudentTransportPageProps {
  student: Student;
  transportRoutes: TransportRoute[];
  onBack: () => void;
}

const DetailRow = ({ label, value }: { label: string, value?: string | number }) => (
    <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="font-semibold text-gray-800 dark:text-gray-100">{value}</p>
    </div>
);


export function StudentTransportPage({ student, transportRoutes, onBack }: StudentTransportPageProps) {
    const assignedRoute = transportRoutes.find(r => r.id === student.transportRouteId);

    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">My Transport Details</h1>
            </header>
            
            <main className="flex-grow p-4 overflow-y-auto">
                {assignedRoute ? (
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                        <DetailRow label="Route Name" value={assignedRoute.routeName} />
                        <DetailRow label="Vehicle Number" value={assignedRoute.vehicleNumber} />
                        <DetailRow label="Driver Name" value={assignedRoute.driverName} />
                        <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Driver Contact</p>
                            <a href={`tel:${assignedRoute.driverContact}`} className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                                <PhoneIcon className="w-4 h-4" />
                                {assignedRoute.driverContact}
                            </a>
                        </div>
                        <DetailRow label="Monthly Fee" value={`₹${assignedRoute.monthlyFee}`} />
                         <div className="py-3">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Pickup/Drop Points</p>
                            <p className="font-semibold text-gray-800 dark:text-gray-100 whitespace-pre-line">{assignedRoute.points.split(',').join('\n')}</p>
                        </div>
                    </div>
                ) : (
                     <div className="text-center py-20 px-4">
                        <p className="text-lg text-gray-500 dark:text-gray-400">You are not assigned to any transport route.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
