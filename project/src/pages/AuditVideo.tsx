import React from 'react';
import { useParams } from 'react-router-dom';
import { Bot, Calendar, Save } from 'lucide-react';
import SaveAuditButton from '../components/SaveAuditButton';

export default function AuditVideo() {
  const { id } = useParams<{ id: string }>();
  const [userEmail, setUserEmail] = useState('');
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  
  return (
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a 
              href="https://calendly.com/neurobotsystems"
              target="_blank"
              className="flex-1 bg-purple-500 text-white px-8 py-3 rounded hover:bg-purple-600 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Schedule a Call
            </a>
            <button className="flex-1 border-2 border-purple-500 text-purple-500 px-8 py-3 rounded hover:bg-purple-500/10 transition-all duration-300">
              Let's Build This
            </button>
          </div>
          
          {/* Save Audit Button */}
          <div className="card p-6 text-center">
            <Save className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Want to save this audit?</h2>
            <p className="text-gray-300 mb-6">
              We'll email you a private link so you can come back anytime.
            </p>
            
            {showEmailPrompt ? (
              <div className="max-w-sm mx-auto">
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-black/50 border border-purple-500/20 rounded p-3 text-white focus:border-purple-500 transition-colors mb-4"
                />
                <SaveAuditButton
                  auditData={{
                    id,
                    // Add other audit data here
                  }}
                  userEmail={userEmail}
                  className="w-full"
                />
              </div>
            ) : (
              <button
                onClick={() => setShowEmailPrompt(true)}
                className="neon-button"
              >
                💾 Save My Audit
              </button>
            )}
          </div>
        </div>
      </div>
    );
}