import React from 'react';
import { useParams } from 'react-router-dom';
import { Bot, Calendar } from 'lucide-react';

export default function AuditVideo() {
  const { id } = useParams<{ id: string }>();
  const [audit, setAudit] = useState<SavedAudit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAudit = async () => {
      try {
        if (!supabase) throw new Error('Supabase not initialized');

        const { data, error } = await supabase
          .from('saved_audits')
          .select('*')
          .eq('access_token', id)
          .single();

        if (error) throw error;
        setAudit(data);
      } catch (err) {
        console.error('Error fetching audit:', err);
        setError('Audit not found or expired');
      } finally {
        setLoading(false);
      }
    };

    fetchAudit();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !audit || audit.status === 'expired') {
    return (
      <div className="min-h-screen bg-black text-white font-mono">
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold mb-8">This audit has expired</h1>
          <p className="text-xl text-gray-400 mb-12">Want a fresh automation audit?</p>
          <Link to="/start" className="neon-button inline-flex items-center gap-2">
            Claim a Fresh Audit
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Grid Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 grid-background opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Bot className="w-12 h-12 text-purple-500" />
            <h1 className="text-4xl font-bold glitch">Your Custom Automation Audit</h1>
          </div>
          
          <div className="card mb-8">
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-900/50">
              {/* Video embed would go here */}
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-400">Video ID: {id}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="https://calendly.com/neurobotsystems"
              target="_blank"
              rel="noopener noreferrer" 
              className="neon-button flex-1 text-center flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Book a Call Now
            </a>
            <button className="flex-1 border-2 border-purple-500 text-purple-500 px-8 py-3 rounded hover:bg-purple-500/10 transition-all duration-300">
              Let's Build This
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}