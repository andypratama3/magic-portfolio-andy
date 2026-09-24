"use client";

import { SectionReveal } from "./SectionReveal";
import { useActiveSection } from "./ActiveSectionProvider";

interface ChapterProps {
  index: string;
  label: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  action?: React.ReactNode;
  sectionId?: string;
}

export function Chapter({ index, label, title, lead, action, sectionId }: ChapterProps) {
  const activeId = useActiveSection();
  const isActive = Boolean(sectionId && activeId === sectionId);

  return (
    <SectionReveal className="chapter-head">
      <span className="chapter-ghost" aria-hidden="true">
        {index}
      </span>
      <p className="chapter-line reveal-body">
        <span className="chapter-index" aria-hidden="true">
          {index}
        </span>
        <span className="chapter-sep" aria-hidden="true">
          /
        </span>
        {isActive ? (
          <span className="neon-sign neon-label">
            {label.split(" ").map((word, wordIndex) => (
              <span
                key={wordIndex}
                className="neon-word"
                style={{ animationDelay: `${wordIndex * 0.2}s` }}
              >
                {word}
              </span>
            ))}
          </span>
        ) : (
          <span>{label}</span>
        )}
      </p>
      <h2 className="text-h1 chapter-title reveal-heading">{title}</h2>
      {lead && <p className="text-body-large chapter-lead reveal-body">{lead}</p>}
      {action && <div className="chapter-action reveal-body">{action}</div>}
    </SectionReveal>
  );
}

export default Chapter;