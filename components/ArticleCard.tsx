
import React from 'react';
import { Post } from '../types';
import { Link } from 'react-router-dom';

interface ArticleCardProps {
  post: Post;
  isHero?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ post, isHero }) => {
  const postDate = new Date(post.date);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  
  const isToday = postDate.toDateString() === today.toDateString();
  const isYesterday = postDate.toDateString() === yesterday.toDateString();

  if (isHero) {
    return (
      <Link to={`/post/${post.id}`} className="group relative block w-full h-[45vh] md:h-[500px] overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl mb-6 md:mb-16 no-underline bg-black">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="absolute top-6 right-6 flex gap-2">
          {isToday && (
            <span className="px-3 py-1 bg-red-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg animate-pulse">
              Today
            </span>
          )}
          {isYesterday && (
            <span className="px-3 py-1 bg-slate-800 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
              Yesterday
            </span>
          )}
        </div>
        <div className="absolute bottom-0 left-0 p-5 md:p-10 w-full max-w-5xl">
          <span className="inline-block px-3 py-1 bg-red-600 text-white text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-2 md:mb-4 shadow-xl">
            {post.category}
          </span>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-[900] text-white mb-2 md:mb-4 group-hover:text-red-500 transition-all duration-300 tracking-tighter leading-tight drop-shadow-2xl line-clamp-2 md:line-clamp-3">
            {post.title}
          </h2>
          <p className="hidden md:block text-gray-300 text-base lg:text-lg line-clamp-2 max-w-3xl mb-6 font-light leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex items-center text-[8px] md:text-xs text-white/60 space-x-3 md:space-x-6 font-bold uppercase tracking-widest">
            <span className="flex items-center"><i className="far fa-user mr-1 text-red-500"></i> {post.author}</span>
            <span className="w-0.5 h-0.5 md:w-1 md:h-1 bg-white/20 rounded-full"></span>
            <span>{new Date(post.date).toLocaleDateString()}</span>
            <span className="hidden sm:inline-block w-1 h-1 bg-white/20 rounded-full"></span>
            <span className="hidden sm:flex items-center"><i className="far fa-clock mr-2 text-red-500"></i> {post.readTime}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/post/${post.id}`} className="group bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 hover:-translate-y-2 no-underline">
      <div className="h-48 md:h-64 overflow-hidden relative">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 flex gap-2">
           <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
            {post.category}
          </span>
          {isToday && (
            <span className="px-3 py-1 bg-red-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg animate-pulse">
              Today
            </span>
          )}
          {isYesterday && (
            <span className="px-3 py-1 bg-slate-800 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
              Yesterday
            </span>
          )}
        </div>
      </div>
      <div className="p-6 md:p-8 flex-1 flex flex-col">
        <h3 className="text-lg md:text-xl font-black mb-3 md:mb-4 group-hover:text-red-600 transition-all duration-300 line-clamp-2 leading-snug text-slate-900 uppercase">
          {post.title}
        </h3>
        <p className="text-slate-500 text-sm mb-4 md:mb-6 line-clamp-3 flex-1 leading-relaxed font-light">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 md:pt-6 border-t border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <span className="flex items-center group-hover:text-red-600 transition-colors">
            <i className="far fa-clock mr-2"></i> {post.readTime}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
