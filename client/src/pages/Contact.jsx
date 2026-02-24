import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { contactAPI, leadsAPI } from '../lib/api';

const services = ['Web Development', 'UI/UX Design', 'SEO & Marketing', 'Cloud & DevOps', 'AI Solutions', 'Growth Consulting', 'Other'];
const budgets = ['Under ₹25,000', '₹25,000–₹75,000', '₹75,000–₹2,00,000', '₹2,00,000–₹5,00,000', '₹5,00,000+'];
const timelines = ['ASAP', 'Within 1 month', '1–3 months', '3–6 months', 'Flexible'];

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', service: '', budget: '', timeline: '', message: ''
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await Promise.all([
        contactAPI.submit(form),
        leadsAPI.capture({ name: form.name, email: form.email, phone: form.phone, company: form.company, service: form.service, budget: form.budget, source: 'contact-page' }),
      ]);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-lg mx-auto px-4">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Message Received! 🎉</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-8">
            Thank you for reaching out. Our team will review your project details and get back to you within <strong className="text-gray-900 dark:text-white">48 hours</strong>.
          </p>
          <button
            onClick={() => { setForm({ name: '', email: '', phone: '', company: '', service: '', budget: '', timeline: '', message: '' }); setStatus('idle'); }}
            className="btn-primary"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-violet-600/15 blur-[100px]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <span className="section-badge mb-6 inline-block">Contact Us</span>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            Let's Build Something{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Amazing
            </span>
          </h1>
          <p className="text-white/60 text-xl">Tell us about your project. We'll get back within 48 hours with a tailored plan.</p>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Info sidebar */}
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">Get in Touch</h3>
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: 'Email', value: 'intersitesdigital@gmail.com', href: 'mailto:intersitesdigital@gmail.com' },
                    { icon: Phone, label: 'Phone', value: '+91 91428 94203', href: 'tel:+919142894203' },
                    { icon: MapPin, label: 'Location', value: 'Jharkhand, India 🇮🇳', href: null },
                    { icon: Clock, label: 'Response Time', value: 'Within 48 hours', href: null },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
                        {href ? (
                          <a href={href} className="text-sm font-medium text-gray-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400 transition">{value}</a>
                        ) : (
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">What to Expect</h3>
                <div className="space-y-3">
                  {[
                    '1. We review your project details',
                    '2. Our team prepares a custom proposal',
                    '3. Free 30-min strategy call',
                    '4. Detailed quote & project plan',
                    '5. Kickoff & let\'s build!',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Tell Us About Your Project</h2>
                {status === 'error' && (
                  <div className="mb-6 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
                    Something went wrong. Please try again or email us directly.
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} required placeholder="John Doe"
                        className="w-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address *</label>
                      <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="john@company.com"
                        className="w-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number</label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210"
                        className="w-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Company Name</label>
                      <input name="company" value={form.company} onChange={handleChange} placeholder="Your Company"
                        className="w-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Service Needed</label>
                      <select name="service" value={form.service} onChange={handleChange}
                        className="w-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition">
                        <option value="">Select service…</option>
                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Budget Range</label>
                      <select name="budget" value={form.budget} onChange={handleChange}
                        className="w-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition">
                        <option value="">Select budget…</option>
                        {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Timeline</label>
                      <select name="timeline" value={form.timeline} onChange={handleChange}
                        className="w-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition">
                        <option value="">Select timeline…</option>
                        {timelines.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Project Details *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                      placeholder="Tell us about your project, goals, and any specific requirements…"
                      className="w-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition resize-none" />
                  </div>

                  <button type="submit" disabled={status === 'loading'}
                    className="w-full btn-primary justify-center py-4 text-base disabled:opacity-60">
                    {status === 'loading'
                      ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending…</span>
                      : <span className="flex items-center gap-2"><Send className="w-5 h-5" />Send Message</span>}
                  </button>

                  <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                    By submitting, you agree to our{' '}
                    <a href="/legal/privacy" className="underline hover:text-violet-500">Privacy Policy</a>.
                    We'll never spam you.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
