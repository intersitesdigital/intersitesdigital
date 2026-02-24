import { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { newsletterAPI } from '../../lib/api';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await newsletterAPI.subscribe(email);
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
    if (status !== 'success') setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 dark:from-violet-950/30 to-transparent" />
      <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-fuchsia-500/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-10 lg:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Newsletter
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Digital Insights,{' '}
              <span className="gradient-text">Delivered Weekly</span>
            </h2>

            <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Join 2,000+ entrepreneurs and marketers who get our weekly digest on web trends, growth tactics, and digital strategy.
            </p>

            {/* Perks */}
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {[
                { emoji: '📊', text: 'Industry insights & trends' },
                { emoji: '🚀', text: 'Growth tactics that work' },
                { emoji: '🎁', text: 'Exclusive tools & resources' },
              ].map(({ emoji, text }) => (
                <div key={text} className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>{emoji}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {status === 'success' ? (
              <div className="flex items-center justify-center gap-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-6 py-4 rounded-2xl">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span className="font-semibold">You're in! Welcome to the Intersites Digital community. 🎉</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary py-3.5 whitespace-nowrap disabled:opacity-60"
                >
                  {status === 'loading' ? 'Subscribing…' : status === 'error' ? 'Try Again' : (
                    <><span>Subscribe</span><ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            )}

            {status === 'error' && (
              <p className="text-red-500 text-sm mt-3">Something went wrong. Please try again.</p>
            )}

            <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
              No spam, ever. Unsubscribe with one click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
