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
      { label: 'Medication & eMAR', href: '/platform#emar' },
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
    label: 'Tutorials',
    href: '/tutorials',
    children: [
      { label: 'Tutorial Videos', href: '/tutorials' },
      { label: 'Book a Demo', href: '/book-demo' },
    ],
  },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'About DomiClear', href: '/about' },
      { label: 'Credentials', href: '/credentials' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

export const heroContent = {
  eyebrow: 'DOMICILIARY CARE MANAGEMENT SOFTWARE',
  title: 'From the office to the doorstep, keep care connected.',
  subtitle: `DomiClear brings visit scheduling, person-centred care planning, medication management (eMAR), incident reporting and quality oversight together in one platform built for UK domiciliary care providers.

Give carers the information they need to deliver care confidently, while managers stay informed, organised and in control of their service.`,
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
    "id": "care-planning",
    "title": "Person-centred care planning",
    "description": "Record assessed needs and preferences, connect outcomes with goals and supporting care tasks, then submit revisions for independent manager review. Previously approved content remains active until a replacement is approved. Managers choose which approved tasks are relevant to a scheduled visit.",
    "features": [
      "Assessed needs, outcomes and linked goals",
      "Supporting care tasks selected for visits",
      "Independent approval of care-plan revisions",
      "Relevant specialist planning and risk records"
    ]
  },
  formTemplates: {
    "id": "form-templates",
    "title": "Forms & assessments",
    "description": "Create and reuse forms for care assessments, service reviews and staff records. The form builder supports configurable fields, selected conditional rules and validation. Available forms and permissions depend on the organisation's setup.",
    "features": [
      "Reusable assessment and review templates",
      "Form fields and supported conditional rules",
      "Saved responses and signature workflows",
      "Review and permission controls"
    ]
  },
  scheduling: {
    "id": "scheduling",
    "title": "Scheduling & Improve Rota",
    "description": "Review visits, carer allocation and staff availability in a shared rota. Improve Rota can identify travel and timing gaps and display possible changes beside the current schedule for a coordinator to assess. Changes are not silently applied.",
    "features": [
      "Visual daily visits and staff allocation",
      "Travel, gap and scheduling issue review",
      "Compare current and proposed rota arrangements",
      "Availability, absence and care constraints"
    ]
  },
  carerApp: {
    "id": "carer-app",
    "title": "Carer mobile app",
    "description": "Carers can view assigned visits, record attendance, work through selected tasks and capture visit notes. Previously cached visit information may remain available without a signal, but medication administration must be recorded online.",
    "features": [
      "Assigned visits and relevant care tasks",
      "Visit check-in, check-out and notes",
      "Cached visit information for limited offline reading",
      "Online-only medication administration records"
    ]
  },
  emar: {
    "id": "emar",
    "title": "Medication management & eMAR",
    "description": "Manage an organisation medication library and person-specific schedules, including as-needed (PRN) medicines. During assigned visits, carers record actual administration outcomes while connected; managers can review MAR history. A scheduled dose is not proof it was administered.",
    "features": [
      "Medication library and person-specific schedules",
      "Scheduled and PRN administration details",
      "Online recording with performer and outcome",
      "MAR history, filters and exports"
    ]
  },
  compliance: {
    "id": "compliance",
    "title": "Incidents & quality oversight",
    "description": "Capture incidents, connect relevant follow-up actions and record manager investigations and decisions. CQC-aligned internal measures and saved self-assessments can support quality review. These are not official CQC ratings or evidence of regulatory approval.",
    "features": [
      "Incident records and relevant follow-up actions",
      "Manager review and recorded sign-off",
      "Internal CQC-aligned indicative measures",
      "Self-assessments and supporting evidence"
    ]
  },
  team: {
    "id": "team",
    "title": "Team management",
    "description": "Manage staff profiles, invitations, availability and training or qualification records. Managers can review the information needed to allocate care and keep staff details organised, with role-based access to relevant records.",
    "features": [
      "Staff profiles and onboarding invitations",
      "Training and qualifications records",
      "Availability, absences and shift preferences",
      "Role-based access to staff records"
    ]
  },
  finance: {
    "id": "finance",
    "title": "Finance & payroll review",
    "description": "Review visit-linked attendance, timesheet and payroll information alongside invoices and financial reports. Export available records for further checks. Payroll figures require management review and are not a substitute for statutory payroll processing.",
    "features": [
      "Attendance and timesheet review",
      "Payroll cost reporting and export",
      "Invoice records and payment status",
      "Manager review of financial figures"
    ]
  },
  family: {
    "id": "family",
    "title": "Family portal",
    "description": "Where family access is configured and authorised, linked relatives can use a dedicated portal to view permitted care and visit information. Organisations control which information a family account may access; availability depends on permissions.",
    "features": [
      "Linked family account access",
      "Permissioned visit and care information",
      "Care updates within the allowed scope",
      "Organisation-controlled family permissions"
    ]
  },
  analytics: {
    "id": "analytics",
    "title": "Reports & analytics",
    "description": "Explore recorded activity across visits, workforce, medication, incidents and finance. Use available date filters, saved reports and exports to support internal management reviews. Reports reflect the data entered and are not automatic compliance verdicts.",
    "features": [
      "Care delivery and attendance dashboards",
      "Medication, incident and workforce views",
      "Date-filtered reports and CSV exports",
      "Saved reports for internal follow-up"
    ]
  },
  security: {
    "id": "security",
    "title": "Security, access & accountability",
    "description": "DomiClear uses authenticated roles and database access policies to restrict records by organisation and permitted user. Supported workflows retain audit and review information. Security assessment and certification status should be checked on the credentials page; no blanket assurance is implied.",
    "features": [
      "Role-based access to care and staff records",
      "Organisation-scoped data access controls",
      "Recorded audit and approval history",
      "Published credentials and assessment scope"
    ]
  },
};

