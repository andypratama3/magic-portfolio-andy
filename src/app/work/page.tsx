import type { Metadata } from "next";
import { baseURL, about, person, work } from "@/resources";
import { ProjectsWrapper } from "@/components/work/ProjectsWrapper";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: work.title,
    description: work.description,
    openGraph: {
      title: work.title,
      description: work.description,
      url: `${baseURL}${work.path}`,
      images: [
        {
          url: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default function Work() {
  return (
    <div style={{ width: "100%", paddingBottom: "clamp(4rem, 8vw, 7rem)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: work.title,
            description: work.description,
            url: `${baseURL}${work.path}`,
            author: {
              "@type": "Person",
              name: person.name,
              url: `${baseURL}${about.path}`,
            },
          }),
        }}
      />

      <section
        style={{
          width: "100%",
          paddingTop: "clamp(3rem, 6vw, 5rem)",
          paddingBottom: "clamp(2rem, 4vw, 3.5rem)",
          borderBottom: "1px solid var(--border-subtle)",
          marginBottom: "clamp(2.5rem, 5vw, 4rem)",
        }}
      >
        <div className="layout-container">
          <div style={{ marginBottom: "0.75rem" }}>
            <span className="kicker">Work</span>
          </div>

          <h1 className="text-display" style={{ maxWidth: "16ch", marginBottom: "1.1rem" }}>
            Case studies from systems that shipped.
          </h1>

          <p className="text-body-large" style={{ maxWidth: "36rem" }}>
            Architecture notes, data decisions, and the integrations that made the product usable —
            not a gallery of pretty screenshots.
          </p>
        </div>
      </section>

      <div className="layout-container">
        <ProjectsWrapper />
      </div>
    </div>
  );
}
