"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const ActiveSectionContext = createContext<string | null>(null);

const SCROLLSPY_LINE_RATIO = 0.35;

function findActiveSection(): string | null {
  const line = window.innerHeight * SCROLLSPY_LINE_RATIO;
  let active: string | null = null;
  document.querySelectorAll<HTMLElement>("[data-scrollspy]").forEach((element) => {
    if (element.id && element.getBoundingClientRect().top <= line) {
      active = element.id;
    }
  });
  return active;
}

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const frame = useRef(0);

  const update = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      setActiveId(findActiveSection());
    });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    const ready = window.setTimeout(update, 600);
    return () => {
      cancelAnimationFrame(frame.current);
      window.clearTimeout(ready);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  return <ActiveSectionContext.Provider value={activeId}>{children}</ActiveSectionContext.Provider>;
}

export function useActiveSection(): string | null {
  return useContext(ActiveSectionContext);
}