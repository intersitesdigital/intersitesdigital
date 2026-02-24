import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Zap, Target, Users } from 'lucide-react';

/* ================= TEAM ================= */
const team = [
  {
    name: 'Rishav',
    role: 'Co-Founder & Technical Architect',
    specialty: 'Full-Stack Systems, AI Integrations & Architecture',
    initials: 'RR',
    color: 'from-violet-500 to-purple-600',
  },
  {
    name: 'Kaushik',
    role: 'Co-Founder & Growth Partner',
    specialty: 'Client Strategy, Partnerships & Technical Collaboration',
    initials: 'KK',
    color: 'from-cyan-500 to-blue-600',
  },
];

/* ================= VALUES ================= */
const values = [
  {
    icon: Zap,
    title: 'Engineering First',
    desc: 'We care deeply about how things are built. Clean architecture, strong foundations, and long-term thinking guide everything we do.',
  },
  {
    icon: Target,
    title: 'Built for the Long Run',
    desc: 'We focus on systems that grow, evolve, and stay relevant over time — not quick wins or shortcuts.',
  },
  {
    icon: Heart,
    title: 'Founder Mindset',
    desc: 'We approach every project like builders, not vendors. Ownership, honesty, and clarity define our work.',
  },
  {
    icon: Users,
    title: 'Small but Focused',
    desc: 'We intentionally stay lean to maintain quality, speed, and deep involvement in every build.',
  },
];

/* ================= MILESTONES ================= */
const milestones = [
  {
    year: 'Early 2025',
    event:
      'The vision for Intersites Digital began with a focus on building future-ready digital systems.',
  },
  {
    year: 'Jan 2026',
    event:
      'Intersites Digital officially launched as a founder-led digital engineering studio.',
  },
  {
    year: '2026',
    event:
      'Building foundations across web platforms, automation systems, and AI integrations.',
  },
  {
    year: 'Present',
    event:
      'Growing into a modern digital engineering studio built for long-term innovation.',
  },
  {
    year: 'Future',
    event:
      'Scaling toward intelligent infrastructure, advanced systems, and enduring digital platforms.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      {/* ================= HERO ================= */}
      <section className="py-24 bg-gradient-to-b from-gray-950 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 blur-[120px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-badge mb-6 inline-block">About Us</span>

            <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-6">
              We’re Building a{' '}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Modern Digital Studio
              </span>
            </h1>

            <p className="text-white/60 text-xl leading-relaxed mb-6">
              Intersites Digital started with a simple idea — build modern digital
              systems with an engineering-first mindset. The vision began in early
              2025 and officially took shape in January 2026.
            </p>

            <p className="text-white/50 leading-relaxed">
              We’re a founder-led studio focused on high-performance platforms,
              intelligent systems, and scalable digital infrastructure. Small by
              design today, but built with a long-term vision for what comes next.
            </p>
          </div>

          {/* Honest Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: 'Jan 2026', label: 'Founded' },
              { value: '2', label: 'Core Builders' },
              { value: 'Engineering-First', label: 'Approach' },
              { value: 'Future-Focused', label: 'Vision' },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-white">{value}</div>
                <div className="text-white/50 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-badge mb-4 inline-block">Our Values</span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              What We Stand For
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card p-6">
                <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  {title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-badge mb-4 inline-block">The Team</span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              The Builders Behind Intersites
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {team.map(({ name, role, specialty, initials, color }) => (
              <div
                key={name}
                className="glass-card p-6 flex items-start gap-4"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold`}
                >
                  {initials}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {name}
                  </h3>
                  <p className="text-violet-600 dark:text-violet-400 text-sm font-medium mb-1">
                    {role}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    {specialty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TIMELINE ================= */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-badge mb-4 inline-block">Our Journey</span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              How It Started
            </h2>
          </div>

          <div className="space-y-8">
            {milestones.map(({ year, event }) => (
              <div key={year} className="flex gap-4">
                <div className="text-violet-600 font-bold w-24 shrink-0">
                  {year}
                </div>
                <p className="text-gray-700 dark:text-gray-300">{event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Let’s Build Something That Lasts
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            If you're building something meaningful, we'd love to be part of the journey.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-violet-700 font-bold px-8 py-4 rounded-xl"
          >
            Get in Touch <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}