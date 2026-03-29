export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "50 Best Games",
    "url": "https://50bestgames.com",
    "description": "The world's most popular online games ranked by country",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://50bestgames.com/?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function GameJsonLd({ game }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": game.name,
    "description": game.description,
    "genre": game.category,
    "gamePlatform": game.platforms,
    "author": { "@type": "Organization", "name": game.developer },
    "publisher": { "@type": "Organization", "name": game.publisher },
    "datePublished": game.releaseYear.toString(),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": game.rating,
      "bestRating": 5,
      "ratingCount": parseInt(game.monthlyPlayers) || 1000
    },
    "offers": game.freeToPlay ? {
      "@type": "Offer",
      "price": 0,
      "priceCurrency": "USD"
    } : {
      "@type": "Offer",
      "price": parseFloat(game.price?.replace('$','')) || 0,
      "priceCurrency": "USD"
    },
    "image": `https://50bestgames.com/images/games/${game.slug}/header.jpg`,
    "url": game.officialUrl
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function BlogPostJsonLd({ post }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.date,
    "author": { "@type": "Organization", "name": "50 Best Games Editorial Team" },
    "publisher": {
      "@type": "Organization",
      "name": "50 Best Games",
      "url": "https://50bestgames.com"
    },
    "image": `https://50bestgames.com/images/blog/${post.slug}/hero.jpg`,
    "mainEntityOfPage": `https://50bestgames.com/blog/${post.slug}`
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function BreadcrumbJsonLd({ items }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url ? `https://50bestgames.com${item.url}` : undefined
    }))
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
