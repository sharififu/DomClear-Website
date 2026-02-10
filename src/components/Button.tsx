import React from 'react';
import { Button as HeroButton } from '@heroui/react';
import { analytics } from '../utils/analytics';

interface ButtonProps extends Omit<React.ComponentProps<typeof HeroButton>, 'variant' | 'size' | 'onPress'> {
  variant?: 'primary' | 'accent' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  analyticsEvent?: string;
  analyticsProperties?: Record<string, unknown>;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

const variantMap = {
  primary: 'primary' as const,
  accent: 'primary' as const, // Use primary with teal via className
  secondary: 'outline' as const,
  ghost: 'ghost' as const,
};

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
  onPress,
  onClick,
  ...props
}) => {
  const handlePress = (e: Parameters<NonNullable<typeof onPress>>[0]) => {
    if (analyticsEvent) {
      analytics.track(analyticsEvent, analyticsProperties);
    }
    onPress?.(e);
    onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>);
  };

  const variantClass = {
    primary: 'bg-[#4370B7] text-white hover:bg-[#365a9a]',
    accent: 'bg-[#0ea08a] text-white hover:bg-[#0c8a75]',
    secondary: 'border border-[rgba(20,30,60,0.08)] text-[#4370B7] bg-transparent hover:bg-black/5',
    ghost: 'text-[#4370B7] bg-transparent hover:bg-black/5',
  }[variant];

  const sizeClass = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-base',
  }[size];

  const herouiVariant = variantMap[variant];
  const sizeMap = { sm: 'sm' as const, md: 'md' as const, lg: 'lg' as const };

  const baseLinkClass =
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors cursor-pointer no-underline';

  const combinedClassName = `${variantClass} ${className}`.trim();

  if (href) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (analyticsEvent) {
        analytics.track(analyticsEvent, analyticsProperties);
      }
      onClick?.(e);
    };

    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={`${baseLinkClass} ${sizeClass} ${combinedClassName}`}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <HeroButton
      variant={herouiVariant}
      size={sizeMap[size]}
      className={combinedClassName || undefined}
      onPress={handlePress}
      {...props}
    >
      {children}
    </HeroButton>
  );
};
