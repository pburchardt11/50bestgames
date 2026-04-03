'use client';

export default function BlogHeroImage({ slug, title }) {
  return (
    <img
      className="blog-hero-image"
      src={`/images/blog/${slug}/hero.jpg`}
      alt={title}
      onError={(e) => { e.target.style.display = 'none'; }}
    />
  );
}
