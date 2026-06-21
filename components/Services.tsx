"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Server, LayoutGrid, BarChart3, Truck, Monitor, Compass, LucideIcon } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Capability {
  icon: LucideIcon;
  title: string;
  description: string;
}

const capabilities: Capability[] = [
  {
    icon: Server,
    title: "Commerce Infrastructure Development",
    description:
      "Design and deployment of robust commerce platforms engineered for high availability, operational continuity, and enterprise-grade performance.",
  },
  {
    icon: LayoutGrid,
    title: "Multi-Channel Retail Architecture",
    description:
      "Integrated systems architecture spanning marketplaces, direct-to-consumer channels, and wholesale distribution networks.",
  },
  {
    icon: BarChart3,
    title: "Data & Performance Engineering",
    description:
      "Analytics infrastructure and performance monitoring systems that enable data-driven decision making across all operational layers.",
  },
  {
    icon: Truck,
    title: "Supply Chain & Fulfillment Systems",
    description:
      "End-to-end fulfillment coordination, inventory management, and logistics infrastructure designed for reliability at scale.",
  },
  {
    icon: Monitor,
    title: "Digital Asset & Storefront Engineering",
    description:
      "Systematic development and optimization of digital storefronts, product content systems, and brand asset management frameworks.",
  },
  {
    icon: Compass,
    title: "Strategic Commerce Advisory",
    description:
      "Executive-level guidance on market positioning, operational strategy, and technology roadmapping for sustained commerce growth.",
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Section header — scrub reveal ─────────────────── */
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 88%",
            end: "top 48%",
            scrub: 1.2,
          },
        }
      );

      /* ── Cards — staggered scrub reveals ───────────────── */
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        // Each card enters at scale 0.88 and rises from below
        gsap.fromTo(
          card,
          { opacity: 0, y: 80, scale: 0.88 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              end: "top 55%",
              scrub: 1 + i * 0.05, // slight stagger in scrub duration
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="capabilities" className="section-padding relative" style={{ zIndex: 1 }}>
      {/* Subtle section surface */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "hsl(var(--bg-canvas) / 0.7)", backdropFilter: "blur(0px)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-12 sm:mb-16">
          <span className="text-label">Core Capabilities</span>
          <h2 className="heading-lg max-w-xl mt-3 sm:mt-4">
            Enterprise Commerce Systems
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {capabilities.map((item, i) => (
            <motion.div
              key={item.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative p-5 sm:p-7 rounded-xl border border-white/8 bg-white/[0.03] backdrop-blur-sm cursor-default h-full overflow-hidden"
              whileHover={{
                y: -6,
                borderColor: "hsl(var(--primary) / 0.30)",
                backgroundColor: "hsl(0 0% 100% / 0.055)",
                transition: { type: "spring", stiffness: 340, damping: 26 },
              }}
            >
              {/* Glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
                }}
                aria-hidden="true"
              />

              {/* Icon */}
              <motion.div
                className="mb-5 sm:mb-6 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/15"
                whileHover={{ scale: 1.12, rotate: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" strokeWidth={1.5} />
              </motion.div>

              <h3 className="font-semibold font-display text-foreground text-base sm:text-lg mb-2 sm:mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>

              {/* Bottom accent line — draws in on hover */}
              <motion.div
                className="absolute bottom-0 left-5 right-5 h-px rounded-full"
                style={{
                  background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.4), transparent)",
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                whileHover={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.35 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
