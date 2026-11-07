import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Smartphone, Gamepad2, LayoutGrid, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileNav: React.FC = () => {
  const { isAdminAuthenticated } = useApp();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-surface-darkCard/95 backdrop-blur-lg border-t border-surface-border dark:border-surface-darkBorder py-1.5 px-3">
      <div className="flex items-center justify-around">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              isActive
                ? 'text-brand-500 font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`
          }
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Home</span>
        </NavLink>

        <NavLink
          to="/apps"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              isActive
                ? 'text-brand-500 font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`
          }
        >
          <Smartphone className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Apps</span>
        </NavLink>

        <NavLink
          to="/games"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              isActive
                ? 'text-brand-500 font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`
          }
        >
          <Gamepad2 className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Games</span>
        </NavLink>

        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              isActive
                ? 'text-brand-500 font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`
          }
        >
          <LayoutGrid className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Categories</span>
        </NavLink>

        <NavLink
          to={isAdminAuthenticated ? '/admin' : '/admin/login'}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              isActive
                ? 'text-brand-500 font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`
          }
        >
          <Shield className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">{isAdminAuthenticated ? 'Admin' : 'Login'}</span>
        </NavLink>
      </div>
    </nav>
  );
};
