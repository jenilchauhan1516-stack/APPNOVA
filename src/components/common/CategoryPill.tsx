import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface CategoryPillProps {
  id: string;
  name: string;
  iconName?: string;
  isSelected?: boolean;
  onClick: () => void;
  count?: number;
}

export const CategoryPill: React.FC<CategoryPillProps> = ({
  name,
  iconName,
  isSelected = false,
  onClick,
  count,
}) => {
  // Dynamically resolve icon if available
  const IconComponent = iconName && (LucideIcons as unknown as Record<string, LucideIcon>)[iconName]
    ? (LucideIcons as unknown as Record<string, LucideIcon>)[iconName]
    : null;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap select-none ${
        isSelected
          ? 'bg-brand-500 text-white shadow-sm ring-2 ring-brand-500/20'
          : 'bg-white dark:bg-surface-darkCard text-appText-secondary dark:text-appText-darkSecondary border border-surface-border dark:border-surface-darkBorder hover:border-brand-300 dark:hover:border-brand-500/40 hover:bg-brand-50/50 dark:hover:bg-slate-800'
      }`}
    >
      {IconComponent && <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-brand-500'}`} />}
      <span>{name}</span>
      {count !== undefined && (
        <span
          className={`text-[10px] px-1.5 py-0.5 rounded-full ${
            isSelected
              ? 'bg-white/20 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
};
