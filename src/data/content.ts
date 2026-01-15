import { NavItem, Feature, Testimonial, Stat, PricingTier } from '../types';

export const navigation: NavItem[] = [
  {
    label: 'Platform',
    href: '/platform',
    children: [
      { label: 'Care Planning & Form Builder', href: '/platform#care-planning' },
      { label: 'Scheduling & Rotas', href: '/platform#scheduling' },
      { label: 'Carer Mobile App', href: '/platform#carer-app' },
      { label: 'Quality & Compliance', href: '/platform#compliance' },
      { label: 'Team Management', href: '/platform#team' },
      { label: 'Finance', href: '/platform#finance' },
      { label: 'Family Portal', href: '/platform#family' },
      { label: 'Analytics & Reporting', href: '/platform#analytics' },
      { label: 'Security & Privacy', href: '/platform#security' },
    ],
  },
  {
    label: 'Solutions',
    href: '/solutions',
    children: [
      { label: 'For Care Managers', href: '/solutions#care-managers' },
      { label: 'For Agency Owners', href: '/solutions#owners' },
      { label: 'For Families', href: '/solutions#families' },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  {
    label: 'Demo',
    href: '/demos',
    children: [
      { label: 'Interactive Demo', href: '/demos' },
      { label: 'Book a Demo', href: '/book-demo' },
    ],
  },
  { label: 'About', href: '/about' },
];

export const heroContent = {
  eyebrow: 'HOMECARE PLATFORM',
  title: 'All‑in‑one Home Care Management for Agencies',
  subtitle:
    'Plan rotas, log EMAR, capture incidents, and export CQC evidence—on web, iOS & Android.',
  primaryCta: 'Start free trial',
  secondaryCta: 'Book live demo',
};

export const valuePillars: Feature[] = [
  {
    icon: 'Activity',
    title: 'Operational clarity',
    description: 'Manage rotas, visits, tasks, and EMAR in one unified platform that keeps everyone aligned.',
  },
  {
    icon: 'Shield',
    title: 'Quality & compliance',
    description: 'Evidence outcomes with audit trails and CQC-ready reports, built for UK regulation.',
  },
  {
    icon: 'Users',
    title: 'Empowered care teams',
    description: 'Modern carer app meets desktop-first CMS for managers, with role-based access that works.',
  },
];

export const featureHighlights: Feature[] = [
  {
    icon: 'FileText',
    title: 'Configurable form builder',
    description:
      'Visual care plan templates with conditional logic, validations, and version history—tailor forms to your agency workflows.',
  },
  {
    icon: 'Calendar',
    title: 'Intelligent scheduling',
    description:
      'Rota planning with conflict alerts, travel time, shift swaps, and visit confirmation—reduce missed visits and paperwork.',
  },
  {
    icon: 'Smartphone',
    title: 'Offline-first carer app',
    description:
      'Task lists, EMAR logging, notes, GPS verify, and incident capture work seamlessly without signal, syncing when back online.',
  },
  {
    icon: 'CheckCircle',
    title: 'CQC-ready compliance',
    description:
      'Audit checklists, incident workflows, complaints management, and document control with review cycles built for inspections.',
  },
  {
    icon: 'Users',
    title: 'Team management',
    description:
      'Onboarding workflows, training and qualifications tracking, availability, and performance insights for your care teams.',
  },
  {
    icon: 'PoundSterling',
    title: 'Finance',
    description:
      'Timesheets from verified visits, payroll-ready exports, invoicing, and billable rules to keep revenue accurate.',
  },
  {
    icon: 'Heart',
    title: 'Family portal',
    description:
      'Secure portal for visit updates, schedules, and permissioned care notes—keep families informed and connected.',
  },
  {
    icon: 'BarChart3',
    title: 'Analytics & reporting',
    description:
      'Pre-built KPI dashboards with CSV export for deeper analysis—turn care data into decisions.',
  },
];

export const outcomes: Stat[] = [
  { metric: '42%', label: 'Reduction in late/missed visits', icon: 'TrendingDown' },
  { metric: '3.5 hrs', label: 'Admin time saved per manager/week', icon: 'Clock' },
  { metric: '98%', label: 'Medication adherence rate', icon: 'TrendingUp' },
  { metric: '100%', label: 'UK/EU data residency', icon: 'MapPin' },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah Mitchell',
    role: 'Care Manager',
    organisation: 'BrightCare Services',
    content:
      'DomiClear transformed our rostering chaos into clarity. The carer app is intuitive, and our families love the transparency.',
    rating: 5,
    verified: true,
  },
  {
    name: 'James O\'Connor',
    role: 'Agency Director',
    organisation: 'CompassCare Ltd',
    content:
      'We were drowning in paperwork. Now we have CQC-ready reports at our fingertips and our compliance scores have never been better.',
    rating: 5,
    verified: true,
  },
  {
    name: 'Eleanor Davies',
    role: 'Operations Manager',
    organisation: 'Heritage Home Support',
    content:
      'The form builder alone was worth it. We built custom care plans in days, not weeks, and incident logging is finally streamlined.',
    rating: 5,
    verified: true,
  },
];

export const platformFeatures = {
  carePlanning: {
    id: 'care-planning',
    title: 'Care Planning & Form Builder',
    description:
      'Design bespoke care plans with our visual form builder. Choose from pre-built templates for common care scenarios or create entirely custom forms. Conditional logic shows or hides fields based on answers, reducing clutter and errors. Field-level validations ensure data quality at capture. Every change is tracked with full version history and audit trails, so you always know who edited what and when. Whether you\'re documenting personal care, medication protocols, or risk assessments, the builder adapts to your agency\'s workflows without technical expertise.',
    features: [
      'Visual drag-and-drop form builder',
      'Pre-built care plan templates',
      'Conditional logic and field rules',
      'Field-level validations',
      'Version history and audit trails',
      'Custom workflows per service type',
    ],
  },
  scheduling: {
    id: 'scheduling',
    title: 'Scheduling & Rotas',
    description:
      'Plan rotas with confidence using intelligent conflict detection. The system alerts you to double-bookings, missing qualifications, or travel-time issues before you publish. Carers can request shift swaps subject to manager approval. Travel time between visits is calculated automatically, and visit confirmations capture GPS location and timestamps. Integrated with the carer app, schedule changes sync instantly so your team always sees the latest rota. Reduce administrative overhead, improve punctuality, and give managers a real-time view of service delivery across the agency.',
    features: [
      'Visual rota planning calendar',
      'Real-time conflict alerts',
      'Shift swap requests and approvals',
      'Automatic travel time calculations',
      'GPS visit confirmation',
      'Instant sync to carer app',
    ],
  },
  carerApp: {
    id: 'carer-app',
    title: 'Carer Mobile App',
    description:
      'Designed for carers on the move, the mobile app works offline-first so poor signal never stops care delivery. Task lists guide carers through each visit step-by-step. EMAR logging records medication administration with photos and timestamps. Notes, attachments, and incident forms capture observations in the moment. GPS verification confirms visit location and time, providing evidence for billing and compliance. Secure in-app messaging keeps carers connected to the office without sharing personal phone numbers. All data syncs to the central platform when connectivity returns, ensuring managers have up-to-date visibility.',
    features: [
      'Offline-first task completion',
      'EMAR with photo evidence',
      'Rich text notes and attachments',
      'Incident and observation capture',
      'GPS visit verification',
      'Secure team messaging',
    ],
  },
  compliance: {
    id: 'compliance',
    title: 'Quality & Compliance',
    description:
      'Stay audit-ready with purpose-built compliance tools. Generate CQC-ready reports covering safe, effective, caring, responsive, and well-led domains. Audit checklists guide supervisors through routine quality checks, with automatic reminders for overdue reviews. Incident and complaints workflows route issues to the right people, track resolution, and maintain evidence trails. Document management stores policies, procedures, and risk assessments with version control and scheduled review cycles. When the regulator arrives, you\'ll have everything organized and accessible in minutes, not hours.',
    features: [
      'CQC-ready domain reports',
      'Audit checklists with reminders',
      'Incident and complaints workflows',
      'Document version control',
      'Policy review cycles',
      'Evidence trails for inspections',
    ],
  },
  team: {
    id: 'team',
    title: 'Team Management',
    description:
      'Onboard new carers with structured workflows that track progress through induction stages. Manage training records, qualifications, and mandatory refreshers with automatic expiry alerts. Partial profile saves mean carers can complete onboarding in stages, with clear status tracking visible to managers. Availability calendars show who\'s free for shifts. Performance insights highlight top performers and flag areas needing support. Role-based access ensures carers see only what they need in the mobile app, while managers control full data and settings in the desktop CMS.',
    features: [
      'Structured onboarding workflows',
      'Training and qualifications tracking',
      'Partial profile saves with status',
      'Availability and shift preferences',
      'Performance insights dashboard',
      'Role-based access controls',
    ],
  },
  finance: {
    id: 'finance',
    title: 'Finance',
    description:
      'Automate timesheet generation from completed visits, with GPS-verified start and end times. Configure billable rules per client, service type, or time of day. Export payroll-ready data to your accounting software with a single click. Generate invoices based on actual service delivery, with line-item breakdowns for families and commissioners. Track unpaid invoices and payment status in real-time. Financial reporting gives agency owners visibility into revenue, outstanding payments, and cost per care hour, helping you make informed business decisions.',
    features: [
      'Automated timesheet generation',
      'Configurable billable rules',
      'Payroll-ready exports',
      'Client invoicing with breakdowns',
      'Payment tracking',
      'Financial reporting dashboard',
    ],
  },
  family: {
    id: 'family',
    title: 'Family Portal',
    description:
      'Keep families informed and connected with a secure portal. They see upcoming visit schedules, receive notifications when carers check in and out, and access permissioned care notes (you control what\'s visible). Families can message the care team, view care plan summaries, and download visit reports. Transparency builds trust and reduces the admin burden of phone call updates. The portal is mobile-friendly, so family members can stay connected wherever they are. All access is logged for audit purposes, and permissions are granular per family member.',
    features: [
      'Visit schedules and notifications',
      'Permissioned care note access',
      'Secure family messaging',
      'Care plan summaries',
      'Visit report downloads',
      'Granular access controls',
    ],
  },
  analytics: {
    id: 'analytics',
    title: 'Analytics & Reporting',
    description:
      'Turn care data into actionable insights. Pre-built dashboards track KPIs like visit punctuality, carer utilisation, medication adherence, and incident trends. Filter by service type, location, or time period. Export reports to CSV for deeper analysis in Excel or your BI tools. Scheduled reports can be emailed to stakeholders weekly or monthly. Whether you need a high-level executive summary or granular operational detail, the analytics module surfaces the metrics that matter to your agency.',
    features: [
      'Pre-built KPI dashboards',
      'Custom date range filtering',
      'CSV export for external analysis',
      'Scheduled email reports',
      'Visit and carer utilisation metrics',
      'Incident and compliance trends',
    ],
  },
  security: {
    id: 'security',
    title: 'Security & Privacy',
    description:
      'DomiClear is built on enterprise-grade infrastructure with UK/EU data residency. Row-level security (RLS) segregates agency data so no organisation can see another\'s records. Audit logs capture every data access and modification, providing a complete trail for GDPR and FOI requests. Role-based access ensures carers interact only via the mobile app, with no CMS access, while managers control settings and sensitive data. All data in transit is encrypted, and at-rest encryption protects databases. Regular third-party security audits and penetration testing validate our commitment to data protection.',
    features: [
      'UK/EU data residency',
      'Row-level security (RLS) segregation',
      'Comprehensive audit logs',
      'Role-based access (no carer CMS access)',
      'Encryption in transit and at rest',
      'Regular security audits',
    ],
  },
};

export const solutionsContent = {
  careManagers: {
    id: 'care-managers',
    title: 'For Care Managers',
    description:
      'Spend less time on admin and more time supporting your team. The desktop-first CMS gives you full control over rotas, care plans, and compliance tasks. Intelligent alerts flag issues before they escalate, and one-click reports give you the evidence you need for supervision and audits. Stay connected to carers via secure messaging, and see real-time visit updates so you always know what\'s happening on the ground.',
    benefits: [
      'Streamlined rota planning with conflict detection',
      'One-click CQC-ready reports',
      'Real-time visibility of visits in progress',
      'Secure team messaging',
      'Automated compliance reminders',
    ],
  },
  owners: {
    id: 'owners',
    title: 'For Agency Owners',
    description:
      'Run your agency with confidence and clarity. Track operational performance, financial KPIs, and compliance status from a single dashboard. Make data-driven decisions about capacity, recruitment, and service expansion. RLS-backed data segregation protects client confidentiality and meets regulatory standards. Scale your business without scaling admin overhead—DomiClear grows with you.',
    benefits: [
      'Executive dashboards for performance and finance',
      'Data-driven capacity planning',
      'Secure, auditable platform',
      'Scalable infrastructure',
      'Reduced admin overhead',
    ],
  },
  families: {
    id: 'families',
    title: 'For Families',
    description:
      'Stay connected to your loved one\'s care with transparency and peace of mind. See visit schedules, receive notifications when carers arrive and depart, and read care notes (subject to permissions set by the agency). Message the care team securely, and download visit reports for your records. DomiClear helps families feel informed, involved, and reassured.',
    benefits: [
      'Visit schedules and real-time notifications',
      'Secure access to permissioned care notes',
      'Direct messaging with care team',
      'Downloadable visit reports',
      'Mobile-friendly portal',
    ],
  },
};

export const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    description: 'For small agencies getting started',
    priceLabel: 'Up to 25 service users',
    price: 39,
    priceUnit: '/mo',
    billingPeriod: 'Billed monthly',
    features: [
      'Carer mobile app (iOS & Android)',
      'Rota planning and visit scheduling',
      'Basic care planning forms',
      'EMAR logging',
      'Family portal (1 login per client)',
      'Email support',
    ],
    cta: 'Book a demo',
  },
  {
    name: 'Professional',
    description: 'For established agencies scaling up',
    priceLabel: 'Up to 100 service users',
    price: 89,
    priceUnit: '/mo',
    billingPeriod: 'Billed monthly',
    features: [
      'Everything in Starter, plus:',
      'Custom form builder with conditional logic',
      'Advanced scheduling with conflict detection',
      'Audit checklists and compliance workflows',
      'Training and qualifications tracking',
      'Financial reporting and invoicing',
      'Priority support',
    ],
    cta: 'Book a demo',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    description: 'For multi-site agencies',
    priceLabel: '100+ service users',
    price: 199,
    priceUnit: '/mo',
    billingPeriod: 'Billed monthly',
    features: [
      'Everything in Professional, plus:',
      'Multi-site management',
      'Custom integrations (API access)',
      'Dedicated account manager',
      'Onboarding and training sessions',
      'SLA with 4-hour response time',
      'Annual security and compliance review',
    ],
    cta: 'Contact sales',
  },
];

