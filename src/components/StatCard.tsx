import React from 'react';
import * as Icons from 'lucide-react';
import { Stat } from '../types';

interface StatCardProps {
  stat: Stat;
}

export const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const IconComponent = Icons[stat.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgba(46,160,255,0.04)] mb-4">
        {IconComponent && <IconComponent className="w-8 h-8 text-[#4370B7]" />}
      </div>
      <div className="text-4xl font-bold text-[#0F172A] mb-2">{stat.metric}</div>
      <p className="text-[#4B5563]">{stat.label}</p>
    </div>
  );
};
