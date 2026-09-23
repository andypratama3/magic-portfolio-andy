"use client";

import { person, social } from "@/resources";
import { ContactForm } from "./ContactForm";

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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "clamp(2rem, 5vw, 4rem)",
            alignItems: "start",
          }}
        >
          <div>
            <div style={{ marginBottom: "0.65rem" }}>
              <span className="kicker">Say hello</span>
            </div>
            <h2 className="text-display" style={{ maxWidth: "14ch", marginBottom: "1rem" }}>
              If you&apos;re hiring an engineer, not a pitch deck.
            </h2>
            <p className="text-body-large" style={{ maxWidth: "32rem", marginBottom: "1.5rem" }}>
              I&apos;m open to remote roles, contracts, and the kind of backend work where
              uptime actually matters. A short note is enough.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem 1.35rem" }}>
              <a className="text-link" href={`mailto:${person.email}`}>
                {person.email}
              </a>
              {social
                .filter((item) => item.name !== "Email")
                .map((item) => (
                  <a
                    key={item.name}
                    className="text-link"
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.name}
                  </a>
                ))}
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
