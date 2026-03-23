import Link from 'next/link';
import { CATEGORIES, COUNTRY_DATA } from '@/data/games-data';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Categories */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Game Categories</h3>
        <div className="category-list">
          {CATEGORIES.map((cat) => (
            <Link key={cat.slug} href="/rankings" className="category-btn">
              <span className="cat-icon">{cat.icon}</span>
              {cat.name}
              <span className="cat-count">{cat.count}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Trending */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Trending Now</h3>
        <div className="trending-list">
          <div className="trending-item">
            <span className="trending-rank hot">&#128293;</span>
            <div className="trending-info">
              <span className="trending-name">GTA 6</span>
              <span className="trending-meta">Most searched game of 2026</span>
            </div>
          </div>
          <div className="trending-item">
            <span className="trending-rank hot">&#128293;</span>
            <div className="trending-info">
              <span className="trending-name">Hytale</span>
              <span className="trending-meta">Emerging sandbox title</span>
            </div>
          </div>
          <div className="trending-item">
            <span className="trending-rank rising">&#128200;</span>
            <div className="trending-info">
              <span className="trending-name">Arc Raiders</span>
              <span className="trending-meta">New co-op shooter</span>
            </div>
          </div>
          <div className="trending-item">
            <span className="trending-rank rising">&#128200;</span>
            <div className="trending-info">
              <span className="trending-name">Battlefield 6</span>
              <span className="trending-meta">Franchise reboot</span>
            </div>
          </div>
          <div className="trending-item">
            <span className="trending-rank rising">&#128200;</span>
            <div className="trending-info">
              <span className="trending-name">Pokemon Legends Z-A</span>
              <span className="trending-meta">Nintendo&apos;s next hit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Platforms */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Gaming Platforms</h3>
        <div className="platform-list">
          <a href="#" className="platform-item">
            <span className="platform-icon">&#127918;</span>
            <span>Steam</span>
            <span className="platform-count">25,000+ games</span>
          </a>
          <a href="#" className="platform-item">
            <span className="platform-icon">&#128241;</span>
            <span>App Store</span>
            <span className="platform-count">500,000+ games</span>
          </a>
          <a href="#" className="platform-item">
            <span className="platform-icon">&#128241;</span>
            <span>Google Play</span>
            <span className="platform-count">450,000+ games</span>
          </a>
          <a href="#" className="platform-item">
            <span className="platform-icon">&#127918;</span>
            <span>Epic Games</span>
            <span className="platform-count">2,500+ games</span>
          </a>
          <a href="#" className="platform-item">
            <span className="platform-icon">&#127918;</span>
            <span>Xbox Game Pass</span>
            <span className="platform-count">450+ games</span>
          </a>
        </div>
      </div>

      {/* Blog Links */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">From the Blog</h3>
        <div className="sidebar-blog-list">
          <Link href="/blog/top-battle-royale-games-2026" className="sidebar-blog-item">
            <span className="sidebar-blog-category">Rankings</span>
            <span className="sidebar-blog-title">The 10 Best Battle Royale Games to Play in 2026</span>
          </Link>
          <Link href="/blog/mobile-gaming-revolution" className="sidebar-blog-item">
            <span className="sidebar-blog-category">Industry</span>
            <span className="sidebar-blog-title">How Mobile Gaming Took Over the World</span>
          </Link>
          <Link href="/blog/ai-in-gaming-2026" className="sidebar-blog-item">
            <span className="sidebar-blog-category">Technology</span>
            <span className="sidebar-blog-title">How AI is Transforming Gaming in 2026</span>
          </Link>
          <Link href="/blog/best-multiplayer-games-friends" className="sidebar-blog-item">
            <span className="sidebar-blog-category">Guide</span>
            <span className="sidebar-blog-title">25 Best Multiplayer Games to Play with Friends</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
