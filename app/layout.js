import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Script from 'next/script';
import { WebsiteJsonLd } from '@/components/JsonLd';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('https://50bestgames.com'),
  title: {
    default: '50 Best Games — 200+ Top Online Games Ranked Worldwide | 50bestgames.com',
    template: '%s | 50 Best Games',
  },
  description: 'Discover the 200 most popular and downloaded online games worldwide. Rankings by country, editorial reviews, badges, and expert analysis. Updated for 2026.',
  keywords: ['best online games', 'top games 2026', 'game rankings', 'most downloaded games', 'gaming reviews', 'esports', 'mobile games', 'PC games', 'console games', 'free to play games', 'battle royale', 'MOBA', 'RPG', 'Minecraft', 'Fortnite', 'League of Legends', 'Valorant', 'Roblox'],
  authors: [{ name: '50 Best Games Editorial Team' }],
  creator: '50 Best Games',
  publisher: '50 Best Games',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://50bestgames.com',
    siteName: '50 Best Games',
    title: '50 Best Games — 200+ Top Online Games Ranked Worldwide',
    description: 'Discover the 200 most popular and downloaded online games worldwide. Rankings by country, editorial reviews, and expert analysis.',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: '50 Best Games' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '50 Best Games — 200+ Top Online Games Ranked Worldwide',
    description: 'Discover the 200 most popular online games worldwide.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://50bestgames.com',
  },
  verification: {
    google: '', // Can add Search Console verification later
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XX30110B5W"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XX30110B5W');
          `}
        </Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2057309335537732"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <WebsiteJsonLd />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

