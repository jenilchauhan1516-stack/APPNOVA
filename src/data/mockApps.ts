import { AppItem, CategoryItem, UserReview } from '../types';

export const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: 'communication', name: 'Communication', iconName: 'MessageSquare', type: 'app', color: '#1677FF', description: 'Chat, call, and connect with friends' },
  { id: 'social', name: 'Social', iconName: 'Users', type: 'app', color: '#E1306C', description: 'Share photos, moments, and reels' },
  { id: 'music-audio', name: 'Music & Audio', iconName: 'Music', type: 'app', color: '#1DB954', description: 'Stream millions of tracks and podcasts' },
  { id: 'video-players', name: 'Video Players', iconName: 'Video', type: 'app', color: '#FA8C16', description: 'Play videos in all formats' },
  { id: 'productivity', name: 'Productivity', iconName: 'Briefcase', type: 'app', color: '#722ED1', description: 'Work smarter, organize, and create' },
  { id: 'action-games', name: 'Action', iconName: 'Gamepad2', type: 'game', color: '#F5222D', description: 'Adrenaline-packed battle royales and combat' },
  { id: 'arcade-games', name: 'Arcade', iconName: 'Flame', type: 'game', color: '#EB2F96', description: 'Endless runners and quick fun' },
  { id: 'sandbox-games', name: 'Simulation', iconName: 'Boxes', type: 'game', color: '#52C41A', description: 'Build worlds, survive, and explore' },
  { id: 'education', name: 'Education', iconName: 'GraduationCap', type: 'app', color: '#13C2C2', description: 'Learn languages, science, and math' },
  { id: 'tools', name: 'Tools & Utilities', iconName: 'Wrench', type: 'app', color: '#2F54EB', description: 'Essential browsers and system tools' },
];

