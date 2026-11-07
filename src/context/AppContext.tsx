import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppItem, CategoryItem, UserReview, AdminUser } from '../types';
import { INITIAL_APPS, INITIAL_CATEGORIES, INITIAL_REVIEWS } from '../data/mockApps';
import {
  isSupabaseConfigured,
  fetchAppsFromSupabase,
  upsertAppToSupabase,
  deleteAppFromSupabase,
} from '../services/supabase';

interface AppContextType {
  apps: AppItem[];
  categories: CategoryItem[];
  reviews: UserReview[];
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  // App operations
  getAppById: (id: string) => AppItem | undefined;
  addApp: (app: AppItem) => Promise<boolean>;
  updateApp: (id: string, updated: Partial<AppItem>) => Promise<boolean>;
  deleteApp: (id: string) => Promise<boolean>;
  toggleFeatured: (id: string) => void;
  toggleTrending: (id: string) => void;
  recordDownload: (appId: string) => void;
  // Category operations
  addCategory: (category: CategoryItem) => void;
  deleteCategory: (id: string) => void;
  // Reviews
  getReviewsForApp: (appId: string) => UserReview[];
  addReview: (review: { appId: string; userName: string; rating: number; comment: string }) => void;
  // Admin auth
  adminUser: AdminUser | null;
  isAdminAuthenticated: boolean;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;
  // Reset
  resetToDefault: () => void;
  // Dark mode
  isDark: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const APPS_STORAGE_KEY = 'appnova_apps_v1';
const CATS_STORAGE_KEY = 'appnova_categories_v1';
const REVIEWS_STORAGE_KEY = 'appnova_reviews_v1';
const ADMIN_STORAGE_KEY = 'appnova_admin_auth_v1';
const THEME_STORAGE_KEY = 'appnova_theme_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apps, setApps] = useState<AppItem[]>(() => {
    try {
      const saved = localStorage.getItem(APPS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_APPS;
    } catch {
      return INITIAL_APPS;
    }
  });

  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(CATS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  const [reviews, setReviews] = useState<UserReview[]>(() => {
    try {
      const saved = localStorage.getItem(REVIEWS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem(ADMIN_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved !== null) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // If Supabase is connected, fetch cloud apps on launch
  useEffect(() => {
    if (isSupabaseConfigured) {
      setIsLoading(true);
      fetchAppsFromSupabase()
        .then((cloudApps) => {
          if (cloudApps && cloudApps.length > 0) {
            setApps((prevApps) => {
              const cloudIds = new Set(cloudApps.map((a) => a.id));
              const localRemaining = prevApps.filter((a) => !cloudIds.has(a.id));
              return [...cloudApps, ...localRemaining];
            });
          }
        })
        .catch((err) => console.error('Supabase fetch error:', err))
        .finally(() => setIsLoading(false));
    }
  }, []);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(apps));
    } catch (e) {
      console.error('Failed to save apps to localStorage', e);
    }
  }, [apps]);

  useEffect(() => {
    try {
      localStorage.setItem(CATS_STORAGE_KEY, JSON.stringify(categories));
    } catch (e) {
      console.error('Failed to save categories', e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    } catch (e) {
      console.error('Failed to save reviews', e);
    }
  }, [reviews]);

  useEffect(() => {
    if (adminUser) {
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminUser));
    } else {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    }
  }, [adminUser]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'light');
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };

  const getAppById = (id: string) => {
    return apps.find((app) => app.id === id);
  };

  const addApp = async (newApp: AppItem): Promise<boolean> => {
    setApps((prev) => [newApp, ...prev.filter((a) => a.id !== newApp.id)]);
    if (isSupabaseConfigured) {
      return await upsertAppToSupabase(newApp);
    }
    return true;
  };

  const updateApp = async (id: string, updatedFields: Partial<AppItem>): Promise<boolean> => {
    let targetApp: AppItem | undefined;
    setApps((prev) =>
      prev.map((app) => {
        if (app.id === id) {
          targetApp = { ...app, ...updatedFields };
          return targetApp;
        }
        return app;
      })
    );
    if (isSupabaseConfigured && targetApp) {
      return await upsertAppToSupabase(targetApp);
    }
    return true;
  };

  const deleteApp = async (id: string): Promise<boolean> => {
    setApps((prev) => prev.filter((app) => app.id !== id));
    if (isSupabaseConfigured) {
      return await deleteAppFromSupabase(id);
    }
    return true;
  };

  const toggleFeatured = (id: string) => {
    setApps((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, isFeatured: !app.isFeatured } : app
      )
    );
  };

  const toggleTrending = (id: string) => {
    setApps((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, isTrending: !app.isTrending } : app
      )
    );
  };

  const recordDownload = (appId: string) => {
    // Increment local download count visual indicator if numeric or keep label
    setApps((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          return {
            ...app,
            // Keep stats refreshed
            lastUpdated: 'Just now',
          };
        }
        return app;
      })
    );
  };

  const addCategory = (category: CategoryItem) => {
    setCategories((prev) => [...prev, category]);
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const getReviewsForApp = (appId: string) => {
    return reviews.filter((r) => r.appId === appId);
  };

  const addReview = (reviewData: { appId: string; userName: string; rating: number; comment: string }) => {
    const newRev: UserReview = {
      id: 'rev-' + Date.now(),
      appId: reviewData.appId,
      userName: reviewData.userName,
      userAvatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80`,
      rating: reviewData.rating,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      comment: reviewData.comment,
      helpfulCount: 0,
    };
    setReviews((prev) => [newRev, ...prev]);
  };

  const loginAdmin = (email: string, pass: string): boolean => {
    // Default admin demo credentials: admin@appnova.io / admin123
    // or any standard email format for demo flexibility
    if ((email.trim().toLowerCase() === 'admin@appnova.io' || email.trim().toLowerCase() === 'admin@gmail.com') && pass === 'admin123') {
      const user: AdminUser = {
        email: email.trim().toLowerCase(),
        name: 'AppNova Administrator',
        role: 'superadmin',
      };
      setAdminUser(user);
      return true;
    }
    // Simple demo validation: accept any email with password 'admin123'
    if (email.includes('@') && pass === 'admin123') {
      const user: AdminUser = {
        email: email.trim(),
        name: email.split('@')[0],
        role: 'superadmin',
      };
      setAdminUser(user);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setAdminUser(null);
  };

  const resetToDefault = () => {
    setApps(INITIAL_APPS);
    setCategories(INITIAL_CATEGORIES);
    setReviews(INITIAL_REVIEWS);
    localStorage.removeItem(APPS_STORAGE_KEY);
    localStorage.removeItem(CATS_STORAGE_KEY);
    localStorage.removeItem(REVIEWS_STORAGE_KEY);
  };

  return (
    <AppContext.Provider
      value={{
        apps,
        categories,
        reviews,
        isLoading,
        searchQuery,
        setSearchQuery,
        getAppById,
        addApp,
        updateApp,
        deleteApp,
        toggleFeatured,
        toggleTrending,
        recordDownload,
        addCategory,
        deleteCategory,
        getReviewsForApp,
        addReview,
        adminUser,
        isAdminAuthenticated: !!adminUser,
        loginAdmin,
        logoutAdmin,
        resetToDefault,
        isDark,
        toggleDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
