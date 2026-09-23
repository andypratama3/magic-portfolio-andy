import "@/resources/custom.css";
import classNames from "classnames";
import type { Metadata, Viewport } from "next";
import { Footer, Header, RouteGuard, Providers } from "@/components";
import { GSAPProvider } from "@/components/GSAPProvider";
import { SkipLink } from "@/components/SkipLink";
import { SiteAtmosphere } from "@/components/SiteAtmosphere";
import { baseURL, fonts, home } from "@/resources";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3F1EA" },
    { media: "(prefers-color-scheme: dark)", color: "#0E0D0B" },
  ],
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(baseURL),
    title: {
      default: home.title,
      template: "%s | Andy Pratama",
    },
    description: home.description,
    applicationName: "Andy Pratama | Software Engineer",
    authors: [{ name: "Andy Pratama", url: `${baseURL}${home.path}` }],
    creator: "Andy Pratama",
    publisher: "Andy Pratama",
    category: "Engineering Portfolio",
    keywords: [
      "Andy Pratama",
      "Fullstack Software Engineer",
      "Laravel Developer",
      "PHP Developer",
      "Next.js Developer",
      "React Developer",
      "TypeScript",
      "Backend Engineer",
      "REST API",
      "Samarinda",
      "Indonesia",
      "Software Engineer Portfolio",
      "Web Developer",
      "DevOps",
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `${baseURL}${home.path}`,
      languages: {
        en: `${baseURL}${home.path}`,
        id: `${baseURL}${home.path}`,
        "x-default": `${baseURL}${home.path}`,
      },
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: home.title,
      description: home.description,
      url: `${baseURL}${home.path}`,
      siteName: "Andy Pratama",
      countryName: "Indonesia",
      images: [
        {
          url: `${baseURL}${home.image}`,
          width: 1920,
          height: 1200,
          alt: home.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@andypratama3",
      creator: "@andypratama3",
      title: home.title,
      description: home.description,
      images: [`${baseURL}${home.image}`],
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png", sizes: "32x32" },
      ],
      shortcut: "/favicon.ico",
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    manifest: `${baseURL}/manifest.webmanifest`,
    other: {
      "geo.region": "ID-KI",
      "geo.placename": "Samarinda, East Kalimantan, Indonesia",
      "geo.position": "-0.5022;117.1537",
      ICBM: "-0.5022, 117.1537",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable
      )}
    >
      <head>
        <meta name="google-site-verification" content="4ycIf0n_hJhGXE5tc2Xv3OHLhUkIofJUSQkj0wsaUo8" />
        <meta name="author" content="Andy Pratama" />
        <meta name="creator" content="Andy Pratama" />
        <meta name="format-detection" content="telephone=no" />
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', savedTheme);
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning style={{ minHeight: "100vh", margin: 0, padding: 0 }}>
        <Providers>
          <SpeedInsights />
          <SkipLink />
          <SiteAtmosphere />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "Person",
                    "@id": `${baseURL}/#person`,
                    name: "Andy Pratama",
                    givenName: "Andy",
                    familyName: "Pratama",
                    jobTitle: "Software Engineer",
                    description:
                      "Software Engineer with 3+ years of hands-on experience building production-oriented full-stack applications, specializing in Laravel/PHP backend engineering with practical experience across Next.js, React, TypeScript, databases, APIs, DevOps, and automation.",
                    url: baseURL,
                    email: "andypratama1211@gmail.com",
                    sameAs: [
                      "https://github.com/andypratama3",
                      "https://www.linkedin.com/in/andypratama3",
                      "https://www.instagram.com/andypratama3_",
                      "https://x.com/andypratama3",
                    ],
                    image: {
                      "@type": "ImageObject",
                      url: `${baseURL}/images/photo.jpg`,
                      width: 400,
                      height: 400,
                    },
                    address: {
                      "@type": "PostalAddress",
                      addressLocality: "Samarinda",
                      addressRegion: "East Kalimantan",
                      addressCountry: "ID",
                    },
                    knowsAbout: [
                      "Laravel Backend Engineering",
                      "PHP Development",
                      "REST API Design",
                      "Database Design & Optimization",
                      "Next.js Full Stack Development",
                      "React.js",
                      "TypeScript",
                      "DevOps & Infrastructure",
                      "Docker",
                      "Linux Server Administration",
                      "GitHub Actions CI/CD",
                      "Performance Optimization",
                      "Third-Party Integrations",
                      "Midtrans Payment Gateway",
                      "WhatsApp Business API",
                    ],
                    hasOccupation: {
                      "@type": "Occupation",
                      name: "Software Engineer",
                      description: "Building scalable web applications and systems",
                      occupationLocation: {
                        "@type": "City",
                        name: "Samarinda, Indonesia",
                      },
                    },
                  },
                  {
                    "@type": "WebSite",
                    "@id": `${baseURL}/#website`,
                    url: baseURL,
                    name: "Andy Pratama | Software Engineer",
                    description:
                      "Professional engineering portfolio, projects, and case studies of Andy Pratama, Software Engineer.",
                    mainEntity: { "@id": `${baseURL}/#person` },
                    creator: { "@id": `${baseURL}/#person` },
                    inLanguage: "en-US",
                  },
                ],
              }),
            }}
          />
          <Header />
          <main
            id="main-content"
            className="page-shell"
            style={{
              minHeight: "100vh",
              paddingTop: "64px",
            }}
          >
            <RouteGuard>
              <GSAPProvider>{children}</GSAPProvider>
            </RouteGuard>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
