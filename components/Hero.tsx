"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AuroraBackground } from "@/components/layout/AuroraBackground";
import { MagneticButton } from "@/components/motion/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const Hero = () => {
  const sectionRef  = useRef<HTMLElement>(null);
  const bgRef       = useRef<HTMLDivElement>(null);
  const labelRef    = useRef<HTMLDivElement>(null);
  const headRef     = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── Mobile: skip the pinned scroll scrub entirely ──────────────
    // GSAP pin on mobile causes jank because it creates a sticky
    // stacking context that conflicts with native momentum scrolling.
    // Mobile gets a clean static hero with just the Framer entrance.
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=90%",
          pin: true,
          scrub: 1.2,        // slightly lower scrub = less work per frame
          pinSpacing: true,
          anticipatePin: 1,
          // fastScrollEnd prevents stutter after fast scroll flicks
          fastScrollEnd: true,
        },
      });

      // Layer 3 — Background (slowest drift)
      tl.to(bgRef.current,    { scale: 1.07, opacity: 0.45, ease: "none" }, 0);

      // Layer 1 — Foreground text (fastest exit, staggered Y offsets)
      tl.to(labelRef.current,    { y: -50,  opacity: 0, ease: "none" }, 0);
      tl.to(headRef.current,     { y: -75,  opacity: 0, ease: "none" }, 0.05);
      tl.to(subRef.current,      { y: -100, opacity: 0, ease: "none" }, 0.1);
      tl.to(ctaRef.current,      { y: -125, opacity: 0, ease: "none" }, 0.15);
      tl.to(indicatorRef.current, { opacity: 0, ease: "none" }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Background ──────────────────────────────────────── */}
      <div ref={bgRef} className="absolute inset-0">
        <AuroraBackground />
        {/* Dot grid — desktop only (expensive on mobile) */}
        <div
          className="absolute inset-0 pointer-events-none hidden sm:block"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22'%3E%3Ccircle cx='1' cy='1' r='0.75' fill='%23fff' fill-opacity='0.045'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to top, hsl(var(--bg-canvas)) 0%, transparent 100%)",
          zIndex: 2,
        }}
        aria-hidden="true"
      />

      {/* ── Content ─────────────────────────────────────────── */}
      <motion.div
        className="relative w-full z-10"
        style={{ padding: "6rem 1.25rem 4rem" }}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto">
          {/* Label */}
          <motion.div ref={labelRef} variants={item} className="mb-6 sm:mb-8">
            <span className="inline-flex items-center gap-2.5 text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-white/40">
              <span className="w-5 h-px bg-white/20 rounded-full inline-block" />
              Skill Commerce LLC — Florida, USA
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            ref={headRef}
            variants={item}
            className="font-display font-bold text-white text-balance mb-5 sm:mb-7"
            style={{
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              maxWidth: "52rem",
            }}
          >
            Engineering Scalable Digital Commerce Infrastructure
          </motion.h1>

          {/* Subtext */}
          <motion.p
            ref={subRef}
            variants={item}
            className="text-white/50 max-w-lg sm:max-w-xl mb-9 sm:mb-12 text-balance"
            style={{ fontSize: "clamp(0.95rem, 2.5vw, 1.125rem)", lineHeight: 1.65 }}
          >
            Skill Commerce LLC delivers structured, data-driven commerce systems
            for modern online retail operations.
          </motion.p>

          {/* CTAs */}
          <motion.div
            ref={ctaRef}
            variants={item}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5"
          >
            {/* Primary CTA — no MagneticButton on mobile (it adds event listeners) */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white text-zinc-950 px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg font-semibold text-sm sm:text-base group hover:bg-white/90 transition-all duration-200 active:scale-[0.98]"
            >
              Request Consultation
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            <a
              href="#capabilities"
              className="inline-flex items-center gap-2 text-white/45 hover:text-white/75 text-sm transition-colors duration-200 py-1"
            >
              Explore services
              <span className="w-4 h-px bg-current inline-block" />
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ────────────────────────────────── */}
      <motion.div
        ref={indicatorRef}
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 z-10"
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
