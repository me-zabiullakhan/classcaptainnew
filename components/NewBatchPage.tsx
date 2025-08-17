
import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import type { Batch } from '../types';

interface NewBatchPageProps {
  onBack: () => void;
  onSave: (batchData: Omit<Batch, 'id' | 'currentStudents'>) => void;
}

const FormInput = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="mb-6">
    <label className="block text-gray-500 text-sm font-medium mb-2">{label}</label>
    <input 
      className="w-full bg-transparent border-b-2 border-gray-300 focus:border-indigo-500 pb-2 text-lg text-gray-800 outline-none transition-colors"
      {...props} 
    />
  </div>
);

const DayButton = ({ day, isSelected, onClick }: { day: string, isSelected: boolean, onClick: () => void}) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
      isSelected
        ? 'bg-indigo-600 border-indigo-600 text-white'
        : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'
    }`}
  >
    {day}
  </button>
);

export function NewBatchPage({ onBack, onSave }: NewBatchPageProps): React.ReactNode {
  const [name, setName] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [teacher, setTeacher] = React.useState('');
  const [time, setTime] = React.useState('');
  const [maxSlots, setMaxSlots] = React.useState('');
  const [selectedDays, setSelectedDays] = React.useState<Set<string>>(new Set());
  const [batchFeeAmount, setBatchFeeAmount] = React.useState('');
  const [batchFeeType, setBatchFeeType] = React.useState<'Monthly' | 'Yearly' | undefined>(undefined);

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
    };

    if (feeAmountNumber && feeAmountNumber > 0 && batchFeeType) {
        saveData.batchFeeAmount = feeAmountNumber;
        saveData.batchFeeType = batchFeeType;
    } else if (feeAmountNumber && !batchFeeType) {
        alert("Please select a fee type (Monthly/Yearly) for the batch fee.");
        return;
    }

    onSave(saveData);
  };

  return (
    <div className="bg-slate-100 flex flex-col h-full animate-fade-in">
      <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back to batches">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold ml-2">New Batch</h1>
      </header>
      
      <main className="flex-grow p-4 overflow-y-auto">
        <form id="new-batch-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <FormInput label="Batch Name" value={name} onChange={e => setName(e.target.value)} required />
          <FormInput label="Batch Location" value={location} onChange={e => setLocation(e.target.value)} />
          <FormInput label="Batch Teacher" value={teacher} onChange={e => setTeacher(e.target.value)} />
          <FormInput label="Batch Time" type="time" value={time} onChange={e => setTime(e.target.value)} />
          
          <div className="mb-6">
            <label className="block text-gray-500 text-sm font-medium mb-3">Batch Fee (Optional)</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">₹</span>
                <input 
                  className="w-full bg-transparent border-b-2 border-gray-300 focus:border-indigo-500 pl-8 pr-2 pb-2 text-lg text-gray-800 outline-none transition-colors"
                  type="number"
                  inputMode="numeric"
                  placeholder="e.g. 500"
                  value={batchFeeAmount}
                  onChange={e => setBatchFeeAmount(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-end gap-3 self-end mb-1">
                {(['Monthly', 'Yearly'] as const).map(type => (
                  <label key={type} className="flex items-center space-x-2 text-gray-700 cursor-pointer">
                    <input
                      type="radio"
                      name="batchFeeType"
                      value={type}
                      checked={batchFeeType === type}
                      onChange={() => setBatchFeeType(type)}
                      className="form-radio text-indigo-600 focus:ring-indigo-500"
                      disabled={!batchFeeAmount}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-500 text-sm font-medium mb-3">Batch Days</label>
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
          
          <FormInput label="Batch Maximum Slots" type="number" inputMode="numeric" pattern="[0-9]*" value={maxSlots} onChange={e => setMaxSlots(e.target.value)} required />
        </form>
      </main>
      
      <footer className="p-4 flex-shrink-0 bg-slate-100">
        <button
          type="submit"
          form="new-batch-form"
          className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          SAVE BATCH
        </button>
      </footer>
    </div>
  );
}
