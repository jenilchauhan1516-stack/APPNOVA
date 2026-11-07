import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Sparkles,
  ArrowRight,
  Flame,
  Award,
  ShieldCheck,
  Zap,
  CheckCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AppCard } from '../components/common/AppCard';
import { HeroBanner } from '../components/common/HeroBanner';
import { CategoryPill } from '../components/common/CategoryPill';
import { DownloadModal } from '../components/common/DownloadModal';
import { AdBanner } from '../components/common/AdBanner';
import { AppItem } from '../types';

export const HomePage: React.FC = () => {
  const { apps, categories, recordDownload } = useApp();
  const [downloadModalApp, setDownloadModalApp] = useState<AppItem | null>(null);

  // Group apps
  const featuredApps = apps.filter((a) => a.isFeatured);
  const trendingApps = apps.filter((a) => a.isTrending);
  const popularApps = apps.filter((a) => a.isPopular || parseFloat(a.downloads) >= 1);
  const recentApps = [...apps].sort((a, b) => b.version.localeCompare(a.version)).slice(0, 6);

  const handleQuickDownload = (app: AppItem) => {
    setDownloadModalApp(app);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Hero Featured Carousel */}
      <section aria-label="Featured Apps Carousel">
        <HeroBanner
          featuredApps={featuredApps.length > 0 ? featuredApps : apps.slice(0, 4)}
          onQuickDownload={handleQuickDownload}
        />
      </section>

      {/* 2. Quick Category Bar */}
      <section aria-label="Popular Categories" className="overflow-x-auto no-scrollbar py-1">
        <div className="flex items-center gap-2.5 min-w-max">
          <Link
            to="/categories"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 hover:bg-brand-100 transition-colors"
          >
            All Categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          {categories.slice(0, 8).map((cat) => (
            <Link key={cat.id} to={`/categories?selected=${cat.id}`}>
              <CategoryPill
                id={cat.id}
                name={cat.name}
                iconName={cat.iconName}
                onClick={() => {}}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Trending Downloads Section */}
      <section aria-label="Trending Downloads">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-500">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-appText-primary dark:text-appText-darkPrimary">
                Trending Downloads
              </h2>
              <p className="text-xs text-appText-secondary dark:text-appText-darkSecondary">
                Most installed APKs this week across all devices
              </p>
            </div>
          </div>
          <Link
            to="/apps"
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            <span>View all</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {trendingApps.slice(0, 6).map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </section>

      {/* Google AdSense Leaderboard Banner */}
      <AdBanner format="horizontal" />

      {/* 4. Top Charts & Popular Apps */}
      <section aria-label="Popular Apps">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-500">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-appText-primary dark:text-appText-darkPrimary">
                Top Charts & Popular
              </h2>
              <p className="text-xs text-appText-secondary dark:text-appText-darkSecondary">
                Highest rated applications trusted by millions
              </p>
            </div>
          </div>
          <Link
            to="/apps?sort=popular"
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            <span>Top charts</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {popularApps.slice(0, 6).map((app, index) => (
            <AppCard key={app.id} app={app} rank={index + 1} layout="row" />
          ))}
        </div>
      </section>

      {/* 5. Android Games Highlight Banner */}
      <section className="relative rounded-3xl bg-gradient-to-r from-brand-600 via-indigo-600 to-blue-700 text-white p-6 sm:p-10 overflow-hidden shadow-card">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" /> High Performance Gaming
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Discover Top Android Games
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 mt-2 leading-relaxed">
            From action-packed battle royales like Free Fire MAX to endless sandboxes like Minecraft. Verified FPS performance and direct APK downloads.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <Link
              to="/games"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-brand-600 font-bold text-xs sm:text-sm shadow-md hover:bg-blue-50 transition-colors"
            >
              Browse Games <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        {/* Subtle decorative circles */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute right-20 -top-10 w-48 h-48 rounded-full bg-indigo-400/20 blur-xl pointer-events-none" />
      </section>

      {/* 6. Recently Added & Updated Apps */}
      <section aria-label="Recently Added Apps">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-brand-500">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-appText-primary dark:text-appText-darkPrimary">
                Recently Updated Apps
              </h2>
              <p className="text-xs text-appText-secondary dark:text-appText-darkSecondary">
                Fresh builds and latest patch versions
              </p>
            </div>
          </div>
          <Link
            to="/apps?sort=latest"
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            <span>See more</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {recentApps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </section>

      {/* 7. Safety & Trust Verification Banner */}
      <section className="p-6 sm:p-8 rounded-3xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-emerald-600 text-white flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                100% Verified Safe APKs
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Every APK is scanned using automated static analysis and Google Play Protect signatures.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-emerald-600 text-white flex-shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Original Developer Signature
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Untouched certificates match original release hashes. No repackaged ads or malware.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-emerald-600 text-white flex-shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                High-Speed CDN Delivery
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Enjoy uncapped direct package downloads across global edge networks with zero waiting loops.
              </p>
            </div>
          </div>
        </div>
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
