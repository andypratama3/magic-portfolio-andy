"use client";

import { useState } from "react";
import Link from "next/link";
import { about } from "@/resources";

export function ExperienceTimeline({ compact = false }: { compact?: boolean }) {
  const experiences = about.work.experiences;
  const [open, setOpen] = useState(0);
  const shown = compact ? experiences.slice(0, 4) : experiences;

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
          <>
            <div style={{ marginBottom: "0.65rem" }}>
              <span className="kicker">Where this work happened</span>
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
              <h2 className="text-h1" style={{ maxWidth: "28rem", margin: 0 }}>
                Roles with real users on the other side.
              </h2>
              <Link href="/about" className="text-link">
                Full background →
              </Link>
            </div>
          </>
        )}

        <div style={{ display: "flex", flexDirection: "column" }}>
          {shown.map((exp, index) => {
            const isOpen = open === index;
            return (
              <div
                key={`${exp.company}-${index}`}
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
                  }}
                >
                  <span style={{ flex: "1 1 220px" }}>
                    <span
                      style={{
                        display: "block",
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.25rem",
                        fontWeight: 600,
                      }}
                    >
                      {exp.company}
                    </span>
                    <span style={{ fontSize: "0.9375rem", color: "var(--text-secondary)" }}>{exp.role}</span>
                  </span>
                  <span className="text-mono-label" style={{ flex: "1 1 140px" }}>
                    {exp.timeframe}
                  </span>
                  <span aria-hidden="true" style={{ fontSize: "1.25rem", color: "var(--text-muted)", marginLeft: "auto" }}>
                    {isOpen ? "–" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <ul
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
                    {exp.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
          <div style={{ borderTop: "1px solid var(--border-subtle)" }} />
        </div>
      </div>
    </section>
  );
}
