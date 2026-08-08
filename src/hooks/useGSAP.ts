import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGSAP = (
  callback: () => void,
  deps: any[] = []
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      callbackRef.current();
    });

    return () => ctx.revert();
  }, deps);
};

export const useScrollTrigger = (
  target: HTMLElement | React.RefObject<HTMLElement>,
  callback: (trigger: ScrollTrigger) => void,
  options: ScrollTrigger.Vars = {}
) => {
  useEffect(() => {
    const element = target instanceof HTMLElement ? target : target.current;
    if (!element) return;

    const trigger = ScrollTrigger.create({
      trigger: element,
      ...options,
      onEnter: () => callback(trigger),
      onEnterBack: () => callback(trigger),
    });

    return () => trigger.kill();
  }, [target, callback, options]);
};

export const useParallax = (
  target: React.RefObject<HTMLElement>,
  speed: number = 0.5
) => {
  useEffect(() => {
    const element = target.current;
    if (!element) return;

    gsap.to(element, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [target, speed]);
};

export const useStaggeredReveal = (
  targets: React.RefObject<HTMLElement>,
  delay: number = 0.1
) => {
  useEffect(() => {
    const container = targets.current;
    if (!container) return;

    const children = Array.from(container.children);
    
    gsap.fromTo(children,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: delay,
        ease: 'cubic-bezier(0.32, 0.72, 0, 1)',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [targets, delay]);
};
