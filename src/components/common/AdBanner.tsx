import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  adSlot?: string;
  format?: 'horizontal' | 'rectangle' | 'in-feed';
  className?: string;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adsbygoogle?: any[];
  }
}

export const AdBanner: React.FC<AdBannerProps> = ({
  adSlot = '1234567890',
  format = 'horizontal',
  className = '',
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const adsenseClientId = import.meta.env.VITE_ADSENSE_CLIENT_ID || '';
  const isLiveAdSense = Boolean(adsenseClientId && adsenseClientId.startsWith('ca-pub-'));

  useEffect(() => {
    if (isLiveAdSense) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.warn('AdSense load notice:', err);
      }
    }
  }, [isLiveAdSense]);

  return (
    <div
      ref={adRef}
      className={`relative w-full rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/60 dark:bg-surface-darkSubtle/40 p-3 my-4 text-center ${className}`}
    >
      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-1">
        <span>Advertisement</span>
        <span>Google AdSense</span>
      </div>

      {isLiveAdSense ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adsenseClientId}
          data-ad-slot={adSlot}
          data-ad-format={format === 'horizontal' ? 'auto' : 'rectangle'}
          data-full-width-responsive="true"
        />
      ) : (
        /* Clean placeholder preview before AdSense approval */
        <div
          className={`flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 dark:border-slate-700/60 bg-white/60 dark:bg-surface-darkCard/60 ${
            format === 'horizontal' ? 'h-24 sm:h-28' : 'h-48'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AdSense Placement Area ({format.toUpperCase()})</span>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 max-w-md px-4">
            Connect your AdSense Publisher ID in <code className="text-brand-500 font-mono text-[10px]">.env</code> to display live Google Ads here.
          </p>
        </div>
      )}
    </div>
  );
};
