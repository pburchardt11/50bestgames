import { GAMES_DATA, COUNTRY_DATA } from '@/data/games-data';
import { BLOG_POSTS } from '@/data/blog-data';
import { LIST_CATEGORIES } from '@/data/list-categories';

export default function sitemap() {
  const baseUrl = 'https://50bestgames.com';

  const allGames = GAMES_DATA.globalTop50.concat(GAMES_DATA.extendedTop200 || []);

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/rankings`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/countries`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/lists`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const gamePages = allGames.map(game => ({
    url: `${baseUrl}/game/${game.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: game.rank <= 50 ? 0.9 : 0.7,
  }));

  const countryPages = Object.keys(COUNTRY_DATA).map(slug => ({
    url: `${baseUrl}/country/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const blogPages = BLOG_POSTS.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const listPages = LIST_CATEGORIES.map(cat => ({
    url: `${baseUrl}/lists/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...gamePages, ...countryPages, ...blogPages, ...listPages];
}
