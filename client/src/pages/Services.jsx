import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2, Palette, Globe, TrendingUp, Smartphone, Cloud, Brain, ShieldCheck,
  X, ArrowRight, CheckCircle2, Clock, DollarSign, Star
} from 'lucide-react';

const services = [
  {
    id: 'web-dev',
    icon: Code2,
    title: 'Web Development',
    tagline: 'Websites that work as hard as you do',
    shortDesc: 'Blazing-fast, SEO-optimized websites and full-stack applications.',
    color: 'from-violet-500 to-purple-600',
    accentBg: 'bg-violet-500/10',
    accentText: 'text-violet-600 dark:text-violet-400',
    fullDesc: `We craft pixel-perfect, high-performance websites and web applications that don't just look stunning — they drive measurable business results. Our development philosophy centers on clean code, performance, and scalability.`,
    details: [
      'Custom React / Next.js frontends with server-side rendering',
      'Node.js, Express & MongoDB backend APIs',
      'REST and GraphQL API design & development',
      'E-commerce platforms with Shopify / WooCommerce',
      'CMS integration (Contentful, Sanity, Strapi)',
      'Progressive Web Apps (PWA) development',
      'Performance optimization — 90+ Lighthouse scores guaranteed',
      'Accessibility (WCAG 2.1 AA) compliance',
    ],
    process: ['Discovery & Architecture', 'Design & Prototype', 'Development', 'Testing & QA', 'Launch & Support'],
    timeline: '4–12 weeks',
    startingPrice: '₹50,000',
    badge: 'Most Popular',
  },
  {
    id: 'ui-ux',
    icon: Palette,
    title: 'UI/UX Design',
    tagline: 'Interfaces users love to use',
    shortDesc: 'Conversion-focused design that delights users and drives results.',
    color: 'from-fuchsia-500 to-pink-600',
    accentBg: 'bg-fuchsia-500/10',
    accentText: 'text-fuchsia-600 dark:text-fuchsia-400',
    fullDesc: `Good design is invisible. Great design turns visitors into loyal customers. We combine data-driven UX principles with bold creative vision to build interfaces that feel effortless and convert consistently.`,
    details: [
      'User research, personas & journey mapping',
      'Information architecture & wireframing',
      'High-fidelity UI design in Figma',
      'Interactive prototypes & user testing',
      'Design system creation & documentation',
      'Brand identity & style guides',
      'Responsive design for all devices',
      'A/B testing & conversion rate optimization',
    ],
    process: ['Research', 'Wireframes', 'Visual Design', 'Prototype', 'Handoff'],
    timeline: '2–6 weeks',
    startingPrice: '₹30,000',
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile Apps',
    tagline: 'Native-quality apps, cross-platform',
    shortDesc: 'iOS and Android apps built with React Native for maximum reach.',
    color: 'from-cyan-500 to-blue-600',
    accentBg: 'bg-cyan-500/10',
    accentText: 'text-cyan-600 dark:text-cyan-400',
    fullDesc: `We build cross-platform mobile applications using React Native that deliver a native-quality experience on both iOS and Android — from a single codebase. Fast to ship, easy to maintain, beautiful to use.`,
    details: [
      'React Native cross-platform development',
      'Native iOS (Swift) & Android (Kotlin) when needed',
      'Expo-managed & bare workflow expertise',
      'Push notifications & background services',
      'Offline-first architecture',
      'App Store & Google Play deployment',
      'Analytics integration (Firebase, Mixpanel)',
      'In-app purchases & subscription management',
    ],
    process: ['Scoping', 'Design', 'Sprint Development', 'Beta Testing', 'Launch'],
    timeline: '8–20 weeks',
    startingPrice: '₹80,000',
  },
  {
    id: 'seo',
    icon: Globe,
    title: 'SEO & Content Marketing',
    tagline: 'Rank higher, reach further',
    shortDesc: 'Data-driven SEO strategies that bring qualified, organic traffic.',
    color: 'from-emerald-500 to-teal-600',
    accentBg: 'bg-emerald-500/10',
    accentText: 'text-emerald-600 dark:text-emerald-400',
    fullDesc: `We don't just chase rankings — we build sustainable organic growth engines. Our SEO strategies are rooted in technical excellence, high-quality content, and genuine authority building that compound over time.`,
    details: [
      'Technical SEO audit & implementation',
      'Keyword research & competitive analysis',
      'On-page optimization & content strategy',
      'Link building & digital PR',
      'Local SEO for multi-location businesses',
      'Monthly performance reporting',
      'Google Search Console & Analytics setup',
      'Core Web Vitals optimization',
    ],
    process: ['Audit', 'Strategy', 'Implementation', 'Content', 'Monitor & Iterate'],
    timeline: 'Ongoing (3+ months)',
    startingPrice: '₹15,000/mo',
  },
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud & DevOps',
    tagline: 'Scalable infrastructure, zero downtime',
    shortDesc: 'AWS, GCP & Azure deployments with CI/CD pipelines.',
    color: 'from-orange-500 to-amber-600',
    accentBg: 'bg-orange-500/10',
    accentText: 'text-orange-600 dark:text-orange-400',
    fullDesc: `Modern apps need modern infrastructure. We set up scalable, secure cloud environments with automated deployments, monitoring, and zero-downtime releases so your team can ship with confidence.`,
    details: [
      'AWS, GCP, Azure infrastructure setup',
      'Docker containerization & Kubernetes orchestration',
      'CI/CD pipelines (GitHub Actions, GitLab CI)',
      'Database management & backups (MongoDB, PostgreSQL)',
      'CDN & edge configuration',
      'Security hardening & compliance',
      'Performance monitoring (Datadog, New Relic)',
      'Incident response & on-call setup',
    ],
    process: ['Assessment', 'Architecture', 'Setup', 'Migration', 'Handoff'],
    timeline: '2–8 weeks',
    startingPrice: '₹40,000',
  },
  {
    id: 'ai',
    icon: Brain,
    title: 'AI & Automation',
    tagline: 'Intelligent solutions for modern businesses',
    shortDesc: 'LLM integrations, chatbots, and AI-powered automation workflows.',
    color: 'from-rose-500 to-red-600',
    accentBg: 'bg-rose-500/10',
    accentText: 'text-rose-600 dark:text-rose-400',
    fullDesc: `We help businesses harness the power of AI — from intelligent chatbots and document processing to custom LLM integrations and workflow automation. Stop doing manually what machines can do better.`,
    details: [
      'OpenAI / Claude / Gemini API integrations',
      'Custom chatbot & virtual assistant development',
      'RAG (Retrieval-Augmented Generation) pipelines',
      'Document analysis & data extraction',
      'Workflow automation (n8n, Zapier, custom)',
      'AI-powered recommendation engines',
      'Natural language processing (NLP) solutions',
      'ML model deployment & monitoring',
    ],
    process: ['Use Case Discovery', 'Prototype', 'Build', 'Test & Evaluate', 'Deploy'],
    timeline: '4–16 weeks',
    startingPrice: '₹60,000',
    badge: 'Hot 🔥',
  },
  {
    id: 'growth',
    icon: TrendingUp,
    title: 'Growth Consulting',
    tagline: 'Strategy meets execution',
    shortDesc: 'End-to-end growth strategies to scale your digital business.',
    color: 'from-indigo-500 to-blue-600',
    accentBg: 'bg-indigo-500/10',
    accentText: 'text-indigo-600 dark:text-indigo-400',
    fullDesc: `Growth isn't an accident — it's a system. We partner with ambitious businesses to build data-driven growth machines: from funnel optimization and paid media to retention and viral loops.`,
    details: [
      'Digital growth audit & roadmap',
      'Conversion funnel analysis & optimization',
      'Paid advertising strategy (Google, Meta)',
      'Customer acquisition & retention frameworks',
      'Product-market fit research',
      'Competitive intelligence & positioning',
      'OKR setting & progress tracking',
      'Monthly strategy calls & reporting',
    ],
    process: ['Audit', 'Roadmap', 'Execute', 'Measure', 'Scale'],
    timeline: 'Ongoing (6+ months)',
    startingPrice: '₹25,000/mo',
  },
  {
    id: 'security',
    icon: ShieldCheck,
    title: 'Cybersecurity',
    tagline: 'Protect what you\'ve built',
    shortDesc: 'Security audits, penetration testing, and compliance consulting.',
    color: 'from-slate-500 to-gray-600',
    accentBg: 'bg-slate-500/10',
    accentText: 'text-slate-600 dark:text-slate-400',
    fullDesc: `Your digital assets are your most valuable infrastructure. We conduct thorough security audits, identify vulnerabilities, and implement robust protections to keep your application and data safe.`,
    details: [
      'Web application penetration testing',
      'OWASP Top 10 vulnerability assessment',
      'Code security review',
      'HTTPS / SSL configuration hardening',
      'GDPR & data privacy compliance',
      'Security headers & CSP implementation',
      'Incident response planning',
      'Ongoing security monitoring',
    ],
    process: ['Scoping', 'Reconnaissance', 'Testing', 'Reporting', 'Remediation'],
    timeline: '1–4 weeks',
    startingPrice: '₹35,000',
  },
];

