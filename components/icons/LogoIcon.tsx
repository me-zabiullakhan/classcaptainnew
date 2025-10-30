import React from 'react';

const fullLogoDataUri = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjEzMCIgdmlld0JveD0iMCAwIDI1MCAxMzAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTA0LCAxMCkgc2NhbGUoMS44KSI+PHBhdGggZD0iTTEwIDEyIEgxOCBWMTUgSDIyIFYyMSBINiBWMTUgSDEwIFYxMiBaIiBmaWxsPSIjRDUwMDAwIi8+PHBhdGggZD0iTTggNSBIMjAgTDE4IDExIEgxMCBaIiBmaWxsPSIjRDUwMDAwIi8+PC9nPjx0ZXh0IHg9IjEyNSIgeT0iOTAiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgUm9ib3RvLCBPeHlnZW4sIFVidW50dSwgQ2FudGFyZWxsLCAnT3BlbiBTYW5zJywgJ0hlbHZldGljYSBOZXVlJywgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyOCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiMwNTMwNkMiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNMQVNTIENBUFJJQU48L3RleHQ+PHRleHQgeD0iMTI1IiB5PSIxMTAiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgUm9ib3RvLCBPeHlnZW4sIFVidW50dSwgQ2FudGFyZWxsLCAnT3BlbiBTYW5zJywgJ0hlbHZldGljYSBOZXVlJywgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzNDNDA0MyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgbGV0dGVyLXNwYWNpbmc9IjIiPkdFVCBPUkdBTklTRUQ8L3RleHQ+PC9zdmc+";
const simpleLogoDataUri = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCAyOCAyNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAgMTIgSDE4IFYxNSBIMjIgVjIxIEg2IFYxNSBIMTAgVjEyIFoiIGZpbGw9IiNENUwMDAwIi8+PHBhdGggZD0iTTggNSBIMjAgTDE4IDExIEgxMCBaIiBmaWxsPSIjRDUwMDAwIi8+PC9zdmc+";

export const FullLogoIcon = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const { className, ...rest } = props;
  return (
    <img
      src={fullLogoDataUri}
      alt="Class Captain Logo"
      className={className}
      {...rest}
    />
  );
};

export const LogoIcon = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const { className, ...rest } = props;
  return (
    <img
      src={simpleLogoDataUri}
      alt="Class Captain Logo"
      className={className}
      {...rest}
    />
  );
};