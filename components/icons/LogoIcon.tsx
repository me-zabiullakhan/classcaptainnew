import React from 'react';

const logoDataUri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX////AAD/U1P/Q0P/7u7/LS3/GBj/4+P/vr7/ERH/ycn/zs7/nJz/jIz/aWn/SEj/dXX/paX/rq7/goL/ICD/UVH/NTX/WVn/wcH/DAz/fn7/1tb/amr/cXH/lJT/iIj/srL/ior/9PT/MiqNAAAEKklEQVR4nO3d63qqMBSG4Qkh0IKi4MGreNf//5c3g0YSS2/dADudk/e+T1xJE5v03s1pAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgP43j4m2p44x2bA1DqXW9y+pRs7Z8W4c45tRpwdvSy5n8u923t57bI1i5lV0rGOfF960r35Y8j+u61m2T8/qZ29RljbO6P735rOXT1+e1dY0zVb9q862Xq+t6l9lWdY9bWvS2t7H/5+f7l7vV2V/DPB/N9s/vl7vV3V/LPG/Fh8f3lbnV3V/BPO8G9+e3lbnV+V+E/O8E98f31buVmd/EfO8A98f31ZuV+d+CPO8/Yd3/Ph2d+d+D/O8DRe+ne/u7+wvwfO209n8EzyvXp7fX+ZX5n4R5nlL0/uL88v8zvwSvG/TzB/eL/Nf5n4V5nlr0/uL84v8yvwyvB/TzJ/eL/P/zO8v8Ly1q/P7m/zM/DK8/9PMn94v87/M7w/wvN1qfn+N/M/8Mgjve9Y/t5/M/zO/vMCzP7ufzS/zs+B56/p8P5t/mZ8Fz9s086f3y/wsPwfP2w3zP7yfzS/Ds/f3l/nM/DI8bz16e31/mV+bXcM9bms7fz29n9/eL89bq/P4mP3s/P3/5+3l9P5u/wPN23L/e/zO/DO8H87wH87x/PZ2/X+aX5leB5+1n85/M/zK/DI/bz+Y/mf9lflaB523z/fN8P5t/mZ8Fz9tO5z/L/Cs8L9PMn94v87/wPDBv/mP/mP9lfhkeP5n/5D/z/wvPC/TzJ/eL/O/8DywdP+w/3P/mH9lfhket5/Nf/If+Z/5ZWB+f319v5l/mV8GnrfN5p/M/zK/DPv9bH78fnY/n/8zvwyP28/mP/mP/M/8MjxvP5v/5D/zv/AsMPf3l/nM/DI8bz+b/+Q/87/wLDBvP5v/5D/zv/AsMPf3l/nM/DI8bz+b/+Q/87/wLDBvP5v/5D/zv/AsMPf3l/nM/DI8bz+b/+Q/87/wLDBvP5v/5D/zv/AsMPf3l/nM/DI8bz+b/+Q/87/wLDBvP5v/5D/zv/AsMPf3l/nM/DI8bz+b/+Q/87/wLDBvP5v/5D/zv/AsMPf3l/nM/DI8bz+b/+Q/87/wLDBvP5v/5D/zv/AsMPf3l/nM/DI8bz+b/+Q/87/wLDBvP5v/5D/zv/AsMPf3l/nM/DI8bz+b/+Q/87/wLDBvP5v/5D/zv/AsMPf3l/nM/DI8bz+b/+Q/87/wLDBvP5v/5D/zv/AsMPf3l/nM/DI8bz+b/+Q/87/wLDBvP5v/5D/zv/AsMPf3l/nM/DK8H9PMn94v87/M7w/wvN2P5vfL/P/zC8D87yNaX5/mZ8ZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAP/EH+E4qV8e7+RMAAAAASUVORK5CYII=";

export const LogoIcon = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const { className, ...rest } = props;
  return (
    <img
      src={logoDataUri}
      alt="Class Captain Logo"
      className={className}
      {...rest}
    />
  );
};
