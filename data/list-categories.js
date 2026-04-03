// ============================================================
// 50BestGames.com - Top 10 List Categories
// Auto-generated list pages for SEO
// ============================================================

export const LIST_CATEGORIES = [
  {
    slug: 'best-free-games',
    title: 'Top 10 Best Free-to-Play Games in 2026',
    description: 'The best free games you can play right now. No money needed, just download and enjoy these top-rated free-to-play titles.',
    filter: (game) => game.freeToPlay,
    icon: '🆓',
  },
  {
    slug: 'best-battle-royale',
    title: 'Top 10 Best Battle Royale Games in 2026',
    description: 'The ultimate ranking of battle royale games. From Fortnite to PUBG, find the best last-man-standing experiences.',
    filter: (game) => game.category.toLowerCase().includes('battle royale'),
    icon: '🎯',
  },
  {
    slug: 'best-fps-games',
    title: 'Top 10 Best FPS & Shooter Games in 2026',
    description: 'The best first-person shooters and tactical shooters ranked by players and ratings. From Valorant to Counter-Strike.',
    filter: (game) => game.category.toLowerCase().includes('fps') || game.category.toLowerCase().includes('shooter') || game.category.toLowerCase().includes('tactical'),
    icon: '🔫',
  },
  {
    slug: 'best-moba-games',
    title: 'Top 10 Best MOBA Games in 2026',
    description: 'The top MOBA games ranked. League of Legends, Dota 2, and the best multiplayer online battle arena games to play right now.',
    filter: (game) => game.category.toLowerCase().includes('moba'),
    icon: '⚔️',
  },
  {
    slug: 'best-rpg-games',
    title: 'Top 10 Best RPG & MMORPG Games in 2026',
    description: 'The greatest role-playing games ranked. From Genshin Impact to Final Fantasy, these RPGs offer hundreds of hours of adventure.',
    filter: (game) => game.category.toLowerCase().includes('rpg'),
    icon: '🗡️',
  },
  {
    slug: 'best-mobile-games',
    title: 'Top 10 Best Mobile Games in 2026',
    description: 'The highest-rated mobile games for iOS and Android. Play these top titles on your phone or tablet anywhere, anytime.',
    filter: (game) => game.platforms && game.platforms.includes('Mobile'),
    icon: '📱',
  },
  {
    slug: 'best-sandbox-games',
    title: 'Top 10 Best Sandbox & Survival Games in 2026',
    description: 'The best sandbox and survival games where you can build, explore, and survive. From Minecraft to Terraria.',
    filter: (game) => game.category.toLowerCase().includes('sandbox') || game.category.toLowerCase().includes('survival'),
    icon: '🏗️',
  },
  {
    slug: 'best-pc-games',
    title: 'Top 10 Best PC Games in 2026',
    description: 'The ultimate PC gaming list. These are the most popular and highest-rated games you can play on your computer right now.',
    filter: (game) => game.platforms && game.platforms.includes('PC'),
    icon: '💻',
  },
  {
    slug: 'best-console-games',
    title: 'Top 10 Best Console Games in 2026',
    description: 'The top games for PlayStation, Xbox, and Nintendo Switch. These console exclusives and multi-platform hits are must-plays.',
    filter: (game) => game.platforms && game.platforms.includes('Console'),
    icon: '🎮',
  },
  {
    slug: 'best-puzzle-casual',
    title: 'Top 10 Best Puzzle & Casual Games in 2026',
    description: 'The best casual and puzzle games to relax with. Perfect for quick gaming sessions or unwinding after a long day.',
    filter: (game) => game.category.toLowerCase().includes('puzzle') || game.category.toLowerCase().includes('casual'),
    icon: '🧩',
  },
  {
    slug: 'most-downloaded-games',
    title: 'Top 10 Most Downloaded Games of All Time',
    description: 'The games with the highest download counts ever. These titles have been installed billions of times across all platforms.',
    sort: (a, b) => {
      const parse = (s) => { if (!s) return 0; const n = parseFloat(s.replace(/[^0-9.]/g,'')); if (s.includes('B')) return n*1e9; if (s.includes('M')) return n*1e6; return n; };
      return parse(b.totalDownloads) - parse(a.totalDownloads);
    },
    icon: '📥',
  },
  {
    slug: 'highest-rated-games',
    title: 'Top 10 Highest Rated Games in 2026',
    description: 'The games with the best ratings and reviews. These titles have earned critical and player acclaim worldwide.',
    sort: (a, b) => b.rating - a.rating,
    icon: '⭐',
  },
  {
    slug: 'best-sports-racing',
    title: 'Top 10 Best Sports & Racing Games in 2026',
    description: 'The top sports and racing games ranked. From EA FC to Forza, compete in your favorite sports virtually.',
    filter: (game) => game.category.toLowerCase().includes('sports') || game.category.toLowerCase().includes('racing'),
    icon: '🏎️',
  },
];
