
import React, { useState, useEffect } from 'react';
import { Post, Category } from '../types';
import ArticleCard from '../components/ArticleCard';
import HeroSlider from '../components/HeroSlider';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { firebaseService } from '../services/firebaseService';

const CompactArticleCard: React.FC<{ post: Post }> = ({ post }) => (
  <Link to={`/post/${post.id}`} className="flex group gap-4 items-start no-underline">
    <div className="w-24 h-20 md:w-28 md:h-24 flex-shrink-0 overflow-hidden rounded-md border border-slate-100">
      <img 
        src={post.imageUrl} 
        alt={post.title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-[13px] md:text-[15px] font-black leading-tight text-slate-900 group-hover:text-red-600 transition-colors line-clamp-3 mb-2 uppercase tracking-tight">
        {post.title}
      </h4>
      <div className="flex items-center text-[10px] font-bold text-red-600 uppercase tracking-widest">
        <i className="far fa-calendar-alt mr-1.5"></i>
        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</span>
        <span className="mx-2 text-slate-300">|</span>
      </div>
    </div>
  </Link>
);

const Home: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    console.log('Home component mounted, subscribing to posts...');
    const unsubscribe = firebaseService.subscribeToPosts((allPosts) => {
      console.log('Received posts from Firebase:', allPosts.length);
      if (allPosts.length === 0) {
        console.warn('No posts received from Firebase. Checking if migration is needed...');
      }
      const publishedPosts = allPosts
        .filter(p => !p.status || p.status === 'published')
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      console.log('Filtered published posts:', publishedPosts.length);
      if (allPosts.length > 0 && publishedPosts.length === 0) {
        console.warn('Posts exist but none are published. First post status:', allPosts[0].status);
      }
      setPosts(publishedPosts);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (categoryName) {
      setFilter(categoryName);
    } else {
      setFilter('All');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categoryName]);

  const handleFilterClick = (cat: string) => {
    if (cat === 'All') {
      navigate('/');
    } else {
      navigate(`/category/${cat}`);
    }
  };

  const filteredPosts = filter === 'All' 
    ? posts 
    : posts.filter(p => p.category === filter);

  const heroPosts = posts.slice(0, 5);
  const remainingPosts = filter === 'All' ? posts : filteredPosts;
  const politicsPosts = posts.filter(p => p.category === Category.POLITICS).slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-16">
      {/* Hero Slider Section - Hidden on category archive pages */}
      {filter === 'All' && heroPosts.length > 0 && !categoryName && (
        <div className="animate-in fade-in zoom-in-95 duration-700">
          <HeroSlider posts={heroPosts} />
        </div>
      )}

      {/* Trending Feed Section */}
      <div className="mb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-10">
           <h2 className="text-xl md:text-2xl font-[900] tracking-tight text-slate-900 uppercase italic whitespace-nowrap">
            {filter === 'All' ? 'Trending' : filter} <span className="text-red-600">Feed</span>
           </h2>
           
           {/* Horizontal Scroll for Categories - Optimized for Mobile */}
           <div className="relative w-full md:w-auto overflow-hidden">
             {/* Left Shadow Hint (Only visible when scrolled) */}
             <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none md:hidden opacity-50"></div>
             
             <div className="flex flex-nowrap items-center gap-x-2 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth touch-pan-x">
              {['All', ...Object.values(Category)].map(cat => (
                <button
                  key={cat}
                  onClick={() => handleFilterClick(cat)}
                  className={`px-5 py-2 text-[9px] md:text-[11px] font-black rounded-full transition-all duration-300 uppercase tracking-widest no-underline whitespace-nowrap active:scale-90 border-2 shadow-sm ${
                    filter === cat 
                      ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-200' 
                      : 'text-slate-600 bg-white border-slate-100 hover:border-red-600 hover:text-red-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            {/* Right Shadow Hint (Visible to show there's more content) */}
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none md:hidden"></div>
          </div>
        </div>

        {/* Grid for Trending Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {remainingPosts.map((post, index) => (
            <div key={post.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both" style={{ animationDelay: `${index * 100}ms` }}>
              <ArticleCard post={post} />
            </div>
          ))}
        </div>
      </div>

      {/* Politics Section - Only on Home page */}
      {filter === 'All' && !categoryName && politicsPosts.length > 0 && (
        <section className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase">POLITICS</h2>
            <div className="h-1 w-full bg-red-600 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
            {politicsPosts.map(post => (
              <CompactArticleCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {remainingPosts.length === 0 && (
        <div className="text-center py-32 bg-white rounded-3xl shadow-sm border border-slate-100 animate-in fade-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-newspaper text-3xl text-slate-200"></i>
          </div>
          <h3 className="text-2xl font-black text-slate-900 uppercase tracking-widest mb-2">Blank Edition</h3>
          <p className="text-slate-400">Our reporters are currently working on stories for this section.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
