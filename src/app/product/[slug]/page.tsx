import { notFound } from "next/navigation";
import { getPosts, mdxToPlainText } from "@/utils/utils";
import { Meta, Schema, AvatarGroup, Button, Column, Flex, Heading, Media, Text, Carousel } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { Metadata } from "next";
import SchemaScript from "@/components/SchemaScript";
import { typography } from "@/utils/typography";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "product", "items"]);
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

  const posts = getPosts(["src", "app", "product", "items"])
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `product/${post.slug}`,
  });
}

export default async function Project({
  params
}: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  let posts = getPosts(["src", "app", "product", "items"]);
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Column as="main" id="main-content" maxWidth="m" horizontal="center" gap="l" style={{ padding: 'clamp(3rem, 6vw, 6rem) 0' }}>
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`product/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {/* JSON-LD with articleBody (plain-text extract) to help crawlers/AI index content */}
      <SchemaScript
        schemas={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
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
            "@id": `${baseURL}/product/${post.slug}`,
          },
          articleBody: mdxToPlainText(post.content),
        }}
      />
      <Column maxWidth="m" gap="s" fillWidth style={{ maxWidth: '800px' }}>
        <Button data-border="rounded" href="/gallery" variant="tertiary" weight="default" size="s" prefixIcon="chevronLeft" style={{ width: "fit-content" }}>
          Digital Products
        </Button>
        <Heading variant="display-strong-xl" style={{ fontSize: typography.heading.xl, letterSpacing: typography.letterSpacing.normal, lineHeight: typography.lineHeight.normal }}>{post.metadata.title}</Heading>
        <Text variant="body-default-l" onBackground="neutral-weak" style={{ maxWidth: "700px", lineHeight: typography.lineHeight.loose, letterSpacing: typography.letterSpacing.wide }}>
          {post.metadata.summary}
        </Text>
      </Column>

      {post.metadata.images.length > 0 && (
        <Flex fillWidth style={{ margin: 'm 0' }}>
          <Carousel
            sizes="(max-width: 960px) 100vw, 960px"
            items={post.metadata.images.map((image) => ({
              slide: image,
              alt: post.metadata.title,
            }))}
          />
        </Flex>
      )}

      {/* Two column detail page */}
      <Flex fillWidth gap="xl" mobileDirection="column" style={{ marginTop: "m" }}>
        {/* Main Content Area */}
        <Column flex={7} as="article" gap="m">
          {/* Pre-serialized HTML fallback to improve indexability for crawlers/AI */}
          {post.contentHtml && (
            <details style={{ opacity: 0.6, fontSize: "0.85rem", marginBottom: "16px" }}>
              <summary>Text version</summary>
              <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
            </details>
          )}
          <CustomMDX source={post.content} />
        </Column>

        {/* Sidebar Info Area */}
        <Column flex={4} gap="m" style={{ height: "fit-content", position: "sticky", top: "80px" }}>
          {/* Actions Card */}
          <Column padding="20" radius="l" style={{ background: "var(--surface-background, var(--page-background))", border: "1px solid var(--neutral-alpha-weak)", backdropFilter: "blur(8px)", boxShadow: 'var(--shadow-md)' }} gap="s">
            <Text variant="heading-strong-s" style={{ fontSize: typography.heading.m, letterSpacing: typography.letterSpacing.normal, lineHeight: typography.lineHeight.normal }}>Get this Product</Text>
            <Text variant="body-default-m" onBackground="neutral-weak" style={{ lineHeight: typography.lineHeight.relaxed, letterSpacing: typography.letterSpacing.wide }}>
              Purchase a lifetime license or request custom implementation for this system.
            </Text>
            
            <Button 
              fillWidth 
              href={`https://wa.me/6281234567890?text=Hello%20Andy,%20I'm%20interested%20in%20your%20digital%20product:%20${encodeURIComponent(post.metadata.title)}`} 
              variant="primary" 
              weight="default" 
              size="m" 
              suffixIcon="chevronRight"
              style={{ borderRadius: '9999px' }}
            >
              Order & Inquire
            </Button>

            {post.metadata.demo && (
              <Button 
                fillWidth 
                href={post.metadata.demo} 
                variant="secondary" 
                weight="default" 
                size="m" 
                suffixIcon="openLink"
                style={{ borderRadius: '9999px' }}
              >
                Live Demo
              </Button>
            )}
          </Column>

          {/* Tech Stack Card */}
          {post.metadata.tech && post.metadata.tech.length > 0 && (
            <Column padding="20" radius="l" style={{ background: "var(--surface-background, var(--page-background))", border: "1px solid var(--neutral-alpha-weak)", boxShadow: 'var(--shadow-md)' }} gap="s">
              <Text variant="heading-strong-s" style={{ fontSize: typography.heading.m, letterSpacing: typography.letterSpacing.normal, lineHeight: typography.lineHeight.normal }}>Technologies Used</Text>
              <Flex gap="s" wrap>
                {post.metadata.tech.map((t, idx) => (
                  <Flex 
                    key={idx} 
                    radius="m" 
                    style={{ 
                      fontSize: typography.label.s,
                      fontWeight: 500, 
                      padding: "0.5rem 0.875rem",
                      background: "var(--brand-alpha-weak)", 
                      border: "1px solid var(--brand-alpha-medium)",
                      color: "var(--brand-on-background-strong)",
                      borderRadius: 'var(--radius-full)',
                      letterSpacing: typography.letterSpacing.wide,
                    }}
                  >
                    {t}
                  </Flex>
                ))}
              </Flex>
            </Column>
          )}

          {/* Creator Info */}
          <Column padding="20" radius="l" style={{ background: "var(--surface-background, var(--page-background))", border: "1px solid var(--neutral-alpha-weak)", boxShadow: 'var(--shadow-md)' }} gap="s">
            <Text variant="heading-strong-s" style={{ fontSize: typography.heading.m, letterSpacing: typography.letterSpacing.normal, lineHeight: typography.lineHeight.normal }}>Developer</Text>
            <Flex gap="s" vertical="center">
              {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="m" />}
              <Column>
                <Text variant="body-default-s" style={{ fontWeight: 600 }}>{person.name}</Text>
                <Text variant="body-default-xs" onBackground="neutral-weak">{person.location}</Text>
              </Column>
            </Flex>
          </Column>
        </Column>
      </Flex>
      <ScrollToHash />
    </Column>
  );
}
