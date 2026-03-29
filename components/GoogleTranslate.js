'use client';
import { useEffect } from 'react';
import Script from 'next/script';

export default function GoogleTranslate() {
  useEffect(() => {
    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en', layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL },
        'google_translate_element'
      );
    };
  }, []);

  return (
    <>
      <div id="google_translate_element" style={{ position: 'fixed', bottom: '1rem', left: '1rem', zIndex: 999 }} />
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="lazyOnload"
      />
    </>
  );
}
