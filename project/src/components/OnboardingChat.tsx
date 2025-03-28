import React, { useState, useEffect } from 'react';
import { Bot, Send } from 'lucide-react';
import { createOnboardingSession } from '../utils/supabase';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface Message {
  text: string;
  isBot: boolean;
  options?: string[];
}

const CHAT_FLOW = [
  {
    text: "👋 Hi there! I'm Neuro, your AI onboarding assistant.\nLet's see how we can help you automate your business.",
    isBot: true
  },
  {
    text: "First, what's your name?",
    isBot: true
  },
  {
    text: "Nice to meet you, {name}. What industry is your business in?",
    isBot: true,
    options: ["Automotive", "Tech", "Real Estate", "Other"]
  },
  {
    text: "Awesome. We've helped several {industry} businesses streamline their operations.\n\nWhat are you most interested in automating?",
    isBot: true,
    options: [
      "CRM setup",
      "Chatbot support",
      "Appointment scheduling",
      "Lead capture",
      "Website creation"
    ]
  },
  {
    text: "Perfect choice! Here's what we'd typically automate for someone like you:\n\n✅ {customBenefits}\n\nWould you like to:",
    isBot: true,
    options: [
      "🔎 Claim your free audit",
      "📅 Book a strategy call",
      "💾 Save this conversation & receive it by email"
    ]
  }
];

export default function OnboardingChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [xpPoints, setXpPoints] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    industry: '',
    interests: [] as string[]
  });
  const [sessionId] = useState(() => crypto.randomUUID());
  const { playSound } = useSoundEffects();

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
    playSound('glitch');
    
    // Award XP for progress
    if (!message.isBot) {
      setXpPoints(prev => prev + 10);
    }
  };

  const handleUserInput = async (input: string) => {
    addMessage({ text: input, isBot: false });
    
    // Update user data based on current step
    if (currentStep === 1) {
      setUserData(prev => ({ ...prev, name: input }));
    } else if (currentStep === 2) {
      setUserData(prev => ({ ...prev, industry: input }));
    } else if (currentStep === 3) {
      setUserData(prev => ({ ...prev, interests: [...prev.interests, input] }));
    }

    // Track session
    await createOnboardingSession({
      session_id: sessionId,
      user_name: userData.name,
      industry: userData.industry,
      service_interest: input,
      completion_status: currentStep >= CHAT_FLOW.length - 1 ? 'completed' : 'in_progress'
    });
    
    // Show feedback modal on completion
    if (currentStep >= CHAT_FLOW.length - 1) {
      setShowFeedback(true);
      setShowBadge(true);
    }

    // Move to next step
    setCurrentStep(prev => prev + 1);
    setUserInput('');
  };

  useEffect(() => {
    if (currentStep < CHAT_FLOW.length) {
      const nextMessage = CHAT_FLOW[currentStep];
      const processedText = nextMessage.text
        .replace('{name}', userData.name)
        .replace('{industry}', userData.industry)
        .replace('{customBenefits}', getCustomBenefits(userData));
      
      setTimeout(() => {
        addMessage({ 
          text: processedText,
          isBot: true,
          options: nextMessage.options
        });
      }, 1000);
    }
  }, [currentStep, userData]);

  return (
    <div className="card max-w-2xl mx-auto">
      <OnboardingProgress
        currentStep={currentStep + 1}
        totalSteps={CHAT_FLOW.length}
        xpPoints={xpPoints}
      />
      
      <div className="flex items-center gap-3 border-b border-purple-500/20 p-4">
        <Bot className="w-6 h-6 text-purple-500" />
        <span className="font-bold">Neuro Assistant</span>
      </div>

      <div className="h-[400px] overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-lg ${
                message.isBot ? 'bg-purple-600/20' : 'bg-gray-800'
              }`}
            >
              <div className="whitespace-pre-wrap">{message.text}</div>
              {message.options && (
                <div className="mt-4 space-y-2">
                  {message.options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleUserInput(option)}
                      className="block w-full text-left p-2 rounded hover:bg-purple-500/20 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-purple-500/20 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleUserInput(userInput)}
            placeholder="Type your response..."
            className="flex-1 bg-black/50 border border-purple-500/20 rounded p-2"
          />
          <button
            onClick={() => handleUserInput(userInput)}
            className="p-2 bg-purple-500 rounded hover:bg-purple-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {showFeedback && (
        <FeedbackModal
          sessionId={sessionId}
          userEmail={userData.email}
          onClose={() => setShowFeedback(false)}
        />
      )}
      
      {showBadge && (
        <CompletionBadge
          type="onboarding"
          onUnlock={() => {
            // Handle unlocking content
            window.location.href = '/dashboard';
          }}
        />
      )}
    </div>
  );
}

function getCustomBenefits(userData: { industry: string; interests: string[] }) {
  const benefits = [];
  
  if (userData.interests.includes('CRM setup')) {
    benefits.push('New leads go directly into your CRM');
    benefits.push('Automatic follow-up reminders');
  }
  if (userData.interests.includes('Appointment scheduling')) {
    benefits.push('Hands-free calendar booking');
  }
  if (userData.interests.includes('Lead capture')) {
    benefits.push('24/7 lead qualification');
  }
  
  return benefits.join('\n');
}