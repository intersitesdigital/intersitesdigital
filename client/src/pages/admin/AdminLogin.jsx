import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { adminAPI } from '../../lib/api';
import api from '../../lib/api';
import { Lock, User, Eye, EyeOff, AlertCircle, CheckCircle, KeyRound, Loader2 } from 'lucide-react';

// ─── Reset Password Form ─────────────────────────────────────
function ResetPasswordForm({ token, onBack }) {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');
  const [tokenValid, setTokenValid] = useState(null); // null=checking, true, false

  // Verify the token is still valid on mount
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await api.get(`/v1/admin/verify-reset-token?token=${token}`);
        setTokenValid(res.valid);
      } catch {
        setTokenValid(false);
      }
    };
    verify();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatus('error');
      setMessage('Passwords do not match.');
      return;
    }
    if (newPassword.length < 8) {
      setStatus('error');
      setMessage('Password must be at least 8 characters.');
      return;
    }
    setStatus('loading');
    setMessage('');
    try {
      const res = await api.post('/v1/admin/reset-password', { token, newPassword });
      setStatus('success');
      setMessage(res.message || 'Password updated successfully.');
      setTimeout(() => navigate('/admin-login', { replace: true }), 3000);
    } catch (err) {
      setStatus('error');
      setMessage(err.message || 'Failed to reset password.');
    }
  };

  if (tokenValid === null) {
    return (
      <div className="text-center py-8">
        <Loader2 className="w-6 h-6 text-violet-400 animate-spin mx-auto mb-3" />
        <p className="text-gray-400 text-sm">Verifying reset link…</p>
      </div>
    );
  }

  if (tokenValid === false) {
    return (
      <div className="text-center py-4 space-y-4">
        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6 text-red-400" />
        </div>
        <div>
          <p className="text-white font-semibold">Link expired or invalid</p>
          <p className="text-gray-400 text-sm mt-1">This reset link has expired. Log in and request a new one.</p>
        </div>
        <button
          onClick={onBack}
          className="text-violet-400 hover:text-violet-300 text-sm underline underline-offset-4 transition"
        >
          Back to login
        </button>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="text-center py-4 space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
          <CheckCircle className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <p className="text-white font-semibold">Password updated</p>
          <p className="text-gray-400 text-sm mt-1">{message}</p>
          <p className="text-gray-500 text-xs mt-2">Redirecting to login…</p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-xs text-amber-300 text-left leading-relaxed">
          <strong>Important:</strong> Also update <code className="bg-white/10 px-1 rounded">ADMIN_PASS</code> in your server <code className="bg-white/10 px-1 rounded">.env</code> file to make this permanent.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center mb-2">
        <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center mx-auto mb-3">
          <KeyRound className="w-5 h-5 text-violet-400" />
        </div>
        <p className="text-white font-semibold text-sm">Set New Password</p>
        <p className="text-gray-500 text-xs mt-1">Choose a strong password for your admin account</p>
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {message}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">New Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={8}
            placeholder="Minimum 8 characters"
            className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-lg pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Repeat new password"
            className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white font-semibold rounded-lg py-2.5 text-sm transition-all"
      >
        {status === 'loading'
          ? <><Loader2 className="w-4 h-4 animate-spin" /> Updating…</>
          : 'Set New Password'
        }
      </button>

      <button type="button" onClick={onBack} className="w-full text-gray-500 hover:text-gray-300 text-xs text-center transition">
        Back to login
      </button>
    </form>
  );
}

// ─── Main Login ──────────────────────────────────────────────
export default function AdminLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get('reset');

  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await adminAPI.login(form);
      localStorage.setItem('admin_token', res.token);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearResetToken = () => {
    navigate('/admin-login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-600 shadow-lg shadow-violet-500/25 mb-4">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
          <p className="text-gray-500 text-sm mt-1">Intersites Digital</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">

          {/* Show reset form if token present in URL, else show login */}
          {resetToken ? (
            <ResetPasswordForm token={resetToken} onBack={clearResetToken} />
          ) : (
            <>
              {error && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Username</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                      required
                      autoComplete="username"
                      placeholder="admin"
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-lg pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white font-semibold rounded-lg py-2.5 text-sm transition-all shadow-lg shadow-violet-500/20 mt-2"
                >
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</> : 'Sign In'}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-gray-700 text-xs mt-6">
          Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
}
