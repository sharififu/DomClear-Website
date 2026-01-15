# DomiClear Marketing Website

## Project Overview

Production-ready marketing website for DomiClear, a homecare management platform for UK domiciliary care agencies. Built with React, TypeScript, and Tailwind CSS, following the design.json token system.

## Design System Mapping

All components map to the design.json foundations and component specifications:

### Color Palette
- **Primary Blue**: `#1a86f0` (palette.primary.600)
- **Primary Light**: `#2ea0ff` (palette.primary.500)
- **Accent Teal**: `#0ea08a` (palette.accent_teal.600)
- **Purple**: `#7c6df0` (palette.accent_purple.500)
- **Neutrals**: White (#FFFFFF), Gray-50 (#FAFBFC), Gray-600 (#4B5563), Navy (#0F172A)
- **Gradients**: Linear gradients combining primary and purple for hero sections

### Typography
- **Headings**: Poppins (font-weight: 600-700)
- **Body**: Inter (font-weight: 400-600)
- **Scale**:
  - H1: 36px (mobile) → 56px (desktop)
  - H2: 28px (mobile) → 40px (desktop)
  - H3: 22px (mobile) → 28px (desktop)
  - Body: 15px (mobile) → 16px (desktop)
  - Lead: 16px (mobile) → 20px (desktop)

### Spacing
- Using 8px base grid: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px
- Container max-width: 1200px
- Section padding: py-20 (80px vertical)

### Border Radius
- Cards: 16px (lg) to 24px (xl)
- Buttons: 999px (pill)
- Inputs: 12px (md)

### Shadows
- Cards: `0 6px 20px rgba(10, 20, 40, 0.06)`
- Hover: `0 10px 30px rgba(10, 20, 40, 0.10)`
- Focus rings: `0 0 0 4px rgba(0, 150, 255, 0.20)`

## Site Structure

### Pages Implemented

1. **Home** (`/`)
   - Hero with gradient background
   - Value pillars (3 cards)
   - Feature highlights (6 cards)
   - Outcomes stats (4 metrics)
   - Testimonials (3 cards)
   - CTA section

2. **Platform** (`/platform`)
   - Feature detail sections with anchors:
     - #care-planning
     - #scheduling
     - #carer-app
     - #compliance
     - #team
     - #finance
     - #family
     - #analytics
     - #security

3. **Pricing** (`/pricing`)
   - 3 pricing tiers (Starter, Professional, Enterprise)
   - Inclusions list
   - FAQ accordion

4. **Demo** (`/demo`)
   - Contact form with validation
   - What to expect sidebar
   - Thank you state
   - reCAPTCHA placeholder

5. **Placeholder Pages**
   - Solutions (for care managers, owners, families)
   - Resources (blog, case studies, publications, events)
   - About (mission, team, careers, press)
   - Legal (privacy, terms, DPA, cookies)

## Component Architecture

### Core Components

- **Navbar**: Fixed header with dropdown menus, transparent over hero, solid on scroll
- **Footer**: Multi-column footer with links and social icons
- **Hero**: Full-height gradient hero with eyebrow, H1, subtitle, dual CTAs
- **Button**: 4 variants (primary, accent, secondary, ghost), 3 sizes
- **FeatureCard**: Icon, title, description with hover lift effect
- **TestimonialCard**: Star rating, quote, avatar, name/role
- **StatCard**: Icon, metric, label
- **PricingCard**: Tier details with feature list and CTA
- **FAQAccordion**: Expandable Q&A items

### Data Structure

All content centralized in `src/data/content.ts`:
- Navigation structure
- Hero content
- Value pillars
- Feature highlights
- Outcomes stats
- Testimonials
- Platform feature details
- Solutions content
- Pricing tiers
- FAQ items

## SEO Implementation

### Meta Tags
- Title, description, keywords optimized for UK homecare market
- Open Graph tags for social sharing
- Twitter Card tags
- Canonical URLs

### Structured Data
- Organization schema with contact info
- Product schema ready (can be added per feature)
- FAQ schema ready (can be added to pricing page)
- BreadcrumbList schema ready

### Target Keywords
- "homecare management software UK"
- "domiciliary care software"
- "care agency scheduling software"
- "CQC compliance software"
- "EMAR for homecare"
- "care management system"

### Files
- `robots.txt`: Allows all crawlers, references sitemap
- `sitemap.xml`: All major pages with priority and changefreq
- UK English locale: `lang="en-GB"`

## Content Strategy

### Messaging Pillars
1. **Operational Clarity**: Unified platform for rotas, visits, tasks, EMAR
2. **Quality & Compliance**: CQC-ready reports, audit trails, evidence
3. **Empowered Teams**: Modern carer app + desktop CMS for managers
4. **Family Connection**: Secure portal for visit updates and transparency

### Differentiators Highlighted
- Configurable form builder with conditional logic
- Partial profile saves with onboarding status tracking
- Desktop-first CMS (carers use mobile app only)
- Role-based access with RLS-backed data segregation
- Offline-first carer app
- UK/EU data residency

### Tone
- Credible and outcomes-led
- Concise and skimmable
- UK spelling and conventions
- Technical accuracy without jargon
- Empathetic to care industry challenges

## Accessibility

- WCAG AA contrast ratios throughout
- Keyboard navigable menus and accordions
- Focus states on all interactive elements
- Semantic HTML structure
- Alt text placeholders for images
- Touch target minimum 44px (buttons)

## Responsive Design

- Desktop-first layouts (max-width: 1200px)
- Responsive breakpoints:
  - Mobile: 0-767px
  - Tablet: 768-1199px
  - Desktop: 1200px+
- Grid layouts: 1 column (mobile) → 2-3 columns (tablet) → 3-4 columns (desktop)
- Typography scales fluidly with clamp()
- Navigation converts to hamburger menu on mobile

## Next Steps / Future Enhancements

### Content
- Replace illustration placeholders with actual screenshots/mockups
- Add customer logos to homepage (LogoStrip component ready)
- Write blog posts, case studies, and resources
- Complete About page with team photos and bios
- Add product demo video to homepage

### Features
- Implement actual form submission to backend/CRM
- Add reCAPTCHA integration to demo form
- Cookie consent banner (GDPR compliance)
- Add Solutions page with detailed use cases
- Create Resources section with blog CMS
- Add live chat widget

### SEO
- Add FAQ schema to pricing page
- Add Product schema to platform features
- Create location-specific landing pages (regions in UK)
- Build out blog for content marketing
- Add case study pages with review schema

### Technical
- Add analytics (GA4, Mixpanel, or similar)
- Implement A/B testing framework
- Add page transition animations
- Lazy load images and components
- Optimize web vitals (LCP, CLS, FID)

## Asset Requirements

Replace placeholders with production assets:
1. Logo SVG (navbar and footer)
2. Feature illustration for each platform section (9 images)
3. Customer testimonial photos (3 images)
4. Customer logo strip (6-10 logos)
5. Favicon and app icons
6. Social sharing image (OG image)
7. Demo video or product tour
8. Team photos for About page

## Component-to-Design.json Mapping

| Component | Design Token | Implementation |
|-----------|--------------|----------------|
| Button | Button.base, Button.variants | Fully mapped with 4 variants, 3 sizes |
| Card | Card.base, Card.variants | White bg, 16px radius, elevation shadow |
| Navbar | Navbar.height_px, Navbar.style | 72px height, transparent→solid on scroll |
| SectionHeader | SectionHeader.eyebrow, title, description | Eyebrow badge, H2 title, lead description |
| FeatureItem | FeatureItem.icon_placement, style | Icon top, card style, hover lift |
| Testimonial | Testimonial.avatar_shape, content_style | Circle avatar, quote in card, 5-star rating |
| StatCluster | StatCluster.metric_style | Big number (4xl), label below, icon |
| Form | Form.style, Form.elements | 48px inputs, rounded, focus shadow |
| FAQAccordion | Accordion pattern | Expand/collapse with chevron rotation |
| Footer | Multi-column layout | 5 columns on desktop, social icons |

## Performance Checklist

- [x] Semantic HTML structure
- [x] CSS imported via Tailwind
- [x] Google Fonts loaded via CDN
- [x] Icons from lucide-react (tree-shakeable)
- [ ] Image optimization (pending actual images)
- [ ] Code splitting by route (can add with React.lazy)
- [ ] Analytics integration
- [ ] Error boundary implementation

## Deployment Checklist

- [x] Production-ready copy (UK spelling, outcomes-led)
- [x] SEO meta tags and structured data
- [x] Sitemap and robots.txt
- [x] Responsive across breakpoints
- [x] Accessible (keyboard nav, contrast, focus states)
- [ ] Environment variables for API endpoints
- [ ] Form submission integration
- [ ] reCAPTCHA keys
- [ ] Analytics tracking IDs
- [ ] Error monitoring (Sentry or similar)

## Brand Guidelines Summary

**Do:**
- Use credible, outcomes-led messaging
- Highlight CQC compliance and UK data residency
- Showcase operational benefits (time saved, errors reduced)
- Keep copy concise and skimmable
- Use UK spelling and date formats (DD-MM-YYYY)

**Don't:**
- Use jargon without context
- Make generic "software" claims
- Copy competitor messaging
- Use purple/indigo unless requested
- Neglect mobile responsiveness
- Skip CTA on any major section

## Contact & Support

**Demo Requests**: Routed to `/demo` with qualifying form
**Sales Enquiries**: hello@homecaremana.co.uk, 0800 123 4567
**Support**: Monday–Friday, 9:00–17:00 GMT

---

Built with React 18, TypeScript 5, Vite 5, Tailwind CSS 3, and Lucide React icons.
