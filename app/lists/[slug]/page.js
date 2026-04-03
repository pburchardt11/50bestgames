import Link from 'next/link';
import { GAMES_DATA } from '@/data/games-data';
import { LIST_CATEGORIES } from '@/data/list-categories';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { ListGameImage } from '@/components/GameImage';

const allGames = GAMES_DATA.globalTop50.concat(GAMES_DATA.extendedTop200 || []);

export async function generateStaticParams() {
  return LIST_CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = LIST_CATEGORIES.find((c) => c.slug === slug);
  if (!category) return { title: 'List Not Found' };

  return {
    title: category.title,
    description: category.description,
    alternates: { canonical: `https://50bestgames.com/lists/${slug}` },
    openGraph: {
      title: category.title,
      description: category.description,
      type: 'article',
    },
  };
}

function getGamesForCategory(category) {
  let games = [...allGames];
  if (category.filter) {
    games = games.filter(category.filter);
  }
  if (category.sort) {
    games.sort(category.sort);
  } else {
    games.sort((a, b) => a.rank - b.rank);
  }
  return games.slice(0, 10);
}

export default async function ListPage({ params }) {
  const { slug } = await params;
  const category = LIST_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return (
      <main className="page-content">
        <div className="page-container">
          <h1>List Not Found</h1>
          <Link href="/lists">Browse all lists</Link>
        </div>
      </main>
    );
  }

  const games = getGamesForCategory(category);
  const otherLists = LIST_CATEGORIES.filter((c) => c.slug !== slug).slice(0, 6);

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Top 10 Lists', url: '/lists' },
        { name: category.title },
      ]} />

      <div className="breadcrumbs" style={{ paddingTop: 'calc(var(--nav-height) + 0.75rem)' }}>
        <div className="breadcrumbs-container">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <Link href="/lists">Lists</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{category.title}</span>
        </div>
      </div>

      <main className="list-page">
        <div className="list-page-container">
          <div className="list-hero">
            <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>{category.icon}</div>
            <h1>{category.title}</h1>
            <p>{category.description}</p>
          </div>

          <section className="list-section">
            {games.map((game, i) => (
              <Link key={game.id} href={`/game/${game.slug}`} className="list-game-row">
                <span className="list-game-rank">#{i + 1}</span>
                <ListGameImage slug={game.slug} name={game.name} />
                <div className="list-game-info">
                  <span className="list-game-name">{game.name}</span>
                  <span className="list-game-category">{game.category}</span>
                </div>
                <div className="list-game-stats">
                  <div className="list-game-stat">
                    <span className="list-game-stat-value">{game.rating} &#9733;</span>
                    <span className="list-game-stat-label">Rating</span>
                  </div>
                  <div className="list-game-stat">
                    <span className="list-game-stat-value">{game.monthlyPlayers}</span>
                    <span className="list-game-stat-label">Players</span>
                  </div>
                  <div className="list-game-stat">
                    <span className="list-game-stat-value">{game.totalDownloads}</span>
                    <span className="list-game-stat-label">Downloads</span>
                  </div>
                </div>
                <span className={`list-game-price ${game.freeToPlay ? 'free-label' : ''}`}>
                  {game.freeToPlay ? 'Free' : game.price}
                </span>
              </Link>
            ))}
          </section>

          {/* Other Lists */}
          <section className="list-section">
            <div className="list-section-header">
              <h2>More Top 10 Lists</h2>
              <Link href="/lists" className="view-all-link">View all lists &rarr;</Link>
            </div>
            <div className="list-categories">
              {otherLists.map((cat) => (
                <Link key={cat.slug} href={`/lists/${cat.slug}`} className="list-category-card">
                  <span>{cat.icon}</span>
                  <span>{cat.title.replace('Top 10 ', '').replace(' in 2026', '').replace(' of All Time', '')}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
