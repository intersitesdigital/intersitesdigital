import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Shield, FileText, Map, ArrowRight } from 'lucide-react';

const pages = {

  // ─── PRIVACY POLICY ────────────────────────────────────────────
  privacy: {
    index: 0,
    icon: Shield,
    title: 'Privacy Policy',
    subtitle: 'Clear, honest information about how we handle your data.',
    lastUpdated: 'January 2025',
    content: [
      {
        heading: 'Overview',
        body: `Intersites Digital is a digital engineering studio based in India. We build websites, automation systems, and AI-powered tools for businesses. This Privacy Policy explains what information we collect when you visit our website or work with us, how we use it, and how we keep it safe.\n\nWe've written this to be readable — not just legally compliant. If you have any questions, reach out at intersitesdigital@gmail.com.`,
      },
      {
        heading: '1. Information We Collect',
        body: `We collect information in two ways — what you give us directly, and what we observe through standard web analytics.\n\nInformation you provide:\n• Name and email address when you fill out our contact or inquiry forms\n• Project details, business goals, and technical requirements shared during consultations\n• Phone number or company name, if you choose to include them\n\nInformation collected automatically:\n• Pages visited and time spent on the site (via Google Analytics)\n• General location (city/country level) and browser/device type\n• Referral source — how you found us\n\nWe do not collect payment information directly. Any transactions are handled through secure third-party payment processors.`,
      },
      {
        heading: '2. How We Use Your Information',
        body: `We use your information to run our business and serve you well — nothing more.\n\n• To respond to your inquiry or project request\n• To send project updates, proposals, and invoices\n• To deliver the services you've engaged us for\n• To send our newsletter, if you've opted in (you can unsubscribe anytime)\n• To understand which parts of our site are useful and which aren't\n• To comply with applicable legal requirements\n\nWe do not use your data for advertising, profiling, or any automated decision-making.`,
      },
      {
        heading: '3. Data Protection',
        body: `We take data security seriously, even though we're a small team.\n\n• All data is transmitted over encrypted HTTPS connections\n• We store data on secure, access-controlled infrastructure\n• We limit internal access to what's strictly necessary\n• We do not sell, rent, or trade your personal data to any third party — ever\n\nIf there is ever a breach that affects your data, we will notify you promptly.`,
      },
      {
        heading: '4. Cookies',
        body: `We use cookies to understand how people use our site and to make it work properly.\n\nEssential cookies: Required for the site to function — login sessions, form state, etc.\n\nAnalytics cookies: We use Google Analytics to understand traffic patterns. This data is aggregated and anonymised. You can opt out at any time via your browser settings or using Google's opt-out tool.\n\nWe do not use advertising or tracking cookies.`,
      },
      {
        heading: '5. Third-Party Services',
        body: `We use a small number of trusted third-party tools to operate our business:\n\n• Google Analytics — website usage tracking\n• MongoDB Atlas — secure cloud database for form submissions and project data\n• Email providers — for sending and receiving communications\n• Hosting providers — for serving this website\n\nEach of these providers has their own privacy practices. We select tools that meet reasonable data protection standards.`,
      },
      {
        heading: '6. Your Rights',
        body: `You have full rights over your personal data.\n\n• Access: Request a copy of the data we hold about you\n• Correction: Ask us to fix inaccurate information\n• Deletion: Request that we delete your data\n• Opt-out: Unsubscribe from any communication at any time\n\nTo exercise any of these rights, email us at intersitesdigital@gmail.com. We will respond within 7 business days.`,
      },
      {
        heading: '7. Data Retention',
        body: `We retain your contact and project information for as long as we have an active relationship, or as required for tax and legal compliance. If you request deletion, we will remove your data within 14 days, except where we are legally required to retain it.`,
      },
      {
        heading: '8. Changes to This Policy',
        body: `If we make meaningful changes to this policy, we'll update the date at the top and, where appropriate, notify you by email. Continued use of the site after changes means you accept the updated policy.`,
      },
      {
        heading: '9. Contact',
        body: `If you have any privacy-related questions:\n\nEmail: intersitesdigital@gmail.com\nLocation: India\n\nWe're a small team. You'll hear from a real person.`,
      },
    ],
  },

  // ─── TERMS & CONDITIONS ─────────────────────────────────────────
  terms: {
    index: 1,
    icon: FileText,
    title: 'Terms & Conditions',
    subtitle: 'Straightforward terms for working together professionally.',
    lastUpdated: 'January 2025',
    content: [
      {
        heading: 'Introduction',
        body: `These Terms & Conditions govern all work undertaken by Intersites Digital ("we", "us") for clients ("you"). By engaging our services, you agree to these terms. We recommend reading them fully — they are written to be fair to both sides.\n\nFor project-specific details, a separate Statement of Work (SOW) or proposal will be shared and must be agreed upon before work begins.`,
      },
      {
        heading: '1. Scope of Services',
        body: `Intersites Digital provides digital engineering services including:\n\n• Website design and development\n• Web application development\n• AI integrations and LLM-powered tools\n• Automation workflow design and implementation\n• Cloud infrastructure setup and DevOps\n• Digital consulting and technical advisory\n\nThe exact deliverables, timeline, and cost for each project are defined in the project proposal or SOW. Work beyond the agreed scope will be discussed, estimated, and approved before execution.`,
      },
      {
        heading: '2. Intellectual Property',
        body: `Upon receipt of full payment, you own all custom work created specifically for your project — including design files, source code, and content.\n\nWe retain ownership of:\n• Our internal frameworks, boilerplate code, and development tools\n• Any pre-existing libraries or components we bring to the project\n\nWe reserve the right to include your project in our portfolio and case studies unless we have a signed NDA in place. If confidentiality is required, please inform us before the project starts.\n\nYou are responsible for ensuring that all content, images, or brand assets you provide to us are legally yours to use.`,
      },
      {
        heading: '3. Payments',
        body: `We structure payments in milestones to keep things transparent and low-risk for both sides.\n\nStandard structure:\n• 40–50% upfront before work begins\n• 25–30% at a defined project milestone\n• Remaining balance before final delivery\n\nInvoices are due within 7 business days. Work may be paused on accounts with overdue payments.\n\nNo refunds are issued once a milestone has been delivered and approved. If a project is cancelled mid-way, you are responsible for payment covering all work completed to that point.\n\nPricing is in Indian Rupees (INR) unless otherwise agreed in writing.`,
      },
      {
        heading: '4. Revisions',
        body: `Each project includes a defined number of revision rounds as specified in the proposal.\n\nWhat counts as a revision: adjustments to agreed deliverables within the original scope.\n\nWhat counts as new scope: new features, significant design changes, or requirements that weren't part of the original brief. These will be quoted separately.\n\nWe believe in collaborative work — if something doesn't feel right, tell us early. It's faster for everyone.`,
      },
      {
        heading: '5. Timelines',
        body: `We commit to realistic timelines and communicate proactively if anything changes.\n\nTimelines depend on both sides. Delays caused by late feedback, missing assets, or unclear requirements from the client may extend the delivery date. We will always inform you in advance if this happens.\n\nFinal delivery dates are estimates unless explicitly agreed in writing as fixed deadlines.`,
      },
      {
        heading: '6. Confidentiality',
        body: `We treat all project information — your business data, strategies, and technical details — as confidential. We do not share it with third parties without your consent.\n\nIf your project requires a formal NDA, we are happy to sign one before any discussions begin.`,
      },
      {
        heading: '7. Limitation of Liability',
        body: `We build things carefully, but we cannot guarantee specific business outcomes. Rankings, conversion rates, revenue, and user behaviour depend on many factors outside our control.\n\nOur maximum liability for any claim related to our services is limited to the total amount paid by you in the three months preceding the claim.\n\nWe are not liable for indirect or consequential losses including lost profits, data loss, or business interruption.`,
      },
      {
        heading: '8. Termination',
        body: `Either party may end a project engagement with 14 days written notice.\n\nOn termination:\n• You pay for all work completed up to the termination date\n• We will hand over all completed deliverables\n• Upfront deposits are non-refundable\n\nWe reserve the right to terminate immediately in cases of abusive communication, non-payment, or misuse of our work.`,
      },
      {
        heading: '9. Governing Law',
        body: `These terms are governed by the laws of India. Any disputes will be handled through good-faith negotiation first. If unresolved, disputes will be subject to arbitration in accordance with the Arbitration and Conciliation Act, 1996, with jurisdiction in India.\n\nFor any questions about these terms, email us at intersitesdigital@gmail.com.`,
      },
    ],
  },

  // ─── SITEMAP ────────────────────────────────────────────────────
  sitemap: {
    index: 2,
    icon: Map,
    title: 'Sitemap',
    subtitle: 'A structured overview of every section on our website.',
    lastUpdated: 'February 2025',
    sections: [
      {
        category: 'Company',
        icon: '◆',
        color: 'text-violet-600 dark:text-violet-400',
        links: [
          { label: 'Home', to: '/', desc: 'Overview of what we build and how we work' },
          { label: 'About', to: '/about', desc: 'Our team, values, and how we operate' },
          { label: 'Contact', to: '/contact', desc: 'Start a project or ask a question' },
          { label: 'Careers', to: '/contact', desc: 'Future opportunities — reach out directly' },
        ],
      },
      {
        category: 'Services',
        icon: '◆',
        color: 'text-blue-600 dark:text-blue-400',
        links: [
          { label: 'Website Development', to: '/services', desc: 'High-performance web apps and marketing sites' },
          { label: 'AI Integrations', to: '/services', desc: 'LLM workflows, chatbots, and intelligent tools' },
          { label: 'Automation Systems', to: '/services', desc: 'End-to-end process automation across your stack' },
          { label: 'Digital Infrastructure', to: '/services', desc: 'Cloud architecture, DevOps, and scalable systems' },
        ],
      },
      {
        category: 'Resources',
        icon: '◆',
        color: 'text-emerald-600 dark:text-emerald-400',
        links: [
          { label: 'Portfolio', to: '/portfolio', desc: 'Selected work across industries and platforms' },
          { label: 'Blog', to: '/', desc: 'Insights on engineering, AI, and digital systems — coming soon' },
          { label: 'Case Studies', to: '/portfolio', desc: 'Deep dives into selected client projects — coming soon' },
        ],
      },
      {
        category: 'Legal',
        icon: '◆',
        color: 'text-gray-500 dark:text-gray-400',
        links: [
          { label: 'Privacy Policy', to: '/legal/privacy', desc: 'How we collect, use, and protect your data' },
          { label: 'Terms & Conditions', to: '/legal/terms', desc: 'Terms governing our services and engagements' },
          { label: 'Sitemap', to: '/legal/sitemap', desc: 'This page — full structure of the site' },
        ],
      },
    ],
  },
};

