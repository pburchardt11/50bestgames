'use client';
import { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { GAME_YOUTUBERS } from '../data/youtubers-data';

export default function GameModal({ game, onClose }) {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!game) return null;

  const imageUrl = `/images/games/${game.slug}/header.jpg`;
  const screenshots = [1, 2, 3].map((i) => `/images/games/${game.slug}/screenshot-${i}.jpg`);

  return (
    <div
      className="modal-overlay open"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-body">
          {/* Gallery */}
          <div className="modal-gallery">
            <img
              className="modal-main-image"
              src={imageUrl}
              alt={game.name}
              onError={(e) => { e.target.src = `/images/games/${game.slug}/header.svg`; }}
            />
            <div className="modal-thumbnails">
              {screenshots.map((src, i) => (
                <img
                  key={i}
                  className="modal-thumb"
                  src={src}
                  alt={`${game.name} screenshot ${i + 1}`}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ))}
            </div>
          </div>

          {/* Header */}
          <div className="modal-header">
            <span className="modal-rank">#{game.rank} Global</span>
            <h2>{game.name}</h2>
            <span className="modal-category">{game.category}</span>
          </div>

          {/* Description */}
          <div className="modal-section">
            <h4>About</h4>
            <p>{game.description}</p>
          </div>

          {/* How to Play */}
          {game.howToPlay && (
            <div className="modal-section">
              <h4>How to Play</h4>
              <p>{game.howToPlay}</p>
            </div>
          )}

          {/* Details */}
          <div className="modal-details">
            <div className="detail-row">
              <strong>Developer:</strong> {game.developer}
            </div>
            <div className="detail-row">
              <strong>Publisher:</strong> {game.publisher}
            </div>
            <div className="detail-row">
              <strong>Release Year:</strong> {game.releaseYear}
            </div>
            <div className="detail-row">
              <strong>Rating:</strong> {game.rating} / 5
            </div>
            <div className="detail-row">
              <strong>Downloads:</strong> {game.totalDownloads}
            </div>
            <div className="detail-row">
              <strong>Monthly Players:</strong> {game.monthlyPlayers}
            </div>
            <div className="detail-row">
              <strong>Age Rating:</strong> {game.ageRating}
            </div>
            <div className="detail-row">
              <strong>Price:</strong>{' '}
              {game.freeToPlay ? (
                <span className="free-label">Free to Play</span>
              ) : (
                game.price
              )}
            </div>
          </div>

          {/* Platforms */}
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ marginBottom: '0.5rem' }}>Platforms</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {game.platforms && game.platforms.map((p) => (
                <span key={p} className="modal-platform">{p}</span>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="modal-badges">
            {game.badges && game.badges.map((badge) => (
              <span key={badge} className="badge">{badge}</span>
            ))}
          </div>

          {/* Top Countries */}
          {game.topCountries && game.topCountries.length > 0 && (
            <div className="modal-section">
              <h4>Popular In</h4>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {game.topCountries.map((code) => (
                  <span key={code} className="country-code">{code}</span>
                ))}
              </div>
            </div>
          )}

          {/* Top YouTubers */}
          {GAME_YOUTUBERS[game.id] && GAME_YOUTUBERS[game.id].length > 0 && (
            <div className="modal-youtubers">
              <h4>Top YouTubers</h4>
              <div className="youtuber-list">
                {GAME_YOUTUBERS[game.id].map((youtuber) => (
                  <a
                    key={youtuber.name}
                    href={youtuber.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="youtuber-item"
                  >
                    <span className="youtuber-icon">&#9654;</span>
                    <span className="youtuber-name">{youtuber.name}</span>
                    <span className="youtuber-subs">{youtuber.subscribers} subscribers</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link
              href={`/game/${game.slug}`}
              className="modal-link"
              style={{ flex: 1 }}
              onClick={onClose}
            >
              Full Game Page &rarr;
            </Link>
            {game.officialUrl && (
              <a
                href={game.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-link"
                style={{ flex: 1, background: 'var(--bg-elevated)', color: 'var(--text-primary)' }}
              >
                Official Site &rarr;
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
