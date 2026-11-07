import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Layers, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { CategoryItem } from '../../types';

export const AdminCategories: React.FC = () => {
  const { categories, addCategory, deleteCategory, apps } = useApp();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [type, setType] = useState<'app' | 'game' | 'all'>('app');
  const [color, setColor] = useState('#1677FF');
  const [description, setDescription] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (categories.some((c) => c.id === id)) {
      showToast('A category with this name already exists', 'warning');
      return;
    }

    const newCat: CategoryItem = {
      id,
      name: name.trim(),
      iconName: 'LayoutGrid',
      type,
      color,
      description: description.trim() || `Explore top ${name} apps and utilities`,
    };

    addCategory(newCat);
    setName('');
    setDescription('');
    showToast(`Added category "${newCat.name}"`, 'success');
  };

  const handleDelete = (id: string, catName: string) => {
    if (window.confirm(`Delete category "${catName}"?`)) {
      deleteCategory(id);
      showToast(`Deleted category "${catName}"`, 'info');
    }
  };

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/admin"
          className="p-2 rounded-2xl bg-white dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-appText-primary dark:text-appText-darkPrimary">
            Manage Categories
          </h1>
          <p className="text-xs text-appText-secondary dark:text-appText-darkSecondary">
            Organize catalog taxonomies across Apps and Games
          </p>
        </div>
      </div>

      {/* Add New Category Box */}
      <div className="p-6 rounded-3xl bg-white dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-soft">
        <h2 className="text-base font-bold text-appText-primary dark:text-appText-darkPrimary flex items-center gap-2 mb-4">
          <Plus className="w-4 h-4 text-brand-500" />
          Create New Category
        </h2>

        <form onSubmit={handleAddCategory} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-appText-secondary dark:text-appText-darkSecondary mb-1.5">
                Category Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Photography"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-surface-darkSubtle border border-surface-border dark:border-surface-darkBorder outline-none focus:border-brand-500 text-appText-primary dark:text-appText-darkPrimary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-appText-secondary dark:text-appText-darkSecondary mb-1.5">
                Category Scope
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as 'app' | 'game' | 'all')}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-surface-darkSubtle border border-surface-border dark:border-surface-darkBorder outline-none focus:border-brand-500 text-appText-primary dark:text-appText-darkPrimary cursor-pointer"
              >
                <option value="app">Apps Only</option>
                <option value="game">Games Only</option>
                <option value="all">Universal (Both)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-appText-secondary dark:text-appText-darkSecondary mb-1.5">
                Accent Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent p-0"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs font-mono rounded-xl bg-slate-50 dark:bg-surface-darkSubtle border border-surface-border dark:border-surface-darkBorder text-appText-primary dark:text-appText-darkPrimary"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-appText-secondary dark:text-appText-darkSecondary mb-1.5">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description for browse directory..."
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-surface-darkSubtle border border-surface-border dark:border-surface-darkBorder outline-none focus:border-brand-500 text-appText-primary dark:text-appText-darkPrimary"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>

      {/* Existing Categories List */}
      <div className="bg-white dark:bg-surface-darkCard rounded-3xl border border-surface-border dark:border-surface-darkBorder shadow-soft overflow-hidden p-6">
        <h2 className="text-base font-bold text-appText-primary dark:text-appText-darkPrimary mb-4">
          All Active Categories ({categories.length})
        </h2>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {categories.map((cat) => {
            const count = apps.filter(
              (a) => a.category.toLowerCase() === cat.name.toLowerCase()
            ).length;

            return (
              <div
                key={cat.id}
                className="py-3.5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <div>
                    <h3 className="text-sm font-bold text-appText-primary dark:text-appText-darkPrimary">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-appText-muted dark:text-appText-darkMuted">
                      {cat.description} • Scope: <span className="uppercase font-semibold">{cat.type}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {count} apps
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
