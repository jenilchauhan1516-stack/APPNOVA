import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  X,
  Sun,
  Moon,
  Shield,
  Smartphone,
  Gamepad2,
  LayoutGrid,
  Home,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const { apps, isDark, toggleDarkMode, isAdminAuthenticated } = useApp();
  const [localQuery, setLocalQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile search on route change
  useEffect(() => {
    setIsMobileSearchOpen(false);
    setShowSuggestions(false);
  }, [location.pathname]);

  // Suggestions logic
  const filteredSuggestions = localQuery.trim()
    ? apps.filter((app) =>
        app.name.toLowerCase().includes(localQuery.toLowerCase()) ||
        app.category.toLowerCase().includes(localQuery.toLowerCase()) ||
        app.developer.toLowerCase().includes(localQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      setShowSuggestions(false);
      setIsMobileSearchOpen(false);
      navigate(`/search?q=${encodeURIComponent(localQuery.trim())}`);
    }
  };

  const handleSelectApp = (appId: string) => {
    setShowSuggestions(false);
    setLocalQuery('');
    navigate(`/app/${appId}`);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-surface-dark/95 backdrop-blur-md border-b border-surface-border dark:border-surface-darkBorder transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo & Main Nav */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              {/* AppNova Modern App Icon */}
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-blue-400 p-0.5 shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
                <div className="w-full h-full bg-white dark:bg-surface-darkCard rounded-[14px] flex items-center justify-center overflow-hidden">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white">
                    <span className="font-extrabold text-sm tracking-tighter">AN</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-tight text-appText-primary dark:text-appText-darkPrimary">
                    App<span className="text-brand-500">Nova</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200/50 dark:border-brand-800/40">
                    APK
                  </span>
                </div>
                <span className="text-[10px] text-appText-muted dark:text-appText-darkMuted -mt-1 hidden sm:block">
                  Verified Android Store
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400'
                      : 'text-appText-secondary dark:text-appText-darkSecondary hover:text-brand-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`
                }
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </NavLink>

              <NavLink
                to="/apps"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400'
                      : 'text-appText-secondary dark:text-appText-darkSecondary hover:text-brand-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`
                }
              >
                <Smartphone className="w-4 h-4" />
                <span>Apps</span>
              </NavLink>

              <NavLink
                to="/games"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400'
                      : 'text-appText-secondary dark:text-appText-darkSecondary hover:text-brand-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`
                }
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Games</span>
              </NavLink>

              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400'
                      : 'text-appText-secondary dark:text-appText-darkSecondary hover:text-brand-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`
                }
              >
                <LayoutGrid className="w-4 h-4" />
                <span>Categories</span>
              </NavLink>
            </nav>
          </div>

          {/* Search Bar & Actions */}
          <div className="flex items-center gap-3">
            {/* Desktop Search Bar */}
            <div ref={searchContainerRef} className="relative hidden sm:block w-64 md:w-80 lg:w-96">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={localQuery}
                    onChange={(e) => {
                      setLocalQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Search apps, games, tools..."
                    className="w-full pl-10 pr-9 py-2.5 text-sm rounded-full bg-slate-100 dark:bg-surface-darkSubtle border border-transparent focus:border-brand-500 focus:bg-white dark:focus:bg-surface-darkCard text-appText-primary dark:text-appText-darkPrimary placeholder-appText-muted dark:placeholder-appText-darkMuted transition-all outline-none"
                  />
                  <Search className="absolute left-3.5 w-4 h-4 text-appText-muted dark:text-appText-darkMuted pointer-events-none" />
                  {localQuery && (
                    <button
                      type="button"
                      onClick={() => setLocalQuery('')}
                      className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </form>

              {/* Suggestions Dropdown */}
              {showSuggestions && localQuery.trim() && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-white dark:bg-surface-darkCard rounded-2xl shadow-modal border border-surface-border dark:border-surface-darkBorder py-2 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Instant Suggestions
                  </div>
                  {filteredSuggestions.length > 0 ? (
                    <div>
                      {filteredSuggestions.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelectApp(item.id)}
                          className="w-full flex items-center gap-3 px-3.5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-colors"
                        >
                          <img
                            src={item.icon}
                            alt={item.name}
                            className="w-8 h-8 rounded-xl object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-appText-primary dark:text-appText-darkPrimary truncate">
                              {item.name}
                            </p>
                            <p className="text-xs text-appText-secondary dark:text-appText-darkSecondary truncate">
                              {item.category} • {item.developer}
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-amber-500">
                            ★ {item.rating.toFixed(1)}
                          </span>
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={handleSearchSubmit}
                        className="w-full text-center py-2.5 mt-1 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:bg-brand-50/50 dark:hover:bg-slate-800/60"
                      >
                        See all results for "{localQuery}"
                      </button>
                    </div>
                  ) : (
                    <div className="px-4 py-4 text-center text-xs text-slate-500">
                      No matching apps found for "{localQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="sm:hidden p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Admin Portal Button */}
            <Link
              to={isAdminAuthenticated ? '/admin' : '/admin/login'}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isAdminAuthenticated
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 hover:bg-emerald-100'
                  : 'bg-slate-100 dark:bg-surface-darkSubtle text-appText-secondary dark:text-appText-darkSecondary hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-slate-800'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {isAdminAuthenticated ? 'Admin Panel' : 'Admin'}
              </span>
              {isAdminAuthenticated && (
                <CheckCircle2 className="w-3 h-3 text-emerald-500 hidden sm:inline" />
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search Overlay Form */}
        {isMobileSearchOpen && (
          <div className="sm:hidden pb-3 pt-1 border-t border-slate-100 dark:border-slate-800 animate-in fade-in">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                autoFocus
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Search APKs, games, tools..."
                className="w-full pl-10 pr-9 py-2.5 text-sm rounded-full bg-slate-100 dark:bg-surface-darkSubtle border border-slate-200 dark:border-surface-darkBorder text-appText-primary dark:text-appText-darkPrimary outline-none focus:border-brand-500"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              {localQuery && (
                <button
                  type="button"
                  onClick={() => setLocalQuery('')}
                  className="absolute right-3 top-2.5 p-1 text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>
          </div>
        )}
      </div>
    </header>
  );
};
