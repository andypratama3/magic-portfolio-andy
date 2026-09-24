import { notFound } from "next/navigation";
import Link from "next/link";
import { getPosts, mdxToPlainText } from "@/utils/utils";
import { baseURL, about, person, work } from "@/resources";
import { ScrollToHash, CustomMDX, ImageGallery } from "@/components";
import type { Metadata } from "next";
import SchemaScript from "@/components/SchemaScript";
import { CaseStudyHeader } from "@/components/work/CaseStudyHeader";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  const posts = getPosts(["src", "app", "work", "projects"]);
  const post = posts.find((p) => p.slug === slugPath);

  if (!post) return {};

  const ogImage = post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`;
  const canonicalUrl = `${baseURL}${work.path}/${post.slug}`;

  return {
    title: `${post.metadata.title} | Andy Pratama`,
    description: post.metadata.summary,
    alternates: {
      canonical: canonicalUrl,
    },
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
    openGraph: {
      title: `${post.metadata.title} | Andy Pratama`,
      description: post.metadata.summary,
      url: canonicalUrl,
      siteName: "Andy Pratama",
      countryName: "Indonesia",
      images: [
        {
          url: ogImage,
          width: 1280,
          height: 720,
          alt: post.metadata.title,
        },
      ],
      locale: "en_US",
      type: "article",
      authors: [person.name],
      publishedTime: post.metadata.publishedAt,
      tags: post.metadata.tech || [],
    },
    twitter: {
      card: "summary_large_image",
      site: "@andypratama3",
      creator: "@andypratama3",
      title: `${post.metadata.title} | Andy Pratama`,
      description: post.metadata.summary,
      images: [ogImage],
    },
  };
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  const post = getPosts(["src", "app", "work", "projects"]).find((p) => p.slug === slugPath);

  if (!post) {
    notFound();
  }

  const related = getPosts(["src", "app", "work", "projects"])
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  return (
    <div style={{ width: "100%", paddingBottom: "clamp(4rem, 8vw, 7rem)" }}>
      
      <SchemaScript
        schemas={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: post.metadata.title,
          description: post.metadata.summary,
          datePublished: post.metadata.publishedAt,
          dateModified: post.metadata.publishedAt,
          author: {
            "@type": "Person",
            name: person.name,
            url: `${baseURL}${about.path}`,
          },
          image: post.metadata.image || `${baseURL}/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${baseURL}${work.path}/${post.slug}`,
          },
          articleBody: mdxToPlainText(post.content),
        }}
      />

      {/* Case Study Header Banner */}
      <section
        style={{
          width: "100%",
          paddingTop: "clamp(2.5rem, 5vw, 4rem)",
          paddingBottom: "clamp(2rem, 4vw, 3rem)",
          borderBottom: "1px solid var(--border-subtle)",
          marginBottom: "3rem",
        }}
      >
        <div className="layout-container">
          <CaseStudyHeader
            title={post.metadata.title}
            summary={post.metadata.summary}
            publishedAt={post.metadata.publishedAt}
            authorName={person.name}
          />
        </div>
      </section>

      {/* High-Resolution Screenshot Gallery */}
      {post.metadata.images && post.metadata.images.length > 0 && (
        <div className="layout-container" style={{ marginBottom: "3.5rem" }}>
          <ImageGallery
            images={post.metadata.images}
            title="System Interface & Module Architecture"
            columns={2}
          />
        </div>
      )}

      {/* Technical Prose Content */}
      <div className="layout-container">
        <article className="layout-prose">
          <CustomMDX source={post.content} />
        </article>
      </div>

      {related.length > 0 && (
        <div className="layout-container" style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--border-subtle)" }}>
          <p className="kicker" style={{ marginBottom: "1.25rem" }}>Keep reading</p>
          <div className="related-grid">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/work/${item.slug}`}
                className="editorial-card"
                style={{
                  padding: "1.15rem 1.25rem",
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    marginBottom: "0.35rem",
                  }}
                >
                  {item.metadata.title}
                </div>
                <div className="line-clamp-3" style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                  {item.metadata.summary}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <ScrollToHash />
    </div>
  );
}
