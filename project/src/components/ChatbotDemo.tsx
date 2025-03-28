export default function ChatbotDemo() {
  const { enabled } = useSoundEffects();
  const { trackEvent } = useAnalytics();
  const [sessionId] = useState(() => crypto.randomUUID());
  const [activeDemo, setActiveDemo] = useState<string>('faq');
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedBot, setSelectedBot] = useState<string | null>(null);
  const [testVariant] = useState<'A' | 'B'>(() => Math.random() < 0.5 ? 'A' : 'B');
  const [startTime] = useState(() => Date.now());
  const currentDemo = chatDemos.find(demo => demo.id === activeDemo)!;

  // Track A/B test completion
  const trackTestCompletion = async (completed: boolean) => {
    await trackABTest({
      session_id: sessionId,
      test_name: `chatbot_demo_${activeDemo}`,
      variant: testVariant,
      completion_status: completed,
      engagement_time: Math.floor((Date.now() - startTime) / 1000),
      messages_sent: visibleMessages.length
    });
  };

  useEffect(() => {
    setVisibleMessages([]);
    const messages = currentDemo.messages;
    let delay = 0;
    
    messages.forEach((message, index) => {
      delay += message.text.length * 20 + 500;
      setTimeout(() => {
        setVisibleMessages(prev => [...prev, message]);
        if (enabled && index > 0) {
          playMessageSound();
        }
      }, delay);
    });
  }, [currentDemo, enabled]);

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <header className="py-20 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 gradient-text">
            Experience AI Chat
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See how our AI chatbots can transform your business communication
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Demo Selection */}
          <section>
            <div className="flex flex-wrap gap-4 mb-8">
              {chatDemos.map(demo => (
                <button
                  key={demo.id}
                  onClick={() => {
                    setActiveDemo(demo.id);
                    trackEvent('chatbot_demo_switch', { demoType: demo.id });
                    trackTestCompletion(false);
                    playGlitchSound();
                  }}
                  className={`flex-1 card min-w-[200px] p-6 text-center transition-all duration-300 ${
                    activeDemo === demo.id
                      ? 'bg-purple-500 scale-105'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  <div className="text-2xl mb-2">{demo.icon}</div>
                  <h3 className="font-bold">{demo.title}</h3>
                </button>
              ))}
            </div>

            <div className="card">
              <div className="flex items-center gap-4 p-4 border-b border-gray-800">
                <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-xl">
                  {currentDemo.icon}
                </div>
                <div>
                  <h2 className="font-bold">{currentDemo.title}</h2>
                  <p className="text-sm text-gray-400">{currentDemo.description}</p>
                </div>
              </div>

              <div className="p-4 h-[400px] overflow-y-auto space-y-4">
                {visibleMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-purple-500'
                          : 'bg-gray-800'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    submitPollResponse({
                      session_id: sessionId,
                      selected_bot: activeDemo,
                      additional_feedback: 'Clicked Test Bot'
                    });
                    trackEvent('test_bot_click', { demoType: activeDemo });
                    trackTestCompletion(true);
                    // Show feedback poll after testing
                    setShowFeedback(true);
                  }}
                  className="neon-button inline-flex items-center gap-2 group animate-pulse hover:animate-none"
                >
                  Test This Bot
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            
            {/* A/B Test Variations */}
            {testVariant === 'B' && (
              <div className="mt-8 card bg-purple-900/20 p-6 text-center animate-fade-in">
                <h3 className="text-xl font-bold mb-4">
                  🎯 Want to see this in action?
                </h3>
                <p className="text-gray-300 mb-6">
                  Book a quick demo and we'll show you how to:
                  <br />
                  ✓ Automate {activeDemo === 'faq' ? 'customer support' : 
                             activeDemo === 'qualify' ? 'lead qualification' : 
                             'appointment scheduling'}
                  <br />
                  ✓ Integrate with your existing tools
                  <br />
                  ✓ Launch within 48 hours
                </p>
                <div className="flex justify-center gap-4">
                  <a 
                    href="/start"
                    className="neon-button inline-flex items-center gap-2"
                  >
                    Schedule Demo
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            )}

          </section>
          
          {/* Feedback Poll */}
          {showFeedback && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
              <div className="card max-w-md w-full">
                <h3 className="text-xl font-bold mb-6">🤔 Which chatbot impressed you the most?</h3>
                <div className="space-y-4">
                  {chatDemos.map(demo => (
                    <button
                      key={demo.id}
                      onClick={() => {
                        setSelectedBot(demo.id);
                        submitChatbotFeedback({
                          demo_type: demo.id,
                          rating: 5
                        });
                        setShowFeedback(false);
                        trackEvent('chatbot_feedback_submitted', { selected_bot: demo.id });
                      }}
                      className={`w-full p-4 rounded-lg transition-all ${
                        selectedBot === demo.id
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-800 hover:bg-gray-700'
                      }`}
                    >
                      {demo.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CTA Section */}
          <section className="text-center">
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
              <p className="text-gray-400 mb-6">
                Transform your business communication today with our AI chatbots
              </p>
              <a href="/start" className="neon-button">
                Get Started
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}