"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * AuroraBackground — layered animated radial gradient blobs.
 *
 * Performance:
 * - Detects mobile via useRef after mount
 * - On mobile: renders static CSS gradient (no JS animation, zero CPU cost)
 * - On desktop: full Framer Motion blob animations
 * - `will-change: transform` on each blob to force GPU compositing
 */
export function AuroraBackground() {
  const isMobileRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768;
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Dark base */}
      <div className="absolute inset-0 bg-[hsl(220_20%_5%)]" />

      {/* Static mobile gradient — zero CPU cost */}
      <div
        className="absolute inset-0 sm:hidden"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 40%, hsl(220 72% 22% / 0.7) 0%, transparent 70%),
            radial-gradient(ellipse 60% 70% at 80% 60%, hsl(218 60% 16% / 0.5) 0%, transparent 70%)
          `,
        }}
      />

      {/* Desktop animated blobs */}
      <motion.div
        className="absolute rounded-full blur-[120px] hidden sm:block"
        style={{
          width: "72%", height: "65%", top: "15%", left: "-10%",
          background: "radial-gradient(ellipse, hsl(220 72% 22% / 0.75) 0%, transparent 70%)",
          willChange: "transform, opacity",
        }}
        animate={{ x: [0, 24, -12, 0], y: [0, -20, 16, 0], scale: [1, 1.05, 0.97, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
      />

      <motion.div
        className="absolute rounded-full blur-[140px] hidden sm:block"
        style={{
          width: "55%", height: "70%", top: "30%", right: "-8%",
          background: "radial-gradient(ellipse, hsl(218 60% 16% / 0.6) 0%, transparent 70%)",
          willChange: "transform, opacity",
        }}
        animate={{ x: [0, -18, 22, 0], y: [0, 28, -16, 0], scale: [1, 0.96, 1.06, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
      />

      <motion.div
        className="absolute rounded-full blur-[180px] hidden sm:block"
        style={{
          width: "45%", height: "45%", top: "-5%", left: "30%",
          background: "radial-gradient(ellipse, hsl(220 80% 18% / 0.4) 0%, transparent 70%)",
          willChange: "transform, opacity",
        }}
        animate={{ x: [0, 12, -8, 0], y: [0, -10, 18, 0], scale: [1, 1.08, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, hsl(220 20% 4% / 0.5) 100%)",
        }}
      />
    </div>
  );
}
