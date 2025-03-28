import { useEffect, useCallback, useState, useRef } from 'react';
import { Howl } from 'howler';

interface SoundEffects {
  hover: HTMLAudioElement;
  glitch: HTMLAudioElement;
  transition: HTMLAudioElement;
}

const SOUND_EFFECTS = {
  hover: {
    src: 'https://assets.mixkit.co/active/sfx/digital-quick-tone-343.wav',
    volume: 0.1
  },
  glitch: {
    src: 'https://assets.mixkit.co/active/sfx/digital-glitch-short-39.wav',
    volume: 0.15
  },
  transition: {
    src: 'https://assets.mixkit.co/active/sfx/digital-whoosh-382.wav',
    volume: 0.2
  },
  switch: {
    src: 'https://assets.mixkit.co/active/sfx/digital-click-soft-382.wav',
    volume: 0.15
  }
};

// Cache for Howl instances
const soundCache = new Map<string, Howl>();

export const useSoundEffects = () => {
  const [enabled, setEnabled] = useState(() => 
    localStorage.getItem('sound-enabled') === 'true'
  );
  const soundsRef = useRef<Record<string, Howl>>({});

  // Play a sound effect by key
  const playSound = useCallback((key: keyof typeof SOUND_EFFECTS) => {
    if (!enabled) return;

    let sound = soundsRef.current[key];
    if (!sound) {
      sound = new Howl({
        src: [SOUND_EFFECTS[key].src],
        volume: SOUND_EFFECTS[key].volume
      });
      soundsRef.current[key] = sound;
    }
    sound.play();
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target instanceof Element && target.matches('.neon-button, .card')) {
        playSound('hover');
      }
    };

    document.addEventListener('mouseenter', handleMouseEnter, true);
    return () => document.removeEventListener('mouseenter', handleMouseEnter, true);
  }, [enabled, playSound]);

  const toggleSound = () => {
    setEnabled(prev => {
      const newValue = !prev;
      localStorage.setItem('sound-enabled', String(newValue));
      return newValue;
    });
  };

  return { enabled, toggleSound, playSound };
};