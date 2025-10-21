
import React from 'react';
import type { Staff } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { CameraIcon } from './icons/CameraIcon';
import { ContactsIcon } from './icons/ContactsIcon';
import { CalendarIcon } from './icons/CalendarIcon';

interface NewStaffPageProps {
  onBack: () => void;
  onSave: (staffData: Omit<Staff, 'id'>) => void;
}

const FormInput = ({ label, id, children, containerClassName, ...props }: { label: string, id: string, children?: React.ReactNode, containerClassName?: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className={`relative bg-white p-3 rounded-lg border border-gray-300 ${containerClassName}`}>
    <label htmlFor={id} className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500">{label}</label>
    <div className="flex items-center">
      <input 
        id={id}
        className="w-full text-gray-800 bg-transparent outline-none"
        {...props} 
      />
      {children && <label htmlFor={id} className="cursor-pointer">{children}</label>}
    </div>
  </div>
);

export function NewStaffPage({ onBack, onSave }: NewStaffPageProps): React.ReactNode {
    const [formData, setFormData] = React.useState<Omit<Staff, 'id' | 'batchAccess' | 'isActive'>>({
        staffId: `STF${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        name: '',
        dob: '',
        mobile: '',
        email: '',
        gender: 'Male',
        address: '',
        joiningDate: '',
        password: `PASS${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        photo: '',
    });
    const [isPhotoModalOpen, setIsPhotoModalOpen] = React.useState(false);
    const galleryInputRef = React.useRef<HTMLInputElement>(null);
    const cameraInputRef = React.useRef<HTMLInputElement>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'gender') {
            setFormData(prev => ({ ...prev, gender: value as Staff['gender'] }));
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, photo: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
        setIsPhotoModalOpen(false);
    };

    const handleSave = () => {
        if (!formData.name.trim() || !formData.dob || !formData.mobile || !formData.address || !formData.joiningDate || !formData.staffId || !formData.password) {
            alert("Please fill all required fields.");
            return;
        }
        
        onSave({
            ...formData,
            batchAccess: {},
            isActive: true,
        });
    };

  return (
    <>
    <div className="bg-slate-100 flex flex-col h-full animate-fade-in">
      <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold ml-2">Add New Staff</h1>
      </header>
      
      <main className="flex-grow p-4 overflow-y-auto">
        <form id="new-staff-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-5">
            <div className="flex justify-center">
                <button
                    type="button"
                    onClick={() => setIsPhotoModalOpen(true)}
                    className="w-24 h-24 rounded-full border-2 border-indigo-400 bg-white flex items-center justify-center text-indigo-800 hover:bg-gray-100 transition overflow-hidden"
                    aria-label="Upload staff photo"
                >
                    {formData.photo ? (
                        <img src={formData.photo} alt="Staff Preview" className="w-full h-full object-cover" />
                    ) : (
                        <CameraIcon className="w-12 h-12"/>
                    )}
                </button>
                <input type="file" accept="image/*" ref={galleryInputRef} onChange={handleFileChange} className="hidden" />
                <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} onChange={handleFileChange} className="hidden" />
            </div>

            <FormInput label="Full Name" id="name" name="name" value={formData.name} onChange={handleChange} required containerClassName="border-indigo-500 border-2" />
            <FormInput label="Date of Birth" id="dob" name="dob" type="date" value={formData.dob} onChange={handleChange} required>
                <CalendarIcon className="w-6 h-6 text-indigo-600" />
            </FormInput>
            <FormInput label="Mobile Number" id="mobile" name="mobile" type="tel" value={formData.mobile} onChange={handleChange} required>
                <ContactsIcon className="w-6 h-6 text-indigo-600" />
            </FormInput>
            <FormInput label="Email (Optional)" id="email" name="email" type="email" value={formData.email} onChange={handleChange} />

            <div className="bg-white p-3 rounded-lg border border-gray-300">
                <div className="flex items-center justify-around">
                    {['Male', 'Female', 'Other'].map(gender => (
                        <label key={gender} className="flex items-center space-x-2 text-gray-700 cursor-pointer">
                            <input type="radio" name="gender" value={gender} checked={formData.gender === gender} onChange={handleRadioChange} className="form-radio text-indigo-600 focus:ring-indigo-500" />
                            <span>{gender}</span>
                        </label>
                    ))}
                </div>
            </div>

            <FormInput label="Address" id="address" name="address" value={formData.address} onChange={handleChange} required />
            <FormInput label="Date of Joining" id="joiningDate" name="joiningDate" type="date" value={formData.joiningDate} onChange={handleChange} required>
                <CalendarIcon className="w-6 h-6 text-indigo-600" />
            </FormInput>

            <FormInput label="Staff ID" id="staffId" name="staffId" value={formData.staffId} readOnly />
            <FormInput label="Password" id="password" name="password" value={formData.password} readOnly />
        </form>
      </main>
      
      <footer className="p-4 flex-shrink-0 bg-slate-100 grid grid-cols-2 gap-4">
        <button type="button" onClick={onBack} className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 transition-colors shadow-md">
          CANCEL
        </button>
        <button type="submit" form="new-staff-form" className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
          SAVE
        </button>
      </footer>
    </div>
    {isPhotoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white rounded-lg shadow-xl m-4 w-full max-w-xs flex flex-col">
                <h3 className="text-lg font-semibold p-4 border-b text-center">Select Photo Source</h3>
                <div className="p-4 space-y-3">
                    <button
                        onClick={() => galleryInputRef.current?.click()}
                        className="w-full bg-indigo-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Choose from Gallery
                    </button>
                    <button
                        onClick={() => cameraInputRef.current?.click()}
                        className="w-full bg-sky-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-sky-700 transition-colors"
                    >
                        Take Photo
                    </button>
                    <button
                        onClick={() => setIsPhotoModalOpen(false)}
                        className="w-full bg-gray-200 text-gray-800 font-bold py-2.5 px-4 rounded-lg hover:bg-gray-300 transition-colors mt-2"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )}
    </>
  );
}