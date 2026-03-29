import Link from 'next/link';
import { COUNTRY_DATA, GAMES_DATA } from '@/data/games-data';

export const metadata = {
  title: 'Game Rankings by Country — All Countries',
  description: 'Explore the most popular online games in every country. Regional rankings, player counts, and gaming culture insights for 195+ countries.',
  alternates: { canonical: 'https://50bestgames.com/countries' },
};

const REGIONS = {
  'North America': ['united-states', 'canada', 'mexico', 'puerto-rico'],
  'Central America & Caribbean': [
    'guatemala', 'honduras', 'el-salvador', 'nicaragua', 'costa-rica', 'panama', 'belize',
    'cuba', 'jamaica', 'haiti', 'dominican-republic', 'trinidad-and-tobago', 'bahamas', 'barbados',
  ],
  'South America': [
    'brazil', 'argentina', 'colombia', 'chile', 'peru', 'venezuela', 'ecuador',
    'bolivia', 'paraguay', 'uruguay', 'guyana', 'suriname',
  ],
  'Western Europe': [
    'united-kingdom', 'france', 'germany', 'spain', 'italy', 'netherlands', 'belgium',
    'austria', 'switzerland', 'portugal', 'ireland', 'luxembourg', 'malta', 'cyprus',
    'greece', 'monaco', 'andorra', 'san-marino', 'liechtenstein',
  ],
  'Northern Europe': ['sweden', 'norway', 'denmark', 'finland', 'iceland'],
  'Eastern Europe': [
    'russia', 'poland', 'ukraine', 'czech-republic', 'romania', 'hungary', 'slovakia',
    'bulgaria', 'croatia', 'serbia', 'slovenia', 'bosnia-and-herzegovina', 'north-macedonia',
    'montenegro', 'albania', 'kosovo', 'moldova', 'belarus',
  ],
  'Baltic States': ['estonia', 'latvia', 'lithuania'],
  'Middle East': [
    'turkey', 'saudi-arabia', 'united-arab-emirates', 'israel', 'iran', 'iraq', 'qatar',
    'kuwait', 'bahrain', 'oman', 'jordan', 'lebanon', 'syria', 'palestine', 'yemen',
  ],
  'Central Asia & Caucasus': [
    'kazakhstan', 'uzbekistan', 'kyrgyzstan', 'tajikistan', 'turkmenistan',
    'georgia', 'armenia', 'azerbaijan',
  ],
  'East Asia': ['china', 'japan', 'south-korea', 'taiwan', 'hong-kong', 'mongolia'],
  'Southeast Asia': [
    'indonesia', 'philippines', 'thailand', 'vietnam', 'malaysia', 'singapore',
    'myanmar', 'cambodia', 'laos', 'brunei', 'timor-leste',
  ],
  'South Asia': [
    'india', 'pakistan', 'bangladesh', 'sri-lanka', 'nepal', 'bhutan', 'maldives', 'afghanistan',
  ],
  'North Africa': ['egypt', 'morocco', 'algeria', 'tunisia', 'libya', 'sudan', 'mauritania'],
  'West Africa': [
    'nigeria', 'ghana', 'senegal', 'ivory-coast', 'cameroon', 'mali', 'burkina-faso',
    'guinea', 'niger', 'togo', 'benin', 'sierra-leone', 'liberia', 'gambia',
    'guinea-bissau', 'cabo-verde',
  ],
  'East Africa': [
    'kenya', 'ethiopia', 'tanzania', 'uganda', 'rwanda', 'burundi', 'somalia',
    'south-sudan', 'eritrea', 'djibouti', 'madagascar', 'mauritius', 'seychelles', 'comoros',
  ],
  'Central & Southern Africa': [
    'south-africa', 'democratic-republic-of-congo', 'republic-of-congo', 'angola',
    'mozambique', 'zambia', 'zimbabwe', 'malawi', 'botswana', 'namibia',
    'gabon', 'equatorial-guinea', 'central-african-republic', 'chad',
    'sao-tome-and-principe', 'eswatini', 'lesotho',
  ],
  'Oceania': [
    'australia', 'new-zealand', 'papua-new-guinea', 'fiji', 'samoa', 'tonga',
    'vanuatu', 'solomon-islands', 'kiribati', 'marshall-islands', 'micronesia',
    'palau', 'nauru', 'tuvalu',
  ],
};

export default function CountriesPage() {
  const allGames = GAMES_DATA.globalTop50.concat(GAMES_DATA.extendedTop200 || []);
  const gamesById = {};
  allGames.forEach((g) => { gamesById[g.id] = g; });

  const totalCountries = Object.keys(COUNTRY_DATA).length;

  return (
    <>
      {/* Breadcrumbs */}
      <div className="breadcrumbs" style={{ paddingTop: 'calc(var(--nav-height) + 0.75rem)' }}>
        <div className="breadcrumbs-container">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Countries</span>
        </div>
      </div>

      {/* Hero */}
      <header className="hero">
        <div className="hero-container">
          <div className="hero-badge">{totalCountries} Countries</div>
          <h1 className="hero-title">Game Rankings <span className="highlight">by Country</span></h1>
          <p className="hero-subtitle">Explore the most popular games in each country. Every region has unique gaming preferences shaped by culture, platforms, and local trends.</p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">{totalCountries}</span>
              <span className="hero-stat-label">Countries</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">200</span>
              <span className="hero-stat-label">Games Ranked</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">3.5B+</span>
              <span className="hero-stat-label">Total Players</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">2026</span>
              <span className="hero-stat-label">Season</span>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="countries-directory-container">
          {Object.entries(REGIONS).map(([region, slugs]) => (
            <section key={region} className="country-region-section">
              <h2 className="region-title">{region}</h2>
              <div className="country-directory-grid">
                {slugs.map((slug) => {
                  const data = COUNTRY_DATA[slug];
                  if (!data) return null;
                  const topGameNames = (data.topGames || [])
                    .slice(0, 5)
                    .map((id) => gamesById[id])
                    .filter(Boolean)
                    .map((g) => g.name);
                  return (
                    <Link key={slug} href={`/country/${slug}`} className="country-directory-card">
                      <div className="country-dir-flag">{data.flag}</div>
                      <div className="country-dir-name">{data.name}</div>
                      <div className="country-dir-players">{data.totalPlayers} players</div>
                      <div className="country-dir-top-games">
                        <div className="country-dir-label">Top Games</div>
                        <ol className="country-dir-game-list">
                          {topGameNames.map((name) => (
                            <li key={name}>{name}</li>
                          ))}
                        </ol>
                      </div>
                      <span className="country-dir-link">View Rankings &rarr;</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
