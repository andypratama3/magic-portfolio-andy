"use client";

import { useEffect, useRef } from "react";
import { person } from "@/resources";
import { LiveClock } from "./LiveClock";
import { SocialLinks } from "./SocialLinks";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion } from "@/lib/gsap/config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current || isReducedMotion()) return;
    const targets = footerRef.current.querySelectorAll<HTMLElement>(".footer-reveal");
    if (!targets.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 96%",
            once: true,
          },
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      style={{
        width: "100%",
        borderTop: "1px solid var(--border-subtle)",
        padding: "2rem 0 calc(2rem + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <div className="layout-container">
        {/* Availability tagline — one line above the strip */}
        <div
          className="footer-reveal"
          style={{
            marginBottom: "1.25rem",
            paddingBottom: "1.25rem",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              fontSize: "0.875rem",
              color: "var(--text-secondary)",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "var(--status-live)",
                display: "inline-block",
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
            Open to remote roles and contracts.
          </span>
          <a
            href="/#contact"
            style={{
              fontSize: "0.875rem",
              color: "var(--text-primary)",
              fontWeight: 600,
              textDecoration: "none",
              borderBottom: "1px solid currentColor",
              paddingBottom: "1px",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            Get in touch
          </a>
        </div>

        {/* Main strip */}
        <div className="site-footer-inner">
          <p
            className="footer-reveal"
            style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-secondary)" }}
          >
            © {currentYear} {person.name}
          </p>
          <p
            className="site-footer-clock footer-reveal"
            style={{
              margin: 0,
              fontSize: "0.875rem",
              color: "var(--text-muted)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            <LiveClock variant="long" />
          </p>
          <div className="footer-reveal">
            <SocialLinks includeEmail />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
