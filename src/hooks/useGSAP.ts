import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, editorialEase } from '@/lib/gsap/config';

export const useGSAP = (
  callback: () => void,
  deps: unknown[] = []
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const ctx = gsap.context(() => {
      gsap.to(element, {
        yPercent: -30 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [target, speed]);
};

export const useStaggeredReveal = (
  targets: React.RefObject<HTMLElement>,
  delay: number = 0.1
) => {
  useEffect(() => {
    const container = targets.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const children = Array.from(container.children);
      gsap.fromTo(children,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: delay,
          ease: editorialEase,
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [targets, delay]);
};
