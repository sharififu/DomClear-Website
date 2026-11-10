import React, { useEffect } from 'react';
import { CheckIcon, UsersIcon, BuildingOffice2Icon, HeartIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Button } from '../components/Button';
import { solutionsContent } from '../data/content';
import { EXTERNAL_SIGNUP_URL } from '../constants/links';

const roleJourneys: Record<string, {
  title: string;
  steps: string[];
  href: string;
  linkText: string;
}> = {
  'care-managers': {
    title: 'From planning to follow-up',
    steps: [
      'Review visits and current carer assignments',
      'Check which approved tasks belong on each planned visit',
      'Investigate incidents and follow actions through',
    ],
    href: '/platform#compliance',
    linkText: 'Explore incident and quality workflows',
  },
  owners: {
    title: 'From records to informed decisions',
    steps: [
      'Review care delivery and workforce reporting',
      'Examine invoice, payroll and attendance records',
      'Check recorded quality findings and outstanding actions',
    ],
    href: '/platform#analytics',
    linkText: 'Explore reports and analytics',
  },
  families: {
    title: 'Shared information, with permission',
    steps: [
      'The care provider links and authorises a family account',
      'The family member views permitted visits or care information',
      'The provider can update or withdraw sharing permissions',
    ],
    href: '/platform#family',
    linkText: 'Explore family portal access',
  },
};

export const SolutionsPage: React.FC = () => {
  const solutions = Object.values(solutionsContent);

  // Handle scrolling to anchor links when page loads with a hash
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove the # symbol
    if (hash) {
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const offset = 100; // Account for fixed navbar
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 100);
    }
  }, []);

  return (
    <div>
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#1a86f0] to-[#7c6df0] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            Solutions
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Home care tools for the people behind every visit
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10">
            For care managers and agency owners, and for relatives who have been granted family-portal access. DomiClear keeps care workflows connected while respecting the different responsibilities and permissions of each role.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <Button
              variant="secondary"
              size="lg"
              href={EXTERNAL_SIGNUP_URL}
              target="_blank"
              rel="noreferrer"
              className="!bg-white !text-[#1D4ED8] border-0 hover:!bg-white/90"
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
          <p className="text-sm text-white/80">Explore with a free trial or a guided demo</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {solutions.map((solution, index) => {
            // Different icons for each solution type
            const icons = {
              'care-managers': <UsersIcon className="w-12 h-12 text-[#4370B7]" />,
              'owners': <BuildingOffice2Icon className="w-12 h-12 text-[#7c6df0]" />,
              'families': <HeartIcon className="w-12 h-12 text-[#14B8A6]" />,
            };

            const IconComponent = icons[solution.id as keyof typeof icons] || <UsersIcon className="w-12 h-12 text-[#4370B7]" />;
            const journey = roleJourneys[solution.id];

            return (
              <div
                key={solution.id}
                id={solution.id}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-12 items-center scroll-mt-24`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#e6f7ff] to-[#FAFBFC] flex items-center justify-center border border-[rgba(20,30,60,0.08)]">
                      {IconComponent}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">{solution.title}</h2>
                  </div>
                  <p className="text-lg text-[#4B5563] leading-relaxed mb-8">{solution.description}</p>
                  <ul className="space-y-3 mb-8">
                    {solution.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#e6f7ff] flex items-center justify-center mt-0.5">
                          <CheckIcon className="w-4 h-4 text-[#4370B7]" />
                        </div>
                        <span className="text-[#4B5563]">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="primary" 
                    size="md" 
                    href={EXTERNAL_SIGNUP_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Start free trial
                    <ArrowRightIcon className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex-1 w-full">
                  <div className="rounded-2xl border border-[#dce5f2] bg-gradient-to-br from-[#f2f7ff] to-[#f6fcfa] p-6 shadow-[0_12px_38px_-28px_rgba(25,45,78,0.35)] sm:p-8">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#345e9c]">
                      How the workflow connects
                    </p>
                    <h3 className="mb-5 text-xl font-bold text-[#0F172A] sm:text-2xl">{journey.title}</h3>
                    <ol className="space-y-4">
                      {journey.steps.map((step, stepIndex) => (
                        <li key={step} className="flex items-start gap-3">
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#b8d0ed] bg-white text-xs font-bold text-[#345e9c]">
                            {String(stepIndex + 1).padStart(2, '0')}
                          </span>
                          <span className="pt-1 text-sm leading-6 text-[#334155]">{step}</span>
                        </li>
                      ))}
                    </ol>
                    <a
                      href={journey.href}
                      className="mt-7 inline-flex min-h-11 items-center gap-2 font-semibold text-[#23579b] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#23579b]"
                    >
                      {journey.linkText}
                      <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-12 bg-[#F8FAFC] border-y border-[rgba(20,30,60,0.06)]" aria-labelledby="solutions-related-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="solutions-related-heading" className="text-base font-bold text-[#0F172A] mb-2">
            Related workflows
          </h2>
          <p className="text-sm text-[#4B5563] max-w-xl mx-auto mb-5">
            Jump to the product areas owners and care managers usually weigh alongside role-based needs.
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
            <a href="/care-management-app" className="text-[#4370B7] font-semibold hover:underline">
              Home care app
            </a>
            <a href="/home-care-scheduling-software" className="text-[#4370B7] font-semibold hover:underline">
              Scheduling software
            </a>
            <a href="/care-planning-software" className="text-[#4370B7] font-semibold hover:underline">
              Care planning software
            </a>
            <a href="/emar-software" className="text-[#4370B7] font-semibold hover:underline">
              eMAR software
            </a>
            <a href="/platform" className="text-[#4370B7] font-semibold hover:underline">
              Platform
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#FAFBFC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-12 md:p-16 border border-[rgba(20,30,60,0.08)] shadow-card">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
                See how DomiClear works for your role
              </h2>
              <p className="text-xl text-[#4B5563] max-w-2xl mx-auto">
                Choose a walkthrough focused on the role and workflows you need to assess. We'll show the real screens and explain the limits as well as the features.
              </p>
            </div>
            
            <div className="mb-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
              <a href="/tutorials" className="font-semibold text-[#23579b] underline-offset-4 hover:underline">
                Watch existing product tutorials
              </a>
              <a href="/credentials" className="font-semibold text-[#23579b] underline-offset-4 hover:underline">
                Review security and assurance status
              </a>
              <a href="/pricing" className="font-semibold text-[#23579b] underline-offset-4 hover:underline">
                Explore plans and pricing
              </a>
            </div>

            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
                <Button
                  variant="primary"
                  size="lg"
                  href={EXTERNAL_SIGNUP_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Start free trial
                  <ArrowRightIcon className="w-5 h-5" />
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
              <p className="text-sm text-[#4B5563]">Explore with a free trial or a guided demo</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

