'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { GAMES_DATA } from '@/data/games-data';

export default function SearchDropdown() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const ref = useRef(null);
  const router = useRouter();

  const allGames = GAMES_DATA.globalTop50.concat(GAMES_DATA.extendedTop200 || []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    const q = query.toLowerCase();
    const matched = allGames
      .filter((g) => g.name.toLowerCase().includes(q) || g.category.toLowerCase().includes(q))
      .slice(0, 8);
    setResults(matched);
    setOpen(matched.length > 0);
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

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <input
        type="text"
        className="search-input"
        placeholder="Search games, countries, categories..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => { if (results.length > 0) setOpen(true); }}
      />
      <div className={`search-dropdown${open ? ' open' : ''}`}>
        {results.map((game) => (
          <button
            key={game.id}
            className="search-dropdown-item"
            onClick={() => {
              setOpen(false);
              setQuery('');
              router.push(`/rankings#game-${game.slug}`);
            }}
            style={{ width: '100%', textAlign: 'left', cursor: 'pointer' }}
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
        {results.length > 0 && (
          <div className="search-dropdown-footer">
            <button
              className="search-dropdown-all"
              onClick={() => {
                setOpen(false);
                router.push('/rankings');
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              View all rankings &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
