import React from 'react';
import * as Icons from 'lucide-react';
import { Feature } from '../types';

interface FeatureCardProps {
  feature: Feature;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  const IconComponent = Icons[feature.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  return (
    <div className="bg-white rounded-2xl p-6 border border-[rgba(20,30,60,0.08)] shadow-[0_6px_20px_rgba(10,20,40,0.06)] hover:shadow-[0_10px_30px_rgba(10,20,40,0.10)] hover:-translate-y-1 transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2ea0ff] to-[#7c6df0] flex items-center justify-center mb-4">
        {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
      </div>
      <h3 className="text-xl font-semibold text-[#0F172A] mb-3">{feature.title}</h3>
      <p className="text-[#4B5563] leading-relaxed">{feature.description}</p>
    </div>
  );
};
