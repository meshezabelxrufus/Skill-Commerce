"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";

/**
 * Shared child variants — import and use on any `motion.div` / `MotionChild`
 * inside a MotionSection to get automatic stagger reveal.
 */
export const childVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.975 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: "easeOut" as const,
    },
  },
};

/** Subtle horizontal slide variants for left/right split layouts */
export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: "easeOut" as const },
  },
};

export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: "easeOut" as const },
  },
};

/** Scale-in variant for icon/avatar containers */
export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 280, damping: 22 },
  },
};

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  margin?: never;
}

/**
 * MotionSection — the universal scroll-triggered stagger wrapper.
 *
 * Drop it around the content inside any section and add `variants={childVariants}`
 * on each direct child to get automatic staggered fade-up reveals.
 *
 * @example
 * <MotionSection className="grid md:grid-cols-3 gap-6">
 *   <motion.div variants={childVariants}>Card 1</motion.div>
 *   <motion.div variants={childVariants}>Card 2</motion.div>
 * </MotionSection>
 */
export function MotionSection({
  children,
  className,
  stagger = 0.1,
  delay = 0,
  margin,
}: MotionSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

/** Convenience — a motion.div pre-wired with childVariants */
export const MotionChild = motion.div;
