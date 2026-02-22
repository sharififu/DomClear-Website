import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Google tag (gtag.js) - only loads when VITE_GA4_MEASUREMENT_ID is set
const gaId = import.meta.env.VITE_GA4_MEASUREMENT_ID;
if (gaId && typeof gaId === 'string' && gaId.trim()) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(s);
  window.gtag('config', gaId);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
