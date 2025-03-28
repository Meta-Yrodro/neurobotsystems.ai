import React, { useState } from 'react';
import { X } from 'lucide-react';
import { submitOnboardingFeedback } from '../utils/supabase';

interface FeedbackModalProps {
  sessionId: string;
  userEmail?: string;
  onClose: () => void;
}

const EMOJI_RATINGS = ['😎', '🙂', '😐', '😕'];

export default function FeedbackModal({ sessionId, userEmail, onClose }: FeedbackModalProps) {
  const [selectedRating, setSelectedRating] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedRating) return;
    
    setIsSubmitting(true);
    try {
      await submitOnboardingFeedback({
        session_id: sessionId,
        user_email: userEmail,
        rating: selectedRating,
        feedback_text: feedback
      });
      onClose();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="card max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold mb-6">
          🙋 How helpful was this onboarding experience?
        </h3>

        <div className="flex justify-between mb-8">
          {EMOJI_RATINGS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => setSelectedRating(emoji)}
              className={`text-3xl p-2 rounded-lg transition-all ${
                selectedRating === emoji
                  ? 'bg-purple-500/20 scale-125'
                  : 'hover:bg-gray-800'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <label className="text-sm text-purple-400 mb-2 block">
            Any suggestions for improvement?
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full bg-black/50 border border-purple-500/20 rounded p-3 text-white focus:border-purple-500 transition-colors h-32"
            placeholder="Your feedback helps us improve..."
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            Skip
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedRating || isSubmitting}
            className="neon-button"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      </div>
    </div>
  );
}