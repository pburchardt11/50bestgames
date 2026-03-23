import Link from 'next/link';
import { BLOG_POSTS } from '@/data/blog-data';

export const metadata = {
  title: 'Blog — Gaming News, Guides & Analysis | 50 Best Games',
  description: 'Expert gaming analysis, guides, industry insights, and editorial content from the 50 Best Games team.',
};

export default function BlogPage() {
  const featured = BLOG_POSTS.find((p) => p.featured);
  const rest = BLOG_POSTS.filter((p) => !p.featured);

  return (
    <>
      <header className="blog-hero">
        <div className="hero-container">
          <h1 className="hero-title">The <span className="highlight">50 Best Games</span> Blog</h1>
          <p className="hero-subtitle">Expert analysis, rankings, guides, and deep dives into the world of online gaming.</p>
        </div>
      </header>

      <main className="blog-listing-main">
        <div className="blog-listing-container">
          {/* Featured Post */}
          {featured && (
            <section className="featured-post">
              <Link href={`/blog/${featured.slug}`} className="featured-post-card">
                <div
                  className="featured-post-image"
                  style={{ background: `url('/images/blog/${featured.slug}/hero.jpg') center/cover no-repeat, ${featured.gradient}` }}
                >
                  <span className="blog-card-category">{featured.category}</span>
                  <span className="featured-badge">Featured</span>
                </div>
                <div className="featured-post-content">
                  <h2>{featured.title}</h2>
                  <p>{featured.description}</p>
                  <div className="featured-post-meta">
                    <span>By 50 Best Games Editorial Team</span>
                    <span>{featured.date}</span>
                    <span>{featured.readTime}</span>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* Blog Grid */}
          <section className="blog-grid-section">
            <div className="blog-grid">
              {rest.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                  <div
                    className="blog-card-image"
                    style={{ background: `url('/images/blog/${post.slug}/hero.jpg') center/cover no-repeat, ${post.gradient}` }}
                  >
                    <span className="blog-card-category">{post.category}</span>
                  </div>
                  <div className="blog-card-content">
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                    <span className="blog-card-date">{post.date} &middot; {post.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
