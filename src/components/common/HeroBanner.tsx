import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Download, Star, ShieldCheck } from 'lucide-react';
import { AppItem } from '../../types';

interface HeroBannerProps {
  featuredApps: AppItem[];
  onQuickDownload?: (app: AppItem) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ featuredApps, onQuickDownload }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featuredApps.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredApps.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredApps.length]);

  if (!featuredApps.length) return null;

  const activeApp = featuredApps[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredApps.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredApps.length);
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-card border border-surface-border/60 dark:border-surface-darkBorder/60 group">
      {/* Background Banner Image with Gradient Overlays */}
      <div className="relative h-72 sm:h-84 md:h-96 w-full overflow-hidden bg-slate-900">
        <img
          src={activeApp.banner || activeApp.icon}
          alt={activeApp.name}
          className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Play Store-style subtle dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 md:p-10 text-white z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-5">
          <div className="flex items-center sm:items-start gap-4 max-w-2xl">
            <img
              src={activeApp.icon}
              alt={activeApp.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shadow-lg border-2 border-white/20 object-cover flex-shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="bg-brand-500 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  Featured
                </span>
                <span className="bg-white/20 backdrop-blur-md text-white text-xs px-2 py-0.5 rounded-full font-medium">
                  {activeApp.category}
                </span>
                <span className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Safe
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow-sm">
                {activeApp.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 line-clamp-2 max-w-xl">
                {activeApp.description}
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs text-slate-300">
                <span className="flex items-center gap-1 font-semibold text-white">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  {activeApp.rating.toFixed(1)}
                </span>
                <span>•</span>
                <span>{activeApp.downloads} Downloads</span>
                <span>•</span>
                <span>{activeApp.size}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              to={`/app/${activeApp.id}`}
              className="flex-1 sm:flex-initial text-center px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs sm:text-sm font-semibold transition-all border border-white/20"
            >
              Learn More
            </Link>
            {onQuickDownload ? (
              <button
                type="button"
                onClick={() => onQuickDownload(activeApp)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-brand-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                <span>Get APK</span>
              </button>
            ) : (
              <Link
                to={`/app/${activeApp.id}`}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-brand-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                <span>Get APK</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {featuredApps.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
            {featuredApps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-6 bg-brand-400' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
