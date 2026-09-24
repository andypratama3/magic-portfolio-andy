import Link from "next/link";
import type { Metadata } from "next";
import { home, about, person, baseURL } from "@/resources";
import { ProjectsWrapper } from "@/components/work/ProjectsWrapper";
import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { MetricsSection } from "@/components/MetricsSection";
import { HowIBuild } from "@/components/HowIBuild";
import { EnhancedTechStack } from "@/components/EnhancedTechStack";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { WhatIBuild } from "@/components/WhatIBuild";
import { FeaturedCaseStudy } from "@/components/FeaturedCaseStudy";
import { Chapter } from "@/components/Chapter";
import { CinematicScroll } from "@/components/CinematicScroll";

export const metadata: Metadata = {
  alternates: {
    canonical: baseURL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

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

      <HeroSection />

      <section id="what-i-build" data-scrollspy className="chapter-block">
        <div className="layout-container">
          <WhatIBuild />
        </div>
      </section>

      <MetricsSection />

      <section id="selected-work" data-scrollspy className="chapter-block chapter-block-bottom">
        <div className="layout-container">
          <FeaturedCaseStudy />

          <div className="supporting-projects">
            <ProjectsWrapper excludeSlug="productschool" range={[1, 4]} />
          </div>

          <div className="section-foot">
            <Link href="/work" className="text-link">
              All projects
            </Link>
          </div>
        </div>
      </section>

      <section id="engineering" data-scrollspy className="chapter-block">
        <div className="layout-container">
          <Chapter
            index="03"
            label="HOW I ENGINEER"
            sectionId="engineering"
            title="A quiet, repeatable way to ship."
            lead="The loop keeps moving. Hover or click a step to stay there."
          />
        </div>
        <HowIBuild showHeader={false} />
        <EnhancedTechStack showHeader={false} />
      </section>

      <section id="experience" data-scrollspy className="chapter-block">
        <div className="layout-container">
          <Chapter
            index="04"
            label="EXPERIENCE"
            sectionId="experience"
            title="Roles with real users on the other side."
            lead="Where the work above actually shipped."
            action={
              <Link href="/about" className="text-link">
                Full background
              </Link>
            }
          />
        </div>
        <ExperienceTimeline compact showHeader={false} />
      </section>

      <CTASection />
      <CinematicScroll />
    </div>
  );
}