
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import AdminDashboard from './pages/AdminDashboard';
import AdminPosts from './pages/AdminPosts';
import AdminComments from './pages/AdminComments';
import Login from './pages/Login';
import About from './pages/About';
import ScrollToTop from './components/ScrollToTop';
import { firebaseService } from './services/firebaseService';
import { auth } from './firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { Post, Category } from './types';

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [error, setError] = useState<Error | null>(null);

  if (error) {
    return (
      <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
        <h1 style={{ color: '#cc2121' }}>Something went wrong</h1>
        <pre style={{ background: '#f1f5f9', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '13px' }}>
          {error.message}
        </pre>
        <button onClick={() => setError(null)} style={{ marginTop: '16px', padding: '8px 16px', cursor: 'pointer' }}>
          Try Again
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

const EyeLogo = () => (
  <Link to="/" className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center select-none cursor-pointer block group transition-transform duration-300 hover:scale-110">
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md overflow-visible">
      <path 
        d="M10,50 Q25,20 50,20 T90,50 Q75,80 50,80 T10,50" 
        fill="white" 
        stroke="black" 
        strokeWidth="4" 
        className="group-hover:stroke-red-600 transition-colors duration-300"
      />
      <circle cx="50" cy="50" r="18" fill="black" />
      <g transform="translate(42, 42) scale(0.16)">
        <path 
          d="M10,40 C10,35 15,30 20,25 C25,20 30,22 40,20 C50,18 60,15 70,20 C80,25 85,35 90,45 C95,55 85,75 75,85 C65,95 50,90 40,88 C30,86 15,80 10,65 Z" 
          fill="white" 
        />
        <circle cx="55" cy="45" r="8" fill="#15803d" />
      </g>
    </svg>
  </Link>
);

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case Category.POLITICS: return <i className="fas fa-gavel"></i>;
    case Category.ECONOMY: return <i className="fas fa-chart-line"></i>;
    case Category.SOCIETY: return <i className="fas fa-users"></i>;
    case Category.EDITORIAL: return <i className="fas fa-pen-nib"></i>;
    case Category.WORLD: return <i className="fas fa-globe-africa"></i>;
    case Category.ENTERTAINMENT: return <i className="fas fa-clapperboard"></i>;
    case Category.SPORTS: return <i className="fas fa-trophy"></i>;
    default: return <i className="fas fa-hashtag"></i>;
  }
};

