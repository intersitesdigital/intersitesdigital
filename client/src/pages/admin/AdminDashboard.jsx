import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { reviewsAPI } from '../../lib/api';
import api from '../../lib/api';
import {
  Star, Trash2, LogOut, RefreshCw, Globe, MessageSquare, CheckCircle,
  AlertCircle, LayoutDashboard, Users, Mail, Phone, Briefcase, TrendingUp,
  FileText, Inbox, KeyRound, X, Loader2
} from 'lucide-react';

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`w-3.5 h-3.5 ${s <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`} />
      ))}
    </div>
  );
}

function ReviewCard({ review, onDelete, isGoogle }) {
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    if (!confirm('Delete this review?')) return;
    setDeleting(true);
    await onDelete(review._id);
    setDeleting(false);
  };
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3 hover:bg-white/[0.07] transition group">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-white text-sm truncate">{review.name || review.author_name}</p>
            {isGoogle && <span className="inline-flex items-center gap-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full font-medium shrink-0"><Globe className="w-3 h-3" />Google</span>}
          </div>
          <StarRating rating={review.rating} />
        </div>
        {!isGoogle && (
          <button onClick={handleDelete} disabled={deleting} className="shrink-0 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg p-1.5 transition-all disabled:opacity-40">
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      <p className="text-gray-400 text-sm leading-relaxed line-clamp-4">{review.message || review.text}</p>
      <p className="text-gray-600 text-xs">{review.relativeTime || (review.createdAt && new Date(review.createdAt).toLocaleDateString())}</p>
    </div>
  );
}

