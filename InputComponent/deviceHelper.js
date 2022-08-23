import { useMediaQuery } from 'react-responsive';
import { isMobile } from 'react-device-detect';

export const isDesktopDevice = () => !isMobile && useMediaQuery({ minWidth: 992 });
export const isTabletDevice = () => isMobile && useMediaQuery({ minWidth: 768 });
export const isMobileDevice = () => isMobile && useMediaQuery({ maxWidth: 767 });
