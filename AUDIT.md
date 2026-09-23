# Technical & Design Audit: Andy Pratama Portfolio

**Date:** September 2026  
**Auditor:** Principal Frontend Engineer, Motion Designer & Technical Product Designer  
**Repository:** `https://github.com/andypratama3/magic-portfolio-andy.git`  
**Live Target:** `https://www.andypratama.studio`  
**Runtime Environment:** Next.js 16.2.10 (Turbopack/Webpack), React 18.3.1, Node v26.9.0, TypeScript 5.8.3

---

## 1. Existing Architecture & Foundations

- **Starter Foundation:** Built on top of `@once-ui-system/core` (version `^1.2.4`) and the `@once-ui-system/magic-portfolio` starter template.
- **Framework & Runtime:** Next.js 16.2.10 using the App Router (`src/app/`).
- **Styling Pipeline:**
  - `@once-ui-system/core` pre-compiled CSS (`styles.css`, `tokens.css`)
  - Global `src/resources/custom.css` (527 lines of custom overrides, color scales, utility patches)
  - SCSS Modules (`Header.module.scss`, `Projects.module.scss`, `CTASection.module.scss`, `Testimonials.module.scss`, `about.module.scss`, etc.)
  - Inline style objects interspersed directly into React components
- **Configuration & State:**
  - `src/resources/once-ui.config.js`: Contains theme flags, font declarations (Geist & Geist Mono), effects configuration (mask, gradient, dots, lines).
  - Theme toggling handled via document `data-theme` attribute and client-side `localStorage`.

---

## 2. Existing Routes & Information Architecture

| Route | Type | Status / Content | Audit Finding |
|---|---|---|---|
| `/` | Static (SSG) | Homepage: Hero, Metrics, Featured Project, Testimonials, More Projects, Philosophy, Tech Stack, CTA | Visual noise from particle dots & heavy glows; lacks editorial layout; unmanaged GSAP hooks |
| `/about` | Static (SSG) | Table of Contents, Profile, Bio, Work Experience, Education, Skills, Philosophy | Overly nested, repetitive cards, hardcoded badges, heavy DOM tree |
| `/work` | Static (SSG) | Project catalog with filtering & masonry cards | Card-based grid with double bezels and small hover carousels; doesn't feel like high-end engineering case studies |
| `/work/[slug]` | SSG (`generateStaticParams`) | 10 MDX case studies: `productschool`, `kuepandanasli`, `kartaspa`, `bappedakaltim`, `sdmuhammadiyah3new`, `ismi`, `database-ansor-kaltim`, `blk-management-system`, `koetai-mahkota`, `sdmuhammadiyah3` | Contains rich, genuine engineering data. However, displays an awkward `<details>` accordion labeled "Text version" on every page, and layout is cramped (`maxWidth="xs"`) |
| `/gallery` | Static (SSG) | "Digital Products" masonry grid | Displays 4 products (`ProductSchool`, `ERP System`, `Automated Billing`, `GovPortal CMS`) that are literally subsets of the `/work` projects |
| `/product` | Redirect | Client redirect to `/gallery` | Redundant redirect layer |
| `/product/[slug]` | SSG | 4 product MDX files (`automated-billing`, `erp-system`, `govportal`, `productschool`) | Duplicate content of `/work/[slug]`; contains hardcoded fake WhatsApp order link (`wa.me/6281234567890`) |
| `/api/contact` | Route Handler | Resend email submission handler | Hardcoded fallback domain references `andypratama.vercel.app` instead of `andypratama.studio` |
| `/api/og/generate` | Route Handler | Dynamic OpenGraph image generator using `@vercel/og` | Functional, but font and styling could be more editorial |
| `/api/authenticate`, `/api/check-auth` | Route Handlers | Password protection endpoint for private projects | Not actively used for any real private client NDA projects |

---

## 3. Existing Dependencies & Package Health

