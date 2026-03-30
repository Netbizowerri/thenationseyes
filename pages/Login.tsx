
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const ADMIN_EMAIL = 'netbiz0925@gmail.com';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signInWithEmailAndPassword(auth, email.trim(), password);
      if (result.user.email === ADMIN_EMAIL) {
        navigate('/admin');
      } else {
        setError('Unauthorized account. Admin access is restricted.');
        await auth.signOut();
      }
    } catch (err: any) {
      const code = err?.code || '';
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please try again.');
      } else if (code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please wait a moment and try again.');
      } else if (code === 'auth/network-request-failed') {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError('Authentication failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50">
      <Helmet>
        <title>Admin Login | The Nation's Eyes</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-2xl shadow-xl shadow-red-200 mb-6">
            <i className="fas fa-eye text-white text-2xl"></i>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
            The Nation's Eyes
          </h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2">
            Admin Portal
          </p>
        </div>

        {/* Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Sign In</h2>

          {error && (
            <div className="p-4 mb-6 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-start gap-3">
              <i className="fas fa-exclamation-circle mt-0.5 flex-shrink-0"></i>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="admin-email" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <div className="relative">
                <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="admin@example.com"
                  className="w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-slate-800 text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-slate-800 text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              id="admin-login-btn"
              disabled={loading || !email || !password}
              className="w-full flex items-center justify-center gap-3 bg-red-600 text-white p-4 rounded-xl font-bold text-sm hover:bg-red-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-200 mt-2"
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Signing in...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i>
                  Sign In to Admin
                </>
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Access restricted to authorized administrators only.
        </p>
      </div>
    </div>
  );
};

export default Login;