export default function LegalPage() {
  const { slug } = useParams();
  const page = pages[slug];

  if (!page) return <Navigate to="/" replace />;
  const Icon = page.icon;

  return (
    <div className="min-h-screen pt-20">

      {/* Header */}
      <section className="py-14 bg-gray-950 border-b border-white/6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8">
          <Link to="/" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-xs mb-8 transition tracking-wide">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/6 border border-white/8 flex items-center justify-center shrink-0 mt-0.5">
              <Icon className="w-5 h-5 text-white/60" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">{page.title}</h1>
              <p className="text-white/40 mt-1.5 text-sm">{page.subtitle}</p>
              <p className="text-white/25 text-xs mt-3 tracking-wide">Last updated: {page.lastUpdated}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">

          {/* Privacy & Terms */}
          {page.content && (
            <div className="space-y-12">
              {page.content.map(({ heading, body }) => (
                <div key={heading} className="grid sm:grid-cols-[220px_1fr] gap-6 sm:gap-12">
                  <div className="sm:pt-0.5">
                    <h2 className="text-sm font-semibold text-gray-900 dark:text-white">{heading}</h2>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm leading-7 whitespace-pre-line">
                    {body}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Sitemap — premium grid layout */}
          {page.sections && (
            <div className="space-y-14">
              {page.sections.map(({ category, icon, color, links }) => (
                <div key={category}>
                  <div className="flex items-center gap-2.5 mb-5">
                    <span className={`text-xs ${color}`}>{icon}</span>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">{category}</h2>
                    <div className="flex-1 h-px bg-gray-100 dark:bg-white/6" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {links.map(({ label, to, desc }) => (
                      <Link
                        key={label}
                        to={to}
                        className="group flex items-start justify-between gap-4 p-4 rounded-xl border border-gray-100 dark:border-white/6 bg-gray-50 dark:bg-white/2 hover:border-violet-200 dark:hover:border-violet-500/20 hover:bg-violet-50 dark:hover:bg-white/4 transition-all duration-200"
                      >
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">{label}</div>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 group-hover:text-violet-500 shrink-0 mt-0.5 transition" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* Footer note */}
              <div className="pt-8 border-t border-gray-100 dark:border-white/6 text-center">
                <p className="text-xs text-gray-300 dark:text-gray-600 tracking-wide">
                  Built with precision by Intersites Digital.
                </p>
              </div>
            </div>
          )}

          {/* Contact prompt */}
          <div className="mt-16 p-6 bg-gray-50 dark:bg-white/3 border border-gray-100 dark:border-white/6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium text-gray-900 dark:text-white text-sm">Questions about this page?</p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-0.5">Reach us at intersitesdigital@gmail.com</p>
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold px-5 py-2.5 rounded-lg text-sm hover:opacity-90 transition whitespace-nowrap">
              Contact Us <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
