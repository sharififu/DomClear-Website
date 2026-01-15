import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { PricingCard } from '../components/PricingCard';
import { pricingTiers } from '../data/content';
import { Mail, Lock, ArrowRight, Check, CreditCard, Shield, Smartphone } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  // Check for hash parameter to determine initial mode
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#subscribe') {
      setIsLoginMode(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login:', { email, password });
  };

  const handleSubscriptionSelect = (tierName: string) => {
    setSelectedTier(tierName);
    // Handle subscription selection logic here
    console.log('Selected tier:', tierName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFBFC] to-white pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
            {isLoginMode ? 'Welcome back' : 'Get started with DomiClear'}
          </h1>
          <p className="text-xl text-[#4B5563] max-w-2xl mx-auto">
            {isLoginMode 
              ? 'Sign in to access your DomiClear account'
              : 'Choose a subscription plan that fits your agency'}
          </p>
        </div>

        {/* Toggle between Login and Subscription */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-full p-1 border border-[rgba(20,30,60,0.08)] shadow-sm">
            <button
              onClick={() => setIsLoginMode(true)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                isLoginMode
                  ? 'bg-[#1a86f0] text-white shadow-sm'
                  : 'text-[#4B5563] hover:text-[#1a86f0]'
              }`}
            >
              Log in
            </button>
            <button
              onClick={() => setIsLoginMode(false)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                !isLoginMode
                  ? 'bg-[#1a86f0] text-white shadow-sm'
                  : 'text-[#4B5563] hover:text-[#1a86f0]'
              }`}
            >
              Subscribe
            </button>
          </div>
        </div>

        {isLoginMode ? (
          /* Login Form */
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-[rgba(20,30,60,0.08)]">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#0F172A] mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-[rgba(20,30,60,0.08)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a86f0] focus:border-transparent"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-[#0F172A] mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-[rgba(20,30,60,0.08)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a86f0] focus:border-transparent"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#1a86f0] border-[rgba(20,30,60,0.08)] rounded focus:ring-[#1a86f0]"
                    />
                    <span className="text-sm text-[#4B5563]">Remember me</span>
                  </label>
                  <a
                    href="#forgot-password"
                    className="text-sm font-semibold text-[#1a86f0] hover:text-[#1570d1]"
                  >
                    Forgot password?
                  </a>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  analyticsEvent="login_submit"
                >
                  Sign in
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-[rgba(20,30,60,0.08)]">
                <p className="text-center text-sm text-[#4B5563] mb-4">
                  Don't have an account?
                </p>
                <button
                  onClick={() => setIsLoginMode(false)}
                  className="w-full inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200 px-5 py-3 text-base gap-2 bg-white text-[#1a86f0] border border-[rgba(20,30,60,0.08)] hover:bg-[#FAFBFC] hover:scale-[1.02]"
                >
                  View subscription plans
                </button>
              </div>
            </div>

            {/* Security features */}
            <div className="mt-8 bg-white rounded-2xl p-6 border border-[rgba(20,30,60,0.08)]">
              <h3 className="text-sm font-semibold text-[#0F172A] mb-4">Secure login</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[#1a86f0]" />
                  <span className="text-sm text-[#4B5563]">UK/EU data residency</span>
                </div>
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-[#1a86f0]" />
                  <span className="text-sm text-[#4B5563]">Encrypted connections</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#14B8A6]" />
                  <span className="text-sm text-[#4B5563]">GDPR compliant</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Subscription Plans */
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {pricingTiers.map((tier, index) => (
                <div key={index} className="relative">
                  <PricingCard tier={tier} />
                  <div className="mt-4">
                    <button
                      onClick={() => handleSubscriptionSelect(tier.name)}
                      className={`w-full inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200 px-6 py-4 text-lg gap-2 ${
                        tier.highlighted
                          ? 'bg-[#1a86f0] text-white hover:bg-[#1570d1] hover:scale-[1.02]'
                          : 'bg-white text-[#1a86f0] border border-[rgba(20,30,60,0.08)] hover:bg-[#FAFBFC] hover:scale-[1.02]'
                      }`}
                    >
                      {selectedTier === tier.name ? (
                        <>
                          <Check className="w-5 h-5" />
                          Selected
                        </>
                      ) : (
                        <>
                          Select {tier.name}
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected plan checkout section */}
            {selectedTier && (() => {
              const selectedTierData = pricingTiers.find(t => t.name === selectedTier);
              return (
                <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-lg border border-[rgba(20,30,60,0.08)]">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-[#0F172A] mb-2">
                      Complete your subscription
                    </h2>
                    <p className="text-[#4B5563] mb-4">
                      You've selected the <span className="font-semibold text-[#1a86f0]">{selectedTier}</span> plan
                    </p>
                    {selectedTierData?.price !== undefined && (
                      <div className="bg-gradient-to-br from-[#e6f7ff] to-[#FAFBFC] rounded-lg p-4 mb-4">
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-3xl font-bold text-[#0F172A]">£{selectedTierData.price.toFixed(2)}</span>
                          {selectedTierData.priceUnit && (
                            <span className="text-base text-[#4B5563]">{selectedTierData.priceUnit}</span>
                          )}
                        </div>
                        {selectedTierData.billingPeriod && (
                          <div className="text-sm text-[#4B5563] mt-1">{selectedTierData.billingPeriod}</div>
                        )}
                        <div className="text-sm text-[#4B5563] mt-2">{selectedTierData.priceLabel}</div>
                      </div>
                    )}
                  </div>

                <div className="space-y-6">
                  <div className="bg-[#FAFBFC] rounded-lg p-6">
                    <h3 className="font-semibold text-[#0F172A] mb-4">Payment information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                          Card number
                        </label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full pl-10 pr-4 py-3 border border-[rgba(20,30,60,0.08)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a86f0] focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                            Expiry date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 border border-[rgba(20,30,60,0.08)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a86f0] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-3 border border-[rgba(20,30,60,0.08)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a86f0] focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#FAFBFC] rounded-lg p-6">
                    <h3 className="font-semibold text-[#0F172A] mb-4">Account details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                          Agency name
                        </label>
                        <input
                          type="text"
                          placeholder="Your agency name"
                          className="w-full px-4 py-3 border border-[rgba(20,30,60,0.08)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a86f0] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                          Email address
                        </label>
                        <input
                          type="email"
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 border border-[rgba(20,30,60,0.08)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a86f0] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-[#e6f7ff] rounded-lg">
                    <Check className="w-5 h-5 text-[#1a86f0] mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-[#4B5563]">
                      <p className="font-semibold text-[#0F172A] mb-1">Secure payment processing</p>
                      <p>Your payment is processed securely. You can cancel your subscription at any time.</p>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    analyticsEvent="subscription_purchase"
                    analyticsProperties={{ tier: selectedTier }}
                  >
                    Complete subscription
                    <ArrowRight className="w-5 h-5" />
                  </Button>

                  <p className="text-center text-xs text-[#4B5563]">
                    By completing your subscription, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
                </div>
              );
            })()}

            {/* Benefits section */}
            <div className="mt-12 bg-gradient-to-br from-[#1a86f0] to-[#7c6df0] rounded-3xl p-12 text-white">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">
                  All subscriptions include
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { icon: Smartphone, text: 'iOS & Android carer apps' },
                    { icon: Shield, text: 'UK/EU data residency' },
                    { icon: Check, text: 'CQC-ready compliance' },
                    { icon: CreditCard, text: 'No credit card required for trial' },
                    { icon: Lock, text: 'Enterprise-grade security' },
                    { icon: Mail, text: 'Priority support' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span className="text-white/90">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

