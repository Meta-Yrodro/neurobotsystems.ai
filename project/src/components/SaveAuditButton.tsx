import React, { useState } from 'react';
import { Save, Check, AlertCircle } from 'lucide-react';
import { saveAudit } from '../utils/supabase';
import { sendLeadNotification } from '../utils/emailService';

interface SaveAuditButtonProps {
  auditData: Record<string, any>;
  userEmail: string;
  className?: string;
}

export default function SaveAuditButton({ auditData, userEmail, className = '' }: SaveAuditButtonProps) {
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [showBanner, setShowBanner] = useState(false);

  const handleSave = async () => {
    setStatus('saving');
    try {
      const accessToken = await saveAudit(userEmail, auditData);
      
      // Send confirmation email
      await sendLeadNotification({
        name: auditData.name || 'there',
        email: userEmail,
        formType: 'audit',
        message: `Your saved audit is available at: ${window.location.origin}/audit/${accessToken}`
      });
      
      setStatus('success');
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 5000);
    } catch (error) {
      console.error('Error saving audit:', error);
      setStatus('error');
    }
  };

  return (
    <>
      <button
        onClick={handleSave}
        disabled={status === 'saving'}
        className={`neon-button flex items-center gap-2 ${className}`}
      >
        {status === 'idle' && (
          <>
            <Save className="w-5 h-5" />
            Save My Audit
          </>
        )}
        {status === 'saving' && (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Saving...
          </>
        )}
        {status === 'success' && (
          <>
            <Check className="w-5 h-5" />
            Saved!
          </>
        )}
        {status === 'error' && (
          <>
            <AlertCircle className="w-5 h-5" />
            Try Again
          </>
        )}
      </button>

      {showBanner && (
        <div className="fixed top-4 right-4 bg-green-500/20 border border-green-500/20 rounded-lg p-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-green-500" />
            <p>✅ Audit Saved! Check your inbox.</p>
          </div>
        </div>
      )}
    </>
  );
}