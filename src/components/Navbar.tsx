import React, { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';
import { navigation } from '../data/content';
import { EXTERNAL_SIGNUP_URL, EXTERNAL_LOGIN_URL } from '../constants/links';
import { analytics } from '../utils/analytics';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    
    const handlePushState = () => {
      setCurrentPath(window.location.pathname);
    };
    
    // Check on mount
    setCurrentPath(window.location.pathname);
    
    window.addEventListener('popstate', handlePopState);
    
    // Listen for pushState calls
    const originalPushState = window.history.pushState;
    window.history.pushState = function (...args) {
      originalPushState.apply(window.history, args);
      handlePushState();
    };
    
    // Also listen for clicks on links (since App.tsx handles navigation)
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.href && anchor.origin === window.location.origin) {
        setTimeout(() => setCurrentPath(window.location.pathname), 0);
      }
    };
    
    document.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClick);
      window.history.pushState = originalPushState;
    };
  }, []);

  useEffect(() => {
    closeMobileMenu();
  }, [currentPath]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileMenuOpen]);

  // On demo pages, always show white background
  const isDemoPage =
    currentPath === '/tutorials' ||
    currentPath === '/demo' ||
    currentPath === '/demos' ||
    currentPath === '/book-demo' ||
    currentPath === '/demo-fullscreen' ||
    currentPath === '/care-management-app';
  const shouldShowWhite = isDemoPage || isScrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldShowWhite ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
      style={{ height: '72px' }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-6">
        <div className="flex min-w-0 items-center gap-6 2xl:gap-10">
          <a href="/" className="flex shrink-0 items-center gap-2">
            <img 
              src="/logo.png" 
              alt="DomiClear Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className={`font-bold text-xl ${shouldShowWhite ? 'text-[#0F172A]' : 'text-white'}`}>
              DomiClear
            </span>
          </a>

          <div className="hidden xl:flex items-center gap-5 2xl:gap-6">
            {navigation.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={(event) => {
                  if (!event.currentTarget.contains(document.activeElement)) setOpenDropdown(null);
                }}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    setOpenDropdown(null);
                  }
                }}
                onKeyDown={(event) => {
                  if (item.children && event.key === 'Escape') {
                    event.preventDefault();
                    setOpenDropdown(null);
                    event.currentTarget.querySelector<HTMLButtonElement>('button')?.focus();
                  }
                }}
              >
                <div className="flex items-center gap-1">
                  <a
                  href={item.href}
                  className={`whitespace-nowrap rounded-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    shouldShowWhite ? 'text-[#4B5563] hover:text-[#4370B7]' : 'text-white/90 hover:text-white'
                  }`}
                >
                  {item.label}
                  </a>
                  {item.children && (
                    <button
                    type="button"
                    aria-label={`${openDropdown === item.label ? 'Close' : 'Open'} ${item.label} submenu`}
                    aria-expanded={openDropdown === item.label}
                    aria-controls={`nav-submenu-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    className={`flex h-7 w-7 items-center justify-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${shouldShowWhite ? 'text-[#4B5563] focus-visible:outline-[#0F172A]' : 'text-white focus-visible:outline-white'}`}
                  >
                    <ChevronDownIcon aria-hidden="true" className={`w-4 h-4 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>
                  )}
                </div>

                {item.children && (
                  <div
                    id={`nav-submenu-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    hidden={openDropdown !== item.label}
                    className="absolute top-full left-0 pt-2 bg-transparent"
                  >
                    <div 
                      className="bg-white rounded-2xl shadow-lg py-2 min-w-[240px] border border-[rgba(20,30,60,0.08)]"
                    >
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2 text-[#4B5563] hover:bg-[#FAFBFC] hover:text-[#4370B7] transition-colors"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="hidden xl:flex shrink-0 items-center gap-3 whitespace-nowrap [&>a]:h-10 [&>a]:shrink-0 [&>a]:whitespace-nowrap">
          <Button 
            variant="ghost" 
            size="sm" 
            href={EXTERNAL_LOGIN_URL}
            className={shouldShowWhite ? '' : 'text-white hover:text-white hover:bg-white/10'}
            analyticsEvent="login_click"
            analyticsProperties={{ source: 'navbar' }}
          >
            Log in
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            href="/book-demo"
            className={shouldShowWhite ? '' : 'bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20'}
            onClick={() => analytics.trackDemoRequest('navbar')}
          >
            Book a demo
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            href={EXTERNAL_SIGNUP_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => analytics.trackStartTrialClicked('navbar')}
          >
            Start free trial
          </Button>
        </div>

        <button
          className={`xl:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg -mr-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#4370B7] focus:ring-offset-2 focus:ring-offset-transparent ${!shouldShowWhite ? 'bg-white/10 hover:bg-white/20' : 'hover:bg-slate-100'}`}
          style={{ padding: '10px' }}
          id="mobile-navigation-toggle"
          type="button"
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          onKeyDown={(event) => {
            if (event.key === 'Escape' && isMobileMenuOpen) {
              event.preventDefault();
              setIsMobileMenuOpen(false);
            }
          }}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className={`w-6 h-6 ${shouldShowWhite ? 'text-[#0F172A]' : 'text-white'}`} />
          ) : (
            <Bars3Icon className={`w-6 h-6 ${shouldShowWhite ? 'text-[#0F172A]' : 'text-white'}`} />
          )}
        </button>
      </div>

      <div
        id="mobile-navigation"
        hidden={!isMobileMenuOpen}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setIsMobileMenuOpen(false);
            document.getElementById('mobile-navigation-toggle')?.focus();
          }
        }}
        className="xl:hidden max-h-[calc(100dvh-72px)] overflow-y-auto overscroll-y-contain bg-white border-t border-[rgba(20,30,60,0.08)] shadow-lg"
      >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
            {navigation.map((item) => (
              <div key={item.label}>
                <a
                  href={item.href}
                  className="block py-2 font-medium text-[#4B5563] hover:text-[#4370B7]"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </a>
                {item.children && (
                  <div className="pl-4 space-y-2 mt-2">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block py-1 text-sm text-[#4B5563] hover:text-[#4370B7]"
                        onClick={closeMobileMenu}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-[rgba(20,30,60,0.08)]">
              <Button variant="ghost" size="md" href={EXTERNAL_LOGIN_URL} className="text-[#4370B7]" onClick={closeMobileMenu}>
                Log in
              </Button>
              <Button 
                variant="secondary" 
                size="md" 
                href="/book-demo"
                onClick={(event) => {
                  closeMobileMenu();
                  analytics.trackDemoRequest('navbar_mobile');
                }}
              >
                Book a demo
              </Button>
              <Button 
                variant="primary" 
                size="md" 
                href={EXTERNAL_SIGNUP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  closeMobileMenu();
                  analytics.trackStartTrialClicked('navbar_mobile');
                }}
              >
                Start free trial
              </Button>
            </div>
          </div>
        </div>
    </nav>
  );
};
