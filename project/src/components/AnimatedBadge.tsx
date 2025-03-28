import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

interface AnimatedBadgeProps {
  type: 'automotive' | 'tech' | 'real_estate' | 'lead_gen' | 'explorer';
  isUnlocked: boolean;
  level?: 1 | 2 | 3 | 4 | 5;
}

const BADGE_ANIMATIONS = {
  automotive: {
    src: 'https://assets5.lottiefiles.com/packages/lf20_car_badge.json',
    style: 'text-blue-500',
    animations: {
      1: { effect: 'glow', duration: 2 },
      2: { effect: 'pulse', duration: 1.5 },
      3: { effect: 'orbit', duration: 3 },
      4: { effect: 'circuit', duration: 2.5 },
      5: { effect: 'glitch', duration: 2 }
    }
  },
  tech: {
    src: 'https://assets5.lottiefiles.com/packages/lf20_tech_badge.json',
    style: 'text-purple-500',
    animations: {
      1: { effect: 'glow', duration: 2 },
      2: { effect: 'pulse', duration: 1.5 },
      3: { effect: 'orbit', duration: 3 },
      4: { effect: 'circuit', duration: 2.5 },
      5: { effect: 'glitch', duration: 2 }
    }
  },
  real_estate: {
    src: 'https://assets5.lottiefiles.com/packages/lf20_house_badge.json',
    style: 'text-green-500'
  },
  lead_gen: {
    src: 'https://assets5.lottiefiles.com/packages/lf20_chart_badge.json',
    style: 'text-yellow-500'
  },
  explorer: {
    src: 'https://assets5.lottiefiles.com/packages/lf20_rocket_badge.json',
    style: 'text-red-500'
  }
};

export default function AnimatedBadge({ type, isUnlocked, level = 1 }: AnimatedBadgeProps) {
  const badge = BADGE_ANIMATIONS[type];
  const animation = badge.animations[level];

  return (
    <div className={`relative w-24 h-24 ${
      isUnlocked 
        ? `animate-${animation.effect} [animation-duration:${animation.duration}s]` 
        : 'grayscale opacity-50'
    }`}>
      <Player
        autoplay={isUnlocked}
        loop={true}
        src={badge.src}
        style={{ width: '100%', height: '100%' }}
      />
      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
          <span className="text-2xl">🔒</span>
        </div>
      )}
      {isUnlocked && level > 1 && (
        <div className={`absolute inset-0 pointer-events-none ${
          animation.effect === 'circuit' 
            ? 'bg-circuit-pattern animate-circuit' 
            : animation.effect === 'orbit'
            ? 'ring-2 ring-purple-500/50 animate-orbit'
            : ''
        }`} />
      )}
    </div>
  );
}