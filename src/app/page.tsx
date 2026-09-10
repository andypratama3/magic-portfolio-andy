import React from "react";
import { Column, Schema } from "@once-ui-system/core";
import { home, about, person, baseURL, testimonials } from "@/resources";
import { ProjectsWrapper } from "@/components/work/ProjectsWrapper";
import { Testimonials } from "@/components/Testimonials";
import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { MetricsSection } from "@/components/MetricsSection";
import { SectionTitle } from "@/components/SectionTitle";
import { EngineeringPhilosophy } from "@/components/EngineeringPhilosophy";
import { EnhancedTechStack } from "@/components/EnhancedTechStack";

export default function Home() {
  const engineeringPhilosophy = {
    display: true,
    title: "Engineering Philosophy",
    description: (
      <>
        I approach software development as an end-to-end engineering problem. Technology exists to solve real business problems, not to be an end in itself.
        <br />
        <br />
        <strong>Solve the business problem:</strong> I focus on understanding requirements first, then choosing the right tools to solve them effectively.
        <br />
        <br />
        <strong>Design for maintainability:</strong> I prefer clear boundaries, understandable architecture, and separation of concerns over clever code.
        <br />
        <br />
        <strong>Build for production:</strong> I think about security, deployment, monitoring, and maintenance from the start, not as an afterthought.
        <br />
        <br />
        <strong>Automate repetitive work:</strong> I use queues, jobs, integrations, and automation to reduce manual overhead and improve reliability.
        <br />
        <br />
        <strong>Measure improvements:</strong> I use measurable results whenever possible — performance metrics, security scores, and user outcomes.
      </>
    ),
  };

  return (
    <Column maxWidth="m" gap="xl" horizontal="center" style={{ padding: 'clamp(3rem, 6vw, 6rem) 0' }}>
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
        eyebrow={home.eyebrow}
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
      <Column fillWidth style={{ padding: 'clamp(2.5rem, 5vw, 5rem) 0' }}>
        <SectionTitle 
          title="Featured Project"
          description="A showcase of my latest work and technical achievements"
          align="center"
        />
        <ProjectsWrapper range={[1, 1]} />
      </Column>

      {/* Testimonials */}
      {testimonials.display && (
        <Column fillWidth style={{ padding: 'clamp(2.5rem, 5vw, 5rem) 0' }}>
          <Testimonials
            title={testimonials.title}
            description={testimonials.description}
            items={testimonials.items}
          />
        </Column>
      )}

      {/* More Projects */}
      <Column fillWidth style={{ padding: 'clamp(2.5rem, 5vw, 5rem) 0' }}>
        <SectionTitle 
          title="More Projects"
          description="Explore additional work and creative solutions"
          align="center"
        />
        <ProjectsWrapper range={[2]} />
      </Column>

      {/* Engineering Philosophy */}
      {engineeringPhilosophy.display && (
        <EngineeringPhilosophy
          title={engineeringPhilosophy.title}
          description={engineeringPhilosophy.description}
        />
      )}

      {/* Technical Stack */}
      <Column fillWidth style={{ padding: 'clamp(2.5rem, 5vw, 5rem) 0' }}>
        <SectionTitle 
          title="Technical Stack"
          description="Backend-focused full stack engineering with production experience"
          align="center"
        />
        <EnhancedTechStack skills={about.technical.skills} />
      </Column>

      {/* CTA Section */}
      <Column fillWidth style={{ padding: 'clamp(2.5rem, 5vw, 5rem) 0' }}>
        <CTASection
          title="Ready to Transform Your Business?"
          description="Let's discuss how I can build scalable systems that automate operations and drive growth."
          primaryButtonText="Schedule a Consultation"
          primaryButtonHref="https://cal.com/andypratama"
          secondaryButtonText="View My Work"
          secondaryButtonHref="/work"
        />
      </Column>
    </Column>
  );
}
