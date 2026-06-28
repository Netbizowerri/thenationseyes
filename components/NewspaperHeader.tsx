
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Post } from '../types';
import { firebaseService } from '../services/firebaseService';
import EyeLogo from './EyeLogo';

interface NewspaperHeaderProps {
  onMenuOpen: () => void;
  onSearchOpen: () => void;
}

export default function NewspaperHeader({ onMenuOpen, onSearchOpen }: NewspaperHeaderProps) {
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
            <p className="sm:hidden text-[7px] font-bold text-slate-400 uppercase tracking-[0.2em] -mt-1">
              VOICE OF THE NATION
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 md:space-x-6">
          <div onClick={onSearchOpen} className="hidden sm:flex items-center px-4 py-2 border border-red-600 rounded-full text-red-600 hover:bg-red-50 transition-colors cursor-pointer group active:scale-95" role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') onSearchOpen(); }}>
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
}
