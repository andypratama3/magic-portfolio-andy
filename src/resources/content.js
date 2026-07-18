import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Andy",
  lastName: "Pratama",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Fullstack Developer — Laravel & Next.js Specialist",
  avatar: "/images/photo.jpg",
  email: "andypratama1211@gmail.com",
  location: "Asia/Jakarta",
  languages: ["Indonesian", "English"],
};

const newsletter = {
  display: false,
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
    name: "TikTok",
    icon: "tiktok",
    link: "https://www.tiktok.com/@andypratama3_",
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
  title: `Andy Pratama — Fullstack Developer`,
  description:
    "Andy Pratama is a Fullstack Developer specializing in Laravel, Next.js, and production-grade web systems. 3+ years building scalable applications for education, government, and commercial sectors.",
  headline: <>Andy Pratama</>,
  featured: {
    display: true,
    title: (
      <>
        Latest project (Jun 2025 – Jun 2026, Freelance):{" "}
        <strong className="ml-4">
          ProductSchool — All-in-One School Management System
        </strong>
      </>
    ),
    href: "/work/productschool",
  },
  subline: (
    <>
      Fullstack Developer specializing in Laravel & Next.js, building production-grade systems that deliver measurable results.
      <br />
      3+ years of experience across education, government, and commercial sectors.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About Andy Pratama — Fullstack Developer`,
  description: `Fullstack Developer based in Samarinda, Indonesia with 3+ years of hands-on experience building production-grade web systems. Specializing in Laravel 10+, Next.js 14+, React.js, REST API development, and scalable architectures.`,
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
        I'm a Fullstack Developer based in Samarinda, Indonesia, with 3+ years of
        hands-on experience building production-grade web systems across education, government, and commercial sectors.
        <br />
        <br />
        My expertise spans full-stack development with Laravel 10-12, Next.js 14, and React.js, deployed on Cloudflare edge infrastructure with CI/CD pipelines. I've delivered measurable results: 70%+ faster page loads, Security Grade A+, and RBAC systems with 380+ permissions.
        <br />
        <br />
        I'm available for full-time remote roles, contract engagements, and freelance projects.
      </>
    ),
  },
  work: {
    display: true,
    title: "Professional Experience",
    experiences: [
      {
        company: "SD Muhammadiyah 3 Samarinda",
        timeframe: "06/2025 – 06/2026",
        role: "Fullstack Developer (Freelance)",
        achievements: [
          <>
            Led full re-architecture from monolithic Laravel Blade to headless
            Next.js 14 + Laravel REST API — 52 modules, ~79K LOC, page load from 3-5s to under 1s (70%+ improvement).
          </>,
          <>
            Designed RBAC with 16 user roles, ~380 permissions, and data-level scoping (TeacherScopedData trait).
          </>,
          <>
            Integrated Claude API for automated report card narratives and Meta WhatsApp Cloud API for real-time notifications — 98% delivery rate.
          </>,
          <>
            Achieved 90+ Lighthouse scores, Security Grade A+, CI/CD via GitHub Actions (Pint, PHPStan, Paratest, Sentry).
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
        company: "CV Beesoft Research & Technology (Britech)",
        timeframe: "07/2025 – 10/2025",
        role: "Fullstack Developer (Internship — Freelance Contract)",
        achievements: [
          <>
            Delivered 2 production systems: Ansor Kaltim membership database (38 models, QR attendance, Leaflet.js choropleth map) and BLK training center management.
          </>,
          <>
            Built RBAC with 7 roles, 108 permissions, multi-tab forms, Excel import/export, and full CMS.
          </>,
        ],
        images: [
          {
            src: "/images/projects/blk.jpeg",
            alt: "BLK (Job Training Center) Management System",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/db_ansor.jpeg",
            alt: "Database Ansor Kaltim — Organizational Membership Database",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Bappeda — East Kalimantan Provincial Government",
        timeframe: "11/2024 – 12/2024",
        role: "Fullstack Developer (Freelance — Government Contract)",
        achievements: [
          <>
            Built official provincial government web portal with zero-loss legacy database migration via Laravel Seeders.
          </>,
          <>
            Dynamic multilingual CMS using Google Translate API — no hardcoded translations, multi-layer authorization.
          </>,
          <>
            Security Grade A+ via Nginx hardening, CORS policy, SSL/TLS optimization; serves ~3,000 monthly visitors.
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
        company: "Karta Spa",
        timeframe: "06/2024 – 11/2024",
        role: "Backend Developer (Freelance)",
        achievements: [
          <>
            Designed scalable multi-tenant backend for Spa & F&B across 3 branches — Laravel 10, Repository Pattern, SOLID.
          </>,
          <>
            Real-time inventory with recipe-based ingredient deduction, RBAC for 6 operational roles, Fingerspot biometric HR integration.
          </>,
          <>
            Achieved 99% data accuracy through multi-layer validation and automated stock reconciliation.
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
        company: "Koetai Mahkota Soundline",
        timeframe: "07/2023 – 08/2023",
        role: "Fullstack Developer (Freelance)",
        achievements: [
          <>
            Built complete event management and ticket sales platform with Midtrans Payment Gateway (2-month timeline).
          </>,
          <>
            UX optimization of checkout flow — 45% increase in online ticket sales, zero critical bugs in production.
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
            Laravel 10/11/12, PHP 8, REST API, JWT Authentication, SOLID Principles,
            Repository Pattern, MVC Architecture, RBAC, Spatie Laravel Permission, Laravel Queue,
            Laravel Scheduler, Service Layer, API Versioning.
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
            Tailwind CSS, Headless UI, SWR, Zustand, Vue.js, Alpine.js, Server Components.
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
            N+1 Resolution, Eloquent ORM, Database Migration, Redis.
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
            Ubuntu VPS, Nginx, Docker, GitHub Actions CI/CD, AWS S3,
            Cloudflare Pages/Workers/CDN/WAF, Linux Server Administration.
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
        ],
      },
      {
        title: "Security and Integrations",
        description: (
          <>
            SSL/TLS Hardening, HTTP Cookie Security, Content Security Policy,
            CORS Policy, Security Headers, Rate Limiting, XSS and CSRF Protection.
            Integrations: Midtrans Payment Gateway, Meta WhatsApp Business API,
            Google Translate API, Claude AI, Fingerspot Biometric API, Leaflet.js.
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
  label: "Digital Products",
  title: `Digital Products & Tools — Created by Andy Pratama`,
  description: `Explore my premium digital products, including full-scale systems and tools ready to be deployed. Features comprehensive solutions like ProductSchool and ERP Systems.`,
  items: [
    {
      src: "/images/projects/page-landing.png", // Or appropriate image
      alt: "ProductSchool Management System",
      orientation: "horizontal",
      title: "ProductSchool — Management System",
      description: "An all-in-one school management system featuring student data management, automated billing, and a headless Next.js architecture.",
      link: "/product/productschool"
    },
    {
      src: "/images/projects/karta1.png",
      alt: "ERP System — Karta Spa",
      orientation: "horizontal",
      title: "Enterprise Resource Planning (ERP)",
      description: "Comprehensive ERP system designed for F&B and service industries. Includes real-time inventory management, RBAC, and automated payroll.",
      link: "/product/erp-system" // Link to the relevant project or live demo
    },
    {
      src: "/images/projects/sdmuhammadiyah3.jpeg",
      alt: "School Billing System",
      orientation: "horizontal",
      title: "Automated Billing Module",
      description: "Integrated Midtrans payment gateway for automated invoicing, QR-code generation, and payment tracking for educational institutions.",
      link: "/product/automated-billing"
    },
    {
      src: "/images/projects/bappeda1.jpeg",
      alt: "Government Portal Framework",
      orientation: "horizontal",
      title: "GovPortal CMS Framework",
      description: "A secure, robust CMS framework built with Laravel 10, tailored for government agencies requiring strict security and data migration capabilities.",
      link: "/product/govportal"
    }
  ],
};

const testimonials = {
  display: true,
  title: "What Clients Say",
  description: "Trusted by educational institutions, government agencies, and businesses to deliver production-grade systems.",
  items: [
    {
      name: "SD Muhammadiyah 3 Samarinda",
      role: "School Administration",
      content: "Andy transformed our school management system with a modern architecture. The new system reduced our administrative workload by 70% and improved student data accuracy significantly.",
      image: "/images/projects/sdmuhammadiyah3.jpeg",
    },
    {
      name: "Bappeda East Kalimantan",
      role: "Government Agency",
      content: "Professional development and on-time delivery. The security implementation and multilingual support exceeded our expectations. Highly recommended for government projects.",
      image: "/images/projects/bappeda1.jpeg",
    },
    {
      name: "Karta Spa Management",
      role: "Business Operations",
      content: "The ERP system Andy built streamlined our entire operation. Real-time inventory management and automated payroll saved us countless hours every month.",
      image: "/images/projects/karta1.png",
    },
  ],
};

export { person, social, newsletter, home, about, work, gallery, testimonials };