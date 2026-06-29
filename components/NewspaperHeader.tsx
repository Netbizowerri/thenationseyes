
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Post } from '../types';
import { firebaseService } from '../services/firebaseService';

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
    <header className="sticky top-0 z-50 bg-[#B9080D] shadow-md border-b-2 border-[#a0070b]">
      <div className="bg-black py-1.5 overflow-hidden border-b border-white/10">
        <div className="animate-ticker-wrapper">
          <div className="flex space-x-12 items-center px-6">
            {latestPosts.length > 0 ? (
              latestPosts.map(post => (
                <Link key={post.id} to={`/post/${post.slug || post.id}`} className="text-[10px] font-black tracking-tight text-white uppercase italic hover:text-yellow-300 transition-colors no-underline whitespace-nowrap">
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
                <Link key={`clone-${post.id}`} to={`/post/${post.slug || post.id}`} className="text-[10px] font-black tracking-tight text-white uppercase italic hover:text-yellow-300 transition-colors no-underline whitespace-nowrap">
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
        <Link to="/" className="block no-underline">
          <img
            src="https://i.ibb.co/5Wn1FsYc/THE-NATION-S-EYES-18.jpg"
            alt="The Nation's Eyes"
            className="h-12 md:h-14 lg:h-[4.5rem] w-auto drop-shadow-lg"
          />
        </Link>

        <div className="flex items-center space-x-3 md:space-x-6">
          <div onClick={onSearchOpen} className="hidden sm:flex items-center px-4 py-2 border border-white/40 rounded-full text-white/90 hover:bg-white/10 hover:border-white/70 transition-all cursor-pointer group active:scale-95" role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') onSearchOpen(); }}>
            <i className="fas fa-search mr-2 text-white/80"></i>
            <span className="text-sm font-black uppercase tracking-tight">Search</span>
          </div>

          <div className="hidden lg:block w-[1px] h-8 bg-white/20 mx-1"></div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <p className="text-[8px] font-black text-white/50 uppercase tracking-widest leading-none mb-1">EDITION</p>
              <p className="text-[9px] font-black text-white/90 uppercase leading-none">{dateStr}</p>
            </div>
            <button
              onClick={onMenuOpen}
              className="text-white p-2 text-2xl md:text-3xl hover:scale-110 transition-transform active:scale-90"
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
