import React from 'react';
import { Button } from './Button';
import { heroContent } from '../data/content';
import { EXTERNAL_SIGNUP_URL } from '../constants/links';
import { ArrowRight } from 'lucide-react';
import { analytics } from '../utils/analytics';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1F6FEB] via-[#2ea0ff] to-[#14B8A6]">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Images on the left */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-start items-end relative z-0">
            {/* Starting Price Badge - Pill (matches pricing: £39/mo Starter plan) */}
            <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 z-50">
              <div className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 rounded-[2rem] bg-gradient-to-r from-[#67e8f9] via-[#5eead4] to-[#4ade80] shadow-lg backdrop-blur-sm">
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="text-white font-bold text-lg sm:text-xl md:text-2xl leading-tight">
                    From £39
                  </span>
                  <span className="text-white/95 text-xs sm:text-sm leading-tight">
                    per month
                  </span>
                </div>
              </div>
            </div>
            <img
              src="/demo-media/Desktop-white.png"
              alt="DomiClear Desktop Platform"
              className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl h-auto object-contain"
            />
            <img
              src="/demo-media/Mobile-white.png"
              alt="DomiClear Mobile App"
              className="hidden sm:block w-32 sm:w-40 md:w-56 lg:w-64 xl:w-72 h-auto object-contain self-end -ml-8 sm:-ml-12 md:-ml-16 lg:-ml-20 xl:-ml-24"
            />
          </div>

          {/* Content on the right */}
          <div className="order-1 lg:order-2 text-center lg:text-left relative z-10">
            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border border-white/20 shadow-2xl overflow-hidden">
              {/* Liquid glass gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 pointer-events-none"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="inline-block mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                  <span className="text-white text-xs font-bold tracking-wider uppercase">
                    {heroContent.eyebrow}
                  </span>
                </div>

                <h1
                  className="text-white font-bold mb-6 leading-tight tracking-tight"
                  style={{
                    fontSize: 'clamp(36px, 5vw, 56px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {heroContent.title}
                </h1>

                <p
                  className="text-white/90 max-w-2xl lg:max-w-none mx-auto lg:mx-0 mb-10"
                  style={{
                    fontSize: 'clamp(16px, 2vw, 20px)',
                    lineHeight: 1.6,
                  }}
                >
                  {heroContent.subtitle}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center lg:items-start">
                  <Button 
                    variant="accent" 
                    size="lg" 
                    href={EXTERNAL_SIGNUP_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => analytics.trackStartTrialClicked('hero')}
                  >
                    {heroContent.primaryCta}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    href="/book-demo"
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                  >
                    {heroContent.secondaryCta}
                  </Button>
                </div>
                <p className="mt-3 text-white/80 text-sm">
                  No card required • UK support • Cancel anytime
                </p>

                {/* CTA row text */}
                <div className="mt-4 flex justify-center lg:justify-start">
                  <p className="text-white/80 text-sm">
                    {heroContent.primaryCta} · {heroContent.secondaryCta}
                  </p>
                </div>

                {/* Trust badges directly below CTAs */}
                <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-2 text-white/90 text-sm">
                  <span>Web, iOS & Android</span>
                  <span className="text-white/60">•</span>
                  <span>CQC-ready</span>
                  <span className="text-white/60">•</span>
                  <span>UK-focused</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
