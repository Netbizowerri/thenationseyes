import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';
import { firebaseService } from '../services/firebaseService';
import { searchPosts, extractKeywords } from '../utils/search';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isOpen) {
      const unsubscribe = firebaseService.subscribeToPosts((posts) => {
        setAllPosts(posts.filter(p => p.status === 'published'));
      });
      setTimeout(() => inputRef.current?.focus(), 100);
      return () => unsubscribe();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  const performSearch = useCallback((searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const searchResults = searchPosts(allPosts, searchQuery);
    setResults(searchResults.slice(0, 12));
    setSelectedIndex(-1);
    setIsSearching(false);
  }, [allPosts]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => performSearch(value), 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    }
    if (e.key === 'Enter' && selectedIndex >= 0 && results[selectedIndex]) {
      window.location.href = `/post/${results[selectedIndex].id}`;
      onClose();
    }
  };

  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const items = resultsRef.current.children;
      if (items[selectedIndex]) {
        (items[selectedIndex] as HTMLElement).scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  const highlightMatch = (text: string, keywords: string[]) => {
    if (keywords.length === 0) return text;
    const pattern = keywords
      .map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|');
    const regex = new RegExp(`(${pattern})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part)
        ? <mark key={i} className="bg-yellow-200 text-slate-900 rounded px-0.5 font-bold">{part}</mark>
        : part
    );
  };

  const keywords = extractKeywords(query);
  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col" onKeyDown={handleKeyDown}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Search Panel */}
      <div className="relative w-full max-w-3xl mx-auto mt-[8vh] animate-in fade-in slide-in-from-top-8 duration-400">
        {/* Search Input */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-black/20 overflow-hidden border border-slate-200">
          <div className="flex items-center px-6 py-5 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-red-50 flex items-center justify-center mr-4 flex-shrink-0">
              <i className="fas fa-search text-red-600 text-lg"></i>
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search news, topics, authors..."
              className="flex-1 text-lg md:text-xl font-bold text-slate-900 placeholder:text-slate-300 outline-none bg-transparent tracking-tight"
              autoComplete="off"
              spellCheck={false}
            />
            {query && (
              <button
                onClick={() => { setQuery(''); setResults([]); inputRef.current?.focus(); }}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all ml-2 flex-shrink-0"
              >
                <i className="fas fa-times text-sm"></i>
              </button>
            )}
            <button
              onClick={onClose}
              className="ml-3 px-4 py-2 rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all text-xs font-black uppercase tracking-widest flex-shrink-0"
            >
              ESC
            </button>
          </div>

          {/* Keywords Bar */}
          {keywords.length > 0 && (
            <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">Keywords:</span>
              {keywords.map((kw, i) => (
                <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-600 shadow-sm">
                  {kw}
                </span>
              ))}
              <span className="ml-auto text-[10px] font-bold text-slate-400">
                {results.length} result{results.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}

          {/* Results */}
          {query.length >= 2 && (
            <div ref={resultsRef} className="max-h-[55vh] overflow-y-auto no-scrollbar">
              {isSearching ? (
                <div className="flex items-center justify-center py-16">
                  <i className="fas fa-spinner fa-spin text-2xl text-slate-300"></i>
                </div>
              ) : results.length > 0 ? (
                results.map((post, index) => (
                  <Link
                    key={post.id}
                    to={`/post/${post.id}`}
                    onClick={onClose}
                    className={`flex items-start gap-4 px-6 py-4 transition-all duration-200 no-underline border-b border-slate-50 last:border-0 ${
                      selectedIndex === index
                        ? 'bg-red-50'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-16 h-16 md:w-20 md:h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-slate-100">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[9px] font-black uppercase tracking-widest rounded-full">
                          {post.category}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">
                          {timeAgo(post.date)}
                        </span>
                      </div>
                      <h4 className="text-sm md:text-[15px] font-black text-slate-900 leading-snug line-clamp-2 mb-1 uppercase tracking-tight">
                        {highlightMatch(post.title, keywords)}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1 font-light">
                        {highlightMatch(post.excerpt, keywords)}
                      </p>
                    </div>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-red-500 mt-2">
                      <i className="fas fa-arrow-right text-xs"></i>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-6">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <i className="fas fa-search text-2xl text-slate-200"></i>
                  </div>
                  <p className="text-base font-black text-slate-900 uppercase tracking-widest mb-1">No Results Found</p>
                  <p className="text-sm text-slate-400 text-center max-w-xs">
                    No articles match "<span className="font-bold text-slate-600">{query}</span>". Try different keywords.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {query.length < 2 && (
            <div className="px-6 py-10">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Trending Searches</p>
              <div className="flex flex-wrap gap-2">
                {['Politics', 'Economy', 'Elections', 'APC', 'PDP', 'Tinubu', 'Security', 'Education', 'Health'].map(term => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term);
                      performSearch(term);
                    }}
                    className="px-4 py-2 bg-slate-50 hover:bg-red-50 hover:text-red-600 border border-slate-100 hover:border-red-200 rounded-full text-xs font-bold text-slate-600 transition-all duration-200 uppercase tracking-wide"
                  >
                    <i className="fas fa-fire text-[10px] mr-1.5 text-orange-400"></i>
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search Tips */}
        <div className="flex items-center justify-center gap-6 mt-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">
          <span><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/60 mr-1">↑↓</kbd> Navigate</span>
          <span><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/60 mr-1">↵</kbd> Open</span>
          <span><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/60 mr-1">ESC</kbd> Close</span>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
