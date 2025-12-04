import React from 'react';

interface FeatureIconProps {
  name: string;
  Icon: React.FC<{ className?: string }>;
  color: string;
  onClick?: () => void;
}

export const FeatureIcon: React.FC<FeatureIconProps> = ({ name, Icon, color, onClick }) => {
  const isClickable = !!onClick;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div 
      className={`flex flex-col items-center justify-start group ${isClickable ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={isClickable ? name : undefined}
    >
      <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-200 ${color}`}>
        <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
      </div>
      <p className="mt-2 text-xs font-medium text-gray-700 dark:text-gray-300">{name}</p>
    </div>
  );
}