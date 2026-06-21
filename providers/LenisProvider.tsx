"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LenisContextValue {
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextValue>({ lenis: null });

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const tickRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    const lenisInstance = new Lenis({
      // On mobile/touch devices use a faster lerp so it doesn't feel
      // like it's fighting native momentum scrolling
      lerp: isMobile ? 0.18 : 0.1,
      duration: isMobile ? 0.8 : 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: !isTouch, // disable smooth wheel on touch — use native
      wheelMultiplier: 1.0,
      // Lower touch multiplier prevents the "over-scroll lag" on iOS
      touchMultiplier: isMobile ? 1.0 : 2.0,
      infinite: false,
    });

    setLenis(lenisInstance);

    // Fire ScrollTrigger.update on every Lenis scroll tick
    lenisInstance.on("scroll", () => ScrollTrigger.update());

    // Drive Lenis via GSAP ticker
    const tick = (time: number) => lenisInstance.raf(time * 1000);
    tickRef.current = tick;
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      if (tickRef.current) gsap.ticker.remove(tickRef.current);
      lenisInstance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenisContext() {
  return useContext(LenisContext);
}
