import React from "react";
import Link from "next/link";
import { home, about, person, baseURL } from "@/resources";
import { ProjectsWrapper } from "@/components/work/ProjectsWrapper";
import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { MetricsSection } from "@/components/MetricsSection";
import { HowIBuild } from "@/components/HowIBuild";
import { EnhancedTechStack } from "@/components/EnhancedTechStack";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";

export default function Home() {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: home.title,
            description: home.description,
            url: `${baseURL}${home.path}`,
            author: {
              "@type": "Person",
              name: person.name,
              url: `${baseURL}${about.path}`,
            },
          }),
        }}
      />

      <HeroSection personAvatar={person.avatar} />
      <MetricsSection />

      <section
        id="selected-work"
        style={{
          width: "100%",
          paddingTop: "clamp(3.5rem, 7vw, 5.75rem)",
          paddingBottom: "clamp(3.5rem, 7vw, 5.75rem)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="layout-container">
          <div style={{ marginBottom: "0.65rem" }}>
            <span className="kicker">Selected work</span>
          </div>
          <div className="section-head">
            <div style={{ maxWidth: "36rem" }}>
              <h2 className="text-h1" style={{ marginBottom: "0.7rem" }}>
                Systems still running after the launch party.
              </h2>
              <p className="text-body-large">
                Architecture, data, permissions, and the messy integrations — written up as case studies,
                not marketing pages.
              </p>
            </div>
            <Link href="/work" className="btn-secondary">
              All projects
            </Link>
          </div>

          <ProjectsWrapper featuredSlug="productschool" range={[1, 1]} />
          <div style={{ marginTop: "1.75rem" }}>
            <ProjectsWrapper excludeSlug="productschool" range={[1, 4]} />
          </div>
        </div>
      </section>

      <HowIBuild />
      <EnhancedTechStack showHeader />
      <ExperienceTimeline compact />
      <CTASection />
    </div>
  );
}
