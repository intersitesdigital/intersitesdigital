import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Globe, Code2, TrendingUp } from 'lucide-react';

/* =========================
   Categories
========================= */
const categories = ['All', 'Web Systems', 'AI Systems', 'Automation', 'Infrastructure'];

/* =========================
   Honest Founder Projects
========================= */
const projects = [
  {
    id: 1,
    title: 'Intersites Digital Platform',
    category: 'Web Systems',
    description:
      'The core platform powering Intersites Digital — built with modern architecture, performance-first engineering, and scalable foundations.',
    tags: ['Node.js', 'React', 'MongoDB', 'Vite'],
    results: 'Founder-built core platform',
    color: 'from-violet-500 to-purple-600',
    icon: Code2,
  },
  {
    id: 2,
    title: 'AI Workflow Prototypes',
    category: 'AI Systems',
    description:
      'Experimental AI integrations exploring LLM workflows, intelligent automation, and real-world product applications.',
    tags: ['OpenAI', 'Node.js', 'Automation'],
    results: 'Internal R&D initiatives',
    color: 'from-fuchsia-500 to-pink-600',
    icon: Globe,
  },
  {
    id: 3,
    title: 'Automation Pipelines',
    category: 'Automation',
    description:
      'Custom automation experiments connecting APIs, tools, and workflows to reduce manual overhead and streamline operations.',
    tags: ['APIs', 'Node.js', 'Workflows'],
    results: 'Internal system prototypes',
    color: 'from-emerald-500 to-teal-600',
    icon: TrendingUp,
  },
  {
    id: 4,
    title: 'High-Performance Web Builds',
    category: 'Web Systems',
    description:
      'A collection of performance-first web builds focused on speed, clean architecture, and long-term maintainability.',
    tags: ['Next.js', 'Performance', 'Architecture'],
    results: 'Performance-focused builds',
    color: 'from-cyan-500 to-blue-600',
    icon: Code2,
  },
  {
    id: 5,
    title: 'Cloud Deployment Systems',
    category: 'Infrastructure',
    description:
      'Early infrastructure experiments around scalable deployment pipelines, serverless hosting, and resilient system setups.',
    tags: ['Vercel', 'AWS', 'DevOps'],
    results: 'Scalable infra experiments',
    color: 'from-orange-500 to-amber-600',
    icon: Globe,
  },
  {
    id: 6,
    title: 'Future Systems Lab',
    category: 'AI Systems',
    description:
      'Ongoing R&D focused on building future-ready digital systems, intelligent tools, and scalable architectures.',
    tags: ['AI', 'Systems', 'R&D'],
    results: 'Long-term innovation track',
    color: 'from-indigo-500 to-violet-600',
    icon: Code2,
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen pt-20">
      {/* ================= HERO ================= */}
      <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-fuchsia-600/15 blur-[100px]" />

        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <span className="section-badge mb-6 inline-block">Our Work</span>

          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            What We're{' '}
            <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Building
            </span>
          </h1>

          <p className="text-white/60 text-xl">
            A look into what we’re building — from core platforms to experimental systems shaping our future direction.
          </p>
        </div>
      </section>

      {/* ================= FILTER TABS ================= */}
      <section className="py-10 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-white/10 sticky top-20 z-30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                    : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROJECT GRID ================= */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => {
              const Icon = project.icon;
              return (
                <div
                  key={project.id}
                  className="glass-card overflow-hidden group hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300"
                >
                  {/* Top Gradient */}
                  <div className={`bg-gradient-to-br ${project.color} h-40 relative`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="w-16 h-16 text-white/30" />
                    </div>

                    <div className="absolute top-3 left-3">
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <ExternalLink className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                      {project.title}
                    </h3>

                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 text-xs px-2.5 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Result badge */}
                    <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl p-3">
                      <p className="text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
                        {project.results}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-white dark:bg-gray-950 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Let’s Build Something Meaningful
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
            Have an idea worth building? Let’s collaborate and bring it to life.
          </p>

          <Link to="/contact" className="btn-primary text-base px-8 py-4">
            Start a Project <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}