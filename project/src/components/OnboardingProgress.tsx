import React from 'react';
import { CheckCircle2, Star } from 'lucide-react';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  xpPoints: number;
}

export default function OnboardingProgress({ currentStep, totalSteps, xpPoints }: OnboardingProgressProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-gray-900/50 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-purple-500" />
          <span className="text-sm">Step {currentStep} of {totalSteps}</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <span className="text-sm">{xpPoints} XP</span>
        </div>
      </div>
      
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-purple-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {currentStep > 1 && (
        <div className="mt-2 text-center text-sm text-purple-400">
          {getProgressMessage(currentStep)}
        </div>
      )}
    </div>
  );
}

function getProgressMessage(step: number): string {
  const messages = [
    "Great start! 🚀",
    "You're doing great! 🎯",
    "Almost there! ⭐",
    "Final step! 🏆"
  ];
  return messages[step - 2] || "Keep going! 💪";
}