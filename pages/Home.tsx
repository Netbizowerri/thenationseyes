
import React, { useState, useEffect } from 'react';
import { Post, Category } from '../types';
import ArticleCard from '../components/ArticleCard';
import HeroSlider from '../components/HeroSlider';
import SEO from '../components/SEO';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { firebaseService } from '../services/firebaseService';

const CompactArticleCard: React.FC<{ post: Post }> = ({ post }) => (
  <Link to={`/post/${post.id}`} className="flex group gap-4 items-start no-underline">
    <div className="w-24 h-20 md:w-28 md:h-24 flex-shrink-0 overflow-hidden rounded-md border border-slate-100">
      <img 
        src={post.imageUrl} 
        alt={post.title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        width={112}
        height={96}
        loading="lazy"
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
    const unsubscribe = firebaseService.subscribeToPosts(setPosts);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (categoryName) {
      setFilter(categoryName);
    } else {
      setFilter('All');
    }
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
  const topSix = posts.slice(0, 6);
  const remainingPosts = filter === 'All' ? posts : filteredPosts;

  const usedIds = new Set<string>();

  const economySocietyPosts = posts
    .filter(p => !usedIds.has(p.id) && (p.category === Category.ECONOMY || p.category === Category.SOCIETY))
    .slice(0, 6);

  economySocietyPosts.forEach(p => usedIds.add(p.id));

  const politicsPosts = posts
    .filter(p => !usedIds.has(p.id) && p.category === Category.POLITICS)
    .slice(0, 9);

  politicsPosts.forEach(p => usedIds.add(p.id));

  const editorialPosts = posts
    .filter(p => !usedIds.has(p.id) && p.category === Category.EDITORIAL)
    .slice(0, 6);

  editorialPosts.forEach(p => usedIds.add(p.id));

  const otherPosts = posts.filter(p => !usedIds.has(p.id));

  const isCategory = !!categoryName;
  const seoTitle = isCategory ? `${categoryName} News & Analysis` : 'Nigerian News, Politics & Editorial Analysis';
  const seoDesc = isCategory
    ? `Latest ${categoryName} news, analysis, and opinion from The Nation's Eyes. In-depth reporting on Nigerian ${categoryName.toLowerCase()} matters.`
    : "The Nation's Eyes delivers in-depth Nigerian news, political analysis, and editorial commentary. Unveiling truths, shaping perspectives.";

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: "The Nation's Eyes",
    url: 'https://thenationseyes.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://i.ibb.co/5Wn1FsYc/THE-NATION-S-EYES-18.jpg',
    },
    foundingDate: '2025',
    description: 'Independent Nigerian newspaper delivering fearless reporting and editorial commentary.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NG',
    },
    sameAs: [
      'https://web.facebook.com/noel.chiagorom',
    ],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: "The Nation's Eyes",
    url: 'https://thenationseyes.com',
    description: "Nigerian news, politics, and editorial analysis.",
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://thenationseyes.com/?s={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@id': 'https://thenationseyes.com/#organization',
    },
  };

  const showSections = filter === 'All' && !categoryName;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-16">
      <SEO
        title={seoTitle}
        description={seoDesc}
        path={isCategory ? `/category/${categoryName}` : '/'}
        type="website"
        image="https://i.ibb.co/5Wn1FsYc/THE-NATION-S-EYES-18.jpg"
        jsonLd={[organizationJsonLd, websiteJsonLd]}
      />

      {/* Hero Slider */}
      {showSections && heroPosts.length > 0 && (
        <div className="animate-in fade-in zoom-in-95 duration-700">
          <HeroSlider posts={heroPosts} />
        </div>
      )}

      {/* Category Filter Bar */}
      <div className={`mb-10 ${showSections ? 'mt-10' : ''}`}>
        <div className="relative w-full overflow-hidden">
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
        </div>
      </div>

      {/* TRENDING — First 6 Recent Posts */}
      {showSections && topSix.length > 0 && (
        <section className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase">Trending <span className="text-red-600">Feed</span></h2>
            <div className="h-1 w-full bg-red-600 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {topSix.map((post, index) => (
              <div key={post.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both" style={{ animationDelay: `${index * 100}ms` }}>
                <ArticleCard post={post} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* AD — Leaderboard */}
      {showSections && (
        <div className="mb-24 flex justify-center animate-in fade-in zoom-in-110 duration-700">
          <a href="https://wa.link/9kt28q" target="_blank" rel="noopener noreferrer" className="block">
            <img
              src="https://i.ibb.co/fYZ15Ccq/GROW-YOUR-BUSINESS.jpg"
              alt="Advertisement"
              className="w-full max-w-[728px] h-auto rounded-xl shadow-sm border border-slate-200 hover:opacity-90 transition-opacity"
            />
          </a>
        </div>
      )}

      {/* ECONOMY / SOCIETY */}
      {showSections && economySocietyPosts.length > 0 && (
        <section className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase">Economy & <span className="text-red-600">Society</span></h2>
            <div className="h-1 w-full bg-amber-500 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {economySocietyPosts.map((post, index) => (
              <div key={post.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both" style={{ animationDelay: `${index * 100}ms` }}>
                <ArticleCard post={post} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* POLITICS */}
      {showSections && politicsPosts.length > 0 && (
        <section className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase">Politics</h2>
            <div className="h-1 w-full bg-red-600 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
            {politicsPosts.map(post => (
              <CompactArticleCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* EDITORIAL */}
      {showSections && editorialPosts.length > 0 && (
        <section className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase">Editorial</h2>
            <div className="h-1 w-full bg-blue-600 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
            {editorialPosts.map(post => (
              <CompactArticleCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* AD — Medium Rectangle (×2) */}
      {showSections && (
        <div className="mb-24 flex flex-col md:flex-row items-center justify-center gap-6">
          <a href="https://wa.link/9kt28q" target="_blank" rel="noopener noreferrer" className="block">
            <img
              src="https://i.ibb.co/zTYymBpw/734367459-986961427516612-7885157747021528274-n.jpg"
              alt="Advertisement"
              className="w-full max-w-[300px] h-auto rounded-xl shadow-sm border border-slate-200 hover:opacity-90 transition-opacity"
            />
          </a>
          <a href="https://wa.link/9kt28q" target="_blank" rel="noopener noreferrer" className="block">
            <img
              src="https://i.ibb.co/5Qh4zKX/518014380-1327254962741480-8187086946583077665-n.jpg"
              alt="Advertisement"
              className="w-full max-w-[300px] h-auto rounded-xl shadow-sm border border-slate-200 hover:opacity-90 transition-opacity"
            />
          </a>
        </div>
      )}

      {/* OTHERS — World, Sports, Entertainment */}
      {showSections && otherPosts.length > 0 && (
        <section className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase">More <span className="text-red-600">Coverage</span></h2>
            <div className="h-1 w-full bg-slate-400 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {otherPosts.map((post, index) => (
              <div key={post.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both" style={{ animationDelay: `${index * 100}ms` }}>
                <ArticleCard post={post} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Category archive view */}
      {!showSections && (
        <div>
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase">{filter} <span className="text-red-600">Archive</span></h2>
            <div className="h-1 w-full bg-red-600 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {remainingPosts.length > 0 ? remainingPosts.map((post, index) => (
              <div key={post.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both" style={{ animationDelay: `${index * 100}ms` }}>
                <ArticleCard post={post} />
              </div>
            )) : (
              <div className="col-span-full text-center py-32 bg-white rounded-3xl shadow-sm border border-slate-100">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-newspaper text-3xl text-slate-200"></i>
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-widest mb-2">Blank Edition</h3>
                <p className="text-slate-400">Our reporters are currently working on stories for this section.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
