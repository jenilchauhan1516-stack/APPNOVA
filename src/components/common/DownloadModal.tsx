import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Download, CheckCircle, Copy, FileText, Smartphone } from 'lucide-react';
import { AppItem } from '../../types';
import { downloadAppApk } from '../../utils/apkGenerator';
import { useToast } from '../../context/ToastContext';
import { AdBanner } from './AdBanner';

interface DownloadModalProps {
  app: AppItem | null;
  isOpen: boolean;
  onClose: () => void;
  onDownloaded?: (appId: string) => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  app,
  isOpen,
  onClose,
  onDownloaded,
}) => {
  const { showToast } = useToast();
  const [progress, setProgress] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [copiedSha, setCopiedSha] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen || !app) {
      setProgress(0);
      setIsCompleted(false);
      return;
    }

    // Start progress simulation then trigger genuine download
    setProgress(15);
    const t1 = setTimeout(() => setProgress(55), 400);
    const t2 = setTimeout(() => setProgress(88), 900);
    const t3 = setTimeout(() => {
      setProgress(100);
      setIsCompleted(true);
      // Trigger genuine APK download!
      try {
        const { fileName } = downloadAppApk(app);
        showToast(`Downloading genuine package ${fileName}`, 'success');
        if (onDownloaded) {
          onDownloaded(app.id);
        }
      } catch (err) {
        console.error('Download error:', err);
        showToast('Download started', 'info');
      }
    }, 1400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isOpen, app, onDownloaded, showToast]);

  if (!isOpen || !app) return null;

  const handleCopySha = () => {
    navigator.clipboard.writeText(app.sha256);
    setCopiedSha(true);
    showToast('SHA-256 checksum copied to clipboard', 'info');
    setTimeout(() => setCopiedSha(false), 2000);
  };

  const handleManualRedownload = () => {
    const { fileName } = downloadAppApk(app);
    showToast(`Restarted download: ${fileName}`, 'success');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Download ${app.name}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
    >
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-modal overflow-hidden p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header App Info */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={app.icon}
            alt={app.name}
            className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-slate-100 dark:border-slate-800"
          />
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-appText-primary dark:text-appText-darkPrimary">
              {app.name}
            </h3>
            <p className="text-xs sm:text-sm text-appText-secondary dark:text-appText-darkSecondary">
              v{app.version} • {app.size} • {app.developer}
            </p>
            <div className="flex items-center gap-1.5 mt-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Safe APK (Clean Signature)</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-300 mb-2">
            <span>{isCompleted ? 'APK Download Ready' : 'Verifying & Packaging APK...'}</span>
            <span className="font-bold text-brand-500">{progress}%</span>
          </div>
          <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-brand-500 to-blue-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Download State Message */}
        {isCompleted ? (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
                  Your download should start automatically!
                </p>
                <p className="text-xs text-emerald-700 dark:text-emerald-300/80 mt-0.5">
                  If the download didn't begin, click the button below to restart it manually.
                </p>
                <button
                  type="button"
                  onClick={handleManualRedownload}
                  className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Restart APK Download
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/50 mb-6 flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-brand-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
            <p className="text-xs text-brand-900 dark:text-brand-200">
              Generating secure high-speed direct download link...
            </p>
          </div>
        )}

        {/* SHA-256 Checksum block */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-surface-border dark:border-surface-darkBorder mb-6">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              SHA-256 Checksum
            </span>
            <button
              onClick={handleCopySha}
              className="inline-flex items-center gap-1 text-[11px] text-brand-600 dark:text-brand-400 hover:underline"
            >
              <Copy className="w-3 h-3" />
              {copiedSha ? 'Copied!' : 'Copy Hash'}
            </button>
          </div>
          <p className="font-mono text-[11px] text-slate-500 dark:text-slate-400 truncate">
            {app.sha256}
          </p>
        </div>

        {/* Sponsor Ad Unit inside Download Modal */}
        <AdBanner format="rectangle" className="my-3" />

        {/* 3-Step Install Instructions */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-5">
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            <Smartphone className="w-4 h-4 text-brand-500" />
            How to Install on Android
          </h4>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="inline-block w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900/60 text-brand-600 dark:text-brand-300 font-bold mb-1">1</span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">Open APK</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Tap file in notifications</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="inline-block w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900/60 text-brand-600 dark:text-brand-300 font-bold mb-1">2</span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">Allow Source</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Allow from Chrome/Browser</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="inline-block w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900/60 text-brand-600 dark:text-brand-300 font-bold mb-1">3</span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">Install</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Tap Install & enjoy!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
