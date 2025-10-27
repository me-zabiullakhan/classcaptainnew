import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import type { TransportRoute } from '../types';

const SuccessModal: React.FC<{
  onClose: () => void;
  message: string;
}> = ({ onClose, message }) => {
    const [countdown, setCountdown] = React.useState(3);

    React.useEffect(() => {
        if (countdown <= 0) {
            onClose();
            return;
        }
        const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown, onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg max-w-sm mx-auto text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/40 mb-5">
                    <svg className="w-9 h-9 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <style>{`
                            .tick-path {
                                stroke-dasharray: 48;
                                stroke-dashoffset: 48;
                                animation: draw 0.5s ease-out forwards;
                            }
                            @keyframes draw {
                                to {
                                    stroke-dashoffset: 0;
                                }
                            }
                        `}</style>
                        <path className="tick-path" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">{message}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Redirecting in {countdown}...</p>
                <button
                    onClick={onClose}
                    className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                >
                    OK
                </button>
            </div>
        </div>
    );
};


interface EditTransportRoutePageProps {
  onBack: () => void;
  onSave: (routeId: string, routeData: Omit<TransportRoute, 'id'>) => Promise<void>;
  route: TransportRoute;
}

const FormInput = ({ label, id, ...props }: { label: string, id: string } & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>) => (
  <div>
    <label htmlFor={id} className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">{label}</label>
    {props.type === 'textarea' ? (
      <textarea id={id} className="w-full bg-white dark:bg-gray-700 p-2 border border-gray-300 dark:border-gray-600 rounded-md" {...props as React.TextareaHTMLAttributes<HTMLTextAreaElement>}/>
    ) : (
      <input id={id} className="w-full bg-white dark:bg-gray-700 p-2 border border-gray-300 dark:border-gray-600 rounded-md" {...props as React.InputHTMLAttributes<HTMLInputElement>} />
    )}
  </div>
);

export function EditTransportRoutePage({ onBack, onSave, route }: EditTransportRoutePageProps): React.ReactNode {
  const [formData, setFormData] = React.useState({
    routeName: route.routeName,
    vehicleNumber: route.vehicleNumber,
    driverName: route.driverName,
    driverContact: route.driverContact,
    points: route.points,
    monthlyFee: String(route.monthlyFee),
  });
  const [isSaving, setIsSaving] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!formData.routeName.trim() || !formData.monthlyFee.trim()) {
        alert("Route Name and Monthly Fee are required.");
        return;
    }
    
    setIsSaving(true);
    try {
        await onSave(route.id, {
          ...formData,
          monthlyFee: parseInt(formData.monthlyFee, 10) || 0,
        });
        setShowSuccess(true);
    } catch(error) {
        alert("Failed to update route. Please try again.");
        setIsSaving(false);
    }
  };

  return (
    <>
    <div className="bg-slate-100 dark:bg-gray-900 flex flex-col h-full animate-fade-in">
      <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back to routes">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold ml-2">Edit Transport Route</h1>
      </header>
      
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="flex-grow flex flex-col">
        <main className="flex-grow p-4 overflow-y-auto space-y-4">
          <FormInput id="routeName" name="routeName" label="Route Name" value={formData.routeName} onChange={handleChange} required />
          <FormInput id="vehicleNumber" name="vehicleNumber" label="Vehicle Number" value={formData.vehicleNumber} onChange={handleChange} />
          <FormInput id="driverName" name="driverName" label="Driver Name" value={formData.driverName} onChange={handleChange} />
          <FormInput id="driverContact" name="driverContact" label="Driver Contact" type="tel" value={formData.driverContact} onChange={handleChange} />
          <FormInput id="points" name="points" label="Pickup/Drop Points (comma-separated)" type="textarea" value={formData.points} onChange={handleChange} rows={3} />
          <FormInput id="monthlyFee" name="monthlyFee" label="Monthly Fee (₹)" type="number" inputMode="numeric" value={formData.monthlyFee} onChange={handleChange} required />
        </main>
        
        <footer className="p-4 flex-shrink-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
          <button
            type="submit"
            disabled={isSaving}
            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md disabled:bg-indigo-300"
          >
            {isSaving ? 'UPDATING...' : 'UPDATE ROUTE'}
          </button>
        </footer>
      </form>
    </div>
    {showSuccess && <SuccessModal message="Route updated successfully!" onClose={onBack} />}
    </>
  );
}