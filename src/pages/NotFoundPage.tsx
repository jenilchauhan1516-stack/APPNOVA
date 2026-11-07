import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Smartphone } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="relative mb-6">
        <div className="text-8xl sm:text-9xl font-black text-slate-200 dark:text-slate-800 select-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-4 rounded-3xl bg-brand-500 text-white shadow-xl shadow-brand-500/30">
            <Smartphone className="w-10 h-10" />
          </div>
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-appText-primary dark:text-appText-darkPrimary mb-2">
        Page Not Found
      </h1>
      <p className="text-xs sm:text-sm text-appText-secondary dark:text-appText-darkSecondary max-w-sm mb-6 leading-relaxed">
        The link you followed may be broken, or the page may have been removed. Let's get you back to discovering great Android apps.
      </p>

      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs sm:text-sm shadow-md transition-all"
        >
          <Home className="w-4 h-4" />
          Go to Home
        </Link>
        <Link
          to="/apps"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-100 dark:bg-surface-darkSubtle text-appText-secondary dark:text-appText-darkSecondary font-semibold text-xs sm:text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
        >
          <Search className="w-4 h-4" />
          Browse Apps
        </Link>
      </div>
    </div>
  );
};
