import Link from 'next/link';
import { LIST_CATEGORIES } from '@/data/list-categories';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata = {
  title: 'Top 10 Game Lists — Best Games by Category',
  description: 'Browse our curated Top 10 lists: best free games, best battle royale, best RPGs, best mobile games, and more. Updated for 2026.',
  alternates: { canonical: 'https://50bestgames.com/lists' },
};

export default function ListsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Top 10 Lists' },
      ]} />

      <div className="breadcrumbs" style={{ paddingTop: 'calc(var(--nav-height) + 0.75rem)' }}>
        <div className="breadcrumbs-container">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Top 10 Lists</span>
        </div>
      </div>

      <main className="list-page">
        <div className="list-page-container">
          <div className="list-hero">
            <h1>Top 10 <span className="highlight">Game Lists</span></h1>
            <p>Curated rankings by category, platform, and more. Find the best games in every genre.</p>
          </div>

          <div className="list-categories" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
            {LIST_CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={`/lists/${cat.slug}`} className="similar-game-card" style={{ padding: 'var(--space-6)' }}>
                <div style={{ fontSize: '2rem', marginBottom: 'var(--space-3)' }}>{cat.icon}</div>
                <h3 style={{ color: 'var(--text-primary)', fontSize: 'var(--fs-lg)', marginBottom: 'var(--space-2)' }}>{cat.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-sm)', lineHeight: 1.5 }}>{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
