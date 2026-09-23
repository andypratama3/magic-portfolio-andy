"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { setupMagneticButton } from "@/lib/gsap/animations";
import { LiveClock } from "./LiveClock";

interface HeroSectionProps {
  personAvatar?: string;
}

export function HeroSection({ personAvatar = "/images/photo.jpg" }: HeroSectionProps) {
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);
  const secondaryBtnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const cleanupPrimary = setupMagneticButton(primaryBtnRef.current, 0.18);
    const cleanupSecondary = setupMagneticButton(secondaryBtnRef.current, 0.18);
    return () => {
      cleanupPrimary();
      cleanupSecondary();
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
          className="text-display hero-rise hero-rise-delay-1"
          style={{ maxWidth: "18ch", marginBottom: "1.5rem" }}
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
              style={{
                position: "relative",
                width: "46px",
                height: "46px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "1px solid var(--border-subtle)",
                flexShrink: 0,
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
      </div>
    </section>
  );
}

export default HeroSection;
