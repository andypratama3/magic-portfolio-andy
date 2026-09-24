"use client";

import { useEffect, useRef } from "react";
import { animateStaggeredCards, animateHeadingReveal } from "@/lib/gsap/animations";

interface TechGroup {
  category: string;
  note: string;
  description: string;
  items: string[];
}

const techGroups: TechGroup[] = [
  {
    category: "Backend",
    note: "Where I spend most days",
    description: "Service layers, RBAC, queues, and APIs that stay predictable under real load.",
    items: [
      "PHP 8.3",
      "Laravel 10–12",
      "REST APIs",
      "Spatie permissions",
      "Redis",
      "Laravel Reverb",
    ],
  },
  {
    category: "Frontend",
    note: "When the product needs a face",
    description: "Typed React and Next.js interfaces: fast, accessible, with no chrome for chrome's sake.",
    items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Vue.js"],
  },
  {
    category: "Data",
    note: "The part that cannot be sloppy",
    description: "Schemas, indexes, and migrations that don't lose a row when the system grows.",
    items: ["MySQL", "PostgreSQL", "Eloquent", "Indexing", "Query work"],
  },
  {
    category: "Ops & integrations",
    note: "How it actually ships",
    description: "Servers, CI, payments, and the bots that save staff from another dashboard login.",
    items: ["Docker", "Nginx", "GitHub Actions", "Midtrans", "WhatsApp Cloud API", "Cloudflare"],
  },
];

export function EnhancedTechStack({ showHeader = true }: { skills?: unknown; showHeader?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cleanupCards = animateStaggeredCards(containerRef.current, ".tech-group-card", 0.08);
    const cleanupHeader = animateHeadingReveal(headerRef.current, {
      headingSelector: ".reveal-heading",
      bodySelector: ".reveal-body",
    });
    return () => {
      cleanupCards?.();
      cleanupHeader?.();
    };
  }, []);

  return (
    <section
      id="capabilities"
      ref={containerRef}
      style={{
        width: "100%",
        paddingTop: "clamp(3.25rem, 6vw, 5.5rem)",
        paddingBottom: "clamp(3.25rem, 6vw, 5.5rem)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div className="layout-container">
        {showHeader && (
          <div ref={headerRef}>
            <div style={{ marginBottom: "0.65rem" }}>
              <span className="kicker reveal-body">Tools I actually use in production</span>
            </div>
            <div style={{ maxWidth: "36rem", marginBottom: "2.5rem" }}>
              <h2 className="text-h1 reveal-heading" style={{ marginBottom: "0.75rem" }}>
                A stack with scars, not a wishlist.
              </h2>
              <p className="text-body-large reveal-body">
                These showed up in shipped systems (schools, government, and commercial ops), not in a
                tutorial weekend.
              </p>
            </div>
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            gap: "1.15rem",
          }}
        >
          {techGroups.map((group) => (
            <div
              key={group.category}
              className="tech-group-card editorial-card"
              style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.9rem" }}
            >
              <span className="kicker">{group.note}</span>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.35rem",
                    fontWeight: 600,
                    margin: "0 0 0.4rem",
                  }}
                >
                  {group.category}
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.55, color: "var(--text-secondary)", margin: 0 }}>
                  {group.description}
                </p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "auto" }}>
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="tech-tag"
                    style={{
                      fontSize: "0.8125rem",
                      padding: "4px 9px",
                      borderRadius: "var(--radius-pill)",
                      border: "1px solid var(--border-subtle)",
                      color: "var(--text-secondary)",
                      cursor: "default",
                      transition: "border-color 0.2s ease, color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--border-medium)";
                      e.currentTarget.style.color = "var(--text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border-subtle)";
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EnhancedTechStack;
