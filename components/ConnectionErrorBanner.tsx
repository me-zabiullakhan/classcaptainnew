
import React from 'react';
import { RefreshIcon } from './icons/RefreshIcon';
import { XMarkIcon } from './icons/XMarkIcon';

interface ConnectionErrorBannerProps {
  message: string;
  onClose: () => void;
}

export function ConnectionErrorBanner({ message, onClose }: ConnectionErrorBannerProps): React.ReactNode {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="bg-red-100 border-b-2 border-red-300 text-red-800 p-3 shadow-md z-10">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium flex-grow mr-4">{message}</p>
        <div className="flex items-center space-x-2 flex-shrink-0">
            <button
              onClick={handleRefresh}
              className="flex items-center space-x-1.5 px-3 py-1 text-xs font-semibold bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              aria-label="Refresh page"
            >
                <RefreshIcon className="w-4 h-4" />
                <span>Refresh</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-red-500 hover:bg-red-200 transition-colors"
              aria-label="Close error message"
            >
                <XMarkIcon className="w-5 h-5" />
            </button>
        </div>
      </div>
    </div>
  );
}
