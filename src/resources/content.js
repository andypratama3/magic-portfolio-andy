import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Andy",
  lastName: "Pratama",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Fullstack Developer — Laravel · Next.js · React.js · PHP 8",
  avatar: "/images/photo.jpg",
  email: "andypratama1211@gmail.com",
  location: "Asia/Jakarta",
  languages: ["Indonesian", "English"],
};

const newsletter = {
  display: true,
  title: <>Open to Work and Collaboration</>,
  description: (
    <>
      I am available for full-time remote roles, contract engagements, and freelance projects.
      If you have a system to build, a performance problem to solve, or a codebase that needs
      a senior pair of hands — get in touch.
    </>
  ),
};

const social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/andypratama3",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/andypratama3",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `Andy Pratama — Senior Fullstack Developer (Laravel, Next.js, React)`,
  description:
    "Portfolio of Andy Pratama — Senior Fullstack Developer with 3+ years specializing in Laravel 10+, Next.js 14+, React.js. Building production-grade web systems for education, government, and commercial sectors. Expert in API design, database optimization, DevOps, and security.",
  headline: <>Andy Pratama</>,
  featured: {
    display: true,
    title: (
      <>
        Latest project:{" "}
        <strong className="ml-4">
          School Management System v2 — Next.js 14 + Laravel 10 API
        </strong>
      </>
    ),
    href: "/work/sdmuhammadiyah3new",
  },
  subline: (
    <>
      Fullstack Developer with 3+ years of professional client work delivering
      production-grade systems across education, government, and commercial sectors.
      <br />
      I build systems that reduce manual work, stay secure, and perform at scale.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About Andy Pratama — Senior Fullstack Developer & Tech Lead`,
  description: `Senior Fullstack Developer based in Samarinda, Indonesia with 3+ years of professional experience. Specialized in Laravel 10+, Next.js 14+, React.js, REST API development, database design, cloud infrastructure (Cloudflare, AWS), and system architecture. Led multiple production projects for educational institutions and government agencies.`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com/andypratama",
  },
  intro: {
    display: true,
    title: "About",
    description: (
      <>
        I am a Fullstack Developer based in Samarinda, Indonesia, with 3+ years of
        professional client work building production-grade web applications across
        education, government, e-commerce, and service management sectors. My coding
        foundation was built through formal vocational training (SMK TI Airlangga,
        2019–2022) and has been developed continuously through real-world client
        engagements since 2023.
        <br />
        <br />
        My core stack is Laravel 10 on the backend and Next.js 14 with React.js on
        the frontend, deployed on Cloudflare edge infrastructure with full DevOps
        pipelines. I have delivered measurable results across every project I have
        worked on: 70% reduction in administrative workload, 40% faster page load
        times, Security Rating Grade A+ on two independent production environments,
        and 99.9% uptime on Cloudflare edge infrastructure.
        <br />
        <br />
        I am open to full-time remote roles, contract engagements, and freelance
        projects. I work well asynchronously and am available for overlap with EU
        (CET) and US (EST, PST) teams from UTC+7.
      </>
    ),
  },
  work: {
    display: true,
    title: "Professional Experience",
    experiences: [
      {
        company: "SD Muhammadiyah 3 Samarinda",
        timeframe: "06/2025 – Present",
        role: "Tech Lead — Senior Fullstack Developer (v2 Headless Architecture)",
        achievements: [
          <>
            Led full re-architecture from monolithic Laravel 10 Blade (v1) to headless
            Next.js 14 + Laravel 10 REST API (v2), reducing page load time from 3–5
            seconds to under 1 second — a 70%+ improvement.
          </>,
          <>
            Achieved 90+ Lighthouse Score across Performance, Accessibility, SEO, and
            Best Practices. Deployed on Cloudflare Pages with 200+ global CDN locations
            and 99.9% uptime.
          </>,
          <>
            Implemented SEO architecture (Schema.org, SSG/ISR, sitemap, Open Graph)
            generating 4,471 organic search impressions, 167 clicks, 3.5% CTR, and
            average position 5.9 within 3 months post-launch.
          </>,
          <>
            Integrated Meta WhatsApp Business API for automated payment notifications
            with 98% delivery rate and monthly billing reminders via Laravel Queue.
          </>,
          <>
            Achieved Security Rating Grade A+ through Cloudflare WAF, Content Security
            Policy headers, CSRF/XSS protection, rate limiting, and SSL/TLS hardening.
            Zero security incidents since launch.
          </>,
          <>
            Increased digital payment adoption to 70%+ and reduced manual administrative
            workload by 60% through automated billing, attendance, and scheduling workflows.
          </>,
        ],
        images: [
          {
            src: "/images/projects/page-landing.png",
            alt: "School Management System v2 — Landing Page (Next.js 14)",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/page-berita.png",
            alt: "News and Article Module with Full CMS",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/page-jadwal.png",
            alt: "Class Schedule Management System",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/page-tenaga-pendidikan.png",
            alt: "Teacher and Staff Data Module",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "SD Muhammadiyah 3 Samarinda",
        timeframe: "11/2023 – 05/2025",
        role: "Tech Lead — Senior Fullstack Developer (v1 Laravel Monolithic)",
        achievements: [
          <>
            Designed and built the initial school management system using Laravel 10 Blade
            and Tailwind CSS, serving 1,000+ students. Reduced manual administrative
            workload by 70% through automated monthly billing via Laravel Task Scheduler
            and Midtrans Payment Gateway.
          </>,
          <>
            Automated school billing: generated Virtual Account and QR-code invoices per
            student monthly with approximately 100% processing accuracy. Integrated Midtrans
            Snap UI for parent-facing payment flow.
          </>,
          <>
            Deployed geofencing-based attendance system using Google Earth KML data,
            achieving 99.5% operational reliability across the full operational period.
          </>,
          <>
            Optimized application performance via N+1 query resolution, strategic API
            caching, and database indexing — 40% improvement in page load speed.
          </>,
          <>
            Built JWT authentication using HTTP-only cookies (HttpOnly, Secure, SameSite)
            with granular RBAC for 5+ user roles via Spatie Laravel Permission. Achieved
            Security Rating Grade A+ through Nginx hardening and Cloudflare WAF.
          </>,
          <>
            Mentored junior developers on security practices, code review standards, SOLID
            principles, and architectural design patterns.
          </>,
        ],
        images: [
          {
            src: "/images/projects/sdmuhammadiyah3.jpeg",
            alt: "School Management System v1 — Main Dashboard",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/sd1.jpeg",
            alt: "Student Billing and Payment List",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/sd2.jpeg",
            alt: "Complete Student Data Management",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/sd3.png",
            alt: "School News and Article Module",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Karta Spa",
        timeframe: "06/2024 – 11/2024",
        role: "Backend Solution Architect (Freelance)",
        achievements: [
          <>
            Designed scalable multi-tenant backend for integrated Spa and F&B operations
            using Laravel 11 with Repository Pattern and SOLID principles, supporting
            branch-level operations across multiple locations.
          </>,
          <>
            Built real-time inventory management with recipe-based ingredient deduction
            per F&B transaction, automated stock alerts when materials fall below threshold,
            and branch-level inventory control. Achieved 99% data accuracy through
            multi-layer validation and deduplication.
          </>,
          <>
            Implemented RBAC for 6 distinct operational roles — admin, manager, cashier,
            GRO, kitchen staff, HRD — using Spatie Laravel Permission, each with a
            purpose-built dashboard view.
          </>,
          <>
            Integrated Fingerspot biometric HR system: processed raw attendance data
            through a validation engine for shift assignment, overtime calculation, and
            automated payroll — eliminating manual HRD reconciliation each pay cycle.
          </>,
        ],
        images: [
          {
            src: "/images/projects/karta1.png",
            alt: "Karta Spa — Management Dashboard",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/karta2.png",
            alt: "Karta Spa — Inventory and F&B Module",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Bappeda — East Kalimantan Provincial Government",
        timeframe: "12/2023 – 01/2024",
        role: "Senior Fullstack Developer (Government Contract)",
        achievements: [
          <>
            Led technical development of the official Bappeda government portal using
            Laravel 10, including legacy database integration and zero-loss historical
            data migration via Laravel Seeders. Delivered on time and within budget.
          </>,
          <>
            Built multilingual content delivery system using Google Translate API —
            fully dynamic, no hardcoded translations — enabling content internationalization
            without developer intervention.
          </>,
          <>
            Achieved Security Rating Grade A+ on two independent environments through
            Nginx security hardening, CORS policy, Content Security Policy headers,
            and SSL/TLS optimization.
          </>,
          <>
            Platform serves approximately 180 daily visitors and 3,000 monthly visitors
            with stable performance since launch. Community Satisfaction Survey (SKM)
            module actively collecting public feedback.
          </>,
        ],
        images: [
          {
            src: "/images/projects/bappeda1.jpeg",
            alt: "Bappeda East Kalimantan — Government Portal",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/bappeda2.jpeg",
            alt: "Bappeda East Kalimantan — News and Content Module",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Koetai Mahkota Soundline",
        timeframe: "07/2023 – 08/2023",
        role: "Fullstack Developer (Freelance)",
        achievements: [
          <>
            Built a complete event management and ticket sales platform using Laravel 10
            within a 2-month timeline. Integrated Midtrans Payment Gateway with secure
            transaction processing and admin dashboard with Excel export.
          </>,
          <>
            Optimized checkout flow through UX improvements, resulting in a 45% increase
            in online ticket sales. Delivered ahead of deadline with zero critical bugs
            in the production environment.
          </>,
        ],
        images: [],
      },
      {
        company: "Database Relawan MHF",
        timeframe: "08/2023 – 10/2023",
        role: "Fullstack Developer (Freelance)",
        achievements: [
          <>
            Built a centralized volunteer database system using Laravel, reducing
            duplicate data entries by 90% through NIK validation and TPS deduplication
            logic applied at input level.
          </>,
          <>
            Implemented real-time vote tally visualization by district with PDF and
            Excel export. Supported data entry for thousands of volunteers across
            multiple sub-districts.
          </>,
        ],
        images: [],
      },
      {
        company: "CV. Britech Samarinda",
        timeframe: "07/2025 – 10/2025",
        role: "Fullstack Developer (Internship)",
        achievements: [
          <>
            Developed Ansor Membership Database System using Laravel with multi-sheet
            Excel import, interactive Leaflet.js map visualization, and AWS S3 file
            synchronization via Bitbucket Pipeline CI/CD.
          </>,
          <>
            Built BLK Vocational Training Center Management System covering participant
            management, instructor scheduling, class tracking, and an operational
            monitoring dashboard.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Politeknik Negeri Samarinda",
        description: (
          <>
            Bachelor of Applied Science (D4) — Software Engineering.
            Expected graduation September 2026.
          </>
        ),
      },
      {
        name: "SMK TI Airlangga Samarinda",
        description: (
          <>
            Diploma — Software Engineering, 2019–2022.
            Formal coding foundation: HTML, CSS, PHP, JavaScript, MySQL.
          </>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Backend",
        description: (
          <>
            Laravel 10/11, PHP 8, REST API, JWT Authentication, SOLID Principles,
            Repository Pattern, MVC Architecture, RBAC, Laravel Sanctum, Laravel Queue,
            Laravel Scheduler, Spatie Laravel Permission, Service Layer, API Versioning.
          </>
        ),
        images: [
          {
            src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
            alt: "Laravel",
            width: 9,
            height: 9,
          },
          {
            src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
            alt: "PHP 8",
            width: 9,
            height: 9,
          },
          {
            src: "/images/tech/spatie.png",
            alt: "Spatie",
            width: 9,
            height: 9,
          },
          {
            src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/livewire/livewire-original-wordmark.svg",
            alt: "Livewire",
            width: 9,
            height: 9,
          },
        ],
      },
      {
        title: "Frontend",
        description: (
          <>
            Next.js 14 (App Router, SSR/SSG/ISR), React.js 18, TypeScript, JavaScript ES6+,
            Tailwind CSS, Headless UI, SWR, Zustand, React Hook Form, Axios,
            Vue.js, Alpine.js, Server Components.
          </>
        ),
        images: [
          {
            src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
            alt: "Next.js 14",
            width: 9,
            height: 9,
          },
          {
            src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
            alt: "React.js 18",
            width: 9,
            height: 9,
          },
          {
            src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
            alt: "TypeScript",
            width: 9,
            height: 9,
          },
          {
            src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original-wordmark.svg",
            alt: "Tailwind CSS",
            width: 9,
            height: 9,
          },
          {
            src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
            alt: "Vue.js",
            width: 9,
            height: 9,
          },
          {
            src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/alpinejs/alpinejs-original.svg",
            alt: "Alpine.js",
            width: 9,
            height: 9,
          },
          {
            src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
            alt: "JavaScript ES6+",
            width: 9,
            height: 9,
          },
        ],
      },
      {
        title: "Database",
        description: (
          <>
            MySQL, PostgreSQL, Database Design, Query Optimization, Indexing Strategy,
            N+1 Resolution, Eloquent ORM, Query Performance Tuning, Database Migration,
            Eager Loading, Redis.
          </>
        ),
        images: [
          {
            src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
            alt: "MySQL",
            width: 9,
            height: 9,
          },
          {
            src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
            alt: "PostgreSQL",
            width: 9,
            height: 9,
          },
          {
            src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
            alt: "Redis",
            width: 9,
            height: 9,
          },
        ],
      },
      {
        title: "DevOps and Cloud",
        description: (
          <>
            Ubuntu VPS, Nginx, Docker, GitHub Actions, CI/CD Pipeline, AWS S3,
            Cloudflare Pages, Cloudflare Workers, Cloudflare CDN and WAF,
            Bitbucket Pipelines, Linux Server Administration, SSH.
          </>
        ),
        images: [
          {
            src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
            alt: "Docker",
            width: 9,
            height: 9,
          },
          {
            src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg",
            alt: "GitHub Actions",
            width: 9,
            height: 9,
          },
          {
            src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
            alt: "AWS S3",
            width: 9,
            height: 9,
          },
          {
            src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
            alt: "Nginx",
            width: 9,
            height: 9,
          },
          {
            src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
            alt: "Linux",
            width: 9,
            height: 9,
          },
          {
            src: "https://vitejs.dev/logo.svg",
            alt: "Vite",
            width: 9,
            height: 9,
          },
        ],
      },
      {
        title: "Security and Integrations",
        description: (
          <>
            SSL/TLS Hardening, HTTP Cookie Security (HttpOnly, Secure, SameSite),
            Content Security Policy, CORS Policy, Security Headers, Rate Limiting,
            XSS and CSRF Protection. Integrations: Midtrans Payment Gateway,
            Meta WhatsApp Business API, Google Translate API, Google Analytics,
            Google Search Console, Fingerspot Biometric API, Leaflet.js.
          </>
        ),
        images: [
          {
            src: "/images/tech/midtrans.jpeg",
            alt: "Midtrans",
            width: 9,
            height: 9,
          },
          {
            src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg",
            alt: "Google APIs",
            width: 9,
            height: 9,
          },
          {
            src: "/images/tech/github.png",
            alt: "GitHub",
            width: 9,
            height: 9,
          },
        ],
      },
    ],
  },
};

const work = {
  path: "/work",
  label: "Portfolio",
  title: `Portfolio & Case Studies — Production Web Systems by Andy Pratama`,
  description: `Production-grade projects and case studies by ${person.name}. Specializing in building scalable web systems with Laravel 10+, Next.js 14+, React.js. Projects include school management systems, government portals, e-commerce platforms, inventory management, and enterprise applications with focus on performance, security, and user experience.`,
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Gallery & Moments — Project Showcase by Andy Pratama`,
  description: `Visual documentation, project screenshots, and memorable moments from ${person.name}'s professional journey as a fullstack developer. Features interface designs, dashboards, and project deliverables.`,
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, work, gallery };