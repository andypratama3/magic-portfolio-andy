"use client";

import { useEffect, useRef } from "react";
import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";
import { staggeredReveal } from "@/utils/gsap";

interface ProjectsProps {
  range?: [number, number?];
  projects: any[];
}

export function Projects({ range, projects }: ProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const sortedProjects = [...projects].sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  useEffect(() => {
    if (containerRef.current) {
      const cards = Array.from(containerRef.current.children);
      staggeredReveal(cards as HTMLElement[], 0.15);
    }
  }, [displayedProjects]);

  return (
    <Column 
      ref={containerRef}
      fillWidth 
      gap="xl" 
      marginBottom="40" 
      paddingX="l"
      style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
        gap: '2rem',
        gridAutoFlow: 'dense',
      }}
    >
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={post.metadata.team?.map((member: any) => ({ src: member.avatar })) || []}
          link={post.metadata.link || ""}
          index={index}
        />
      ))}
    </Column>
  );
}
