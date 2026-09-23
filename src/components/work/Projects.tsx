"use client";

import { useEffect, useRef } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { animateStaggeredCards } from "@/lib/gsap/animations";

interface ProjectTeamMember {
  avatar: string;
}

interface ProjectMetadata {
  publishedAt: string;
  images: string[];
  title: string;
  summary: string;
  team?: ProjectTeamMember[];
  link?: string;
}

interface Project {
  slug: string;
  metadata: ProjectMetadata;
  content: string;
}

interface ProjectsProps {
  range?: [number, number?];
  projects: Project[];
  featuredSlug?: string;
}

export function Projects({ range, projects, featuredSlug }: ProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const displayedProjects = range
    ? projects.slice(range[0] - 1, range[1] ?? projects.length)
    : projects;

  const isSingleFeatured = Boolean(featuredSlug) && displayedProjects.length > 0;

  useEffect(() => {
    if (containerRef.current) {
      const cleanup = animateStaggeredCards(containerRef.current, "article", 0.15);
      return cleanup;
    }
  }, [displayedProjects]);

  if (isSingleFeatured && displayedProjects.length > 0) {
    const post = displayedProjects[0];
    return (
      <div ref={containerRef} style={{ width: "100%" }}>
        <ProjectCard
          featured={true}
          priority={true}
          key={post.slug}
          href={`/work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          index={0}
          tags={
            post.slug === "productschool"
              ? ["893 routes", "Laravel 12", "18 roles", "WhatsApp bot", "Headless PDF"]
              : []
          }
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
        gap: "2rem",
      }}
    >
      {displayedProjects.map((post, index) => (
        <ProjectCard
          key={post.slug}
          priority={index < 2}
          href={`/work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          index={range ? range[0] - 1 + index : index}
          featured={false}
        />
      ))}
    </div>
  );
}

export default Projects;
