'use client';
import Link from 'next/link';

function getStars(rating) {
  const stars = [];
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.3;
  for (let i = 0; i < full; i++) {
    stars.push(<span key={`f${i}`} className="star full">&#9733;</span>);
  }
  if (hasHalf) {
    stars.push(<span key="h" className="star half">&#9733;</span>);
  }
  const empty = 5 - full - (hasHalf ? 1 : 0);
  for (let i = 0; i < empty; i++) {
    stars.push(<span key={`e${i}`} className="star empty">&#9733;</span>);
  }
  return stars;
}

export default function GameCard({ game, onSelect }) {
  function getImageUrl(game) {
    return `/images/games/${game.slug}/header.jpg`;
  }
  function getFallbackUrl(game) {
    return `/images/games/${game.slug}/header.svg`;
  }

  return (
    <div
      className="game-card visible"
      onClick={() => onSelect && onSelect(game)}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' && onSelect) onSelect(game); }}
    >
      <div className="card-header">
        <span className="card-rank">#{game.rank}</span>
        <div className="card-image">
          <img
            className="card-img"
            src={getImageUrl(game)}
            alt={game.name}
            loading="lazy"
            onError={(e) => {
              if (!e.target.dataset.fallback) {
                e.target.dataset.fallback = '1';
                e.target.src = getFallbackUrl(game);
              }
            }}
          />
          <div className="card-overlay">
            <div className="card-platforms">
              {game.platforms && game.platforms.map((p) => (
                <span key={p} className="platform-icon">
                  {p === 'PC' ? '\uD83D\uDCBB' : p === 'Mobile' ? '\uD83D\uDCF1' : p === 'Console' ? '\uD83C\uDFAE' : p === 'VR' ? '\uD83E\uDD7D' : '\uD83C\uDFAE'}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <h3 className="card-title">{game.name}</h3>
        <span className="card-category">{game.category}</span>
        <div className="card-meta">
          <div className="card-rating">
            {getStars(game.rating)}
            <span style={{ marginLeft: '4px' }}>{game.rating}</span>
          </div>
          <span className="card-players">{game.monthlyPlayers} players</span>
        </div>
        <div className="card-badges">
          {game.badges && game.badges.map((badge) => (
            <span key={badge} className="badge">{badge}</span>
          ))}
        </div>
        <div className="card-footer">
          <span className={`price-tag ${game.freeToPlay ? 'free' : 'paid'}`}>
            {game.freeToPlay ? 'Free to Play' : game.price}
          </span>
          <Link
            href={`/game/${game.slug}`}
            className="card-details-link"
            onClick={(e) => e.stopPropagation()}
          >
            View Details &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export function GameCardSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-card-image" />
      <div className="skeleton-card-body">
        <div className="skeleton-line skeleton-line-medium" />
        <div className="skeleton-line skeleton-line-short" />
        <div className="skeleton-line skeleton-line-full" />
        <div className="skeleton-line skeleton-line-short" style={{ marginTop: '0.5rem' }} />
      </div>
    </div>
  );
}
