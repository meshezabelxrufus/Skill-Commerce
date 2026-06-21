"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const Footer = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 92%",
          end: "top 70%",
          scrub: 1,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={ref} className="border-t border-white/8 relative" style={{ zIndex: 1 }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "hsl(var(--bg-canvas) / 0.8)" }}
        aria-hidden="true"
      />
      <div className="relative section-padding py-10 sm:py-14">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="text-center md:text-left">
            <p className="font-display font-semibold text-foreground">Skill Commerce LLC</p>
            <p className="text-xs text-muted-foreground mt-1">
              © {new Date().getFullYear()} Skill Commerce LLC. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            {footerLinks.map((link) => (
              <motion.div key={link.href} whileHover={{ y: -1 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                <Link
                  href={link.href}
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-200" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
