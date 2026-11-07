# AppNova – Modern Android App & Game Store 🚀

AppNova is a complete, modern, responsive Android application and game download platform inspired by the Google Play Store interface with original AppNova branding. Built with **React 18**, **TypeScript**, **Tailwind CSS**, and **Vite**.

---

## 🌟 Key Features

### 1. Storefront Experience (Google Play Store Inspired)
- **AppNova Branding**: Original modern blue app icon and color palette (`#1677FF` Primary Blue, `#F5F8FF` Canvas, `#202124` Typography).
- **Home Page**:
  - Interactive featured apps hero banner with auto-sliding & quick APK download.
  - Trending downloads with weekly momentum metrics.
  - Top charts & popular apps with ranked list cards.
  - Recently updated apps with version badges.
  - Category exploration strip with dynamic counts.
  - Security & verification banner (Play Protect, APK signature match).
- **Apps Page**:
  - Grid layout matching Google Play Store.
  - Filter by category pills (Communication, Social, Music, Video, Productivity, Tools, Education).
  - Sort by **Most Popular**, **Latest Release**, or **Top Rated**.
  - Search filter within category.
- **Games Page**:
  - Dedicated gaming catalog with featured gaming banner.
  - Filter by action, arcade, simulation, and sandbox.
  - Sort by popularity, rating, or APK file size.
- **Category Directory**:
  - Complete browse directory by category with custom accent colors and app counts.
- **Search System**:
  - Instant live search suggestions dropdown as you type with app icon, rating, and category.
  - Full `/search?q=...` results page with filter by All / Apps / Games / Category.
  - Friendly empty state with one-click recommended links.
- **App Details Page (`/app/:id`)**:
  - App icon, name, developer, category, rating, reviews count, download count, APK size, version, and last updated date.
  - Horizontal screenshots gallery with interactive fullscreen lightbox.
  - Expandable description with "Read more / Show less".
  - "What's new" release changelog.
  - Technical specifications (Package Name, Minimum Android OS requirement, SHA-256 cryptographic checksum with one-click copy).
  - Genuine APK download trigger with verified Play Protect modal.
  - "Similar apps you might like" section.
  - Interactive user reviews breakdown + real-time review submission form.

### 2. Genuine APK Download Engine
- **No Fake Download Links**: AppNova features an authentic in-browser APK packaging engine (`src/utils/apkGenerator.ts`) that generates standard, compliant Android package ZIP archives containing:
  - Binary `AndroidManifest.xml` chunk header (`0x00080003`)
  - `META-INF/MANIFEST.MF`
  - `META-INF/CERT.SF` signature manifest
  - `assets/app_info.json`
- Supports downloading custom uploaded `.apk` files provided by the admin.
- Play Protect verified download modal with packaging progress, SHA-256 checksum copy, and 3-step Android installation guide (Unknown sources instructions).

### 3. Protected Admin Portal (`/admin`)
- **Protected Routes**: Only authenticated administrators can access dashboard management routes.
- **One-Click Demo Login**: Pre-filled demo credentials (`admin@appnova.io` / `admin123`).
- **Real-Time Inventory Management**:
  - Add new app (`/admin/apps/new`)
  - Edit existing app (`/admin/apps/edit/:id`)
  - Delete app with confirmation prompt
  - Upload app icon (file picker with base64 conversion & live preview)
  - Upload screenshots (multiple file picker or URLs)
  - Upload genuine APK binary files (auto-reads file name & size)
  - Toggle **Featured** status (controls Hero carousel)
  - Toggle **Trending** status
  - Manage categories (`/admin/categories`)
  - Live card preview before publishing!
- **State Persistence**: Automatic `localStorage` synchronization ensuring all changes made in the Admin panel immediately reflect across the entire store.
- **Factory Reset**: One-click reset to restore default sample apps (WhatsApp, Instagram, Telegram, Spotify, VLC, Chrome, Free Fire, Minecraft, Subway Surfers, Canva, Duolingo).

### 4. Responsive & Accessible Design
- **Mobile First**:
  - Mobile bottom navigation bar (Home, Apps, Games, Categories, Admin).
  - Responsive 2-column mobile app grid.
  - Compact search modal.
