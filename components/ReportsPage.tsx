import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { AttendanceIcon } from './icons/AttendanceIcon';
import { FeeCollectionReportIcon } from './icons/FeeCollectionReportIcon';
import { FeesDuesListIcon } from './icons/FeesDuesListIcon';
import { ExamsIcon } from './icons/ExamsIcon';

interface ReportsPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  onShowDevPopup: (featureName: string) => void;
}

const reportOptions = [
  { name: 'Attendance Report', Icon: AttendanceIcon, key: 'attendance-report' },
  { name: 'Fee Collection Report', Icon: FeeCollectionReportIcon, key: 'fee-collection-report' },
  { name: 'Fee Dues List', Icon: FeesDuesListIcon, key: 'fee-dues-list' },
  { name: 'Exam Reports', Icon: ExamsIcon, key: 'exam-reports' },
];

export function ReportsPage({ onBack, onNavigate, onShowDevPopup }: ReportsPageProps): React.ReactNode {
  const handleClick = (key: string) => {
    switch (key) {
      case 'attendance-report':
      case 'fee-collection-report':
      case 'fee-dues-list':
        onNavigate(key);
        break;
      default:
        onShowDevPopup('Exam Reports');
        break;
    }
  };

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back to dashboard">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold ml-2">Reports</h1>
      </header>

      <main className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-4">
          {reportOptions.map(({ name, Icon, key }) => (
            <button
              key={key}
              onClick={() => handleClick(key)}
              className="w-full bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center space-x-4 text-left"
            >
              <div className="w-10 h-10 text-indigo-500 dark:text-indigo-400">
                <Icon />
              </div>
              <span className="text-lg font-medium text-indigo-800 dark:text-gray-100">{name}</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
