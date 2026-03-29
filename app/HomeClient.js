'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { GAMES_DATA, COUNTRY_DATA } from '@/data/games-data';
import GameCard from '@/components/GameCard';
import GameModal from '@/components/GameModal';
import Sidebar from '@/components/Sidebar';
// import AdUnit from '@/components/AdUnit';

const FILTER_OPTIONS = ['All', 'Battle Royale', 'MOBA', 'Sandbox', 'FPS', 'Mobile', 'RPG', 'Puzzle'];
const SORT_OPTIONS = ['rank', 'name', 'rating', 'downloads'];

function parseDownloads(str) {
  if (!str) return 0;
  const num = parseFloat(str.replace(/[^0-9.]/g, ''));
  if (str.includes('B')) return num * 1000000000;
  if (str.includes('M')) return num * 1000000;
  if (str.includes('K')) return num * 1000;
  return num;
}

export default function HomeClient() {
  const [selectedCountry, setSelectedCountry] = useState('global');
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('rank');
  const [selectedGame, setSelectedGame] = useState(null);
  const [showCount, setShowCount] = useState(50);

  const allGames = GAMES_DATA.globalTop50.concat(GAMES_DATA.extendedTop200 || []);
  const gamesById = useMemo(() => {
    const map = {};
    allGames.forEach((g) => { map[g.id] = g; });
    return map;
  }, []);

  const countryGames = useMemo(() => {
    if (selectedCountry === 'global') return allGames;
    const cd = COUNTRY_DATA[selectedCountry];
    if (!cd || !cd.topGames) return allGames;
    return cd.topGames.map((id) => gamesById[id]).filter(Boolean);
  }, [selectedCountry, gamesById]);

  const filtered = useMemo(() => {
    let games = countryGames;
    if (filter !== 'All') {
      games = games.filter((g) =>
        g.category.toLowerCase().includes(filter.toLowerCase()) ||
        (filter === 'Mobile' && g.platforms && g.platforms.includes('Mobile'))
      );
    }
    const sorted = [...games];
    switch (sort) {
      case 'name': sorted.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'rating': sorted.sort((a, b) => b.rating - a.rating); break;
      case 'downloads': sorted.sort((a, b) => parseDownloads(b.totalDownloads) - parseDownloads(a.totalDownloads)); break;
      default: sorted.sort((a, b) => a.rank - b.rank);
    }
    return sorted;
  }, [countryGames, filter, sort]);

  const visible = filtered.slice(0, showCount);

  const countries = useMemo(() => {
    const list = Object.entries(COUNTRY_DATA)
      .map(([slug, data]) => ({ value: slug, label: `${data.flag} ${data.name}` }))
      .sort((a, b) => a.label.replace(/[^\w]/g, '').localeCompare(b.label.replace(/[^\w]/g, '')));
    return [{ value: 'global', label: '🌐 Global Rankings' }, ...list];
  }, []);

  return (
    <>
      {/* Hero */}
      <header className="hero">
        <div className="hero-container">
          <div className="hero-badge">Updated March 2026</div>
          <h1 className="hero-title">The World&apos;s <span className="highlight">50 Best</span> Online Games</h1>
          <p className="hero-subtitle">The definitive ranking of the most played and downloaded games across every country. Curated by our editorial team with data from global app stores, Steam, and gaming platforms.</p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">200</span>
              <span className="hero-stat-label">Games Ranked</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">195</span>
              <span className="hero-stat-label">Countries</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">15</span>
              <span className="hero-stat-label">Categories</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">2026</span>
              <span className="hero-stat-label">Season</span>
            </div>
          </div>
        </div>
      </header>

      {/* Country Selector */}
      <section className="country-bar">
        <div className="country-bar-container">
          <label htmlFor="countrySelect" className="country-bar-label">View rankings for:</label>
          <select
            id="countrySelect"
            className="country-select"
            value={selectedCountry}
            onChange={(e) => { setSelectedCountry(e.target.value); setShowCount(50); }}
          >
            {countries.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <div className="country-bar-filters">
            {FILTER_OPTIONS.map((f) => (
              <button
                key={f}
                className={`filter-btn${filter === f ? ' active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sort */}
      <section className="sort-bar">
        <div className="sort-bar-container">
          <span className="sort-label">Sort by:</span>
          {SORT_OPTIONS.map((s) => (
            <button
              key={s}
              className={`sort-btn${sort === s ? ' active' : ''}`}
              onClick={() => setSort(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
          <span className="results-count">Showing {visible.length} of {filtered.length} games</span>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-container">
          <div className="games-section">
            <div className="games-grid">
              {visible.length > 0 ? (
                visible.map((game) => (
                  <GameCard key={game.id} game={game} onSelect={setSelectedGame} />
                ))
              ) : (
                <div className="no-results">No games found matching your filters.</div>
              )}
            </div>
            {showCount < filtered.length && (
              <div className="load-more-container" style={{ display: 'flex' }}>
                <button
                  className="load-more-btn"
                  onClick={() => setShowCount((c) => c + 50)}
                >
                  Show More Games
                </button>
              </div>
            )}
          </div>
          <Sidebar />
        </div>
      </main>

      {/* Countries Section */}
      <section className="countries-section">
        <div className="countries-container">
          <h2 className="section-title">Explore by Country</h2>
          <div className="countries-grid">
            {Object.entries(COUNTRY_DATA).map(([slug, data]) => (
              <Link key={slug} href={`/country/${slug}`} className="country-card">
                <span className="country-flag">{data.flag}</span>
                <span className="country-name">{data.name}</span>
                <span className="country-games-count">{data.totalPlayers} players</span>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/countries" className="view-all-link" style={{ fontSize: '1.1rem' }}>View All Countries &rarr;</Link>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="blog-preview-section">
        <div className="blog-preview-container">
          <div className="section-header">
            <h2 className="section-title">Latest from the Blog</h2>
            <Link href="/blog" className="view-all-link">View all articles &rarr;</Link>
          </div>
          <div className="blog-grid">
            {[
              { slug: 'top-battle-royale-games-2026', cat: 'Rankings', title: 'The 10 Best Battle Royale Games to Play in 2026', desc: 'From Fortnite to newcomers, our definitive ranking of battle royale games this year.', date: 'March 2026', read: '8 min read', grad: 'linear-gradient(135deg, #7c3aed, #ef4444)' },
              { slug: 'mobile-gaming-revolution', cat: 'Industry', title: 'How Mobile Gaming Took Over the World', desc: 'A deep dive into why mobile gaming now generates more revenue than console and PC combined.', date: 'March 2026', read: '10 min read', grad: 'linear-gradient(135deg, #06b6d4, #3b82f6)' },
              { slug: 'ai-in-gaming-2026', cat: 'Technology', title: 'How AI is Transforming Gaming in 2026', desc: 'From smarter NPCs to procedural worlds, artificial intelligence is reshaping every aspect of gaming.', date: 'March 2026', read: '9 min read', grad: 'linear-gradient(135deg, #10b981, #06b6d4)' },
              { slug: 'esports-guide-beginners', cat: 'Guide', title: 'The Complete Beginner\'s Guide to Esports', desc: 'Everything you need to know to start watching and understanding competitive gaming.', date: 'March 2026', read: '12 min read', grad: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
            ].map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                <div className="blog-card-image" style={{ background: `url('/images/blog/${post.slug}/hero.jpg') center/cover no-repeat, ${post.grad}` }}>
                  <span className="blog-card-category">{post.cat}</span>
                </div>
                <div className="blog-card-content">
                  <h3>{post.title}</h3>
                  <p>{post.desc}</p>
                  <span className="blog-card-date">{post.date} &middot; {post.read}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedGame && <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />}
    </>
  );
}
