'use client';
import { useState } from 'react';
import Link from 'next/link';
import GameCard from '@/components/GameCard';
import GameModal from '@/components/GameModal';
// import AdUnit from '@/components/AdUnit';

export default function CountryClient({ slug, country, games, allCountries }) {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <>
      {/* Breadcrumbs */}
      <div className="breadcrumbs" style={{ paddingTop: 'calc(var(--nav-height) + 0.75rem)' }}>
        <div className="breadcrumbs-container">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <Link href="/countries">Countries</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{country.name}</span>
        </div>
      </div>

      {/* Country Hero */}
      <header className="country-hero">
        <div className="country-hero-container">
          <div className="country-hero-flag">{country.flag}</div>
          <h1 className="country-hero-name">Top Games in {country.name}</h1>
          <p className="country-hero-players">{country.totalPlayers} active players</p>
          <p className="country-hero-desc">{country.description}</p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">{games.length}</span>
              <span className="hero-stat-label">Top Games</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">{country.totalGames || 0}</span>
              <span className="hero-stat-label">Games Available</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">2026</span>
              <span className="hero-stat-label">Season</span>
            </div>
          </div>
        </div>
      </header>

      {/* AdUnit removed temporarily */}

      {/* Main Content */}
      <main className="main-content">
        <div className="content-container">
          <div className="games-section">
            <h2 className="section-title">Top {games.length} Games in {country.name}</h2>
            <div className="games-grid">
              {games.map((game, index) => {
                const rankedGame = { ...game, rank: index + 1 };
                return (
                  <GameCard key={game.id} game={rankedGame} onSelect={setSelectedGame} />
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="sidebar">
            <div className="sidebar-section">
              <h3 className="sidebar-title">Global Rankings</h3>
              <Link href="/rankings" className="sidebar-global-link">View Global Top 200 &rarr;</Link>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title">Other Countries</h3>
              <div className="sidebar-country-list">
                {Object.entries(allCountries)
                  .filter(([s]) => s !== slug)
                  .map(([s, data]) => (
                    <Link key={s} href={`/country/${s}`} className="sidebar-country-item">
                      <span className="sidebar-country-flag">{data.flag}</span>
                      {data.name}
                    </Link>
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {selectedGame && <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />}
    </>
  );
}
