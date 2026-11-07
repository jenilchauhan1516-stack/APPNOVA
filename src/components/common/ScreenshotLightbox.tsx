import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ScreenshotLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  screenshots: string[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  appName: string;
}

export const ScreenshotLightbox: React.FC<ScreenshotLightboxProps> = ({
  isOpen,
  onClose,
  screenshots,
  currentIndex,
  setCurrentIndex,
  appName,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setCurrentIndex((currentIndex - 1 + screenshots.length) % screenshots.length);
      if (e.key === 'ArrowRight') setCurrentIndex((currentIndex + 1) % screenshots.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, screenshots.length, onClose, setCurrentIndex]);

  if (!isOpen || !screenshots.length) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${appName} Screenshots`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative max-w-4xl max-h-[85vh] flex items-center justify-center">
        <img
          src={screenshots[currentIndex]}
          alt={`${appName} screenshot ${currentIndex + 1}`}
          className="max-h-[80vh] w-auto object-contain rounded-2xl shadow-2xl border border-white/10"
        />

        {screenshots.length > 1 && (
          <>
            <button
              onClick={() => setCurrentIndex((currentIndex - 1 + screenshots.length) % screenshots.length)}
              className="absolute -left-12 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentIndex((currentIndex + 1) % screenshots.length)}
              className="absolute -right-12 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Next screenshot"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
        {currentIndex + 1} of {screenshots.length}
      </div>
    </div>
  );
};
