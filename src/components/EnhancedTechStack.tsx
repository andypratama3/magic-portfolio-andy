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
    items: ["PHP 8.3", "Laravel 10–12", "REST APIs", "Spatie permissions", "Redis", "Laravel Reverb"],
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
    const cleanupCards = animateStaggeredCards(containerRef.current, ".eng-row", 0.06);
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
        paddingTop: showHeader ? "clamp(3.25rem, 6vw, 5.5rem)" : "2rem",
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

        <div className="eng-rows">
          {techGroups.map((group, index) => (
            <div className="eng-row" key={group.category}>
              <span className="eng-row-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="eng-row-main">
                <span className="eng-row-note">{group.note}</span>
                <h3 className="eng-row-name">{group.category}</h3>
                <p className="eng-row-desc">{group.description}</p>
              </div>
              <ul className="eng-row-tags">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EnhancedTechStack;