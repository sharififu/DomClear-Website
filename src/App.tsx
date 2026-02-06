import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PlatformPage } from './pages/PlatformPage';
import { PricingPage } from './pages/PricingPage';
import { DemoPage } from './pages/DemoPage';
import { BookDemoPage } from './pages/BookDemoPage';
import { FullScreenDemoPage } from './pages/FullScreenDemoPage';
import { ContactPage } from './pages/ContactPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { LoginPage } from './pages/LoginPage';
import { LegalPage } from './pages/LegalPage';
import { AboutPage } from './pages/AboutPage';
import { analytics } from './utils/analytics';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    const originalPushState = window.history.pushState;
    window.history.pushState = function (...args) {
      originalPushState.apply(window.history, args);
      setCurrentPath(window.location.pathname);
    };

    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor && anchor.href && anchor.origin === window.location.origin) {
        const url = new URL(anchor.href);
        if (url.pathname !== currentPath) {
          e.preventDefault();
          window.history.pushState({}, '', anchor.href);
          setCurrentPath(url.pathname);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    });

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentPath]);

  // Track page views
  useEffect(() => {
    analytics.trackPageView(currentPath);
  }, [currentPath]);

  const renderPage = () => {
    const path = currentPath.split('#')[0];

    switch (path) {
      case '/':
        return <HomePage />;
      case '/platform':
        return <PlatformPage />;
      case '/solutions':
        return <SolutionsPage />;
      case '/pricing':
        return <PricingPage />;
      case '/demo':
      case '/demos':
        return <DemoPage />;
      case '/book-demo':
        return <BookDemoPage />;
      case '/demo-fullscreen':
        return <FullScreenDemoPage />;
      case '/contact':
        return <ContactPage />;
      case '/about':
        return <AboutPage />;
      case '/login':
        return <LoginPage />;
      case '/signup':
        return <LoginPage initialMode="signup" />;
      case '/legal':
        return <LegalPage slug={null} />;
      default:
        if (path.startsWith('/legal/')) {
          const slug = path.slice('/legal/'.length).replace(/\/$/, '') || null;
          return <LegalPage slug={slug} />;
        }
        return (
          <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-[#0F172A] mb-4">Page coming soon</h1>
              <p className="text-[#4B5563] mb-8">This page is under construction.</p>
              <a
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#4370B7] text-white font-semibold rounded-full hover:bg-[#365a9a] transition-colors"
              >
                Return to homepage
              </a>
            </div>
          </div>
        );
    }
  };

  const isFullScreenDemo = currentPath === '/demo-fullscreen';

  return (
    <div className="min-h-screen bg-white">
      {!isFullScreenDemo && (
        <>
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#4370B7] text-white px-4 py-2 rounded-lg z-50"
          >
            Skip to main content
          </a>
          <Navbar />
        </>
      )}
      <main id="main-content">
        {renderPage()}
      </main>
      {!isFullScreenDemo && <Footer />}
    </div>
  );
}

export default App;
