import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Demo credentials
      if (email === 'demo@example.com' && password === 'demo123') {
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
        const errorBox = document.querySelector('.error-box');
        if (errorBox) {
          errorBox.classList.add('animate-shake');
          setTimeout(() => {
            errorBox.classList.remove('animate-shake');
          }, 500);
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
          <div className="max-w-md mx-auto">
            <div className="text-center mb-12">
              <Lock className="w-16 h-16 text-purple-500 mx-auto mb-6" />
              <h1 className="text-4xl font-bold mb-4 glitch">Client Login</h1>
              <p className="text-gray-400">Access your automation dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="card space-y-6">
              {error && (
                <div className="error-box bg-red-500/20 border border-red-500/20 rounded p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <p className="text-red-400">{error}</p>
                </div>
              )}

              <div>
                <label className="flex items-center gap-2 text-purple-400 mb-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border border-purple-500/20 rounded p-3 text-white focus:border-purple-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-purple-400 mb-2">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-purple-500/20 rounded p-3 text-white focus:border-purple-500 transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="neon-button w-full flex items-center justify-center gap-2 py-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Log In'
                )}
              </button>

              <div className="text-center">
                <a href="#forgot" className="text-purple-400 hover:text-purple-300 text-sm">
                  Forgot password?
                </a>
              </div>
            </form>

            <div className="mt-8 text-center text-sm text-gray-400">
              <p>Demo Credentials:</p>
              <p>Email: demo@example.com</p>
              <p>Password: demo123</p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}