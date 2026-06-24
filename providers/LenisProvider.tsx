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
    const lenisInstance = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
      infinite: false,
    });

    setLenis(lenisInstance);

    // Sync Lenis scroll events → ScrollTrigger so pinned sections update correctly
    lenisInstance.on("scroll", ScrollTrigger.update);

    // Drive Lenis via GSAP ticker
    const tick = (time: number) => lenisInstance.raf(time * 1000);
    tickRef.current = tick;
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisInstance.off("scroll", ScrollTrigger.update);
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
