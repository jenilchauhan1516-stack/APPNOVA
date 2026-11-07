import { createClient } from '@supabase/supabase-js';
import { AppItem, CategoryItem, UserReview } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-id') &&
  supabaseUrl.startsWith('https://')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (isSupabaseConfigured) {
  console.log('✅ Supabase connected successfully to Cloud Database:', supabaseUrl);
}

/**
 * Maps database row (snake_case) to frontend AppItem (camelCase)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRowToApp(row: any): AppItem {
  return {
    id: row.id,
    name: row.name,
    developer: row.developer,
    category: row.category,
    type: row.type || 'app',
    icon: row.icon,
    banner: row.banner || undefined,
    rating: Number(row.rating) || 4.5,
    reviewsCount: row.reviews_count || row.reviewsCount || '1M reviews',
    downloads: row.downloads || '10M+',
    size: row.size || '45 MB',
    version: row.version || '1.0.0',
    lastUpdated: row.last_updated || row.lastUpdated || 'Recently',
    minAndroid: row.min_android || row.minAndroid || 'Android 8.0 and up',
    packageName: row.package_name || row.packageName || 'com.example.app',
    description: row.description || '',
    whatsNew: Array.isArray(row.whats_new) ? row.whats_new : Array.isArray(row.whatsNew) ? row.whatsNew : [],
    screenshots: Array.isArray(row.screenshots) ? row.screenshots : [row.icon],
    apkUrl: row.apk_url || row.apkUrl || `https://appnova.internal/download/${row.id}.apk`,
    sha256: row.sha256 || '9f83c18b76c8137cd9e6931557d34199c0dae858db1ee6986cf339e76fef78a1',
    isFeatured: Boolean(row.is_featured ?? row.isFeatured),
    isTrending: Boolean(row.is_trending ?? row.isTrending),
    isPopular: Boolean(row.is_popular ?? row.isPopular),
    tags: Array.isArray(row.tags) ? row.tags : [],
  };
}

/**
 * Fetch all apps from Supabase
 */
export async function fetchAppsFromSupabase(): Promise<AppItem[] | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('apps')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch error:', error.message);
      return null;
    }
    return (data || []).map(mapRowToApp);
  } catch (err) {
    console.error('Failed to fetch apps from Supabase', err);
    return null;
  }
}

/**
 * Insert or update an app in Supabase
 */
export async function upsertAppToSupabase(app: AppItem): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from('apps')
      .upsert({
        id: app.id,
        name: app.name,
        developer: app.developer,
        category: app.category,
        type: app.type,
        icon: app.icon,
        banner: app.banner || null,
        rating: app.rating,
        reviews_count: app.reviewsCount,
        downloads: app.downloads,
        size: app.size,
        version: app.version,
        last_updated: app.lastUpdated,
        min_android: app.minAndroid,
        package_name: app.packageName,
        description: app.description,
        whats_new: app.whatsNew,
        screenshots: app.screenshots,
        apk_url: app.apkUrl,
        sha256: app.sha256,
        is_featured: Boolean(app.isFeatured),
        is_trending: Boolean(app.isTrending),
        is_popular: Boolean(app.isPopular),
        tags: app.tags || [],
      });

    if (error) {
      console.error('Supabase upsert error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to upsert app to Supabase', err);
    return false;
  }
}

/**
 * Delete an app from Supabase
 */
export async function deleteAppFromSupabase(id: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase.from('apps').delete().eq('id', id);
    return !error;
  } catch {
    return false;
  }
}

/**
 * Upload APK, Icon, or Screenshot to Supabase Storage Bucket
 */
export async function uploadFileToSupabaseStorage(
  bucketName: string,
  filePath: string,
  file: File | Blob
): Promise<string | null> {
  if (!supabase) return null;
  try {
    const { error } = await supabase.storage.from(bucketName).upload(filePath, file, {
      upsert: true,
    });

    if (error) {
      console.error('Storage upload error:', error.message);
      return null;
    }

    const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(filePath);
    return publicUrlData.publicUrl;
  } catch (err) {
    console.error('Storage upload exception:', err);
    return null;
  }
}

/**
 * Fetch categories from Supabase
 */
export async function fetchCategoriesFromSupabase(): Promise<CategoryItem[] | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.from('categories').select('*');
    if (error || !data) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((c: any) => ({
      id: c.id,
      name: c.name,
      iconName: c.icon_name || c.iconName || 'LayoutGrid',
      type: c.type || 'app',
      color: c.color || '#1677FF',
      description: c.description || '',
    }));
  } catch {
    return null;
  }
}

/**
 * Add user review to Supabase
 */
export async function addReviewToSupabase(review: UserReview): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase.from('reviews').insert({
      id: review.id,
      app_id: review.appId,
      user_name: review.userName,
      user_avatar: review.userAvatar,
      rating: review.rating,
      date: review.date,
      comment: review.comment,
      helpful_count: review.helpfulCount || 0,
    });
    return !error;
  } catch {
    return false;
  }
}
