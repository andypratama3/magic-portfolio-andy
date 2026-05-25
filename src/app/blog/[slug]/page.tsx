import { notFound } from "next/navigation";
import { CustomMDX, ScrollToHash } from "@/components";
import { Meta, Schema, AvatarGroup, Button, Column, Heading, HeadingNav, Icon, Row, Text } from "@once-ui-system/core";
import { baseURL, about, blog, person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { getPosts, mdxToPlainText } from "@/utils/utils";
import SchemaScript from "@/components/SchemaScript";
import { Metadata } from 'next';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "blog", "posts"]);
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

  const posts = getPosts(["src", "app", "blog", "posts"])
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${blog.path}/${post.slug}`,
  });
}

export default async function Blog({
  params
}: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  let post = getPosts(["src", "app", "blog", "posts"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Row fillWidth>
      <Row maxWidth={12} hide="m" />
      <Row fillWidth horizontal="center">
        <Column as="section" maxWidth="xs" gap="l">
          <Schema
            as="blogPosting"
            baseURL={baseURL}
            path={`${blog.path}/${post.slug}`}
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
                "@id": `${baseURL}${blog.path}/${post.slug}`,
              },
              articleBody: mdxToPlainText(post.content),
            }}
          />
          <Button data-border="rounded" href="/blog" weight="default" variant="tertiary" size="s" prefixIcon="chevronLeft">
            Posts
          </Button>
          <Heading variant="display-strong-s">{post.metadata.title}</Heading>
          <Row gap="12" vertical="center">
            {avatars.length > 0 && <AvatarGroup size="s" avatars={avatars} />}
            <Text variant="body-default-s" onBackground="neutral-weak">
              {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
            </Text>
          </Row>
          <Column as="article" fillWidth>
            {/* Pre-serialized HTML fallback to improve indexability for crawlers/AI */}
            {post.contentHtml && (
              <details>
                <summary>Text version</summary>
                <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
              </details>
            )}
            <CustomMDX source={post.content} />
          </Column>
          <ScrollToHash />
        </Column>
      </Row>
      <Column maxWidth={12} paddingLeft="40" fitHeight position="sticky" top="80" gap="16" hide="m">
        <Row
          gap="12"
          paddingLeft="2"
          vertical="center"
          onBackground="neutral-medium"
          textVariant="label-default-s"
        >
          <Icon name="document" size="xs" />
          On this page
        </Row>
        <HeadingNav fitHeight />
      </Column>
    </Row>
  );
}
