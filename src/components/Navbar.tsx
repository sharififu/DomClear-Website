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

  // On demo pages, always show white background
  const isDemoPage = currentPath === '/demo' || currentPath === '/demos' || currentPath === '/book-demo' || currentPath === '/demo-fullscreen';
  const shouldShowWhite = isDemoPage || isScrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldShowWhite ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
      style={{ height: '72px' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex items-center gap-12">
          <a href="/" className="flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="DomiClear Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className={`font-bold text-xl ${shouldShowWhite ? 'text-[#0F172A]' : 'text-white'}`}>
              DomiClear
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  href={item.href}
                  className={`flex items-center gap-1 font-medium transition-colors ${
                    shouldShowWhite ? 'text-[#4B5563] hover:text-[#4370B7]' : 'text-white/90 hover:text-white'
                  }`}
                  aria-expanded={item.children ? openDropdown === item.label : undefined}
                  aria-haspopup={item.children ? 'menu' : undefined}
                >
                  {item.label}
                  {item.children && <ChevronDownIcon className="w-4 h-4" />}
                </a>

                {item.children && openDropdown === item.label && (
                  <div 
                    className="absolute top-full left-0 pt-2 bg-transparent"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <div 
                      className="bg-white rounded-2xl shadow-lg py-2 min-w-[240px] border border-[rgba(20,30,60,0.08)]"
                      role="menu"
                      aria-label={`${item.label} submenu`}
                    >
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2 text-[#4B5563] hover:bg-[#FAFBFC] hover:text-[#4370B7] transition-colors"
                          role="menuitem"
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

        <div className="hidden lg:flex items-center gap-4">
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
            Book live demo
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
          className={`lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg -mr-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#4370B7] focus:ring-offset-2 focus:ring-offset-transparent ${!shouldShowWhite ? 'bg-white/10 hover:bg-white/20' : 'hover:bg-slate-100'}`}
          style={{ padding: '10px' }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className={`w-6 h-6 ${shouldShowWhite ? 'text-[#0F172A]' : 'text-white'}`} />
          ) : (
            <Bars3Icon className={`w-6 h-6 ${shouldShowWhite ? 'text-[#0F172A]' : 'text-white'}`} />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[rgba(20,30,60,0.08)] shadow-lg">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
            {navigation.map((item) => (
              <div key={item.label}>
                <a
                  href={item.href}
                  className="block py-2 font-medium text-[#4B5563] hover:text-[#4370B7]"
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
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-[rgba(20,30,60,0.08)]">
              <Button variant="ghost" size="md" href={EXTERNAL_LOGIN_URL} className="text-[#4370B7]">
                Log in
              </Button>
              <Button 
                variant="secondary" 
                size="md" 
                href="/book-demo"
              >
                Book live demo
              </Button>
              <Button 
                variant="primary" 
                size="md" 
                href={EXTERNAL_SIGNUP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => analytics.trackStartTrialClicked('navbar_mobile')}
              >
                Start free trial
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
