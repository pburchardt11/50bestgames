'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { GAMES_DATA, COUNTRY_DATA } from '@/data/games-data';

export default function SearchDropdown() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [gameResults, setGameResults] = useState([]);
  const [countryResults, setCountryResults] = useState([]);
  const ref = useRef(null);
  const router = useRouter();

  const allGames = GAMES_DATA.globalTop50.concat(GAMES_DATA.extendedTop200 || []);
  const allCountries = Object.entries(COUNTRY_DATA).map(([slug, data]) => ({ slug, ...data }));

  useEffect(() => {
    if (query.trim().length < 2) {
      setGameResults([]);
      setCountryResults([]);
      setOpen(false);
      return;
    }
    const q = query.toLowerCase();

    const matchedGames = allGames
      .filter((g) => g.name.toLowerCase().includes(q) || g.category.toLowerCase().includes(q) || g.developer.toLowerCase().includes(q))
      .slice(0, 6);

    const matchedCountries = allCountries
      .filter((c) => c.name.toLowerCase().includes(q))
      .slice(0, 4);

    setGameResults(matchedGames);
    setCountryResults(matchedCountries);
    setOpen(matchedGames.length > 0 || matchedCountries.length > 0);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      setOpen(false);
      e.target.blur();
    }
  }

  const hasResults = gameResults.length > 0 || countryResults.length > 0;
  const noResults = query.trim().length >= 2 && !hasResults;

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <input
        type="text"
        className="search-input"
        placeholder="Search games, countries, categories..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => { if (hasResults) setOpen(true); }}
        onKeyDown={handleKeyDown}
      />
      <div className={`search-dropdown${open || noResults ? ' open' : ''}`}>
        {/* Country Results */}
        {countryResults.length > 0 && (
          <>
            <div className="search-dropdown-section-label">Countries</div>
            {countryResults.map((country) => (
              <button
                key={country.slug}
                className="search-dropdown-item"
                onClick={() => {
                  setOpen(false);
                  setQuery('');
                  router.push(`/country/${country.slug}`);
                }}
                style={{ width: '100%', textAlign: 'left', cursor: 'pointer', background: 'none', border: 'none', color: 'inherit', font: 'inherit' }}
              >
                <span className="search-dropdown-flag">{country.flag}</span>
                <div className="search-dropdown-info">
                  <span className="search-dropdown-name">{country.name}</span>
                  <span className="search-dropdown-meta">{country.totalPlayers} players</span>
                </div>
                <span className="search-dropdown-rank" style={{ color: 'var(--accent-secondary-light)' }}>View →</span>
              </button>
            ))}
          </>
        )}

        {/* Game Results */}
        {gameResults.length > 0 && (
          <>
            {countryResults.length > 0 && <div className="search-dropdown-section-label">Games</div>}
            {gameResults.map((game) => (
              <button
                key={game.id}
                className="search-dropdown-item"
                onClick={() => {
                  setOpen(false);
                  setQuery('');
                  router.push(`/rankings#game-${game.slug}`);
                }}
                style={{ width: '100%', textAlign: 'left', cursor: 'pointer', background: 'none', border: 'none', color: 'inherit', font: 'inherit' }}
              >
                <img
                  className="search-dropdown-img"
                  src={`/images/games/${game.slug}/header.jpg`}
                  alt={game.name}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="search-dropdown-info">
                  <span className="search-dropdown-name">{game.name}</span>
                  <span className="search-dropdown-meta">{game.category}</span>
                </div>
                <span className="search-dropdown-rank">#{game.rank}</span>
              </button>
            ))}
          </>
        )}

        {/* No results */}
        {noResults && (
          <div className="search-dropdown-empty">No games or countries found for &ldquo;{query}&rdquo;</div>
        )}

        {/* Footer */}
        {hasResults && (
          <div className="search-dropdown-footer">
            <button
              className="search-dropdown-all"
              onClick={() => {
                setOpen(false);
                router.push('/rankings');
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit' }}
            >
              View all rankings →
            </button>
            {' · '}
            <button
              className="search-dropdown-all"
              onClick={() => {
                setOpen(false);
                router.push('/countries');
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit' }}
            >
              All countries →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
