import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Twitter, Linkedin, Instagram, Github, Mail, Phone, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { newsletterAPI } from '../../lib/api';

/* =========================
   Scroll To Top on Route Change
========================= */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

/* =========================
   Footer Links
========================= */
const footerLinks = {
  Services: [
    { label: 'Web Systems', to: '/services' },
    { label: 'AI Integrations', to: '/services' },
    { label: 'Automation Systems', to: '/services' },
    { label: 'Digital Infrastructure', to: '/services' },
  ],
  Company: [
    { label: 'About', to: '/about' },
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'Contact', to: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/legal/privacy' },
    { label: 'Terms', to: '/legal/terms' },
    { label: 'Sitemap', to: '/legal/sitemap' },
  ],
};

const socials = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Github, href: '#', label: 'GitHub' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubscribe = async (e) => {
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
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <footer className="relative bg-gray-950 text-gray-400 overflow-hidden">
      <ScrollToTop />

      {/* Gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/60 transition-all duration-300">
                <img src="/logodark.png" alt="Intersites Digital Logo" />
              </div>
              <div>
                <span className="font-bold text-xl text-white">Intersites</span>
                <span className="text-violet-400 font-bold text-xl"> Digital</span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed max-w-sm text-gray-400">
              A modern digital engineering studio building high-performance platforms,
              intelligent systems, and scalable digital infrastructure.
            </p>

            {/* Contact */}
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-violet-400" />
                <a href="mailto:intersitesdigital@gmail.com" className="hover:text-white transition">
                  intersitesdigital@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-violet-400" />
                <a href="tel:+919142894203" className="hover:text-white transition">
                  +91 91428 94203
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-violet-400" />
                <span>India 🇮🇳</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center hover:bg-violet-600 hover:scale-105 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm hover:text-violet-400 flex items-center gap-1 group transition"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-10 border-t border-white/10 flex flex-col lg:flex-row justify-between gap-6">
          <div>
            <h4 className="text-white font-semibold">Stay in the loop</h4>
            <p className="text-sm text-gray-400">Insights on systems, AI, and building digital products.</p>
          </div>

          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-violet-500"
            />
            <button className="bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 rounded-xl text-sm transition-all">
              {status === 'loading' ? '...' : status === 'success' ? '✓' : 'Subscribe'}
            </button>
          </form>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Intersites Digital. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/legal/privacy" className="hover:text-violet-400 transition">Privacy</Link>
            <Link to="/legal/terms" className="hover:text-violet-400 transition">Terms</Link>
            <Link to="/legal/sitemap" className="hover:text-violet-400 transition">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}