function ServiceModal({ service, onClose }) {
  if (!service) return null;
  const Icon = service.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-white/10">
        {/* Header */}
        <div className={`bg-gradient-to-r ${service.color} p-8 rounded-t-3xl relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.4),transparent)]" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div>
              {service.badge && (
                <span className="inline-block bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full mb-1">{service.badge}</span>
              )}
              <h3 className="text-2xl font-bold text-white">{service.title}</h3>
              <p className="text-white/80 text-sm">{service.tagline}</p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{service.fullDesc}</p>

          {/* What's included */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">What's Included</h4>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {service.details.map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">Our Process</h4>
            <div className="flex items-center gap-2 flex-wrap">
              {service.process.map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="flex items-center gap-2 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-xs font-medium px-3 py-1.5 rounded-full">
                    <span className="w-4 h-4 rounded-full bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-400 text-xs flex items-center justify-center font-bold">{i + 1}</span>
                    {step}
                  </span>
                  {i < service.process.length - 1 && <ArrowRight className="w-3 h-3 text-gray-400 shrink-0" />}
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & timeline */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-4 border border-gray-200 dark:border-white/10">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
                <Clock className="w-3.5 h-3.5" /> Timeline
              </div>
              <div className="font-bold text-gray-900 dark:text-white">{service.timeline}</div>
            </div>
            <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-4 border border-gray-200 dark:border-white/10">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
                <DollarSign className="w-3.5 h-3.5" /> Starting From
              </div>
              <div className="font-bold text-gray-900 dark:text-white">{service.startingPrice}</div>
            </div>
          </div>

          <Link
            to="/contact"
            className="btn-primary w-full justify-center"
            onClick={onClose}
          >
            Get a Custom Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-600/15 blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <span className="section-badge mb-6 inline-block">Our Services</span>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Dominate Digital
            </span>
          </h1>
          <p className="text-white/60 text-xl leading-relaxed">
            From strategy to launch and beyond — we offer the full spectrum of digital services to help you compete and win.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="glass-card p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 group flex flex-col relative"
                >
                  {service.badge && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                      {service.badge}
                    </span>
                  )}
                  <div className={`w-12 h-12 rounded-2xl ${service.accentBg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${service.accentText}`} />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{service.title}</h3>
                  <p className="text-xs font-medium text-violet-600 dark:text-violet-400 mb-3">{service.tagline}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed flex-1">{service.shortDesc}</p>
                  <div className="mt-5 pt-5 border-t border-gray-100 dark:border-white/10 flex items-center justify-between">
                    <span className="text-xs text-gray-400">From {service.startingPrice}</span>
                    <button
                      onClick={() => setSelectedService(service)}
                      className="inline-flex items-center gap-1.5 text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 text-sm font-semibold transition"
                    >
                      View More <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-badge mb-6 inline-block">How We Work</span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-16">
            Our <span className="gradient-text">Proven Process</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'We deep-dive into your business goals, target audience, and competitive landscape.' },
              { step: '02', title: 'Strategy', desc: 'We craft a tailored roadmap with clear milestones, timelines, and success metrics.' },
              { step: '03', title: 'Execution', desc: 'Our team of experts executes with precision, keeping you updated every step.' },
              { step: '04', title: 'Growth', desc: 'We launch, measure, iterate, and continuously improve for long-term results.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative">
                <div className="text-6xl font-bold text-gray-100 dark:text-white/5 font-display mb-4">{step}</div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 -mt-8">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-white/80 mb-8 text-lg">Tell us about your project and get a free consultation.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-violet-700 hover:bg-violet-50 font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5">
            Start Free Consultation <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Modal */}
      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
    </div>
  );
}