export const featureOverviewContent = {
  stats: [
    { metric: '42%', label: 'Reduction in late/missed visits' },
    { metric: '3.5 hrs', label: 'Admin time saved per manager/week' },
    { metric: '98%', label: 'Medication adherence rate' },
  ],
  features: [
    {
      icon: 'Calendar',
      title: 'Intelligent Scheduling',
      description: 'Staff clock in and out with GPS location verification for accurate attendance tracking. Automatically generate timesheets with verified start and end times, eliminating manual entry errors. Real-time visibility of who's on shift gives managers instant oversight of your care team.',
    },
    {
      icon: 'Smartphone',
      title: 'Offline-First Carer App',
      description: 'Carers complete tasks, log EMAR with photos, and capture notes without signal. Everything syncs automatically when connectivity returns—never miss a visit due to poor coverage.',
    },
    {
      icon: 'CheckCircle',
      title: 'CQC-Ready Compliance',
      description: 'Generate domain reports, manage audit checklists, and track incidents with full evidence trails. Stay inspection-ready with purpose-built tools for UK care regulation.',
    },
  ],
};

export const comprehensiveFeaturesContent = {
  title: 'Comprehensive Feature Set of DomiClear',
  features: [
    {
      icon: 'Calendar',
      title: 'Intelligent Scheduling',
      description: 'Rota planning with conflict alerts, travel time calculations, and shift swap requests to reduce missed visits.',
    },
    {
      icon: 'Users',
      title: 'Team Management',
      description: 'Onboarding workflows, training tracking, availability calendars, and performance insights for your care teams.',
    },
  ],
  cards: [
    {
      title: 'Dashboard Overview',
      description: 'Real-time visibility of visits, carers, and agency performance',
      image: '/demo-media/demo-dashboard-overview.png',
    },
    {
      title: 'Care Planning',
      description: 'Visual form builder with conditional logic and version history',
      image: '/demo-media/demo-patient-profile-care-planning.png',
    },
  ],
};