export const solutionsContent = {
  careManagers: {
    "id": "care-managers",
    "title": "For Care Managers",
    "description": "Plan visits, check staff availability and keep care-plan tasks connected to day-to-day work. Managers can review incidents, follow relevant actions and use CQC-aligned indicative self-assessments for internal quality oversight. These are working tools, not automatic clinical or regulatory decisions.",
    "benefits": [
      "Review visits, allocations and rota proposals before changing them",
      "Select appropriate approved care-plan tasks for scheduled visits",
      "Record incident investigations and follow-up actions",
      "Review internal quality measures and saved self-assessments",
      "Use reports and audit history to support team discussions"
    ]
  },
  owners: {
    "id": "owners",
    "title": "For Agency Owners",
    "description": "Bring service delivery, workforce, invoice and payroll reporting into one management view. Review recorded activity and outstanding quality actions when planning staffing, budgets and service development. The tools support management decisions; they do not promise savings or replace statutory payroll and regulatory checks.",
    "benefits": [
      "Monitor attendance, care delivery and operational reporting",
      "Review invoices, payroll-cost information and exports",
      "Explore workforce availability and staffing records",
      "Track internal quality findings and follow-up decisions",
      "Keep access to sensitive records role- and organisation-scoped"
    ]
  },
  families: {
    "id": "families",
    "title": "For Families",
    "description": "When a care provider invites and authorises a family member, DomiClear's family portal can show permitted information about their relative's care. The provider controls which visits, notes and plan details are shared, and can change or revoke access. Not every family account sees the same information.",
    "benefits": [
      "Secure access linked to the correct relative",
      "View visits and updates where sharing is permitted",
      "Read care notes only when the provider allows access",
      "See care-plan information within assigned permissions",
      "Organisation-controlled sharing and access revocation"
    ]
  },
};

export const pricingTiers: PricingTier[] = [
  {
    name: 'Launch',
    description: 'For small agencies getting started — lower cost of entry',
    priceLabel: 'Up to 10 clients',
    price: 59,
    priceUnit: '/mo',
    billingPeriod: 'Billed monthly',
    features: ['Unlimited staff & carer accounts'],
    cta: 'Start free trial',
  },
  {
    name: 'Starter',
    description: 'For growing agencies',
    priceLabel: 'Up to 25 clients',
    price: 99,
    priceUnit: '/mo',
    billingPeriod: 'Billed monthly',
    features: ['Unlimited staff & carer accounts'],
    cta: 'Start free trial',
  },
  {
    name: 'Growth',
    description: 'For established agencies scaling up',
    priceLabel: 'Up to 60 clients',
    price: 149,
    priceUnit: '/mo',
    billingPeriod: 'Billed monthly',
    features: ['Unlimited staff & carer accounts'],
    cta: 'Start free trial',
    highlighted: true,
  },
  {
    name: 'Professional',
    description: 'For larger agencies',
    priceLabel: 'Up to 100 clients',
    price: 249,
    priceUnit: '/mo',
    billingPeriod: 'Billed monthly',
    features: ['Unlimited staff & carer accounts'],
    cta: 'Start free trial',
  },
  {
    name: 'Enterprise',
    description: 'For multi-site and large agencies',
    priceLabel: '100+ clients',
    price: 299,
    priceUnit: '/mo',
    billingPeriod: 'Billed monthly',
    features: ['Unlimited staff & carer accounts'],
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
      'The carer app can display previously cached information offline, but medication administration must be recorded with an internet connection. Carers need to reconnect before recording a dose.',
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
