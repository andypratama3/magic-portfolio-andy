import "@/resources/custom.css";
import classNames from "classnames";
import type { Metadata } from "next";
import { Footer, Header, RouteGuard, Providers } from "@/components";
import { GSAPProvider } from "@/components/GSAPProvider";
import { SkipLink } from "@/components/SkipLink";
import { baseURL, fonts, home } from "@/resources";
import { SpeedInsights } from "@vercel/speed-insights/next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(baseURL),
    title: {
      default: home.title,
      template: "%s | Andy Pratama",
    },
    description: home.description,
    openGraph: {
      title: home.title,
      description: home.description,
      url: baseURL,
      siteName: "Andy Pratama",
      images: [
        {
          url: home.image,
          width: 1200,
          height: 630,
          alt: home.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: home.title,
      description: home.description,
      images: [home.image],
    },
    icons: {
      icon: "/favicon.ico",
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
        <link rel="canonical" href={`${baseURL}/`} />
        <link rel="alternate" hrefLang="id" href={`${baseURL}/`} />
        <link rel="alternate" hrefLang="en" href={`${baseURL}/`} />
        <link rel="alternate" hrefLang="x-default" href={`${baseURL}/`} />
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
                    name: "Andy Pratama — Software Engineer",
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
            style={{
              width: "100%",
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "64px",
            }}
          >
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <RouteGuard>
                <GSAPProvider>{children}</GSAPProvider>
              </RouteGuard>
            </div>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
