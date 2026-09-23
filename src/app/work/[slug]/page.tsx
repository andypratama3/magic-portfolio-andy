import { notFound } from "next/navigation";
import Link from "next/link";
import { getPosts, mdxToPlainText } from "@/utils/utils";
import { baseURL, about, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX, ImageGallery } from "@/components";
import type { Metadata } from "next";
import SchemaScript from "@/components/SchemaScript";

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

  return {
    title: `${post.metadata.title} — Andy Pratama`,
    description: post.metadata.summary,
    openGraph: {
      title: `${post.metadata.title} — Andy Pratama`,
      description: post.metadata.summary,
      url: `${baseURL}${work.path}/${post.slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
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
          <div style={{ marginBottom: "1.5rem" }}>
            <Link
              href="/work"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.875rem",
                color: "var(--text-secondary)",
                textDecoration: "none",
                fontWeight: 500,
                padding: "4px 10px",
                borderRadius: "var(--radius-pill)",
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-surface)",
              }}
            >
              <span aria-hidden="true">←</span>
              <span>All work</span>
            </Link>
          </div>

          <div style={{ marginBottom: "0.75rem" }}>
            <span className="kicker">Case study</span>
          </div>

          <h1
            className="text-h1"
            style={{
              maxWidth: "960px",
              marginBottom: "1.5rem",
              color: "var(--text-primary)",
            }}
          >
            {post.metadata.title}
          </h1>

          <p
            className="text-body-large"
            style={{
              maxWidth: "820px",
              marginBottom: "2rem",
            }}
          >
            {post.metadata.summary}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
              paddingTop: "1.25rem",
              borderTop: "1px solid var(--border-subtle)",
              fontSize: "0.875rem",
              color: "var(--text-muted)",
            }}
          >
            <div>
              <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Author:</span> {person.name}
            </div>
            {post.metadata.publishedAt && (
              <div>
                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Timeline:</span> {formatDate(post.metadata.publishedAt)}
              </div>
            )}
            <div>
              <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Status:</span> Live in Production
            </div>
          </div>
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
                    fontFamily: "var(--font-heading), Newsreader, Georgia, serif",
                    fontSize: "1.25rem",
                    fontWeight: 500,
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
