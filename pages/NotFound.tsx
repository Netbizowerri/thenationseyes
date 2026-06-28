
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist." path="/404" />
      <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
        <i className="fas fa-eye-slash text-4xl text-red-600"></i>
      </div>
      <h1 className="text-6xl md:text-8xl font-[900] text-slate-900 tracking-tighter mb-4">404</h1>
      <p className="text-xl text-slate-500 mb-8 max-w-md mx-auto font-light">
        This page has gone into hiding. Even the Nation's Eyes can't see it.
      </p>
      <Link to="/" className="inline-flex items-center px-8 py-4 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 transition-all shadow-xl hover:shadow-red-200 uppercase tracking-widest text-xs no-underline">
        <i className="fas fa-arrow-left mr-3"></i>
        Back to Home
      </Link>
    </div>
  );
}
