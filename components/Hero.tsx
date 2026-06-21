"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AuroraBackground } from "@/components/layout/AuroraBackground";
import { MagneticButton } from "@/components/motion/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

/* ── Framer Motion entrance variants (page-load only) ─────── */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" as const } },
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── PINNED SCROLL SCRUB ──────────────────────────────
         The section is pinned so it stays on screen while the
         user scrolls through 100% of the viewport height.
         During that scroll, content layers drift at different
         speeds — foreground faster, background slower.
      ─────────────────────────────────────────────────────── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: 1.4,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // Layer 3 — Background (slow, cinematic drift)
      tl.to(bgRef.current, { scale: 1.08, opacity: 0.5, ease: "none" }, 0);

      // Layer 1 — Foreground text (fast exit)
      tl.to(labelRef.current,   { y: -55,  opacity: 0, ease: "none" }, 0);
      tl.to(headRef.current,    { y: -80,  opacity: 0, ease: "none" }, 0.05);
      tl.to(subRef.current,     { y: -105, opacity: 0, ease: "none" }, 0.1);
      tl.to(ctaRef.current,     { y: -130, opacity: 0, ease: "none" }, 0.15);

      // Scroll indicator fades immediately
      tl.to(scrollIndicatorRef.current, { opacity: 0, ease: "none" }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Background layers ────────────────────────────── */}
      <div ref={bgRef} className="absolute inset-0">
        <AuroraBackground />
        {/* Dot grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22'%3E%3Ccircle cx='1' cy='1' r='0.75' fill='%23fff' fill-opacity='0.05'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />
      </div>

      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to top, hsl(var(--bg-canvas)) 0%, transparent 100%)",
          zIndex: 2,
        }}
        aria-hidden="true"
      />

      {/* ── Foreground content ────────────────────────────── */}
      <motion.div
        ref={contentRef}
        className="relative w-full section-padding"
        style={{ zIndex: 10 }}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto">
          {/* Label */}
          <motion.div ref={labelRef} variants={item} className="mb-6 sm:mb-8">
            <span className="inline-flex items-center gap-3 text-[11px] sm:text-xs font-medium tracking-[0.22em] uppercase text-white/40">
              <span className="w-6 h-px bg-white/20 rounded-full inline-block" />
              Skill Commerce LLC — Florida, USA
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            ref={headRef}
            variants={item}
            className="heading-xl text-white text-balance mb-6 sm:mb-8 max-w-4xl"
            style={{ lineHeight: 1.06 }}
          >
            Engineering Scalable Digital Commerce Infrastructure
          </motion.h1>

          {/* Subtext */}
          <motion.p
            ref={subRef}
            variants={item}
            className="body-lg text-white/50 max-w-xl mb-10 sm:mb-14 text-balance"
          >
            Skill Commerce LLC delivers structured, data-driven commerce systems
            for modern online retail operations.
          </motion.p>

          {/* CTAs */}
          <motion.div
            ref={ctaRef}
            variants={item}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <MagneticButton>
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 bg-white text-zinc-950 px-7 sm:px-8 py-3.5 sm:py-4 rounded-lg font-semibold text-sm sm:text-base group hover:bg-white/90 transition-all duration-200"
              >
                Request Consultation
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </MagneticButton>

            <a
              href="#capabilities"
              className="inline-flex items-center gap-2 text-white/45 hover:text-white/80 text-sm transition-colors duration-200 py-3.5 sm:py-0"
            >
              Explore services
              <span className="w-4 h-px bg-current inline-block" />
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ──────────────────────────────── */}
      <motion.div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-white/25" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
