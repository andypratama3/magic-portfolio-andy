"use client";

import { person } from "@/resources";
import { LiveClock } from "./LiveClock";
import { SocialLinks } from "./SocialLinks";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        width: "100%",
        borderTop: "1px solid var(--border-subtle)",
        padding: "1.75rem 0",
      }}
    >
      <div className="layout-container site-footer-inner">
        <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-secondary)" }}>
          © {currentYear} {person.name}
        </p>
        <p
          className="site-footer-clock"
          style={{
            margin: 0,
            fontSize: "0.875rem",
            color: "var(--text-muted)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <LiveClock variant="long" />
        </p>
        <SocialLinks includeEmail />
      </div>
    </footer>
  );
};

export default Footer;
