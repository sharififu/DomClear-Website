import { useState, useEffect, useRef } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PlatformPage } from './pages/PlatformPage';
import { PricingPage } from './pages/PricingPage';
import { TutorialsPage } from './pages/TutorialsPage';
import { BookDemoPage } from './pages/BookDemoPage';
import { ContactPage } from './pages/ContactPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { LoginPage } from './pages/LoginPage';
import { LegalPage } from './pages/LegalPage';
import { AboutPage } from './pages/AboutPage';
import { HomeCareSchedulingSoftwarePage } from './pages/HomeCareSchedulingSoftwarePage';
import { EmarSoftwarePage } from './pages/EmarSoftwarePage';
import { CarePlanningSoftwarePage } from './pages/CarePlanningSoftwarePage';
import { HomeCareAppPage } from './pages/HomeCareAppPage';
import { BirdieAlternativePage } from './pages/BirdieAlternativePage';
import { CompanyInformationPage } from './pages/CompanyInformationPage';
import { CredentialsPage } from './pages/CredentialsPage';
import { analytics } from './utils/analytics';

const CANONICAL_ORIGIN = 'https://www.domi-clear.com';

const DEFAULT_TITLE = 'Home Care Management App for UK Care Agencies | DomiClear';
const DEFAULT_DESCRIPTION =
  'DomiClear connects rotas, care planning, online eMAR and incident follow-up for UK home care agencies. Explore a 14-day free trial without a payment card.';

