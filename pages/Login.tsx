
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';

const ADMIN_EMAIL = 'netbiz0925@gmail.com';

const Login: React.FC = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user.email === ADMIN_EMAIL && result.user.emailVerified) {
        navigate('/admin');
      } else {
        setError('Unauthorized account. Admin access is restricted.');
        await auth.signOut();
      }
    } catch (err: any) {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 brand-font">The Nation's Eyes</h2>
          <p className="text-slate-500 mt-2 uppercase tracking-widest text-xs font-bold">Admin Portal</p>
        </div>

        {error && (
          <div className="p-3 mb-6 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-100 p-4 rounded-lg font-bold hover:bg-slate-50 transition-all active:scale-95 disabled:opacity-50"
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

        <p className="mt-6 text-center text-xs text-slate-400">Admin access requires an authorized Google account.</p>
      </div>
    </div>
  );
};

export default Login;
