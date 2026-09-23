import { gsap, ScrollTrigger, editorialEase, smoothEase, isReducedMotion } from "@/lib/gsap/config";
import { setupMagneticButton, animateStaggeredCards } from "@/lib/gsap/animations";

export const premiumEase = editorialEase;
export { smoothEase, isReducedMotion };

// Hero animation - cinematic reveal with scoped context
export const animateHero = (elements: {
  eyebrow?: HTMLElement;
  heading: HTMLElement;
  subline: HTMLElement;
  buttons: HTMLElement;
  image?: HTMLElement;
}) => {
  if (isReducedMotion()) {
    gsap.set(Object.values(elements).filter(Boolean), { opacity: 1, y: 0 });
    return { revert: () => {} };
  }

  const tl = gsap.timeline({ defaults: { ease: editorialEase } });

  if (elements.eyebrow) {
    tl.fromTo(elements.eyebrow,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }
    );
  }

  tl.fromTo(elements.heading,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 },
    elements.eyebrow ? "-=0.4" : 0
  )
  .fromTo(elements.subline,
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7 },
    "-=0.5"
  )
  .fromTo(elements.buttons,
    { y: 16, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6 },
    "-=0.4"
  );

  if (elements.image) {
    tl.fromTo(elements.image,
      { scale: 0.96, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8 },
      "-=0.6"
    );
  }

  return tl;
};

// Staggered reveal for cards with safe scoped trigger
export const staggeredReveal = (elements: HTMLElement[], delay: number = 0.1) => {
  if (!elements.length || isReducedMotion()) return;
  
  gsap.fromTo(elements,
    { y: 32, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: delay,
      ease: editorialEase,
      scrollTrigger: {
        trigger: elements[0],
        start: 'top 85%',
        once: true,
      },
    }
  );
};

// Image scroll animation
export const animateImageScroll = (images: HTMLElement[]) => {
  if (!images.length || isReducedMotion()) return;

  images.forEach((img) => {
    gsap.fromTo(img,
      { opacity: 0.6 },
      {
        opacity: 1,
        duration: 0.6,
        ease: editorialEase,
        scrollTrigger: {
          trigger: img,
          start: 'top 90%',
          once: true,
        },
      }
    );
  });
};

// Card stacking animation
export const cardStacking = (cards: HTMLElement[]) => {
  if (!cards.length || isReducedMotion()) return;

  cards.forEach((card, index) => {
    gsap.fromTo(card,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: index * 0.08,
        ease: editorialEase,
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          once: true,
        },
      }
    );
  });
};

// Magnetic button helper
export const magneticButton = (button: HTMLElement) => {
  return setupMagneticButton(button, 0.2);
};

// Safe cleanup
export const cleanupScrollTriggers = () => {
  ScrollTrigger.refresh();
};
