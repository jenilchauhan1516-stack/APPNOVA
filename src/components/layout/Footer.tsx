import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Download, Heart, Smartphone, Lock, FileCode, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { isAdminAuthenticated } = useApp();

  return (
    <footer className="w-full bg-white dark:bg-surface-dark border-t border-surface-border dark:border-surface-darkBorder pt-12 pb-24 md:pb-12 text-sm text-appText-secondary dark:text-appText-darkSecondary transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 p-0.5 shadow-sm">
                <div className="w-full h-full bg-white dark:bg-surface-darkCard rounded-[10px] flex items-center justify-center text-brand-600 dark:text-brand-400 font-black text-sm">
                  AN
                </div>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-appText-primary dark:text-appText-darkPrimary">
                App<span className="text-brand-500">Nova</span>
              </span>
            </Link>
            <p className="text-xs text-appText-muted dark:text-appText-darkMuted leading-relaxed max-w-sm mb-4">
              AppNova is the modern, independent platform for safe, fast, and verified Android application packages (APK). 100% genuine builds signed by original developers.
            </p>
            <div className="flex items-center gap-3 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>Scanned with Google Play Protect & AppNova Shield</span>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-appText-primary dark:text-appText-darkPrimary mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-brand-500 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/apps" className="hover:text-brand-500 transition-colors">
                  Popular Apps
                </Link>
              </li>
              <li>
                <Link to="/games" className="hover:text-brand-500 transition-colors">
                  Android Games
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-brand-500 transition-colors">
                  Category Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-appText-primary dark:text-appText-darkPrimary mb-3">
              Trust & Security
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-brand-500" />
                <span>Malware Free Guarantee</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-brand-500" />
                <span>APK Signature Match</span>
              </li>
              <li className="flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-brand-500" />
                <span>Original Untouched Files</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-brand-500" />
                <span>Direct CDN Downloads</span>
              </li>
            </ul>
          </div>

          {/* Support & Community */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-appText-primary dark:text-appText-darkPrimary mb-3">
              Support & Info
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-brand-500 transition-colors">
                  About AppNova
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-brand-500 transition-colors">
                  App Categories
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-brand-500 transition-colors">
                  Admin Portal
                </Link>
              </li>
              <li>
                <span className="hover:text-brand-500 transition-colors cursor-pointer">
                  Developer Inquiries
                </span>
              </li>
              <li>
                <span className="hover:text-brand-500 transition-colors cursor-pointer">
                  Report Broken Link
                </span>
              </li>
              {isAdminAuthenticated && (
                <li className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <Link to="/admin" className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
                    <Shield className="w-3 h-3" />
                    <span>Admin Dashboard</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-slate-100 dark:border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-appText-muted dark:text-appText-darkMuted">
          <p>© {new Date().getFullYear()} AppNova. All trademarks, logos and screenshots belong to their respective developers.</p>
          <div className="flex items-center gap-4">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">DMCA Notice</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
