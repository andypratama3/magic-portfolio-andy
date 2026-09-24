"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, isReducedMotion } from "@/lib/gsap/config";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * CinematicScroll
 * The "alive" layer of the homepage. Everything is scrubbed against the
 * scroll position (never autonomous loops), transform/opacity only, and
 * skipped entirely under prefers-reduced-motion.
 *
 *  1. Lenis smooth scroll — the glide that makes the whole page feel live.
 *     Controls the real window scroll, so ScrollTrigger, the reading
 *     progress bar, and the header collapse all keep working.
 *  2. Hero exit — hero content drifts up and fades as it leaves.
 *  3. Flagship frame — a sticky "viewfinder" with a slow camera push-in.
 *  4. Ghost numerals — the big chapter watermark that drifts behind each
 *     heading, opposite to the scroll direction.
 *  5. Section drift — chapter bodies move a little faster/slower than the
 *     scroll to add depth between sections.
 */
const HOLD = 0.55;

export function CinematicScroll() {
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const init = () => {
      if (cancelled) return;
      const sizeViewport = () => {
        const frame = document.querySelector<HTMLElement>(".case-media");
        const vp = document.querySelector<HTMLElement>(".case-viewport");
        if (!frame || !vp) return;
        const hold = Math.round(window.innerHeight * HOLD);
        vp.style.height = `${Math.round(frame.getBoundingClientRect().height) + hold}px`;
      };

      sizeViewport();
      window.addEventListener("resize", sizeViewport);

      let lenis: Lenis | null = null;
      const onTick = (time: number) => lenis?.raf(time * 1000);

      if (!isReducedMotion()) {
        lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(onTick);
        gsap.ticker.lagSmoothing(0);
        window.__lenis = lenis;
      }

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const ctx = gsap.context(() => {
          const hero = document.querySelector<HTMLElement>(".hero-scope");
          const heroContent = document.querySelector<HTMLElement>(".hero-content");
          if (hero && heroContent) {
            gsap.to(heroContent, {
              yPercent: -10,
              opacity: 0.2,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
              },
            });
          }

          const vp = document.querySelector<HTMLElement>(".case-viewport");
          const img = document.querySelector<HTMLElement>(".case-media img");
          if (vp && img) {
            gsap.fromTo(
              img,
              { scale: 1.1, yPercent: -4 },
              {
                scale: 1.26,
                yPercent: 4,
                ease: "none",
                scrollTrigger: {
                  trigger: vp,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.5,
                },
              }
            );
          }

          gsap.utils.toArray<HTMLElement>(".chapter-ghost").forEach((ghost) => {
            gsap.fromTo(
              ghost,
              { yPercent: 22, opacity: 0.015 },
              {
                yPercent: -34,
                opacity: 0.07,
                ease: "none",
                scrollTrigger: {
                  trigger: ghost.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          });

          const driftSelectors = [
            ".what-list",
            ".metrics-grid",
            ".case-grid",
            ".case-narrative",
            ".eng-rows",
          ];
          driftSelectors.forEach((sel) => {
            gsap.utils.toArray<HTMLElement>(sel).forEach((el) => {
              gsap.fromTo(
                el,
                { yPercent: 2.5 },
                {
                  yPercent: -2.5,
                  ease: "none",
                  scrollTrigger: {
                    trigger: el,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                }
              );
            });
          });
        });

        return () => ctx.revert();
      });

      return () => {
        window.removeEventListener("resize", sizeViewport);
        if (lenis) {
          gsap.ticker.remove(onTick);
          lenis.destroy();
          delete window.__lenis;
        }
        mm.revert();
      };
    };

    let idleHandle: number | ReturnType<typeof setTimeout> = 0;
    let cleanup: (() => void) | undefined;

    const ric = (window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    }).requestIdleCallback;
    if (ric) {
      idleHandle = ric(() => {
        if (!cancelled) cleanup = init();
      }, { timeout: 1200 });
    } else {
      idleHandle = setTimeout(() => {
        if (!cancelled) cleanup = init();
      }, 250);
    }

    return () => {
      cancelled = true;
      const clear = (window as unknown as { cancelIdleCallback?: (h: number) => void }).cancelIdleCallback;
      if (typeof idleHandle === "number" && clear) clear(idleHandle);
      else if (typeof idleHandle === "number") clearTimeout(idleHandle);
      cleanup?.();
    };
  }, []);

  return <div ref={scopeRef} style={{ display: "contents" }} aria-hidden="true" />;
}

export default CinematicScroll;