import Link from 'next/link';
import { BLOG_POSTS } from '@/data/blog-data';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found | 50 Best Games' };
  return {
    title: `${post.title} | 50 Best Games Blog`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="page-content">
        <div className="page-container">
          <h1>Post Not Found</h1>
          <p>The requested blog post does not exist.</p>
        </div>
      </main>
    );
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <main className="page-content">
        <div className="page-container">
          <article className="blog-post">
            <header className="blog-post-header">
              <div className="blog-post-meta">
                <span className="blog-category">{post.category}</span>
                <span className="blog-date">{post.date}</span>
                <span className="blog-read-time">{post.readTime}</span>
              </div>
              <h1>{post.title}</h1>
              <p className="blog-post-subtitle">{post.description}</p>
              <span className="blog-author">By 50 Best Games Editorial Team</span>
            </header>

            <div className="blog-hero-image-container" style={{ background: post.gradient }}>
              <img
                className="blog-hero-image"
                src={`/images/blog/${post.slug}/hero.jpg`}
                alt={post.title}
              />
            </div>

            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="blog-share">
              <span>Share this article:</span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://50bestgames.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn share-twitter"
              >
                Twitter
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://50bestgames.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn share-facebook"
              >
                Facebook
              </a>
              <a
                href={`https://reddit.com/submit?url=${encodeURIComponent(`https://50bestgames.com/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn share-reddit"
              >
                Reddit
              </a>
            </div>
          </article>
        </div>
      </main>

      {/* Related Posts */}
      <section className="related-posts">
        <h2>Related Articles</h2>
        <div className="blog-grid">
          {relatedPosts.map((rp) => (
            <Link key={rp.slug} href={`/blog/${rp.slug}`} className="blog-card">
              <div
                className="blog-card-image"
                style={{ background: `url('/images/blog/${rp.slug}/hero.jpg') center/cover no-repeat, ${rp.gradient}` }}
              >
                <span className="blog-card-category">{rp.category}</span>
              </div>
              <div className="blog-card-content">
                <h3>{rp.title}</h3>
                <p>{rp.description}</p>
                <span className="blog-card-date">{rp.date} &middot; {rp.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
