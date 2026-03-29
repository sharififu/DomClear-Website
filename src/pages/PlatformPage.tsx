import React from 'react';
import { CheckIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Button } from '../components/Button';
import { platformFeatures } from '../data/content';
import { EXTERNAL_SIGNUP_URL } from '../constants/links';

// Mapping of features to demo images and deep links
const featureDemoMap: { [key: string]: { image: string; deepLink: string; deepLinkText: string } } = {
  'care-planning': {
    image: '/demo-media/demo-patient-profile-care-planning.png',
    deepLink: '/demos#care-planning',
    deepLinkText: 'View care planning →'
  },
  'form-templates': {
    image: '/demo-media/demo-form-templates.png',
    deepLink: '/demos#form-templates',
    deepLinkText: 'Try form builder →'
  },
  'scheduling': {
    image: '/demo-media/demo-schedule-rota-planning.png',
    deepLink: '/demos#scheduling',
    deepLinkText: 'See rota conflict detection →'
  },
  'carer-app': {
    image: '/demo-media/Mobile-white.png',
    deepLink: '/demos#emar',
    deepLinkText: 'Try MAR entry →'
  },
  'compliance': {
    image: '/demo-media/demo-cqc-compliance-reports.png',
    deepLink: '/demos#compliance',
    deepLinkText: 'View CQC exports →'
  },
  'team': {
    image: '/demo-media/demo-patient-management.png',
    deepLink: '/demos',
    deepLinkText: 'View team management →'
  },
  'finance': {
    image: '/demo-media/demo-payroll-financial-management.png',
    deepLink: '/demos#finance',
    deepLinkText: 'See financial reports →'
  },
  'family': {
    image: '/demo-media/demo-patient-management.png',
    deepLink: '/demos',
    deepLinkText: 'View family portal →'
  },
  'analytics': {
    image: '/demo-media/demo-reports-analytics.png',
    deepLink: '/demos#compliance',
    deepLinkText: 'See reports & analytics →'
  },
  'security': {
    image: '/demo-media/demo-dashboard-overview.png',
    deepLink: '/demos',
    deepLinkText: 'Learn about security →'
  },
};

export const PlatformPage: React.FC = () => {
  const features = Object.values(platformFeatures);

  return (
    <div>
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#1a86f0] to-[#7c6df0] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            Platform
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Home care management platform for UK agencies
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10">
            One home care software for care planning, scheduling, eMAR, compliance evidence and family portal.
            Built for UK care agencies — unified in one platform, with transparent usage-based pricing and a lower
            cost of entry than many larger systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <Button
              variant="secondary"
              size="lg"
              href={EXTERNAL_SIGNUP_URL}
              target="_blank"
              rel="noreferrer"
              className="!bg-white !text-[#1a86f0] border-0 hover:!bg-white/90"
            >
              Start free trial
              <ArrowRightIcon className="w-5 h-5" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/book-demo"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              Book a demo
            </Button>
          </div>
          <p className="text-sm text-white/80">No card required · UK support · Cancel anytime</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              id={feature.id}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-12 items-center scroll-mt-24`}
            >
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">{feature.title}</h2>
                {/* Show only first 3 features as bullets */}
                <ul className="space-y-3 mb-6">
                  {feature.features.slice(0, 3).map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#e6f7ff] flex items-center justify-center mt-0.5">
                        <CheckIcon className="w-4 h-4 text-[#4370B7]" />
                      </div>
                      <span className="text-[#4B5563]">{item}</span>
                    </li>
                  ))}
                </ul>
                {/* Deep link button */}
                {featureDemoMap[feature.id] && (
                  <a
                    href={featureDemoMap[feature.id].deepLink}
                    className="inline-flex items-center gap-2 text-[#4370B7] font-semibold hover:underline text-sm"
                  >
                    {featureDemoMap[feature.id].deepLinkText}
                    <ArrowRightIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
              <div className="flex-1">
                {/* Screenshot */}
                {featureDemoMap[feature.id] ? (
                  <div className="w-full rounded-2xl border border-[rgba(20,30,60,0.08)] overflow-hidden shadow-lg">
                    <img
                      src={featureDemoMap[feature.id].image}
                      alt={feature.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-video bg-gradient-to-br from-[#e6f7ff] to-[#FAFBFC] rounded-2xl border border-[rgba(20,30,60,0.08)] flex items-center justify-center">
                    <div className="text-center">
                      <span className="block text-[#0F172A] font-semibold mb-2">{feature.title}</span>
                      <a href={`/demos#${feature.id}`} className="text-[#4370B7] hover:underline text-sm">
                        View guided demo
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 bg-white border-t border-[rgba(20,30,60,0.08)]" aria-labelledby="platform-guides-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="platform-guides-heading" className="text-xl md:text-2xl font-bold text-[#0F172A] text-center mb-2">
            Workflow guides
          </h2>
          <p className="text-center text-[#4B5563] text-sm max-w-xl mx-auto mb-6">
            Deeper reads that match how UK domiciliary teams work day to day.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <a href="/home-care-scheduling-software" className="text-[#4370B7] font-semibold hover:underline">
              Scheduling software
            </a>
            <a href="/care-planning-software" className="text-[#4370B7] font-semibold hover:underline">
              Care planning software
            </a>
            <a href="/emar-software" className="text-[#4370B7] font-semibold hover:underline">
              eMAR software
            </a>
            <a href="/home-care-app" className="text-[#4370B7] font-semibold hover:underline">
              Home care app
            </a>
            <a href="/" className="text-[#4370B7] font-semibold hover:underline">
              Homepage
            </a>
          </div>
          <p className="text-center text-xs text-[#64748B] mt-5 max-w-lg mx-auto">
            Reviewing vendors?{' '}
            <a href="/birdie-alternative" className="text-[#4370B7] font-semibold hover:underline">
              A careful comparison angle
            </a>
            .
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#FAFBFC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
            See how it all works together
          </h2>
          <p className="text-xl text-[#4B5563] max-w-2xl mx-auto mb-10">
            Book a personalised demo and we'll show you how DomiClear can transform your agency's operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <Button 
              variant="primary" 
              size="lg" 
              href={EXTERNAL_SIGNUP_URL}
              target="_blank"
              rel="noreferrer"
            >
              Start free trial
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              href="/book-demo"
              className="border-[#0F172A]/20 text-[#0F172A] hover:bg-[#0F172A]/5"
            >
              Book a demo
            </Button>
          </div>
          <p className="text-sm text-[#4B5563]">No card required · UK support · Cancel anytime</p>
        </div>
      </section>
    </div>
  );
};
