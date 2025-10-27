import React, { useState, useEffect } from 'react';
import type { Batch, BatchAccessPermissions, AttendanceStatus } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { SearchIcon } from './icons/SearchIcon';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { LoadingSpinner } from './LoadingSpinner';

interface SelectBatchForAttendancePageProps {
  onBack: () => void;
  batches: Batch[];
  onSelectBatch: (batchId: string) => void;
  staffPermissions?: Record<string, BatchAccessPermissions>;
  academyId: string;
}

interface BatchAttendanceCardProps {
  batch: Batch;
  onSelect: () => void;
  counts: { present: number; absent: number; leave: number };
}

const formatTime12h = (timeString: string | undefined): string => {
    if (!timeString) {
      return '';
    }
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)/;
    const match = timeString.match(timeRegex);
    
    if (!match) {
      return timeString;
    }
  
    let [_, hours, minutes] = match;
    let h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12; // the hour '0' should be '12'
    
    return `${h}:${minutes} ${ampm}`;
  };

const BatchAttendanceCard: React.FC<BatchAttendanceCardProps> = ({ batch, onSelect, counts }) => (
  <button onClick={onSelect} className="w-full bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-left">
    <div className="flex justify-between items-start mb-4">
      <h3 className="font-bold text-indigo-800 dark:text-gray-100 text-base">{batch.name}</h3>
      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{formatTime12h(batch.time)}</span>
    </div>
    <div className="grid grid-cols-3 text-center">
      <div>
        <p className="text-sm text-green-500">Present</p>
        <p className="font-bold text-lg text-gray-800 dark:text-gray-200">{counts.present}</p>
      </div>
      <div>
        <p className="text-sm text-red-500">Absent</p>
        <p className="font-bold text-lg text-gray-800 dark:text-gray-200">{counts.absent}</p>
      </div>
      <div>
        <p className="text-sm text-orange-500">Leave</p>
        <p className="font-bold text-lg text-gray-800 dark:text-gray-200">{counts.leave}</p>
      </div>
    </div>
  </button>
);

export function SelectBatchForAttendancePage({ onBack, batches, onSelectBatch, staffPermissions, academyId }: SelectBatchForAttendancePageProps): React.ReactNode {
  const [batchCounts, setBatchCounts] = useState<Record<string, { present: number; absent: number; leave: number }>>({});
  const [isLoading, setIsLoading] = useState(true);

  const activeBatches = batches.filter(batch => {
    if (!batch.isActive) return false;
    if (staffPermissions) {
        return !!staffPermissions[batch.id]?.attendance;
    }
    return true;
  });

  useEffect(() => {
    const getFormattedDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const fetchCounts = async () => {
        setIsLoading(true);
        const todayString = getFormattedDate(new Date());
        const counts: Record<string, { present: number; absent: number; leave: number }> = {};

        // Use Promise.all to fetch data concurrently
        await Promise.all(activeBatches.map(async (batch) => {
            const attendanceRef = doc(db, `academies/${academyId}/batches/${batch.id}/attendance`, todayString);
            try {
                const docSnap = await getDoc(attendanceRef);

                let present = 0;
                let absent = 0;
                let leave = 0;

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    Object.values(data).forEach((status: AttendanceStatus) => {
                        if (status === 'Present') present++;
                        else if (status === 'Absent') absent++;
                        else if (status === 'Leave') leave++;
                    });
                }
                counts[batch.id] = { present, absent, leave };
            } catch (error) {
                console.error(`Failed to fetch attendance for batch ${batch.id}:`, error);
                counts[batch.id] = { present: 0, absent: 0, leave: 0 };
            }
        }));
        
        setBatchCounts(counts);
        setIsLoading(false);
    };

    if (academyId && activeBatches.length > 0) {
        fetchCounts();
    } else {
        setIsLoading(false);
    }
  }, [batches, academyId, staffPermissions]);


  return (
    <div className="animate-fade-in flex flex-col h-full">
      <header className="bg-indigo-700 text-white p-3 flex items-center justify-between shadow-md flex-shrink-0 sticky top-0 z-10">
        <div className="flex items-center">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back to dashboard">
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold ml-2">Select Batch</h1>
        </div>
        <button className="p-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Search batches">
          <SearchIcon className="w-6 h-6" />
        </button>
      </header>

      <main className="flex-grow p-4 overflow-y-auto">
        {isLoading ? (
             <div className="text-center py-20 px-4">
                <LoadingSpinner message="Loading attendance data..." />
            </div>
        ) : activeBatches.length > 0 ? (
          <div className="space-y-3">
            {activeBatches.map(batch => (
              <BatchAttendanceCard 
                key={batch.id}
                batch={batch}
                onSelect={() => onSelectBatch(batch.id)}
                counts={batchCounts[batch.id] || { present: 0, absent: 0, leave: 0 }}
               />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4">
            <p className="text-lg text-gray-500">No batches assigned for attendance.</p>
            <p className="text-sm text-gray-400 mt-2">Admin needs to grant you attendance permission for one or more batches.</p>
          </div>
        )}
      </main>
    </div>
  );
}
