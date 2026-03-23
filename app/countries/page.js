import Link from 'next/link';
import { COUNTRY_DATA, GAMES_DATA } from '@/data/games-data';

export const metadata = {
  title: 'Game Rankings by Country — 50bestgames.com',
  description: 'Explore game rankings by country. See what the most popular games are in the United States, Brazil, Japan, South Korea, and 11 more countries.',
};

const REGIONS = {
  Americas: ['united-states', 'brazil', 'mexico'],
  Europe: ['germany', 'united-kingdom', 'france', 'russia', 'turkey'],
  Asia: ['japan', 'south-korea', 'china', 'india', 'indonesia', 'philippines', 'thailand'],
};

export default function CountriesPage() {
  const allGames = GAMES_DATA.globalTop50.concat(GAMES_DATA.extendedTop200 || []);
  const gamesById = {};
  allGames.forEach((g) => { gamesById[g.id] = g; });

  return (
    <>
      {/* Breadcrumbs */}
      <div className="breadcrumbs" style={{ paddingTop: 'calc(var(--nav-height) + 0.75rem)' }}>
        <div className="breadcrumbs-container">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Countries</span>
        </div>
      </div>

      {/* Hero */}
      <header className="hero">
        <div className="hero-container">
          <div className="hero-badge">15 Countries</div>
          <h1 className="hero-title">Game Rankings <span className="highlight">by Country</span></h1>
          <p className="hero-subtitle">Explore the most popular games in each country. Every region has unique gaming preferences shaped by culture, platforms, and local trends.</p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">15</span>
              <span className="hero-stat-label">Countries</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">200</span>
              <span className="hero-stat-label">Games Ranked</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">2.7B+</span>
              <span className="hero-stat-label">Total Players</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">2026</span>
              <span className="hero-stat-label">Season</span>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="countries-directory-container">
          {Object.entries(REGIONS).map(([region, slugs]) => (
            <section key={region} className="country-region-section">
              <h2 className="region-title">{region}</h2>
              <div className="country-directory-grid">
                {slugs.map((slug) => {
                  const data = COUNTRY_DATA[slug];
                  if (!data) return null;
                  const topGameNames = (data.topGames || [])
                    .slice(0, 5)
                    .map((id) => gamesById[id])
                    .filter(Boolean)
                    .map((g) => g.name);
                  return (
                    <Link key={slug} href={`/country/${slug}`} className="country-directory-card">
                      <div className="country-dir-flag">{data.flag}</div>
                      <div className="country-dir-name">{data.name}</div>
                      <div className="country-dir-players">{data.totalPlayers} players</div>
                      <div className="country-dir-top-games">
                        <div className="country-dir-label">Top Games</div>
                        <ol className="country-dir-game-list">
                          {topGameNames.map((name) => (
                            <li key={name}>{name}</li>
                          ))}
                        </ol>
                      </div>
                      <span className="country-dir-link">View Rankings &rarr;</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
