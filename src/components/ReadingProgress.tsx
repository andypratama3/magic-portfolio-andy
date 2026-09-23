"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function ReadingProgress() {
  const pathname = usePathname() ?? "";
  const isCaseStudy = pathname.startsWith("/work/") && pathname !== "/work";
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isCaseStudy) return;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isCaseStudy]);

  if (!isCaseStudy) return null;

  return (
    <div className="reading-progress" aria-hidden="true">
      <span style={{ transform: `scaleX(${progress / 100})` }} />
    </div>
  );
}
