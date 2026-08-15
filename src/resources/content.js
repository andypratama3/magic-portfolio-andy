import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Andy",
  lastName: "Pratama",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Software Engineer",
  positioning: "Backend-Focused Full Stack Software Engineer building production systems from idea to deployment",
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
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `Andy Pratama — Software Engineer`,
  description:
    "Andy Pratama is a Software Engineer with 3+ years of hands-on experience building production-oriented full-stack applications, specializing in Laravel/PHP backend engineering with practical experience across Next.js, React, Vue, TypeScript, databases, APIs, DevOps, mobile, third-party integrations, automation, and AI-enabled systems.",
  eyebrow: "Software Engineer",
  headline: <>Building software systems from idea to production.</>,
  featured: {
    display: true,
    title: (
      <>
        Latest project:{" "}
        <strong className="ml-4">
          ProductSchool — School Management System
        </strong>
      </>
    ),
    href: "/work/productschool",
  },
  subline: (
    <>
      I'm Andy Pratama, a Software Engineer focused on backend engineering and full-stack product development. I build production-oriented systems using Laravel, PHP, Next.js, TypeScript, and modern infrastructure.
      <br />
      <br />
      3+ years hands-on experience building scalable applications across education, government, and commercial sectors.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About Andy Pratama — Software Engineer`,
  description: `Software Engineer based in Samarinda, Indonesia. Fresh graduate by education with 3+ years of hands-on software engineering experience building production-oriented full-stack applications with Laravel, Next.js, TypeScript, databases, APIs, DevOps, and third-party integrations.`,
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
        I'm a Software Engineer based in Samarinda, Indonesia, focused on backend engineering and full-stack product development.
        <br />
        <br />
        Although I am a fresh graduate academically, I have more than three years of hands-on experience building web applications through freelance work, professional projects, and independent product development.
        <br />
        <br />
        My expertise spans Laravel/PHP backend engineering, Next.js, React, Vue, TypeScript, REST APIs, databases, Docker, CI/CD, infrastructure, mobile development, third-party integrations, and AI/automation.
        <br />
        <br />
        I build software systems from idea to production, with a strong focus on backend engineering, full-stack development, system architecture, integrations, and reliable infrastructure.
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
        role: "Fullstack Engineer (Contract)",
        achievements: [
          <>
            Led full re-architecture from monolithic Laravel Blade to headless
            Next.js 14 + Laravel REST API — 52 modules, page load from 3-5s to under 1s (70%+ improvement).
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
        role: "Software Engineer (Internship — Contract)",
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
        role: "Fullstack Engineer (Government Contract)",
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
        role: "Backend Engineer (Contract)",
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
        role: "Fullstack Engineer (Contract)",
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
            Graduation September 2026.
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
        title: "Backend Engineering",
        level: "Core",
        description: "Production-grade backend development with Laravel ecosystem and PHP architecture",
        technologies: [
          { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg", proficiency: "Expert" },
          { name: "PHP 8", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", proficiency: "Expert" },
          { name: "REST API", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", proficiency: "Strong" },
          { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", proficiency: "Strong" },
          { name: "Spatie", icon: "/images/tech/spatie.png", proficiency: "Strong" },
          { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", proficiency: "Working" },
        ],
      },
      {
        title: "Full Stack Development",
        level: "Strong",
        description: "Modern frontend frameworks with TypeScript and production-ready UI implementation",
        technologies: [
          { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", proficiency: "Strong" },
          { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", proficiency: "Strong" },
          { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", proficiency: "Strong" },
          { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original-wordmark.svg", proficiency: "Strong" },
          { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", proficiency: "Working" },
          { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", proficiency: "Strong" },
        ],
      },
      {
        title: "Database & Data Engineering",
        level: "Strong",
        description: "Database design, optimization, and data management for production systems",
        technologies: [
          { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", proficiency: "Strong" },
          { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", proficiency: "Working" },
          { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", proficiency: "Working" },
          { name: "Eloquent ORM", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg", proficiency: "Strong" },
          { name: "Query Optimization", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", proficiency: "Working" },
        ],
      },
      {
        title: "DevOps & Infrastructure",
        level: "Working",
        description: "Production deployment, CI/CD pipelines, and infrastructure management",
        technologies: [
          { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", proficiency: "Working" },
          { name: "GitHub Actions", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg", proficiency: "Working" },
          { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", proficiency: "Working" },
          { name: "Nginx", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg", proficiency: "Working" },
          { name: "Cloudflare", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg", proficiency: "Working" },
        ],
      },
      {
        title: "Third-Party Integrations",
        level: "Working",
        description: "Payment gateways, communication APIs, and external service integrations",
        technologies: [
          { name: "Midtrans", icon: "/images/tech/midtrans.jpeg", proficiency: "Working" },
          { name: "WhatsApp", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/whatsapp/whatsapp-original.svg", proficiency: "Working" },
          { name: "Google APIs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg", proficiency: "Working" },
          { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg", proficiency: "Working" },
          { name: "Stripe", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/stripe/stripe-original.svg", proficiency: "Exposure" },
        ],
      },
      {
        title: "Mobile & Additional Engineering",
        level: "Exposure",
        description: "Mobile development, AI integration, and hardware experimentation",
        technologies: [
          { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg", proficiency: "Exposure" },
          { name: "Android", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg", proficiency: "Exposure" },
          { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", proficiency: "Exposure" },
          { name: "Arduino", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg", proficiency: "Exposure" },
          { name: "IoT", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", proficiency: "Exposure" },
        ],
      },
    ],
  },
};

const work = {
  path: "/work",
  label: "Projects",
  title: `Engineering Projects & Case Studies — Production Systems by Andy Pratama`,
  description: `Production-oriented engineering projects and case studies by ${person.name}. Backend-focused full stack systems built with Laravel, Next.js, TypeScript, databases, APIs, DevOps, and third-party integrations. Projects include school management systems, government portals, payment systems, and enterprise applications with focus on architecture, performance, security, and scalability.`,
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