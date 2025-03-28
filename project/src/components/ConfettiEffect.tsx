import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface ConfettiEffectProps {
  trigger: boolean;
}

export default function ConfettiEffect({ trigger }: ConfettiEffectProps) {
  const { enabled } = useSoundEffects();

  useEffect(() => {
    if (!trigger) return;

    // Play celebration sound
    if (enabled) {
      const audio = new Audio('https://assets.mixkit.co/active/sfx/achievement-bell-600.wav');
      audio.volume = 0.2;
      audio.play().catch(() => {});
    }

    // Launch confetti
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#9333EA', '#6366F1', '#8B5CF6']
      });
      
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#9333EA', '#6366F1', '#8B5CF6']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, [trigger, enabled]);

  return null;
}