export const faqItems = [
  {
    question: 'Does DomiClear work offline?',
    answer:
      'Yes. The carer mobile app is offline-first, so carers can complete tasks, log medications, and capture notes without signal. Data syncs to the platform when connectivity returns.',
  },
  {
    question: 'Is DomiClear CQC-compliant?',
    answer:
      'DomiClear provides CQC-ready reports, audit trails, and documentation management to support your compliance. Ultimate responsibility for meeting CQC standards rests with your agency, but our platform makes evidence gathering straightforward.',
  },
  {
    question: 'Where is our data stored?',
    answer:
      'All data is stored in UK/EU data centres with row-level security segregation. We comply with UK GDPR and maintain ISO 27001-aligned security practices.',
  },
  {
    question: 'Can carers access the desktop CMS?',
    answer:
      'No. Carers use the mobile app only. The desktop CMS is reserved for managers, coordinators, and administrators, ensuring role-based access and data protection.',
  },
  {
    question: 'How long does onboarding take?',
    answer:
      'Typical onboarding takes 2–4 weeks, including data migration, staff training, and customisation of care plan templates. Enterprise clients receive dedicated onboarding support.',
  },
  {
    question: 'Do you integrate with payroll or accounting software?',
    answer:
      'Yes. We provide CSV exports compatible with most payroll systems. Enterprise plans include API access for custom integrations with your accounting software.',
  },
];
