import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { PlusIcon } from './icons/PlusIcon';
import type { TransportRoute } from '../types';
import { PencilIcon } from './icons/PencilIcon';
import { StudentsIcon } from './icons/StudentsIcon';
import { TrashIcon } from './icons/TrashIcon';

const DeleteConfirmationModal: React.FC<{
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
  routeName: string;
}> = ({ onConfirm, onCancel, isDeleting, routeName }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/40 mb-5">
                <TrashIcon className="h-9 w-9 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Are you sure?</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
                Do you really want to delete the route "{routeName}"? Assigned students will be unmapped. This action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row-reverse gap-3">
                <button
                    onClick={onConfirm}
                    disabled={isDeleting}
                    className="w-full sm:w-auto flex-1 bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors shadow-md disabled:bg-red-300"
                >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
                <button
                    onClick={onCancel}
                    disabled={isDeleting}
                    className="w-full sm:w-auto flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
);


interface TransportOptionsPageProps {
  onBack: () => void;
  onCreate: () => void;
  routes: TransportRoute[];
  onNavigate: (page: string, params: { [key: string]: string }) => void;
  onDelete: (routeId: string) => Promise<void>;
}

export function TransportOptionsPage({ onBack, onCreate, routes, onNavigate, onDelete }: TransportOptionsPageProps): React.ReactNode {
  const [routeToDelete, setRouteToDelete] = React.useState<TransportRoute | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleConfirmDelete = async () => {
    if (!routeToDelete) return;
    setIsDeleting(true);
    try {
        await onDelete(routeToDelete.id);
        setRouteToDelete(null);
    } catch (error) {
        console.error("Failed to delete route:", error);
        alert("Could not delete the route. Please try again.");
    } finally {
        setIsDeleting(false);
    }
  };


  return (
    <>
    <div className="animate-fade-in flex flex-col h-full">
      <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go to dashboard">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold ml-2">Manage Transport</h1>
      </header>
      <main className="flex-grow p-4 overflow-y-auto">
        {routes.length === 0 ? (
          <div className="text-center py-20 px-4">
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">No transport routes created yet.</p>
            <p className="text-gray-400 dark:text-gray-500">Click the <span className="font-bold text-indigo-500">+</span> button to add your first route.</p>
          </div>
        ) : (
          <div className="space-y-4 pb-20">
            {routes.map(route => (
              <div key={route.id} className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-amber-500 hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between`}>
                <div>
                  <div className="flex justify-between items-start">
                      <div>
                          <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">{route.routeName}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{route.driverName} &middot; {route.vehicleNumber}</p>
                      </div>
                      <p className="text-lg font-bold text-gray-800 dark:text-gray-100">₹{route.monthlyFee}</p>
                  </div>
                </div>

                <div className="border-t dark:border-gray-700 mt-4 pt-3 flex justify-between items-center">
                    <button
                      onClick={() => setRouteToDelete(route)}
                      className="p-2 text-red-600 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
                      aria-label={`Delete route ${route.routeName}`}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                    <div className="flex space-x-2">
                        <button
                          onClick={() => onNavigate('edit-transport-route', { routeId: route.id })}
                          className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          <PencilIcon className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => onNavigate('map-students-to-route', { routeId: route.id })}
                          className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
                        >
                          <StudentsIcon className="w-4 h-4" />
                          <span>Assign Students</span>
                        </button>
                    </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <button
        onClick={onCreate}
        className="absolute bottom-20 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        aria-label="Create New Route"
      >
        <PlusIcon className="w-8 h-8" />
      </button>
    </div>
    {routeToDelete && (
        <DeleteConfirmationModal
            routeName={routeToDelete.routeName}
            isDeleting={isDeleting}
            onConfirm={handleConfirmDelete}
            onCancel={() => setRouteToDelete(null)}
        />
    )}
    </>
  );
}