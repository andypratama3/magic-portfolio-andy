# Redesign Plan: Andy Pratama — Software Engineer Portfolio

**Target Architecture:** Editorial Swiss-Modern Personal Engineering Portfolio  
**Primary Goal:** Position Andy Pratama as a serious, production-grade Software Engineer specializing in backend and full-stack systems.  
**Guiding Principle:** LESS UI. MORE STORY.

---

## 1. Information Architecture & Route Structure

Consolidate confusing and redundant routes into a clean, intuitive structure:

```text
/
├── Hero (Who is Andy, What he builds, Core positioning)
├── Selected Work (Editorial project storytelling with deep dive teasers)
├── Engineering Capabilities / How I Build (6-stage engineering lifecycle)
├── Verified Tech Stack (Grouped logically: Backend, Frontend, Data, Infra, Integrations)
├── Selected Experience & Impact (Chronological editorial timeline)
├── About & Positioning (Concise personal philosophy & background)
├── Contact / Call to Action (Direct inquiry & communication)
└── Footer (Clean links, colophon, live time/status)

Internal Routes:
/work             -> Complete catalog of engineering projects & systems
/work/[slug]      -> Comprehensive, editorial case study deep dives
/about            -> Detailed technical background, philosophy & experience
```

### Route Streamlining & Deletions:
- **Remove:** `/gallery` and `/product` & `/product/[slug]`.
  - Redirect `/gallery` and `/product` to `/work` for backward compatibility without breaking existing backlinks.
  - Delete duplicate MDX files in `src/app/product/items/` and keep the master MDX files in `src/app/work/projects/`.
  - Remove all fake placeholder numbers (`wa.me/6281234567890`) and commercial product sale badges.

---

## 2. Design System & Visual Foundation

### Color Palette (Minimal, High-Contrast, WCAG AA Compliant):
```css
/* LIGHT THEME */
--bg-page:        #F4F3EF;
--text-primary:   #111111;
--text-muted:     #6F6F6F;
--border-subtle:  #D8D6D0;
--surface:        #FFFFFF;
--surface-subtle: #ECEAE4;
--accent:         #1F2937; /* Neutral charcoal accent */

/* DARK THEME */
--bg-page:        #0B0B0B;
--text-primary:   #F4F4F0;
--text-muted:     #858585;
--border-subtle:  #242424;
--surface:        #141414;
--surface-subtle: #1C1C1C;
--accent:         #E5E5E0;
```

### Typography Hierarchy (Geist / Geist Mono, Responsive clamp):
- **Display Hero:** `clamp(2.75rem, 7vw, 5.5rem)`, bold, tight letter-spacing (`-0.04em`), uppercase editorial hierarchy.
- **Section Heading (H2):** `clamp(1.75rem, 4vw, 2.75rem)`, semi-bold, letter-spacing (`-0.02em`).
- **Subsection Heading (H3):** `clamp(1.25rem, 2.5vw, 1.75rem)`, medium.
- **Body Large:** `clamp(1.0625rem, 1.5vw, 1.25rem)`, line-height `1.65`.
- **Body Regular:** `1rem` (`16px`), line-height `1.6`.
- **Metadata / Code / Label:** `Geist Mono`, `0.8125rem` (`13px`), uppercase letter-spacing `0.08em`.

### Spatial Grid & Components:
- **Max Width:** Standard container max-width `1200px` for editorial reading and large project layouts.
- **Borders & Radii:** Clean hairline borders (`1px solid var(--border-subtle)`), restrained corner radii (`6px` to `12px`), completely eliminating excessive `2rem` double-bezel cards.
- **Elevation:** High-contrast elevation without glowing neon drop-shadows; subtle translucent glass on fixed navigation (`backdrop-filter: blur(16px)`).

---

## 3. GSAP Motion Architecture (`src/lib/gsap/`)

Create a modular, safe motion architecture adhering to React 18 lifecycles and `@gsap/react`:

1. **`src/lib/gsap/config.ts`**:
   - Central registration for `gsap` and `ScrollTrigger`.
   - Custom easing curves (`editorialEase = 'cubic-bezier(0.16, 1, 0.3, 1)'`, `smoothEase = 'power2.out'`).
   - Reduced-motion detection utility (`prefersReducedMotion()`).
2. **Lifecycle Safety:**
   - Every GSAP animation must be wrapped inside `useGSAP()` or `gsap.context((self) => {...}, containerRef)`.
   - Never use `ScrollTrigger.getAll().forEach(t => t.kill())` on component unmount. Clean up only local triggers via context revert.
3. **Targeted Motion Choreography:**
   - **Hero Entrance (800ms–1200ms):**
     1. Navigation drops in with subtle opacity (`0 -> 1`, `y: -10 -> 0`).
     2. Eyebrow badge reveals.
     3. Bold editorial title reveals via clip-path/transform.
     4. Subline fades in.
     5. CTAs reveal with magnetic interaction.
   - **Scroll Storytelling ("How I Build"):**
     - Step-by-step progress indicator pinned or highlighted as the user scrolls through the 6 engineering stages (Understand, Design, Build, Test, Deploy, Monitor/Improve).
   - **Project Visuals:**
     - Clean, smooth clip-path or scale reveal on scroll entrance (`1.05 -> 1.0`, opacity `0 -> 1`).
     - Subtle interactive tilt/hover without layout shift.
   - **Strict Accessibility:**
     - If `prefers-reduced-motion: reduce` is active, all elements render statically in their final states immediately.

