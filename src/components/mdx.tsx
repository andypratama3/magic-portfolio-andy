import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ImageGallery } from "@/components/ImageGallery";

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  if (href.startsWith("/")) {
    return (
      <Link
        href={href}
        style={{
          color: "var(--text-primary)",
          fontWeight: 600,
          textDecoration: "underline",
          textUnderlineOffset: "4px",
        }}
        {...props}
      >
        {children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a
        href={href}
        style={{
          color: "var(--text-primary)",
          fontWeight: 600,
          textDecoration: "underline",
          textUnderlineOffset: "4px",
        }}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: "var(--text-primary)",
        fontWeight: 600,
        textDecoration: "underline",
        textUnderlineOffset: "4px",
      }}
      {...props}
    >
      {children}
    </a>
  );
}

function createImage({ alt, src, ...rest }: React.ImgHTMLAttributes<HTMLImageElement>) {
  if (!src) return null;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
        margin: "2rem 0",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <Image
        src={src}
        alt={alt || "Project Visual"}
        fill
        sizes="(max-width: 960px) 100vw, 860px"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}

function createHeading(level: 1 | 2 | 3 | 4) {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  const fontSizes = {
    1: "var(--font-h1)",
    2: "clamp(1.5rem, 2.75vw, 2rem)",
    3: "clamp(1.2rem, 2vw, 1.5rem)",
    4: "1.125rem",
  };

  const HeadingComponent = ({ children, ...props }: { children: ReactNode }) => {
    const slug = typeof children === "string" ? slugify(children) : "";

    return (
      <HeadingTag
        id={slug}
        style={{
          fontFamily: "var(--font-heading), Newsreader, Georgia, serif",
          fontSize: fontSizes[level],
          fontWeight: 500,
          letterSpacing: "-0.015em",
          lineHeight: 1.28,
          color: "var(--text-primary)",
          marginTop: level === 1 ? "2rem" : level === 2 ? "2.5rem" : "1.75rem",
          marginBottom: "1rem",
        }}
        {...props}
      >
        {children}
      </HeadingTag>
    );
  };

  HeadingComponent.displayName = `CustomH${level}`;
  return HeadingComponent;
}

function CustomParagraph(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      style={{
        fontSize: "1rem",
        lineHeight: 1.75,
        color: "var(--text-secondary)",
        marginTop: "0.5rem",
        marginBottom: "1.25rem",
      }}
      {...props}
    />
  );
}

function CustomCode(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      style={{
        fontFamily: "var(--font-code, monospace)",
        fontSize: "0.85em",
        padding: "0.2em 0.4em",
        borderRadius: "var(--radius-sm)",
        background: "var(--bg-surface-subtle)",
        border: "1px solid var(--border-subtle)",
        color: "var(--text-primary)",
      }}
      {...props}
    />
  );
}

function CustomPre(props: React.HTMLAttributes<HTMLPreElement>) {
  return (
    <pre
      style={{
        fontFamily: "var(--font-code, monospace)",
        fontSize: "0.875rem",
        lineHeight: 1.6,
        padding: "1.25rem",
        borderRadius: "var(--radius-md)",
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        overflowX: "auto",
        margin: "1.5rem 0",
      }}
      {...props}
    />
  );
}

function CustomBlockquote(props: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      style={{
        borderLeft: "3px solid var(--accent-primary)",
        paddingLeft: "1.25rem",
        margin: "1.5rem 0",
        fontStyle: "italic",
        color: "var(--text-secondary)",
      }}
      {...props}
    />
  );
}

function CustomTable(props: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div style={{ width: "100%", overflowX: "auto", margin: "1.5rem 0" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "0.9375rem",
          border: "1px solid var(--border-subtle)",
        }}
        {...props}
      />
    </div>
  );
}

function CustomTh(props: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) {
  return (
    <th
      style={{
        padding: "0.75rem 1rem",
        textAlign: "left",
        fontWeight: 600,
        background: "var(--bg-surface-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
      {...props}
    />
  );
}

function CustomTd(props: React.TdHTMLAttributes<HTMLTableDataCellElement>) {
  return (
    <td
      style={{
        padding: "0.75rem 1rem",
        borderBottom: "1px solid var(--border-subtle)",
      }}
      {...props}
    />
  );
}

const components = {
  p: CustomParagraph,
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  img: createImage,
  a: CustomLink,
  code: CustomCode,
  pre: CustomPre,
  blockquote: CustomBlockquote,
  table: CustomTable,
  th: CustomTh,
  td: CustomTd,
  ImageGallery,
};

type CustomMDXProps = MDXRemoteProps & {
  components?: Record<string, React.ComponentType<any>>;
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote {...props} components={{ ...components, ...(props.components || {}) } as any} />
  );
}

export default CustomMDX;