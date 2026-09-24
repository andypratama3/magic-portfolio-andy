import { gsap, ScrollTrigger, editorialEase, smoothEase, isReducedMotion } from "./config";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

/**
 * Editorial Hero Entrance Sequence
 * Duration: 800ms - 1200ms. Clean transform & opacity reveals.
 */
export const animateHeroEntrance = (
  scope: HTMLElement,
  elements: {
    eyebrow?: HTMLElement | null;
    heading?: HTMLElement | null;
    subline?: HTMLElement | null;
    meta?: HTMLElement | null;
    actions?: HTMLElement | null;
  }
) => {
  if (isReducedMotion()) {
    gsap.set(Object.values(elements).filter(Boolean), { opacity: 1, y: 0 });
    return;
  }

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: editorialEase } });

    if (elements.eyebrow) {
      tl.fromTo(
        elements.eyebrow,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      );
    }

    if (elements.heading) {
      tl.fromTo(
        elements.heading,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        elements.eyebrow ? "-=0.4" : 0
      );
    }

    if (elements.subline) {
      tl.fromTo(
        elements.subline,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.5"
      );
    }

    if (elements.meta) {
      tl.fromTo(
        elements.meta,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      );
    }

    if (elements.actions) {
      tl.fromTo(
        elements.actions,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      );
    }
  }, scope);

  return () => ctx.revert();
};

/**
 * Staggered Card Reveal on Scroll
 */
export const animateStaggeredCards = (
  container: HTMLElement | null,
  itemSelector: string = ".reveal-item",
  stagger: number = 0.1
) => {
  if (!container || isReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    const items = container.querySelectorAll(itemSelector);
    if (!items.length) return;

    gsap.fromTo(
      items,
      { y: 18 },
      {
        y: 0,
        duration: 0.65,
        stagger,
        ease: editorialEase,
        scrollTrigger: {
          trigger: container,
          start: "top 88%",
          once: true,
        },
      }
    );
  }, container);

  return () => ctx.revert();
};

/**
 * Count-up for verified metrics. Reads data-count and optional data-suffix.
 */
export const animateCountUp = (container: HTMLElement | null, itemSelector: string = "[data-count]") => {
  if (!container || isReducedMotion()) {
    container?.querySelectorAll<HTMLElement>(itemSelector).forEach((el) => {
      const target = Number(el.dataset.count || 0);
      const suffix = el.dataset.suffix || "";
      el.textContent = `${target}${suffix}`;
    });
    return () => {};
  }

  const ctx = gsap.context(() => {
    const items = container.querySelectorAll<HTMLElement>(itemSelector);
    items.forEach((el) => {
      const target = Number(el.dataset.count || 0);
      const suffix = el.dataset.suffix || "";
      const counter = { val: 0 };

      gsap.to(counter, {
        val: target,
        duration: 1.35,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${Math.round(counter.val)}${suffix}`;
        },
      });
    });
  }, container);

  return () => ctx.revert();
};

/**
 * Magnetic button interaction with safe cleanup
 */
export const setupMagneticButton = (
  element: HTMLElement | null,
  strength: number = 0.25
): (() => void) => {
  if (!element || isReducedMotion()) return () => {};

  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(element, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: smoothEase,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: editorialEase,
    });
  };

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
};

/**
 * SplitText Hero Reveal
 * Splits a heading into characters and animates them in with a stagger.
 * Returns a cleanup function that reverts the split.
 */
export const animateSplitText = (
  element: HTMLElement | null,
  options: {
    type?: "chars" | "words" | "lines";
    stagger?: number;
    duration?: number;
    delay?: number;
  } = {}
): (() => void) => {
  if (!element || isReducedMotion()) return () => {};

  const {
    type = "words",
    stagger = 0.06,
    duration = 0.7,
    delay = 0,
  } = options;

  const split = new SplitText(element, { type });
  const targets = type === "chars"
    ? split.chars
    : type === "words"
    ? split.words
    : split.lines;

  // Keep original display so wrapping doesn't break layout
  gsap.set(element, { visibility: "visible" });

  gsap.fromTo(
    targets,
    { y: 32, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: editorialEase,
      clearProps: "transform,opacity",
    }
  );

  return () => {
    split.revert();
  };
};

/**
 * Scroll-Triggered Heading Reveal
 * Fades a heading (+ optional subtext) in from below when it enters the viewport.
 * Designed for section headings that are NOT part of the hero entrance.
 */
export const animateHeadingReveal = (
  container: HTMLElement | null,
  options: {
    headingSelector?: string;
    bodySelector?: string;
    stagger?: number;
  } = {}
): (() => void) => {
  if (!container || isReducedMotion()) return () => {};

  const {
    headingSelector = ".reveal-heading",
    bodySelector = ".reveal-body",
    stagger = 0.12,
  } = options;

  const ctx = gsap.context(() => {
    const headings = Array.from(container.querySelectorAll<HTMLElement>(headingSelector));
    const bodies = Array.from(container.querySelectorAll<HTMLElement>(bodySelector));
    const all = [...headings, ...bodies];

    if (!all.length) return;

    gsap.fromTo(
      all,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger,
        ease: editorialEase,
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, container);

  return () => ctx.revert();
};

/**
 * Stagger list items inside an already-open panel.
 * Call immediately after the panel becomes visible (no ScrollTrigger needed).
 */
export const animateListStagger = (
  listEl: HTMLElement | null,
  itemSelector: string = "li"
): void => {
  if (!listEl || isReducedMotion()) return;

  const items = listEl.querySelectorAll<HTMLElement>(itemSelector);
  if (!items.length) return;

  gsap.fromTo(
    items,
    { x: -10, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.06,
      ease: editorialEase,
    }
  );
};
