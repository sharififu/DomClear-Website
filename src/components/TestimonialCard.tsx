import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-2xl p-8 border border-[rgba(20,30,60,0.08)] shadow-[0_6px_20px_rgba(10,20,40,0.06)] relative">
      {/* Verified badge */}
      {testimonial.verified && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4 text-[#0ea08a]" fill="currentColor" />
          <span className="text-xs font-semibold text-[#0ea08a]">Verified</span>
        </div>
      )}
      
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-[#f59e0b] text-[#f59e0b]" />
        ))}
      </div>
      <p className="text-[#0F172A] text-lg mb-6 leading-relaxed">"{testimonial.content}"</p>
      <div className="flex items-center gap-4">
        {testimonial.logo ? (
          <img 
            src={testimonial.logo} 
            alt={testimonial.organisation}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2ea0ff] to-[#7c6df0] flex items-center justify-center">
          <span className="text-white font-semibold text-lg">
            {testimonial.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        )}
        <div>
          <p className="font-semibold text-[#0F172A]">{testimonial.name}</p>
          <p className="text-sm text-[#4B5563]">
            {testimonial.role}, {testimonial.organisation}
          </p>
        </div>
      </div>
    </div>
  );
};
