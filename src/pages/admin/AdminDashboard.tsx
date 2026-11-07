import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Star,
  Flame,
  Layers,
  Smartphone,
  Gamepad2,
  RotateCcw,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';

export const AdminDashboard: React.FC = () => {
  const {
    apps,
    categories,
    deleteApp,
    toggleFeatured,
    toggleTrending,
    resetToDefault,
    logoutAdmin,
    adminUser,
  } = useApp();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'app' | 'game'>('all');
  const [deleteCandidateId, setDeleteCandidateId] = useState<string | null>(null);

  // Stats
  const totalApps = apps.filter((a) => a.type === 'app').length;
  const totalGames = apps.filter((a) => a.type === 'game').length;
  const totalFeatured = apps.filter((a) => a.isFeatured).length;
  const totalTrending = apps.filter((a) => a.isTrending).length;

  const filteredApps = apps.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.developer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || app.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDelete = (id: string, name: string) => {
    deleteApp(id);
    setDeleteCandidateId(null);
    showToast(`App "${name}" was deleted successfully`, 'info');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all apps and categories to default factory sample data? Custom additions will be cleared.')) {
      resetToDefault();
      showToast('Database reset to original sample state', 'info');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    showToast('Signed out from Admin', 'info');
    navigate('/admin/login');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner / User Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-soft">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-brand-500/20">
            A
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-appText-primary dark:text-appText-darkPrimary">
                Admin Dashboard
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                Superadmin
              </span>
            </div>
            <p className="text-xs text-appText-secondary dark:text-appText-darkSecondary mt-0.5">
              Signed in as <span className="font-semibold text-slate-800 dark:text-slate-200">{adminUser?.email || 'admin@appnova.io'}</span>
            </p>
          </div>
        </div>

        {/* Global Dashboard Actions */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            to="/admin/apps/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs sm:text-sm shadow-md shadow-brand-500/20 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>Add New App</span>
          </Link>

          <Link
            to="/admin/categories"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-slate-100 dark:bg-surface-darkSubtle hover:bg-slate-200 dark:hover:bg-slate-700 text-appText-secondary dark:text-appText-darkSecondary font-semibold text-xs sm:text-sm transition-colors"
          >
            <Layers className="w-4 h-4" />
            <span>Categories</span>
          </Link>

          <button
            type="button"
            onClick={handleResetData}
            title="Reset to default mock data"
            className="p-2 rounded-2xl bg-slate-100 dark:bg-surface-darkSubtle hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
            aria-label="Reset database to default sample data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleLogout}
            title="Sign Out"
            className="p-2 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-appText-muted dark:text-appText-darkMuted">
              Android Apps
            </span>
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-500">
              <Smartphone className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-appText-primary dark:text-appText-darkPrimary">
            {totalApps}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Listed applications</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-appText-muted dark:text-appText-darkMuted">
              Android Games
            </span>
            <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-500">
              <Gamepad2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-appText-primary dark:text-appText-darkPrimary">
            {totalGames}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Action, arcade & sim</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-appText-muted dark:text-appText-darkMuted">
              Featured Spotlights
            </span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500">
              <Star className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-appText-primary dark:text-appText-darkPrimary">
            {totalFeatured}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Active on home carousel</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-appText-muted dark:text-appText-darkMuted">
              Trending Apps
            </span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-500">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-appText-primary dark:text-appText-darkPrimary">
            {totalTrending}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">High install momentum</p>
        </div>
      </div>

      {/* App Inventory Management Table */}
      <div className="bg-white dark:bg-surface-darkCard rounded-3xl border border-surface-border dark:border-surface-darkBorder shadow-soft overflow-hidden">
        {/* Table Filters Header */}
        <div className="p-5 border-b border-surface-border dark:border-surface-darkBorder flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search apps by name, developer..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-surface-darkSubtle border border-surface-border dark:border-surface-darkBorder outline-none focus:border-brand-500 text-appText-primary dark:text-appText-darkPrimary"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                filterType === 'all'
                  ? 'bg-brand-500 text-white'
                  : 'bg-slate-100 dark:bg-surface-darkSubtle text-slate-600 dark:text-slate-300'
              }`}
            >
              All ({apps.length})
            </button>
            <button
              onClick={() => setFilterType('app')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                filterType === 'app'
                  ? 'bg-brand-500 text-white'
                  : 'bg-slate-100 dark:bg-surface-darkSubtle text-slate-600 dark:text-slate-300'
              }`}
            >
              Apps ({totalApps})
            </button>
            <button
              onClick={() => setFilterType('game')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                filterType === 'game'
                  ? 'bg-brand-500 text-white'
                  : 'bg-slate-100 dark:bg-surface-darkSubtle text-slate-600 dark:text-slate-300'
              }`}
            >
              Games ({totalGames})
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/75 dark:bg-surface-darkSubtle/50 text-appText-muted dark:text-appText-darkMuted font-bold uppercase tracking-wider text-[11px] border-b border-surface-border dark:border-surface-darkBorder">
                <th className="py-3 px-4">Application</th>
                <th className="py-3 px-4">Category & Type</th>
                <th className="py-3 px-4">Version / Size</th>
                <th className="py-3 px-4 text-center">Featured</th>
                <th className="py-3 px-4 text-center">Trending</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredApps.map((app) => (
                <tr
                  key={app.id}
                  className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                >
                  {/* App Info */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={app.icon}
                        alt={app.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-800 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-appText-primary dark:text-appText-darkPrimary truncate max-w-[160px] sm:max-w-xs">
                          {app.name}
                        </p>
                        <p className="text-[11px] text-appText-muted dark:text-appText-darkMuted truncate">
                          {app.developer}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category & Type */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-appText-secondary dark:text-appText-darkSecondary">
                        {app.category}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase">
                        {app.type}
                      </span>
                    </div>
                  </td>

                  {/* Version & Size */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                      v{app.version}
                    </span>
                    <span className="text-[11px] text-slate-400 block">{app.size}</span>
                  </td>

                  {/* Featured Toggle */}
                  <td className="py-3 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        toggleFeatured(app.id);
                        showToast(`Updated featured status for ${app.name}`, 'info');
                      }}
                      className={`p-1.5 rounded-xl transition-colors ${
                        app.isFeatured
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600'
                          : 'text-slate-300 hover:text-slate-400'
                      }`}
                      title={app.isFeatured ? 'Featured on Home Carousel' : 'Not Featured'}
                    >
                      <Star className={`w-4 h-4 ${app.isFeatured ? 'fill-amber-500' : ''}`} />
                    </button>
                  </td>

                  {/* Trending Toggle */}
                  <td className="py-3 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        toggleTrending(app.id);
                        showToast(`Updated trending status for ${app.name}`, 'info');
                      }}
                      className={`p-1.5 rounded-xl transition-colors ${
                        app.isTrending
                          ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-600'
                          : 'text-slate-300 hover:text-slate-400'
                      }`}
                      title={app.isTrending ? 'Marked as Trending' : 'Not Trending'}
                    >
                      <Flame className={`w-4 h-4 ${app.isTrending ? 'fill-rose-500' : ''}`} />
                    </button>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        to={`/app/${app.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-brand-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="View Public Store Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <Link
                        to={`/admin/apps/edit/${app.id}`}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-brand-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Edit App Details"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => setDeleteCandidateId(app.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Delete App"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredApps.length === 0 && (
          <div className="py-12 text-center text-xs text-slate-400">
            No applications match your search filter.
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteCandidateId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-surface-darkCard p-6 border border-surface-border dark:border-surface-darkBorder shadow-modal">
            <h3 className="text-base font-bold text-appText-primary dark:text-appText-darkPrimary mb-2">
              Confirm Delete
            </h3>
            <p className="text-xs text-appText-secondary dark:text-appText-darkSecondary mb-5">
              Are you sure you want to remove this application? The APK package and metadata will be permanently unlisted.
            </p>
            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteCandidateId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const target = apps.find((a) => a.id === deleteCandidateId);
                  if (target) handleDelete(target.id, target.name);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-sm"
              >
                Delete App
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
