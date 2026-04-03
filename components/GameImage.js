'use client';

export function GameHeroImage({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="game-hero-img"
      onError={(e) => { e.target.src = src.replace('.jpg', '.svg'); }}
    />
  );
}

export function GameScreenshots({ slug, name }) {
  const screenshots = [1, 2, 3].map((i) => `/images/games/${slug}/screenshot-${i}.jpg`);
  return (
    <div className="game-screenshots">
      {screenshots.map((s, i) => (
        <img
          key={i}
          src={s}
          alt={`${name} screenshot ${i + 1}`}
          className="game-screenshot"
          loading="lazy"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      ))}
    </div>
  );
}

export function SimilarGameImage({ slug, name }) {
  return (
    <img
      src={`/images/games/${slug}/header.jpg`}
      alt={name}
      className="similar-game-img"
      loading="lazy"
      onError={(e) => { e.target.src = `/images/games/${slug}/header.svg`; }}
    />
  );
}

export function ListGameImage({ slug, name }) {
  return (
    <img
      src={`/images/games/${slug}/header.jpg`}
      alt={name}
      className="list-game-image"
      loading="lazy"
      onError={(e) => { e.target.style.display = 'none'; }}
    />
  );
}
