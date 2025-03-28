import { useEffect, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
  timestamp: number;
}

export const useMouseGlow = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0, timestamp: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only enable on desktop devices
    const checkDevice = () => {
      setIsDesktop(window.matchMedia('(pointer: fine)').matches);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    // Direct mouse tracking without throttling for instant response
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
        timestamp: performance.now()
      });
    };

    if (isDesktop) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseover', handleMouseMove);
    }

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseMove);
    };
  }, [isDesktop]);

  return { mousePosition, isDesktop };
};