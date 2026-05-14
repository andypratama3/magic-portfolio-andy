/**
 * Enhanced SEO utilities with structured data generation
 * Generates complete JSON-LD schemas for all pages
 */

export interface SEOConfig {
  baseURL: string;
  person: {
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    location: string;
    avatar: string;
  };
  social: Array<{
    name: string;
    icon: string;
    link: string;
  }>;
}

/**
 * SEO utilities for enhanced metadata and structured data
 */
export class SEOUtils {
  static getSocialUrls(social: SEOConfig['social']) {
    const urlMap: { [key: string]: string | null } = {};
    for (const item of social) {
      if (item.link.startsWith('http')) {
        urlMap[item.name] = item.link;
      }
    }
    return Object.values(urlMap).filter(Boolean) as string[];
  }

  /**
   * Generate complete person schema for individual
   */
  static generatePersonSchema(config: SEOConfig) {
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${config.baseURL}/#person`,
      name: config.person.name,
      givenName: config.person.firstName,
      familyName: config.person.lastName,
      email: config.person.email,
      jobTitle: config.person.role,
      url: config.baseURL,
      image: {
        "@type": "ImageObject",
        url: `${config.baseURL}${config.person.avatar}`,
        width: 400,
        height: 400,
        caption: `${config.person.name} - Developer`,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: config.person.location,
        addressCountry: "ID",
      },
      sameAs: this.getSocialUrls(config.social),
      knowsAbout: [
        "Laravel",
        "Next.js",
        "React",
        "PHP",
        "TypeScript",
        "Web Development",
        "Full-Stack Development",
        "REST API",
        "Database Design",
        "API Development",
        "Cloud Infrastructure",
        "DevOps",
        "Software Architecture",
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: "Software Developer",
        description: "Building web applications and systems",
        occupationLocation: {
          "@type": "City",
          name: config.person.location,
        },
      },
    };
  }

  /**
   * Generate professional service schema
   */
  static generateProfessionalServiceSchema(config: SEOConfig) {
    return {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${config.baseURL}/#service`,
      name: config.person.name,
      description: `Professional fullstack development services - ${config.person.role}`,
      url: config.baseURL,
      telephone: "",
      email: config.person.email,
      serviceType: [
        "Full-Stack Web Development",
        "Backend Development",
        "Frontend Development",
        "API Development",
        "System Architecture",
        "Database Design",
        "Technical Consulting",
      ],
      areaServed: "Indonesia",
      availableLanguage: ["id", "en"],
      founder: {
        "@type": "Person",
        name: config.person.name,
        url: config.baseURL,
      },
      image: `${config.baseURL}${config.person.avatar}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: config.person.location,
        addressCountry: "Indonesia",
      },
    };
  }

  /**
   * Generate breadcrumb schema
   */
  static generateBreadcrumbSchema(
    breadcrumbs: Array<{ name: string; path: string; url: string }>
  ) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    };
  }

  /**
   * Generate website schema with search action
   */
  static generateWebsiteSchema(baseURL: string, name: string) {
    return {
      "@context": "https://schema.org",
      "@type": "Website",
      "@id": baseURL,
      url: baseURL,
      name: name,
      description: "Professional portfolio and project showcase",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${baseURL}/search?q={search_term_string}`,
        },
        query_input: "required name=search_term_string",
      },
    };
  }

  /**
   * Generate article/blog post schema
   */
  static generateArticleSchema(
    baseURL: string,
    article: {
      slug: string;
      title: string;
      description: string;
      content: string;
      image?: string;
      publishedAt: string;
      updatedAt?: string;
      author?: string;
      keywords?: string[];
    }
  ) {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${baseURL}/blog/${article.slug}`,
      url: `${baseURL}/blog/${article.slug}`,
      headline: article.title,
      description: article.description,
      articleBody: article.content,
      image: article.image
        ? {
            "@type": "ImageObject",
            url: article.image,
            width: 1200,
            height: 630,
            caption: article.title,
          }
        : undefined,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt || article.publishedAt,
      author: {
        "@type": "Person",
        name: article.author || "Andy Pratama",
        url: `${baseURL}/about`,
      },
      publisher: {
        "@type": "Organization",
        name: "Andy Pratama",
        logo: {
          "@type": "ImageObject",
          url: `${baseURL}/favicon.ico`,
        },
      },
      keywords: article.keywords?.join(", "),
      mainEntity: {
        "@type": "BlogPosting",
        "@id": `${baseURL}/blog/${article.slug}`,
      },
    };
  }

  /**
   * Generate creative work/project schema
   */
  static generateProjectSchema(
    baseURL: string,
    project: {
      slug: string;
      name: string;
      description: string;
      content: string;
      image?: string;
      publishedAt: string;
      company?: string;
      role?: string;
      technologies?: string[];
      achievements?: string[];
    }
  ) {
    return {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `${baseURL}/work/${project.slug}`,
      url: `${baseURL}/work/${project.slug}`,
      name: project.name,
      description: project.description,
      text: project.content,
      image: project.image
        ? {
            "@type": "ImageObject",
            url: project.image,
            width: 1200,
            height: 630,
            caption: project.name,
          }
        : undefined,
      datePublished: project.publishedAt,
      creator: {
        "@type": "Person",
        name: "Andy Pratama",
        url: `${baseURL}/about`,
      },
      author: project.company
        ? {
            "@type": "Organization",
            name: project.company,
          }
        : undefined,
      keywords: project.technologies?.join(", "),
      mentions: project.technologies?.map((tech) => ({
        "@type": "Thing",
        name: tech,
      })),
    };
  }

  /**
   * Generate portfolio collection schema
   */
  static generatePortfolioSchema(
    baseURL: string,
    projects: Array<{ name: string; url: string }>
  ) {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${baseURL}/work`,
      url: `${baseURL}/work`,
      name: "Portfolio",
      description: "Collection of professional projects and case studies",
      hasPart: projects.map((project) => ({
        "@type": "CreativeWork",
        name: project.name,
        url: project.url,
      })),
    };
  }

  /**
   * Combine multiple schemas into one graph
   */
  static combineSchemas(...schemas: any[]) {
    return {
      "@context": "https://schema.org",
      "@graph": schemas.filter(Boolean),
    };
  }

  /**
   * Format schema for rendering in HTML script tag
   */
  static formatSchemaForHTML(schema: any): string {
    return JSON.stringify(schema, null, 2);
  }

  /**
   * Get optimized meta description
   */
  static optimizeMetaDescription(text: string, maxLength: number = 160): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + "...";
  }

  /**
   * Extract keywords from text
   */
  static extractKeywords(text: string, limit: number = 5): string[] {
    const stopWords = new Set([
      "the",
      "a",
      "an",
      "and",
      "or",
      "but",
      "in",
      "on",
      "at",
      "to",
      "for",
      "of",
      "with",
      "by",
      "from",
      "is",
      "are",
      "was",
      "were",
    ]);

    const words = text
      .toLowerCase()
      .match(/\b\w+\b/g)
      ?.filter(
        (word) =>
          word.length > 3 &&
          !stopWords.has(word) &&
          !/^\d+$/.test(word)
      ) || [];

    const freq: { [key: string]: number } = {};
    words.forEach((word) => {
      freq[word] = (freq[word] || 0) + 1;
    });

    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([word]) => word);
  }
}

/**
 * Generate comprehensive canonical URL
 */
export function generateCanonicalUrl(baseURL: string, path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseURL}${cleanPath}`;
}

/**
 * Generate OG image URL
 */
export function generateOGImage(
  baseURL: string,
  title: string,
  variant: "home" | "work" | "blog" | "about" = "home"
): string {
  const encodedTitle = encodeURIComponent(title);
  return `${baseURL}/api/og/generate?title=${encodedTitle}&variant=${variant}`;
}
