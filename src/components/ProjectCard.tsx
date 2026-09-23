"use client";

import Link from "next/link";
import Image from "next/image";
import { TiltMedia } from "./TiltMedia";

interface ProjectCardProps {
  href: string;
  images: string[];
  title: string;
  description: string;
  index?: number;
  priority?: boolean;
  featured?: boolean;
  tags?: string[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  description,
  index = 0,
  priority = false,
  featured = false,
  tags = [],
}) => {
  const displayImage = images[0] || "/images/projects/products_shool/dashboard.png";
  const indexFormatted = String(index + 1).padStart(2, "0");

  if (featured) {
    return (
      <article
        className="editorial-card featured-grid"
        style={{
          width: "100%",
          padding: "clamp(1.25rem, 3vw, 2rem)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <span className="kicker">{indexFormatted} — Flagship, still in production</span>
          <h3
            style={{
              fontFamily: "var(--font-heading), Newsreader, Georgia, serif",
              fontSize: "clamp(1.7rem, 3vw, 2.2rem)",
              fontWeight: 500,
              letterSpacing: "-0.018em",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            {title}
          </h3>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.65, color: "var(--text-secondary)", margin: 0 }}>
            {description}
          </p>
          {tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "0.8125rem",
                    padding: "4px 10px",
                    borderRadius: "var(--radius-pill)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div style={{ paddingTop: "0.35rem" }}>
            <Link href={href} className="text-link">
              Read the case study →
            </Link>
          </div>
        </div>

        <TiltMedia>
          <Link
            href={href}
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16/10",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              border: "1px solid var(--border-subtle)",
              display: "block",
            }}
            tabIndex={-1}
            aria-hidden="true"
          >
            <Image
              src={displayImage}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="media-zoom"
              style={{ objectFit: "cover" }}
              priority={priority}
            />
          </Link>
        </TiltMedia>
      </article>
    );
  }

  return (
    <Link href={href} style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}>
      <article className="editorial-card" style={{ display: "flex", flexDirection: "column", overflow: "hidden", height: "100%" }}>
        <TiltMedia>
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16/10",
              overflow: "hidden",
              borderBottom: "1px solid var(--border-subtle)",
              background: "var(--bg-surface-subtle)",
            }}
          >
            <Image
              src={displayImage}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 550px"
              className="media-zoom"
              style={{ objectFit: "cover" }}
              priority={priority}
            />
          </div>
        </TiltMedia>

        <div style={{ padding: "1.4rem 1.5rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.7rem", flex: 1 }}>
          <span className="text-mono-label">{indexFormatted}</span>
          <h3
            style={{
              fontFamily: "var(--font-heading), Newsreader, Georgia, serif",
              fontSize: "1.35rem",
              fontWeight: 500,
              letterSpacing: "-0.015em",
              lineHeight: 1.25,
              margin: 0,
            }}
          >
            {title}
          </h3>
          <p className="line-clamp-3" style={{ fontSize: "0.975rem", lineHeight: 1.6, color: "var(--text-secondary)", margin: 0, flex: 1 }}>
            {description}
          </p>
          <span className="text-link" style={{ width: "fit-content" }}>
            Case study →
          </span>
        </div>
      </article>
    </Link>
  );
};

export default ProjectCard;
