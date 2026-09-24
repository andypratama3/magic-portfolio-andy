const ICON_SLUGS: Array<[key: string, slug: string]> = [
  ["laravel", "laravel"],
  ["next", "nextjs"],
  ["typescript", "typescript"],
  ["php", "php"],
  ["mysql", "mysql"],
  ["redis", "redis"],
  ["docker", "docker"],
  ["react", "react"],
  ["tailwind", "tailwindcss"],
  ["vue", "vuejs"],
  ["postgres", "postgresql"],
  ["nginx", "nginx"],
  ["github actions", "githubactions"],
  ["cloudflare", "cloudflare"],
  ["whatsapp", "whatsapp"],
];

export function techIcon(label: string): string | null {
  const haystack = label.toLowerCase();
  let slug: string | null = null;
  for (const [key, iconSlug] of ICON_SLUGS) {
    if (haystack.includes(key)) {
      slug = iconSlug;
      break;
    }
  }
  if (!slug && haystack.includes("eloquent")) {
    slug = "laravel";
  }
  if (!slug) {
    return null;
  }
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-original.svg`;
}