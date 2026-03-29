'use client';
import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function GoogleTranslate() {
  const [showWidget, setShowWidget] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en', layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
        'google_translate_element'
      );
      setInitialized(true);
    };
  }, []);

  // Hide the Google Translate top bar on mobile
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .goog-te-banner-frame { display: none !important; }
      body { top: 0 !important; }
      .skiptranslate { display: none !important; }
      #google_translate_element .skiptranslate { display: block !important; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <>
      {/* Floating translate button */}
      <button
        className="translate-fab"
        onClick={() => setShowWidget(!showWidget)}
        aria-label="Translate"
        title="Translate this page"
      >
        🌐
      </button>

      {/* Widget popup */}
      <div className={`translate-popup ${showWidget ? 'open' : ''}`}>
        <div className="translate-popup-header">
          <span>Translate</span>
          <button onClick={() => setShowWidget(false)} className="translate-popup-close">&times;</button>
        </div>
        <div id="google_translate_element" />
      </div>

      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="lazyOnload"
      />
    </>
  );
}
