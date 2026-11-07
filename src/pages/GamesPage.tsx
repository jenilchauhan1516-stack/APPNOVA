import React, { useState, useMemo } from 'react';
import { Gamepad2, Flame, Award, Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AppCard } from '../components/common/AppCard';
import { CategoryPill } from '../components/common/CategoryPill';
import { HeroBanner } from '../components/common/HeroBanner';
import { DownloadModal } from '../components/common/DownloadModal';
import { AppItem } from '../types';

export const GamesPage: React.FC = () => {
  const { apps, categories, recordDownload } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'size'>('popular');
  const [downloadModalApp, setDownloadModalApp] = useState<AppItem | null>(null);

  const gameCategories = categories.filter((c) => c.type === 'game');
  const allGames = apps.filter((a) => a.type === 'game');
  const featuredGames = allGames.filter((g) => g.isFeatured);
  const trendingGames = allGames.filter((g) => g.isTrending);

  const filteredGames = useMemo(() => {
    return allGames
      .filter((game) => {
        if (selectedCategory !== 'all') {
          return game.category.toLowerCase() === selectedCategory.toLowerCase();
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        if (sortBy === 'size') {
          return parseFloat(b.size) - parseFloat(a.size);
        }
        return b.rating * 10 - a.rating * 10;
      });
  }, [allGames, selectedCategory, sortBy]);

  return (
    <div className="space-y-10 pb-16">
      {/* 1. Games Hero Carousel */}
      <section aria-label="Featured Games">
        <HeroBanner
          featuredApps={featuredGames.length > 0 ? featuredGames : allGames}
          onQuickDownload={(app) => setDownloadModalApp(app)}
        />
      </section>

      {/* 2. Page Header & Category Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-500">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-appText-primary dark:text-appText-darkPrimary">
              Android Games
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-appText-secondary dark:text-appText-darkSecondary">
            Top action, arcade, RPG and multiplayer games tested on latest Snapdragon & Dimensity chipsets.
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex items-center gap-1.5 bg-white dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder rounded-full px-3.5 py-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-appText-muted dark:text-appText-darkMuted" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'popular' | 'rating' | 'size')}
              className="bg-transparent text-xs sm:text-sm font-semibold text-appText-secondary dark:text-appText-darkSecondary outline-none cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Top Rated</option>
              <option value="size">Largest File Size</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="overflow-x-auto no-scrollbar py-1">
        <div className="flex items-center gap-2 min-w-max">
          <CategoryPill
            id="all"
            name="All Games"
            isSelected={selectedCategory === 'all'}
            onClick={() => setSelectedCategory('all')}
            count={allGames.length}
          />
          {gameCategories.map((cat) => (
            <CategoryPill
              key={cat.id}
              id={cat.id}
              name={cat.name}
              iconName={cat.iconName}
              isSelected={selectedCategory.toLowerCase() === cat.name.toLowerCase()}
              onClick={() => setSelectedCategory(cat.name)}
              count={allGames.filter((g) => g.category.toLowerCase() === cat.name.toLowerCase()).length}
            />
          ))}
        </div>
      </div>

      {/* 3. Trending Games Section */}
      {selectedCategory === 'all' && trendingGames.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-4 h-4 text-rose-500" />
            <h2 className="text-lg sm:text-xl font-bold text-appText-primary dark:text-appText-darkPrimary">
              Trending Right Now
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {trendingGames.map((game) => (
              <AppCard key={game.id} app={game} />
            ))}
          </div>
        </section>
      )}

      {/* 4. All Filtered Games Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-brand-500" />
            <h2 className="text-lg sm:text-xl font-bold text-appText-primary dark:text-appText-darkPrimary">
              {selectedCategory === 'all' ? 'All Android Games' : `${selectedCategory} Games`}
            </h2>
          </div>
          <span className="text-xs text-appText-muted dark:text-appText-darkMuted font-medium">
            {filteredGames.length} games available
          </span>
        </div>

        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {filteredGames.map((game) => (
              <AppCard key={game.id} app={game} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white dark:bg-surface-darkCard rounded-3xl border border-surface-border dark:border-surface-darkBorder">
            <SlidersHorizontal className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-appText-primary dark:text-appText-darkPrimary">
              No Games in this Category
            </h3>
            <p className="text-xs sm:text-sm text-appText-secondary dark:text-appText-darkSecondary max-w-sm mx-auto mt-1 mb-4">
              Try switching back to all games or check out other exciting categories.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="px-5 py-2 rounded-full bg-brand-500 hover:bg-brand-600 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              Show All Games
            </button>
          </div>
        )}
      </section>

      {/* Download Modal */}
      <DownloadModal
        app={downloadModalApp}
        isOpen={Boolean(downloadModalApp)}
        onClose={() => setDownloadModalApp(null)}
        onDownloaded={(appId) => recordDownload(appId)}
      />
    </div>
  );
};
