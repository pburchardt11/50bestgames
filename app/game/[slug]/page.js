import Link from 'next/link';
import { GAMES_DATA, COUNTRY_DATA } from '@/data/games-data';
import { GAME_YOUTUBERS } from '@/data/youtubers-data';
import { GameJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import { GameHeroImage, GameScreenshots, SimilarGameImage } from '@/components/GameImage';

const allGames = GAMES_DATA.globalTop50.concat(GAMES_DATA.extendedTop200 || []);
const gamesById = {};
allGames.forEach((g) => { gamesById[g.id] = g; });

export async function generateStaticParams() {
  return allGames.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const game = allGames.find((g) => g.slug === slug);
  if (!game) return { title: 'Game Not Found' };

  const title = `${game.name} — Rating, Platforms, Players & Review`;
  const description = `${game.name} is ranked #${game.rank} globally. ${game.freeToPlay ? 'Free to play' : game.price} on ${game.platforms.join(', ')}. ${game.monthlyPlayers} monthly players. ${game.description.slice(0, 120)}...`;

  return {
    title,
    description,
    alternates: { canonical: `https://50bestgames.com/game/${slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      images: [`/images/games/${slug}/header.jpg`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${game.name} — #${game.rank} Global`,
      description,
      images: [`/images/games/${slug}/header.jpg`],
    },
  };
}

function getStars(rating) {
  const stars = [];
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.3;
  for (let i = 0; i < full; i++) stars.push(<span key={`f${i}`} className="star full">&#9733;</span>);
  if (hasHalf) stars.push(<span key="h" className="star half">&#9733;</span>);
  const empty = 5 - full - (hasHalf ? 1 : 0);
  for (let i = 0; i < empty; i++) stars.push(<span key={`e${i}`} className="star empty">&#9733;</span>);
  return stars;
}

function getSimilarGames(game) {
  return allGames
    .filter((g) => g.id !== game.id && g.category === game.category)
    .slice(0, 6);
}

function getCountriesForGame(game) {
  if (!game.topCountries) return [];
  return game.topCountries
    .map((code) => {
      const entry = Object.entries(COUNTRY_DATA).find(([, data]) => data.code === code);
      if (!entry) return null;
      return { slug: entry[0], ...entry[1] };
    })
    .filter(Boolean);
}

export default async function GamePage({ params }) {
  const { slug } = await params;
  const game = allGames.find((g) => g.slug === slug);

  if (!game) {
    return (
      <main className="page-content">
        <div className="page-container">
          <h1>Game Not Found</h1>
          <p>The requested game does not exist.</p>
          <Link href="/" className="back-link">Back to Rankings</Link>
        </div>
      </main>
    );
  }

  const youtubers = GAME_YOUTUBERS[game.id] || [];
  const similarGames = getSimilarGames(game);
  const popularCountries = getCountriesForGame(game);
  const imageUrl = `/images/games/${game.slug}/header.jpg`;

  return (
    <>
      <GameJsonLd game={game} />
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Rankings', url: '/rankings' },
        { name: game.name },
      ]} />

      {/* Breadcrumbs */}
      <div className="breadcrumbs" style={{ paddingTop: 'calc(var(--nav-height) + 0.75rem)' }}>
        <div className="breadcrumbs-container">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <Link href="/rankings">Rankings</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{game.name}</span>
        </div>
      </div>

      <main className="game-page">
        <div className="game-page-container">
          {/* Hero Section */}
          <div className="game-hero">
            <div className="game-hero-image">
              <GameHeroImage src={imageUrl} alt={game.name} />
              <div className="game-hero-overlay">
                <span className="game-hero-rank">#{game.rank} Global</span>
              </div>
            </div>
            <div className="game-hero-info">
              <h1 className="game-hero-title">{game.name}</h1>
              <span className="game-hero-category">{game.category}</span>
              <div className="game-hero-rating">
                {getStars(game.rating)}
                <span className="game-hero-rating-num">{game.rating} / 5</span>
              </div>
              <div className="game-hero-meta">
                <div className="game-meta-item">
                  <span className="game-meta-label">Monthly Players</span>
                  <span className="game-meta-value">{game.monthlyPlayers}</span>
                </div>
                <div className="game-meta-item">
                  <span className="game-meta-label">Downloads</span>
                  <span className="game-meta-value">{game.totalDownloads}</span>
                </div>
                <div className="game-meta-item">
                  <span className="game-meta-label">Price</span>
                  <span className={`game-meta-value ${game.freeToPlay ? 'free-label' : ''}`}>
                    {game.freeToPlay ? 'Free to Play' : game.price}
                  </span>
                </div>
                <div className="game-meta-item">
                  <span className="game-meta-label">Age Rating</span>
                  <span className="game-meta-value">{game.ageRating}</span>
                </div>
              </div>
              <div className="game-hero-platforms">
                {game.platforms.map((p) => (
                  <span key={p} className="modal-platform">{p}</span>
                ))}
              </div>
              <div className="game-hero-badges">
                {game.badges && game.badges.map((badge) => (
                  <span key={badge} className="badge">{badge}</span>
                ))}
              </div>
              {game.officialUrl && (
                <a href={game.officialUrl} target="_blank" rel="noopener noreferrer" className="game-hero-cta">
                  Visit Official Site &rarr;
                </a>
              )}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="game-content-grid">
            <div className="game-main-content">
              {/* About */}
              <section className="game-section">
                <h2>About {game.name}</h2>
                <p className="game-description">{game.description}</p>
              </section>

              {/* How to Play */}
              {game.howToPlay && (
                <section className="game-section">
                  <h2>How to Play</h2>
                  <p className="game-description">{game.howToPlay}</p>
                </section>
              )}

              {/* Screenshots */}
              <section className="game-section">
                <h2>Screenshots</h2>
                <GameScreenshots slug={game.slug} name={game.name} />
              </section>

              {/* YouTubers */}
              {youtubers.length > 0 && (
                <section className="game-section">
                  <h2>Top {game.name} YouTubers</h2>
                  <div className="game-youtubers">
                    {youtubers.map((yt) => (
                      <a key={yt.name} href={yt.url} target="_blank" rel="noopener noreferrer" className="youtuber-item">
                        <span className="youtuber-icon">&#9654;</span>
                        <span className="youtuber-name">{yt.name}</span>
                        <span className="youtuber-subs">{yt.subscribers} subscribers</span>
                      </a>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar Info */}
            <aside className="game-sidebar-info">
              {/* Game Details */}
              <div className="game-detail-card">
                <h3>Game Details</h3>
                <div className="game-detail-list">
                  <div className="game-detail-row"><span>Developer</span><span>{game.developer}</span></div>
                  <div className="game-detail-row"><span>Publisher</span><span>{game.publisher}</span></div>
                  <div className="game-detail-row"><span>Release Year</span><span>{game.releaseYear}</span></div>
                  <div className="game-detail-row"><span>Rating</span><span>{game.rating} / 5</span></div>
                  <div className="game-detail-row"><span>Downloads</span><span>{game.totalDownloads}</span></div>
                  <div className="game-detail-row"><span>Monthly Players</span><span>{game.monthlyPlayers}</span></div>
                  <div className="game-detail-row"><span>Age Rating</span><span>{game.ageRating}</span></div>
                  <div className="game-detail-row">
                    <span>Price</span>
                    <span className={game.freeToPlay ? 'free-label' : ''}>{game.freeToPlay ? 'Free to Play' : game.price}</span>
                  </div>
                </div>
              </div>

              {/* Popular In Countries */}
              {popularCountries.length > 0 && (
                <div className="game-detail-card">
                  <h3>Popular In</h3>
                  <div className="game-country-links">
                    {popularCountries.map((c) => (
                      <Link key={c.slug} href={`/country/${c.slug}`} className="game-country-link">
                        <span>{c.flag}</span>
                        <span>{c.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Blog Posts */}
              <div className="game-detail-card">
                <h3>From the Blog</h3>
                <div className="game-blog-links">
                  <Link href="/blog/top-battle-royale-games-2026" className="game-blog-link">Best Battle Royale Games 2026</Link>
                  <Link href="/blog/best-games-low-end-pc" className="game-blog-link">Best Games for Low-End PCs</Link>
                  <Link href="/blog/best-multiplayer-games-friends" className="game-blog-link">Best Multiplayer Games</Link>
                </div>
              </div>
            </aside>
          </div>

          {/* Similar Games */}
          {similarGames.length > 0 && (
            <section className="game-section game-similar">
              <h2>Similar {game.category} Games</h2>
              <div className="similar-games-grid">
                {similarGames.map((sg) => (
                  <Link key={sg.id} href={`/game/${sg.slug}`} className="similar-game-card">
                    <SimilarGameImage slug={sg.slug} name={sg.name} />
                    <div className="similar-game-info">
                      <span className="similar-game-rank">#{sg.rank}</span>
                      <h4>{sg.name}</h4>
                      <span className="similar-game-meta">{sg.rating} &#9733; &middot; {sg.monthlyPlayers}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Navigation */}
          <div className="game-nav">
            {game.rank > 1 && (
              <Link href={`/game/${allGames.find(g => g.rank === game.rank - 1)?.slug || ''}`} className="game-nav-link">
                &larr; #{game.rank - 1} {allGames.find(g => g.rank === game.rank - 1)?.name}
              </Link>
            )}
            <Link href="/rankings" className="game-nav-link game-nav-center">View All Rankings</Link>
            {game.rank < 200 && (
              <Link href={`/game/${allGames.find(g => g.rank === game.rank + 1)?.slug || ''}`} className="game-nav-link">
                #{game.rank + 1} {allGames.find(g => g.rank === game.rank + 1)?.name} &rarr;
              </Link>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