export const INITIAL_APPS: AppItem[] = [
  {
    id: 'whatsapp-messenger',
    name: 'WhatsApp Messenger',
    developer: 'WhatsApp LLC',
    category: 'Communication',
    type: 'app',
    icon: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=160&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=1000&auto=format&fit=crop&q=80',
    rating: 4.3,
    reviewsCount: '198M reviews',
    downloads: '5B+',
    size: '84.2 MB',
    version: '2.24.22.79',
    lastUpdated: 'Nov 3, 2026',
    minAndroid: 'Android 5.0 and up',
    packageName: 'com.whatsapp',
    description: 'WhatsApp from Meta is a 100% free messaging and video calling app. It is used by over 2B people in more than 180 countries. It is simple, reliable, and private, so you can easily keep in touch with your friends and family. WhatsApp works across mobile and desktop even on slow connections, with no subscription fees.',
    whatsNew: [
      'You can now create events in communities to organize gatherings directly in group chats.',
      'HD video and photo sharing is now set as the preferred default quality.',
      'Performance enhancements and stability fixes for video calls.'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=600&auto=format&fit=crop&q=80'
    ],
    apkUrl: 'https://appnova.internal/download/com.whatsapp.apk',
    sha256: '9f83c18b76c8137cd9e6931557d34199c0dae858db1ee6986cf339e76fef78a1',
    isFeatured: true,
    isPopular: true,
    isTrending: true,
    tags: ['Messaging', 'Encrypted', 'Calls', 'Status', 'Meta']
  },
  {
    id: 'instagram',
    name: 'Instagram',
    developer: 'Instagram (Meta)',
    category: 'Social',
    type: 'app',
    icon: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=160&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=1000&auto=format&fit=crop&q=80',
    rating: 4.1,
    reviewsCount: '154M reviews',
    downloads: '5B+',
    size: '62.7 MB',
    version: '354.0.0.38.106',
    lastUpdated: 'Nov 5, 2026',
    minAndroid: 'Android 9.0 and up',
    packageName: 'com.instagram.android',
    description: 'Instagram brings you closer to the people and things you love. Connect with friends, share what you are up to, or see what is new from others all over the world. Explore our community where you can feel free to be yourself and share everything from your daily moments to life highlights.',
    whatsNew: [
      'New Reels creative tools including AI background expander.',
      'Scheduled posts for creator accounts with integrated analytics.',
      'Bug fixes and direct message responsiveness improvements.'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80'
    ],
    apkUrl: 'https://appnova.internal/download/com.instagram.android.apk',
    sha256: 'a12e43bc0913928174fbcd91280fa7c9182312bcdf3018241904bb7190823491',
    isFeatured: true,
    isPopular: true,
    isTrending: true,
    tags: ['Reels', 'Photos', 'Stories', 'Creators', 'Chat']
  },
  {
    id: 'telegram',
    name: 'Telegram',
    developer: 'Telegram FZ-LLC',
    category: 'Communication',
    type: 'app',
    icon: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=160&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop&q=80',
    rating: 4.4,
    reviewsCount: '13.8M reviews',
    downloads: '1B+',
    size: '71.5 MB',
    version: '11.2.3',
    lastUpdated: 'Nov 1, 2026',
    minAndroid: 'Android 6.0 and up',
    packageName: 'org.telegram.messenger',
    description: 'Pure instant messaging — simple, fast, secure, and synced across all your devices. One of the top 10 most downloaded apps in the world with over 800 million active users. Fast, synced, unlimited media sharing, and powerful bot automation.',
    whatsNew: [
      'Telegram Stars for purchasing digital goods in mini-apps.',
      'Gifts on profiles with optional animated NFT backgrounds.',
      'Faster video streaming with adaptive bitrates.'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80'
    ],
    apkUrl: 'https://appnova.internal/download/org.telegram.messenger.apk',
    sha256: '38a149cbf679e390c210dbe927c813739bf8913401fa912803b8e72c8194a37b',
    isFeatured: false,
    isPopular: true,
    isTrending: true,
    tags: ['Cloud Messaging', 'Bots', 'Channels', 'Secure', 'Secret Chat']
  },
  {
    id: 'spotify-music',
    name: 'Spotify: Music and Podcasts',
    developer: 'Spotify AB',
    category: 'Music & Audio',
    type: 'app',
    icon: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=160&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1000&auto=format&fit=crop&q=80',
    rating: 4.5,
    reviewsCount: '34M reviews',
    downloads: '1B+',
    size: '39.8 MB',
    version: '8.9.84.594',
    lastUpdated: 'Nov 4, 2026',
    minAndroid: 'Android 7.0 and up',
    packageName: 'com.spotify.music',
    description: 'With Spotify, you have access to a world of free music, curated playlists, artists, and podcasts you love. Discover new music, podcasts, top songs or listen to your favorite artists, albums. Create your own music playlists with the latest songs to suit your mood.',
    whatsNew: [
      'Lossless audio streaming toggle for premium subscribers.',
      'Enhanced AI DJ voice with deeper contextual explanations.',
      'Faster offline playlist syncing.'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80'
    ],
    apkUrl: 'https://appnova.internal/download/com.spotify.music.apk',
    sha256: '517904e2847a98214309871efacba984210986701bcf9018420917fa2b98e102',
    isFeatured: true,
    isPopular: true,
    isTrending: false,
    tags: ['Music', 'Streaming', 'Podcasts', 'Audiobooks', 'Playlists']
  },
  {
    id: 'vlc-for-android',
    name: 'VLC for Android',
    developer: 'Videolabs',
    category: 'Video Players',
    type: 'app',
    icon: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=160&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1000&auto=format&fit=crop&q=80',
    rating: 4.4,
    reviewsCount: '1.9M reviews',
    downloads: '100M+',
    size: '34.1 MB',
    version: '3.6.0',
    lastUpdated: 'Oct 28, 2026',
    minAndroid: 'Android 5.0 and up',
    packageName: 'org.videolan.vlc',
    description: 'VLC media player is a free and open source cross-platform multimedia player that plays most multimedia files as well as discs, devices, and network streaming protocols. VLC for Android can play any video and audio files, as well as network streams, network shares and drives.',
    whatsNew: [
      'Upgraded codec support for AV1 10-bit playback.',
      'Subtitle auto-fetch engine powered by OpenSubtitles v3.',
      'Picture-in-picture gesture customization.'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&auto=format&fit=crop&q=80'
    ],
    apkUrl: 'https://appnova.internal/download/org.videolan.vlc.apk',
    sha256: '839217bcae9182370912cbfa912803bca71092837190823109aef81938bca019',
    isFeatured: false,
    isPopular: true,
    isTrending: false,
    tags: ['Media Player', 'Open Source', 'Video', 'Audio', 'Subtitles']
  },
  {
    id: 'google-chrome',
    name: 'Google Chrome: Fast & Secure',
    developer: 'Google LLC',
    category: 'Tools & Utilities',
    type: 'app',
    icon: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=160&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1000&auto=format&fit=crop&q=80',
    rating: 4.2,
    reviewsCount: '45M reviews',
    downloads: '10B+',
    size: '124.6 MB',
    version: '131.0.6778.39',
    lastUpdated: 'Nov 6, 2026',
    minAndroid: 'Android 10.0 and up',
    packageName: 'com.android.chrome',
    description: 'Google Chrome is a fast, easy to use, and secure web browser. Designed for Android, Chrome brings you personalized news articles, quick links to your favorite sites, downloads, and Google Search and Google Translate built-in.',
    whatsNew: [
      'Gemini Nano in-browser web summaries for long articles.',
      'Enhanced passkey manager for one-tap biometric logins.',
      'Reduced memory footprint on tabs in the background.'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80'
    ],
    apkUrl: 'https://appnova.internal/download/com.android.chrome.apk',
    sha256: 'c819230912bcde01928371908230918237190823091823710928371902837102',
    isFeatured: true,
    isPopular: true,
    isTrending: false,
    tags: ['Browser', 'Fast', 'Google', 'Web', 'Search']
  },
  {
    id: 'free-fire-max',
    name: 'Free Fire MAX',
    developer: 'Garena International I',
    category: 'Action',
    type: 'game',
    icon: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=160&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1000&auto=format&fit=crop&q=80',
    rating: 4.4,
    reviewsCount: '158M reviews',
    downloads: '100M+',
    size: '640.8 MB',
    version: '2.106.1',
    lastUpdated: 'Oct 30, 2026',
    minAndroid: 'Android 5.0 and up',
    packageName: 'com.dts.freefiremax',
    description: 'Free Fire MAX is designed exclusively to deliver premium gameplay experience in a Battle Royale. Enjoy a variety of exciting game modes with all Free Fire players via exclusive Firelink technology. Experience combat like never before with Ultra HD resolutions and breathtaking effects.',
    whatsNew: [
      'New Bermuda map overhaul with interactive zip lines.',
      'Clash Squad Season 27 ranked rewards and balancing.',
      'Craftland 3.0 studio updates.'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80'
    ],
    apkUrl: 'https://appnova.internal/download/com.dts.freefiremax.apk',
    sha256: '9182370912bcaf81928371908230918237190823719028371092837190823701',
    isFeatured: true,
    isPopular: true,
    isTrending: true,
    tags: ['Battle Royale', 'Action', 'Shooter', 'Multiplayer', 'Garena']
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    developer: 'Mojang Studios',
    category: 'Simulation',
    type: 'game',
    icon: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=160&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1000&auto=format&fit=crop&q=80',
    rating: 4.6,
    reviewsCount: '5.1M reviews',
    downloads: '50M+',
    size: '280.4 MB',
    version: '1.21.40.04',
    lastUpdated: 'Nov 2, 2026',
    minAndroid: 'Android 8.0 and up',
    packageName: 'com.mojang.minecraftpe',
    description: 'Explore infinite worlds and build everything from the simplest of homes to the grandest of castles. Play in creative mode with unlimited resources or mine deep into the world in survival mode, crafting weapons and armor to fend off dangerous mobs. Create, explore and survive alone or with friends on mobile devices.',
    whatsNew: [
      'The Pale Garden biome and the Creaking mob encounter.',
      'Bundles feature enabled by default for backpack inventory management.',
      'RenderDragon graphics pipeline optimizations.'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80'
    ],
    apkUrl: 'https://appnova.internal/download/com.mojang.minecraftpe.apk',
    sha256: '49281730912bcaf8192837190823091823719082371902837109283719082344',
    isFeatured: true,
    isPopular: true,
    isTrending: true,
    tags: ['Sandbox', 'Crafting', 'Open World', 'Multiplayer', 'Mojang']
  },
  {
    id: 'subway-surfers',
    name: 'Subway Surfers',
    developer: 'SYBO Games',
    category: 'Arcade',
    type: 'game',
    icon: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=160&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=1000&auto=format&fit=crop&q=80',
    rating: 4.5,
    reviewsCount: '41M reviews',
    downloads: '1B+',
    size: '142.5 MB',
    version: '3.32.0',
    lastUpdated: 'Oct 26, 2026',
    minAndroid: 'Android 5.1 and up',
    packageName: 'com.kiloo.subwaysurf',
    description: 'DASH as fast as you can! DODGE the oncoming trains! Help Jake, Tricky & Fresh escape from the grumpy Inspector and his dog. Grind trains with your cool crew, hoverboard surfing, paint powered jetpack, and lightning fast swipe acrobatics!',
    whatsNew: [
      'World Tour lands in Tokyo with neon underground aesthetics.',
      'Unlock the high-tech hoverboard and Cyber Tricky skin.',
      'Weekly mystery box jackpot bonuses.'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80'
    ],
    apkUrl: 'https://appnova.internal/download/com.kiloo.subwaysurf.apk',
    sha256: '7281923091823710928371902837109283719028371092837190823719082311',
    isFeatured: false,
    isPopular: true,
    isTrending: false,
    tags: ['Runner', 'Casual', 'Endless', 'Offline', 'Fun']
  },
  {
    id: 'duolingo',
    name: 'Duolingo: Language Lessons',
    developer: 'Duolingo',
    category: 'Education',
    type: 'app',
    icon: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=160&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1000&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewsCount: '21M reviews',
    downloads: '500M+',
    size: '56.3 MB',
    version: '5.148.4',
    lastUpdated: 'Nov 4, 2026',
    minAndroid: 'Android 7.0 and up',
    packageName: 'com.duolingo',
    description: 'Learn Spanish, French, German, Italian, English, Japanese, and 40+ more languages in quick, bite-sized lessons. Practice speaking, reading, listening, and writing to build your vocabulary and grammar skills. Designed by language experts and loved by hundreds of millions of learners worldwide.',
    whatsNew: [
      'Interactive roleplay adventures powered by conversational AI.',
      'Math & Music tracks expanded with 50+ new practical exercises.',
      'Streak Freeze widgets refreshed for Android 15.'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80'
    ],
    apkUrl: 'https://appnova.internal/download/com.duolingo.apk',
    sha256: '1293810293810293810293810293810293810293810293810293810293810293',
    isFeatured: false,
    isPopular: true,
    isTrending: true,
    tags: ['Learning', 'Language', 'Spanish', 'Vocabulary', 'Free']
  },
  {
    id: 'canva-graphic-design',
    name: 'Canva: Design, Photo & Video',
    developer: 'Canva',
    category: 'Productivity',
    type: 'app',
    icon: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=160&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1000&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: '15M reviews',
    downloads: '100M+',
    size: '48.9 MB',
    version: '2.285.0',
    lastUpdated: 'Nov 5, 2026',
    minAndroid: 'Android 8.0 and up',
    packageName: 'com.canva.editor',
    description: 'Canva is your free graphic design app, photo editor, video maker, and logo creator. Create stunning social media posts, videos, cards, flyers, photo collages and more. Stand out with one-tap animations and fun music for Instagram stories and TikTok videos.',
    whatsNew: [
      'Magic Studio generative expand and instant background swap.',
      'Multi-track audio timeline for mobile video editor.',
      'Brand Kit sync support with shared team folders.'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&auto=format&fit=crop&q=80'
    ],
    apkUrl: 'https://appnova.internal/download/com.canva.editor.apk',
    sha256: '9847192847192847192847192847192847192847192847192847192847192847',
    isFeatured: true,
    isPopular: false,
    isTrending: true,
    tags: ['Design', 'Photo Editor', 'Video Maker', 'Logos', 'Templates']
  }
];

export const INITIAL_REVIEWS: UserReview[] = [
  {
    id: 'rev-1',
    appId: 'whatsapp-messenger',
    userName: 'Alex Rivera',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'November 2, 2026',
    comment: 'Super fast download speed on AppNova! The APK verified 100% clean with Google Play Protect and installed flawlessly on my Galaxy S24.',
    helpfulCount: 42
  },
  {
    id: 'rev-2',
    appId: 'whatsapp-messenger',
    userName: 'Elena Rostova',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'October 29, 2026',
    comment: 'Glad to have the exact official build without bloatware or forced third-party installers. Simple one-click APK download.',
    helpfulCount: 29
  },
  {
    id: 'rev-3',
    appId: 'free-fire-max',
    userName: 'Marcus Vance',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'November 1, 2026',
    comment: 'Smooth high frame rate on the latest MAX update. Downloaded the package in 20 seconds. Great repository!',
    helpfulCount: 18
  },
  {
    id: 'rev-4',
    appId: 'spotify-music',
    userName: 'Sophia Chang',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    rating: 4,
    date: 'October 31, 2026',
    comment: 'Audio quality is pristine and the app runs without a hitch. Thank you AppNova for keeping the latest versions up to date.',
    helpfulCount: 15
  }
];
