import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Game Categories</h4>
            <ul>
              <li><Link href="/lists/best-battle-royale">Battle Royale</Link></li>
              <li><Link href="/lists/best-moba-games">MOBA</Link></li>
              <li><Link href="/lists/best-fps-games">FPS / Shooter</Link></li>
              <li><Link href="/lists/best-rpg-games">RPG / MMORPG</Link></li>
              <li><Link href="/lists/best-sandbox-games">Sandbox / Survival</Link></li>
              <li><Link href="/lists/best-puzzle-casual">Puzzle / Casual</Link></li>
              <li><Link href="/lists/best-sports-racing">Sports / Racing</Link></li>
              <li><Link href="/lists/best-free-games">Free to Play</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Popular Countries</h4>
            <ul>
              <li><Link href="/country/united-states">United States</Link></li>
              <li><Link href="/country/china">China</Link></li>
              <li><Link href="/country/india">India</Link></li>
              <li><Link href="/country/brazil">Brazil</Link></li>
              <li><Link href="/country/japan">Japan</Link></li>
              <li><Link href="/country/south-korea">South Korea</Link></li>
              <li><Link href="/country/germany">Germany</Link></li>
              <li><Link href="/country/united-kingdom">United Kingdom</Link></li>
              <li><Link href="/country/france">France</Link></li>
              <li><Link href="/country/indonesia">Indonesia</Link></li>
              <li><Link href="/countries" style={{ fontWeight: 600 }}>All 195+ Countries &rarr;</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Top 10 Lists</h4>
            <ul>
              <li><Link href="/lists/best-free-games">Best Free Games</Link></li>
              <li><Link href="/lists/best-mobile-games">Best Mobile Games</Link></li>
              <li><Link href="/lists/best-pc-games">Best PC Games</Link></li>
              <li><Link href="/lists/best-console-games">Best Console Games</Link></li>
              <li><Link href="/lists/highest-rated-games">Highest Rated</Link></li>
              <li><Link href="/lists/most-downloaded-games">Most Downloaded</Link></li>
              <li><Link href="/lists">All Lists &rarr;</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/rankings">Global Rankings</Link></li>
              <li><Link href="/countries">All Countries</Link></li>
              <li><Link href="/lists">Top 10 Lists</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-brand">
            <span className="brand-50">50</span>
            <span className="brand-best">BEST</span>
            <span className="brand-type">Games</span>
          </div>
          <p className="footer-copyright">&copy; 2026 50bestgames.com &middot; 200 Games Ranked &middot; 195 Countries</p>
          <p className="footer-disclaimer">Rankings are based on publicly available download data, active player counts, and editorial assessment. Not affiliated with any game publisher.</p>
        </div>
      </div>
    </footer>
  );
}
