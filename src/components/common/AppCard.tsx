import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Download, ShieldCheck } from 'lucide-react';
import { AppItem } from '../../types';

interface AppCardProps {
  app: AppItem;
  rank?: number;
  layout?: 'grid' | 'row';
}

export const AppCard: React.FC<AppCardProps> = ({ app, rank, layout = 'grid' }) => {
  if (layout === 'row') {
    return (
      <Link
        to={`/app/${app.id}`}
        className="group flex items-center gap-4 p-3 rounded-2xl bg-white dark:bg-surface-darkCard border border-surface-border/60 dark:border-surface-darkBorder/60 hover:border-brand-300 dark:hover:border-brand-500/50 hover:shadow-card transition-all duration-200"
      >
        {rank !== undefined && (
          <span className="w-6 text-center text-base font-bold text-slate-400 dark:text-slate-500">
            {rank}
          </span>
        )}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
          <img
            src={app.icon}
            alt={app.name}
            loading="lazy"
            className="w-full h-full object-cover rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm sm:text-base font-semibold text-appText-primary dark:text-appText-darkPrimary truncate group-hover:text-brand-500 transition-colors">
            {app.name}
          </h4>
          <p className="text-xs text-appText-secondary dark:text-appText-darkSecondary truncate mt-0.5">
            {app.developer}
          </p>
          <div className="flex items-center gap-3 text-xs text-appText-muted dark:text-appText-darkMuted mt-1.5">
            <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
              {app.rating.toFixed(1)}
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            </span>
            <span>•</span>
            <span>{app.category}</span>
            <span>•</span>
            <span className="flex items-center gap-0.5">
              <Download className="w-3 h-3" />
              {app.downloads}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/app/${app.id}`}
      className="group flex flex-col p-3 rounded-2xl bg-white dark:bg-surface-darkCard border border-surface-border/60 dark:border-surface-darkBorder/60 hover:border-brand-300 dark:hover:border-brand-500/50 hover:shadow-card transition-all duration-200"
    >
      <div className="relative aspect-square w-full mb-3 overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-800">
        <img
          src={app.icon}
          alt={app.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {app.isFeatured && (
          <span className="absolute top-2 left-2 bg-brand-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1">
        <h4 className="text-sm font-semibold text-appText-primary dark:text-appText-darkPrimary line-clamp-1 group-hover:text-brand-500 transition-colors">
          {app.name}
        </h4>
        <p className="text-xs text-appText-secondary dark:text-appText-darkSecondary line-clamp-1 mt-0.5">
          {app.developer}
        </p>

        <div className="flex items-center justify-between text-xs text-appText-muted dark:text-appText-darkMuted mt-2 pt-1 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
            <span>{app.rating.toFixed(1)}</span>
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
          </div>
          <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
            <span>{app.size}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 pt-1 text-[11px] text-slate-400 dark:text-slate-500">
          <span className="truncate max-w-[85px]">{app.category}</span>
          <span className="flex items-center gap-0.5 font-medium text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-3 h-3" />
            Verified
          </span>
        </div>
      </div>
    </Link>
  );
};
