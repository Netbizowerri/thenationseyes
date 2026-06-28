import { useState, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function ErrorBoundary({ children }: Props) {
  const [error, setError] = useState<Error | null>(null);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-exclamation-triangle text-3xl text-red-600"></i>
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">Something went wrong</h1>
          <p className="text-slate-500 mb-6 text-sm">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={() => setError(null)}
            className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-red-700 transition-all shadow-lg"
          >
            <i className="fas fa-redo mr-2"></i>Try Again
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
