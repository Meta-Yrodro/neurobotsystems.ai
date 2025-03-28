import React from 'react';
import { Trophy, Star, Gift, ArrowRight, Sparkles, Download, Play, Check } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import RewardModal from '../components/RewardModal';
import RewardHistory from '../components/RewardHistory';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface PointAction {
  action: string;
  points: number;
  reason: string;
  icon: React.ElementType;
}

interface Reward {
  name: string;
  points: number;
  description: string;
  icon: React.ElementType;
  available: boolean;
}

const POINT_ACTIONS: PointAction[] = [
  { action: 'Complete onboarding', points: 25, reason: 'Kickstarts your automation journey', icon: Star },
  { action: 'Interact with chatbot demo', points: 10, reason: "Shows you're exploring solutions", icon: Trophy },
  { action: 'Save your audit', points: 30, reason: "You're one step closer to real results", icon: Download },
  { action: 'Book a strategy call', points: 50, reason: "You're serious about automating", icon: Play },
  { action: 'Download a resource', points: 15, reason: "You're absorbing knowledge", icon: Download },
  { action: 'Refer someone who signs up', points: 75, reason: "You're helping the movement grow", icon: Gift },
  { action: 'Unlock a referral badge', points: 25, reason: 'Recognition and impact', icon: Trophy },
  { action: 'View all chatbot demos', points: 20, reason: 'Exploration = engagement', icon: Star },
  { action: 'Leave feedback', points: 5, reason: 'Your opinion improves our system', icon: Star },
  { action: 'Return after 7 days', points: 10, reason: 'Consistency counts', icon: Trophy }
];

const REWARDS: Reward[] = [
  { 
    name: 'Premium PDF Guide',
    points: 50,
    description: 'Access our exclusive automation strategy guide',
    icon: Download,
    available: true
  },
  { 
    name: 'Exclusive Badge',
    points: 100,
    description: 'Unlock the "Automation Pioneer" badge',
    icon: Trophy,
    available: false
  },
  { 
    name: '5% Package Discount',
    points: 200,
    description: 'Save on your automation package',
    icon: Gift,
    available: false
  },
  { 
    name: '10% Retainer Discount',
    points: 400,
    description: 'Save on your monthly retainer',
    icon: Gift,
    available: false
  },
  { 
    name: 'Hall of Fame Feature',
    points: 500,
    description: 'Get featured for a week',
    icon: Star,
    available: false
  }
];

export default function PointsRewards() {
  // Demo user points - replace with real data from your system
  const userPoints = 145;
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const { playSound } = useSoundEffects();

  const handleRewardClaim = () => {
    if (!selectedReward) return;
    
    // Here you would typically:
    // 1. Call your backend to process the reward
    // 2. Update user points
    // 3. Save reward history
    
    playSound('glitch');
    setSelectedReward(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Grid Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 grid-background opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative">
        <Navigation />

        <main className="container mx-auto px-4 py-24">
          {/* Hero Section */}
          <section className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Trophy className="w-16 h-16 text-purple-500" />
              <h1 className="text-5xl font-bold glitch">
                Earn Points. Unlock Power.
              </h1>
            </div>
            
            <p className="text-xl text-purple-400 max-w-2xl mx-auto mb-8">
              Your actions help you grow, get recognized, and save money with NeuroBotSystems.
            </p>

            {/* Current Points Display */}
            <div className="card inline-block">
              <div className="flex items-center gap-4">
                <Sparkles className="w-8 h-8 text-purple-500" />
                <div className="text-left">
                  <p className="text-sm text-purple-400">Your Current Points</p>
                  <p className="text-3xl font-bold">{userPoints}</p>
                </div>
              </div>
            </div>
          </section>

          {/* How to Earn Points */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-12 glitch">How to Earn Points</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-purple-500/20">
                    <th className="pb-4 font-bold">Action</th>
                    <th className="pb-4 font-bold">Points</th>
                    <th className="pb-4 font-bold">Why It Matters</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-500/10">
                  {POINT_ACTIONS.map((action, index) => (
                    <tr key={index} className="hover:bg-purple-500/5">
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <action.icon className="w-5 h-5 text-purple-400" />
                          {action.action}
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="text-purple-400">+{action.points}</span>
                      </td>
                      <td className="py-4 text-gray-400">{action.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Available Rewards */}
          <section>
            <h2 className="text-3xl font-bold mb-12 glitch">Redeem Your Points</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {REWARDS.map((reward, index) => {
                const isUnlockable = userPoints >= reward.points;
                
                return (
                  <div 
                    key={index} 
                    className={`card ${isUnlockable ? 'border-purple-500' : ''}`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-purple-500/20 p-3 rounded-lg">
                        <reward.icon className="w-6 h-6 text-purple-500" />
                      </div>
                      <div>
                        <h3 className="font-bold">{reward.name}</h3>
                        <p className="text-sm text-purple-400">{reward.points} points</p>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-6">
                      {reward.description}
                    </p>

                    <button
                      disabled={!isUnlockable}
                      onClick={() => isUnlockable && setSelectedReward(reward)}
                      className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded transition-colors ${
                        isUnlockable
                          ? 'bg-purple-500 hover:bg-purple-600 text-white'
                          : 'bg-gray-800 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isUnlockable ? (
                        <>
                          Redeem Now
                          <ArrowRight className="w-4 h-4" />
                        </>
                      ) : (
                        `${reward.points - userPoints} more points needed`
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
          
          {/* Reward History */}
          <section className="mt-20">
            <h2 className="text-3xl font-bold mb-12 glitch">Your Rewards</h2>
            <RewardHistory 
              entries={[
                {
                  id: '1',
                  date: 'Mar 24, 2025',
                  rewardName: '5% Discount Applied',
                  pointsUsed: 200,
                  status: 'active'
                },
                {
                  id: '2',
                  date: 'Mar 21, 2025',
                  rewardName: 'Automation Mastery PDF',
                  pointsUsed: 50,
                  status: 'completed',
                  downloadUrl: 'https://assets.neurobotsystems.ai/guides/mastery.pdf'
                }
              ]} 
            />
          </section>
        </main>

        {/* Modals */}
        {selectedReward && (
          <RewardModal
            reward={selectedReward}
            userPoints={userPoints}
            onConfirm={handleRewardClaim}
            onClose={() => setSelectedReward(null)}
          />
        )}

        {/* Success Toast */}
        {showSuccess && (
          <div className="fixed bottom-8 right-8 animate-fade-in">
            <div className="card bg-green-500/20 border-green-500/40 flex items-center gap-3 py-3 px-6">
              <Check className="w-5 h-5 text-green-500" />
              <p>Reward claimed successfully!</p>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}