import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
  repeatInterval?: number; // in seconds
}

export default function GlitchText({ children, className = '', repeatInterval }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: !repeatInterval,
    threshold: 0.1
  });

  useEffect(() => {
    if (!inView) return;

    // Initial glitch animation
    setIsGlitching(true);
    const initialTimeout = setTimeout(() => setIsGlitching(false), 1000);

    // Set up repeating glitch if interval specified
    let intervalId: number;
    if (repeatInterval) {
      intervalId = window.setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 1000);
      }, repeatInterval * 1000);
    }

    return () => {
      clearTimeout(initialTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [inView, repeatInterval]);

  return (
    <span
      ref={ref}
      className={`inline-block relative glitch ${className}`}
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
    >
      {children}
    </span>
  );
}