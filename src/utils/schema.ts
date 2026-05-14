/**
 * Schema.org JSON-LD structured data generation
 * Helps search engines understand website content better
 */

export interface SchemaConfig {
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
    url: string;
  }>;
}

/**
 * Generate Person Schema (for homepage and about page)
 * Helps Google understand who this person is
 */
export function generatePersonSchema(config: SchemaConfig) {
  const { baseURL, person, social } = config;
  
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseURL}/#person`,
    name: person.name,
    givenName: person.firstName,
    familyName: person.lastName,
    email: person.email,
    jobTitle: person.role,
    image: {
      "@type": "ImageObject",
      url: `${baseURL}${person.avatar}`,
      width: 400,
      height: 400,
      name: person.name
    },
    url: baseURL,
    description: `${person.name} is a professional ${person.role}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: person.location
    },
    sameAs: social
      .filter(s => ['LinkedIn', 'GitHub', 'Twitter', 'Threads'].includes(s.name))
      .map(s => s.url),
    knowsAbout: [
      "Laravel",
      "Next.js",
      "React.js",
      "PHP",
      "TypeScript",
      "Web Development",
      "Full-Stack Development",
      "REST API",
      "Database Design",
      "Cloud Infrastructure",
      "DevOps"
    ]
  };
}

/**
 * Generate Organization Schema
 */
export function generateOrganizationSchema(config: SchemaConfig) {
  const { baseURL, person, social } = config;
  
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseURL}/#organization`,
    name: person.name,
    url: baseURL,
    email: person.email,
    description: "Professional fullstack development services specializing in Laravel and Next.js",
    image: `${baseURL}${person.avatar}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: person.location
    },
    sameAs: social.map(s => s.url),
    founder: {
      "@type": "Person",
      name: person.name,
      url: baseURL
    }
  };
}

/**
 * Generate Breadcrumb Schema
 * Improves navigation in search results
 */
export function generateBreadcrumbSchema(
  baseURL: string,
  breadcrumbs: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
}

/**
 * Generate WebPage Schema
 */
export function generateWebPageSchema(
  baseURL: string,
  page: {
    url: string;
    title: string;
    description: string;
    image?: string;
  }
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": page.url,
    url: page.url,
    name: page.title,
    description: page.description,
    ...(page.image && {
      image: {
        "@type": "ImageObject",
        url: page.image,
        width: 1200,
        height: 630
      }
    }),
    isPartOf: {
      "@id": baseURL
    }
  };
}

/**
 * Generate Article/BlogPosting Schema
 */
export function generateBlogPostingSchema(
  baseURL: string,
  post: {
    url: string;
    title: string;
    description: string;
    content: string;
    image?: string;
    publishedAt: Date;
    updatedAt?: Date;
    author?: string;
  }
) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": post.url,
    url: post.url,
    headline: post.title,
    description: post.description,
    articleBody: post.content,
    ...(post.image && {
      image: {
        "@type": "ImageObject",
        url: post.image,
        width: 1200,
        height: 630
      }
    }),
    datePublished: post.publishedAt.toISOString(),
    ...(post.updatedAt && {
      dateModified: post.updatedAt.toISOString()
    }),
    author: {
      "@type": "Person",
      name: post.author || "Andy Pratama",
      url: baseURL
    },
    publisher: {
      "@type": "Organization",
      name: "Andy Pratama",
      logo: {
        "@type": "ImageObject",
        url: `${baseURL}/favicon.ico`
      }
    }
  };
}

/**
 * Generate CreativeWork/Project Schema
 */
export function generateProjectSchema(
  baseURL: string,
  project: {
    url: string;
    name: string;
    description: string;
    content: string;
    image?: string;
    publishedAt: Date;
    company?: string;
    technologies?: string[];
  }
) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": project.url,
    url: project.url,
    name: project.name,
    description: project.description,
    text: project.content,
    ...(project.image && {
      image: {
        "@type": "ImageObject",
        url: project.image,
        width: 1200,
        height: 630
      }
    }),
    datePublished: project.publishedAt.toISOString(),
    creator: {
      "@type": "Person",
      name: "Andy Pratama",
      url: baseURL
    },
    ...(project.company && {
      author: {
        "@type": "Organization",
        name: project.company
      }
    }),
    ...(project.technologies && project.technologies.length > 0 && {
      keywords: project.technologies.join(", ")
    })
  };
}

/**
 * Generate FAQPage Schema
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

/**
 * Generate Skills/Expertise Schema
 */
export function generateSkillsSchema(
  baseURL: string,
  skills: Array<{ title: string; technologies: string[] }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${baseURL}/skills`,
    hasDefinedTerm: skills.map(skill => ({
      "@type": "DefinedTerm",
      name: skill.title,
      description: skill.technologies.join(", ")
    }))
  };
}

/**
 * Combine multiple schemas into one
 */
export function combineSchemas(...schemas: any[]) {
  return {
    "@context": "https://schema.org",
    "@graph": schemas
  };
}

/**
 * Format schema for rendering in <script> tag
 */
export function formatSchemaForHTML(schema: any): string {
  return JSON.stringify(schema, null, 2);
}
