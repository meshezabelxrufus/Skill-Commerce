"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  once?: boolean;
}

/**
 * AnimatedText — scroll-triggered word-by-word mask reveal.
 * Uses its own `useInView` to trigger independently on scroll.
 */
export function AnimatedText({
  text,
  className,
  delay = 0,
  as: Tag = "div",
  once = true,
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once,
    margin: "-60px 0px",
  });

  const words = text.split(" ");

  return (
    <div ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.08em]"
          style={{ marginRight: "0.28em" }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "112%", opacity: 0 }}
            animate={
              isInView
                ? { y: "0%", opacity: 1 }
                : { y: "112%", opacity: 0 }
            }
            transition={{
              delay: delay + i * 0.048,
              duration: 0.72,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

/**
 * AnimatedTextInner — word-by-word reveal as Framer Motion variants.
 * Use INSIDE a parent `motion` container with `initial/animate` control.
 * Perfect for the Hero where the whole sequence is orchestrated by a parent.
 */
export function AnimatedTextInner({
  text,
  className,
  delay = 0,
  as: Tag = "div",
}: Omit<AnimatedTextProps, "once">) {
  const words = text.split(" ");

  const makeVariants = (i: number): Variants => ({
    hidden: { y: "112%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        delay: delay + i * 0.05,
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  });

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.08em]"
          style={{ marginRight: "0.28em" }}
        >
          <motion.span className="inline-block" variants={makeVariants(i)}>
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
