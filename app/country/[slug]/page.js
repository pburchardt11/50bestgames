import { COUNTRY_DATA, GAMES_DATA } from '@/data/games-data';
import CountryClient from './CountryClient';

export async function generateStaticParams() {
  return Object.keys(COUNTRY_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const country = COUNTRY_DATA[slug];
  if (!country) return { title: 'Country Not Found | 50 Best Games' };
  return {
    title: `Top Games in ${country.name} — 50 Best Games`,
    description: `Discover the most popular games in ${country.name}. ${country.description}`,
  };
}

export default async function CountryPage({ params }) {
  const { slug } = await params;
  const country = COUNTRY_DATA[slug];

  if (!country) {
    return (
      <main className="page-content">
        <div className="page-container">
          <h1>Country Not Found</h1>
          <p>The requested country page does not exist.</p>
        </div>
      </main>
    );
  }

  const allGames = GAMES_DATA.globalTop50.concat(GAMES_DATA.extendedTop200 || []);
  const gamesById = {};
  allGames.forEach((g) => { gamesById[g.id] = g; });

  const countryGames = (country.topGames || [])
    .map((id) => gamesById[id])
    .filter(Boolean);

  return (
    <CountryClient
      slug={slug}
      country={country}
      games={countryGames}
      allCountries={COUNTRY_DATA}
    />
  );
}
