import React from 'react';
import type { Academy } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { EmailIcon } from './icons/EmailIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { GlobeIcon } from './icons/GlobeIcon';
import { BuildingIcon } from './icons/BuildingIcon';
import { PencilIcon } from './icons/PencilIcon';

interface ContactUsPageProps {
  onBack: () => void;
  onSave: (details: Partial<Academy>) => Promise<void>;
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
                <p className="text-gray-800">{value}</p>
            </div>
        </div>
    );
};


export function ContactUsPage({ onBack, onSave, academy }: ContactUsPageProps): React.ReactNode {
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState({
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
        await onSave(formData);
        setIsEditing(false);
    } catch (error) {
        console.error("Failed to save contact details:", error);
        // Error alert is handled in App.tsx
    } finally {
        setIsSaving(false);
    }
  };
  
  const handleCancel = () => {
    setFormData({
        contactEmail: academy.contactEmail || '',
        contactPhone: academy.contactPhone || '',
        contactPhoneAlt: academy.contactPhoneAlt || '',
        website: academy.website || '',
        address: academy.address || '',
    });
    setIsEditing(false);
  };

  const hasAnyInfo = Object.values(formData).some(val => val);

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md w-full -mx-3 sm:-mx-4 mt-[-1rem]">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back to dashboard">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold ml-2">Contact Us Settings</h1>
      </header>
      
      <main className="flex-grow pt-6">
        {isEditing ? (
            <form id="contact-us-form" onSubmit={handleSave} className="space-y-5">
                <FormInput
                    icon={<EmailIcon className="w-5 h-5" />}
                    label="Email Address"
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder="e.g., info@myacademy.com"
                />
                <FormInput
                    icon={<PhoneIcon className="w-5 h-5" />}
                    label="Phone Number"
                    id="contactPhone"
                    name="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    placeholder="e.g., +91 12345 67890"
                />
                <FormInput
                    icon={<PhoneIcon className="w-5 h-5" />}
                    label="Alternative Phone (Optional)"
                    id="contactPhoneAlt"
                    name="contactPhoneAlt"
                    type="tel"
                    value={formData.contactPhoneAlt}
                    onChange={handleChange}
                    placeholder="Another contact number"
                />
                <FormInput
                    icon={<GlobeIcon className="w-5 h-5" />}
                    label="Website (Optional)"
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="e.g., https://www.myacademy.com"
                />
                <FormInput
                    icon={<BuildingIcon className="w-5 h-5" />}
                    label="Full Address"
                    id="address"
                    name="address"
                    type="textarea"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your academy's full address"
                />
            </form>
        ) : (
            <div className="space-y-4">
                {hasAnyInfo ? (
                    <>
                        <DetailItem icon={<EmailIcon className="w-5 h-5"/>} label="Email Address" value={academy.contactEmail} />
                        <DetailItem icon={<PhoneIcon className="w-5 h-5"/>} label="Phone Number" value={academy.contactPhone} />
                        <DetailItem icon={<PhoneIcon className="w-5 h-5"/>} label="Alternative Phone" value={academy.contactPhoneAlt} />
                        <DetailItem icon={<GlobeIcon className="w-5 h-5"/>} label="Website" value={academy.website} />
                        <DetailItem icon={<BuildingIcon className="w-5 h-5"/>} label="Address" value={academy.address} />
                    </>
                ) : (
                    <div className="text-center py-16 px-4 bg-gray-50 rounded-lg">
                        <p className="text-lg text-gray-500">No contact information saved yet.</p>
                        <p className="text-gray-400 mt-2">Click "Edit Details" to add your academy's public contact info.</p>
                    </div>
                )}
            </div>
        )}
      </main>
      
      <footer className="p-4 flex-shrink-0 bg-slate-100 mt-auto">
        {isEditing ? (
            <div className="grid grid-cols-2 gap-4">
                <button
                    type="button"
                    onClick={handleCancel}
                    className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    CANCEL
                </button>
                <button
                    type="submit"
                    form="contact-us-form"
                    disabled={isSaving}
                    className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                >
                    {isSaving ? 'Saving...' : 'SAVE DETAILS'}
                </button>
            </div>
        ) : (
             <button
                onClick={() => setIsEditing(true)}
                className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <PencilIcon className="w-5 h-5" />
                <span>EDIT DETAILS</span>
            </button>
        )}
      </footer>
    </div>
  );
}