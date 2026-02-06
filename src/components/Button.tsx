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
    primary: '',
    accent: 'bg-[#0ea08a] text-white hover:bg-[#0c8a75] data-[hover=true]:bg-[#0c8a75]',
    secondary: 'border-[rgba(20,30,60,0.08)] text-[#4370B7]',
    ghost: 'text-[#4370B7] bg-transparent',
  }[variant];

  const herouiVariant = variantMap[variant];
  const sizeMap = { sm: 'sm' as const, md: 'md' as const, lg: 'lg' as const };

  const combinedClassName = `${variantClass} ${className}`.trim();

  if (href) {
    return (
      <HeroButton
        as="a"
        href={href}
        target={target}
        rel={rel}
        variant={herouiVariant}
        size={sizeMap[size]}
        className={combinedClassName || undefined}
        onPress={handlePress}
        {...props}
      >
        {children}
      </HeroButton>
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
