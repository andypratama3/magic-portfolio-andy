"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HowIBuild.module.scss";

const stages = [
  {
    step: "01",
    title: "Understand the real problem",
    description:
      "I start with the operational mess: who needs what, what breaks today, what cannot go down. Frameworks come after the problem is named clearly.",
  },
  {
    step: "02",
    title: "Model the data first",
    description:
      "Reliability lives in the schema. Indexes, constraints, and query-level scoping (like TeacherScopedData) go in before the UI ever looks pretty.",
  },
  {
    step: "03",
    title: "Keep controllers thin",
    description:
      "Business logic sits in dedicated services. Form requests validate. Policies decide who can touch what. Controllers just route the traffic.",
  },
  {
    step: "04",
    title: "Test the scary parts",
    description:
      "ProductSchool ships with 157+ test files — 1,233 methods, about 3,000 assertions — so deploys are boring. That's the point.",
  },
  {
    step: "05",
    title: "Harden before launch",
    description:
      "Nginx, TLS, Redis workers, RBAC, queues. Production is not a later milestone. It's the environment the code is written for.",
  },
  {
    step: "06",
    title: "Watch it, then improve it",
    description:
      "WebSockets, logs, reconciliation jobs. Systems stay alive after the invoice. I plan for that from the first commit.",
  },
];

const CYCLE_MS = 5200;

export function HowIBuild() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const current = stages[active];

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || paused) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % stages.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!listRef.current?.contains(document.activeElement)) return;
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        setPaused(true);
        setActive((prev) => (prev + 1) % stages.length);
      }
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        setPaused(true);
        setActive((prev) => (prev - 1 + stages.length) % stages.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const choose = (index: number) => {
    setPaused(true);
    setActive(index);
  };

  return (
    <section
      id="how-i-build"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        width: "100%",
        paddingTop: "clamp(3.25rem, 6vw, 5.5rem)",
        paddingBottom: "clamp(3.25rem, 6vw, 5.5rem)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div className="layout-container">
        <div style={{ marginBottom: "0.65rem" }}>
          <span className="kicker">How I work</span>
        </div>
        <div style={{ maxWidth: "36rem", marginBottom: "2.5rem" }}>
          <h2 className="text-h1" style={{ marginBottom: "0.75rem" }}>
            A quiet, repeatable way to ship.
          </h2>
          <p className="text-body-large">
            The loop keeps moving. Hover or click a step if you want to stay there.
          </p>
        </div>

        <div className={styles.layout}>
          <div ref={listRef} role="listbox" aria-label="Engineering stages" tabIndex={0}>
            <div className={styles.steps}>
              {stages.map((stage, index) => (
                <button
                  key={stage.step}
                  type="button"
                  role="option"
                  aria-selected={index === active}
                  className={`${styles.step} ${index === active ? styles.stepActive : ""}`}
                  onClick={() => choose(index)}
                >
                  <span className={styles.stepIndex}>{stage.step}</span>
                  <span className={styles.stepTitle}>{stage.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.detail} aria-live="polite">
            <span className={styles.detailKicker}>Stage {current.step} of 06</span>
            <h3 key={current.step} className={styles.detailTitle}>{current.title}</h3>
            <p key={`${current.step}-body`} className={styles.detailBody}>{current.description}</p>
            <div className={styles.progress} aria-hidden="true">
              {stages.map((stage, index) => (
                <button
                  key={stage.step}
                  type="button"
                  className={`${styles.progressDot} ${index === active ? styles.progressDotActive : ""} ${index < active ? styles.progressDotDone : ""}`}
                  onClick={() => choose(index)}
                  tabIndex={-1}
                >
                  {index === active && !paused ? <span className={styles.progressFill} /> : null}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowIBuild;
