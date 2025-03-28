import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useAnalytics } from './hooks/useAnalytics'; 
import Home from './pages/Home';
import LearnMore from './pages/LearnMore';
import { Home as HomeIcon } from 'lucide-react';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Privacy from './pages/Privacy';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Start from './pages/Start';
import { MouseGlow } from './components/MouseGlow';
import { useParticleTrail } from './hooks/useParticleTrail';
import { ExitIntent } from './components/ExitIntent';
import { SmartPopup, useSmartPopups } from './components/SmartPopup';
import { useVoiceflow } from './hooks/useVoiceflow';
import AuditVideo from './components/AuditVideo';
import ChatbotDemo from './pages/ChatbotDemo';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  useParticleTrail();
  useVoiceflow();
  const { showScrollPopup, setShowScrollPopup } = useSmartPopups();
  const [showDelayPopup, setShowDelayPopup] = useState(false);
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  return (
    <div className="page-transition">
      <SessionContextProvider supabaseClient={supabase}>
      <MouseGlow />
      <ExitIntent />
      {!isMobile && (
        <>
          <SmartPopup 
            type="delay" 
            onClose={() => setShowDelayPopup(false)} 
          />
          {showScrollPopup && (
            <SmartPopup 
              type="scroll" 
              onClose={() => setShowScrollPopup(false)} 
            />
          )}
        </>
      )}
      {isMobile && (
        <SmartPopup 
          type="mobile" 
          onClose={() => setShowDelayPopup(false)} 
        />
      )}
      <AppRoutes />
      </SessionContextProvider>
    </div>
  );
}

function AppRoutes() {
  useAnalytics();
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/learn" element={<LearnMore />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogPost />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/start" element={<Start />} />
      <Route path="/audit/:id" element={<AuditVideo />} />
      <Route path="/chatbot" element={<ChatbotDemo />} />
    </Routes>
  );
}

export default App;