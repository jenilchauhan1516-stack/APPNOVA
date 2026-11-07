import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Download,
  Star,
  ShieldCheck,
  Calendar,
  Layers,
  Smartphone,
  Share2,
  FileCheck2,
  ChevronRight,
  Info,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Sparkles,
  ArrowLeft,
  Copy,
  Check,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { RatingStars } from '../components/common/RatingStars';
import { AppCard } from '../components/common/AppCard';
import { ScreenshotLightbox } from '../components/common/ScreenshotLightbox';
import { DownloadModal } from '../components/common/DownloadModal';
import { AdBanner } from '../components/common/AdBanner';

export const AppDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { apps, getAppById, getReviewsForApp, addReview, recordDownload } = useApp();
  const { showToast } = useToast();

  const app = getAppById(id || '');

  // UI States
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Review Form State
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Set document title dynamically
  useEffect(() => {
    if (app) {
      document.title = `${app.name} APK Download - AppNova`;
    } else {
      document.title = 'App Not Found - AppNova';
    }
  }, [app]);

  if (!app) {
    return (
      <div className="text-center py-20 px-4">
        <h2 className="text-2xl font-bold text-appText-primary dark:text-appText-darkPrimary mb-2">
          Application Not Found
        </h2>
        <p className="text-sm text-appText-secondary dark:text-appText-darkSecondary mb-6">
          The requested app or package does not exist or may have been unlisted.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm shadow-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Store Home
        </Link>
      </div>
    );
  }

  const reviews = getReviewsForApp(app.id);

  // Similar apps in same category or type
  const similarApps = apps
    .filter((a) => a.id !== app.id && (a.category === app.category || a.type === app.type))
    .slice(0, 6);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    showToast('App link copied to clipboard!', 'success');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) {
      showToast('Please provide your name and review text', 'warning');
      return;
    }

    setIsSubmittingReview(true);
    setTimeout(() => {
      addReview({
        appId: app.id,
        userName: newReviewName.trim(),
        rating: newReviewRating,
        comment: newReviewComment.trim(),
      });
      setIsSubmittingReview(false);
      setNewReviewName('');
      setNewReviewComment('');
      showToast('Thank you! Your review has been published.', 'success');
    }, 400);
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-appText-muted dark:text-appText-darkMuted">
        <Link to="/" className="hover:text-brand-500">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={app.type === 'game' ? '/games' : '/apps'} className="hover:text-brand-500">
          {app.type === 'game' ? 'Games' : 'Apps'}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-appText-primary dark:text-appText-darkPrimary font-medium truncate max-w-[200px]">
          {app.name}
        </span>
      </nav>

      {/* Main Hero Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-soft">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* App Icon */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-3xl overflow-hidden shadow-card border border-surface-border dark:border-slate-800 flex-shrink-0">
            <img
              src={app.icon}
              alt={app.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* App Meta Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-brand-200/50">
                {app.category}
              </span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                Verified APK
              </span>
              {app.isTrending && (
                <span className="bg-rose-50 dark:bg-rose-950/60 text-rose-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                  Trending
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-appText-primary dark:text-appText-darkPrimary tracking-tight">
              {app.name}
            </h1>
            <p className="text-sm font-medium text-brand-600 dark:text-brand-400 mt-0.5">
              {app.developer}
            </p>

            {/* Quick Stats bar */}
            <div className="flex items-center gap-6 mt-4 text-xs sm:text-sm text-appText-secondary dark:text-appText-darkSecondary divide-x divide-slate-200 dark:divide-slate-800">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 font-bold text-appText-primary dark:text-appText-darkPrimary">
                  <span>{app.rating.toFixed(1)}</span>
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                </div>
                <span className="text-[11px] text-appText-muted dark:text-appText-darkMuted">
                  {app.reviewsCount}
                </span>
              </div>

              <div className="flex flex-col pl-6">
                <span className="font-bold text-appText-primary dark:text-appText-darkPrimary">
                  {app.downloads}
                </span>
                <span className="text-[11px] text-appText-muted dark:text-appText-darkMuted">
                  Downloads
                </span>
              </div>

              <div className="flex flex-col pl-6">
                <span className="font-bold text-appText-primary dark:text-appText-darkPrimary">
                  {app.size}
                </span>
                <span className="text-[11px] text-appText-muted dark:text-appText-darkMuted">
                  APK Size
                </span>
              </div>

              <div className="hidden md:flex flex-col pl-6">
                <span className="font-bold text-appText-primary dark:text-appText-darkPrimary">
                  v{app.version}
                </span>
                <span className="text-[11px] text-appText-muted dark:text-appText-darkMuted">
                  Latest Build
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex sm:flex-col items-center gap-3 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsDownloadModalOpen(true)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-brand-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] w-full"
            >
              <Download className="w-5 h-5" />
              <span>Download APK</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-100 dark:bg-surface-darkSubtle hover:bg-slate-200 dark:hover:bg-slate-700 text-appText-secondary dark:text-appText-darkSecondary text-xs font-semibold transition-colors w-full"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share App'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Google AdSense Placement */}
      <AdBanner format="horizontal" />

      {/* Screenshots Gallery Section */}
      {app.screenshots && app.screenshots.length > 0 && (
        <section aria-label="Screenshots">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-appText-primary dark:text-appText-darkPrimary">
              App Preview & Screenshots
            </h2>
            <span className="text-xs text-appText-muted dark:text-appText-darkMuted">
              Click to enlarge
            </span>
          </div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {app.screenshots.map((shot, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedScreenshotIndex(idx);
                  setIsLightboxOpen(true);
                }}
                className="group relative flex-shrink-0 w-60 sm:w-72 aspect-[9/16] rounded-2xl overflow-hidden border border-surface-border dark:border-surface-darkBorder bg-slate-100 dark:bg-slate-800 shadow-sm transition-all hover:shadow-card hover:scale-[1.02]"
              >
                <img
                  src={shot}
                  alt={`${app.name} preview ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded-full bg-black/60 text-white text-xs font-medium backdrop-blur-sm">
                    View Fullscreen
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Description & What's New Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: About & What's New */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* About this app */}
          <section className="p-6 rounded-3xl bg-white dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder">
            <h2 className="text-lg sm:text-xl font-bold text-appText-primary dark:text-appText-darkPrimary mb-3">
              About this app
            </h2>
            <div className={`text-sm text-appText-secondary dark:text-appText-darkSecondary leading-relaxed whitespace-pre-line ${
              !isDescExpanded ? 'line-clamp-4' : ''
            }`}>
              {app.description}
            </div>
            {app.description.length > 200 && (
              <button
                type="button"
                onClick={() => setIsDescExpanded(!isDescExpanded)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 mt-3 hover:underline"
              >
                <span>{isDescExpanded ? 'Show less' : 'Read more'}</span>
                {isDescExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}

            {/* Tags */}
            {app.tags && app.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                {app.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* What's New Section */}
          <section className="p-6 rounded-3xl bg-white dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg sm:text-xl font-bold text-appText-primary dark:text-appText-darkPrimary">
                What's new in version {app.version}
              </h2>
              <span className="text-xs text-appText-muted dark:text-appText-darkMuted">
                Updated {app.lastUpdated}
              </span>
            </div>
            <ul className="space-y-2 text-sm text-appText-secondary dark:text-appText-darkSecondary">
              {app.whatsNew && app.whatsNew.length > 0 ? (
                app.whatsNew.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li className="text-xs text-slate-400">Regular performance updates and bug fixes.</li>
              )}
            </ul>
          </section>

          {/* User Reviews Section */}
          <section className="p-6 rounded-3xl bg-white dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-appText-primary dark:text-appText-darkPrimary">
                  Ratings & Reviews
                </h2>
                <p className="text-xs text-appText-muted dark:text-appText-darkMuted mt-0.5">
                  Verified user feedback and performance checks
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1.5 justify-end">
                  <span className="text-2xl font-black text-appText-primary dark:text-appText-darkPrimary">
                    {app.rating.toFixed(1)}
                  </span>
                  <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                </div>
                <RatingStars rating={app.rating} size="sm" />
              </div>
            </div>

            {/* List Reviews */}
            <div className="space-y-4 mb-8">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-surface-darkSubtle border border-slate-100 dark:border-slate-800"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={rev.userAvatar}
                        alt={rev.userName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-xs font-bold text-appText-primary dark:text-appText-darkPrimary">
                          {rev.userName}
                        </p>
                        <p className="text-[10px] text-appText-muted dark:text-appText-darkMuted">
                          {rev.date}
                        </p>
                      </div>
                    </div>
                    <RatingStars rating={rev.rating} size="sm" />
                  </div>
                  <p className="text-xs sm:text-sm text-appText-secondary dark:text-appText-darkSecondary leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>

            {/* Write a Review Form */}
            <form onSubmit={handleReviewSubmit} className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-appText-primary dark:text-appText-darkPrimary mb-3 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-brand-500" />
                Leave a Review for {app.name}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  className="px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-surface-border dark:border-surface-darkBorder outline-none focus:border-brand-500 text-appText-primary dark:text-appText-darkPrimary"
                />

                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-surface-border dark:border-surface-darkBorder">
                  <span className="text-xs font-semibold text-slate-500">Your Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        type="button"
                        key={starVal}
                        onClick={() => setNewReviewRating(starVal)}
                        className="p-0.5 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            starVal <= newReviewRating
                              ? 'text-amber-500 fill-amber-500'
                              : 'text-slate-300 dark:text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <textarea
                required
                rows={3}
                placeholder="Share your experience with this APK, download speed, and stability..."
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-surface-border dark:border-surface-darkBorder outline-none focus:border-brand-500 text-appText-primary dark:text-appText-darkPrimary mb-3"
              />

              <button
                type="submit"
                disabled={isSubmittingReview}
                className="px-5 py-2 rounded-full bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-sm transition-colors disabled:opacity-50"
              >
                {isSubmittingReview ? 'Submitting...' : 'Post Review'}
              </button>
            </form>
          </section>
        </div>

        {/* Right Column: Technical App Specifications & Security */}
        <div className="space-y-6">
          
          {/* App Specifications Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-appText-primary dark:text-appText-darkPrimary mb-4">
              Technical Specifications
            </h3>

            <div className="flex items-start gap-3">
              <Smartphone className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] text-appText-muted dark:text-appText-darkMuted">Android Compatibility</p>
                <p className="text-xs font-semibold text-appText-primary dark:text-appText-darkPrimary">
                  {app.minAndroid}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Layers className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] text-appText-muted dark:text-appText-darkMuted">Package Name</p>
                <p className="text-xs font-mono font-semibold text-appText-primary dark:text-appText-darkPrimary break-all">
                  {app.packageName}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] text-appText-muted dark:text-appText-darkMuted">Release / Updated</p>
                <p className="text-xs font-semibold text-appText-primary dark:text-appText-darkPrimary">
                  {app.lastUpdated}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileCheck2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] text-appText-muted dark:text-appText-darkMuted">File Size</p>
                <p className="text-xs font-semibold text-appText-primary dark:text-appText-darkPrimary">
                  {app.size} (APK Archive)
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <p className="text-[11px] text-appText-muted dark:text-appText-darkMuted mb-1">
                SHA-256 Checksum
              </p>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 font-mono text-[10px] text-slate-600 dark:text-slate-400 break-all select-all">
                {app.sha256}
              </div>
            </div>
          </div>

          {/* Verified Guarantee Card */}
          <div className="p-6 rounded-3xl bg-brand-50/60 dark:bg-brand-950/30 border border-brand-200/60 dark:border-brand-800/40">
            <div className="flex items-center gap-2 mb-2 text-brand-600 dark:text-brand-400">
              <ShieldCheck className="w-5 h-5" />
              <h4 className="text-sm font-bold">AppNova Clean Check</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              This package was verified with cryptographic signatures against developer certs. Zero malicious payloads, root exploits, or intrusive telemetry.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Passed all security checks
            </div>
          </div>
        </div>
      </div>

      {/* Similar Apps Carousel / Grid */}
      {similarApps.length > 0 && (
        <section aria-label="Similar Apps" className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-500" />
              <h2 className="text-lg sm:text-xl font-bold text-appText-primary dark:text-appText-darkPrimary">
                Similar Apps you might like
              </h2>
            </div>
            <Link
              to={app.type === 'game' ? '/games' : '/apps'}
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              Browse more
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {similarApps.map((simApp) => (
              <AppCard key={simApp.id} app={simApp} />
            ))}
          </div>
        </section>
      )}

      {/* Lightbox for Screenshots */}
      <ScreenshotLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        screenshots={app.screenshots}
        currentIndex={selectedScreenshotIndex}
        setCurrentIndex={setSelectedScreenshotIndex}
        appName={app.name}
      />

      {/* Download APK Verified Modal */}
      <DownloadModal
        app={app}
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        onDownloaded={(appId) => recordDownload(appId)}
      />
    </div>
  );
};
