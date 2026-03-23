'use client';
import { useState, useMemo } from 'react';
import { GAMES_DATA, CATEGORIES } from '@/data/games-data';
import GameCard from '@/components/GameCard';
import GameModal from '@/components/GameModal';
import AdUnit from '@/components/AdUnit';

const SORT_OPTIONS = ['rank', 'name', 'rating', 'downloads'];

function parseDownloads(str) {
  if (!str) return 0;
  const num = parseFloat(str.replace(/[^0-9.]/g, ''));
  if (str.includes('B')) return num * 1000000000;
  if (str.includes('M')) return num * 1000000;
  if (str.includes('K')) return num * 1000;
  return num;
}

export default function RankingsClient() {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('rank');
  const [search, setSearch] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [showCount, setShowCount] = useState(50);

  const allGames = GAMES_DATA.globalTop50.concat(GAMES_DATA.extendedTop200 || []);

  const filtered = useMemo(() => {
    let games = allGames;
    if (filter !== 'all') {
      const cat = CATEGORIES.find((c) => c.slug === filter);
      if (cat) {
        games = games.filter((g) => g.category.toLowerCase().includes(cat.name.split(' ')[0].toLowerCase()));
      }
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      games = games.filter((g) => g.name.toLowerCase().includes(q) || g.category.toLowerCase().includes(q));
    }
    const sorted = [...games];
    switch (sort) {
      case 'name': sorted.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'rating': sorted.sort((a, b) => b.rating - a.rating); break;
      case 'downloads': sorted.sort((a, b) => parseDownloads(b.totalDownloads) - parseDownloads(a.totalDownloads)); break;
      default: sorted.sort((a, b) => a.rank - b.rank);
    }
    return sorted;
  }, [filter, sort, search]);

  const visible = filtered.slice(0, showCount);

  return (
    <>
      <header className="hero rankings-hero">
        <div className="hero-container">
          <div className="hero-badge">Complete Rankings</div>
          <h1 className="hero-title">Global <span className="highlight">Top 200</span> Games</h1>
          <p className="hero-subtitle">The complete ranking of the most popular online games worldwide. Filter, sort, and search to find exactly what you&apos;re looking for.</p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">200</span>
              <span className="hero-stat-label">Games Ranked</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">14</span>
              <span className="hero-stat-label">Categories</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">2026</span>
              <span className="hero-stat-label">Season</span>
            </div>
          </div>
        </div>
      </header>

      <AdUnit />

      {/* Controls */}
      <div className="rankings-controls">
        <div className="rankings-controls-container">
          <div className="rankings-filters">
            <button
              className={`filter-btn${filter === 'all' ? ' active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                className={`filter-btn${filter === cat.slug ? ' active' : ''}`}
                onClick={() => setFilter(cat.slug)}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
          <div className="rankings-sort">
            <span className="sort-label">Sort:</span>
            {SORT_OPTIONS.map((s) => (
              <button
                key={s}
                className={`sort-btn${sort === s ? ' active' : ''}`}
                onClick={() => setSort(s)}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
            <input
              type="text"
              className="search-input"
              placeholder="Search games..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: '220px', marginLeft: 'auto' }}
            />
          </div>
        </div>
      </div>

      <main className="main-content">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <p className="results-count" style={{ marginBottom: '1rem' }}>
            Showing {visible.length} of {filtered.length} games
          </p>
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
              <button className="load-more-btn" onClick={() => setShowCount((c) => c + 50)}>
                Show More Games
              </button>
            </div>
          )}
        </div>
      </main>

      {selectedGame && <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />}
    </>
  );
}
