"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Building2, Shield, LineChart, Server, TrendingUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon: Building2,
    title: "U.S.-Registered Business Entity",
    description:
      "Legally incorporated in the State of Florida with full corporate governance and regulatory compliance.",
  },
  {
    icon: Shield,
    title: "Structured Governance & Compliance",
    description:
      "Operational frameworks built on transparency, accountability, and adherence to established business standards.",
  },
  {
    icon: LineChart,
    title: "Data-Driven Decision Making",
    description:
      "Every strategic initiative is informed by market data, performance analytics, and measurable business outcomes.",
  },
  {
    icon: Server,
    title: "Scalable Infrastructure Models",
    description:
      "Systems and processes architected to grow with demand without compromising operational integrity or performance.",
  },
  {
    icon: TrendingUp,
    title: "Long-Term Growth Focus",
    description:
      "Strategic planning oriented toward sustainable expansion, market resilience, and enduring competitive advantage.",
  },
];

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      if (isMobile) return;
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, ease: "none",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            end: "top 48%",
            scrub: 1.2,
          },
        }
      );

      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 55, scale: 0.93 },
          {
            opacity: 1, y: 0, scale: 1, ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 55%",
              scrub: 1 + i * 0.06,
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
        style={{ background: "hsl(var(--bg-canvas) / 0.7)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto">
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <span className="text-label">Why Skill Commerce</span>
          <h2 className="heading-lg mt-3 sm:mt-4">
            Built for Enterprise. Engineered for Growth.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {reasons.map((reason, i) => (
            <div
              key={reason.title}
              ref={(el) => { itemsRef.current[i] = el; }}
              className="text-center sm:text-left lg:text-center"
            >
              <motion.div
                className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/8 mb-4 sm:mb-5 border border-primary/12"
                whileHover={{
                  scale: 1.12,
                  backgroundColor: "hsl(var(--primary) / 0.14)",
                  transition: { type: "spring", stiffness: 380, damping: 22 },
                }}
              >
                <reason.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" strokeWidth={1.5} />
              </motion.div>
              <h3 className="font-semibold font-display text-foreground text-sm sm:text-base mb-2 leading-snug">
                {reason.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