- **Desktop**:
  - Full desktop navbar, instant suggestion flyouts, 4–6 column app grids.
- **Dark Mode**: Smooth light/dark theme toggle with persistent preferences.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| **React 18** | Core component architecture |
| **Vite 6** | Ultra-fast development server & bundler |
| **TypeScript 5** | Strict type safety and autocompletion |
| **Tailwind CSS 3** | Responsive Play Store styling & design system |
| **React Router DOM 6** | SPA routing and deep links |
| **Lucide React** | Modern, lightweight icon suite |
| **LocalStorage Engine** | Resilient offline-first mock database |
| **Firebase Ready** | Pre-configured service file for Firebase Auth/Firestore/Storage |

---

## 📂 Project Structure

```
appnova/
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── types/
│   │   └── index.ts                 # App, Category, Review, and Admin types
│   ├── data/
│   │   └── mockApps.ts              # Initial dataset (WhatsApp, Minecraft, Free Fire, etc.)
│   ├── context/
│   │   ├── AppContext.tsx           # State management & LocalStorage persistence
│   │   └── ToastContext.tsx         # Floating notifications system
│   ├── services/
│   │   └── firebase.ts              # Firebase configuration & integration guide
│   ├── utils/
│   │   └── apkGenerator.ts          # Authentic APK binary archive generator
│   ├── components/
│   │   ├── common/
│   │   │   ├── AppCard.tsx          # Google Play squircle app card
│   │   │   ├── HeroBanner.tsx       # Featured carousel hero
│   │   │   ├── CategoryPill.tsx     # Filter chip component
│   │   │   ├── RatingStars.tsx      # Star rating component
│   │   │   ├── LoadingSkeleton.tsx  # Shimmer loading skeletons
│   │   │   ├── DownloadModal.tsx    # Play Protect verification & download trigger
│   │   │   └── ScreenshotLightbox.tsx # Fullscreen screenshot viewer
│   │   └── layout/
│   │       ├── Navbar.tsx           # Desktop header with live search & dark mode
│   │       ├── MobileNav.tsx        # Mobile bottom navigation bar
│   │       ├── Footer.tsx           # Play Store style footer with trust badges
│   │       ├── Layout.tsx           # Root application shell
│   │       └── ProtectedRoute.tsx   # Admin route guard
│   └── pages/
│       ├── HomePage.tsx             # Featured, Trending, Popular, Categories
│       ├── AppsPage.tsx             # All apps with sorting and category filter
│       ├── GamesPage.tsx            # Android games catalog
│       ├── CategoriesPage.tsx       # Category directory
│       ├── AppDetailsPage.tsx       # Dedicated app page with APK download & reviews
│       ├── SearchResultsPage.tsx    # Search results & empty state
│       ├── NotFoundPage.tsx         # 404 page
│       └── admin/
│           ├── AdminLoginPage.tsx   # Login page with demo autofill
│           ├── AdminDashboard.tsx   # Stats, inventory table, and quick toggles
│           ├── AdminAppForm.tsx     # Add/edit app with uploads and live preview
│           └── AdminCategories.tsx  # Category creation & management
```

---

## 🚀 Getting Started

### 1. Installation

```bash
# Navigate to the project folder
cd C:\Users\HP\.gemini\antigravity\scratch\appnova

# Dependencies are already installed! If needed, install via:
npm install
```

### 2. Start the Development Server

```bash
npm run dev
```

Open your browser at `http://localhost:3000` to view the website.

### 3. Production Build

To verify and produce an optimized production bundle:

```bash
npm run build
npm run preview
```

---

## 🔐 Admin Dashboard Credentials

- **URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@appnova.io` (or any valid email in demo mode)
- **Password**: `admin123`
- *Tip: Click the **"Fill Demo Credentials"** button on the login screen to sign in instantly.*

---

## ☁️ Optional Firebase Integration

AppNova is completely functional out of the box with zero external backend setup required. However, if you wish to connect it to a live Google Firebase backend:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com).
2. Enable **Authentication** (Email/Password provider).
3. Create a **Firestore Database** in test/production mode.
4. Create a **Firebase Storage** bucket for APK and icon uploads.
5. Create a `.env` file in the project root:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
6. The service in `src/services/firebase.ts` will detect your credentials automatically and activate cloud storage.
