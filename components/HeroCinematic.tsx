"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  Monitor clip-path — matches the monitor screen area in the video's
  final frame (camera at closest). Adjust if the monitor appears off-centre.
    top / bottom = % from each edge of viewport
    left / right = % from each edge of viewport
*/
const MONITOR_INSET_INITIAL = "inset(22% 22% 28% 22% round 4px)";
const MONITOR_INSET_FULL    = "inset(0% 0% 0% 0% round 0px)";

export default function HeroCinematic() {
  const prefersReducedMotion = useReducedMotion();

  const wrapperRef         = useRef<HTMLDivElement>(null);
  const videoLayerRef      = useRef<HTMLDivElement>(null);
  const videoRef           = useRef<HTMLVideoElement>(null);
  const maskRef            = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  // Video src is set only on desktop — prevents any download on mobile
  const [videoSrc, setVideoSrc]     = useState<string | undefined>();

  // ── Desktop-only setup ────────────────────────────────────────
  useEffect(() => {
    const mobile = window.innerWidth < 768;
    if (mobile || prefersReducedMotion) return;
    setVideoSrc("/video/hero.mp4");
  }, [prefersReducedMotion]);

  // ── Establishing auto-play (first 2 s of video on load) ──────
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoReady) return;

    video.currentTime = 0;
    let stopTimer: ReturnType<typeof setTimeout>;

    const play = video.play();
    if (play !== undefined) {
      play
        .then(() => { stopTimer = setTimeout(() => video.pause(), 2200); })
        .catch(() => {/* autoplay blocked — scroll drives currentTime */});
    }
    return () => clearTimeout(stopTimer);
  }, [videoReady]);

  // ── Scroll-driven GSAP timeline ──────────────────────────────
  useEffect(() => {
    // Guard: only run on desktop, no reduced-motion
    if (window.innerWidth < 768 || prefersReducedMotion) return;

    const wrapper    = wrapperRef.current;
    const videoLayer      = videoLayerRef.current;
    const video           = videoRef.current;
    const mask            = maskRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    if (!wrapper || !videoLayer || !mask) return;

    gsap.set(mask, { clipPath: MONITOR_INSET_INITIAL, opacity: 0 });

    /*
      Trigger on the 500vh wrapper; CSS sticky keeps the panel at top.
      "bottom bottom" = when wrapper bottom hits viewport bottom = 400vh of travel.
      No GSAP pin — zero DOM mutation → no React removeChild conflict.
    */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,            // slightly higher scrub = smoother lag
        onUpdate: (self) => {
          if (!video || video.readyState < 2 || !video.duration || isNaN(video.duration)) return;
          if (self.progress > 0.015) {
            video.currentTime = self.progress * video.duration * 0.95;
          }
        },
      },
    });

    // Fade scroll indicator out as soon as scrolling starts
    if (scrollIndicator) {
      tl.to(scrollIndicator, { opacity: 0, duration: 0.6, ease: "none" }, 0);
    }

    // Phase 1-3: Slow pull toward monitor (0 → 78 % of scroll)
    tl.to(videoLayer, {
      scale: 1.65,
      ease: "power2.in",
      duration: 7.8,
    }, 0);

    // Phase 4: Enter the monitor (78 → 100 % of scroll)
    // — opacity flash (quick, feels like a "click into screen")
    tl.to(mask, { opacity: 1, ease: "none", duration: 0.3 }, 7.8);
    // — expand clip from monitor screen to full viewport (smooth, linear feel)
    tl.to(mask, {
      clipPath: MONITOR_INSET_FULL,
      ease: "power1.inOut",    // linear-ish = no perceivable acceleration/decel
      duration: 1.6,
    }, 8.1);
    // — short hold so scrub fully settles before sticky releases
    tl.to({}, { duration: 0.3 });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [prefersReducedMotion]);

  /*
    `hidden md:block`:
    • Mobile (< 768 px): display:none → zero height, no scroll space eaten,
      <main> starts at 0. No video download (src not set). No GSAP runs.
    • Desktop (≥ 768 px): display:block → 500vh scroll space + sticky panel.
      <main> gets md:-mt-[100vh] in page.tsx so Hero starts at exactly 400vh,
      which is where the sticky releases — seamless appear-in-place transition.
  */
  return (
    <div
      ref={wrapperRef}
      className="hidden md:block"
      style={{ height: "500vh" }}
    >
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: "100svh", minHeight: "100vh" }}
        aria-hidden
        role="presentation"
      >
        {/* ── Video environment ── */}
        <div
          ref={videoLayerRef}
          className="absolute inset-0"
          style={{ zIndex: 1, transformOrigin: "center center", willChange: "transform" }}
        >
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={videoSrc}
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setVideoReady(true)}
            aria-hidden
          />

          {/* Top edge — deep shadow */}
          <div
            className="absolute inset-x-0 top-0 pointer-events-none"
            aria-hidden
            style={{
              zIndex: 2,
              height: "28%",
              background: "linear-gradient(180deg, rgba(9,9,11,0.88) 0%, rgba(9,9,11,0.30) 60%, transparent 100%)",
            }}
          />

          {/* Bottom edge — deep shadow */}
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            aria-hidden
            style={{
              zIndex: 2,
              height: "30%",
              background: "linear-gradient(0deg, rgba(9,9,11,0.92) 0%, rgba(9,9,11,0.35) 55%, transparent 100%)",
            }}
          />

          {/* Left edge */}
          <div
            className="absolute inset-y-0 left-0 pointer-events-none"
            aria-hidden
            style={{
              zIndex: 3,
              width: "22%",
              background: "linear-gradient(90deg, rgba(9,9,11,0.80) 0%, rgba(9,9,11,0.20) 60%, transparent 100%)",
            }}
          />

          {/* Right edge */}
          <div
            className="absolute inset-y-0 right-0 pointer-events-none"
            aria-hidden
            style={{
              zIndex: 3,
              width: "22%",
              background: "linear-gradient(270deg, rgba(9,9,11,0.80) 0%, rgba(9,9,11,0.20) 60%, transparent 100%)",
            }}
          />

          {/* Radial vignette — darkens all four corners simultaneously */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              zIndex: 4,
              background:
                "radial-gradient(ellipse 72% 72% at 50% 50%, transparent 28%, rgba(9,9,11,0.82) 100%)",
            }}
          />

          {/*
            ── Gemini AI watermark cover ──────────────────────────────
            Three layers to be certain the badge disappears regardless
            of its exact pixel position in the bottom-right corner:

            1. Solid opaque rectangle  — kills the badge entirely
            2. Wide gradient feather   — blends into surrounding vignette
            3. Extra corner darkener   — ensures no bright halo at the edge
          */}
          {/* 1. Solid kill zone */}
          <div
            className="absolute pointer-events-none"
            aria-hidden
            style={{
              zIndex: 16,
              bottom: 0,
              right: 0,
              width: "320px",
              height: "130px",
              background: "rgba(9,9,11,1)",
            }}
          />
          {/* 2. Feather blend */}
          <div
            className="absolute pointer-events-none"
            aria-hidden
            style={{
              zIndex: 15,
              bottom: 0,
              right: 0,
              width: "520px",
              height: "240px",
              background:
                "linear-gradient(135deg, transparent 30%, rgba(9,9,11,0.60) 50%, rgba(9,9,11,0.95) 68%, rgba(9,9,11,1) 80%)",
            }}
          />
          {/* 3. Bottom-right corner reinforcement */}
          <div
            className="absolute pointer-events-none"
            aria-hidden
            style={{
              zIndex: 14,
              bottom: 0,
              right: 0,
              width: "45%",
              height: "45%",
              background:
                "radial-gradient(ellipse at 100% 100%, rgba(9,9,11,0.85) 0%, transparent 70%)",
            }}
          />
        </div>

        {/*
          Scroll indicator — fades in after the auto-play settles (2.5 s),
          disappears as soon as the user starts scrolling (GSAP tl position 0).
          z-index 10: above video overlays, below mask (20) and loading cover (30).
        */}
        <motion.div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none"
          style={{ zIndex: 10 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 1.0, ease: "easeOut" }}
          aria-hidden
        >
          <span
            style={{
              fontSize: "9px",
              letterSpacing: "0.38em",
              color: "rgba(255,255,255,0.45)",
              fontWeight: 300,
              textTransform: "uppercase",
              fontFamily: "inherit",
            }}
          >
            Scroll
          </span>

          {/* Thin line with sliding highlight */}
          <div
            className="relative overflow-hidden rounded-full"
            style={{ width: "1px", height: "52px", background: "rgba(255,255,255,0.15)" }}
          >
            <motion.div
              className="absolute left-0 w-full rounded-full"
              style={{ height: "45%", background: "rgba(255,255,255,0.75)", top: 0 }}
              animate={{ y: ["0%", "125%"] }}
              transition={{
                duration: 1.35,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 0.35,
              }}
            />
          </div>
        </motion.div>

        {/*
          Monitor mask — expands from monitor screen bounds to full viewport.
          backgroundColor #09090B = Hero.tsx dark canvas → no colour break on reveal.
        */}
        <div
          ref={maskRef}
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            zIndex: 20,
            backgroundColor: "#09090B",
            willChange: "clip-path, opacity",
          }}
        />

        {/* Dark loading cover while video first frame is not yet decoded */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            zIndex: 30,
            backgroundColor: "#09090B",
            opacity: videoReady ? 0 : 1,
            transition: "opacity 600ms ease-out",
          }}
        />
      </div>
    </div>
  );
}
