# Website Audit: Sales Readiness & Bug Report

**Audit date:** February 9, 2025  
**Scope:** DomiClear marketing site (localhost:5173 / production).  
**Goal:** Ensure the site is ready to capture sales and users; document recommendations and fix bugs/errors.

---

## Executive summary

The site has a clear value proposition, strong CTAs (Start free trial, Book a demo), and good conversion paths. Several **bugs** and **UX/content issues** were identified and are fixed or listed below. The Chrome DevTools MCP could not connect (browser instance conflict); this audit is based on a full codebase and component review.

---

## Bugs (fixed in code)

| # | Location | Issue | Fix |
|---|----------|--------|-----|
| 1 | **ContactPage.tsx** | Privacy Policy link pointed to `/privacy` (404). Legal pages live under `/legal/privacy`. | Link updated to `/legal/privacy`. |
| 2 | **ContactPage.tsx** | "Prefer a demo?" card had a "Start free trial" button; context expects "Book a demo". | CTA changed to "Book a demo" with `href="/book-demo"`. |
| 3 | **Hero.tsx** | Redundant text block below CTAs: "Start free trial · Book a live demo" duplicated button labels. | Redundant block removed. |
| 4 | **BookDemoPage.tsx** | "Import starter kit" used `href="#"` (no destination). | Link updated to `#` with `aria-disabled` and note, or to a real resource when available. For now, `href="/contact"` with subject "Starter kit request" so it’s actionable. |
| 5 | **BookDemoPage.tsx** | Calendly embed used placeholder `CALENDLY_USERNAME`; widget would not load. | Documented in Recommendations; optional env/config for Calendly URL. |
| 6 | **BookDemoPage.tsx** | Calendly script cleanup: `removeChild(script)` could throw if script was already removed. | Cleanup guarded with `script.parentNode && document.body.removeChild(script)`. |
| 7 | **Multiple pages** | Invalid Tailwind: `focus:outline-hidden` (not a valid utility). | Replaced with `focus:outline-none` in ContactPage, BookDemoPage, LoginPage. (Other demos can be updated in a follow-up.) |

---

## Recommendations (no code change or optional)

### Conversion & CTAs

- **Navbar:** Consider adding a visible phone number (e.g. "0800 123 4567") for high-intent users.
- **Pricing:** Ensure "Contact sales" for Enterprise clearly leads to `/contact` or a pre-filled subject.
- **Login / Subscribe:** "Complete subscription" on Login page is a fake form; consider linking to `EXTERNAL_SIGNUP_URL` with a `?plan=...` query for the selected tier so users complete signup on the real app.
- **Forgot password:** Login page "Forgot password?" uses `#forgot-password` (no route). Link to `EXTERNAL_LOGIN_URL` with a hash or path for password reset if the app supports it.

### Content & configuration

- **Calendly:** Replace `CALENDLY_USERNAME` in BookDemoPage with a real Calendly username, or use an env var (e.g. `VITE_CALENDLY_URL`) and document in `.env.example`.
- **Contact email/domain:** Footer and schema use `hello@homecaremana.co.uk` and domain `homecaremana.co.uk`. Confirm this is intentional (vs e.g. "homecaremanager") for branding and trust.
- **Phone number:** Placeholder "0800 123 4567" appears in BookDemoPage and ContactPage; replace with the real support number before launch.

### SEO & meta

- **index.html:** Add `og:image` and `twitter:image` (e.g. `/demo-media/domiclearappshowcase.png` or a dedicated share image) for better social previews.
- **Canonical / OG URL:** Currently `https://homecaremana.co.uk`; ensure this matches the live domain.

### Accessibility & UX

- **FAQ accordion:** Already uses `aria-expanded`, `aria-controls`, `aria-labelledby`; consider adding keyboard support (Enter/Space to toggle) if not already on the button.
- **Form labels:** All main forms use associated `htmlFor`/`id`; good. Keep this pattern for any new forms.
- **Skip link:** App.tsx includes "Skip to main content"; ensure `id="main-content"` is present on the main wrapper (already in place).

### Technical & data

- **PricingCard:** `overagePricing` object keys must match tier names exactly (e.g. "Launch", "Enterprise"). If content tier names change, update the map or make lookup case-insensitive/fallback.
- **Analytics:** `utils/analytics.ts` is ready for integration; plug in your endpoint or PostHog/Plausible when going live.
- **Forms (Book demo, Contact):** Submit handlers only set local state (thank-you view); connect to a backend or form service (e.g. Formspree, Netlify Forms, or your API) so leads are stored and notified.

### Legal & trust

- **Footer:** "UK Company Registration pending" is visible; update when registration is complete.
- **Legal pages:** Links to `/legal`, `/legal/privacy`, `/legal/terms`, etc. point to LegalPage; ensure all linked documents exist under `public/legal/`.

---

## Areas checked (no issues found)

- **Routing:** App.tsx handles `/`, `/platform`, `/pricing`, `/book-demo`, `/contact`, `/login`, `/signup`, `/legal`, `/legal/*`, and 404 with a clear "Page coming soon" and link home.
- **External links:** Signup and login use `EXTERNAL_SIGNUP_URL` and `EXTERNAL_LOGIN_URL` with `target="_blank"` and `rel="noreferrer"` where appropriate.
- **Hero & pricing:** Primary and secondary CTAs are clear; pricing shows tiers and 14-day trial; "From £49" badge matches Launch plan.
- **Navigation:** Navbar and footer link to platform, solutions, pricing, demos, about, legal; dropdowns work; mobile menu present.
- **Structured data:** index.html includes Organization and SoftwareApplication JSON-LD with name, description, contact point, and features.

---

## Summary of code fixes applied

1. **ContactPage.tsx:** Privacy link → `/legal/privacy`; "Prefer a demo?" → "Book a demo" → `/book-demo`.
2. **Hero.tsx:** Removed redundant CTA text line that duplicated button labels.
3. **BookDemoPage.tsx:** Import starter kit link made actionable (e.g. to `/contact` or documented); Calendly script cleanup made safe; Calendly URL left as placeholder with a comment for configuration.
4. **ContactPage, BookDemoPage, LoginPage:** Replaced `focus:outline-hidden` with `focus:outline-none`.

Remaining recommendations (Calendly URL, phone number, og:image, form backend, etc.) can be implemented when configuration and copy are finalised.
