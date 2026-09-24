"use client";

import { useEffect, useRef } from "react";
import { animateHeadingReveal } from "@/lib/gsap/animations";
import { ContactForm } from "./ContactForm";
import { SocialLinks } from "./SocialLinks";

export function CTASection() {
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanupLeft = animateHeadingReveal(leftRef.current, {
      headingSelector: ".reveal-heading",
      bodySelector: ".reveal-body",
      stagger: 0.1,
    });
    const cleanupForm = animateHeadingReveal(formRef.current, {
      headingSelector: ".reveal-heading",
      bodySelector: ".reveal-body",
      stagger: 0.08,
    });
    return () => {
      cleanupLeft?.();
      cleanupForm?.();
    };
  }, []);

  return (
    <section
      id="contact"
      style={{
        width: "100%",
        paddingTop: "clamp(3.5rem, 7vw, 6rem)",
        paddingBottom: "clamp(3.5rem, 7vw, 6rem)",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div className="layout-container">
        <div className="contact-grid">
          <div ref={leftRef} className="chapter-head">
            <span className="chapter-ghost" aria-hidden="true">
              05
            </span>
            <p className="chapter-line reveal-body">
              <span className="chapter-index" aria-hidden="true">
                05
              </span>
              <span className="chapter-sep" aria-hidden="true">
                /
              </span>
              <span>LET&apos;S BUILD</span>
            </p>
            <h2 className="text-h1 reveal-heading" style={{ maxWidth: "16ch", marginBottom: "1rem" }}>
              If you&apos;re hiring an engineer, not a pitch deck.
            </h2>
            <p className="text-body-large reveal-body" style={{ maxWidth: "32rem", marginBottom: "1.5rem" }}>
              I&apos;m open to remote roles, contracts, and the kind of backend work where
              uptime actually matters. A short note is enough.
            </p>
            <div className="reveal-body">
              <SocialLinks includeEmail />
            </div>
            <div style={{ marginTop: "1rem" }} className="reveal-body">
              <a
                className="text-link"
                href="https://cal.com/andypratama"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a call
              </a>
            </div>
          </div>

          <div ref={formRef} className="reveal-body">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
