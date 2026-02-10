import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';
import { PricingTier } from '../types';
import { EXTERNAL_SIGNUP_URL } from '../constants/links';

interface PricingCardProps {
  tier: PricingTier;
  billingPeriod?: 'monthly' | 'annual';
}

export const PricingCard: React.FC<PricingCardProps> = ({ tier, billingPeriod = 'monthly' }) => {
  const isDemoCta = tier.cta?.toLowerCase().includes('book');
  const isContactSales = tier.cta?.toLowerCase().includes('contact');
  const ctaHref = isDemoCta ? '/book-demo' : isContactSales ? '/contact' : EXTERNAL_SIGNUP_URL;

  const displayPrice = tier.price !== undefined
    ? billingPeriod === 'annual'
      ? Math.round(tier.price * 12 * 0.8)
      : tier.price
    : undefined;

  const displayUnit = billingPeriod === 'annual' ? '/year' : tier.priceUnit;

  const overagePricing: { [key: string]: string } = {
    'Launch': 'Included',
    'Starter': 'Included',
    'Growth': 'Included',
    'Professional': 'Included',
    'Enterprise': 'Contact sales for 120+',
  };

  return (
    <div
      className={`rounded-2xl p-8 border ${
        tier.highlighted
          ? 'border-[#4370B7] shadow-[0_10px_30px_rgba(67,112,183,0.15)] scale-105'
          : 'border-[rgba(20,30,60,0.08)] shadow-[0_6px_20px_rgba(10,20,40,0.06)]'
      } bg-white relative`}
    >
      <div>
        {tier.highlighted && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="inline-block px-4 py-1 bg-gradient-to-r from-[#2ea0ff] to-[#7c6df0] text-white text-xs font-bold rounded-full uppercase tracking-wider">
              Most Popular
            </span>
          </div>
        )}

        <h3 className="text-2xl font-bold text-[#0F172A] mb-2">{tier.name}</h3>
        <p className="text-[#4B5563] mb-4">{tier.description}</p>

        <div className="mb-6">
          <span className="inline-block px-3 py-1 bg-[#0ea08a] text-white text-xs font-bold rounded-full">
            14-day free trial
          </span>
        </div>

        <div className="mb-8">
          {displayPrice !== undefined ? (
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-[#0F172A]">£{displayPrice.toFixed(0)}</span>
                {displayUnit && (
                  <span className="text-lg text-[#4B5563]">{displayUnit}</span>
                )}
              </div>
              <div className="text-sm text-[#4B5563]">
                {billingPeriod === 'annual' ? 'Billed annually' : tier.billingPeriod}
              </div>
              <div className="text-sm text-[#4B5563] mt-2 font-medium">{tier.priceLabel}</div>
              <div className="text-xs text-[#4B5563] mt-3 pt-3 border-t border-[rgba(20,30,60,0.08)]">
                <strong>Overage:</strong> {overagePricing[tier.name] || ''}
              </div>
            </div>
          ) : (
            <div>
              <div className="text-3xl font-bold text-[#0F172A]">{tier.priceLabel}</div>
              <div className="text-xs text-[#4B5563] mt-3 pt-3 border-t border-[rgba(20,30,60,0.08)]">
                <strong>Overage:</strong> {overagePricing[tier.name] || ''}
              </div>
            </div>
          )}
        </div>

        <Button
          variant={tier.highlighted ? 'primary' : 'secondary'}
          size="lg"
          href={ctaHref}
          target={isDemoCta || isContactSales ? undefined : '_blank'}
          rel={isDemoCta || isContactSales ? undefined : 'noreferrer'}
          className="w-full mb-8"
          analyticsEvent="pricing_tier_click"
          analyticsProperties={{ tier: tier.name, billing_period: billingPeriod }}
        >
          {tier.cta}
        </Button>

        <ul className="space-y-4">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#e6f7ff] flex items-center justify-center mt-0.5">
                <CheckIcon className="w-3 h-3 text-[#4370B7]" />
              </div>
              <span className="text-[#4B5563]">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
