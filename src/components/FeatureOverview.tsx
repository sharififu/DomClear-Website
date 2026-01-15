import React from 'react';
import * as Icons from 'lucide-react';
import { featureOverviewContent } from '../data/content';

export const FeatureOverview: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0]">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          {/* Background image behind the two graphics */}
          <div 
            className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-[calc(66.67%+3rem)] h-full opacity-100 bg-contain bg-left bg-no-repeat pointer-events-none"
            style={{
              backgroundImage: "url('/demo-media/women on Domiclear app.png')",
            }}
          ></div>
          
          {/* Left side - Decorative icon */}
          <div className="lg:col-span-2 flex justify-center lg:justify-start relative z-10">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#1a86f0] to-[#7c6df0] flex items-center justify-center shadow-lg">
              <Icons.Clipboard className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Center - Empty space allows background image to show */}
          <div className="lg:col-span-6 flex justify-center relative z-10">
          </div>

          {/* Right side - Stats and features */}
          <div className="lg:col-span-4">
            {/* Statistics */}
            <div className="mb-8">
              {featureOverviewContent.stats.map((stat, index) => (
                <div key={index} className="mb-4">
                  <div className="text-4xl font-bold text-[#0F172A] mb-1">{stat.metric}</div>
                  <p className="text-sm text-[#6b7280]">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Feature descriptions */}
            <div className="space-y-6">
              {featureOverviewContent.features.map((feature, index) => {
                const IconComponent = Icons[feature.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
                return (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-2 flex items-center gap-2">
                      {IconComponent && <IconComponent className="w-5 h-5 text-[#1a86f0]" />}
                      {feature.title}
                    </h3>
                    <p className="text-[#6b7280] text-sm leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};




