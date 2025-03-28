import React, { useState, useEffect } from 'react';
import { Share2, Copy, Gift, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../utils/supabase';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface ReferralReward {
  reward_type: string;
  reward_name: string;
  reward_description: string;
  required_referrals: number;
}

export default function ReferralSection() {
  const [referralCode, setReferralCode] = useState('');
  const [referralCount, setReferralCount] = useState(0);
  const [rewards, setRewards] = useState<ReferralReward[]>([]);
  const [copied, setCopied] = useState(false);
  const { playSound } = useSoundEffects();

  useEffect(() => {
    fetchReferralData();
  }, []);

  const fetchReferralData = async () => {
    try {
      // Fetch referral link
      const { data: linkData } = await supabase
        .from('referral_links')
        .select('referral_code, successful_referrals')
        .single();

      if (linkData) {
        setReferralCode(linkData.referral_code);
        setReferralCount(linkData.successful_referrals);
      }

      // Fetch rewards
      const { data: rewardData } = await supabase
        .from('referral_rewards')
        .select('*')
        .order('required_referrals', { ascending: true });

      if (rewardData) {
        setRewards(rewardData);
      }
    } catch (error) {
      console.error('Error fetching referral data:', error);
    }
  };

  const copyReferralLink = async () => {
    const referralLink = `${window.location.origin}/join?ref=${referralCode}`;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      playSound('switch');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-6">
        <Share2 className="w-8 h-8 text-purple-500" />
        <h2 className="text-2xl font-bold">Nominate a Friend</h2>
      </div>

      <p className="text-gray-300 mb-6">
        Know someone who would love to automate their business? Send them your custom link and get exclusive perks!
      </p>

      <div className="bg-black/30 rounded-lg p-4 mb-8">
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={`${window.location.origin}/join?ref=${referralCode}`}
            readOnly
            className="flex-1 bg-transparent text-sm"
          />
          <button
            onClick={copyReferralLink}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-purple-400">Your Referrals</span>
          <span className="text-2xl font-bold">{referralCount}</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${(referralCount / 5) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Gift className="w-5 h-5 text-purple-500" />
          Available Rewards
        </h3>

        {rewards.map((reward) => (
          <div
            key={reward.reward_type}
            className={`p-4 rounded-lg ${
              referralCount >= reward.required_referrals
                ? 'bg-purple-500/20 border border-purple-500/40'
                : 'bg-gray-800/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Award className={`w-5 h-5 ${
                referralCount >= reward.required_referrals
                  ? 'text-purple-400'
                  : 'text-gray-500'
              }`} />
              <div className="flex-1">
                <h4 className="font-bold">{reward.reward_name}</h4>
                <p className="text-sm text-gray-400">{reward.reward_description}</p>
              </div>
              <div className="text-sm">
                {reward.required_referrals} referral{reward.required_referrals !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}