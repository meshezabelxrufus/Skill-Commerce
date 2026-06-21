/**
 * Skill Commerce — Motion System
 *
 * Split by library:
 *   Framer Motion (70–80%): section reveals, cards, buttons, navbar,
 *                            page transitions, hero content, stagger grids
 *   GSAP           (20–30%): hero background, ScrollTrigger sequences,
 *                            complex timelines, parallax, text splits
 *   Lenis:                   smooth scroll wrapper (configured in providers)
 *
 * All durations align with CSS motion tokens in globals.css.
 * All easing curves match --ease-* custom properties.
 */

import type { Variants, Transition, TargetAndTransition } from "framer-motion";

/* ============================================================
   TRANSITIONS
   Reusable Transition objects — pass to `transition` prop
   or embed inside variant definitions.
   ============================================================ */

export const transitions = {
  /** 150ms — hover states, color shifts, icon movement */
  fast: {
    duration: 0.15,
    ease: [0, 0, 0.2, 1],
  } satisfies Transition,

  /** 250ms — most component animations */
  base: {
    duration: 0.25,
    ease: [0, 0, 0.2, 1],
  } satisfies Transition,

  /** 400ms — card entrances, section reveals */
  slow: {
    duration: 0.4,
    ease: [0, 0, 0.2, 1],
  } satisfies Transition,

  /** 550ms — large section reveals */
  slower: {
    duration: 0.55,
    ease: [0.25, 0.46, 0.45, 0.94],
  } satisfies Transition,

  /** Spring — overshoot on arrival, used for cards and entrances */
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 28,
    mass: 0.8,
  } satisfies Transition,

  /** Spring gentle — subtler, used for content blocks */
  springGentle: {
    type: "spring",
    stiffness: 200,
    damping: 30,
    mass: 0.9,
  } satisfies Transition,

  /** Spring for magnetic buttons — very responsive */
  springMagnetic: {
    type: "spring",
    stiffness: 350,
    damping: 25,
    mass: 0.6,
  } satisfies Transition,

  /** Page entry / exit */
  page: {
    duration: 0.25,
    ease: [0.4, 0, 0.2, 1],
  } satisfies Transition,

  /** Hero elements — longer, more cinematic */
  hero: {
    duration: 0.7,
    ease: [0.25, 0.46, 0.45, 0.94],
  } satisfies Transition,

  /** Aurora ambient — very slow, imperceptible */
  aurora: {
    duration: 60,
    ease: "linear",
    repeat: Infinity,
    repeatType: "reverse" as const,
  } satisfies Transition,
} as const;

/* ============================================================
   STAGGER CONFIGS
   Used in `transition` on container variants.
   ============================================================ */

export const stagger = {
  /** 50ms — tight grids (logo strips, small badges) */
  fast:  { staggerChildren: 0.05, delayChildren: 0 },

  /** 80ms — service cards, feature lists */
  base:  { staggerChildren: 0.08, delayChildren: 0 },

  /** 120ms — framework steps, spaced lists */
  slow:  { staggerChildren: 0.12, delayChildren: 0 },

  /** 160ms — very deliberate sequential reveals */
  xslow: { staggerChildren: 0.16, delayChildren: 0 },

  /** Factory: add an initial delay before stagger begins */
  delayed: (delay = 0.2) => ({ staggerChildren: 0.08, delayChildren: delay }),
} as const;

/* ============================================================
   VIEWPORT CONFIG
   Passed to `viewport` prop on motion elements.
   ============================================================ */

export const viewport = {
  /** Standard: reveal when 15% of element is visible */
  default: { once: true, margin: "-15% 0px" },

  /** For short/small elements near the bottom of screen */
  near: { once: true, margin: "-5% 0px" },

  /** For tall sections that should trigger early */
  early: { once: true, margin: "-25% 0px" },
} as const;

/* ============================================================
   ENTRANCE VARIANTS
   ============================================================ */

/** Primary entrance — fade + rise. Use on 90% of elements. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: transitions.slow,
  },
};

/** Spring variant of fadeUp — use where landing feels physical */
export const fadeUpSpring: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 24,
      mass: 0.8,
    },
  },
};

/** Opacity only */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: transitions.slow },
};

/** Slide from right (ltr content) */
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: transitions.slow },
};

