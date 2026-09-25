import { Suspense } from "react";
import { person } from "@/resources";
import { SectionReveal } from "./SectionReveal";

type GitHubRepo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  fork: boolean;
};

const LANGUAGE_COLORS: Record<string, string> = {
  PHP: "#4F5D95",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#663399",
  SCSS: "#c6538c",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Python: "#3572A5",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  Java: "#b07219",
  Vue: "#41b883",
  Blade: "#f7523f",
  Go: "#00ADD8",
  Rust: "#dea584",
  "C++": "#f34b7d",
  "C#": "#178600",
  Ruby: "#701516",
  "Jupyter Notebook": "#DA5B0B",
};

const FALLBACK_LANG_COLOR = "#8A857C";

async function fetchRepos(): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = [];
  for (let page = 1; page <= 10; page++) {
    const res = await fetch(
      `https://api.github.com/users/${person.github.username}/repos?per_page=100&page=${page}&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "magic-portfolio",
        },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
    const batch = (await res.json()) as GitHubRepo[];
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  return repos;
}

function formatCount(n: number): string {
  if (n >= 1000) {
    const value = n / 1000;
    return `${value >= 10 ? value.toFixed(0) : value.toFixed(1).replace(/\.0$/, "")}k`;
  }
  return String(n);
}

function langColor(language: string | null): string {
  if (!language) return FALLBACK_LANG_COLOR;
  return LANGUAGE_COLORS[language] ?? FALLBACK_LANG_COLOR;
}

function RepoStats({ repos, totalStars, totalForks, topLangs }: {
  repos: number;
  totalStars: number;
  totalForks: number;
  topLangs: string[];
}) {
  const stats = [
    { value: formatCount(repos), label: "Public repositories", sub: `Live on ${person.github.username}` },
    { value: formatCount(totalStars), label: "Stars received", sub: "Across every public repo" },
    { value: formatCount(totalForks), label: "Forks", sub: totalForks > 0 ? "Across every public repo" : "No public forks yet" },
    { value: topLangs.join(", ") || "Various", label: "Top languages", sub: "By public repo count" },
  ];

  return (
    <div className="metrics-grid" style={{ marginBottom: "clamp(2.25rem, 4vw, 3.25rem)" }}>
      {stats.map((stat) => (
        <div key={stat.label} className="metric-card" style={{ padding: "0.25rem 0" }}>
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.55rem, 2.6vw, 2.1rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: "var(--text-primary)",
            }}
          >
            {stat.value}
          </div>
          <div style={{ fontSize: "0.9375rem", fontWeight: 600, marginTop: "0.55rem", color: "var(--text-primary)" }}>
            {stat.label}
          </div>
          <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.5, marginTop: "0.2rem" }}>
            {stat.sub}
          </div>
        </div>
      ))}
    </div>
  );
}

function RepoCard({ repo }: { repo: GitHubRepo }) {
  const hasStars = repo.stargazers_count > 0;
  const hasForks = repo.forks_count > 0;
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="editorial-card github-card"
      aria-label={`Open repository ${repo.name} on GitHub`}
    >
      <span className="github-card-name">{repo.name}</span>
      {repo.description && <p className="github-card-desc">{repo.description}</p>}
      <span className="github-card-meta">
        {repo.language && (
          <span className="github-card-meta-item">
            <span className="lang-dot" style={{ background: langColor(repo.language) }} aria-hidden="true" />
            {repo.language}
          </span>
        )}
        {hasStars && <span className="github-card-meta-item">{formatCount(repo.stargazers_count)} stars</span>}
        {hasForks && <span className="github-card-meta-item">{formatCount(repo.forks_count)} forks</span>}
      </span>
    </a>
  );
}

function Banner({ body }: { body: string }) {
  return (
    <section style={{ paddingTop: "clamp(3rem, 6vw, 4.5rem)" }}>
      <div className="layout-container">
        <div style={{ marginBottom: "1.5rem" }}>
          <span className="kicker">Open source</span>
          <h2 className="text-h2" style={{ marginTop: "0.4rem" }}>
            Selected work on GitHub.
          </h2>
        </div>
        <div className="editorial-card" style={{ padding: "1.5rem" }}>
          <p style={{ margin: "0 0 1rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{body}</p>
          <a href={person.github.profile} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            Open github.com/{person.github.username}
          </a>
        </div>
      </div>
    </section>
  );
}

async function GitHubReposInner() {
  let repos: GitHubRepo[] = [];
  let failed = false;
  try {
    repos = await fetchRepos();
  } catch {
    failed = true;
  }

  if (failed) {
    return (
      <Banner body="GitHub was unreachable when this page loaded, so the live repository list did not render. The full archive is always on the profile." />
    );
  }

  const visible = repos.filter((r) => r.name !== person.github.username);

  if (visible.length === 0) {
    return <Banner body="No public repositories yet. They will appear here as soon as they exist." />;
  }

  const byName = new Map(visible.map((r) => [r.name, r]));

  const curated = person.github.featured
    .map((entry) => {
      const repo = byName.get(entry.name);
      if (!repo) return null;
      return { ...repo, description: entry.note || repo.description };
    })
    .filter((repo): repo is GitHubRepo => repo !== null);

  const totalStars = visible.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = visible.reduce((sum, r) => sum + r.forks_count, 0);

  const langCounts = new Map<string, number>();
  for (const r of visible) {
    if (!r.language) continue;
    langCounts.set(r.language, (langCounts.get(r.language) ?? 0) + 1);
  }
  const topLangs = [...langCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([lang]) => lang);

  return (
    <section style={{ paddingTop: "clamp(3rem, 6vw, 4.5rem)" }}>
      <div className="layout-container">
        <div style={{ marginBottom: "clamp(1.75rem, 3vw, 2.25rem)" }}>
          <SectionReveal>
            <span className="kicker reveal-body">Open source</span>
            <h2 className="text-h2 reveal-heading" style={{ marginTop: "0.4rem" }}>
              Selected work on GitHub.
            </h2>
            <p className="text-body-large reveal-body" style={{ marginTop: "0.75rem", maxWidth: "62ch" }}>
              {visible.length} public repositories in total. The projects below are the ones worth
              reading about; the rest of the archive stays on GitHub.
            </p>
            <div className="stack-actions reveal-body" style={{ marginTop: "1.1rem" }}>
              <a href={person.github.profile} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                View profile on GitHub
              </a>
            </div>
          </SectionReveal>
        </div>

        <RepoStats repos={visible.length} totalStars={totalStars} totalForks={totalForks} topLangs={topLangs} />

        {curated.length > 0 && (
          <>
            <div style={{ marginBottom: "0.9rem" }}>
              <span className="text-mono-label">Projects in focus · {curated.length}</span>
            </div>
            <div className="github-grid">
              {curated.map((repo) => (
                <RepoCard key={repo.name} repo={repo} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export function GitHubReposSkeleton() {
  return (
    <section style={{ paddingTop: "clamp(3rem, 6vw, 4.5rem)" }} aria-busy="true" aria-label="Loading GitHub repositories">
      <div className="layout-container">
        <div className="github-skeleton-head" aria-hidden="true">
          <div className="skeleton-line" style={{ width: "16%" }} />
          <div className="skeleton-line" style={{ width: "52%" }} />
          <div className="skeleton-line" style={{ width: "84%" }} />
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontFamily: "var(--font-code)" }}>
          Loading repositories from github.com/{person.github.username}
        </p>
      </div>
    </section>
  );
}

export async function GitHubRepos() {
  return (
    <Suspense fallback={<GitHubReposSkeleton />}>
      <GitHubReposInner />
    </Suspense>
  );
}

export default GitHubRepos;