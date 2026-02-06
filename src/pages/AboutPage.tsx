import React, { useEffect } from 'react';
import { Check, Briefcase, Newspaper, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { EXTERNAL_SIGNUP_URL } from '../constants/links';

export const AboutPage: React.FC = () => {
  // Handle scrolling to anchor links when page loads with a hash
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const offset = 100;
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
        <div className="max-w-[1200px] mx-auto px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            About Us
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            About DomiClear
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10">
            We're building the connected homecare platform that UK care agencies deserve—operational clarity, quality compliance, and empowered care teams.
          </p>
          <Button
            variant="secondary"
            size="lg"
            href="/contact"
            className="!bg-white !text-[#1a86f0] border-0 hover:!bg-white/90"
          >
            Get in touch
          </Button>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
              Our mission
            </h2>
            <p className="text-lg text-[#4B5563] leading-relaxed mb-12">
              DomiClear exists to reduce admin, improve care quality, and help UK domiciliary care agencies stay CQC-ready. We believe care teams should spend more time with people and less time on paperwork.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                'UK-focused homecare expertise',
                'CQC-aligned compliance built in',
                'Modern, intuitive technology',
              ].map((value, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#e6f7ff] flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-[#4370B7]" />
                  </div>
                  <span className="text-[#4B5563] text-left">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="careers" className="py-20 bg-[#FAFBFC] scroll-mt-24">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#e6f7ff] to-[#FAFBFC] flex items-center justify-center border border-[rgba(20,30,60,0.08)]">
                  <Briefcase className="w-12 h-12 text-[#4370B7]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">Careers</h2>
              </div>
              <p className="text-lg text-[#4B5563] leading-relaxed mb-8">
                We're always looking for talented people who care about improving homecare. If you're passionate about technology and care quality, we'd love to hear from you.
              </p>
              <p className="text-[#4B5563] mb-8">
                Open roles will be posted here as we grow. In the meantime, send us your CV and a note about why you're interested in joining the team.
              </p>
              <Button variant="primary" size="md" href="/contact">
                Get in touch
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1">
              <div className="w-full aspect-video bg-gradient-to-br from-[#e6f7ff] to-[#FAFBFC] rounded-2xl border border-[rgba(20,30,60,0.08)] flex items-center justify-center p-8">
                <div className="text-center max-w-md">
                  <Briefcase className="w-16 h-16 text-[#4370B7] mx-auto mb-4" />
                  <span className="block text-[#0F172A] font-semibold text-xl">Join our team</span>
                  <p className="text-sm text-[#4B5563] mt-2">
                    Help us build the future of homecare technology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="press" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#e6f7ff] to-[#FAFBFC] flex items-center justify-center border border-[rgba(20,30,60,0.08)]">
                  <Newspaper className="w-12 h-12 text-[#7c6df0]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">Press</h2>
              </div>
              <p className="text-lg text-[#4B5563] leading-relaxed mb-8">
                For press enquiries, interview requests, or media assets, please contact our team. We're happy to provide information about DomiClear and the UK homecare sector.
              </p>
              <p className="text-[#4B5563] mb-8">
                Media kit and brand assets available on request.
              </p>
              <Button variant="primary" size="md" href="/contact">
                Contact press team
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1">
              <div className="w-full aspect-video bg-gradient-to-br from-[#e6f7ff] to-[#FAFBFC] rounded-2xl border border-[rgba(20,30,60,0.08)] flex items-center justify-center p-8">
                <div className="text-center max-w-md">
                  <Newspaper className="w-16 h-16 text-[#7c6df0] mx-auto mb-4" />
                  <span className="block text-[#0F172A] font-semibold text-xl">Media enquiries</span>
                  <p className="text-sm text-[#4B5563] mt-2">
                    Get in touch for press and partnership opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#FAFBFC]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="bg-white rounded-3xl p-12 md:p-16 border border-[rgba(20,30,60,0.08)] shadow-card text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
              Ready to simplify your home care management?
            </h2>
            <p className="text-xl text-[#4B5563] max-w-2xl mx-auto mb-8">
              Join UK care agencies using DomiClear to reduce admin, improve care quality and stay CQC-ready.
            </p>
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
      </section>
    </div>
  );
};
