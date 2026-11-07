import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  max = 5,
  size = 'sm',
  showNumber = false,
}) => {
  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textClasses = {
    sm: 'text-xs',
    md: 'text-sm font-semibold',
    lg: 'text-base font-bold',
  };

  return (
    <div className="flex items-center gap-1.5" aria-label={`Rating ${rating} out of ${max}`}>
      {showNumber && (
        <span className={`text-appText-primary dark:text-appText-darkPrimary ${textClasses[size]}`}>
          {rating.toFixed(1)}
        </span>
      )}
      <div className="flex items-center">
        {Array.from({ length: max }).map((_, index) => {
          const fillPercentage = Math.max(0, Math.min(1, rating - index));
          return (
            <div key={index} className="relative">
              <Star
                className={`${sizeClasses[size]} text-slate-200 dark:text-slate-700 fill-slate-200 dark:fill-slate-700`}
              />
              {fillPercentage > 0 && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fillPercentage * 100}%` }}
                >
                  <Star className={`${sizeClasses[size]} text-amber-500 fill-amber-500`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
