
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user.email === 'netbiz0925@gmail.com') {
        storageService.setAuth({ username: result.user.displayName || 'Admin', role: 'admin', isLoggedIn: true });
        navigate('/admin');
      } else {
        setError('Unauthorized email. Only netbiz0925@gmail.com is allowed.');
      }
    } catch (err: any) {
      setError(err.message || 'Google Sign-In failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simplified login for demo purposes
    if (username === 'admin' && password === 'admin123') {
      storageService.setAuth({ username: 'Admin User', role: 'admin', isLoggedIn: true });
      navigate('/admin');
    } else {
      setError('Invalid credentials. Use admin/admin123');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 brand-font">The Nation's Eyes</h2>
          <p className="text-slate-500 mt-2 uppercase tracking-widest text-xs font-bold">Admin Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-red-500" 
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-red-500" 
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-slate-900 text-white p-3 rounded-lg font-bold hover:bg-slate-800 transition-colors"
          >
            Sign In with Username
          </button>
        </form>

        <div className="mt-6">
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500 font-bold">Or continue with</span>
            </div>
          </div>

          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-100 p-3 rounded-lg font-bold hover:bg-slate-50 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <>
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                <span>Sign in with Google</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
