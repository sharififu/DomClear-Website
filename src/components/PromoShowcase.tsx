import React, { useEffect, useRef, useState } from 'react';

/** The original animated promotion lives at /promo/domiclear-promo.html. */
export const PromoShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Mount the iframe when the visitor reaches this section so the opening
  // animation isn't already over by the time they scroll down.
  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#070d1d] text-white py-12 md:py-16" aria-labelledby="promo-showcase-heading">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="promo-showcase-heading"
          className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-6"
        >
          See DomiClear in action
        </h2>
        <div ref={containerRef} className="w-full">
          {isVisible ? (
            <iframe
              src="/promo/domiclear-promo.html"
              title="DomiClear 36-second animated product promotion"
              aria-label="DomiClear promotional animation with playback controls and final links to a demo and the app"
              className="block w-full rounded-2xl border-0"
              style={{
                height: 'clamp(390px, calc((100vw - 32px) * 0.5625 + 185px), 900px)',
              }}
              loading="lazy"
              sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
              allowFullScreen
            />
          ) : (
            <div className="rounded-2xl aspect-video bg-[#0b1630] flex items-center justify-center">
              <p className="text-[#9fb0d4] text-sm">DomiClear product promotion</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
