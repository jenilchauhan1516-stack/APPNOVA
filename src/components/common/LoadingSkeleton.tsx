import React from 'react';

export const AppCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col p-3 rounded-2xl bg-white dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder animate-pulse">
      <div className="w-full aspect-square rounded-2xl bg-slate-200 dark:bg-slate-700/60 mb-3" />
      <div className="h-4 bg-slate-200 dark:bg-slate-700/60 rounded w-3/4 mb-2" />
      <div className="h-3 bg-slate-200 dark:bg-slate-700/60 rounded w-1/2 mb-3" />
      <div className="flex items-center justify-between mt-auto pt-1">
        <div className="h-3 bg-slate-200 dark:bg-slate-700/60 rounded w-1/4" />
        <div className="h-3 bg-slate-200 dark:bg-slate-700/60 rounded w-1/4" />
      </div>
    </div>
  );
};

export const AppGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <AppCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const BannerSkeleton: React.FC = () => {
  return (
    <div className="w-full h-64 sm:h-80 md:h-96 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
  );
};
