
import { useState, useEffect, ReactNode } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { onAuthStateChanged, User as FirebaseUser, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAIL || 'netbiz0925@gmail.com')
  .split(',').map(e => e.trim());

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f1f5f9]">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-3xl text-slate-400"></i>
          <p className="mt-4 text-slate-500 text-sm font-bold uppercase tracking-widest">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!user || !user.email || !ADMIN_EMAILS.includes(user.email)) {
    return <Navigate to="/adminlogin" state={{ from: location }} replace />;
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      if (import.meta.env.DEV) console.error('Logout error:', err);
    }
  };

  const navLinks = [
    { to: '/admin', label: 'Overview', icon: 'fa-chart-pie' },
    { to: '/admin/posts', label: 'Manage Posts', icon: 'fa-newspaper' },
    { to: '/admin/comments', label: 'Comments', icon: 'fa-comments' },
  ];

  return (
    <div className="min-h-screen flex bg-[#f1f5f9]">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`w-72 bg-slate-950 text-white flex flex-col fixed h-full shadow-2xl z-50 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-8 border-b border-white/5 bg-slate-950">
          <div className="flex items-center justify-between">
            <Link to="/" className="block group no-underline">
              <h1 className="text-xl font-black italic tracking-tighter group-hover:text-red-500 transition-colors">THE NATION'S EYES</h1>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white transition-colors p-1"
              aria-label="Close sidebar"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>
          <p className="text-[10px] text-red-500 uppercase tracking-[0.3em] font-bold mt-1">Admin Dashboard</p>
        </div>
        <nav className="flex-grow p-6 space-y-3 mt-4" aria-label="Admin navigation">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 font-bold text-sm no-underline ${location.pathname === link.to ? 'bg-red-600 text-white shadow-xl shadow-red-900/50 scale-105' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}
            >
              <i className={`fas ${link.icon} w-5`}></i>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-6 border-t border-white/5 bg-slate-950">
          <div className="flex items-center space-x-4 mb-8 p-3 bg-white/5 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-red-600 to-red-400 flex items-center justify-center font-bold text-lg border-2 border-white/10 shadow-lg">
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold truncate text-white">{user.displayName || user.email}</p>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Admin Access</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-3 bg-white/5 text-slate-400 p-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-300 text-xs font-bold border border-white/5"
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-grow p-4 lg:p-12 lg:ml-72 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden mb-4 p-3 bg-slate-950 text-white rounded-xl hover:bg-slate-800 transition-colors"
            aria-label="Open sidebar"
          >
            <i className="fas fa-bars text-lg"></i>
          </button>
          {children}
        </div>
      </main>
    </div>
  );
}
