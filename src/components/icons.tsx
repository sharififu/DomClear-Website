import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ClipboardDocumentIcon,
  ClockIcon,
  CurrencyPoundIcon,
  DevicePhoneMobileIcon,
  DocumentTextIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PlayIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserIcon,
  UsersIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import type { ComponentType, SVGProps } from 'react';

export type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;

/**
 * Map of content.ts icon string keys to Heroicon (24 outline) components.
 * Used by StatCard, FeatureCard, FeatureOverview, ComprehensiveFeatures.
 */
export const contentIconMap: Record<string, IconComponent> = {
  Activity: ChartBarIcon,
  Shield: ShieldCheckIcon,
  Users: UsersIcon,
  FileText: DocumentTextIcon,
  Calendar: CalendarDaysIcon,
  Smartphone: DevicePhoneMobileIcon,
  CheckCircle: CheckCircleIcon,
  PoundSterling: CurrencyPoundIcon,
  Heart: HeartIcon,
  BarChart3: ChartBarIcon,
  TrendingDown: ArrowTrendingDownIcon,
  Clock: ClockIcon,
  TrendingUp: ArrowTrendingUpIcon,
  MapPin: MapPinIcon,
  Clipboard: ClipboardDocumentIcon,
  Search: MagnifyingGlassIcon,
  Play: PlayIcon,
  Plus: PlusIcon,
  User: UserIcon,
};

export function getContentIcon(name: string): IconComponent | undefined {
  return contentIconMap[name];
}

export const WhatsAppLogo: IconComponent = ({ className, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347M12.051 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.889-9.884a9.84 9.84 0 0 1 6.988 2.899 9.82 9.82 0 0 1 2.895 6.994c-.002 5.45-4.436 9.883-9.888 9.883M20.485 3.488A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.946L.057 24l6.304-1.654a11.9 11.9 0 0 0 5.685 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.459-8.413" />
  </svg>
);

export const LinkedInLogo: IconComponent = ({ className, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

export const FacebookLogo: IconComponent = ({ className, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.414c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.956.931-1.956 1.887v2.262h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
  </svg>
);
