import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Game Categories</h4>
            <ul>
              <li><Link href="/rankings">Battle Royale</Link></li>
              <li><Link href="/rankings">MOBA</Link></li>
              <li><Link href="/rankings">FPS / Shooter</Link></li>
              <li><Link href="/rankings">RPG / MMORPG</Link></li>
              <li><Link href="/rankings">Sandbox / Survival</Link></li>
              <li><Link href="/rankings">Puzzle / Casual</Link></li>
              <li><Link href="/rankings">Sports / Racing</Link></li>
              <li><Link href="/rankings">Card / Strategy</Link></li>
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
              <li><Link href="/country/russia">Russia</Link></li>
              <li><Link href="/country/saudi-arabia">Saudi Arabia</Link></li>
              <li><Link href="/countries" style={{ fontWeight: 600 }}>All 195+ Countries &rarr;</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Platforms</h4>
            <ul>
              <li><a href="#">Steam</a></li>
              <li><a href="#">Epic Games Store</a></li>
              <li><a href="#">App Store (iOS)</a></li>
              <li><a href="#">Google Play</a></li>
              <li><a href="#">Xbox / Game Pass</a></li>
              <li><a href="#">PlayStation Store</a></li>
              <li><a href="#">Nintendo eShop</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/rankings">Global Rankings</Link></li>
              <li><Link href="/countries">All Countries</Link></li>
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
