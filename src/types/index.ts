export type AppType = 'app' | 'game';

export interface AppItem {
  id: string;
  name: string;
  developer: string;
  category: string;
  type: AppType;
  icon: string;
  banner?: string;
  rating: number;
  reviewsCount: string;
  downloads: string;
  size: string;
  version: string;
  lastUpdated: string;
  minAndroid: string;
  packageName: string;
  description: string;
  whatsNew: string[];
  screenshots: string[];
  apkUrl: string;
  sha256: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  isPopular?: boolean;
  tags?: string[];
  customApkBlobUrl?: string; // If admin uploaded a file
  customApkFileName?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  iconName: string;
  type: 'app' | 'game' | 'all';
  color: string;
  description?: string;
}

export interface UserReview {
  id: string;
  appId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  helpfulCount: number;
}

export interface AdminUser {
  email: string;
  name: string;
  role: 'superadmin' | 'editor';
}
