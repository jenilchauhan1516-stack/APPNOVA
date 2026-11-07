import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown, Smartphone } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AppCard } from '../components/common/AppCard';
import { CategoryPill } from '../components/common/CategoryPill';

export const AppsPage: React.FC = () => {
  const { apps, categories } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'all'
  );
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'latest' | 'rating'>(
    (searchParams.get('sort') as 'popular' | 'latest' | 'rating') || 'popular'
  );

  // App categories only
  const appCategories = categories.filter((c) => c.type === 'app' || c.type === 'all');

  const filteredApps = useMemo(() => {
    return apps
      .filter((app) => app.type === 'app')
      .filter((app) => {
        if (selectedCategory !== 'all') {
          return app.category.toLowerCase() === selectedCategory.toLowerCase();
        }
        return true;
      })
      .filter((app) => {
        if (!searchTerm.trim()) return true;
        const q = searchTerm.toLowerCase();
        return (
          app.name.toLowerCase().includes(q) ||
          app.developer.toLowerCase().includes(q) ||
          app.description.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        if (sortBy === 'latest') {
          return b.lastUpdated.localeCompare(a.lastUpdated);
        }
        // Popular: based on downloads count string approximation
        return b.rating * 10 - a.rating * 10;
      });
  }, [apps, selectedCategory, searchTerm, sortBy]);

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const handleSortChange = (newSort: 'popular' | 'latest' | 'rating') => {
    setSortBy(newSort);
    searchParams.set('sort', newSort);
    setSearchParams(searchParams);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-500">
              <Smartphone className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-appText-primary dark:text-appText-darkPrimary">
              Android Apps
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-appText-secondary dark:text-appText-darkSecondary">
            Explore safe, tested Android applications for productivity, communication, media and more.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter apps..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-full bg-white dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder focus:border-brand-500 outline-none text-appText-primary dark:text-appText-darkPrimary"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-appText-muted dark:text-appText-darkMuted" />
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex items-center gap-1.5 bg-white dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder rounded-full px-3 py-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-appText-muted dark:text-appText-darkMuted" />
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as 'popular' | 'latest' | 'rating')}
              className="bg-transparent text-xs sm:text-sm font-semibold text-appText-secondary dark:text-appText-darkSecondary outline-none cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="latest">Latest Release</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="overflow-x-auto no-scrollbar py-1">
        <div className="flex items-center gap-2 min-w-max">
          <CategoryPill
            id="all"
            name="All Apps"
            isSelected={selectedCategory === 'all'}
            onClick={() => handleCategorySelect('all')}
            count={apps.filter((a) => a.type === 'app').length}
          />
          {appCategories.map((cat) => {
            const count = apps.filter(
              (a) => a.type === 'app' && a.category.toLowerCase() === cat.name.toLowerCase()
            ).length;
            return (
              <CategoryPill
                key={cat.id}
                id={cat.id}
                name={cat.name}
                iconName={cat.iconName}
                isSelected={selectedCategory.toLowerCase() === cat.name.toLowerCase()}
                onClick={() => handleCategorySelect(cat.name)}
                count={count}
              />
            );
          })}
        </div>
      </div>

      {/* Apps Grid */}
      {filteredApps.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {filteredApps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-white dark:bg-surface-darkCard rounded-3xl border border-surface-border dark:border-surface-darkBorder">
          <SlidersHorizontal className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-appText-primary dark:text-appText-darkPrimary">
            No Apps Found
          </h3>
          <p className="text-xs sm:text-sm text-appText-secondary dark:text-appText-darkSecondary max-w-sm mx-auto mt-1 mb-4">
            We couldn't find any apps matching your filters. Try selecting a different category or clearing search terms.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchTerm('');
            }}
            className="px-5 py-2 rounded-full bg-brand-500 hover:bg-brand-600 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
