"use client";

import { useEffect, useRef } from "react";
import { animateStaggeredCards, animateCountUp } from "@/lib/gsap/animations";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion } from "@/lib/gsap/config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const metrics = [
  {
    value: 893,
    suffix: "",
    label: "Production routes",
    sub: "ProductSchool: 708 web, 185 API",
    /* progress bar: % of a meaningful ceiling */
    barPct: 89,
  },
  {
    value: 52,
    suffix: "+",
    label: "Live modules",
    sub: "Rapor, billing, attendance, WhatsApp bot",
    barPct: 72,
  },
  {
    value: 18,
    suffix: "",
    label: "RBAC roles",
    sub: "272 permissions, scoped at query level",
    barPct: 60,
  },
  {
    value: 157,
    suffix: "+",
    label: "Test files",
    sub: "1,233 methods running in CI",
    barPct: 80,
  },
];

export function MetricsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cleanupStagger = animateStaggeredCards(containerRef.current, ".metric-card", 0.08);
    const cleanupCount = animateCountUp(containerRef.current, "[data-count]");

    // Animate progress bars on scroll
    if (!isReducedMotion()) {
      const bars = containerRef.current.querySelectorAll<HTMLElement>(".metric-bar-fill");
      bars.forEach((bar) => {
        const pct = bar.dataset.pct ?? "50";
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: Number(pct) / 100,
            duration: 1.2,
            ease: "power2.out",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: bar,
              start: "top 90%",
              once: true,
            },
          }
        );
      });
    }

    return () => {
      cleanupStagger?.();
      cleanupCount?.();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        width: "100%",
        paddingTop: "clamp(2rem, 4vw, 3.25rem)",
        paddingBottom: "clamp(2.5rem, 5vw, 4rem)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div className="layout-container">
        <div style={{ marginBottom: "1.75rem" }}>
          <span className="kicker">Numbers from systems people use every day</span>
        </div>

        <div className="metrics-grid">
          {metrics.map((metric) => (
            <div key={metric.label} className="metric-card" style={{ padding: "0.25rem 0" }}>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(2.35rem, 4vw, 3.25rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  color: "var(--text-primary)",
                }}
              >
                <span data-count={metric.value} data-suffix={metric.suffix}>
                  {metric.value}{metric.suffix}
                </span>
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  marginTop: "0.55rem",
                  color: "var(--text-primary)",
                }}
              >
                {metric.label}
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.5,
                  marginTop: "0.2rem",
                  marginBottom: "0.85rem",
                }}
              >
                {metric.sub}
              </div>

              {/* Scroll-animated progress bar */}
              <div
                style={{
                  height: "2px",
                  background: "var(--border-subtle)",
                  borderRadius: "99px",
                  overflow: "hidden",
                }}
                aria-hidden="true"
              >
                <div
                  className="metric-bar-fill"
                  data-pct={metric.barPct}
                  style={{
                    height: "100%",
                    background: "var(--text-primary)",
                    borderRadius: "99px",
                    transformOrigin: "left center",
                    transform: "scaleX(0)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MetricsSection;
