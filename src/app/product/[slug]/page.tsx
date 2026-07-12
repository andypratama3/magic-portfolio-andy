import { notFound } from "next/navigation";
import { getPosts, mdxToPlainText } from "@/utils/utils";
import { Meta, Schema, AvatarGroup, Button, Column, Flex, Heading, Media, Text, Carousel } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { Metadata } from "next";
import SchemaScript from "@/components/SchemaScript";

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

  console.log("DEBUG PRODUCT ROUTE - slugPath:", slugPath, "available:", posts.map(p => p.slug), "found:", !!post);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
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
      <Column maxWidth="m" gap="24" fillWidth>
        <Button data-border="rounded" href="/gallery" variant="tertiary" weight="default" size="s" prefixIcon="chevronLeft" style={{ width: "fit-content" }}>
          Digital Products
        </Button>
        <Heading variant="display-strong-s">{post.metadata.title}</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak" style={{ maxWidth: "700px" }}>
          {post.metadata.summary}
        </Text>
      </Column>

      {post.metadata.images.length > 0 && (
        <Flex fillWidth>
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
      <Flex fillWidth gap="xl" mobileDirection="column" style={{ marginTop: "24px" }}>
        {/* Main Content Area */}
        <Column flex={7} as="article" gap="16">
          {/* Pre-serialized HTML fallback to improve indexability for crawlers/AI */}
          {post.contentHtml && (
            <details style={{ opacity: 0.5, fontSize: "0.85rem", marginBottom: "16px" }}>
              <summary>Text version</summary>
              <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
            </details>
          )}
          <CustomMDX source={post.content} />
        </Column>

        {/* Sidebar Info Area */}
        <Column flex={4} gap="24" style={{ height: "fit-content", position: "sticky", top: "80px" }}>
          {/* Actions Card */}
          <Column padding="24" radius="l" style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", backdropFilter: "blur(8px)" }} gap="16">
            <Text variant="heading-strong-xs">Get this Product</Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Purchase a lifetime license or request custom implementation for this system.
            </Text>
            
            <Button 
              fillWidth 
              href={`https://wa.me/6281234567890?text=Hello%20Andy,%20I'm%20interested%20in%20your%20digital%20product:%20${encodeURIComponent(post.metadata.title)}`} 
              variant="primary" 
              weight="default" 
              size="m" 
              suffixIcon="chevronRight"
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
              >
                Live Demo
              </Button>
            )}
          </Column>

          {/* Tech Stack Card */}
          {post.metadata.tech && post.metadata.tech.length > 0 && (
            <Column padding="24" radius="l" style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)" }} gap="16">
              <Text variant="heading-strong-xs">Technologies Used</Text>
              <Flex gap="8" wrap>
                {post.metadata.tech.map((t, idx) => (
                  <Flex 
                    key={idx} 
                    radius="m" 
                    style={{ 
                      fontSize: "0.75rem", 
                      fontWeight: 600, 
                      padding: "6px 12px",
                      background: "rgba(255,255,255,0.06)", 
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.9)"
                    }}
                  >
                    {t}
                  </Flex>
                ))}
              </Flex>
            </Column>
          )}

          {/* Creator Info */}
          <Column padding="24" radius="l" style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)" }} gap="12">
            <Text variant="heading-strong-xs">Developer</Text>
            <Flex gap="12" vertical="center">
              {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="m" />}
              <Column>
                <Text variant="body-default-s" style={{ fontWeight: 600 }}>{person.name}</Text>
                <Text variant="body-default-xs" onBackground="neutral-weak">Samarinda, Indonesia</Text>
              </Column>
            </Flex>
          </Column>
        </Column>
      </Flex>
      <ScrollToHash />
    </Column>
  );
}
