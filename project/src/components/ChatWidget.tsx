import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { useLocation } from 'react-router-dom';

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Don't show on legal pages
  if (location.pathname.includes('/privacy') || location.pathname.includes('/terms')) {
    return null;
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen ? (
        <div className="bg-gray-900/95 border border-purple-500/20 rounded-lg w-80 backdrop-blur-sm animate-fade-in">
          <div className="flex items-center justify-between p-4 border-b border-purple-500/20">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-500" />
              <span className="font-bold">Chat with Us</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-4 h-80 overflow-y-auto">
            <div className="mb-4">
              <p className="text-purple-400 mb-2">Hi! Need help with automation, CRMs, or bots?</p>
              <p className="text-gray-300">I'm here to assist.</p>
            </div>
            
            <div className="space-y-2">
              <a 
                href="https://wa.me/1234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full p-3 bg-green-600/20 hover:bg-green-600/30 rounded text-center transition-colors"
              >
                Chat on WhatsApp
              </a>
              <a 
                href="https://instagram.com/direct/t/neurobotsystems" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full p-3 bg-purple-600/20 hover:bg-purple-600/30 rounded text-center transition-colors"
              >
                Message on Instagram
              </a>
            </div>
          </div>
          
          <div className="p-4 border-t border-purple-500/20">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-black/50 border border-purple-500/20 rounded p-2 text-white focus:border-purple-500 transition-colors"
              />
              <button className="p-2 bg-purple-600 rounded hover:bg-purple-700 transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 p-4 rounded-full hover:bg-purple-700 transition-colors shadow-lg hover:shadow-purple-500/20"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}


export default ChatWidget