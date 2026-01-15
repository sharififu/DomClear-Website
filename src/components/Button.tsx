import React from 'react';
import { analytics } from '../utils/analytics';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  analyticsEvent?: string;
  analyticsProperties?: Record<string, any>;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  href,
  className = '',
  target,
  rel,
  analyticsEvent,
  analyticsProperties,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200';

  const variantClasses = {
    primary: 'bg-[#1a86f0] text-white hover:bg-[#1570d1] hover:scale-[1.02]',
    accent: 'bg-[#0ea08a] text-white hover:bg-[#0c8a75] hover:scale-[1.02]',
    secondary: 'bg-white text-[#1a86f0] border border-[rgba(20,30,60,0.08)] hover:bg-[#FAFBFC] hover:scale-[1.02]',
    ghost: 'bg-transparent text-[#1a86f0] hover:bg-[rgba(46,160,255,0.04)]',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-5 py-3 text-base gap-2',
    lg: 'px-6 py-4 text-lg gap-2',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const handleClick = () => {
    if (analyticsEvent) {
      analytics.track(analyticsEvent, analyticsProperties);
    }
  };

  if (href) {
    return (
      <a href={href} className={classes} onClick={handleClick} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={handleClick} {...props}>
      {children}
    </button>
  );
};
