import { createClient } from '@supabase/supabase-js';
import { nanoid } from 'nanoid';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export interface UserActivity {
  id: string;
  timestamp: string;
  user_email: string;
  action: string;
  page: string;
  details?: Record<string, any>;
}

export interface SavedAudit {
  id: string;
  user_email: string;
  audit_data: Record<string, any>;
  created_at: string;
  access_token: string;
  expiration_date: string;
  status: 'active' | 'expired';
}

export interface ChatbotFeedback {
  demo_type: string;
  rating: number;
  feedback_text?: string;
}

export interface PollResponse {
  session_id: string;
  user_email?: string;
  selected_bot: string;
  additional_feedback?: string;
}

export interface ABTestResult {
  session_id: string;
  test_name: string;
  variant: 'A' | 'B';
  completion_status: boolean;
  engagement_time: number;
  messages_sent: number;
}

export interface OnboardingSession {
  session_id: string;
  user_name?: string;
  industry?: string;
  service_interest?: string;
  completion_status: 'started' | 'completed' | 'abandoned';
}

export interface OnboardingFeedback {
  session_id: string;
  user_email?: string;
  rating: string;
  feedback_text?: string;
}

export interface UserBadge {
  user_email: string;
  badge_type: string;
  badge_name: string;
  unlock_condition: string;
}

export interface UnlockedContent {
  user_email: string;
  content_id: string;
}

export const trackActivity = async (activity: Omit<UserActivity, 'id' | 'timestamp'>) => {
  try {
    if (!supabase) {
      console.warn('Supabase client not initialized');
      return;
    }

    const { error } = await supabase
      .from('user_activities')
      .insert([{
        ...activity,
        timestamp: new Date().toISOString()
      }]);

    if (error) throw error;
  } catch (error) {
    console.error('Error tracking activity:', error);
  }
};

export const saveAudit = async (
  userEmail: string, 
  auditData: Record<string, any>
): Promise<string> => {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }

  try {
    const accessToken = nanoid(32);
    
    const { data, error } = await supabase
      .from('saved_audits')
      .insert([{
        user_email: userEmail,
        audit_data: auditData,
        access_token: accessToken,
        created_at: new Date().toISOString(),
        expiration_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      }])
      .select('id')
      .single();

    if (error) throw error;
    
    return accessToken;
  } catch (error) {
    console.error('Error saving audit:', error);
    throw error;
  }
};

export const submitChatbotFeedback = async (feedback: ChatbotFeedback) => {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }

  try {
    const { error } = await supabase
      .from('chatbot_feedback')
      .insert([{
        ...feedback,
        created_at: new Date().toISOString()
      }]);

    if (error) throw error;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
};

export const submitPollResponse = async (response: PollResponse) => {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }

  try {
    const { error } = await supabase
      .from('chatbot_poll_responses')
      .insert([response]);

    if (error) throw error;
  } catch (error) {
    console.error('Error submitting poll response:', error);
    throw error;
  }
};

export const trackABTest = async (result: ABTestResult) => {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }

  try {
    const { error } = await supabase
      .from('ab_test_results')
      .insert([result]);

    if (error) throw error;
  } catch (error) {
    console.error('Error tracking A/B test:', error);
    throw error;
  }
};

export const createOnboardingSession = async (session: OnboardingSession) => {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }

  try {
    const { error } = await supabase
      .from('onboarding_sessions')
      .insert([{
        ...session,
        created_at: new Date().toISOString()
      }]);

    if (error) throw error;
  } catch (error) {
    console.error('Error creating onboarding session:', error);
    throw error;
  }
};

export const submitOnboardingFeedback = async (feedback: OnboardingFeedback) => {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }

  try {
    const { error } = await supabase
      .from('onboarding_feedback')
      .insert([feedback]);

    if (error) throw error;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
};

export const awardBadge = async (badge: UserBadge) => {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }

  try {
    const { error } = await supabase
      .from('user_badges')
      .insert([badge]);

    if (error) throw error;
  } catch (error) {
    console.error('Error awarding badge:', error);
    throw error;
  }
};

export const unlockContent = async (unlock: UnlockedContent) => {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }

  try {
    const { error } = await supabase
      .from('user_unlocks')
      .insert([unlock]);

    if (error) throw error;
  } catch (error) {
    console.error('Error unlocking content:', error);
    throw error;
  }
};