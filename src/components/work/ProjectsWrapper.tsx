import { getPosts } from "@/utils/utils";
import { Projects } from "./Projects";

interface ProjectsWrapperProps {
  range?: [number, number?];
  featuredSlug?: string;
  excludeSlug?: string;
}

export function ProjectsWrapper({ range, featuredSlug, excludeSlug }: ProjectsWrapperProps) {
  const allProjects = getPosts(["src", "app", "work", "projects"]);
  const sortedProjects = [...allProjects]
    .filter((project) => (excludeSlug ? project.slug !== excludeSlug : true))
    .sort((a, b) => {
      if (featuredSlug) {
        if (a.slug === featuredSlug) return -1;
        if (b.slug === featuredSlug) return 1;
      }
      return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
    });

  return <Projects range={range} projects={sortedProjects} featuredSlug={featuredSlug} />;
}
