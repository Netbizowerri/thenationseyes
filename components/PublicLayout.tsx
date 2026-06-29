
import { useState, useEffect, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import NewspaperHeader from './NewspaperHeader';
import MobileMenuTray from './MobileMenuTray';
import SearchOverlay from './SearchOverlay';
import EyeLogo from './EyeLogo';

export default function PublicLayout({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement))) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NewspaperHeader onMenuOpen={() => setIsMenuOpen(true)} onSearchOpen={() => setIsSearchOpen(true)} />
      <MobileMenuTray isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onSearchOpen={() => setIsSearchOpen(true)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
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
          <div className="flex justify-center gap-x-6 gap-y-2 mb-10 flex-wrap">
            <Link to="/about" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-red-600 transition-colors no-underline">About</Link>
            <span className="text-slate-800">|</span>
            <Link to="/privacy-policy" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-red-600 transition-colors no-underline">Privacy Policy</Link>
            <span className="text-slate-800">|</span>
            <Link to="/terms-of-service" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-red-600 transition-colors no-underline">Terms of Service</Link>
            <span className="text-slate-800">|</span>
            <Link to="/disclaimer" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-red-600 transition-colors no-underline">Disclaimer</Link>
            <span className="text-slate-800">|</span>
            <Link to="/" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-red-600 transition-colors no-underline">Home</Link>
          </div>
          <div className="flex justify-center space-x-8 md:space-x-10 mb-12">
            <a href="https://web.facebook.com/noel.chiagorom" target="_blank" rel="noopener noreferrer" className="text-2xl md:text-3xl text-slate-500 hover:text-white transition-all transform hover:-translate-y-1" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-2xl md:text-3xl text-slate-500 hover:text-white transition-all transform hover:-translate-y-1" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-2xl md:text-3xl text-slate-500 hover:text-white transition-all transform hover:-translate-y-1" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          </div>
          <div className="w-16 h-1 bg-red-700 mx-auto mb-10 rounded-full"></div>
          <p className="text-slate-600 text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold px-4">© 2026 The Nation's Eyes. All rights reserved. Managed by Noel Chiagorom.</p>
        </div>
      </footer>
    </div>
  );
}
