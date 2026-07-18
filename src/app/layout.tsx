import '@once-ui-system/core/css/styles.css';
import '@once-ui-system/core/css/tokens.css';
import '@/resources/custom.css'

import classNames from "classnames";

import { Background, Column, Flex, Meta, opacity, SpacingToken } from "@once-ui-system/core";
import { Footer, Header, RouteGuard, Providers } from '@/components';
import { baseURL, effects, fonts, style, dataStyle, home } from '@/resources';

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang="en"
      fillWidth
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >
      <head>
        <meta name="google-site-verification" content="4ycIf0n_hJhGXE5tc2Xv3OHLhUkIofJUSQkj0wsaUo8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="description" content="Portfolio of Andy Pratama — Fullstack Developer specializing in Laravel 10+, Next.js 14+, React.js. Building production-grade web systems for education, government, and commercial sectors." />
        <meta name="keywords" content="fullstack developer, Laravel, Next.js, React, PHP, TypeScript, web development, API design, Indonesia developer, remote developer" />
        <meta name="author" content="Andy Pratama" />
        <meta name="creator" content="Andy Pratama" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://andypratama.studio/" />
        <link rel="alternate" hrefLang="id" href="https://andypratama.studio/" />
        <link rel="alternate" hrefLang="en" href="https://andypratama.studio/" />
        <link rel="alternate" hrefLang="x-default" href="https://andypratama.studio/" />
        <link rel="profile" href="http://gmpg.org/xfn/11" />
        <link rel="pingback" href="https://andypratama.studio/xmlrpc.php" />
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const root = document.documentElement;
                  const defaultTheme = 'system';
                  
                  // Set defaults from config
                  const config = ${JSON.stringify({
                    brand: style.brand,
                    accent: style.accent,
                    neutral: style.neutral,
                    solid: style.solid,
                    'solid-style': style.solidStyle,
                    border: style.border,
                    surface: style.surface,
                    transition: style.transition,
                    scaling: style.scaling,
                    'viz-style': dataStyle.variant,
                  })};
                  
                  // Apply default values
                  Object.entries(config).forEach(([key, value]) => {
                    root.setAttribute('data-' + key, value);
                  });
                  
                  // Resolve theme
                  const resolveTheme = (themeValue) => {
                    if (!themeValue || themeValue === 'system') {
                      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    }
                    return themeValue;
                  };
                  
                  // Apply saved theme
                  const savedTheme = localStorage.getItem('data-theme');
                  const resolvedTheme = resolveTheme(savedTheme);
                  root.setAttribute('data-theme', resolvedTheme);
                  
                  // Apply any saved style overrides
                  const styleKeys = Object.keys(config);
                  styleKeys.forEach(key => {
                    const value = localStorage.getItem('data-' + key);
                    if (value) {
                      root.setAttribute('data-' + key, value);
                    }
                  });
                } catch (e) {
                  console.error('Failed to initialize theme:', e);
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <Providers>
        <Column as="body" background="page" fillWidth style={{minHeight: "100vh"}} margin="0" padding="0" horizontal="center">
          <Background
            position="fixed"
            mask={{
              x: effects.mask.x,
              y: effects.mask.y,
              radius: effects.mask.radius,
              cursor: effects.mask.cursor,
            }}
            gradient={{
              display: effects.gradient.display,
              opacity: effects.gradient.opacity as opacity,
              x: effects.gradient.x,
              y: effects.gradient.y,
              width: effects.gradient.width,
              height: effects.gradient.height,
              tilt: effects.gradient.tilt,
              colorStart: effects.gradient.colorStart,
              colorEnd: effects.gradient.colorEnd,
            }}
            dots={{
              display: effects.dots.display,
              opacity: effects.dots.opacity as opacity,
              size: effects.dots.size as SpacingToken,
              color: effects.dots.color,
            }}
            grid={{
              display: effects.grid.display,
              opacity: effects.grid.opacity as opacity,
              color: effects.grid.color,
              width: effects.grid.width,
              height: effects.grid.height,
            }}
            lines={{
              display: effects.lines.display,
              opacity: effects.lines.opacity as opacity,
              size: effects.lines.size as SpacingToken,
              thickness: effects.lines.thickness,
              angle: effects.lines.angle,
              color: effects.lines.color,
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@graph': [
                  {
                    '@type': 'Person',
                    '@id': 'https://andypratama.studio/#person',
                    name: 'Andy Pratama',
                    givenName: 'Andy',
                    familyName: 'Pratama',
                    jobTitle: 'Fullstack Developer',
                    description: 'Fullstack Developer specializing in Laravel, Next.js, and production-grade web systems for education, government, and commercial sectors.',
                    url: 'https://andypratama.studio',
                    email: 'andypratama1211@gmail.com',
                    sameAs: [
                      'https://github.com/andypratama3',
                      'https://www.linkedin.com/in/andypratama3',
                      'https://www.tiktok.com/@andypratama3_',
                    ],
                    image: {
                      '@type': 'ImageObject',
                      url: 'https://andypratama.studio/images/photo.jpg',
                      width: 400,
                      height: 400,
                    },
                    address: {
                      '@type': 'PostalAddress',
                      addressLocality: 'Samarinda',
                      addressRegion: 'East Kalimantan',
                      addressCountry: 'ID',
                    },
                    knowsAbout: [
                      'Laravel 10+',
                      'Next.js 14+',
                      'React.js 18+',
                      'PHP 8+',
                      'TypeScript',
                      'REST API Development',
                      'Database Design & Optimization',
                      'DevOps & Cloud Infrastructure',
                      'Software Architecture',
                      'Security Hardening',
                      'Performance Optimization',
                      'Fullstack Development',
                      'Web Systems',
                      'Education Technology',
                      'Government Systems',
                      'E-Commerce Solutions',
                      'Cloudflare',
                      'AWS',
                      'Docker',
                      'GitHub Actions CI/CD',
                    ],
                    hasOccupation: {
                      '@type': 'Occupation',
                      name: 'Software Developer',
                      description: 'Building scalable web applications and systems',
                      occupationLocation: {
                        '@type': 'City',
                        name: 'Samarinda, Indonesia',
                      },
                    },
                  },
                  {
                    '@type': 'ProfessionalService',
                    '@id': 'https://andypratama.studio/#service',
                    name: 'Andy Pratama - Fullstack Development Services',
                    description: 'Professional fullstack development services specializing in Laravel and Next.js for web systems, APIs, and enterprise applications.',
                    url: 'https://andypratama.studio',
                    email: 'andypratama1211@gmail.com',
                    serviceType: [
                      'Full-Stack Web Development',
                      'Backend API Development',
                      'Frontend Development',
                      'REST API Design',
                      'Database Architecture',
                      'System Architecture & Design',
                      'Performance Optimization',
                      'Security Implementation',
                      'DevOps & Cloud Solutions',
                      'Technical Consulting',
                    ],
                    areaServed: [
                      {
                        '@type': 'Country',
                        name: 'Indonesia',
                      },
                      {
                        '@type': 'Country',
                        name: 'International (Remote)',
                      },
                    ],
                    availableLanguage: [
                      {
                        '@type': 'Language',
                        name: 'Indonesian',
                      },
                      {
                        '@type': 'Language',
                        name: 'English',
                      },
                    ],
                    founder: {
                      '@type': 'Person',
                      name: 'Andy Pratama',
                      url: 'https://andypratama.studio',
                    },
                  },
                  {
                    '@type': 'WebSite',
                    '@id': 'https://andypratama.studio/#website',
                    url: 'https://andypratama.studio',
                    name: 'Andy Pratama — Fullstack Developer',
                    description: 'Professional portfolio, projects, and case studies of Andy Pratama, Fullstack Developer specializing in Laravel, Next.js, and production-grade web systems.',
                    mainEntity: { '@id': 'https://andypratama.studio/#person' },
                    creator: { '@id': 'https://andypratama.studio/#person' },
                    inLanguage: 'en-US',
                    potentialAction: {
                      '@type': 'SearchAction',
                      target: {
                        '@type': 'EntryPoint',
                        urlTemplate: 'https://andypratama.studio/search?q={search_term_string}',
                      },
                      'query_input': 'required name=search_term_string',
                    },
                  },
                ],
              })
            }}
          />
          <Flex fillWidth minHeight="16" hide="s"/>
          <Header />
          <Flex
            zIndex={0}
            fillWidth
            padding="l"
            horizontal="center"
            flex={1}
          >
            <Flex horizontal="center" fillWidth minHeight="0">
              <RouteGuard>
                {children}
              </RouteGuard>
            </Flex>
          </Flex>
          <Footer/>
          </Column>
        </Providers>
      </Flex>
  );
}
