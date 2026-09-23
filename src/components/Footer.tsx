"use client";

import Link from "next/link";
import { person, social } from "@/resources";

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
      <div
        className="layout-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-secondary)" }}>
          © {currentYear} {person.name}
          <span style={{ color: "var(--text-muted)" }}> · Samarinda</span>
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "1.15rem", flexWrap: "wrap" }}>
          {social.map((item) => (
            <a
              key={item.name}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "0.875rem", color: "var(--text-secondary)", textDecoration: "none" }}
            >
              {item.name}
            </a>
          ))}
          <Link href="/about" style={{ fontSize: "0.875rem", color: "var(--text-secondary)", textDecoration: "none" }}>
            About
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
