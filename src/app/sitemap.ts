import { MetadataRoute } from "next";
import { getPosts } from "@/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all blog posts
  let blogs: MetadataRoute.Sitemap = [];
  if (routesConfig["/blog"]) {
    try {
      blogs = getPosts(["src", "app", "blog", "posts"]).map((post) => ({
        url: `${baseURL}/blog/${post.slug}`,
        lastModified: new Date(post.metadata.publishedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
    } catch (error) {
      console.warn("Failed to load blog posts:", error);
    }
  }

  // Get all work projects
  let works: MetadataRoute.Sitemap = [];
  try {
    works = getPosts(["src", "app", "work", "projects"]).map((post) => ({
      url: `${baseURL}/work/${post.slug}`,
      lastModified: new Date(post.metadata.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.warn("Failed to load work projects:", error);
  }

  // Get all active static routes
  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig]
  );

  const routes: MetadataRoute.Sitemap = activeRoutes.map((route) => {
    const isHomepage = route === "/";
    return {
      url: `${baseURL}${isHomepage ? "" : route}`,
      lastModified: new Date(),
      changeFrequency: isHomepage ? ("weekly" as const) : ("monthly" as const),
      priority: isHomepage ? 1.0 : 0.9,
    };
  });

  return [...routes, ...blogs, ...works];
}
