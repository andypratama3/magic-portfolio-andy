"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { isReducedMotion } from "@/lib/gsap/config";

interface CaseStudyHeaderProps {
  title: string;
  summary: string;
  publishedAt?: string;
  authorName: string;
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
    });
  } catch {
    return dateStr;
  }
}

export function CaseStudyHeader({
  title,
  summary,
  publishedAt,
  authorName,
}: CaseStudyHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || isReducedMotion()) return;

    const targets = containerRef.current.querySelectorAll<HTMLElement>(".cs-reveal");
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          clearProps: "transform,opacity",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <div className="cs-reveal" style={{ marginBottom: "1.5rem" }}>
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
            transition: "border-color 0.2s ease, color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--border-medium)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-subtle)";
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
        >
          <span aria-hidden="true">←</span>
          <span>All work</span>
        </Link>
      </div>

      <div className="cs-reveal" style={{ marginBottom: "0.75rem" }}>
        <span className="kicker">Case study</span>
      </div>

      <h1
        className="text-h1 cs-reveal"
        style={{
          maxWidth: "960px",
          marginBottom: "1.5rem",
          color: "var(--text-primary)",
        }}
      >
        {title}
      </h1>

      <p
        className="text-body-large cs-reveal"
        style={{
          maxWidth: "820px",
          marginBottom: "2rem",
        }}
      >
        {summary}
      </p>

      <div
        className="cs-reveal"
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
          <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Author:</span> {authorName}
        </div>
        {publishedAt && (
          <div>
            <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Timeline:</span>{" "}
            {formatDate(publishedAt)}
          </div>
        )}
        <div>
          <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Status:</span> Live in
          Production
        </div>
      </div>
    </div>
  );
}

export default CaseStudyHeader;