---

## 4. Homepage Redesign Layout

1. **Navigation:**
   - Desktop: Minimal top bar with logo ("ANDY PRATAMA"), navigation links (Work, Engineering, Experience, About, Contact), theme toggle, and live status pill ("Available for hire").
   - Mobile: Clean, accessible drawer/overlay with keyboard trapping and Escape key handler.
2. **Hero Section:**
   - Headline: Bold editorial statement:
     ```text
     ANDY PRATAMA
     SOFTWARE ENGINEER
     
     Building reliable backend systems and full-stack digital products that solve real problems.
     ```
   - Concise meta tags: `Backend Systems` • `Full-Stack Architecture` • `Laravel / Next.js`
   - CTAs: `[Explore Selected Work ↓]` and `[Get in Touch →]`.
3. **Engineering Scale (Metrics):**
   - Highlighting verifiable numbers from Andy's production systems:
     - `893` Production Routes Engineered (ProductSchool)
     - `52+` Production Modules Across Systems
     - `18` RBAC Roles & 272 Permissions
     - `150+` Automated Test Files
4. **Selected Work (Editorial Showcase):**
   - **01. ProductSchool** — Enterprise School Management System with AI WhatsApp Bot.
   - **02. Bappeda East Kalimantan** — Provincial Government Web Portal & Multilingual CMS.
   - **03. Karta Spa** — Multi-Tenant ERP & Biometric Attendance Backend.
   - **04. Kue Pandan Asli** — High-Performance E-Commerce & Order Management.
   - Each project showcases: Year, Role, Stack, Core Challenge, Solution, Architecture Highlight, and direct link to case study.
5. **How I Build (Engineering Mindset):**
   - 01. Understand & Scope
   - 02. Architecture & Data Modeling
   - 03. Implementation & Service Isolation
   - 04. Automated Testing & Verification
   - 05. Production Deployment & Hardening
   - 06. Observability & Iteration
6. **Technical Capabilities (Structured Grid):**
   - Backend: PHP, Laravel 10-12, REST API, Microservices / Monolith Services, Spatie RBAC
   - Frontend: TypeScript, React, Next.js, Vue.js, Tailwind CSS
   - Database: MySQL, PostgreSQL, Redis, Query Optimization, Indexing
   - Infrastructure & DevOps: Docker, Linux, Nginx, CI/CD, Cloudflare
   - Integrations: Midtrans Payment Gateway, WhatsApp Cloud API, WebSockets (Reverb), Firebase
7. **Experience Timeline:**
   - Clean, scannable editorial list of roles at SD Muhammadiyah 3, Beesoft (Britech), Bappeda, and Karta Spa.
8. **Contact & Call to Action:**
   - Memorable closing: "LET'S BUILD SOMETHING RELIABLE."
   - Direct email, GitHub, LinkedIn, Cal.com scheduling, and functioning Resend contact form.

---

## 5. Case Study Template System (`/work/[slug]`)

Transform project detail pages into engineering deep dives:
- **Hero Header:** Project Title, Client / Sector, Timeline, Role, Production Status, Live / Repository links.
- **System Architecture Diagram / Data Flow:** Plain, elegant visual representation.
- **Key Sections:**
  1. The Operational Challenge
  2. Architecture & Design Decisions
  3. Security & Access Control
  4. Automation & Integrations (Midtrans, WhatsApp AI, Headless PDF)
  5. Performance & Reliability Metrics
  6. Lessons Learned
- **High-Res Visual Gallery:** Optimized Next.js images with lightbox/modal view.
- **Clean MDX Components:** Syntax-highlighted code blocks, architecture callouts, clean metric boxes.

---

## 6. Implementation Phases & Parallel Execution Plan

- **Phase 1: Foundations & Cleanup**
  - Fix build/lint scripts (ESLint flat config, remove dead Next.js trace warning).
  - Setup unified CSS tokens for light/dark Swiss palette.
  - Setup `lib/gsap/` with safe context management.
  - Remove redundant `/product` and `/gallery` pages, set up 301 redirects to `/work`.
- **Phase 2: Core Components & Navigation**
  - Build modern, accessible Header with responsive navigation.
  - Build Footer with status indicators and clean links.
  - Build editorial Button, Badge, and Card primitives.
- **Phase 3: Rebuilt Hero & Engineering Scale**
  - Implement editorial Hero with GSAP entrance timeline.
  - Implement clean verified metrics bar.
- **Phase 4: Project Showcase & Case Study Template**
  - Build editorial Project Showcase on homepage.
  - Overhaul `/work` and `/work/[slug]` case study layout.
  - Remove text version hack and fake URLs.
- **Phase 5: Engineering Storytelling & Capabilities**
  - Implement "How I Build" scroll-driven section.
  - Build clean, categorized technical stack display without glowing cards.
- **Phase 6: Experience, About & Contact**
  - Refactor `/about` and experience timeline.
  - Build high-impact Contact CTA and verified form.
- **Phase 7: SEO, Performance & a11y QA**
  - Clean layout `<head>` metadata, remove duplicate tags.
  - Validate OpenGraph images and Schema JSON-LD.
  - Verify WCAG contrast, keyboard navigation, and reduced-motion.
  - Run full `npm run lint` and `npm run build`.
