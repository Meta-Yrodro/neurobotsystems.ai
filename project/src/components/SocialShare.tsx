import React from 'react';
import { Linkedin, Twitter, Facebook, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../utils/supabase';

interface SocialShareProps {
  type: 'certificate' | 'badge';
  title: string;
  contentId: string;
  userEmail: string;
  onClose: () => void;
}

export default function SocialShare({ type, title, contentId, userEmail, onClose }: SocialShareProps) {
  const shareText = `I just earned the "${title}" ${type} from @NeuroBotSystems.ai!\nAutomation is the future — and I'm ready. 🧠\n#AI #Automation #NeuroBot`;
  const shareUrl = `${window.location.origin}/${type}s/${contentId}`;

  const handleShare = async (platform: string) => {
    try {
      // Track share in database
      await supabase.from('social_shares').insert({
        user_email: userEmail,
        share_type: type,
        platform,
        content_id: contentId,
        share_url: shareUrl
      });

      // Open share dialog
      let shareLink = '';
      switch (platform) {
        case 'linkedin':
          shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`;
          break;
        case 'twitter':
          shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
          break;
        case 'facebook':
          shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
          break;
      }
      window.open(shareLink, '_blank');
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      // Show success message
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6"
    >
      <h3 className="text-xl font-bold mb-4">Share Your Achievement</h3>
      <p className="text-gray-400 mb-6">
        Let others know about your automation journey!
      </p>

      <div className="space-y-4">
        <button
          onClick={() => handleShare('linkedin')}
          className="w-full flex items-center gap-3 p-3 bg-[#0077B5]/20 hover:bg-[#0077B5]/30 rounded transition-colors"
        >
          <Linkedin className="w-5 h-5" />
          Share on LinkedIn
        </button>

        <button
          onClick={() => handleShare('twitter')}
          className="w-full flex items-center gap-3 p-3 bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/30 rounded transition-colors"
        >
          <Twitter className="w-5 h-5" />
          Post on X
        </button>

        <button
          onClick={() => handleShare('facebook')}
          className="w-full flex items-center gap-3 p-3 bg-[#4267B2]/20 hover:bg-[#4267B2]/30 rounded transition-colors"
        >
          <Facebook className="w-5 h-5" />
          Share on Facebook
        </button>

        <button
          onClick={copyToClipboard}
          className="w-full flex items-center gap-3 p-3 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
        >
          <LinkIcon className="w-5 h-5" />
          Copy Link
        </button>
      </div>

      <button
        onClick={onClose}
        className="mt-6 text-gray-400 hover:text-white transition-colors"
      >
        Maybe Later
      </button>
    </motion.div>
  );
}