
import React from 'react';

const simpleLogoDataUri = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCAyOCAyNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAgMTIgSDE4IFYxNSBIMjIgVjIxIEg2IFYxNSBIMTAgVjEyIFoiIGZpbGw9IiNENUwMDAwIi8+PHBhdGggZD0iTTggNSBIMjAgTDE4IDExIEgxMCBaIiBmaWxsPSIjRDUwMDAwIi8+PC9zdmc+";

export const FullLogoIcon = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...rest } = props;
  return (
    <div className={`flex items-center gap-3 justify-center ${className}`} {...rest}>
        <img src={simpleLogoDataUri} alt="OptiLearn Logo" className="h-10 w-10 flex-shrink-0" />
        <div className="flex flex-col text-left">
            <span className="text-2xl font-extrabold text-gray-900 tracking-tight leading-none">OptiLearn</span>
            <span className="text-[0.6rem] font-bold text-gray-500 tracking-[0.2em] uppercase mt-0.5">Get Organised</span>
        </div>
    </div>
  );
};

export const LogoIcon = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const { className, ...rest } = props;
  return (
    <img
      src={simpleLogoDataUri}
      alt="OptiLearn Logo"
      className={className}
      {...rest}
    />
  );
};
