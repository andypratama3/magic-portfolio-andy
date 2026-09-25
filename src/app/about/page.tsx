import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { baseURL, about, person } from "@/resources";
import { EnhancedTechStack } from "@/components/EnhancedTechStack";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { TiltMedia } from "@/components/TiltMedia";
import { LiveClock } from "@/components/LiveClock";
import { SectionReveal } from "@/components/SectionReveal";
import { GitHubRepos } from "@/components/GitHubRepos";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = `${baseURL}/about`;
  return {
    title: `About ${person.name} | Software Engineer`,
    description: about.description,
    alternates: {
      canonical: canonicalUrl,
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
    openGraph: {
      title: `About ${person.name} | Software Engineer`,
      description: about.description,
      url: canonicalUrl,
      siteName: "Andy Pratama",
      countryName: "Indonesia",
      images: [{ url: `${baseURL}${person.avatar}`, width: 1198, height: 1800, alt: person.name }],
      locale: "en_US",
      type: "profile",
      firstName: "Andy",
      lastName: "Pratama",
      username: "andypratama3",
    },
    twitter: {
      card: "summary_large_image",
      site: "@andypratama3",
      creator: "@andypratama3",
      title: `About ${person.name} | Software Engineer`,
      description: about.description,
      images: [`${baseURL}${person.avatar}`],
    },
  };
}

export default function About() {
  return (
    <div style={{ width: "100%", paddingBottom: "clamp(3.5rem, 8vw, 6rem)" }}>
      <section
        style={{
          width: "100%",
          paddingTop: "clamp(2.75rem, 6vw, 4.75rem)",
          paddingBottom: "clamp(2.25rem, 5vw, 3.75rem)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="layout-container">
          <div style={{ marginBottom: "0.75rem" }}>
            <span className="kicker">About</span>
          </div>
          <div className="about-split">
            <div>
              <h1 className="text-h1" style={{ marginBottom: "1.15rem", maxWidth: "22ch" }}>
                I like software that still works on a Monday morning.
              </h1>
              <p className="text-body-large" style={{ marginBottom: "1.5rem" }}>
                I&apos;m based in Samarinda. On paper I&apos;m a recent graduate. In practice I&apos;ve
                spent three years shipping backends that schools, provincial offices, and small
                businesses depend on: permissions, payments, reports, the unglamorous glue.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", marginBottom: "1.5rem" }}>
                <div className="fact-row">
                  <span className="text-mono-label">Location</span>
                  <span style={{ fontWeight: 600 }}>{person.location}</span>
                </div>
                <div className="fact-row">
                  <span className="text-mono-label">Languages</span>
                  <span style={{ fontWeight: 600 }}>Indonesian, English</span>
                </div>
                <div className="fact-row">
                  <span className="text-mono-label">Comfort zone</span>
                  <span style={{ fontWeight: 600 }}>Laravel, PHP 8.3, MySQL, Next.js</span>
                </div>
              </div>
              <div className="stack-actions">
                <a href="https://cal.com/andypratama" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Book a call
                </a>
                <a href="/resume/CV_Andy_Pratama.pdf" download="CV_Andy_Pratama.pdf" className="btn-secondary">
                  Download CV
                </a>
                <a href={`mailto:${person.email}`} className="btn-secondary">
                  Email
                </a>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: "100%", maxWidth: "380px" }}>
                <TiltMedia>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "1/1",
                      borderRadius: "var(--radius-lg)",
                      overflow: "hidden",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    <Image
                      src={person.avatar}
                      alt={person.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      style={{ objectFit: "cover", objectPosition: "center top" }}
                      priority
                    />
                  </div>
                </TiltMedia>
                <p className="kicker" style={{ marginTop: "0.75rem" }}>
                  <LiveClock variant="long" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ paddingTop: "clamp(3rem, 6vw, 4.5rem)", paddingBottom: "clamp(2rem, 4vw, 3rem)" }}>
        <div className="layout-container" style={{ marginBottom: "1.5rem" }}>
          <SectionReveal>
            <span className="kicker reveal-body">Experience</span>
            <h2 className="text-h2 reveal-heading" style={{ marginTop: "0.4rem" }}>
              Places I&apos;ve been the engineer in the room.
            </h2>
          </SectionReveal>
        </div>
        <ExperienceTimeline />
      </div>

      <GitHubRepos />

      <EnhancedTechStack showHeader />

      <section style={{ paddingTop: "clamp(3rem, 6vw, 4.5rem)" }}>
        <div className="layout-container">
          <SectionReveal style={{ marginBottom: "1.5rem" }}>
            <span className="kicker reveal-body">School</span>
            <h2 className="text-h2 reveal-heading" style={{ marginTop: "0.4rem" }}>
              Education
            </h2>
          </SectionReveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "1.15rem",
            }}
          >
            {about.studies.institutions.map((inst, index) => (
              <div key={`${inst.name}-${index}`} className="editorial-card" style={{ padding: "1.4rem" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    margin: "0 0 0.5rem",
                  }}
                >
                  {inst.name}
                </h3>
                <p style={{ fontSize: "0.975rem", lineHeight: 1.6, color: "var(--text-secondary)", margin: 0 }}>
                  {inst.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
