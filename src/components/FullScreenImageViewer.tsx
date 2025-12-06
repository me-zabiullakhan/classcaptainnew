
import React from 'react';
import { XMarkIcon } from './icons/XMarkIcon';

interface FullScreenImageViewerProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export const FullScreenImageViewer: React.FC<FullScreenImageViewerProps> = ({ src, alt, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Full screen image viewer"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white p-2 bg-black/50 rounded-full hover:bg-black/75 transition-colors"
        aria-label="Close image viewer"
      >
        <XMarkIcon className="w-8 h-8" />
      </button>
      <div className="relative max-w-[90vw] max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <img src={src} alt={alt} className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
      </div>
    </div>
  );
};
