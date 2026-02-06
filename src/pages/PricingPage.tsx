import React, { useState } from 'react';
import { PricingCard } from '../components/PricingCard';
import { FAQAccordion } from '../components/FAQAccordion';
import { pricingTiers, faqItems } from '../data/content';
import { CheckIcon } from '@heroicons/react/24/outline';
import { analytics } from '../utils/analytics';

export const PricingPage: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  React.useEffect(() => {
    analytics.track('pricing_view');
  }, []);

  const handleBillingToggle = (period: 'monthly' | 'annual') => {
    setBillingPeriod(period);
  };

  return (
    <div>
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#1a86f0] to-[#7c6df0] text-white">
        <div className="max-w-[1200px] mx-auto px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            Transparent Pricing
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Pay only for the service users you support. Unlimited staff seats on every plan. Scale up or down anytime.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          {/* Annual toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#FAFBFC] rounded-full p-1 border border-[rgba(20,30,60,0.08)] shadow-xs">
              <button
                onClick={() => handleBillingToggle('monthly')}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                  billingPeriod === 'monthly'
                    ? 'bg-[#4370B7] text-white shadow-xs'
                    : 'text-[#4B5563] hover:text-[#4370B7]'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => handleBillingToggle('annual')}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                  billingPeriod === 'annual'
                    ? 'bg-[#4370B7] text-white shadow-xs'
                    : 'text-[#4B5563] hover:text-[#4370B7]'
                }`}
              >
                Annual (save 15%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <PricingCard key={index} tier={tier} billingPeriod={billingPeriod} />
            ))}
          </div>

          {/* Unit definition note */}
          <div className="mt-12 bg-[#FAFBFC] rounded-xl p-6 border border-[rgba(20,30,60,0.08)]">
            <p className="text-sm text-[#4B5563] leading-relaxed">
              <strong className="text-[#0F172A]">What counts as an "active service user"?</strong> Any client with at least one scheduled or recorded visit in a billing month. Archived clients aren't billed.
            </p>
          </div>

          <div className="mt-16 bg-[#FAFBFC] rounded-2xl p-8 border border-[rgba(20,30,60,0.08)]">
            <h3 className="text-2xl font-bold text-[#0F172A] mb-6 text-center">
              All plans include
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Unlimited staff accounts',
                'Unlimited family portal logins',
                'iOS & Android carer apps',
                'UK/EU data residency',
                'Regular platform updates',
                'Data export (CSV)',
                'Role-based access controls',
                'Audit logs and compliance trails',
                '99.9% uptime SLA',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#e6f7ff] flex items-center justify-center mt-0.5">
                    <CheckIcon className="w-3 h-3 text-[#4370B7]" />
                  </div>
                  <span className="text-[#4B5563]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#FAFBFC]">
        <div className="max-w-[900px] mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
              Frequently asked questions
            </h2>
            <p className="text-lg text-[#4B5563]">
              Have more questions? Contact our team and we'll be happy to help.
            </p>
          </div>
          <FAQAccordion items={faqItems} />
        </div>
      </section>
    </div>
  );
};
