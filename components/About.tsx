"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CountUp } from "@/components/motion/CountUp";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 100, suffix: "%", label: "U.S. Registered", isNumeric: true },
  { value: "Governed", label: "Structured Ops", isNumeric: false },
  { value: "Scalable", label: "Infrastructure", isNumeric: false },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      if (isMobile) return;
      // Left column slides from left
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 35%",
            scrub: 1.3,
          },
        }
      );
      // Right column slides from right
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0, ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 35%",
            scrub: 1.3,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section-padding relative" style={{ zIndex: 1 }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "hsl(var(--bg-canvas) / 0.65)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left */}
          <div ref={leftRef}>
            <span className="text-label">About the Firm</span>
            <h2 className="heading-lg mt-3 sm:mt-4">
              Commerce Architecture for Sustained Growth
            </h2>
          </div>

          {/* Right */}
          <div ref={rightRef} className="space-y-5 sm:space-y-6">
            <p className="body-md text-muted-foreground">
              Skill Commerce LLC is a Florida-registered limited liability company
              focused on commerce architecture, marketplace infrastructure, and
              operational scalability. We design and implement systems that support
              structured, long-term growth for modern retail operations.
            </p>
            <p className="body-md text-muted-foreground">
              Our approach emphasizes governance, system design, and growth
              enablement — ensuring every operational layer is built for
              reliability, compliance, and measurable performance at scale.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-4 sm:pt-6 border-t border-white/8">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-foreground">
                    {stat.isNumeric && typeof stat.value === "number" ? (
                      <CountUp value={stat.value} suffix={stat.suffix} duration={1.6} />
                    ) : (
                      <span>{stat.value as string}</span>
                    )}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