/** Slide from left */
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: transitions.slow },
};

/** Scale + fade — modals, popovers, small components */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: transitions.springGentle },
};

/* ============================================================
   STAGGER CONTAINER VARIANTS
   Apply to the wrapper. Children use any entrance variant.
   ============================================================ */

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: stagger.base },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: stagger.fast },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: stagger.slow },
};

/* ============================================================
   HERO SECTION
   ============================================================ */

/**
 * Hero headline container — stagger each word/line.
 * Pair with heroWord on each split element.
 */
export const heroHeadline: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { ...stagger.base, delayChildren: 0.1 },
  },
};

/**
 * Individual word/line within the hero headline.
 * Rotates slightly on Y-axis for a cinematic 3D feel.
 */
export const heroWord: Variants = {
  hidden: { opacity: 0, y: 32, rotateX: 6 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 240,
      damping: 22,
      mass: 0.8,
    },
  },
};

/** Hero eyebrow label — enters first, faster */
export const heroLabel: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0, 0, 0.2, 1] },
  },
};

/** Hero body copy */
export const heroBody: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0, 0, 0.2, 1], delay: 0.3 },
  },
};

/** Hero CTA — enters after body */
export const heroCta: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...transitions.springGentle, delay: 0.42 },
  },
};

/* ============================================================
   SECTION HEADER
   Label → headline → body — three-part stagger
   ============================================================ */

export const sectionHeader: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { ...stagger.slow, delayChildren: 0.05 },
  },
};

export const sectionLabel: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0, 0, 0.2, 1] },
  },
};

export const sectionHeadline: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ============================================================
   CARDS
   ============================================================ */

/** Card entrance — used as stagger child */
export const cardEntrance: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: transitions.springGentle,
  },
};

/** Card hover — use `whileHover` with `initial="rest"` */
export const cardHover = {
  rest: {
    y: 0,
    boxShadow: "var(--shadow-card)",
    borderColor: "hsl(var(--border-default))",
    transition: transitions.base,
  } satisfies TargetAndTransition,
  hover: {
    y: -4,
    boxShadow: "var(--shadow-card-hover)",
    borderColor: "hsl(var(--border-strong))",
    transition: { duration: 0.2, ease: [0, 0, 0.2, 1] },
  } satisfies TargetAndTransition,
};

/* ============================================================
   NAVBAR
   ============================================================ */

/** Animate backdrop + border on scroll */
export const navbarScrolled: Variants = {
  top: {
    backgroundColor: "rgba(250, 250, 250, 0)",
    backdropFilter: "blur(0px) saturate(100%)",
    borderBottomColor: "rgba(0,0,0,0)",
    transition: { duration: 0.3, ease: [0, 0, 0.2, 1] },
  },
  scrolled: {
    backgroundColor: "rgba(250, 250, 250, 0.85)",
    backdropFilter: "blur(16px) saturate(180%)",
    borderBottomColor: "hsl(var(--border-subtle))",
    transition: { duration: 0.3, ease: [0, 0, 0.2, 1] },
  },
};

/** Same for dark hero sections */
export const navbarScrolledDark: Variants = {
  top: {
    backgroundColor: "rgba(9, 9, 11, 0)",
    backdropFilter: "blur(0px) saturate(100%)",
    borderBottomColor: "rgba(255,255,255,0)",
    transition: { duration: 0.3, ease: [0, 0, 0.2, 1] },
  },
  scrolled: {
    backgroundColor: "rgba(9, 9, 11, 0.85)",
    backdropFilter: "blur(16px) saturate(180%)",
    borderBottomColor: "rgba(255,255,255,0.08)",
    transition: { duration: 0.3, ease: [0, 0, 0.2, 1] },
  },
};

/* ============================================================
   MOBILE MENU
   ============================================================ */

export const mobileMenu: Variants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: [0, 0, 0.2, 1] },
  },
};

export const mobileMenuItem: Variants = {
  closed: { opacity: 0, x: -10 },
  open: {
    opacity: 1,
    x: 0,
    transition: transitions.springGentle,
  },
};

export const mobileMenuContainer: Variants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { ...stagger.fast, delayChildren: 0.05 },
  },
};

