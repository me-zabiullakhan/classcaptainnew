



import React from 'react';
import type { Student, Batch, Enquiry, Academy } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { CameraIcon } from './icons/CameraIcon';
import { ContactsIcon } from './icons/ContactsIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { ClipboardDocumentIcon } from './icons/ClipboardDocumentIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { ImageEditorModal } from './ImageEditorModal';
import { PLATFORM_CONFIG } from '../platformConfig';

interface NewStudentPageProps {
  onBack: () => void;
  onSave: (studentData: Omit<Student, 'id' | 'isActive'>, enquiryId?: string) => Promise<Student | void>;
  batches: Batch[];
  academyId: string;
  enquiryData?: Enquiry | null;
  students: Student[];
  academy?: Academy;
}

const StudentCreationSuccessModal: React.FC<{ student: Student, academyId: string, onClose: () => void }> = ({ student, academyId, onClose }) => {
    
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        const textToCopy = `Student Login Details:\nAcademy ID: ${academyId}\nRoll Number: ${student.rollNumber}\nDate of Birth: ${student.dob}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg max-w-sm mx-auto text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/40 mb-5">
                    <CheckCircleIcon className="h-9 w-9 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Student Added Successfully!</h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
                    The student can now log in using their Academy ID, Roll Number, and Date of Birth.
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-left space-y-2 mb-6 border border-gray-200 dark:border-gray-600">
                    <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-500 dark:text-gray-400 text-sm">Academy ID:</span>
                        <span className="font-mono font-bold text-gray-800 dark:text-gray-100">{academyId}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-500 dark:text-gray-400 text-sm">Roll Number:</span>
                        <span className="font-mono font-bold text-gray-800 dark:text-gray-100">{student.rollNumber}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-500 dark:text-gray-400 text-sm">Date of Birth:</span>
                        <span className="font-mono font-bold text-gray-800 dark:text-gray-100">{student.dob}</span>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button 
                        onClick={handleCopy}
                        className="w-full flex items-center justify-center gap-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold py-3 px-4 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900 transition-colors"
                    >
                        <ClipboardDocumentIcon className="w-5 h-5" />
                        <span>{copied ? 'Copied!' : 'Copy Details'}</span>
                    </button>
                    <button 
                        onClick={onClose}
                        className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

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

export function NewStudentPage({ onBack, onSave, batches, academyId, enquiryData, students, academy }: NewStudentPageProps): React.ReactNode {
    const [formData, setFormData] = React.useState<Omit<Student, 'id' | 'feeAmount' | 'isActive'> & { feeAmount: string }>({
        rollNumber: '',
        name: '',
        fatherName: '',
        motherName: '',
        dob: '',
        mobile1: '',
        email: '',
        schoolOrCollege: '',
        gender: 'Male',
        address: '',
        admissionDate: '',
        batches: [],
        transport: 'NO_TRANSPORT_USE',
        feeType: 'Monthly',
        feeAmount: '',
        photo: '',
    });
    const [isBatchModalOpen, setBatchModalOpen] = React.useState(false);
    const [batchFeeHint, setBatchFeeHint] = React.useState<string | null>(null);
    const [createdStudent, setCreatedStudent] = React.useState<Student | null>(null);
    const [isSaving, setIsSaving] = React.useState(false);

    const [isPhotoSourceModalOpen, setIsPhotoSourceModalOpen] = React.useState(false);
    const [imageToEdit, setImageToEdit] = React.useState<string | null>(null);
    const galleryInputRef = React.useRef<HTMLInputElement>(null);
    const cameraInputRef = React.useRef<HTMLInputElement>(null);

    const activeBatches = batches.filter(b => b.isActive);

    React.useEffect(() => {
        if (students && students.length > 0) {
            const lastId = students.reduce((max, s) => {
                const num = parseInt(s.rollNumber.replace(/\D/g, ''), 10);
                return isNaN(num) ? max : Math.max(max, num);
            }, 0);
            const newIdNumber = lastId + 1;
            const nextRollNumber = `S${String(newIdNumber).padStart(4, '0')}`;
            setFormData(prev => ({ ...prev, rollNumber: nextRollNumber }));
        } else {
            setFormData(prev => ({ ...prev, rollNumber: 'S0001' }));
        }
    }, [students]);
    
    React.useEffect(() => {
        if (enquiryData) {
            setFormData(prev => ({
                ...prev,
                name: enquiryData.studentName,
                mobile1: enquiryData.mobile,
                email: enquiryData.email || '',
                batches: enquiryData.interestedBatch ? [enquiryData.interestedBatch] : [],
            }));
        }
    }, [enquiryData]);


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
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageToEdit(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
        setIsPhotoSourceModalOpen(false);
        event.target.value = '';
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

    const handleSave = async () => {
        // --- Limit Check Implementation ---
        if (academy && academy.plan) {
            const currentPlan = PLATFORM_CONFIG.plans[academy.plan] || PLATFORM_CONFIG.plans.monthly; // Default to monthly if undefined
            const currentCount = students.length;
            
            // Check if subscription status is strictly 'active' or 'trialing'
            const isSubActive = academy.subscriptionStatus === 'active' || academy.subscriptionStatus === 'trialing';

            if (!isSubActive) {
                 alert("Your subscription has expired. Please renew your plan to add new students.");
                 return;
            }

            if (currentCount >= currentPlan.limit) {
                alert(`You have reached the student limit for your ${currentPlan.label} (${currentPlan.limit} students). Please upgrade your plan to add more students.`);
                return;
            }
        }
        // ----------------------------------

        if (!formData.rollNumber.trim() || !formData.name.trim() || !formData.fatherName.trim() || !formData.motherName.trim() || !formData.dob || !formData.mobile1 || !formData.address || !formData.admissionDate) {
            alert("Please fill all required fields.");
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
        
        setIsSaving(true);
        const result = await onSave({
            ...formData,
            feeAmount: parseFloat(formData.feeAmount) || 0,
        }, enquiryData?.id);
        setIsSaving(false);
        if (result) {
            setCreatedStudent(result);
        }
    };

  return (
    <>
    <div className="bg-slate-100 dark:bg-gray-900 flex flex-col h-full animate-fade-in">
      <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold ml-2">{enquiryData ? 'Convert Enquiry to Admission' : 'New Student'}</h1>
      </header>
      
      <main className="flex-grow p-4 overflow-y-auto">
        <form id="new-student-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-5">
            <div className="flex justify-center">
                <button
                    type="button"
                    onClick={() => setIsPhotoSourceModalOpen(true)}
                    className="w-24 h-24 rounded-full border-2 border-indigo-400 bg-white dark:bg-gray-800 flex items-center justify-center text-indigo-800 dark:text-indigo-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition overflow-hidden"
                    aria-label="Upload student photo"
                >
                    {formData.photo ? (
                        <img src={formData.photo} alt="Student Preview" className="w-full h-full object-cover" />
                    ) : (
                        <CameraIcon className="w-12 h-12"/>
                    )}
                </button>
                <input type="file" accept="image/*" ref={galleryInputRef} onChange={handleFileChange} className="hidden" />
                <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} onChange={handleFileChange} className="hidden" />
            </div>

            <FormInput label="Roll Number / Student ID" id="rollNumber" name="rollNumber" placeholder="Unique ID for login" value={formData.rollNumber} onChange={handleChange} required />
            <FormInput label="Student Name" id="studentName" name="name" value={formData.name} onChange={handleChange} required containerClassName="border-indigo-500 border-2" />
            <FormInput label="Father Name" id="fatherName" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
            <FormInput label="Mother Name" id="motherName" name="motherName" value={formData.motherName} onChange={handleChange} required />
            <FormInput label="School / College (Optional)" id="schoolOrCollege" name="schoolOrCollege" value={formData.schoolOrCollege} onChange={handleChange} />
            <FormInput label="Date of birth" id="dob" name="dob" type="date" value={formData.dob} onChange={handleChange} required>
                <CalendarIcon className="w-6 h-6 text-indigo-600" />
            </FormInput>
            
            <FormInput label="Mobile Number" id="mobile1" name="mobile1" type="tel" value={formData.mobile1} onChange={handleChange} required>
                <span className="text-gray-500 dark:text-gray-400 mr-2">+91</span>
                <ContactsIcon className="w-6 h-6 text-indigo-600" />
            </FormInput>
            <FormInput label="Email Address (optional)" id="email" name="email" type="email" value={formData.email} onChange={handleChange} />

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
          disabled={isSaving}
          className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 transition-colors shadow-md disabled:bg-red-300 disabled:cursor-not-allowed"
        >
          CANCEL
        </button>
        <button
          type="submit"
          form="new-student-form"
          disabled={isSaving}
          className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md disabled:bg-indigo-300 disabled:cursor-not-allowed"
        >
          {isSaving ? 'SAVING...' : 'SAVE'}
        </button>
      </footer>
    </div>
    {isBatchModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl m-4 w-full max-w-md flex flex-col max-h-[90vh]">
                <h3 className="text-lg font-bold p-4 border-b dark:border-gray-700 text-gray-800 dark:text-gray-100">Select Batches</h3>
                <div className="p-4 space-y-2 overflow-y-auto">
                    {activeBatches.length > 0 ? activeBatches.map(batch => (
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
                        <p className="text-gray-500 dark:text-gray-400 text-center">No active batches available. Please create an active batch first.</p>
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
     {isPhotoSourceModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl m-4 w-full max-w-xs flex flex-col">
                <h3 className="text-lg font-semibold p-4 border-b dark:border-gray-700 text-center">Select Photo Source</h3>
                <div className="p-4 space-y-3">
                    <button onClick={() => galleryInputRef.current?.click()} className="w-full bg-indigo-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                        Choose from Gallery
                    </button>
                    <button onClick={() => cameraInputRef.current?.click()} className="w-full bg-sky-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-sky-700 transition-colors">
                        Take Photo
                    </button>
                    <button onClick={() => setIsPhotoSourceModalOpen(false)} className="w-full bg-gray-200 text-gray-800 font-bold py-2.5 px-4 rounded-lg hover:bg-gray-300 transition-colors mt-2 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )}
    {imageToEdit && (
        <ImageEditorModal
            src={imageToEdit}
            onSave={(croppedImage) => {
                setFormData(prev => ({...prev, photo: croppedImage}));
                setImageToEdit(null);
            }}
            onCancel={() => setImageToEdit(null)}
        />
    )}
    {createdStudent && <StudentCreationSuccessModal student={createdStudent} academyId={academyId} onClose={onBack} />}
    </>
  );
}