const PAGE_META: Record<string, { title: string; description: string }> = {
  '/': { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
  '/platform': {
    title: 'Home Care Software & Platform Features | DomiClear',
    description: 'Explore Improve Rota scheduling, person-centred care plans, online eMAR, incident follow-up and permissioned family access in DomiClear.',
  },
  '/pricing': {
    title: 'Home Care Software Pricing for UK Agencies | DomiClear',
    description: 'Compare DomiClear’s published monthly and annual care-software plans, based on active service users. Start a 14-day trial without a payment card.',
  },
  '/solutions': {
    title: 'Home Care Solutions for UK Agencies | DomiClear',
    description: 'DomiClear connects scheduling, care plans, reporting and permitted family access for UK care managers, agency owners and authorised relatives. Explore the workflows.',
  },
  '/about': {
    title: 'About DomiClear | Home Care Software for UK Agencies',
    description:
      'Discover DomiClear\'s care-industry roots and mission to connect UK home care teams, with incident follow-up and CQC-aligned internal quality-review tools.',
  },
  '/tutorials': {
    title: 'DomiClear Tutorial Videos | Home Care Software',
    description: 'Explore DomiClear tutorial videos for UK care teams, or book a personalised walkthrough with our team.',
  },
  '/demo': {
    title: 'DomiClear Tutorial Videos | Home Care Software',
    description: 'Explore DomiClear tutorial videos for UK care teams, or book a personalised walkthrough with our team.',
  },
  '/demos': {
    title: 'DomiClear Tutorial Videos | Home Care Software',
    description: 'Explore DomiClear tutorial videos for UK care teams, or book a personalised walkthrough with our team.',
  },
  '/contact': {
    title: 'Contact DomiClear | Home Care Software for UK Agencies',
    description: 'Contact DomiClear with questions about UK home care software, product workflows, published pricing and demo requests.',
  },
  '/credentials': {
    title: 'Security Credentials & Compliance | DomiClear',
    description: 'Review DomiClear Ltd’s published NHS DSPT Standards Met organisational self-assessment, ICO registration and own MODS compliance assessment. Not NHS product endorsement.',
  },
  '/company-information': {
    title: 'Company Information | DomiClear',
    description: 'Legal and company information for DomiClear, operated by DOMICLEAR LTD, company number 17383911.',
  },
  '/book-demo': {
    title: 'Book a Demo | Home Care Software for UK Agencies | DomiClear',
    description: 'Request a guided DomiClear demonstration of rota scheduling, care plans, online eMAR, incident follow-up and reporting. Or explore a free trial.',
  },
  '/home-care-scheduling-software': {
    title: 'Home Care Scheduling Software for UK Domiciliary Care Agencies | DomiClear',
    description:
      'Plan home care rotas and review staff availability, travel gaps and proposed Improve Rota changes with DomiClear. Coordinators keep control of decisions.',
  },
  '/emar-software': {
    title: 'eMAR Software for UK Domiciliary Care Agencies | DomiClear',
    description:
      'Manage medication libraries, schedules, PRN entries and MAR history with DomiClear eMAR. Recording administration requires an internet connection.',
  },
  '/care-planning-software': {
    title: 'Care Planning Software for UK Domiciliary Care Agencies | DomiClear',
    description:
      'Link assessed needs, outcomes, goals and care tasks in DomiClear, with independent manager approval before care-plan revisions become active.',
  },
  '/care-management-app': {
    title: 'Home Care & Carer Management App for UK Agencies | DomiClear',
    description:
      'Carer app for assigned visits, care tasks, notes and online medication recording, with limited cached visit information available without connectivity.',
  },
  '/birdie-alternative': {
    title: 'Birdie Alternative for UK Domiciliary Care Agencies | DomiClear',
    description:
      'Comparing DomiClear with Birdie? Review published DomiClear pricing, scheduling, care plans and eMAR workflows and assess the differences against your care service’s needs.',
  },

};

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const pendingRouteFocus = useRef(false);

  useEffect(() => {
    if (['/demo', '/demos', '/demo-fullscreen'].includes(window.location.pathname)) {
      window.history.replaceState({}, '', '/tutorials');
      setCurrentPath('/tutorials');
    }
    if (window.location.pathname === '/home-care-app') {
      const nextUrl = `/care-management-app${window.location.search}${window.location.hash}`;
      window.history.replaceState({}, '', nextUrl);
      setCurrentPath(window.location.pathname);
    }
  }, [currentPath]);

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname !== currentPath) pendingRouteFocus.current = true;
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    const originalPushState = window.history.pushState;
    window.history.pushState = function (...args) {
      const previousPath = window.location.pathname;
      originalPushState.apply(window.history, args);
      if (window.location.pathname !== previousPath) pendingRouteFocus.current = true;
      setCurrentPath(window.location.pathname);
    };

    const handleDocumentClick = (e: MouseEvent) => {
      // Preserve modified clicks, downloads and external browsing contexts.
      if (e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      const target = e.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a');

      if (anchor && anchor.href && !anchor.hasAttribute('download') &&
          (!anchor.target || anchor.target === '_self') &&
          anchor.origin === window.location.origin) {
        const url = new URL(anchor.href);
        if (url.pathname !== currentPath) {
          e.preventDefault();
          window.history.pushState({}, '', anchor.href);
          setCurrentPath(url.pathname);
          if (!url.hash) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } else if (url.hash) {
          e.preventDefault();
          window.history.pushState({}, '', anchor.href);
          const id = decodeURIComponent(url.hash.substring(1));
          const el = document.getElementById(id);
          if (el) {
            if (el.tabIndex < 0) el.tabIndex = -1;
            el.focus({ preventScroll: true });
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    };
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      window.removeEventListener('popstate', handlePopState);
      window.history.pushState = originalPushState;
    };
  }, [currentPath]);

  // Announce a newly rendered SPA route without changing focus on initial load.
  useEffect(() => {
    if (!pendingRouteFocus.current) return;
    pendingRouteFocus.current = false;
    const id = window.location.hash ? decodeURIComponent(window.location.hash.slice(1)) : '';
    const destination = id ? document.getElementById(id) : null;
    if (destination) {
      if (destination.tabIndex < 0) destination.tabIndex = -1;
      destination.focus({ preventScroll: true });
    } else {
      document.getElementById('main-content')?.focus({ preventScroll: true });
    }
  }, [currentPath]);

  // Scroll to hash target on path change or initial load
  useEffect(() => {
    if (window.location.hash) {
      const id = decodeURIComponent(window.location.hash.substring(1));
      const scrollToHash = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      // Try scrolling immediately, then again after a short delay
      // to ensure the new page components have mounted and rendered.
      requestAnimationFrame(() => {
        scrollToHash();
        setTimeout(scrollToHash, 100);
      });
    }
  }, [currentPath]);

  // Track page views
  useEffect(() => {
    analytics.trackPageView(currentPath);
  }, [currentPath]);

  // Per-route document title, meta description, and canonical URL (SEO)
  useEffect(() => {
    const pathOnly = currentPath.split('#')[0].split('?')[0];
    const meta = PAGE_META[pathOnly] ?? { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION };
    document.title = meta.title;

    const canonicalPath = pathOnly === '/' ? '' : pathOnly.replace(/\/$/, '');
    const canonicalHref = `${CANONICAL_ORIGIN}${canonicalPath === '' ? '' : canonicalPath}`;

    const setMetaTag = (attribute: 'name' | 'property', key: string, content: string) => {
      let tag = document.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMetaTag('name', 'description', meta.description);
    setMetaTag('property', 'og:title', meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:url', canonicalHref || `${CANONICAL_ORIGIN}/`);
    setMetaTag('name', 'twitter:title', meta.title);
    setMetaTag('name', 'twitter:description', meta.description);

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalHref || `${CANONICAL_ORIGIN}/`);
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
      case '/tutorials':
        return <TutorialsPage />;
      case '/book-demo':
        return <BookDemoPage />;
      case '/home-care-scheduling-software':
        return <HomeCareSchedulingSoftwarePage />;
      case '/emar-software':
        return <EmarSoftwarePage />;
      case '/care-planning-software':
        return <CarePlanningSoftwarePage />;
      case '/care-management-app':
        return <HomeCareAppPage />;
      case '/birdie-alternative':
        return <BirdieAlternativePage />;
      case '/demo-fullscreen':
        return <TutorialsPage />;
      case '/contact':
        return <ContactPage />;
      case '/about':
        return <AboutPage />;
      case '/company-information':
        return <CompanyInformationPage />;
      case '/credentials':
        return <CredentialsPage />;
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


  return (
    <div className="min-h-screen bg-white">
      {(
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
      <main id="main-content" tabIndex={-1} aria-label="Main content" className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4370B7]">
        {renderPage()}
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
