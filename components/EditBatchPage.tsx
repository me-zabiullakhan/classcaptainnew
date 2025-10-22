import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import type { Batch } from '../types';
import { ClockIcon } from './icons/ClockIcon';

interface EditBatchPageProps {
  onBack: () => void;
  onSave: (batchId: string, batchData: Omit<Batch, 'id' | 'currentStudents'>) => void;
  batch: Batch;
}

const FormInput = ({ label, id, icon, ...props }: { label: string, id: string, icon?: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="mb-6 relative">
    <label htmlFor={id} className="block text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">{label}</label>
    <input 
      id={id}
      className="w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 pb-2 text-lg text-gray-800 dark:text-gray-100 outline-none transition-colors"
      {...props} 
    />
    {icon && <label htmlFor={id} className="absolute right-0 bottom-2 text-gray-400 cursor-pointer">{icon}</label>}
  </div>
);

const DayButton: React.FC<{ day: string, isSelected: boolean, onClick: () => void}> = ({ day, isSelected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
      isSelected
        ? 'bg-indigo-600 border-indigo-600 text-white'
        : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
    }`}
  >
    {day}
  </button>
);

const ToggleSwitch: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
    <button
        type="button"
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${checked ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
        onClick={onChange}
        aria-pressed={checked}
    >
        <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}
        />
    </button>
);


export function EditBatchPage({ onBack, onSave, batch }: EditBatchPageProps): React.ReactNode {
  const [name, setName] = React.useState(batch.name);
  const [location, setLocation] = React.useState(batch.location);
  const [teacher, setTeacher] = React.useState(batch.teacher);
  const [time, setTime] = React.useState(batch.time);
  const [maxSlots, setMaxSlots] = React.useState(String(batch.maxSlots));
  const [selectedDays, setSelectedDays] = React.useState<Set<string>>(new Set(batch.days));
  const [batchFeeAmount, setBatchFeeAmount] = React.useState(String(batch.batchFeeAmount || ''));
  const [batchFeeType, setBatchFeeType] = React.useState<'Monthly' | 'Yearly' | undefined>(batch.batchFeeType);
  const [isActive, setIsActive] = React.useState(batch.isActive);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const toggleDay = (day: string) => {
    setSelectedDays(prev => {
      const newDays = new Set(prev);
      if (newDays.has(day)) {
        newDays.delete(day);
      } else {
        newDays.add(day);
      }
      return newDays;
    });
  };

  const handleSave = () => {
    if (!name.trim() || !maxSlots.trim()) {
        alert("Batch Name and Maximum Slots are required.");
        return;
    }

    const feeAmountNumber = batchFeeAmount ? parseInt(batchFeeAmount, 10) : undefined;
    
    const saveData: Omit<Batch, 'id' | 'currentStudents'> = {
      name,
      location,
      teacher,
      time,
      days: Array.from(selectedDays),
      maxSlots: parseInt(maxSlots, 10) || 0,
      isActive,
    };

    if (feeAmountNumber && feeAmountNumber > 0 && batchFeeType) {
        saveData.batchFeeAmount = feeAmountNumber;
        saveData.batchFeeType = batchFeeType;
    } else if (feeAmountNumber && !batchFeeType) {
        alert("Please select a fee type (Monthly/Yearly) for the batch fee.");
        return;
    }

    onSave(batch.id, saveData);
  };

  return (
    <div className="bg-slate-100 dark:bg-gray-900 flex flex-col h-full animate-fade-in">
      <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back to batches">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold ml-2">Edit Batch</h1>
      </header>
      
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="flex-grow flex flex-col">
        <main className="flex-grow p-4 overflow-y-auto">
          <div className="mb-6 flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-300 dark:border-gray-600">
            <label className="block text-gray-500 dark:text-gray-400 text-sm font-medium">Batch Status</label>
            <div className="flex items-center space-x-2">
                <span className={`text-sm font-semibold ${isActive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{isActive ? 'Active' : 'Inactive'}</span>
                <ToggleSwitch checked={isActive} onChange={() => setIsActive(prev => !prev)} />
            </div>
          </div>
          <FormInput id="batchName" label="Batch Name" value={name} onChange={e => setName(e.target.value)} required />
          <FormInput id="batchLocation" label="Batch Location" value={location} onChange={e => setLocation(e.target.value)} />
          <FormInput id="batchTeacher" label="Batch Teacher" value={teacher} onChange={e => setTeacher(e.target.value)} />
          <FormInput id="batchTime" label="Batch Time" type="time" value={time} onChange={e => setTime(e.target.value)} icon={<ClockIcon className="w-6 h-6" />} />
          
          <div className="mb-6">
            <label className="block text-gray-500 dark:text-gray-400 text-sm font-medium mb-3">Batch Fee (Optional)</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-lg">₹</span>
                <input 
                  className="w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 pl-8 pr-2 pb-2 text-lg text-gray-800 dark:text-gray-100 outline-none transition-colors"
                  type="number"
                  inputMode="numeric"
                  placeholder="e.g. 500"
                  value={batchFeeAmount}
                  onChange={e => setBatchFeeAmount(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-end gap-3 self-end mb-1">
                {(['Monthly', 'Yearly'] as const).map(type => (
                  <label key={type} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 cursor-pointer">
                    <input
                      type="radio"
                      name="batchFeeType"
                      value={type}
                      checked={batchFeeType === type}
                      onChange={() => setBatchFeeType(type)}
                      className="form-radio text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                      disabled={!batchFeeAmount}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-500 dark:text-gray-400 text-sm font-medium mb-3">Batch Days</label>
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map(day => (
                <DayButton
                  key={day}
                  day={day}
                  isSelected={selectedDays.has(day)}
                  onClick={() => toggleDay(day)}
                />
              ))}
            </div>
          </div>
          
          <FormInput id="maxSlots" label="Batch Maximum Slots" type="number" inputMode="numeric" pattern="[0-9]*" value={maxSlots} onChange={e => setMaxSlots(e.target.value)} required />
        </main>
        
        <footer className="p-4 flex-shrink-0 bg-slate-100 dark:bg-gray-900">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            UPDATE BATCH
          </button>
        </footer>
      </form>
    </div>
  );
}