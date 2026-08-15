import { notFound } from "next/navigation";
import { getPosts, mdxToPlainText } from "@/utils/utils";
import { Meta, Schema, AvatarGroup, Button, Column, Flex, Heading, Media, Text } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { Metadata } from "next";
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

  const posts = getPosts(["src", "app", "work", "projects"])
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${work.path}/${post.slug}`,
  });
}

export default async function Project({
  params
}: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  let post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l" style={{ padding: 'clamp(2rem, 5vw, 6rem) 0' }}>
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
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
            "@id": `${baseURL}${work.path}/${post.slug}`,
          },
          articleBody: mdxToPlainText(post.content),
        }}
      />
      <Column maxWidth="xs" gap="s" style={{ maxWidth: '800px' }}>
        <Button data-border="rounded" href="/work" variant="tertiary" weight="default" size="s" prefixIcon="chevronLeft">
          Projects
        </Button>
        <Heading variant="display-strong-xl" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.015em', lineHeight: '1.2' }}>{post.metadata.title}</Heading>
      </Column>
      {post.metadata.images.length > 0 && (
        <Media
          priority
          aspectRatio="16 / 9"
          radius="m"
          alt="image"
          src={post.metadata.images[0]}
          style={{ boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)' }}
        />
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs" gap="m">
        <Flex gap="s" marginBottom="m" vertical="center">
          {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="m" />}
          <Text variant="body-default-s" onBackground="neutral-weak">
            {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
          </Text>
        </Flex>
        {/* Pre-serialized HTML fallback to improve indexability for crawlers/AI */}
        {post.contentHtml && (
          <details style={{ opacity: 0.6, fontSize: "0.85rem", marginBottom: "16px" }}>
            <summary>Text version</summary>
            <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          </details>
        )}
        <CustomMDX source={post.content} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
