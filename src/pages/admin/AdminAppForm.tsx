import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Upload,
  Image,
  FileCheck2,
  Eye,
  CheckCircle2,
  Trash2,
  Plus,
  ShieldCheck,
  Smartphone,
  Star,
  Layers,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { AppItem, AppType } from '../../types';
import { AppCard } from '../../components/common/AppCard';

export const AdminAppForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { apps, categories, addApp, updateApp, getAppById } = useApp();
  const { showToast } = useToast();

  const existingApp = id ? getAppById(id) : undefined;

  // Form State
  const [name, setName] = useState('');
  const [developer, setDeveloper] = useState('');
  const [category, setCategory] = useState('Communication');
  const [type, setType] = useState<AppType>('app');
  const [icon, setIcon] = useState('');
  const [banner, setBanner] = useState('');
  const [rating, setRating] = useState(4.5);
  const [reviewsCount, setReviewsCount] = useState('1M reviews');
  const [downloads, setDownloads] = useState('10M+');
  const [size, setSize] = useState('45.0 MB');
  const [version, setVersion] = useState('1.0.0');
  const [lastUpdated, setLastUpdated] = useState('Today');
  const [minAndroid, setMinAndroid] = useState('Android 8.0 and up');
  const [packageName, setPackageName] = useState('com.example.app');
  const [description, setDescription] = useState('');
  const [whatsNewInput, setWhatsNewInput] = useState('');
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [screenshotInput, setScreenshotInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [apkUrl, setApkUrl] = useState('');
  const [sha256, setSha256] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [isPopular, setIsPopular] = useState(false);

  // Custom APK file upload state
  const [customApkFileName, setCustomApkFileName] = useState('');
  const [customApkBlobUrl, setCustomApkBlobUrl] = useState('');

  // Live Preview Modal
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Load existing app if editing
  useEffect(() => {
    if (isEditMode && existingApp) {
      setName(existingApp.name);
      setDeveloper(existingApp.developer);
      setCategory(existingApp.category);
      setType(existingApp.type);
      setIcon(existingApp.icon);
      setBanner(existingApp.banner || '');
      setRating(existingApp.rating);
      setReviewsCount(existingApp.reviewsCount);
      setDownloads(existingApp.downloads);
      setSize(existingApp.size);
      setVersion(existingApp.version);
      setLastUpdated(existingApp.lastUpdated);
      setMinAndroid(existingApp.minAndroid);
      setPackageName(existingApp.packageName);
      setDescription(existingApp.description);
      setWhatsNewInput(existingApp.whatsNew.join('\n'));
      setScreenshots(existingApp.screenshots || []);
      setTagsInput(existingApp.tags ? existingApp.tags.join(', ') : '');
      setApkUrl(existingApp.apkUrl);
      setSha256(existingApp.sha256);
      setIsFeatured(Boolean(existingApp.isFeatured));
      setIsTrending(Boolean(existingApp.isTrending));
      setIsPopular(Boolean(existingApp.isPopular));
      if (existingApp.customApkFileName) {
        setCustomApkFileName(existingApp.customApkFileName);
      }
      if (existingApp.customApkBlobUrl) {
        setCustomApkBlobUrl(existingApp.customApkBlobUrl);
      }
    } else {
      // Default dates and random SHA
      setLastUpdated(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
      setSha256(Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''));
    }
  }, [isEditMode, existingApp]);

  // Handle Icon File Upload with Auto-Optimization
  const handleIconFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const img = new window.Image();
      const reader = new FileReader();
      reader.onload = (event) => {
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_SIZE = 256;
          let w = img.width;
          let h = img.height;
          if (w > h) {
            if (w > MAX_SIZE) {
              h = Math.round((h * MAX_SIZE) / w);
              w = MAX_SIZE;
            }
          } else {
            if (h > MAX_SIZE) {
              w = Math.round((w * MAX_SIZE) / h);
              h = MAX_SIZE;
            }
          }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, w, h);
          const compressed = canvas.toDataURL('image/jpeg', 0.85);
          setIcon(compressed);
          showToast('App icon uploaded & optimized', 'success');
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Banner File Upload
  const handleBannerFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const img = new window.Image();
      const reader = new FileReader();
      reader.onload = (event) => {
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_W = 800;
          let w = img.width;
          let h = img.height;
          if (w > MAX_W) {
            h = Math.round((h * MAX_W) / w);
            w = MAX_W;
          }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, w, h);
          const compressed = canvas.toDataURL('image/jpeg', 0.8);
          setBanner(compressed);
          showToast('App banner uploaded', 'success');
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Screenshot Upload with Auto-Optimization
  const handleScreenshotFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        const img = new window.Image();
        const reader = new FileReader();
        reader.onload = (event) => {
          img.src = event.target?.result as string;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_W = 600;
            let w = img.width;
            let h = img.height;
            if (w > MAX_W) {
              h = Math.round((h * MAX_W) / w);
              w = MAX_W;
            }
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, w, h);
            const compressed = canvas.toDataURL('image/jpeg', 0.8);
            setScreenshots((prev) => [...prev, compressed]);
          };
        };
        reader.readAsDataURL(file);
      });
      showToast(`Added and optimized ${files.length} screenshot(s)`, 'success');
    }
  };

  // Handle APK File Upload
  const handleApkFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setCustomApkBlobUrl(blobUrl);
      setCustomApkFileName(file.name);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      setSize(sizeMb);
      showToast(`Uploaded APK "${file.name}" (${sizeMb})`, 'success');
    }
  };

  const handleAddScreenshotUrl = () => {
    if (screenshotInput.trim()) {
      setScreenshots((prev) => [...prev, screenshotInput.trim()]);
      setScreenshotInput('');
    }
  };

  const handleRemoveScreenshot = (index: number) => {
    setScreenshots((prev) => prev.filter((_, i) => i !== index));
  };

  // Construct draft object for live preview
  const draftApp: AppItem = {
    id: isEditMode && existingApp ? existingApp.id : name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: name || 'Untitled Application',
    developer: developer || 'Unknown Developer',
    category,
    type,
    icon: icon || 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=160&auto=format&fit=crop&q=80',
    banner: banner || icon,
    rating: Number(rating) || 4.5,
    reviewsCount,
    downloads,
    size,
    version,
    lastUpdated,
    minAndroid,
    packageName: packageName || 'com.appnova.package',
    description: description || 'No description provided yet.',
    whatsNew: whatsNewInput.split('\n').filter((l) => l.trim().length > 0),
    screenshots: screenshots.length > 0 ? screenshots : [icon],
    apkUrl: apkUrl || `https://appnova.internal/download/${packageName || 'app'}.apk`,
    sha256: sha256 || '9f83c18b76c8137cd9e6931557d34199c0dae858db1ee6986cf339e76fef78a1',
    isFeatured,
    isTrending,
    isPopular,
    tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
    customApkBlobUrl,
    customApkFileName,
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !developer.trim() || !icon.trim()) {
      showToast('Please fill out App Name, Developer, and Icon', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      const cleanSlug = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      const uniqueId = isEditMode && existingApp
        ? existingApp.id
        : (cleanSlug || 'app') + '-' + Date.now().toString(36);

      const finalApp: AppItem = {
        ...draftApp,
        id: uniqueId,
        packageName: packageName.trim() || `com.appnova.${uniqueId.replace(/[^a-z0-9]/g, '')}`,
      };

      if (isEditMode && existingApp) {
        await updateApp(existingApp.id, finalApp);
        showToast(`Updated "${finalApp.name}" successfully!`, 'success');
      } else {
        await addApp(finalApp);
        showToast(`Published "${finalApp.name}" to AppNova store!`, 'success');
      }

      navigate('/admin');
    } catch (err) {
      console.error('Failed to save app:', err);
      showToast('Error saving app. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/admin"
            className="p-2 rounded-2xl bg-white dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-appText-primary dark:text-appText-darkPrimary">
              {isEditMode ? `Edit Application` : `Add New Android App`}
            </h1>
            <p className="text-xs text-appText-secondary dark:text-appText-darkSecondary">
              Configure package metadata, upload genuine APK binary, and manage store visibility
            </p>
          </div>
        </div>

        {/* Live Preview Button */}
        <button
          type="button"
          onClick={() => setIsPreviewOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-slate-100 dark:bg-surface-darkSubtle text-appText-secondary dark:text-appText-darkSecondary hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-xs transition-colors"
        >
          <Eye className="w-4 h-4 text-brand-500" />
          <span>Preview Card</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Basic App Details */}
        <div className="p-6 rounded-3xl bg-white dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-soft space-y-4">
          <h2 className="text-base font-bold text-appText-primary dark:text-appText-darkPrimary flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-brand-500" />
            Basic Application Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-appText-secondary dark:text-appText-darkSecondary mb-1.5">
                App Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. WhatsApp Messenger"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-surface-darkSubtle border border-surface-border dark:border-surface-darkBorder outline-none focus:border-brand-500 text-appText-primary dark:text-appText-darkPrimary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-appText-secondary dark:text-appText-darkSecondary mb-1.5">
                Developer Name *
              </label>
              <input
                type="text"
                required
                value={developer}
                onChange={(e) => setDeveloper(e.target.value)}
                placeholder="e.g. WhatsApp LLC"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-surface-darkSubtle border border-surface-border dark:border-surface-darkBorder outline-none focus:border-brand-500 text-appText-primary dark:text-appText-darkPrimary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-appText-secondary dark:text-appText-darkSecondary mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-surface-darkSubtle border border-surface-border dark:border-surface-darkBorder outline-none focus:border-brand-500 text-appText-primary dark:text-appText-darkPrimary cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-appText-secondary dark:text-appText-darkSecondary mb-1.5">
                Type
              </label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-xs font-semibold text-appText-primary dark:text-appText-darkPrimary cursor-pointer">
                  <input
                    type="radio"
                    name="appType"
                    checked={type === 'app'}
                    onChange={() => setType('app')}
                    className="text-brand-500"
                  />
                  <span>Application</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold text-appText-primary dark:text-appText-darkPrimary cursor-pointer">
                  <input
                    type="radio"
                    name="appType"
                    checked={type === 'game'}
                    onChange={() => setType('game')}
                    className="text-brand-500"
                  />
                  <span>Android Game</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Package & APK Binaries */}
        <div className="p-6 rounded-3xl bg-white dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-soft space-y-4">
          <h2 className="text-base font-bold text-appText-primary dark:text-appText-darkPrimary flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-brand-500" />
            APK Package & Binary Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-appText-secondary dark:text-appText-darkSecondary mb-1.5">
                Package Name (Identifier)
              </label>
              <input
                type="text"
                required
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                placeholder="com.whatsapp"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono rounded-xl bg-slate-50 dark:bg-surface-darkSubtle border border-surface-border dark:border-surface-darkBorder outline-none focus:border-brand-500 text-appText-primary dark:text-appText-darkPrimary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-appText-secondary dark:text-appText-darkSecondary mb-1.5">
                Version Number
              </label>
              <input
                type="text"
                required
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="2.24.22.79"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-surface-darkSubtle border border-surface-border dark:border-surface-darkBorder outline-none focus:border-brand-500 text-appText-primary dark:text-appText-darkPrimary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-appText-secondary dark:text-appText-darkSecondary mb-1.5">
                APK Size
              </label>
              <input
                type="text"
                required
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="84.2 MB"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-surface-darkSubtle border border-surface-border dark:border-surface-darkBorder outline-none focus:border-brand-500 text-appText-primary dark:text-appText-darkPrimary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-appText-secondary dark:text-appText-darkSecondary mb-1.5">
                Minimum Android OS
              </label>
              <input
                type="text"
                value={minAndroid}
                onChange={(e) => setMinAndroid(e.target.value)}
                placeholder="Android 5.0 and up"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-surface-darkSubtle border border-surface-border dark:border-surface-darkBorder outline-none focus:border-brand-500 text-appText-primary dark:text-appText-darkPrimary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-appText-secondary dark:text-appText-darkSecondary mb-1.5">
                Rating (0.0 to 5.0)
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(parseFloat(e.target.value) || 4.5)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-surface-darkSubtle border border-surface-border dark:border-surface-darkBorder outline-none focus:border-brand-500 text-appText-primary dark:text-appText-darkPrimary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-appText-secondary dark:text-appText-darkSecondary mb-1.5">
                Downloads Count
              </label>
              <input
                type="text"
                value={downloads}
                onChange={(e) => setDownloads(e.target.value)}
                placeholder="5B+"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-surface-darkSubtle border border-surface-border dark:border-surface-darkBorder outline-none focus:border-brand-500 text-appText-primary dark:text-appText-darkPrimary"
              />
            </div>
          </div>

          {/* Upload APK File */}
          <div className="pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-appText-secondary dark:text-appText-darkSecondary mb-2">
              Upload Actual APK File (Genuine Package)
            </label>
            <div className="p-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-500">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-appText-primary dark:text-appText-darkPrimary">
                    {customApkFileName ? `Current File: ${customApkFileName}` : 'Select an .apk package from your machine'}
                  </p>
                  <p className="text-[11px] text-appText-muted dark:text-appText-darkMuted">
                    {customApkFileName ? `Binary ready for download` : 'Or let AppNova auto-generate signed binary structure'}
                  </p>
                </div>
              </div>

              <label className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs cursor-pointer shadow-sm transition-colors">
                Choose APK File
                <input
                  type="file"
                  accept=".apk,application/vnd.android.package-archive"
                  onChange={handleApkFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Section 3: Visual Assets & Icon */}
        <div className="p-6 rounded-3xl bg-white dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-soft space-y-4">
          <h2 className="text-base font-bold text-appText-primary dark:text-appText-darkPrimary flex items-center gap-2">
            <Image className="w-4 h-4 text-brand-500" />
            Visual Assets & Screenshots
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* App Icon */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-appText-secondary dark:text-appText-darkSecondary mb-1.5">
                App Icon (URL or Upload) *
              </label>
              <div className="flex items-center gap-3 mb-2">
                {icon && (
                  <img
                    src={icon}
                    alt="Icon preview"
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-800 shadow-sm flex-shrink-0"
                  />
                )}
                <input
                  type="text"
                  required
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="https://... or upload below"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-surface-darkSubtle border border-surface-border dark:border-surface-darkBorder outline-none focus:border-brand-500 text-appText-primary dark:text-appText-darkPrimary"
                />
              </div>
              <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                Upload icon file from computer
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleIconFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Banner */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-appText-secondary dark:text-appText-darkSecondary mb-1.5">
                Featured Banner Image (Optional)
              </label>
              <input
                type="text"
                value={banner}
                onChange={(e) => setBanner(e.target.value)}
                placeholder="https://... for featured carousel"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-surface-darkSubtle border border-surface-border dark:border-surface-darkBorder outline-none focus:border-brand-500 text-appText-primary dark:text-appText-darkPrimary mb-2"
              />
              <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                Upload banner file
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Screenshots Gallery */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-appText-secondary dark:text-appText-darkSecondary">
                Screenshots ({screenshots.length})
              </label>
              <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                Upload screenshots
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleScreenshotFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <input
                type="text"
                value={screenshotInput}
                onChange={(e) => setScreenshotInput(e.target.value)}
                placeholder="Or paste screenshot image URL..."
                className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-surface-darkSubtle border border-surface-border dark:border-surface-darkBorder outline-none focus:border-brand-500 text-appText-primary dark:text-appText-darkPrimary"
              />
              <button
                type="button"
                onClick={handleAddScreenshotUrl}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-surface-darkSubtle text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                Add URL
              </button>
            </div>

            {/* Screenshots Preview Strip */}
            <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
              {screenshots.map((shot, idx) => (
                <div key={idx} className="relative flex-shrink-0 w-24 h-40 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 group">
                  <img src={shot} alt="preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveScreenshot(idx)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: Descriptions & Changelog */}
        <div className="p-6 rounded-3xl bg-white dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-soft space-y-4">
          <h2 className="text-base font-bold text-appText-primary dark:text-appText-darkPrimary">
            Description & What's New
          </h2>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-appText-secondary dark:text-appText-darkSecondary mb-1.5">
              Full Description *
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of features, compatibility, and highlights..."
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-surface-darkSubtle border border-surface-border dark:border-surface-darkBorder outline-none focus:border-brand-500 text-appText-primary dark:text-appText-darkPrimary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-appText-secondary dark:text-appText-darkSecondary mb-1.5">
              What's New in this Version (One bullet point per line)
            </label>
            <textarea
              rows={3}
              value={whatsNewInput}
              onChange={(e) => setWhatsNewInput(e.target.value)}
              placeholder="Added new dark mode theme&#10;Fixed crash on Android 15&#10;Speed improvements for download engine"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-surface-darkSubtle border border-surface-border dark:border-surface-darkBorder outline-none focus:border-brand-500 text-appText-primary dark:text-appText-darkPrimary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-appText-secondary dark:text-appText-darkSecondary mb-1.5">
              Search Tags (Comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Messaging, Chat, Free, Meta, Encrypted"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-surface-darkSubtle border border-surface-border dark:border-surface-darkBorder outline-none focus:border-brand-500 text-appText-primary dark:text-appText-darkPrimary"
            />
          </div>
        </div>

        {/* Section 5: Store Placement Flags */}
        <div className="p-6 rounded-3xl bg-white dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder shadow-soft space-y-4">
          <h2 className="text-base font-bold text-appText-primary dark:text-appText-darkPrimary">
            Store Visibility & Placements
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-surface-darkSubtle border border-surface-border dark:border-surface-darkBorder cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-brand-500 rounded"
              />
              <div>
                <p className="text-xs font-bold text-appText-primary dark:text-appText-darkPrimary">
                  Featured Carousel
                </p>
                <p className="text-[10px] text-appText-muted">Show in top banner</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-surface-darkSubtle border border-surface-border dark:border-surface-darkBorder cursor-pointer">
              <input
                type="checkbox"
                checked={isTrending}
                onChange={(e) => setIsTrending(e.target.checked)}
                className="w-4 h-4 text-brand-500 rounded"
              />
              <div>
                <p className="text-xs font-bold text-appText-primary dark:text-appText-darkPrimary">
                  Trending Downloads
                </p>
                <p className="text-[10px] text-appText-muted">Highlight in trending</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-surface-darkSubtle border border-surface-border dark:border-surface-darkBorder cursor-pointer">
              <input
                type="checkbox"
                checked={isPopular}
                onChange={(e) => setIsPopular(e.target.checked)}
                className="w-4 h-4 text-brand-500 rounded"
              />
              <div>
                <p className="text-xs font-bold text-appText-primary dark:text-appText-darkPrimary">
                  Top Charts
                </p>
                <p className="text-[10px] text-appText-muted">Rank in top charts</p>
              </div>
            </label>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            to="/admin"
            className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-brand-500/25 transition-all hover:scale-[1.01] disabled:opacity-50"
          >
            {isSubmitting ? 'Saving to Database...' : isEditMode ? 'Update Application' : 'Publish to Store'}
          </button>
        </div>
      </form>

      {/* Live Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-surface-darkCard p-6 border border-surface-border dark:border-surface-darkBorder shadow-modal">
            <h3 className="text-sm font-bold text-appText-primary dark:text-appText-darkPrimary mb-3">
              Store Card Live Preview
            </h3>
            <div className="max-w-[240px] mx-auto mb-5">
              <AppCard app={draftApp} />
            </div>
            <button
              type="button"
              onClick={() => setIsPreviewOpen(false)}
              className="w-full py-2.5 rounded-xl bg-brand-500 text-white font-bold text-xs shadow-sm hover:bg-brand-600"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
