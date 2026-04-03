'use client';
import Link from 'next/link';
import { useState } from 'react';
import SearchDropdown from './SearchDropdown';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <Link href="/" className="nav-brand">
            <span className="brand-50">50</span>
            <span className="brand-best">BEST</span>
            <span className="brand-type">Games</span>
          </Link>
          <div className="nav-search">
            <SearchDropdown />
          </div>
          <div className="nav-links">
            <Link href="/">Rankings</Link>
            <Link href="/countries">Countries</Link>
            <Link href="/lists">Top 10</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/about">About</Link>
          </div>
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(true)}
            aria-label="Menu"
          >
            &#9776;
          </button>
        </div>
      </nav>

      <div className={`mobile-menu-overlay${mobileOpen ? ' open' : ''}`}>
        <div className="mobile-menu-content">
          <button
            className="mobile-menu-close"
            onClick={() => setMobileOpen(false)}
          >
            &times;
          </button>
          <Link href="/" onClick={() => setMobileOpen(false)}>Rankings</Link>
          <Link href="/countries" onClick={() => setMobileOpen(false)}>Countries</Link>
          <Link href="/lists" onClick={() => setMobileOpen(false)}>Top 10 Lists</Link>
          <Link href="/blog" onClick={() => setMobileOpen(false)}>Blog</Link>
          <Link href="/about" onClick={() => setMobileOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
        </div>
      </div>
    </>
  );
}
