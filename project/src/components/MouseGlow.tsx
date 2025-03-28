import React from 'react';
import { useMouseGlow } from '../hooks/useMouseGlow';

const GLOW_SIZE = 200; // Larger glow for better effect
const HALF_SIZE = GLOW_SIZE / 2;

export const MouseGlow: React.FC = () => {
  const { mousePosition, isDesktop } = useMouseGlow();

  if (!isDesktop) return null;

  // Calculate position with offset for center alignment
  const x = mousePosition.x - HALF_SIZE;
  const y = mousePosition.y - HALF_SIZE;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30"
      aria-hidden="true"
    >
      <div
        className="absolute bg-purple-600/15 rounded-full blur-[100px] mix-blend-screen"
        style={{
          width: `${GLOW_SIZE}px`,
          height: `${GLOW_SIZE}px`,
          transform: `translate3d(${x}px, ${y}px, 0)`,
          transition: 'transform 16ms linear',
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      />
    </div>
  );
};