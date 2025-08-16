import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { PayFeesIcon } from './icons/PayFeesIcon';
import { FeesDuesListIcon } from './icons/FeesDuesListIcon';
import { FeeCollectionReportIcon } from './icons/FeeCollectionReportIcon';

interface FeesOptionsPageProps {
  onBack: () => void;
  // onSelectOption: (option: string) => void; // Future use
}

const feeOptions = [
  { name: 'Pay Fees', Icon: PayFeesIcon, key: 'pay-fees' },
  { name: 'Fees Dues List', Icon: FeesDuesListIcon, key: 'dues-list' },
  { name: 'Fee Collection Report', Icon: FeeCollectionReportIcon, key: 'collection-report' },
];

export function FeesOptionsPage({ onBack }: FeesOptionsPageProps): React.ReactNode {
  return (
    <div className="animate-fade-in flex flex-col h-full">
      <header className="bg-purple-600 text-white p-3 flex items-center shadow-md w-full -mx-3 sm:-mx-4 mt-[-1rem]">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-purple-700 transition-colors" aria-label="Go back to dashboard">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold ml-2">Fees Options</h1>
      </header>

      <main className="flex-grow pt-6">
        <div className="space-y-4">
          {feeOptions.map(({ name, Icon, key }) => (
            <button
              key={key}
              // onClick={() => onSelectOption(key)} // Future use
              className="w-full bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center space-x-4 text-left"
            >
              <div className="w-10 h-10 text-orange-500">
                <Icon />
              </div>
              <span className="text-lg font-medium text-purple-800">{name}</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}