import React from 'react';
import { Hero } from '../components/Hero';
import { FeatureOverview } from '../components/FeatureOverview';
import { ComprehensiveFeatures } from '../components/ComprehensiveFeatures';
import { TestimonialCard } from '../components/TestimonialCard';
import { StatCard } from '../components/StatCard';
import { Button } from '../components/Button';
import { CQCOutcomes } from '../components/CQCOutcomes';
import { outcomes, testimonials } from '../data/content';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { EXTERNAL_SIGNUP_URL } from '../constants/links';

export const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeatureOverview />
      <ComprehensiveFeatures />

      <section className="py-20 bg-gradient-to-br from-[#e6f7ff] to-[#FAFBFC]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-white rounded-full text-xs font-bold text-[#4370B7] uppercase tracking-wider mb-4 border border-[rgba(20,30,60,0.08)]">
              Proven Outcomes
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
              Results That Matter to Care Managers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {outcomes.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#FAFBFC] rounded-full text-xs font-bold text-[#4370B7] uppercase tracking-wider mb-4 border border-[rgba(20,30,60,0.08)]">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
              Trusted by Care Agencies Across the UK
            </h2>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
              Care providers use DomiClear every day to stay organised, compliant and inspection-ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      <CQCOutcomes />

      <section className="py-20 bg-[#FAFBFC]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="bg-gradient-to-br from-[#1a86f0] to-[#7c6df0] rounded-3xl p-12 md:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - App Showcase Image */}
              <div className="flex justify-center lg:justify-start">
                <img 
                  src="/demo-media/domiclearappshowcase.png" 
                  alt="DomiClear App Showcase" 
                  className="max-w-full h-auto scale-[1.2]"
                />
              </div>

              {/* Right side - CTA content */}
              <div className="text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Simplify Your Home Care Management?
                </h2>
                <p className="text-xl text-white/90 mb-10 leading-relaxed">
                  Join UK care agencies using DomiClear to reduce admin, improve care quality and stay CQC-ready.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    variant="secondary"
                    size="lg"
                    href={EXTERNAL_SIGNUP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="!bg-white !text-[#1a86f0] border-0 hover:!bg-white/90"
                    analyticsEvent="subscription_cta"
                    analyticsProperties={{ source: 'homepage_cta' }}
                  >
                    Start free trial
                    <ArrowRightIcon className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    href="/book-demo"
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                    analyticsEvent="demo_request"
                    analyticsProperties={{ source: 'homepage_cta' }}
                  >
                    Book a demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
