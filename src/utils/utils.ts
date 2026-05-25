import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
};

import { notFound } from 'next/navigation';

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tag: data.tag || [],
    team: data.team || [],
    link: data.link || "",
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    // Create a lightweight HTML representation from MDX plain text
    const plain = mdxToPlainText(content);
    const paragraphs = plain
      .split(/\n\n+/)
      .map((p) => `<p>${p.replace(/\n/g, " ")}</p>`)
      .join("\n");

    return {
      metadata,
      slug,
      content,
      contentHtml: paragraphs,
    };
  });
}

export function getPosts(customPath = ["", "", "", ""]) {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getMDXData(postsDir);
}

// Convert MDX/raw markdown content to a simple plain-text representation
export function mdxToPlainText(mdx: string) {
  if (!mdx) return "";

  let text = mdx;

  // Remove fenced code blocks
  text = text.replace(/```[\s\S]*?```/g, "");

  // Remove HTML/JSX tags
  text = text.replace(/<[^>]+>/g, "");

  // Remove images
  text = text.replace(/!\[[^\]]*\]\([^\)]+\)/g, "");

  // Convert markdown links [text](url) -> text
  text = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1");

  // Inline code and emphasis markers
  text = text.replace(/`([^`]+)`/g, "$1");
  text = text.replace(/\*\*([^*]+)\*\*/g, "$1");
  text = text.replace(/\*([^*]+)\*/g, "$1");
  text = text.replace(/__([^_]+)__/g, "$1");
  text = text.replace(/_([^_]+)_/g, "$1");

  // Remove heading markers
  text = text.replace(/^#{1,6}\s*/gm, "");

  // Collapse multiple newlines
  text = text.replace(/\n{2,}/g, "\n\n");

  return text.trim();
}
