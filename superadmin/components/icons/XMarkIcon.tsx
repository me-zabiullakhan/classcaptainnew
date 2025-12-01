import React from 'react';

export const XMarkIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const { strokeWidth = 1.5, ...rest } = props;
  return (
    <svg {...rest} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
};