function LeadCard({ lead }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/[0.07] transition">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 font-bold text-sm shrink-0">
          {(lead.name || lead.email)[0].toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-white text-sm truncate">{lead.name || 'Unknown'}</p>
          <p className="text-gray-400 text-xs truncate">{lead.email}</p>
        </div>
        <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
          lead.status === 'new' ? 'bg-emerald-500/15 text-emerald-400' :
          lead.status === 'contacted' ? 'bg-blue-500/15 text-blue-400' :
          'bg-gray-500/15 text-gray-400'
        }`}>{lead.status}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        {lead.phone && <div className="flex items-center gap-1 text-gray-400 min-w-0"><Phone className="w-3 h-3 shrink-0" /><span className="truncate">{lead.phone}</span></div>}
        {lead.company && <div className="flex items-center gap-1 text-gray-400 min-w-0"><Briefcase className="w-3 h-3 shrink-0" /><span className="truncate">{lead.company}</span></div>}
        {lead.service && <div className="flex items-center gap-1 text-gray-400 min-w-0"><FileText className="w-3 h-3 shrink-0" /><span className="truncate">{lead.service}</span></div>}
        {lead.source && <div className="flex items-center gap-1 text-gray-400 min-w-0"><TrendingUp className="w-3 h-3 shrink-0" /><span className="truncate">{lead.source}</span></div>}
      </div>
      <p className="text-gray-600 text-xs mt-2">{new Date(lead.createdAt).toLocaleDateString()}</p>
    </div>
  );
}

function ContactCard({ contact }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/[0.07] transition">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0">
          <p className="font-semibold text-white text-sm truncate">{contact.name}</p>
          <p className="text-gray-400 text-xs truncate">{contact.email}</p>
        </div>
        <span className="shrink-0 text-xs bg-blue-500/15 text-blue-400 px-2 py-0.5 rounded-full">{contact.service || 'General'}</span>
      </div>
      <p className="text-gray-400 text-sm line-clamp-3 mb-2">{contact.message}</p>
      {contact.budget && <p className="text-xs text-gray-500">Budget: {contact.budget}</p>}
      <p className="text-gray-600 text-xs mt-1">{new Date(contact.createdAt).toLocaleDateString()}</p>
    </div>
  );
}

function ChangePasswordModal({ onClose }) {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSendResetEmail = async () => {
    setStatus('loading');
    setMessage('');
    try {
      const res = await api.post('/v1/admin/request-password-reset');
      setStatus('success');
      setMessage(res.message || 'Reset link sent. Check your admin email.');
    } catch (err) {
      setStatus('error');
      setMessage(err.message || 'Failed to send reset email. Check SMTP config in server .env');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-gray-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl mx-4">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center shrink-0">
              <KeyRound className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <h2 className="font-semibold text-white text-sm">Change Password</h2>
              <p className="text-gray-500 text-xs">Send reset link to admin email</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-5 py-5 space-y-4">
          <div className="bg-white/5 border border-white/8 rounded-xl p-4 text-sm text-gray-400 leading-relaxed">
            <p>A reset link will be sent to the <span className="text-white font-medium">ADMIN_EMAIL</span> in your server <code className="bg-white/10 text-violet-300 px-1.5 py-0.5 rounded text-xs">.env</code>.</p>
            <p className="mt-2 text-gray-500 text-xs">Link expires in <strong className="text-gray-400">15 minutes</strong>.</p>
          </div>
          {status === 'success' && (
            <div className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-emerald-300 text-sm">{message}</p>
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{message}</p>
            </div>
          )}
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 text-sm font-medium transition">
              Cancel
            </button>
            <button
              onClick={handleSendResetEmail}
              disabled={status === 'loading' || status === 'success'}
              className="flex-1 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-4 py-2.5 rounded-lg text-sm transition"
            >
              {status === 'loading' ? <><Loader2 className="w-4 h-4 animate-spin" />Sending…</>
                : status === 'success' ? <><CheckCircle className="w-4 h-4" />Sent</>
                : <><Mail className="w-4 h-4" />Send Reset Email</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const tabs = [
  { id: 'reviews', label: 'Reviews', icon: MessageSquare },
  { id: 'leads', label: 'Leads', icon: Users },
  { id: 'contacts', label: 'Contacts', icon: Inbox },
  { id: 'newsletter', label: 'Newsletter', icon: Mail },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('reviews');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [localReviews, setLocalReviews] = useState([]);
  const [googleReviews, setGoogleReviews] = useState([]);
  const [leads, setLeads] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [reviewsRes, leadsRes, contactsRes, newsletterRes] = await Promise.allSettled([
        reviewsAPI.getAll(),
        api.get('/leads'),
        api.get('/contact'),
        api.get('/newsletter'),
      ]);
      if (reviewsRes.status === 'fulfilled') {
        setLocalReviews(reviewsRes.value.data?.local || []);
        setGoogleReviews(reviewsRes.value.data?.google || []);
      }
      if (leadsRes.status === 'fulfilled') setLeads(leadsRes.value.data || []);
      if (contactsRes.status === 'fulfilled') setContacts(contactsRes.value.data || []);
      if (newsletterRes.status === 'fulfilled') setSubscribers(newsletterRes.value.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleDeleteReview = async (id) => {
    try {
      await reviewsAPI.delete(id);
      setLocalReviews((prev) => prev.filter((r) => r._id !== id));
      showNotification('Review deleted.');
    } catch (err) {
      showNotification(err.message || 'Failed to delete.', 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin-login', { replace: true });
  };

  const statCards = [
    { label: 'Local Reviews', value: localReviews.length, icon: MessageSquare, color: 'indigo' },
    { label: 'Google Reviews', value: googleReviews.length, icon: Globe, color: 'blue' },
    { label: 'Leads', value: leads.length, icon: Users, color: 'violet' },
    { label: 'Contacts', value: contacts.length, icon: Inbox, color: 'fuchsia' },
    { label: 'Subscribers', value: subscribers.length, icon: Mail, color: 'emerald' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-white">

      {/* Toast */}
      {notification && (
        <div className={`fixed top-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-auto z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-xl text-sm font-medium ${notification.type === 'success' ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300' : 'bg-red-500/20 border border-red-500/30 text-red-300'}`}>
          {notification.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          {notification.msg}
        </div>
      )}

      {showPasswordModal && <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />}

      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center shrink-0">
              <LayoutDashboard className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-sm sm:text-base truncate">Admin Dashboard</h1>
              <p className="text-gray-500 text-xs hidden sm:block">Intersites Digital</p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button onClick={fetchAll} title="Refresh" className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => setShowPasswordModal(true)}
              title="Change Password"
              className="p-2 sm:flex sm:items-center sm:gap-1.5 sm:px-3 text-gray-400 hover:text-violet-300 hover:bg-violet-500/10 rounded-lg transition"
            >
              <KeyRound className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Password</span>
            </button>
            <button
              onClick={handleLogout}
              className="p-2 sm:flex sm:items-center sm:gap-1.5 sm:px-3 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

        {/* Stats Grid — 2 cols on mobile, 3 on sm, 5 on lg */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-10">
          {statCards.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4">
              <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg bg-${color}-500/10 mb-2 sm:mb-3`}>
                <Icon className={`w-4 h-4 text-${color}-400`} />
              </div>
              <p className="text-xl sm:text-2xl font-bold">{value}</p>
              <p className="text-gray-500 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Tabs — scrollable on mobile */}
        <div className="mb-6 sm:mb-8">
          <div className="flex gap-1 bg-white/5 p-1 rounded-xl overflow-x-auto scrollbar-hide">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap flex-shrink-0 ${activeTab === id ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{label}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-6 sm:space-y-8">
            <section>
              <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" /> Local Reviews
                <span className="bg-indigo-500/20 text-indigo-300 text-xs px-2 py-0.5 rounded-full">{localReviews.length}</span>
              </h2>
              {loading
                ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">{[...Array(3)].map((_, i) => <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 animate-pulse h-32" />)}</div>
                : localReviews.length === 0
                ? <div className="text-gray-500 text-sm bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8 text-center">No local reviews yet.</div>
                : <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">{localReviews.map((r) => <ReviewCard key={r._id} review={r} onDelete={handleDeleteReview} isGoogle={false} />)}</div>}
            </section>
            <section>
              <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" /> Google Reviews
                <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-0.5 rounded-full">{googleReviews.length}</span>
              </h2>
              {!loading && googleReviews.length === 0 && <div className="text-gray-500 text-sm bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8 text-center">No Google reviews. Check your GOOGLE_API_KEY and GOOGLE_PLACE_ID.</div>}
              {!loading && googleReviews.length > 0 && <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">{googleReviews.map((r, i) => <ReviewCard key={i} review={r} onDelete={() => {}} isGoogle={true} />)}</div>}
            </section>
          </div>
        )}

        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <section>
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" /> Leads
              <span className="bg-violet-500/20 text-violet-300 text-xs px-2 py-0.5 rounded-full">{leads.length}</span>
            </h2>
            {loading
              ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">{[...Array(3)].map((_, i) => <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 animate-pulse h-28" />)}</div>
              : leads.length === 0
              ? <div className="text-gray-500 text-sm bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8 text-center">No leads yet.</div>
              : <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">{leads.map((l) => <LeadCard key={l._id} lead={l} />)}</div>}
          </section>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <section>
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
              <Inbox className="w-4 h-4 sm:w-5 sm:h-5 text-fuchsia-400" /> Contact Submissions
              <span className="bg-fuchsia-500/20 text-fuchsia-300 text-xs px-2 py-0.5 rounded-full">{contacts.length}</span>
            </h2>
            {loading
              ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">{[...Array(3)].map((_, i) => <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 animate-pulse h-32" />)}</div>
              : contacts.length === 0
              ? <div className="text-gray-500 text-sm bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8 text-center">No contact submissions yet.</div>
              : <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">{contacts.map((c) => <ContactCard key={c._id} contact={c} />)}</div>}
          </section>
        )}

        {/* Newsletter Tab */}
        {activeTab === 'newsletter' && (
          <section>
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" /> Newsletter Subscribers
              <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2 py-0.5 rounded-full">{subscribers.length}</span>
            </h2>
            {loading
              ? <div className="space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 animate-pulse h-14" />)}</div>
              : subscribers.length === 0
              ? <div className="text-gray-500 text-sm bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8 text-center">No subscribers yet.</div>
              : (
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                  {/* Mobile — card view */}
                  <div className="sm:hidden divide-y divide-white/5">
                    {subscribers.map((s) => (
                      <div key={s._id} className="px-4 py-3">
                        <p className="text-white text-sm font-medium truncate">{s.email}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-gray-400 text-xs">{s.source}</span>
                          <span className="text-gray-500 text-xs">{new Date(s.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Desktop — table view */}
                  <table className="w-full text-sm hidden sm:table">
                    <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-widest">
                      <tr>
                        <th className="text-left px-4 py-3">Email</th>
                        <th className="text-left px-4 py-3">Source</th>
                        <th className="text-left px-4 py-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {subscribers.map((s) => (
                        <tr key={s._id} className="hover:bg-white/5 transition">
                          <td className="px-4 py-3 text-white">{s.email}</td>
                          <td className="px-4 py-3 text-gray-400">{s.source}</td>
                          <td className="px-4 py-3 text-gray-500">{new Date(s.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
          </section>
        )}
      </main>
    </div>
  );
}
