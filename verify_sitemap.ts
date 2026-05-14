// Quick reference of what the sitemap includes
const baseURL = "https://andypratama.vercel.app";
const routes = {
  "/": true,
  "/about": true,
  "/work": true,
  "/blog": false,
  "/gallery": true,
  "/plugin": true
};

console.log("=== SITEMAP CONTENTS ===\n");

// Static routes
console.log("📍 STATIC ROUTES (Active):");
const activeRoutes = Object.keys(routes).filter(route => routes[route]);
activeRoutes.forEach(route => {
  const url = route === "/" ? baseURL : `${baseURL}${route}`;
  console.log(`  ✓ ${url} (priority: ${route === "/" ? "1.0" : "0.9"})`);
});

// Blog posts
console.log("\n📚 BLOG POSTS (11 total):");
const blogPosts = [
  "blog", "components", "content", "localization", "mailchimp",
  "pages", "password", "quick-start", "seo", "styling", "work"
];
blogPosts.forEach(slug => {
  console.log(`  ✓ ${baseURL}/blog/${slug} (priority: 0.7)`);
});

// Work projects
console.log("\n💼 WORK PROJECTS (4 total):");
const workProjects = [
  "bappedakaltim", "kartaspa", "sdmuhammadiyah3", "sdmuhammadiyah3new"
];
workProjects.forEach(slug => {
  console.log(`  ✓ ${baseURL}/work/${slug} (priority: 0.8)`);
});

console.log("\n=== SUMMARY ===");
const staticCount = activeRoutes.length;
const blogCount = blogPosts.length;
const workCount = workProjects.length;
const totalCount = staticCount + blogCount + workCount;
console.log(`Total URLs in sitemap: ${totalCount}`);
console.log(`  - Static routes: ${staticCount}`);
console.log(`  - Blog posts: ${blogCount}`);
console.log(`  - Work projects: ${workCount}`);
console.log(`\nBase URL: ${baseURL}`);
