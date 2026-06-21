"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Assessment & Strategic Planning",
    description:
      "Comprehensive evaluation of existing commerce operations, market positioning, and infrastructure requirements to define a clear strategic roadmap.",
  },
  {
    number: "02",
    title: "Architecture & System Design",
    description:
      "Structured design of commerce architecture, technology stack selection, and integration planning aligned with operational objectives and scalability targets.",
  },
  {
    number: "03",
    title: "Deployment & Integration",
    description:
      "Systematic implementation and integration of commerce systems, ensuring operational continuity, data integrity, and stakeholder alignment throughout rollout.",
  },
  {
    number: "04",
    title: "Optimization & Continuous Improvement",
    description:
      "Ongoing performance monitoring, process refinement, and system optimization to maintain operational excellence and drive sustained growth.",
  },
];

const OperationalFramework = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header scrub
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 55 },
        {
          opacity: 1, y: 0, ease: "none",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 88%",
            end: "top 50%",
            scrub: 1.2,
          },
        }
      );

      // Progress line draws from left → right tied to scroll
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1, ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 70%",
            scrub: 2,
          },
        }
      );

      // Each step card — scrub reveal with Y offset
      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        gsap.fromTo(
          step,
          { opacity: 0, y: 70 },
          {
            opacity: 1, y: 0, ease: "none",
            scrollTrigger: {
              trigger: step,
              start: "top 90%",
              end: "top 55%",
              scrub: 1 + i * 0.08,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative" style={{ zIndex: 1 }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "hsl(var(--bg-canvas) / 0.65)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <span className="text-label">Our Approach</span>
          <h2 className="heading-lg mt-3 sm:mt-4">Operational Framework</h2>
          <p className="body-md text-muted-foreground mt-3 sm:mt-4">
            A structured, phased methodology designed to deliver measurable
            outcomes at every stage of engagement.
          </p>
        </div>

        {/* Animated connector line */}
        <div className="hidden lg:block relative h-px bg-white/8 mb-14 max-w-4xl mx-auto overflow-hidden">
          <div
            ref={lineRef}
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(to right, hsl(var(--primary) / 0.3), hsl(var(--primary)), hsl(var(--primary) / 0.3))",
            }}
          />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {steps.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { stepsRef.current[i] = el; }}
              className="relative group"
            >
              {/* Step dot on the line */}
              <motion.div
                className="hidden lg:block absolute -top-[57px] left-0 w-2 h-2 rounded-full bg-primary"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 300 }}
              />

              {/* Large ghost number */}
              <span
                className="block text-5xl sm:text-6xl font-bold font-display mb-3 sm:mb-4 select-none"
                style={{ color: "hsl(var(--primary) / 0.12)" }}
              >
                {step.number}
              </span>

              <h3 className="font-semibold font-display text-foreground text-base sm:text-lg mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OperationalFramework;
