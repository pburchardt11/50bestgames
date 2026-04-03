import Link from 'next/link';
import { CATEGORIES } from '@/data/games-data';

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

      {/* Top 10 Lists */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Top 10 Lists</h3>
        <div className="sidebar-blog-list">
          <Link href="/lists/best-free-games" className="sidebar-blog-item">
            <span className="sidebar-blog-category">Free</span>
            <span className="sidebar-blog-title">Best Free-to-Play Games</span>
          </Link>
          <Link href="/lists/best-battle-royale" className="sidebar-blog-item">
            <span className="sidebar-blog-category">BR</span>
            <span className="sidebar-blog-title">Best Battle Royale Games</span>
          </Link>
          <Link href="/lists/best-mobile-games" className="sidebar-blog-item">
            <span className="sidebar-blog-category">Mobile</span>
            <span className="sidebar-blog-title">Best Mobile Games</span>
          </Link>
          <Link href="/lists/highest-rated-games" className="sidebar-blog-item">
            <span className="sidebar-blog-category">Top</span>
            <span className="sidebar-blog-title">Highest Rated Games</span>
          </Link>
          <Link href="/lists" className="sidebar-blog-item">
            <span className="sidebar-blog-title" style={{ color: 'var(--accent-primary-light)' }}>View All Lists &rarr;</span>
          </Link>
        </div>
      </div>

      {/* Trending */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Trending Now</h3>
        <div className="trending-list">
          <Link href="/game/minecraft" className="trending-item" style={{ textDecoration: 'none' }}>
            <span className="trending-rank hot">&#128293;</span>
            <div className="trending-info">
              <span className="trending-name">Minecraft</span>
              <span className="trending-meta">#1 Global &middot; 170M+ players</span>
            </div>
          </Link>
          <Link href="/game/roblox" className="trending-item" style={{ textDecoration: 'none' }}>
            <span className="trending-rank hot">&#128293;</span>
            <div className="trending-info">
              <span className="trending-name">Roblox</span>
              <span className="trending-meta">#2 Global &middot; 220M+ players</span>
            </div>
          </Link>
          <Link href="/game/fortnite" className="trending-item" style={{ textDecoration: 'none' }}>
            <span className="trending-rank rising">&#128200;</span>
            <div className="trending-info">
              <span className="trending-name">Fortnite</span>
              <span className="trending-meta">#3 Global &middot; 100M+ players</span>
            </div>
          </Link>
          <Link href="/game/league-of-legends" className="trending-item" style={{ textDecoration: 'none' }}>
            <span className="trending-rank rising">&#128200;</span>
            <div className="trending-info">
              <span className="trending-name">League of Legends</span>
              <span className="trending-meta">#4 Global &middot; 150M+ players</span>
            </div>
          </Link>
          <Link href="/game/valorant" className="trending-item" style={{ textDecoration: 'none' }}>
            <span className="trending-rank rising">&#128200;</span>
            <div className="trending-info">
              <span className="trending-name">Valorant</span>
              <span className="trending-meta">#8 Global &middot; 28M+ players</span>
            </div>
          </Link>
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
          <Link href="/blog/best-rpg-games-2026" className="sidebar-blog-item">
            <span className="sidebar-blog-category">Rankings</span>
            <span className="sidebar-blog-title">The 15 Best RPG Games to Play in 2026</span>
          </Link>
          <Link href="/blog/gaming-on-a-budget" className="sidebar-blog-item">
            <span className="sidebar-blog-category">Guide</span>
            <span className="sidebar-blog-title">How to Game on a Budget</span>
          </Link>
          <Link href="/blog/best-cozy-games-2026" className="sidebar-blog-item">
            <span className="sidebar-blog-category">Rankings</span>
            <span className="sidebar-blog-title">The 10 Best Cozy Games for Relaxing</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
