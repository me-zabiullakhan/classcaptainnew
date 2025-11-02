import React from 'react';

const fullLogoDataUri = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjEzMCIgdmlld0JveD0iMCAwIDI1MCAxMzAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTA0LCAxMCkgc2NhbGUoMS44KSI+PHBhdGggZD0iTTEwIDEyIEgxOCBWMTUgSDIyIFYyMSBINiBWMTUgSDEwIFYxMiBaIiBmaWxsPSIjRDUwMDAwIi8+PHBhdGggZD0iTTggNSBIMjAgTDE4IDExIEgxMCBaIiBmaWxsPSIjRDUwMDAwIi8+PC9nPjx0ZXh0IHg9IjEyNSIgeT0iOTAiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgUm9ib3RvLCBPeHlnZW4sIFVidW50dSwgQ2FudGFyZWxsLCAnT3BlbiBTYW5zJywgJ0hlbHZldGljYSBOZXVlJywgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyOCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiMwNTMwNkMiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNMQVNTIENBUFBBSTE4PC90ZXh0Pjx0ZXh0IHg9IjEyNSIgeT0iMTEwIiBmb250LWZhbWlseT0ic3lzdGVtLXVpLCAxYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsIFJvYm90bywgT3h5Z2VuLCBVYnVudHUsIENhbnRhcmVsbCwgJ09wZW4gU2FucycsICdIZWx2ZXRpY2EgTmV1ZScsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiMzQzQwNDMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGxldHRlci1zcGFjaW5nPSIyIj5HRVQgT1JHQU5JU0VEPC90ZXh0Pjwvc3ZnPg==";
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