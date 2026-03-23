import RankingsClient from './RankingsClient';

export const metadata = {
  title: 'Global Rankings — Top 200 Games | 50 Best Games',
  description: 'The complete ranking of the 200 most popular online games worldwide. Filter by category, sort by rank, rating, or downloads.',
};

export default function RankingsPage() {
  return <RankingsClient />;
}
