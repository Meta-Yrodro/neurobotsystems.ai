import Plausible from 'plausible-tracker';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ChatbotInteraction {
  demoType: string;
  timestamp: string;
  sessionId: string;
}

// Initialize with site domain
const plausible = Plausible({
  domain: window.location.hostname,
  trackLocalhost: true,
  apiHost: 'https://plausible.io',
});

// Generate a session ID if not exists
const getSessionId = () => {
  const id = sessionStorage.getItem('session_id') || crypto.randomUUID();
  sessionStorage.setItem('session_id', id);
  return id;
};

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views with additional data
    plausible.trackPageview({
      url: window.location.href,
      props: {
        path: location.pathname,
        referrer: document.referrer,
        deviceType: window.matchMedia('(max-width: 768px)').matches ? 'mobile' : 'desktop'
      }
    });
  }, [location]);

  const trackEvent = (eventName: string, props?: Record<string, string | number>) => {
    // Add common properties to all events
    const commonProps = {
      timestamp: new Date().toISOString(),
      sessionId: getSessionId(),
      url: window.location.href,
      ...props
    };

    plausible.trackEvent(eventName, { props });

    // Track chatbot interactions separately
    if (eventName.startsWith('chatbot_')) {
      const interaction: ChatbotInteraction = {
        demoType: props?.demoType || 'unknown',
        timestamp: new Date().toISOString(),
        sessionId: getSessionId()
      };
      
      // Store for future dashboard/heatmap
      localStorage.setItem(`chatbot_interaction_${Date.now()}`, JSON.stringify(interaction));
    }
  };

  return { trackEvent };
}