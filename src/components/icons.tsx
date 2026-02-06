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
