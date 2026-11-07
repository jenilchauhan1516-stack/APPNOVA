import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { LucideIcon, ArrowRight, LayoutGrid, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AppCard } from '../components/common/AppCard';

export const CategoriesPage: React.FC = () => {
  const { categories, apps } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSelected = searchParams.get('selected');
  const [activeCategory, setActiveCategory] = useState<string | null>(activeSelected);

  const handleSelect = (catName: string) => {
    if (activeCategory === catName) {
      setActiveCategory(null);
      searchParams.delete('selected');
    } else {
      setActiveCategory(catName);
      searchParams.set('selected', catName);
    }
    setSearchParams(searchParams);
  };

  const appsInActiveCategory = activeCategory
    ? apps.filter((a) => a.category.toLowerCase() === activeCategory.toLowerCase())
    : [];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-500">
            <LayoutGrid className="w-5 h-5" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-appText-primary dark:text-appText-darkPrimary">
            App & Game Categories
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-appText-secondary dark:text-appText-darkSecondary">
          Discover hand-curated directories tailored for productivity, communication, gaming, and lifestyle.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const IconComponent = (LucideIcons as unknown as Record<string, LucideIcon>)[cat.iconName] || LayoutGrid;
          const count = apps.filter(
            (a) => a.category.toLowerCase() === cat.name.toLowerCase()
          ).length;
          const isSelected = activeCategory?.toLowerCase() === cat.name.toLowerCase();

          return (
            <div
              key={cat.id}
              onClick={() => handleSelect(cat.name)}
              className={`cursor-pointer p-5 rounded-3xl border transition-all duration-200 text-left relative overflow-hidden group ${
                isSelected
                  ? 'bg-brand-500 text-white border-brand-600 shadow-card ring-2 ring-brand-500/20'
                  : 'bg-white dark:bg-surface-darkCard border-surface-border dark:border-surface-darkBorder hover:border-brand-300 dark:hover:border-brand-500/40 hover:shadow-card'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-brand-50 dark:bg-slate-800'
                  }`}
                  style={{ color: isSelected ? '#FFFFFF' : cat.color }}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {count} {count === 1 ? 'item' : 'items'}
                </span>
              </div>

              <h3
                className={`text-base font-bold ${
                  isSelected ? 'text-white' : 'text-appText-primary dark:text-appText-darkPrimary'
                }`}
              >
                {cat.name}
              </h3>
              <p
                className={`text-xs mt-1 line-clamp-1 ${
                  isSelected ? 'text-white/80' : 'text-appText-secondary dark:text-appText-darkSecondary'
                }`}
              >
                {cat.description || `Top rated ${cat.name.toLowerCase()} apps for Android`}
              </p>

              <div
                className={`flex items-center gap-1 text-xs font-semibold mt-4 ${
                  isSelected ? 'text-white' : 'text-brand-500 group-hover:translate-x-1 transition-transform'
                }`}
              >
                <span>{isSelected ? 'Viewing apps below' : 'Explore category'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Category Apps Subsection */}
      {activeCategory && (
        <section className="pt-6 border-t border-slate-200 dark:border-slate-800 animate-in fade-in">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-500" />
              <h2 className="text-xl font-bold text-appText-primary dark:text-appText-darkPrimary">
                {activeCategory} ({appsInActiveCategory.length})
              </h2>
            </div>
            <button
              onClick={() => {
                setActiveCategory(null);
                searchParams.delete('selected');
                setSearchParams(searchParams);
              }}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
            >
              Close View
            </button>
          </div>

          {appsInActiveCategory.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {appsInActiveCategory.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 py-6">
              No apps currently cataloged in {activeCategory} yet.
            </p>
          )}
        </section>
      )}
    </div>
  );
};
