import React from 'react';
import type { Academy } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { EmailIcon } from './icons/EmailIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { GlobeIcon } from './icons/GlobeIcon';
import { BuildingIcon } from './icons/BuildingIcon';
import { PencilIcon } from './icons/PencilIcon';
import { CameraIcon } from './icons/CameraIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { KeyIcon } from './icons/KeyIcon';

interface MyAccountPageProps {
  onBack: () => void;
  onSave: (details: Partial<Academy>) => Promise<void>;
  onLogout: () => void;
  academy: Academy;
}

type FormInputProps = {
  icon: React.ReactNode;
  label: string;
  id: string;
} & (
  | (Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & { type?: React.HTMLInputTypeAttribute })
  | (React.TextareaHTMLAttributes<HTMLTextAreaElement> & { type: 'textarea' })
);

const FormInput = ({ icon, label, id, type, ...props }: FormInputProps) => (
  <div className="relative">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        {icon}
      </div>
      {type === 'textarea' ? (
        <textarea
          id={id}
          className="w-full pl-10 pr-4 py-2 border bg-white text-gray-900 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
          rows={3}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          className="w-full pl-10 pr-4 py-2 border bg-white text-gray-900 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
          type={type}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </div>
  </div>
);

const DetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string | null }) => {
    if (!value) return null;
    return (
        <div className="flex items-start space-x-4 p-3 bg-white rounded-lg border">
            <div className="text-gray-400 mt-1">{icon}</div>
            <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-gray-800 break-words">{value}</p>
            </div>
        </div>
    );
};

export function MyAccountPage({ onBack, onSave, onLogout, academy }: MyAccountPageProps): React.ReactNode {
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState({
    logoUrl: academy.logoUrl || '',
    contactEmail: academy.contactEmail || '',
    contactPhone: academy.contactPhone || '',
    contactPhoneAlt: academy.contactPhoneAlt || '',
    website: academy.website || '',
    address: academy.address || '',
  });
  const [isSaving, setIsSaving] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, logoUrl: reader.result as string }));
        };
        reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
        await onSave(formData);
        setIsEditing(false);
    } catch (error) {
        console.error("Failed to save contact details:", error);
    } finally {
        setIsSaving(false);
    }
  };
  
  const handleCancel = () => {
    setFormData({
        logoUrl: academy.logoUrl || '',
        contactEmail: academy.contactEmail || '',
        contactPhone: academy.contactPhone || '',
        contactPhoneAlt: academy.contactPhoneAlt || '',
        website: academy.website || '',
        address: academy.address || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back to dashboard">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold ml-2">My Account & Settings</h1>
      </header>
      
      <main className="flex-grow p-4 overflow-y-auto">
        {isEditing ? (
            <form id="account-settings-form" onSubmit={handleSave} className="space-y-5">
                 <div className="flex flex-col items-center space-y-2">
                    <label htmlFor="logo-upload" className="cursor-pointer">
                        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-400 hover:border-indigo-500 transition">
                            {formData.logoUrl ? (
                                <img src={formData.logoUrl} alt="Logo Preview" className="w-full h-full object-cover" />
                            ) : (
                                <CameraIcon className="w-10 h-10 text-gray-500" />
                            )}
                        </div>
                    </label>
                    <input id="logo-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    <label htmlFor="logo-upload" className="text-sm font-medium text-indigo-600 cursor-pointer hover:underline">Upload Logo</label>
                </div>

                <FormInput
                    icon={<EmailIcon className="w-5 h-5" />} label="Email Address" id="contactEmail" name="contactEmail" type="email" value={formData.contactEmail} onChange={handleChange} placeholder="e.g., info@myacademy.com"
                />
                <FormInput
                    icon={<PhoneIcon className="w-5 h-5" />} label="Phone Number" id="contactPhone" name="contactPhone" type="tel" value={formData.contactPhone} onChange={handleChange} placeholder="e.g., +91 12345 67890"
                />
                <FormInput
                    icon={<PhoneIcon className="w-5 h-5" />} label="Alternative Phone (Optional)" id="contactPhoneAlt" name="contactPhoneAlt" type="tel" value={formData.contactPhoneAlt} onChange={handleChange} placeholder="Another contact number"
                />
                <FormInput
                    icon={<GlobeIcon className="w-5 h-5" />} label="Website (Optional)" id="website" name="website" type="url" value={formData.website} onChange={handleChange} placeholder="e.g., https://www.myacademy.com"
                />
                <FormInput
                    icon={<BuildingIcon className="w-5 h-5" />} label="Full Address" id="address" name="address" type="textarea" value={formData.address} onChange={handleChange} placeholder="Enter your academy's full address"
                />
            </form>
        ) : (
            <div className="space-y-4">
                <div className="flex flex-col items-center p-4 bg-white rounded-lg border">
                    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-indigo-200">
                        {academy.logoUrl ? (
                            <img src={academy.logoUrl} alt="Academy Logo" className="w-full h-full object-cover" />
                        ) : (
                             <span className="text-4xl font-bold text-indigo-600">{academy.name.charAt(0)}</span>
                        )}
                    </div>
                    <h2 className="mt-4 text-xl font-bold text-gray-800">{academy.name}</h2>
                    <p className="text-sm text-gray-500">ID: {academy.academyId}</p>
                </div>
                
                <DetailItem icon={<EmailIcon className="w-5 h-5"/>} label="Contact Email" value={academy.contactEmail} />
                <DetailItem icon={<PhoneIcon className="w-5 h-5"/>} label="Phone Number" value={academy.contactPhone} />
                <DetailItem icon={<GlobeIcon className="w-5 h-5"/>} label="Website" value={academy.website} />
                <DetailItem icon={<BuildingIcon className="w-5 h-5"/>} label="Address" value={academy.address} />

                <button
                    onClick={onLogout}
                    className="w-full bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center space-x-4 text-left border"
                >
                    <div className="w-10 h-10 text-red-500 flex items-center justify-center p-1">
                        <LogoutIcon />
                    </div>
                    <span className="text-lg font-medium text-red-600">Logout</span>
                </button>
            </div>
        )}
      </main>
      
      <footer className="p-4 bg-slate-100 flex-shrink-0">
        {isEditing ? (
            <div className="grid grid-cols-2 gap-4">
                <button
                    type="button" onClick={handleCancel}
                    className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >CANCEL</button>
                <button
                    type="submit" form="account-settings-form" disabled={isSaving}
                    className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md disabled:bg-indigo-400"
                >{isSaving ? 'Saving...' : 'SAVE DETAILS'}</button>
            </div>
        ) : (
             <button
                onClick={() => setIsEditing(true)}
                className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
            >
                <PencilIcon className="w-5 h-5" />
                <span>EDIT DETAILS</span>
            </button>
        )}
      </footer>
    </div>
  );
}
