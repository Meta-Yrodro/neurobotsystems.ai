import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';

export default function SoundToggle() {
  const { enabled, toggleSound } = useSoundEffects();

  return (
    <button
      onClick={toggleSound}
      className="fixed bottom-4 right-4 bg-gray-900/80 backdrop-blur-sm border border-purple-500/20 rounded-full p-3 hover:bg-gray-800 transition-colors z-50"
      aria-label={enabled ? 'Disable sound effects' : 'Enable sound effects'}
    >
      {enabled ? (
        <Volume2 className="w-5 h-5 text-purple-400" />
      ) : (
        <VolumeX className="w-5 h-5 text-gray-400" />
      )}
    </button>
  );
}