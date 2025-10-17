
import React from 'react';
import type { Student, Batch } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { CameraIcon } from './icons/CameraIcon';
import { ContactsIcon } from './icons/ContactsIcon';
import { CalendarIcon } from './icons/CalendarIcon';

interface NewStudentPageProps {
  onBack: () => void;
  onSave: (studentData: Omit<Student, 'id' | 'isActive'>) => void;
  batches: Batch[];
}

const FormInput = ({ label, id, children, containerClassName, ...props }: { label: string, id: string, children?: React.ReactNode, containerClassName?: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className={`relative bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-300 dark:border-gray-600 ${containerClassName}`}>
    <label htmlFor={id} className="absolute -top-2.5 left-3 bg-white dark:bg-gray-800 px-1 text-xs text-gray-500 dark:text-gray-400">{label}</label>
    <div className="flex items-center">
      <input 
        id={id}
        className="w-full text-gray-800 dark:text-gray-100 bg-transparent outline-none"
        {...props} 
      />
      {children && <label htmlFor={id} className="cursor-pointer">{children}</label>}
    </div>
  </div>
);

export function NewStudentPage({ onBack, onSave, batches }: NewStudentPageProps): React.ReactNode {
    const [formData, setFormData] = React.useState<Omit<Student, 'id' | 'feeAmount' | 'isActive'> & { feeAmount: string }>({
        rollNumber: '',
        name: '',
        fatherName: '',
        motherName: '',
        dob: '',
        mobile1: '',
        gender: 'Male',
        address: '',
        admissionDate: '',
        batches: [],
        password: `MTQCJ${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        transport: 'NO_TRANSPORT_USE',
        feeType: 'Monthly',
        feeAmount: '',
    });
    const [isBatchModalOpen, setBatchModalOpen] = React.useState(false);
    const [batchFeeHint, setBatchFeeHint] = React.useState<string | null>(null);

    React.useEffect(() => {
        let feeDetailsFound = false;
        if (formData.batches.length > 0) {
            // Find the first selected batch that has fee details
            for (const batchName of formData.batches) {
                const batchDetails = batches.find(b => b.name === batchName);
                if (batchDetails && batchDetails.batchFeeAmount && batchDetails.batchFeeType) {
                    setFormData(prev => ({
                        ...prev,
                        feeType: batchDetails.batchFeeType,
                        feeAmount: String(batchDetails.batchFeeAmount),
                    }));
                    setBatchFeeHint(`Auto-set from ${batchDetails.name}: ₹${batchDetails.batchFeeAmount}/${batchDetails.batchFeeType}`);
                    feeDetailsFound = true;
                    break; // Exit after finding the first one
                }
            }
        }
        
        if (!feeDetailsFound) {
            setBatchFeeHint(null);
        }
    }, [formData.batches, batches]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'gender') {
            setFormData(prev => ({ ...prev, gender: value as Student['gender'] }));
        } else if (name === 'feeType') {
            setFormData(prev => ({ ...prev, feeType: value as 'Monthly' | 'Yearly' }));
        }
    };

    const handleBatchSelection = (batchName: string) => {
        setFormData(prev => {
            const newBatches = new Set(prev.batches);
            if (newBatches.has(batchName)) {
                newBatches.delete(batchName);
            } else {
                newBatches.add(batchName);
            }
            return { ...prev, batches: Array.from(newBatches) };
        });
    };

    const handleSave = () => {
        if (!formData.name.trim() || !formData.fatherName.trim() || !formData.motherName.trim() || !formData.dob || !formData.mobile1 || !formData.address || !formData.admissionDate || !formData.rollNumber) {
            alert("Please fill all required fields, including Roll Number.");
            return;
        }
        if (formData.batches.length === 0) {
            alert("Please select at least one batch.");
            return;
        }
        if (!formData.feeType || !formData.feeAmount.trim()) {
            alert("Please specify fee type and amount.");
            return;
        }
        onSave({
            ...formData,
            feeAmount: parseFloat(formData.feeAmount) || 0,
        });
    };

  return (
    <>
    <div className="bg-slate-100 dark:bg-gray-900 flex flex-col h-screen animate-fade-in">
      <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold ml-2">New Student</h1>
      </header>
      
      <main className="flex-grow p-4 overflow-y-auto">
        <form id="new-student-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-5">
            <div className="flex justify-center">
                <button type="button" className="w-24 h-24 rounded-full border-2 border-indigo-400 bg-white dark:bg-gray-800 flex items-center justify-center text-indigo-800 dark:text-indigo-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition" aria-label="Upload student photo">
                    <CameraIcon className="w-12 h-12"/>
                </button>
            </div>

            <FormInput label="Roll Number / Student ID" id="rollNumber" name="rollNumber" placeholder="Unique ID for login" value={formData.rollNumber} onChange={handleChange} required />
            <FormInput label="Student Name" id="studentName" name="name" value={formData.name} onChange={handleChange} required containerClassName="border-indigo-500 border-2" />
            <FormInput label="Father Name" id="fatherName" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
            <FormInput label="Mother Name" id="motherName" name="motherName" value={formData.motherName} onChange={handleChange} required />
            <FormInput label="Date of birth" id="dob" name="dob" type="date" value={formData.dob} onChange={handleChange} required>
                <CalendarIcon className="w-6 h-6 text-indigo-600" />
            </FormInput>
            
            <FormInput label="Mobile Number" id="mobile1" name="mobile1" type="tel" value={formData.mobile1} onChange={handleChange} required>
                <span className="text-gray-500 dark:text-gray-400 mr-2">+91</span>
                <ContactsIcon className="w-6 h-6 text-indigo-600" />
            </FormInput>
            <FormInput label="Mobile Number" id="mobile2" name="mobile2" type="tel" value={formData.mobile2} onChange={handleChange}>
                <span className="text-gray-500 dark:text-gray-400 mr-2">+91</span>
                <ContactsIcon className="w-6 h-6 text-indigo-600" />
            </FormInput>

            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-300 dark:border-gray-600">
                <div className="flex items-center justify-around">
                    {['Male', 'Female', 'Other'].map(gender => (
                        <label key={gender} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 cursor-pointer">
                            <input type="radio" name="gender" value={gender} checked={formData.gender === gender} onChange={handleRadioChange} className="form-radio text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-500" />
                            <span>{gender}</span>
                        </label>
                    ))}
                </div>
            </div>

            <FormInput label="Address" id="address" name="address" value={formData.address} onChange={handleChange} required />
            <FormInput label="Admission Date" id="admissionDate" name="admissionDate" type="date" value={formData.admissionDate} onChange={handleChange} required>
                <CalendarIcon className="w-6 h-6 text-indigo-600" />
            </FormInput>
            
            <button type="button" onClick={() => setBatchModalOpen(true)} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
                {formData.batches.length > 0 ? `Selected Batches (${formData.batches.length})` : 'SELECT BATCHES'}
            </button>

            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-300 dark:border-gray-600">
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">Fee Type</label>
                <div className="flex items-center justify-around">
                    {(['Monthly', 'Yearly'] as const).map(type => (
                        <label key={type} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 cursor-pointer">
                            <input
                                type="radio"
                                name="feeType"
                                value={type}
                                checked={formData.feeType === type}
                                onChange={handleRadioChange}
                                className="form-radio text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-500"
                            />
                            <span>{type}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="relative bg-white dark:bg-gray-800 p-3 rounded-lg border border-indigo-500 border-2">
                <label htmlFor="feeAmount" className="absolute -top-2.5 left-3 bg-white dark:bg-gray-800 px-1 text-xs text-gray-500 dark:text-gray-400">
                    Fee Amount
                    {batchFeeHint && <span className="ml-2 font-semibold text-indigo-600 dark:text-indigo-400">{batchFeeHint}</span>}
                </label>
                <div className="flex items-center">
                    <span className="text-gray-500 dark:text-gray-400 text-lg mr-2">₹</span>
                    <input 
                        id="feeAmount"
                        name="feeAmount"
                        type="number"
                        inputMode="numeric"
                        className="w-full text-gray-800 dark:text-gray-100 bg-transparent outline-none"
                        value={formData.feeAmount}
                        onChange={e => setFormData(p => ({...p, feeAmount: e.target.value}))}
                        required
                        placeholder="500"
                    />
                </div>
            </div>

            <FormInput label="Password" id="password" name="password" value={formData.password} readOnly />

            <div className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600">
                <select id="transport" name="transport" value={formData.transport} onChange={handleChange} className="w-full appearance-none bg-white dark:bg-gray-800 p-3 pr-8 rounded-lg text-gray-800 dark:text-gray-100 outline-none border-2 border-indigo-500">
                    <option value="NO_TRANSPORT_USE">NO TRANSPORT USE</option>
                    <option value="USE_TRANSPORT">USE TRANSPORT</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-indigo-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>

            <FormInput label="ID Number(Optional)" id="idNumber" name="idNumber" value={formData.idNumber} onChange={handleChange} />
            <FormInput label="Field 1(Optional)" id="field1" name="field1" value={formData.field1} onChange={handleChange} />
            <FormInput label="Field 2(Optional)" id="field2" name="field2" value={formData.field2} onChange={handleChange} />
        </form>
      </main>
      
      <footer className="p-4 flex-shrink-0 bg-slate-100 dark:bg-gray-900 grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={onBack}
          className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 transition-colors shadow-md"
        >
          CANCEL
        </button>
        <button
          type="submit"
          form="new-student-form"
          className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
        >
          SAVE
        </button>
      </footer>
    </div>
    {isBatchModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl m-4 w-full max-w-md flex flex-col max-h-[90vh]">
                <h3 className="text-lg font-bold p-4 border-b dark:border-gray-700 text-gray-800 dark:text-gray-100">Select Batches</h3>
                <div className="p-4 space-y-2 overflow-y-auto">
                    {batches.length > 0 ? batches.map(batch => (
                        <label key={batch.id} className="flex items-center p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-700 cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="h-5 w-5 rounded text-indigo-600 focus:ring-indigo-500 dark:bg-gray-900 dark:border-gray-600"
                                checked={formData.batches.includes(batch.name)}
                                onChange={() => handleBatchSelection(batch.name)}
                            />
                            <span className="ml-3 text-gray-700 dark:text-gray-300">{batch.name}</span>
                        </label>
                    )) : (
                        <p className="text-gray-500 dark:text-gray-400 text-center">No batches available. Please create a batch first.</p>
                    )}
                </div>
                <div className="p-4 border-t dark:border-gray-700">
                    <button onClick={() => setBatchModalOpen(false)} className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                        Done
                    </button>
                </div>
            </div>
        </div>
    )}
    </>
  );
}