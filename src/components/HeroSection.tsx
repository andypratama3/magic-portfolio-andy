"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { home } from "@/resources";
import { setupMagneticButton, animateSplitText } from "@/lib/gsap/animations";
import { LiveClock } from "./LiveClock";

interface HeroSectionProps {
  personAvatar?: string;
}

export function HeroSection({ personAvatar = "/images/photo.jpg" }: HeroSectionProps) {
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);
  const secondaryBtnRef = useRef<HTMLAnchorElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const cleanupPrimary = setupMagneticButton(primaryBtnRef.current, 0.18);
    const cleanupSecondary = setupMagneticButton(secondaryBtnRef.current, 0.18);
    const cleanupSplit = animateSplitText(headlineRef.current, {
      type: "words",
      stagger: 0.08,
      duration: 0.75,
      delay: 0.22,
    });
    return () => {
      cleanupPrimary();
      cleanupSecondary();
      cleanupSplit();
    };
  }, []);

  return (
    <section
      style={{
        width: "100%",
        paddingTop: "clamp(3.25rem, 8vw, 6.25rem)",
        paddingBottom: "clamp(2.75rem, 6vw, 4.75rem)",
      }}
    >
      <div className="layout-container">
        <div className="hero-rise" style={{ marginBottom: "1.35rem" }}>
          <span className="kicker">
            Software engineer · Samarinda · <LiveClock />
          </span>
        </div>

        <h1
          ref={headlineRef}
          className="text-display hero-rise hero-rise-delay-1"
          style={{
            maxWidth: "18ch",
            marginBottom: "1.5rem",
            visibility: "hidden",
          }}
        >
          I build the software schools and businesses <em>actually run on.</em>
        </h1>

        <p
          className="text-body-large hero-rise hero-rise-delay-2"
          style={{ maxWidth: "38rem", marginBottom: "2.25rem" }}
        >
          I&apos;m Andy. For three years I&apos;ve been the engineer behind live systems: a
          52-module school platform, a provincial government portal, and multi-branch ERP, not
          mockups sitting in a folder.
        </p>

        <div className="hero-meta hero-rise hero-rise-delay-3">
          <div>
            <div className="text-mono-label" style={{ marginBottom: "4px" }}>Based in</div>
            <div style={{ fontSize: "0.975rem", fontWeight: 600 }}>Samarinda</div>
            <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>Remote-friendly</div>
          </div>
          <div>
            <div className="text-mono-label" style={{ marginBottom: "4px" }}>Usually building</div>
            <div style={{ fontSize: "0.975rem", fontWeight: 600 }}>Laravel &amp; Next.js</div>
            <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>APIs, data, the unglamorous parts</div>
          </div>
          <div>
            <div className="text-mono-label" style={{ marginBottom: "4px" }}>Right now</div>
            <div style={{ fontSize: "0.975rem", fontWeight: 600 }}>ProductSchool</div>
            <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>893 routes in production</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              ref={avatarRef}
              style={{
                position: "relative",
                width: "46px",
                height: "46px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "1px solid var(--border-subtle)",
                flexShrink: 0,
                transition: "transform 0.35s var(--ease-editorial), border-color 0.2s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.borderColor = "var(--border-medium)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.borderColor = "var(--border-subtle)";
              }}
            >
              <Image
                src={personAvatar}
                alt="Andy Pratama"
                fill
                sizes="46px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <div>
              <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>Andy Pratama</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Open for the next build</div>
            </div>
          </div>
        </div>

        <div className="stack-actions hero-rise hero-rise-delay-4">
          <Link ref={primaryBtnRef} href="#selected-work" className="btn-primary">
            <span>See selected work</span>
            <span aria-hidden="true">↓</span>
          </Link>
          <Link ref={secondaryBtnRef} href="/#contact" className="btn-secondary">
            <span>Write to me</span>
          </Link>
        </div>

        {/* Featured project banner — rendered only when display:true in content.js */}
        {home.featured?.display && (
          <Link
            href={home.featured.href}
            className="hero-featured-banner hero-rise"
            style={{
              marginTop: "2rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.65rem",
              padding: "0.6rem 1rem",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-subtle)",
              background: "var(--bg-surface)",
              textDecoration: "none",
              color: "inherit",
              fontSize: "0.875rem",
              transition:
                "border-color 0.22s var(--ease-smooth), transform 0.22s var(--ease-editorial), box-shadow 0.22s var(--ease-smooth)",
              animationDelay: "0.44s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--border-medium)";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(26,24,20,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-subtle)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "var(--status-live)",
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
            <span style={{ color: "var(--text-muted)", whiteSpace: "nowrap" }}>
              {home.featured.title}
            </span>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ color: "var(--text-muted)", flexShrink: 0 }}
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </Link>
        )}
      </div>
    </section>
  );
}

export default HeroSection;
