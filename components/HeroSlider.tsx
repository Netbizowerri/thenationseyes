import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Post } from '../types';
import { Link } from 'react-router-dom';

interface HeroSliderProps {
  posts: Post[];
}

const GRID_SIZE = { rows: 8, cols: 12 };
const SLIDE_DURATION = 300000; // 5 minutes in milliseconds

const HeroSlider: React.FC<HeroSliderProps> = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<any>(null);

  const handleNext = useCallback(() => {
    if (isTransitioning || posts.length <= 1) return;
    
    setIsTransitioning(true);
    setPrevIndex(currentIndex);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
    }, 400);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
  }, [currentIndex, isTransitioning, posts.length]);

  useEffect(() => {
    // Basic reliable interval for 5-minute cycles
    const interval = setInterval(handleNext, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [handleNext]);

  const goToSlide = (idx: number) => {
    if (isTransitioning || idx === currentIndex) return;
    setIsTransitioning(true);
    setPrevIndex(currentIndex);
    setTimeout(() => {
      setCurrentIndex(idx);
    }, 400);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
  };

  if (!posts.length) return null;

  const currentPost = posts[currentIndex];
  const prevPost = posts[prevIndex];

  return (
    <div className="relative w-full h-[45vh] md:h-[500px] overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl mb-6 md:mb-16 bg-black group select-none">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src={prevPost.imageUrl} 
          className="w-full h-full object-cover opacity-40 scale-100"
          alt={prevPost.title}
          width={1200}
          height={500}
          loading="eager"
        />
      </div>

      {/* Fragmented Transition Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div 
          className="grid w-full h-full"
          style={{ 
            gridTemplateColumns: `repeat(${GRID_SIZE.cols}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE.rows}, 1fr)`
          }}
        >
          {Array.from({ length: GRID_SIZE.rows * GRID_SIZE.cols }).map((_, i) => {
            const row = Math.floor(i / GRID_SIZE.cols);
            const col = i % GRID_SIZE.cols;
            const centerX = GRID_SIZE.cols / 2;
            const centerY = GRID_SIZE.rows / 2;
            const dist = Math.sqrt(Math.pow(col - centerX, 2) + Math.pow(row - centerY, 2));
            const delay = dist * 50;

            return (
              <div 
                key={i}
                className="relative overflow-hidden transition-all duration-800 ease-in-out"
                style={{
                  backgroundImage: `url(${currentPost.imageUrl})`,
                  backgroundSize: `${GRID_SIZE.cols * 100}% ${GRID_SIZE.rows * 100}%`,
                  backgroundPosition: `${(col / (GRID_SIZE.cols - 1)) * 100}% ${(row / (GRID_SIZE.rows - 1)) * 100}%`,
                  opacity: isTransitioning ? 0 : 0.7,
                  transform: isTransitioning 
                    ? `translate(${(col - centerX) * 20}px, ${(row - centerY) * 20}px) scale(0) rotate(${dist * 10}deg)` 
                    : 'translate(0,0) scale(1) rotate(0deg)',
                  transitionDelay: `${isTransitioning ? 0 : delay}ms`,
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-20"></div>

      {/* Content Layer */}
      <div className="absolute inset-0 z-30 flex flex-col justify-end p-6 md:p-12">
        <div key={currentPost.id} className={`max-w-4xl transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <span className="inline-block px-4 py-1.5 bg-red-600 text-white text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] rounded-full mb-4 shadow-2xl">
            {currentPost.category}
          </span>
          <Link to={`/post/${currentPost.id}`} className="block no-underline">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-[900] text-white mb-4 hover:text-red-500 transition-all duration-300 tracking-tighter leading-[1.1] drop-shadow-2xl line-clamp-2 uppercase">
              {currentPost.title}
            </h2>
          </Link>
          <p className="hidden md:block text-gray-300 text-base lg:text-lg line-clamp-2 max-w-2xl mb-8 font-light leading-relaxed">
            {currentPost.excerpt}
          </p>
          <div className="flex items-center text-[9px] md:text-xs text-white/50 space-x-4 md:space-x-8 font-black uppercase tracking-widest">
            <span className="flex items-center"><i className="far fa-user mr-2 text-red-600"></i> {currentPost.author}</span>
            <span className="flex items-center"><i className="far fa-calendar-alt mr-2 text-red-600"></i> {new Date(currentPost.date).toLocaleDateString()}</span>
            <span className="hidden sm:flex items-center"><i className="far fa-clock mr-2 text-red-600"></i> {currentPost.readTime}</span>
          </div>
        </div>

        {/* Slider Navigation Controls */}
        <div className="flex items-center space-x-3 mt-10">
          {posts.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                idx === currentIndex ? 'w-12 bg-red-600' : 'w-4 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1.5 bg-white/5 w-full z-40">
        <div 
          key={currentIndex}
          className="h-full bg-red-600/80 linear"
          style={{ 
            width: isTransitioning ? '0%' : '100%',
            transition: isTransitioning ? 'none' : `width ${SLIDE_DURATION}ms linear` 
          }}
        />
      </div>
    </div>
  );
};

export default HeroSlider;