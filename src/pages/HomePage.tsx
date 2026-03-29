import React from 'react';
import { Hero } from '../components/Hero';
import { FeatureOverview } from '../components/FeatureOverview';
import { ComprehensiveFeatures } from '../components/ComprehensiveFeatures';
import { TestimonialCard } from '../components/TestimonialCard';
import { StatCard } from '../components/StatCard';
import { Button } from '../components/Button';
import { CQCOutcomes } from '../components/CQCOutcomes';
import {
  outcomes,
  testimonials,
  homepageTrustContent,
  homepageWhySwitchContent,
} from '../data/content';
import { ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { EXTERNAL_SIGNUP_URL } from '../constants/links';

export const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />

      <section
        className="py-16 bg-white border-b border-[rgba(20,30,60,0.08)]"
        aria-labelledby="trust-heading"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="trust-heading"
            className="text-3xl md:text-4xl font-bold text-[#0F172A] text-center mb-4"
          >
            {homepageTrustContent.title}
          </h2>
          <p className="text-lg text-[#4B5563] text-center max-w-3xl mx-auto mb-10">
            {homepageTrustContent.subtitle}
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {homepageTrustContent.bullets.map((bullet, i) => (
              <li
                key={i}
                className="flex items-start gap-3 bg-[#FAFBFC] rounded-xl p-4 border border-[rgba(20,30,60,0.08)]"
              >
                <CheckCircleIcon className="w-6 h-6 text-[#4370B7] flex-shrink-0 mt-0.5" />
                <span className="text-[#374151]">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FeatureOverview />

      <section className="py-16 bg-white border-b border-[rgba(20,30,60,0.08)]" aria-labelledby="workflow-guides-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="workflow-guides-heading"
            className="text-2xl md:text-3xl font-bold text-[#0F172A] text-center mb-3"
          >
            Explore DomiClear by workflow
          </h2>
          <p className="text-[#4B5563] text-center max-w-2xl mx-auto mb-10 text-sm md:text-base">
            Short guides for the topics teams evaluate most—alongside the full story on the{' '}
            <a href="/platform" className="text-[#4370B7] font-semibold hover:underline">
              Platform
            </a>{' '}
            and{' '}
            <a href="/" className="text-[#4370B7] font-semibold hover:underline">
              Homepage
            </a>
            .
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: '/home-care-scheduling-software',
                title: 'Scheduling software',
                blurb: 'Rotas, visit changes, and coordinator visibility in one place.',
              },
              {
                href: '/care-planning-software',
                title: 'Care planning software',
                blurb: 'Digital plans, updates, and access for field and office teams.',
              },
              {
                href: '/emar-software',
                title: 'eMAR software',
                blurb: 'Structured medication workflows with clearer handovers.',
              },
              {
                href: '/home-care-app',
                title: 'Home care app',
                blurb: 'Practical mobile use for carers with office coordination.',
              },
              {
                href: '/platform',
                title: 'Platform',
                blurb: 'How scheduling, planning, eMAR, and records connect.',
              },
            ].map((card) => (
              <a
                key={card.href}
                href={card.href}
                className="group rounded-2xl border border-[rgba(20,30,60,0.08)] bg-[#FAFBFC] p-6 hover:border-[#4370B7]/30 hover:shadow-sm transition-all"
              >
                <h3 className="text-lg font-bold text-[#0F172A] mb-2 group-hover:text-[#4370B7] transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">{card.blurb}</p>
              </a>
            ))}
          </div>
          <p className="text-center text-sm text-[#64748B] mt-8">
            Comparing care software?{' '}
            <a href="/birdie-alternative" className="text-[#4370B7] font-semibold hover:underline">
              How DomiClear fits when you review alternatives
            </a>
            .
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#F8FAFC]" aria-labelledby="why-switch-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="why-switch-heading"
            className="text-3xl md:text-4xl font-bold text-[#0F172A] text-center mb-4"
          >
            {homepageWhySwitchContent.title}
          </h2>
          <p className="text-lg text-[#4B5563] text-center max-w-3xl mx-auto mb-12">
            {homepageWhySwitchContent.subtitle}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {homepageWhySwitchContent.items.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-[rgba(20,30,60,0.08)] shadow-sm"
              >
                <p className="text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-2">
                  The friction
                </p>
                <p className="text-[#0F172A] font-medium mb-4">{item.pain}</p>
                <p className="text-sm font-semibold text-[#4370B7] uppercase tracking-wide mb-2">
                  With DomiClear
                </p>
                <p className="text-[#4B5563]">{item.outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ComprehensiveFeatures />

      <section className="py-20 bg-gradient-to-br from-[#e6f7ff] to-[#FAFBFC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#FAFBFC] rounded-full text-xs font-bold text-[#4370B7] uppercase tracking-wider mb-4 border border-[rgba(20,30,60,0.08)]">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
              Trusted by Care Agencies Across the UK
            </h2>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
              UK domiciliary care providers use DomiClear to align rotas, visits, and records in one home care
              management software stack.
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
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#1a86f0] to-[#7c6df0] rounded-3xl p-12 md:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center lg:justify-start">
                <img
                  src="/demo-media/domiclearappshowcase.png"
                  alt="DomiClear domiciliary care software on desktop and mobile"
                  className="max-w-full h-auto scale-[1.2]"
                />
              </div>

              <div className="text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to run your agency on modern domiciliary care software?
                </h2>
                <p className="text-xl text-white/90 mb-4 leading-relaxed">
                  Start your free trial to explore DomiClear in your own time, or book a demo to walk through
                  scheduling, care plans, and eMAR with our team.
                </p>
                <p className="text-base text-white/85 mb-10 leading-relaxed max-w-2xl">
                  Usage-based plans give many UK agencies a lower cost of entry than heavyweight platforms — see{' '}
                  <a href="/pricing" className="font-semibold text-white underline decoration-white/40 hover:decoration-white">
                    pricing
                  </a>{' '}
                  for full detail.
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
