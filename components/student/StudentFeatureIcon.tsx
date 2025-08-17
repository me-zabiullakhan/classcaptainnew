
import React from 'react';

interface StudentFeatureIconProps {
  name: string;
  Icon: React.FC<{ className?: string }>;
  color: string;
  onClick?: () => void;
}

export function StudentFeatureIcon({ name, Icon, color, onClick }: StudentFeatureIconProps): React.ReactNode {
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
      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-md transform group-hover:scale-110 transition-transform duration-200 ${color}`}>
        <Icon className="w-8 h-8" />
      </div>
      <p className="mt-2 text-sm font-medium text-gray-600">{name}</p>
    </div>
  );
}
