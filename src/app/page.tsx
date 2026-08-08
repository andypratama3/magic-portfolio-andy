import React from "react";
import { Column, Schema } from "@once-ui-system/core";
import { home, about, person, baseURL, testimonials } from "@/resources";
import { ProjectsWrapper } from "@/components/work/ProjectsWrapper";
import { Testimonials } from "@/components/Testimonials";
import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { MetricsSection } from "@/components/MetricsSection";
import { SectionTitle } from "@/components/SectionTitle";

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" horizontal="center" style={{ padding: 'clamp(2rem, 5vw, 6rem) 0' }}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      {/* Cinematic Hero Section */}
      <HeroSection 
        headline={home.headline}
        subline={home.subline}
        aboutPath={about.path}
        aboutTitle={about.title}
        aboutAvatarDisplay={about.avatar.display}
        personAvatar={person.avatar}
      />

      {/* Metrics Section */}
      <MetricsSection />

      {/* Featured Project */}
      <Column fillWidth style={{ padding: 'clamp(3rem, 6vw, 6rem) 0' }}>
        <SectionTitle 
          title="Featured Project"
          description="A showcase of my latest work and technical achievements"
          align="center"
        />
        <ProjectsWrapper range={[1, 1]} />
      </Column>

      {/* Testimonials */}
      {testimonials.display && (
        <Column fillWidth style={{ padding: 'clamp(3rem, 6vw, 6rem) 0' }}>
          <Testimonials
            title={testimonials.title}
            description={testimonials.description}
            items={testimonials.items}
          />
        </Column>
      )}

      {/* More Projects */}
      <Column fillWidth style={{ padding: 'clamp(3rem, 6vw, 6rem) 0' }}>
        <SectionTitle 
          title="More Projects"
          description="Explore additional work and creative solutions"
          align="center"
        />
        <ProjectsWrapper range={[2]} />
      </Column>

      {/* CTA Section */}
      <Column fillWidth style={{ padding: 'clamp(3rem, 6vw, 6rem) 0' }}>
        <CTASection
          title="Ready to Transform Your Business?"
          description="Let's discuss how I can help you build scalable systems that automate operations and drive growth."
          primaryButtonText="Schedule a Consultation"
          primaryButtonHref="https://cal.com/andypratama"
          secondaryButtonText="View My Work"
          secondaryButtonHref="/work"
        />
      </Column>
    </Column>
  );
}
