"use client";

import { useEffect, useRef } from "react";
import { animateStaggeredCards } from "@/lib/gsap/animations";

const metrics = [
  {
    value: 893,
    suffix: "",
    label: "Production routes",
    sub: "ProductSchool — 708 web, 185 API",
  },
  {
    value: 52,
    suffix: "+",
    label: "Live modules",
    sub: "Rapor, billing, attendance, WhatsApp bot",
  },
  {
    value: 18,
    suffix: "",
    label: "RBAC roles",
    sub: "272 permissions, scoped at query level",
  },
  {
    value: 157,
    suffix: "+",
    label: "Test files",
    sub: "1,233 methods running in CI",
  },
];

export function MetricsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = animateStaggeredCards(containerRef.current, ".metric-card", 0.08);
    return () => {
      cards?.();
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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
            gap: "1.25rem",
          }}
        >
          {metrics.map((metric) => (
            <div key={metric.label} className="metric-card" style={{ padding: "0.25rem 0" }}>
              <div
                style={{
                  fontFamily: "var(--font-heading), Newsreader, Georgia, serif",
                  fontSize: "clamp(2.35rem, 4vw, 3.25rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  color: "var(--text-primary)",
                }}
              >
                {metric.value}{metric.suffix}
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
              <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.5, marginTop: "0.2rem" }}>
                {metric.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MetricsSection;