- **Dependencies:**
  - `gsap: ^3.15.0` & `@gsap/react: ^2.1.2`: Installed, but custom hooks don't use `@gsap/react` effectively and suffer from severe cleanup bugs.
  - `@once-ui-system/core: ^1.2.4`: Heavy UI system adding abstraction layers (`Column`, `Flex`, `Heading`, `Text`, `ToggleButton`) and generating verbose DOM markup.
  - `@vercel/analytics: ^1.5.0`, `@vercel/speed-insights: ^2.0.0`: Active.
  - `resend: ^6.12.3`, `nodemailer: ^9.0.3`: Two different email packages installed simultaneously (redundant).
  - `react-icons: ^5.7.0`: Large icon set; some icons are pulled externally from `cdn.jsdelivr.net` instead of SVGs/react-icons.
  - `sass: ^1.86.3`: Used for CSS modules.
  - `next-mdx-remote: ^6.0.0`, `@next/mdx: ^15.1.4`, `@mdx-js/loader: ^3.1.0`: Triple-layered MDX dependencies.
- **Linting & Tooling:**
  - `npm run lint` fails with `Invalid project directory provided: /magic-portfolio-andy/lint`.
  - ESLint 9 is installed but repository only has `.eslintrc.json` (no flat `eslint.config.mjs`), causing ESLint CLI to fail.

---

## 4. Animation & GSAP Analysis

### Critical Defects Found:
1. **Global ScrollTrigger Murder on Unmount:**
   In `src/hooks/useGSAP.ts`:
   ```typescript
   export const useParallax = (...) => {
     ...
     return () => {
       ScrollTrigger.getAll().forEach((t) => t.kill()); // KILLS ALL SCROLLTRIGGERS GLOBALLY!
     };
   };
   export const useStaggeredReveal = (...) => {
     ...
     return () => {
       ScrollTrigger.getAll().forEach((t) => t.kill()); // KILLS ALL SCROLLTRIGGERS GLOBALLY!
     };
   };
   ```
   Whenever a component unmounts or rerenders, it terminates all ScrollTriggers on the entire page.
2. **Missing Animation Scoping:**
   Animations created in `src/utils/gsap.ts` (`animateHero`, `cardStacking`, `textScrubReveal`) are invoked without `gsap.context()` scoping. In React 18 Strict Mode or client navigation, tweens collide or leak memory.
3. **Event Listener Leaks:**
   `magneticButton` attaches native `mousemove` and `mouseleave` event listeners to elements without returning a cleanup function.
4. **Animation Intent:**
   Motion is currently applied generically (staggering every element, glowing on hover, pulsing badges) rather than purposefully directing user attention to engineering storytelling.

---

## 5. Visual System & Design Flaws

1. **Lack of Editorial Gravitas:**
   - The site uses standard pill buttons with pill badges, rounded cards (`radius="2rem"`), double bezels, and neon borders.
   - The typography is Geist sans, but rendered with inconsistent sizes, inline font clamps, and no strong editorial baseline grid.
2. **Excessive Visual Noise:**
   - Ambient background dots, radial gradients, noise SVG filters, and glowing cards create a template-like appearance rather than a calm, disciplined engineering portfolio.
   - Tech stack cards use bright gradients with neon drop shadows (`boxShadow: '0 0 16px rgba(99, 102, 241, 0.4)'`) and external CDN icon images that load inconsistently.
3. **Color Incoherence:**
   - Light mode and dark mode define custom indigo/amber schemes with dozens of variable tokens (`--scheme-brand-100` through `1200`), resulting in low contrast in some states and visual clutter.
   - Doesn't follow the requested warm minimal Swiss aesthetic:
     - Light: `#F4F3EF` background, `#111111` primary text, `#6F6F6F` muted, `#D8D6D0` border.
     - Dark: `#0B0B0B` background, `#F4F4F0` primary text, `#858585` muted, `#292929` border.

---

## 6. Content & Factuality Audit

### Verified Real Facts:
- **Identity:** Andy Pratama, Software Engineer based in Samarinda, Indonesia.
- **Primary Expertise:** Backend Engineering (Laravel 10-12, PHP 8.3, MySQL, Redis, REST APIs, System Architecture) & Full-Stack (Next.js, React, TypeScript).
- **Core Production Project (ProductSchool):**
  - Production deployment at SD Muhammadiyah 3 Samarinda (2024–2026).
  - 52 modules, 893 routes, 132 models, 146 controllers, 111 services, 18 RBAC roles, 272 permissions.
  - Headless Chrome rapor generator, WhatsApp bot with function-calling, Midtrans payment gateway, WebSockets (Reverb).
