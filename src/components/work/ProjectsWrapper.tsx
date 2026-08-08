import { getPosts } from "@/utils/utils";
import { Projects } from "./Projects";

interface ProjectsWrapperProps {
  range?: [number, number?];
}

export function ProjectsWrapper({ range }: ProjectsWrapperProps) {
  const allProjects = getPosts(["src", "app", "work", "projects"]);
  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  return <Projects range={range} projects={sortedProjects} />;
}
