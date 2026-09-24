"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { home, person } from "@/resources";
import { setupMagneticButton, animateSplitText } from "@/lib/gsap/animations";
import { isReducedMotion } from "@/lib/gsap/config";
import { LiveClock } from "./LiveClock";

export function HeroSection() {
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);
  const secondaryBtnRef = useRef<HTMLAnchorElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (headlineRef.current && isReducedMotion()) {
      headlineRef.current.style.visibility = "visible";
    }
    const cleanupPrimary = setupMagneticButton(primaryBtnRef.current, 0.18);
    const cleanupSecondary = setupMagneticButton(secondaryBtnRef.current, 0.18);
    const cleanupSplit = animateSplitText(headlineRef.current, {
      type: "words",
      stagger: 0.07,
      duration: 0.7,
      delay: 0.18,
    });
    return () => {
      cleanupPrimary();
      cleanupSecondary();
      cleanupSplit();
    };
  }, []);

  return (
    <section
      className="hero-scope"
      style={{
        width: "100%",
        paddingTop: "clamp(3.5rem, 9vw, 7rem)",
        paddingBottom: "clamp(3rem, 6vw, 5rem)",
      }}
    >
      <div className="layout-container">
        <div className="hero-content">
          <div className="hero-topline hero-rise">
          <span className="kicker">{home.hero.kicker}</span>
          <span className="hero-clock" aria-label="Local time">
            <LiveClock />
          </span>
        </div>

        <h1
          ref={headlineRef}
          className="text-display hero-rise hero-rise-delay-1"
          style={{
            maxWidth: "12ch",
            marginBottom: "1.75rem",
            visibility: "hidden",
          }}
        >
          {person.firstName} <em>{person.lastName}</em>
        </h1>

        <p
          className="text-body-large hero-rise hero-rise-delay-2"
          style={{ maxWidth: "38rem", marginBottom: "2rem" }}
        >
          {home.hero.statement}
        </p>

        <div className="hero-stack hero-rise hero-rise-delay-3">
          <span className="text-mono-label">Toolchain</span>
          <ul className="hero-stack-list">
            {home.hero.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="stack-actions hero-rise hero-rise-delay-4">
          <Link ref={primaryBtnRef} href="#selected-work" className="btn-primary">
            <span>See selected work</span>
            <span aria-hidden="true">↓</span>
          </Link>
          <Link ref={secondaryBtnRef} href="/about" className="btn-secondary">
            <span>About me</span>
          </Link>
        </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;