/* ============================================================
   PAGE TRANSITIONS
   Wrap route content in AnimatePresence + motion.div
   ============================================================ */

export const pageTransition: Variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1, transition: transitions.page },
  exit: {
    opacity: 0,
    transition: { duration: 0.15, ease: [0.4, 0, 1, 1] },
  },
};

/* ============================================================
   BUTTONS
   ============================================================ */

/** Scale on press + hover */
export const buttonInteraction = {
  whileHover: { scale: 1.015 },
  whileTap: { scale: 0.97 },
  transition: transitions.fast,
};

/**
 * Magnetic button — apply these as animate props.
 * Pointer offset (x, y) is computed in the component via
 * useMotionValue + pointer event tracking, then passed here.
 */
export const magneticTransition = {
  type: "spring",
  stiffness: 350,
  damping: 28,
  mass: 0.6,
} satisfies Transition;

/** Arrow icon inside buttons — shifts right on hover */
export const buttonArrow = {
  rest: { x: 0, transition: transitions.fast },
  hover: { x: 4, transition: transitions.fast },
};

/* ============================================================
   IMAGE ZOOM
   Wrap <Image> in motion.div with these props
   ============================================================ */

export const imageZoom = {
  rest: {
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  } satisfies TargetAndTransition,
  hover: {
    scale: 1.04,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  } satisfies TargetAndTransition,
};

/* ============================================================
   ACCORDION
   ============================================================ */

export const accordionContent: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3, ease: [0, 0, 0.2, 1] },
  },
};

/* ============================================================
   STATISTICS / COUNTERS
   Framer entrance — GSAP handles the number count itself
   ============================================================ */

export const statBlock: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: transitions.springGentle,
  },
};

/* ============================================================
   FOOTER
   ============================================================ */

export const footerEntrance: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { ...stagger.base, delayChildren: 0.1 },
  },
};

/* ============================================================
   LOGO / CREDIBILITY STRIP
   ============================================================ */

export const logoStrip: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { ...stagger.fast, delayChildren: 0.15 },
  },
};

export const logoItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: transitions.base },
};

/* ============================================================
   FLOATING PARTICLES
   Create N instances, each with a unique delay + duration
   ============================================================ */

export const particleFloat = (delay = 0, duration = 6) => ({
  animate: {
    y: [0, -10, 0],
    opacity: [0.25, 0.55, 0.25],
  },
  transition: {
    duration,
    delay,
    repeat: Infinity,
    ease: "easeInOut",
  },
});

/* ============================================================
   GSAP CONFIGURATION
   These constants are consumed in gsap-animations.ts.
   They are plain objects — no GSAP import needed here so
   this file stays tree-shakeable.
   ============================================================ */

export const gsapDefaults = {
  ease:           "power3.out",
  easeEntrance:   "power2.out",
  easeSpring:     "back.out(1.4)",
  easeInOut:      "power2.inOut",
  duration:        0.7,
  durationFast:    0.3,
  durationHero:    1.0,
} as const;

export const scrollTriggerDefaults = {
  /** Standard section reveal — trigger at 85% from top */
  sectionReveal: {
    start:         "top 85%",
    toggleActions: "play none none none",
  },

  /** Pinned sections */
  pinned: {
    start:          "top top",
    end:            "+=100%",
    pin:            true,
    anticipatePin:  1,
  },

  /** Parallax backgrounds — scrub tied to scroll */
  parallax: {
    start:  "top bottom",
    end:    "bottom top",
    scrub:  1.5,
  },

  /** Number counters — fire once at 80% */
  counter: {
    start:  "top 80%",
    once:   true,
  },
} as const;

/** Hero background GSAP animation config */
export const heroBackgroundConfig = {
  /** Dot grid parallax: moves at 15% of scroll speed */
  parallaxRate: 0.15,

  /** Initial hero canvas reveal */
  reveal: {
    from:     { opacity: 0, scale: 1.02 },
    duration:  1.2,
    ease:     "power2.out",
  },

  /** Aurora blobs — passed to gsap.to() on each blob element */
  aurora: {
    duration: 60,
    ease:     "none",
    repeat:   -1,
    yoyo:     true,
  },
} as const;

