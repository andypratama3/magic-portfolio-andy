import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Custom cubic-bezier for premium feel
export const premiumEase = 'cubic-bezier(0.32, 0.72, 0, 1)';
export const smoothEase = 'cubic-bezier(0.4, 0, 0.2, 1)';

// Hero animation - cinematic reveal
export const animateHero = (elements: {
  eyebrow?: HTMLElement;
  heading: HTMLElement;
  subline: HTMLElement;
  buttons: HTMLElement;
  image: HTMLElement;
}) => {
  const tl = gsap.timeline();

  if (elements.eyebrow) {
    tl.fromTo(elements.eyebrow,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: premiumEase }
    );
  }

  tl.fromTo(elements.heading,
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, ease: premiumEase },
    elements.eyebrow ? '-=0.4' : undefined
  )
  .fromTo(elements.subline,
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: premiumEase },
    '-=0.6'
  )
  .fromTo(elements.buttons,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: premiumEase },
    '-=0.5'
  )
  .fromTo(elements.image,
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.4, ease: premiumEase },
    '-=0.8'
  );

  return tl;
};

// Scroll pinning for split sections
export const createScrollPinning = (
  pinnedElement: HTMLElement,
  scrollingElement: HTMLElement,
  trigger: HTMLElement
) => {
  gsap.to(scrollingElement, {
    scrollTrigger: {
      trigger,
      start: 'top top',
      end: 'bottom bottom',
      pin: pinnedElement,
      scrub: 1,
    },
  });
};

// Image scale and fade on scroll
export const animateImageScroll = (images: HTMLElement[]) => {
  images.forEach((img) => {
    gsap.fromTo(img,
      { scale: 0.8, opacity: 0.3 },
      {
        scale: 1,
        opacity: 1,
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'top center',
          scrub: 1,
        },
      }
    );

    gsap.to(img, {
      opacity: 0.2,
      scrollTrigger: {
        trigger: img,
        start: 'center center',
        end: 'bottom top',
        scrub: 1,
      },
    });
  });
};

// Staggered reveal for cards
export const staggeredReveal = (elements: HTMLElement[], delay: number = 0.1) => {
  gsap.fromTo(elements,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: delay,
      ease: premiumEase,
      scrollTrigger: {
        trigger: elements[0],
        start: 'top 80%',
      },
    }
  );
};

// Card stacking animation
export const cardStacking = (cards: HTMLElement[]) => {
  cards.forEach((card, index) => {
    gsap.fromTo(card,
      { y: 100 * index, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: premiumEase,
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
        },
      }
    );
  });
};

// Magnetic button effect
export const magneticButton = (button: HTMLElement) => {
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: smoothEase,
    });
  });

  button.addEventListener('mouseleave', () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: premiumEase,
    });
  });
};

// Text scrub reveal
export const textScrubReveal = (words: HTMLElement[]) => {
  words.forEach((word, index) => {
    gsap.fromTo(word,
      { opacity: 0.1 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: word,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      }
    );
  });
};

// Parallax effect
export const parallaxEffect = (element: HTMLElement, speed: number = 0.5) => {
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
};

// Cleanup function
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};
