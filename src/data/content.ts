import { NavItem, Feature, Testimonial, Stat, PricingTier } from '../types';

export const navigation: NavItem[] = [
  {
    label: 'Platform',
    href: '/platform',
    children: [
      { label: 'Care Planning', href: '/platform#care-planning' },
      { label: 'Form Templates', href: '/platform#form-templates' },
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
  eyebrow: 'DOMICILIARY CARE SOFTWARE',
  title: 'Modern Domiciliary care software your team will actually use',
  subtitle: `Manage rotas, care plans, eMAR, and records in one intuitive platform.
Built for carers, managers, and coordinators — with a focus on simplicity, clarity, and everyday efficiency.`,
  primaryCta: 'Start free trial',
  secondaryCta: 'Book a demo',
};

/** Trust band directly under hero — factual positioning, no compliance guarantees */
export const homepageTrustContent = {
  title: 'One platform for UK domiciliary care operations',
  subtitle:
    'DomiClear brings together home care scheduling, digital care plans, medication (eMAR), and auditable records so your agency can work from a single source of truth.',
  bullets: [
    'Designed around UK domiciliary care workflows',
    'Transparent, usage-based pricing — a lower cost of entry for agencies watching costs',
    'Care planning software features alongside rotas and visits',
    'eMAR and visit notes structured for clear handovers',
    'Modern interface — less training, fewer mistakes',
  ],
};

export const homepageWhySwitchContent = {
  title: 'Outgrown paper, spreadsheets, and patchwork tools?',
  subtitle:
    'If your team is bouncing between files, group chats, and legacy systems, you are not alone. DomiClear replaces fragmented admin with one home care management software stack — a practical option if you want strong day-to-day functionality without the cost or complexity of oversized platforms.',
  items: [
    {
      pain: 'Paper folders and printouts that never quite match the rota',
      outcome: 'Live schedules, tasks, and records everyone can see in real time.',
    },
    {
      pain: 'Spreadsheets that break when cover changes',
      outcome: 'Home care scheduling software with conflict checks and a clear daily view.',
    },
    {
      pain: 'WhatsApp threads and ad hoc texts for handovers',
      outcome: 'Structured notes, eMAR, and care plan context in the app — not lost in chat.',
    },
    {
      pain: 'Older care systems that feel slow and dated',
      outcome: 'A fast, coherent experience from office to doorstep.',
    },
  ],
};

export const valuePillars: Feature[] = [
  {
    icon: 'Activity',
    title: 'Operational clarity',
    description: 'Manage rotas, visits, tasks, and eMAR in one unified platform that keeps everyone aligned.',
  },
  {
    icon: 'Shield',
    title: 'Quality & records',
    description:
      'Structured records, audit trails, and exports that help you evidence how care is delivered — without promising inspection outcomes.',
  },
  {
    icon: 'Users',
    title: 'Empowered care teams',
    description: 'Modern carer app meets desktop-first CMS for managers, with role-based access that works.',
  },
];

export const featureHighlights: Feature[] = [
  {
    icon: 'Calendar',
    title: 'Home care scheduling & rotas',
    description:
      'Plan visits with conflict alerts, travel context, and GPS-backed attendance so coordinators see what is happening today — not yesterday\'s spreadsheet.',
  },
  {
    icon: 'FileText',
    title: 'Care planning software & forms',
    description:
      'Digital care plans and configurable form templates with versioning — keep assessments, reviews, and risk documentation consistent.',
  },
  {
    icon: 'Smartphone',
    title: 'eMAR software in the carer app',
    description:
      'Medication rounds, photos, and timestamps on the home care app, with offline support where signal drops — syncs when carers are back online.',
  },
  {
    icon: 'CheckCircle',
    title: 'Records, incidents, and governance',
    description:
      'Incident workflows, document control, and reporting views that help leadership and managers find answers quickly.',
  },
  {
    icon: 'Users',
    title: 'Teams, access, and visibility',
    description:
      'Onboarding, qualifications, availability, and role-based access so carers, coordinators, and owners each see what they need.',
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
  { metric: 'Up to 42%', label: 'less admin time', icon: 'TrendingDown' },
  { metric: '3+ hrs', label: 'Save 3+ hours per manager per week', icon: 'Clock' },
  { metric: '98%+', label: 'visit & care record accuracy', icon: 'TrendingUp' },
  { metric: 'One', label: 'system for office & doorstep', icon: 'MapPin' },
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
      'We were drowning in paperwork. Now evidence for supervision and audits is in one place, and the team spends less time chasing documents.',
    rating: 5,
    verified: true,
  },
  {
    name: 'Eleanor Davies',
    role: 'Operations Manager',
    organisation: 'Heritage Home Support',
    content:
      'The form builder alone was worth it. We built custom assessment forms in days, not weeks, and incident logging is finally streamlined.',
    rating: 5,
    verified: true,
  },
];

export const platformFeatures = {
  carePlanning: {
    id: 'care-planning',
    title: 'Care Planning',
    description:
      'Comprehensive patient care plans capture everything carers need to deliver person-centred care. Track medical conditions, allergies, health tags, and emergency contacts. Configure meal schedules, dietary requirements, and personal care routines. Set up monitoring alerts for vital signs with threshold notifications. Document risk assessments, MUST and Waterlow scores, and mental capacity evaluations. Manage stoma care, catheter care, and positioning schedules. Each care plan is specific to the individual, with version tracking for accountability.',
    features: [
      'Medical conditions and allergies tracking',
      'Emergency contacts and next of kin',
      'Meal schedules and dietary requirements',
      'Personal care and bathing plans',
      'Monitoring alerts with thresholds',
      'Risk and capacity assessments',
    ],
  },
  formTemplates: {
    id: 'form-templates',
    title: 'Form Templates',
    description:
      'Create reusable form templates for assessments, reviews, and compliance documentation. The visual drag-and-drop builder lets you design Risk Assessment forms, Service Review forms, Mental Capacity assessments, Staff Supervision forms, and more. Add conditional logic to show or hide fields based on answers. Apply field validations to ensure data quality. Templates can be organisation-wide or global, and every template tracks version numbers for audit purposes.',
    features: [
      'Visual drag-and-drop form builder',
      'Pre-built assessment templates',
      'Conditional logic and field rules',
      'Field-level validations',
      'Version tracking with audit trails',
      'Risk, Review, and Supervision forms',
    ],
  },
  scheduling: {
    id: 'scheduling',
    title: 'Scheduling & Rotas',
    description:
      'Plan rotas with confidence using intelligent conflict detection. The system alerts you to double-bookings, missing qualifications, or travel-time issues before you publish. Travel time between visits is calculated automatically using Google Maps integration, and visit confirmations capture GPS location and timestamps. Integrated with the carer app, schedule changes sync via real-time notifications so your team stays informed. Reduce administrative overhead, improve punctuality, and give managers a real-time view of service delivery across the agency.',
    features: [
      'Visual rota planning calendar',
      'Real-time conflict alerts',
      'Automatic travel time calculations',
      'GPS visit confirmation',
      'Absence request management',
      'Real-time schedule notifications',
    ],
  },
  carerApp: {
    id: 'carer-app',
    title: 'Carer Mobile App',
    description:
      'Designed for carers on the move, the mobile app supports offline capability so poor signal doesn\'t stop care delivery. Task lists guide carers through each visit step-by-step. eMAR logging records medication administration with photos and timestamps. Notes, attachments, and incident forms capture observations in the moment. GPS verification confirms visit location and time, providing evidence for billing and compliance. Secure in-app messaging keeps carers connected to the office without sharing personal phone numbers. All data syncs to the central platform when connectivity returns, ensuring managers have up-to-date visibility.',
    features: [
      'Offline-capable attendance tracking',
      'eMAR with photo evidence',
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
      'Stay audit-ready with purpose-built compliance tools. Generate CQC-ready reports covering safe, effective, caring, responsive, and well-led domains. The audit dashboard helps supervisors track quality metrics and identify areas needing attention. Incident workflows route issues to the right people, track resolution, and maintain evidence trails. Document management stores policies, procedures, and risk assessments with version control and scheduled review cycles. When the regulator arrives, you\'ll have everything organized and accessible in minutes, not hours.',
    features: [
      'CQC-ready domain reports',
      'Audit dashboard and tracking',
      'Incident reporting workflows',
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
      'Keep families informed and connected with a secure portal. They see upcoming visit schedules, access permissioned care notes (you control what\'s visible), and view care plan summaries. Families can message the care team securely and view visit reports in the portal. Transparency builds trust and reduces the admin burden of phone call updates. The portal is mobile-friendly, so family members can stay connected wherever they are. All access is logged for audit purposes, and permissions are granular per family member.',
    features: [
      'Visit schedules visible in portal',
      'Permissioned care note access',
      'Secure family messaging',
      'Care plan summaries',
      'View visit reports in portal',
      'Granular access controls',
    ],
  },
  analytics: {
    id: 'analytics',
    title: 'Analytics & Reporting',
    description:
      'Turn care data into actionable insights. Pre-built dashboards track KPIs like visit punctuality, carer utilisation, medication adherence, and incident trends. Filter by service type, location, or time period. Export reports to CSV for deeper analysis in Excel or your BI tools. Schedule reports to be generated on a recurring basis. Whether you need a high-level executive summary or granular operational detail, the analytics module surfaces the metrics that matter to your agency.',
    features: [
      'Pre-built KPI dashboards',
      'Custom date range filtering',
      'CSV export for external analysis',
      'Report scheduling',
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
      'Faster access to reports for supervision and audits',
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
      'Stay connected to your loved one\'s care with transparency and peace of mind. See visit schedules, read care notes (subject to permissions set by the agency), and view care plan summaries. Message the care team securely, and view visit reports in the portal. DomiClear helps families feel informed, involved, and reassured.',
    benefits: [
      'Visit schedules visible in portal',
      'Secure access to permissioned care notes',
      'Direct messaging with care team',
      'View visit reports in portal',
      'Mobile-friendly portal',
    ],
  },
};

export const pricingTiers: PricingTier[] = [
  {
    name: 'Launch',
    description: 'For small agencies getting started — lower cost of entry',
    priceLabel: 'Up to 10 service users',
    price: 59,
    priceUnit: '/mo',
    billingPeriod: 'Billed monthly',
    features: ['Up to 10 service users'],
    cta: 'Start free trial',
  },
  {
    name: 'Starter',
    description: 'For growing agencies',
    priceLabel: 'Up to 25 service users',
    price: 99,
    priceUnit: '/mo',
    billingPeriod: 'Billed monthly',
    features: ['Up to 25 service users'],
    cta: 'Start free trial',
  },
  {
    name: 'Growth',
    description: 'For established agencies scaling up',
    priceLabel: 'Up to 60 service users',
    price: 149,
    priceUnit: '/mo',
    billingPeriod: 'Billed monthly',
    features: ['Up to 60 service users'],
    cta: 'Start free trial',
    highlighted: true,
  },
  {
    name: 'Professional',
    description: 'For larger agencies',
    priceLabel: 'Up to 100 service users',
    price: 249,
    priceUnit: '/mo',
    billingPeriod: 'Billed monthly',
    features: ['Up to 100 service users'],
    cta: 'Start free trial',
  },
  {
    name: 'Enterprise',
    description: 'For multi-site and large agencies',
    priceLabel: '100+ service users',
    price: 299,
    priceUnit: '/mo',
    billingPeriod: 'Billed monthly',
    features: ['100+ service users'],
    cta: 'Contact sales',
  },
];

export const featureOverviewContent = {
  stats: [
    { metric: 'Up to 42%', label: 'less admin time' },
    { metric: '3+ hrs', label: 'Save 3+ hours per manager per week' },
    { metric: '98%+', label: 'visit & care record accuracy' },
  ],
  features: [
    {
      icon: 'Calendar',
      title: 'Home care scheduling software',
      description:
        'Build rotas, spot clashes early, and give coordinators a live view of who is where. GPS-backed clock-in ties visits to real attendance so timesheets and billing start from facts, not guesswork.',
    },
    {
      icon: 'Smartphone',
      title: 'Home care app with eMAR',
      description:
        'Carers run tasks, log eMAR with photos, and capture notes on the mobile app — including offline when signal drops. Everything syncs when they are back online.',
    },
    {
      icon: 'CheckCircle',
      title: 'Care records & governance',
      description:
        'Keep incidents, documents, and reporting views in one domiciliary care software stack so managers can answer questions quickly and show how care is delivered.',
    },
  ],
};

export const comprehensiveFeaturesContent = {
  title: 'Domiciliary care software that covers the full visit lifecycle',
  features: [
    {
      icon: 'Calendar',
      title: 'Intelligent Scheduling',
      description: 'Rota planning with conflict alerts, travel time calculations, and GPS visit confirmation to reduce missed visits.',
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
      description: 'Comprehensive patient care plans with medical info, assessments, and monitoring',
      image: '/demo-media/demo-patient-profile-care-planning.png',
    },
  ],
};

export const faqItems = [
  {
    question: 'How does DomiClear pricing work?',
    answer:
      'Plans are usage-based: you pay per active service user each month, with unlimited staff on every tier. That keeps costs predictable for growing agencies. You can start with a 14-day free trial (no card required), see full numbers on the pricing page, or book a demo if you want a walkthrough first.',
  },
  {
    question: 'Does DomiClear work offline?',
    answer:
      'Yes. The carer mobile app supports offline capability for attendance tracking, medication logging, and note capture. Data syncs to the platform when connectivity returns.',
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
      'Typical onboarding takes 2–4 weeks, including data migration, staff training, and customisation of form templates. Enterprise clients receive dedicated onboarding support.',
  },
  {
    question: 'Do you integrate with payroll or accounting software?',
    answer:
      'Yes. We provide CSV exports compatible with most payroll systems. Enterprise plans include API access for custom integrations with your accounting software.',
  },
];