/** GSAP SplitText reveal configs */
export const textReveal = {
  /** Line-by-line (for body paragraphs) */
  lines: {
    from:     { y: "105%", opacity: 0 },
    stagger:   0.08,
    duration:  0.7,
    ease:     "power3.out",
  },

  /** Word-by-word (for section headlines) */
  words: {
    from:     { y: "110%", opacity: 0, rotationX: 8 },
    stagger:   0.04,
    duration:  0.55,
    ease:     "power2.out",
  },

  /** Character-by-character (for display/hero text) */
  chars: {
    from:     { y: "120%", opacity: 0 },
    stagger:   0.02,
    duration:  0.45,
    ease:     "power2.out",
  },
} as const;

/* ============================================================
   LENIS SMOOTH SCROLL CONFIGURATION
   Pass to new Lenis() in your providers/lenis-provider.tsx
   ============================================================ */

export const lenisConfig = {
  /** Lerp factor — lower = slower, smoother. 0.1 is standard premium. */
  lerp:               0.1,

  /** Duration multiplier */
  duration:           1.2,

  /**
   * Custom easing for wheel input.
   * Expo-out feel — fast start, slow arrival.
   */
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

  orientation:        "vertical"  as const,
  gestureOrientation: "vertical"  as const,
  smoothWheel:         true,
  wheelMultiplier:     1.0,
  smoothTouch:         false,
  touchMultiplier:     2.0,
  infinite:            false,
} as const;

/* ============================================================
   USE-CASE MAP
   Quick reference for which tool handles which animation.

   HERO
     Background aurora + dot parallax → GSAP (heroBackgroundConfig)
     Headline word split              → GSAP SplitText (textReveal.words)
       OR Framer Motion               → heroHeadline + heroWord
     Eyebrow label                   → Framer (heroLabel)
     Body copy                       → Framer (heroBody)
     CTA button                      → Framer (heroCta)

   NAVBAR
     Backdrop + border on scroll     → Framer (navbarScrolled / navbarScrolledDark)
     Mobile drawer                   → Framer (mobileMenu + mobileMenuContainer)
     Mobile items stagger            → Framer (mobileMenuItem)

   SECTION REVEALS
     All below-fold sections         → Framer (staggerContainer + fadeUp)
     Trigger via viewport prop       → viewport.default

   SERVICE CARDS
     Grid entrance stagger           → Framer (staggerContainerSlow + cardEntrance)
     Hover lift                      → Framer (cardHover rest/hover states)
     Image inside card               → Framer (imageZoom rest/hover)

   STATS / COUNTERS
     Number count-up                 → GSAP (scrollTriggerDefaults.counter)
     Block entrance                  → Framer (statBlock)

   OPERATIONAL FRAMEWORK
     Step-by-step sequential reveal  → GSAP ScrollTrigger timeline
     OR simple stagger               → Framer (staggerContainerSlow + fadeUp)

   CTA BANNER
     Headline                        → Framer (scaleIn)
     Background aurora               → GSAP (heroBackgroundConfig.aurora)

   PAGE TRANSITIONS
     Route entry/exit                → Framer AnimatePresence (pageTransition)

   FOOTER
     Column stagger                  → Framer (footerEntrance + fadeUp)

   MICRO-INTERACTIONS
     Magnetic buttons                → Framer (magneticTransition on motion.div)
     Button press                    → Framer (buttonInteraction)
     Arrow icon in button            → Framer (buttonArrow rest/hover)
     Link underline                  → CSS (.link-underline utility in globals.css)
     Image zoom                      → Framer (imageZoom rest/hover)
     Accordion                       → Framer (accordionContent)
     Loading states                  → CSS (.skeleton utility in globals.css)

   BACKGROUND EFFECTS
     Dot grid                        → CSS (bg-dot-grid-light / bg-dot-grid-dark)
     Aurora gradient                 → GSAP (heroBackgroundConfig.aurora)
                                        + CSS (--gradient-aurora)
     Floating particles              → Framer (particleFloat factory)
     Glow pulse                      → CSS (glow-pulse keyframe)

   SCROLL INTERACTIONS
     Parallax backgrounds            → GSAP (scrollTriggerDefaults.parallax)
     Pinned sections (if used)       → GSAP (scrollTriggerDefaults.pinned)
     Section progress indicator      → GSAP useScroll or Framer useScroll
   ============================================================ */