const MobileMenuTray = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const categories = Object.values(Category);
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Menu Tray */}
      <div className={`fixed top-0 right-0 w-[85%] max-w-sm h-full bg-white z-[110] shadow-2xl transform transition-transform duration-500 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-200">
               <i className="fas fa-eye"></i>
            </div>
            <span className="font-black text-slate-900 tracking-tighter text-lg uppercase">The Nation's Eyes</span>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-100 text-slate-400 hover:text-red-600 hover:border-red-100 transition-all active:scale-90">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6 space-y-8 no-scrollbar">
          {/* Search Box */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search news..." 
              className="w-full bg-slate-100 border-none p-4 pl-12 rounded-2xl text-xs font-bold uppercase tracking-widest focus:ring-2 focus:ring-red-600 outline-none"
            />
            <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"></i>
          </div>

          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Categories</p>
            <div className="grid grid-cols-1 gap-2">
              <Link to="/" onClick={onClose} className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-red-50 group transition-all no-underline">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-red-600 group-hover:shadow-md transition-all">
                  <i className="fas fa-home"></i>
                </div>
                <span className="font-bold text-slate-700 group-hover:text-red-600 uppercase tracking-widest text-sm">Main Feed</span>
              </Link>
              <Link to="/about" onClick={onClose} className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-red-50 group transition-all no-underline">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-red-600 group-hover:shadow-md transition-all">
                  <i className="fas fa-user-tie"></i>
                </div>
                <span className="font-bold text-slate-700 group-hover:text-red-600 uppercase tracking-widest text-sm">About The Publisher</span>
              </Link>
              {categories.map(cat => (
                <Link key={cat} to={`/category/${cat}`} onClick={onClose} className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-red-50 group transition-all no-underline">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-red-600 group-hover:shadow-md transition-all">
                    <CategoryIcon category={cat} />
                  </div>
                  <span className="font-bold text-slate-700 group-hover:text-red-600 uppercase tracking-widest text-sm">{cat}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-slate-100 bg-slate-50">
          <div className="flex justify-center space-x-8 mb-4">
             <a href="https://web.facebook.com/noel.chiagorom" target="_blank" rel="noopener noreferrer" className="text-xl text-slate-400 hover:text-red-600 transition-colors"><i className="fab fa-facebook-f"></i></a>
             <a href="#" className="text-xl text-slate-400 hover:text-red-600 transition-colors"><i className="fab fa-twitter"></i></a>
             <a href="#" className="text-xl text-slate-400 hover:text-red-600 transition-colors"><i className="fab fa-instagram"></i></a>
          </div>
          <p className="text-[9px] text-center font-black text-slate-400 uppercase tracking-[0.2em]">VOICE OF THE NATION</p>
        </div>
      </div>
    </>
  );
};

const NewspaperHeader = ({ onMenuOpen }: { onMenuOpen: () => void }) => {
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const location = useLocation();
  
  const dateStr = new Date().toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });

  useEffect(() => {
    const unsubscribe = firebaseService.subscribeToPosts((allPosts) => {
      const posts = allPosts
        .filter(p => p.status === 'published')
        .slice(0, 10);
      setLatestPosts(posts);
    });
    return () => unsubscribe();
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200">
      {/* Dynamic Ticker Bar (Top Headlines Carousal) */}
      <div className="bg-[#cc2121] py-1.5 overflow-hidden border-b border-black/10">
        <div className="animate-ticker-wrapper">
          <div className="flex space-x-12 items-center px-6">
            {latestPosts.length > 0 ? (
              latestPosts.map(post => (
                <Link key={post.id} to={`/post/${post.id}`} className="text-[10px] font-black tracking-tight text-white uppercase italic hover:text-yellow-300 transition-colors no-underline whitespace-nowrap">
                  BREAKING: {post.title} <span className="mx-2 text-white/40 font-normal">|</span> {post.category}
                </Link>
              ))
            ) : (
              <span className="text-[10px] font-black tracking-tight text-white uppercase italic whitespace-nowrap px-6">
                WELCOME TO THE NATION'S EYES - SEEING BEYOND THE HEADLINES - TELLING THE TRUTH OTHERS WON'T
              </span>
            )}
          </div>
          {/* Clone for infinite loop */}
          <div className="flex space-x-12 items-center px-6" aria-hidden="true">
            {latestPosts.length > 0 ? (
              latestPosts.map(post => (
                <Link key={`clone-${post.id}`} to={`/post/${post.id}`} className="text-[10px] font-black tracking-tight text-white uppercase italic hover:text-yellow-300 transition-colors no-underline whitespace-nowrap">
                  BREAKING: {post.title} <span className="mx-2 text-white/40 font-normal">|</span> {post.category}
                </Link>
              ))
            ) : (
              <span className="text-[10px] font-black tracking-tight text-white uppercase italic whitespace-nowrap px-6">
                WELCOME TO THE NATION'S EYES - SEEING BEYOND THE HEADLINES - TELLING THE TRUTH OTHERS WON'T
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Horizontal Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 md:py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 md:space-x-4">
          <EyeLogo />
          <div className="flex flex-col">
            <Link to="/" className="block no-underline">
              <h1 className="text-red-600 text-xl md:text-3xl lg:text-4xl font-[900] leading-none tracking-tighter select-none hover:opacity-80 transition-opacity uppercase">
                THE NATION'S EYES
              </h1>
            </Link>
            <div className="hidden sm:flex items-center space-x-2">
              <div className="h-[2px] w-4 bg-red-600"></div>
              <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                VOICE OF THE NATION
              </p>
              <div className="h-[2px] w-4 bg-red-600"></div>
            </div>
            {/* Mobile subtitle - extremely compact */}
            <p className="sm:hidden text-[7px] font-bold text-slate-400 uppercase tracking-[0.2em] -mt-1">
              VOICE OF THE NATION
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 md:space-x-6">
          <div className="hidden sm:flex items-center px-4 py-2 border border-red-600 rounded-full text-red-600 hover:bg-red-50 transition-colors cursor-pointer group active:scale-95">
            <i className="fas fa-search mr-2"></i>
            <span className="text-sm font-black uppercase tracking-tight">Search</span>
          </div>
          
          <div className="hidden lg:block w-[1px] h-8 bg-slate-200 mx-1"></div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">EDITION</p>
              <p className="text-[9px] font-black text-slate-900 uppercase leading-none">{dateStr}</p>
            </div>
            <button 
              onClick={onMenuOpen}
              className="text-red-600 p-2 text-2xl md:text-3xl hover:scale-110 transition-transform active:scale-90"
              aria-label="Open Menu"
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NewspaperHeader onMenuOpen={() => setIsMenuOpen(true)} />
      <MobileMenuTray isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <main className="flex-grow animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {children}
      </main>
      <footer className="bg-slate-950 text-white py-20 mt-12 border-t-8 border-red-700 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8">
             <EyeLogo />
          </div>
          <Link to="/" className="inline-block hover:opacity-90 transition-opacity no-underline">
            <h2 className="text-3xl md:text-4xl font-[900] mb-4 tracking-tighter text-white">THE NATION'S EYES</h2>
          </Link>
          <p className="text-slate-400 mb-6 max-w-md mx-auto italic text-base md:text-lg font-light">"Unveiling truths, shaping perspectives."</p>
          <div className="flex justify-center space-x-6 mb-10">
            <Link to="/about" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-red-600 transition-colors no-underline">About The Publisher</Link>
            <span className="text-slate-800">|</span>
            <Link to="/" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-red-600 transition-colors no-underline">Home</Link>
          </div>
          <div className="flex justify-center space-x-8 md:space-x-10 mb-12">
            <a href="https://web.facebook.com/noel.chiagorom" target="_blank" rel="noopener noreferrer" className="text-2xl md:text-3xl text-slate-500 hover:text-white transition-all transform hover:-translate-y-1"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-2xl md:text-3xl text-slate-500 hover:text-white transition-all transform hover:-translate-y-1"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-2xl md:text-3xl text-slate-500 hover:text-white transition-all transform hover:-translate-y-1"><i className="fab fa-instagram"></i></a>
          </div>
          <div className="w-16 h-1 bg-red-700 mx-auto mb-10 rounded-full"></div>
          <p className="text-slate-600 text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold px-4">© 2026 The Nation's Eyes. All rights reserved. Managed by Noel Chiagorom.</p>
        </div>
      </footer>
    </div>
  );
};

const ADMIN_EMAIL = 'netbiz0925@gmail.com';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

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

  if (!user || user.email !== ADMIN_EMAIL) {
    return <Navigate to="/adminlogin" state={{ from: location }} replace />;
  }

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.error('Firebase sign out error:', err);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f1f5f9]">
      <aside className="w-72 bg-slate-950 text-white flex flex-col fixed h-full shadow-2xl z-50">
        <div className="p-8 border-b border-white/5 bg-slate-950">
          <Link to="/" className="block group no-underline">
            <h1 className="text-xl font-black italic tracking-tighter group-hover:text-red-500 transition-colors">THE NATION'S EYES</h1>
          </Link>
          <p className="text-[10px] text-red-500 uppercase tracking-[0.3em] font-bold mt-1">Admin Dashboard</p>
        </div>
        <nav className="flex-grow p-6 space-y-3 mt-4">
          <Link to="/admin" className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 font-bold text-sm no-underline ${location.pathname === '/admin' ? 'bg-red-600 text-white shadow-xl shadow-red-900/50 scale-105' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}>
            <i className="fas fa-chart-pie w-5"></i>
            <span>Overview</span>
          </Link>
          <Link to="/admin/posts" className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 font-bold text-sm no-underline ${location.pathname === '/admin/posts' ? 'bg-red-600 text-white shadow-xl shadow-red-900/50 scale-105' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}>
            <i className="fas fa-newspaper w-5"></i>
            <span>Manage Posts</span>
          </Link>
          <Link to="/admin/comments" className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 font-bold text-sm no-underline ${location.pathname === '/admin/comments' ? 'bg-red-600 text-white shadow-xl shadow-red-900/50 scale-105' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}>
            <i className="fas fa-comments w-5"></i>
            <span>Comments</span>
          </Link>
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

      <main className="ml-72 flex-grow p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  // Connection test removed — only run manually in dev if needed

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/category/:categoryName" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/post/:id" element={<PublicLayout><ArticleDetail /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/adminlogin" element={<Login />} />
            <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
            <Route path="/admin/posts" element={<AdminLayout><AdminPosts /></AdminLayout>} />
            <Route path="/admin/comments" element={<AdminLayout><AdminComments /></AdminLayout>} />
            <Route path="/login" element={<Navigate to="/adminlogin" replace />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
};

export default App;
