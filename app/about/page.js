import Link from 'next/link';

export const metadata = {
  title: 'About — 50 Best Games',
  description: 'Learn about 50 Best Games, our editorial process, and how we rank the world\'s most popular online games.',
};

export default function AboutPage() {
  return (
    <main className="page-content">
      <div className="page-container">
        <article className="blog-post">
          <header className="blog-post-header">
            <h1>About 50 Best Games</h1>
            <p className="blog-post-subtitle">The world&apos;s definitive guide to the most popular online games, ranked by country.</p>
          </header>
          <div className="blog-post-content">
            <h2>Our Mission</h2>
            <p>50 Best Games is dedicated to helping players discover the most popular and highest-quality online games worldwide. We provide comprehensive rankings broken down by country, category, and platform so you can find what the world is playing right now.</p>

            <h2>How We Rank</h2>
            <p>Our rankings are compiled using a combination of publicly available data sources:</p>
            <ul>
              <li><strong>Download counts</strong> from major app stores (Apple App Store, Google Play)</li>
              <li><strong>Active player data</strong> from Steam, Epic Games Store, and platform APIs</li>
              <li><strong>Monthly active users</strong> reported by game publishers</li>
              <li><strong>Search volume and trends</strong> from global search data</li>
              <li><strong>Editorial assessment</strong> from our team of gaming enthusiasts</li>
            </ul>
            <p>We update our rankings regularly to reflect the latest trends and player counts. Each game receives badges based on its performance in different ranking categories.</p>

            <h2>Our Badge System</h2>
            <p>Games on our platform earn badges that help players quickly identify standout titles:</p>
            <ul>
              <li><strong>Global #1</strong> &mdash; The single most played game worldwide</li>
              <li><strong>Most Downloaded</strong> &mdash; Highest total download count in its category</li>
              <li><strong>Editor&apos;s Choice</strong> &mdash; Selected by our editorial team for exceptional quality</li>
              <li><strong>Rising Star</strong> &mdash; Games showing rapid growth in player base</li>
              <li><strong>Top in [Country]</strong> &mdash; Highest-ranked game in a specific country</li>
            </ul>

            <h2>Editorial Independence</h2>
            <p>50 Best Games operates independently. Our rankings are not influenced by game publishers or advertisers. We strive to present accurate, unbiased information to help players make informed choices about what to play next.</p>

            <h2>Contact Us</h2>
            <p>Have questions, suggestions, or feedback? We&apos;d love to hear from you. Visit our <Link href="/contact">contact page</Link> or reach out to our editorial team directly.</p>
          </div>
        </article>
      </div>
    </main>
  );
}