- **Other Verified Projects:**
  - Bappeda East Kalimantan Provincial Government Portal (Laravel 10, dynamic multilingual CMS, Nginx hardening).
  - Karta Spa (Multi-tenant ERP backend, inventory with recipe deduction, Fingerspot biometric integration).
  - CV Beesoft / Britech (Ansor Kaltim membership database with Leaflet choropleth map & BLK management system).
  - Kue Pandan Asli (E-commerce / catalog platform).
  - Koetai Mahkota Soundline (Event management & ticket platform with Midtrans).

### Flagged / Inaccurate Content:
1. **Fake WhatsApp Contact Number:** In `src/app/product/[slug]/page.tsx`, a link uses `https://wa.me/6281234567890`. This is a fake placeholder phone number.
2. **Duplicate Digital Products Shop:** The entire `/gallery` and `/product` section frames real engineering projects as commodity items for sale ("Purchase a lifetime license or request custom implementation"). Andy is an engineer, not a digital goods merchant.
3. **Superlative Buzzwords:** Phrases like "transform your business", "cinematic hero", and vague claims need tightening into concise, confident engineering copy.

---

## 7. SEO & Performance Audit

1. **Duplicate Head Metadata:**
   In `src/app/layout.tsx`:
   - Hardcoded `<meta name="description">` tags conflict with Next.js dynamic metadata generated via `generateMetadata()`.
   - Obsolete `<link rel="pingback" href=".../xmlrpc.php">` (WordPress artifact).
   - Duplicate viewport meta tags.
2. **Structured Data:**
   - Good Person, ProfessionalService, and WebSite JSON-LD schemas in `layout.tsx`, but some IDs and URLs have minor inconsistencies.
   - Case study pages use Schema for `BlogPosting` rather than `Article` or `SoftwareSourceCode` / `TechArticle`.
3. **Asset & Image Sizing:**
   - Many project screenshots in `public/images/projects/` are uncompressed PNGs (e.g. `productschool-*.png`, `ss-*.png`).
   - Project cards render large images inside carousels without optimal `sizes` or modern WebP/AVIF formatting.
4. **Pre-rendered Crawler Hack:**
   `<details><summary>Text version</summary>...` on case studies adds clutter to the DOM. Next.js App Router already provides full Server-Side HTML pre-rendering; this hack is unnecessary and visually unpolished.

---

## 8. Accessibility (a11y) & Responsiveness

1. **Contrast:** Some muted labels (`neutral-weak`) fail WCAG AA contrast (4.5:1) in dark mode against translucent surface backgrounds.
2. **Keyboard Traps & Focus Rings:** Custom buttons in `Header.tsx` and `HeroSection.tsx` lack clear, standardized focus indicators.
3. **Mobile Navigation:** The mobile hamburger menu in `Header.tsx` renders a fixed overlay with inline styles and lacks keyboard focus trapping, Escape key closing, and aria-expanded state.
4. **Reduced Motion:** While some media queries exist in `custom.css`, GSAP timeline animations execute without checking `window.matchMedia('(prefers-reduced-motion: reduce)')`.

---

## 9. Summary of Opportunities & Recommendations

1. **Streamline Route Architecture:**
   Consolidate `/gallery` and `/product` into a unified, high-impact `/work` showcase and dedicated case studies under `/work/[slug]`.
2. **Build an Apple/Swiss Editorial Design System:**
   Implement strict typographic hierarchy, disciplined whitespace, crisp hairline borders (`1px solid var(--border)`), warm minimal light and dark themes, and eliminate neon glowing cards.
3. **Re-architect GSAP Motion System:**
   - Build a clean `lib/gsap/` animation module with `@gsap/react` and proper `gsap.context()` lifecycle management.
   - Remove destructive global `ScrollTrigger.kill()` calls.
   - Implement an editorial entrance sequence for the Hero and smooth scroll-triggered storytelling for "How I Build".
   - Full support for `prefers-reduced-motion`.
4. **Elevate Engineering Storytelling:**
   Focus on Andy Pratama as a Software Engineer building production systems (ProductSchool, Karta Spa, Bappeda, etc.), highlighting architecture, domain complexity, security, and measurable outcomes.
5. **Fix Tooling & Production Integrity:**
   Fix `npm run lint`, clean up unused dependencies, eliminate duplicate meta tags, remove fake placeholder URLs/phones, and optimize performance.
