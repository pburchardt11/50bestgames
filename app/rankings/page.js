import RankingsClient from './RankingsClient';

export const metadata = {
  title: 'Global Game Rankings 2026 — Top 200 Games',
  description: 'The complete global ranking of the 200 most popular online games in 2026. Filter by category, sort by rating or downloads.',
  alternates: { canonical: 'https://50bestgames.com/rankings' },
};

export default function RankingsPage() {
  return <RankingsClient />;
}
