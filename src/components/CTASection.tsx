"use client";

import { person } from "@/resources";
import { ContactForm } from "./ContactForm";
import { SocialLinks } from "./SocialLinks";

export function CTASection() {
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
          <div>
            <div style={{ marginBottom: "0.65rem" }}>
              <span className="kicker">Say hello</span>
            </div>
            <h2 className="text-h1" style={{ maxWidth: "16ch", marginBottom: "1rem" }}>
              If you&apos;re hiring an engineer, not a pitch deck.
            </h2>
            <p className="text-body-large" style={{ maxWidth: "32rem", marginBottom: "1.5rem" }}>
              I&apos;m open to remote roles, contracts, and the kind of backend work where
              uptime actually matters. A short note is enough.
            </p>
            <SocialLinks includeEmail />
            <div style={{ marginTop: "1rem" }}>
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
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export default CTASection;
