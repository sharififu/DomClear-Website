import React, { useEffect } from 'react';
import { CheckIcon, UsersIcon, BuildingOffice2Icon, HeartIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Button } from '../components/Button';
import { solutionsContent } from '../data/content';
import { EXTERNAL_SIGNUP_URL } from '../constants/links';

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
            Tailored solutions for every role
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10">
            Whether you're managing care operations, running an agency, or supporting a loved one, DomiClear is designed with your needs in mind.
          </p>
          <Button 
            variant="secondary" 
            size="lg" 
            href={EXTERNAL_SIGNUP_URL} 
            target="_blank" 
            rel="noreferrer" 
            className="!bg-white !text-[#1a86f0] border-0 hover:!bg-white/90"
          >
            Start free trial
          </Button>
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
                <div className="flex-1">
                  <div className="w-full aspect-video bg-gradient-to-br from-[#e6f7ff] to-[#FAFBFC] rounded-2xl border border-[rgba(20,30,60,0.08)] flex items-center justify-center p-8">
                    <div className="text-center max-w-md">
                      <div className="mb-6 flex justify-center">
                        <div className="w-20 h-20 rounded-2xl bg-white shadow-card flex items-center justify-center">
                          {IconComponent}
                        </div>
                      </div>
                      <span className="block text-[#0F172A] font-semibold mb-2 text-xl">{solution.title}</span>
                      <p className="text-sm text-[#4B5563] mb-4">{solution.description.substring(0, 120)}...</p>
                      <a href={`/demos#${solution.id}`} className="text-[#4370B7] hover:underline text-sm font-medium">
                        View demo →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
                Book a personalised demo tailored to your needs and discover how DomiClear can transform your care operations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {solutions.map((solution) => (
                <div
                  key={solution.id}
                  className="p-6 rounded-2xl border border-[rgba(20,30,60,0.08)] hover:shadow-card-hover transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3">{solution.title}</h3>
                  <p className="text-[#4B5563] mb-4 text-sm">{solution.description.substring(0, 100)}...</p>
                  <a
                    href={`/solutions#${solution.id}`}
                    className="text-[#4370B7] hover:underline text-sm font-medium inline-flex items-center gap-1"
                  >
                    Learn more
                    <ArrowRightIcon className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button 
                variant="primary" 
                size="lg" 
                href={EXTERNAL_SIGNUP_URL}
                target="_blank"
                rel="noreferrer"
              >
                Start free trial
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

