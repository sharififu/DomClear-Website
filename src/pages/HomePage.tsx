import React from 'react';
import { Hero } from '../components/Hero';
import { PromoShowcase } from '../components/PromoShowcase';
import { ComprehensiveFeatures } from '../components/ComprehensiveFeatures';
import { Button } from '../components/Button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { EXTERNAL_SIGNUP_URL } from '../constants/links';

export const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />

      <PromoShowcase />

      <ComprehensiveFeatures />

      {/* A practical next step rather than repeating the product feature blocks above. */}
      <section className="border-t border-slate-200 bg-[#f7f9fc] py-14 md:py-20" aria-labelledby="explore-next-heading">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#345e9c]">
              Explore DomiClear
            </p>
            <h2 id="explore-next-heading" className="mb-4 text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl">
              See the product. Understand the cost. Make an informed choice.
            </h2>
            <p className="text-base leading-relaxed text-[#475569] md:text-lg">
              You've seen how the workflows connect. Now explore real product tutorials,
              review the published pricing and look at our security and registration information.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {[
              {
                href: '/tutorials',
                number: '01',
                heading: 'Watch product tutorials',
                description: 'Follow recorded walkthroughs of the care app, scheduling and medication workflows.',
                action: 'Browse tutorials',
              },
              {
                href: '/pricing',
                number: '02',
                heading: 'Review the pricing',
                description: 'See DomiClear’s published plans and pricing information for your agency.',
                action: 'Explore pricing',
              },
              {
                href: '/credentials',
                number: '03',
                heading: 'Check our credentials',
                description: 'Read the current status and scope of our published security assessments and registrations.',
                action: 'View credentials',
              },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group flex h-full flex-col rounded-2xl border border-[#dce4f0] bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[#8ea9d4] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#345e9c]"
              >
                <span className="mb-5 text-xs font-bold tracking-[0.14em] text-[#4370B7]" aria-hidden="true">
                  {item.number}
                </span>
                <h3 className="mb-3 text-lg font-bold text-[#0F172A] group-hover:text-[#345e9c]">
                  {item.heading}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-[#475569]">{item.description}</p>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-[#345e9c]">
                  {item.action}
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>

          <nav className="mt-10 border-t border-[#dde4ee] pt-7" aria-label="Explore individual DomiClear features">
            <p className="mb-4 text-center text-sm font-semibold text-[#334155]">
              Looking for a specific workflow?
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { href: '/home-care-scheduling-software', label: 'Scheduling & rotas' },
                { href: '/care-planning-software', label: 'Care planning' },
                { href: '/emar-software', label: 'Medication & eMAR' },
                { href: '/care-management-app', label: 'Carer mobile app' },
                { href: '/platform', label: 'Explore the full platform' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-full border border-[#d5dfed] bg-white px-4 py-2 text-sm font-semibold text-[#345e9c] transition-colors hover:border-[#90a9d0] hover:bg-[#eaf2ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#345e9c]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          <p className="mt-6 text-center text-sm text-[#64748b]">
            Comparing care software options?{' '}
            <a href="/birdie-alternative" className="font-semibold text-[#345e9c] underline underline-offset-4 hover:text-[#233f6c]">
              Explore our comparison guide
            </a>
            .
          </p>
        </div>
      </section>

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
