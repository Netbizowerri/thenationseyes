
import { Link } from 'react-router-dom';
import { Category } from '../types';

const CategoryIcon = ({ category }: { category: string }) => {
  const icons: Record<string, string> = {
    [Category.POLITICS]: 'fa-gavel',
    [Category.ECONOMY]: 'fa-chart-line',
    [Category.SOCIETY]: 'fa-users',
    [Category.EDITORIAL]: 'fa-pen-nib',
    [Category.WORLD]: 'fa-globe-africa',
    [Category.ENTERTAINMENT]: 'fa-clapperboard',
    [Category.SPORTS]: 'fa-trophy',
  };
  return <i className={`fas ${icons[category] || 'fa-hashtag'}`}></i>;
};

interface MobileMenuTrayProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchOpen: () => void;
}

export default function MobileMenuTray({ isOpen, onClose, onSearchOpen }: MobileMenuTrayProps) {
  const categories = Object.values(Category);

  return (
    <>
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`fixed top-0 right-0 w-[85%] max-w-sm h-full bg-white z-[110] shadow-2xl transform transition-transform duration-500 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-200">
              <i className="fas fa-eye"></i>
            </div>
            <span className="font-black text-slate-900 tracking-tighter text-lg uppercase">The Nation's Eyes</span>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-100 text-slate-400 hover:text-red-600 hover:border-red-100 transition-all active:scale-90" aria-label="Close menu">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-8 no-scrollbar">
          <div className="relative">
            <div
              onClick={() => { onClose(); onSearchOpen(); }}
              className="w-full bg-slate-100 border-none p-4 pl-12 rounded-2xl text-xs font-bold uppercase tracking-widest cursor-pointer text-slate-400 hover:bg-slate-200 transition-colors"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') { onClose(); onSearchOpen(); } }}
            >
              Search news...
            </div>
            <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
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
            <a href="https://web.facebook.com/noel.chiagorom" target="_blank" rel="noopener noreferrer" className="text-xl text-slate-400 hover:text-red-600 transition-colors" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-xl text-slate-400 hover:text-red-600 transition-colors" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-xl text-slate-400 hover:text-red-600 transition-colors" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          </div>
          <p className="text-[9px] text-center font-black text-slate-400 uppercase tracking-[0.2em]">VOICE OF THE NATION</p>
        </div>
      </div>
    </>
  );
}
