"use client";

import { SectionReveal } from "./SectionReveal";

interface ChapterProps {
  index: string;
  label: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  action?: React.ReactNode;
}

export function Chapter({ index, label, title, lead, action }: ChapterProps) {
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
        <span>{label}</span>
      </p>
      <h2 className="text-h1 chapter-title reveal-heading">{title}</h2>
      {lead && <p className="text-body-large chapter-lead reveal-body">{lead}</p>}
      {action && <div className="chapter-action reveal-body">{action}</div>}
    </SectionReveal>
  );
}

export default Chapter;