"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { about } from "@/resources";
import { animateStaggeredCards, animateHeadingReveal, animateListStagger } from "@/lib/gsap/animations";

/**
 * Isolated panel component so useEffect fires on each fresh mount,
 * giving us a clean stagger entry every time a row is opened.
 */
function ExpPanel({ achievements }: { achievements: React.ReactNode[] }) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    animateListStagger(listRef.current, "li");
  }, []);

  return (
    <ul
      ref={listRef}
      className="timeline-panel"
      style={{
        margin: "0 0 1.35rem",
        paddingLeft: "1.2rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.55rem",
        color: "var(--text-secondary)",
        fontSize: "0.975rem",
        lineHeight: 1.6,
        maxWidth: "46rem",
      }}
    >
      {achievements.map((achievement, i) => (
        <li key={i}>{achievement}</li>
      ))}
    </ul>
  );
}

export function ExperienceTimeline({ compact = false }: { compact?: boolean }) {
  const experiences = about.work.experiences;
  const [open, setOpen] = useState(0);
  const shown = compact ? experiences.slice(0, 4) : experiences;
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanupRows = animateStaggeredCards(containerRef.current, ".exp-row", 0.06);
    const cleanupHeader = animateHeadingReveal(headerRef.current, {
      headingSelector: ".reveal-heading",
      bodySelector: ".reveal-body",
    });
    return () => {
      cleanupRows?.();
      cleanupHeader?.();
    };
  }, []);

  return (
    <section
      id="experience"
      style={{
        width: "100%",
        paddingTop: compact ? "clamp(3.25rem, 6vw, 5.5rem)" : 0,
        paddingBottom: compact ? "clamp(3.25rem, 6vw, 5.5rem)" : 0,
        borderBottom: compact ? "1px solid var(--border-subtle)" : undefined,
      }}
    >
      <div className="layout-container">
        {compact && (
          <div ref={headerRef}>
            <div style={{ marginBottom: "0.65rem" }}>
              <span className="kicker reveal-body">Where this work happened</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
                flexWrap: "wrap",
                marginBottom: "2rem",
                alignItems: "flex-end",
              }}
            >
              <h2 className="text-h1 reveal-heading" style={{ maxWidth: "28rem", margin: 0 }}>
                Roles with real users on the other side.
              </h2>
              <Link href="/about" className="text-link reveal-body">
                Full background
              </Link>
            </div>
          </div>
        )}

        <div ref={containerRef} style={{ display: "flex", flexDirection: "column" }}>
          {shown.map((exp, index) => {
            const isOpen = open === index;
            return (
              <div
                key={`${exp.company}-${index}`}
                className="exp-row"
                style={{ borderTop: "1px solid var(--border-subtle)" }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    padding: "1.2rem 0",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.45rem 1rem",
                    alignItems: "baseline",
                    textAlign: "left",
                    cursor: "pointer",
                    color: "inherit",
                    fontFamily: "inherit",
                    transition: "opacity 0.15s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                >
                  <span style={{ flex: "1 1 220px" }}>
                    <span
                      style={{
                        display: "block",
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        transition: "color 0.2s ease",
                        color: isOpen ? "var(--text-primary)" : "inherit",
                      }}
                    >
                      {exp.company}
                    </span>
                    <span style={{ fontSize: "0.9375rem", color: "var(--text-secondary)" }}>
                      {exp.role}
                    </span>
                  </span>
                  <span className="text-mono-label" style={{ flex: "1 1 140px" }}>
                    {exp.timeframe}
                  </span>
                  <span
                    aria-hidden="true"
                    style={{
                      fontSize: "1.1rem",
                      color: "var(--text-muted)",
                      marginLeft: "auto",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      border: "1px solid var(--border-subtle)",
                      transition: "transform 0.3s var(--ease-editorial), border-color 0.2s ease",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      flexShrink: 0,
                    }}
                  >
                    +
                  </span>
                </button>

                {isOpen && <ExpPanel achievements={exp.achievements} />}
              </div>
            );
          })}
          <div style={{ borderTop: "1px solid var(--border-subtle)" }} />
        </div>
      </div>
    </section>
  );
}
