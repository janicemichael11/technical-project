import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { useAuth } from '../context/AuthContext';

// ── Icons (inline SVG) ────────────────────────────────────────────────────────
const UserIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
  </svg>
);

const LockIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const EyeIcon = ({ off }) => off ? (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
) : (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default function Register() {
  const [form, setForm]         = useState({ name: '', email: '', password: '' });
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login }               = useAuth();
  const navigate                = useNavigate();

  // ── Auth logic — unchanged ─────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authService.register(form);
      login(res.data?.data ?? res.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // Password strength indicator
  const strength = form.password.length === 0 ? 0
    : form.password.length < 6  ? 1
    : form.password.length < 10 ? 2
    : 3;
  const strengthLabel = ['', 'Weak', 'Good', 'Strong'];
  const strengthColor = ['', 'bg-red-500', 'bg-yellow-400', 'bg-emerald-400'];

  return (
    // Full-screen hero gradient — same as Home hero section
    <div className="hero-bg min-h-screen flex items-center justify-center px-4 py-10
                    relative overflow-hidden">

      {/* ── Floating blurred shapes (identical to Hero) ───────────────────── */}
      <div className="float-1 pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full
                      bg-purple-600/25 blur-3xl" />
      <div className="float-2 pointer-events-none absolute top-10 right-0 w-96 h-96 rounded-full
                      bg-blue-500/20 blur-3xl" />
      <div className="float-3 pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-72
                      rounded-full bg-pink-500/15 blur-3xl" />

      {/* ── Glassmorphism card ────────────────────────────────────────────── */}
      <div className="fade-in-up-2 relative z-10 w-full max-w-md">
        <div className="glass rounded-2xl p-8 sm:p-10 shadow-2xl">

          {/* Logo / brand mark */}
          <div className="fade-in-up-1 flex justify-center mb-6">
            <span className="flex items-center gap-2 text-2xl font-black tracking-tight">
              <img src="/logo.png" alt="PricePulse" className="h-8 w-8 rounded-xl object-contain" />
              <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-pink-400
                               bg-clip-text text-transparent">PricePulse</span>
            </span>
          </div>

          {/* Heading */}
          <div className="fade-in-up-2 text-center mb-8">
            <h1 className="text-3xl font-black text-white tracking-tight mb-1">Create account</h1>
            <p className="text-white/50 text-sm">Start comparing prices for free</p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="mb-5 flex items-center gap-2 bg-red-500/15 border border-red-500/30
                            text-red-300 text-sm rounded-xl px-4 py-3">
              <span>⚠</span> {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 fade-in-up-3">

            {/* Full name */}
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
                <UserIcon />
              </span>
              <input
                type="text" placeholder="Full name" required
                autoComplete="name"
                className="glass-input w-full rounded-xl pl-10 pr-4 py-3 text-sm"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
                <EmailIcon />
              </span>
              <input
                type="email" placeholder="Email address" required
                autoComplete="email"
                className="glass-input w-full rounded-xl pl-10 pr-4 py-3 text-sm"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
                  <LockIcon />
                </span>
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Password (min 6 chars)" required minLength={6}
                  autoComplete="new-password"
                  className="glass-input w-full rounded-xl pl-10 pr-11 py-3 text-sm"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40
                             hover:text-white/70 transition-colors"
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  <EyeIcon off={showPass} />
                </button>
              </div>

              {/* Password strength bar */}
              {form.password.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3].map((lvl) => (
                      <div
                        key={lvl}
                        className={`h-1 flex-1 rounded-full transition-all duration-300
                                    ${strength >= lvl ? strengthColor[strength] : 'bg-white/10'}`}
                      />
                    ))}
                  </div>
                  <span className={`text-xs font-semibold transition-colors
                    ${strength === 1 ? 'text-red-400'
                      : strength === 2 ? 'text-yellow-400'
                      : 'text-emerald-400'}`}>
                    {strengthLabel[strength]}
                  </span>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              className="btn-gradient w-full text-white font-bold py-3 rounded-xl text-sm
                         tracking-wide shadow-lg mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10"
                            stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Creating account…
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          {/* Switch to login */}
          <p className="fade-in-up-4 mt-6 text-center text-sm text-white/40">
            Already have an account?{' '}
            <Link to="/login"
                  className="text-violet-400 hover:text-violet-300 font-semibold
                             transition-colors hover:underline underline-offset-2">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
