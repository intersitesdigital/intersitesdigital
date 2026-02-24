import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Code2, Cpu, GitBranch, Layers,
  CheckCircle2, Star, Users, Award, Zap, Mail
} from 'lucide-react';

import ReviewsSection from '../components/sections/ReviewsSection';
import NewsletterSection from '../components/sections/NewsletterSection';
import SEO from '../components/seo/Seo';
import { leadsAPI } from '../lib/api';

/* =========================
   Founder Stats
========================= */
const stats = [
  { value: 'Jan 2026', label: 'Founded', icon: Award },
  { value: '2', label: 'Core Builders', icon: Users },
  { value: 'Engineering-First', label: 'Approach', icon: Star },
  { value: 'Future-Focused', label: 'Vision', icon: Zap },
];

/* =========================
   Services
========================= */
const services = [
  {
    icon: Code2,
    title: 'Web Engineering',
    description: 'Performance-first websites and full-stack systems engineered for speed, scalability, and longevity.',
    bg: 'bg-violet-500/10',
    text: 'text-violet-500 dark:text-violet-400',
  },
  {
    icon: Cpu,
    title: 'AI Systems',
    description: 'Practical AI integrations, LLM workflows, and intelligent product capabilities.',
    bg: 'bg-blue-500/10',
    text: 'text-blue-500 dark:text-blue-400',
  },
  {
    icon: GitBranch,
    title: 'Automation Workflows',
    description: 'Smart automation connecting tools, data, and teams into seamless digital pipelines.',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-500 dark:text-emerald-400',
  },
  {
    icon: Layers,
    title: 'Digital Infrastructure',
    description: 'Scalable cloud architecture and resilient systems built for long-term growth.',
    bg: 'bg-amber-500/10',
    text: 'text-amber-500 dark:text-amber-400',
  },
];

/* =========================
   Lead Capture
========================= */
function LeadCaptureBar() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await leadsAPI.capture({ email, source: 'hero-cta' });
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 w-full max-w-sm">
      <div className="relative flex-1">
        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/25 transition text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-white/8 hover:bg-white/12 border border-white/12 text-white/80 font-medium px-5 py-2.5 rounded-lg text-sm transition-all disabled:opacity-50 whitespace-nowrap"
      >
        {status === 'loading' ? 'Sending…' : status === 'success' ? '✓ Received' : 'Get Free Audit'}
      </button>
    </form>
  );
}

export default function Home() {
  const heroRef = useRef(null);

  return (
    <div className="min-h-screen">

      {/* SEO */}
      <SEO
        title="Engineering Digital Systems"
        description="Intersites Digital builds high-performance platforms, AI systems, and scalable digital infrastructure."
      />

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[30%] w-[480px] h-[480px] bg-violet-700/12 rounded-full blur-[140px]" />
          <div className="absolute bottom-[20%] right-[25%] w-[360px] h-[360px] bg-indigo-700/8 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32 pb-28">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/50 text-xs font-medium px-3.5 py-1.5 rounded-full mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Founder-led studio building the future
          </div>

          <h1 className="text-[2.6rem] sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6">
            Engineering Digital Systems
            <br />
            <span className="text-white/35">That Scale With You</span>
          </h1>

          <p className="text-base sm:text-lg text-white/45 max-w-xl mx-auto mb-10 leading-relaxed font-light">
            We build high-performance web platforms, intelligent automation, and scalable digital infrastructure designed for long-term growth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
            <Link to="/contact" className="bg-white text-gray-950 font-semibold px-6 py-3 rounded-lg hover:bg-white/90 text-sm">
              Start a Project <ArrowRight className="w-4 h-4 inline ml-1" />
            </Link>
            <Link to="/portfolio" className="text-white/45 hover:text-white/70 text-sm">
              Explore Work →
            </Link>
          </div>

          <LeadCaptureBar />
        </div>
      </section>

      {/* STATS */}
      <section className="py-14 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
                <div className="text-sm text-gray-400 mt-1.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-white">
            Systems built to last, not just to launch.
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map(({ icon: Icon, title, description, bg, text }) => (
              <div key={title} className="bg-white dark:bg-white/3 border rounded-2xl p-5">
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${text}`} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">A small team. Sharp execution.</h2>

          <div className="space-y-3">
            {[
              'Work directly with the founders building your system',
              'Clean, maintainable code from day one',
              'Transparent milestones and clear communication',
              'Engineering-first approach — no shortcuts',
              'Built to scale as your ideas grow',
              'Honest timelines. No overpromising.',
            ].map((item) => (
              <div key={item} className="flex gap-3">
                <CheckCircle2 className="w-4 h-4 text-violet-500 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection />
      <NewsletterSection />

      {/* CTA */}
      <section className="py-24 bg-gray-950 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Have something worth building?
        </h2>
        <p className="text-white/40 mb-10">
          Tell us what you're building — we’ll respond within a few days.
        </p>
        <Link to="/contact" className="bg-white text-gray-950 font-semibold px-7 py-3 rounded-lg">
          Start a Project
        </Link>
      </section>
    </div>
  );
}