"use client";

import { motion } from "framer-motion";

/**
 * AuroraBackground — layered animated radial gradient blobs.
 * Designed for use inside the Hero section (absolute positioned, fills parent).
 * Each blob runs on the compositor thread at different durations.
 */
export function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Base dark canvas */}
      <div className="absolute inset-0 bg-[hsl(220_20%_5%)]" />

      {/* Blob A — large, left-center, primary navy */}
      <motion.div
        className="absolute rounded-full blur-[120px]"
        style={{
          width: "72%",
          height: "65%",
          top: "15%",
          left: "-10%",
          background: "radial-gradient(ellipse, hsl(220 72% 22% / 0.75) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 24, -12, 0],
          y: [0, -20, 16, 0],
          scale: [1, 1.05, 0.97, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "mirror",
        }}
      />

      {/* Blob B — mid, right, deeper navy */}
      <motion.div
        className="absolute rounded-full blur-[140px]"
        style={{
          width: "55%",
          height: "70%",
          top: "30%",
          right: "-8%",
          background: "radial-gradient(ellipse, hsl(218 60% 16% / 0.6) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -18, 22, 0],
          y: [0, 28, -16, 0],
          scale: [1, 0.96, 1.06, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "mirror",
        }}
      />

      {/* Blob C — top-center, electric blue accent, very subtle */}
      <motion.div
        className="absolute rounded-full blur-[180px]"
        style={{
          width: "45%",
          height: "45%",
          top: "-5%",
          left: "30%",
          background: "radial-gradient(ellipse, hsl(220 80% 18% / 0.4) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 12, -8, 0],
          y: [0, -10, 18, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "mirror",
        }}
      />

      {/* Vignette overlay — darker at edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, hsl(220 20% 4% / 0.5) 100%)",
        }}
      />
    </div>
  );
}
