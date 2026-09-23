"use client";

import { ReadingProgress } from "./ReadingProgress";

export function SiteAtmosphere() {
  return (
    <>
      <div className="paper-grain" aria-hidden="true" />
      <ReadingProgress />
    </>
  );
}
