import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Sparkles, Filter, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AppCard } from '../components/common/AppCard';

export const SearchResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { apps } = useApp();

  const [filterType, setFilterType] = useState<'all' | 'app' | 'game'>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    return apps
      .filter((app) => {
        const matchesQuery =
          app.name.toLowerCase().includes(q) ||
          app.developer.toLowerCase().includes(q) ||
          app.category.toLowerCase().includes(q) ||
          app.description.toLowerCase().includes(q) ||
          (app.tags && app.tags.some((t) => t.toLowerCase().includes(q)));

        const matchesType = filterType === 'all' || app.type === filterType;
        const matchesCat = activeCategory === 'all' || app.category.toLowerCase() === activeCategory.toLowerCase();

        return matchesQuery && matchesType && matchesCat;
      });
  }, [apps, query, filterType, activeCategory]);

  const categoriesInResults = useMemo(() => {
    const set = new Set<string>();
    apps.forEach((a) => set.add(a.category));
    return Array.from(set);
  }, [apps]);

  return (
    <div className="space-y-8 pb-16">
      {/* Search Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Link
            to="/"
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-appText-primary dark:text-appText-darkPrimary">
            Search Results for "<span className="text-brand-500">{query}</span>"
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-appText-secondary dark:text-appText-darkSecondary">
          Found {searchResults.length} matching {searchResults.length === 1 ? 'application' : 'applications'}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-surface-border dark:border-surface-darkBorder">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              filterType === 'all'
                ? 'bg-brand-500 text-white shadow-sm'
                : 'bg-white dark:bg-surface-darkCard text-slate-600 dark:text-slate-300 border border-surface-border dark:border-surface-darkBorder'
            }`}
          >
            All Results
          </button>
          <button
            type="button"
            onClick={() => setFilterType('app')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              filterType === 'app'
                ? 'bg-brand-500 text-white shadow-sm'
                : 'bg-white dark:bg-surface-darkCard text-slate-600 dark:text-slate-300 border border-surface-border dark:border-surface-darkBorder'
            }`}
          >
            Apps Only
          </button>
          <button
            type="button"
            onClick={() => setFilterType('game')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              filterType === 'game'
                ? 'bg-brand-500 text-white shadow-sm'
                : 'bg-white dark:bg-surface-darkCard text-slate-600 dark:text-slate-300 border border-surface-border dark:border-surface-darkBorder'
            }`}
          >
            Games Only
          </button>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 hidden sm:inline">Category:</span>
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="text-xs font-medium px-3 py-1.5 rounded-xl bg-white dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder text-appText-secondary dark:text-appText-darkSecondary outline-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categoriesInResults.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Grid or Empty State */}
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {searchResults.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-white dark:bg-surface-darkCard rounded-3xl border border-surface-border dark:border-surface-darkBorder shadow-soft">
          <div className="w-16 h-16 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-500 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-brand-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-appText-primary dark:text-appText-darkPrimary">
            No results found for "{query}"
          </h3>
          <p className="text-xs sm:text-sm text-appText-secondary dark:text-appText-darkSecondary max-w-md mx-auto mt-2 mb-6 leading-relaxed">
            Check the spelling, try broader keywords (e.g. "chat", "game", "photo"), or browse our most popular applications below.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/apps"
              className="px-5 py-2.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
            >
              Explore Popular Apps
            </Link>
            <Link
              to="/games"
              className="px-5 py-2.5 rounded-full bg-slate-100 dark:bg-surface-darkSubtle text-appText-secondary dark:text-appText-darkSecondary text-xs sm:text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Browse Games
            </Link>
          </div>

          {/* Fallback suggestions */}
          <div className="mt-12 text-left pt-8 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Recommended for you
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {apps.slice(0, 6).map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
