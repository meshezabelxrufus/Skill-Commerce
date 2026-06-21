"use client";

import { useEffect, useRef } from "react";

type ShapeType = "triangle" | "diamond" | "tetra";

interface Shape {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  spin: number;
  size: number;
  type: ShapeType;
  color: string;
  lineWidth: number;
}

const COLORS = [
  "hsla(220, 72%, 42%, 0.55)",
  "hsla(220, 72%, 52%, 0.38)",
  "hsla(213, 94%, 70%, 0.30)",
  "hsla(221, 83%, 60%, 0.28)",
  "hsla(220, 55%, 28%, 0.60)",
  "hsla(0, 0%, 100%, 0.12)",
  "hsla(0, 0%, 100%, 0.07)",
];

const TYPES: ShapeType[] = ["triangle", "diamond", "tetra"];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function drawTriangle(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, angle: number, color: string, lw: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.strokeStyle = color;
  ctx.lineWidth = lw;
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.lineTo(size * 0.866, size * 0.5);
  ctx.lineTo(-size * 0.866, size * 0.5);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

function drawDiamond(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, angle: number, color: string, lw: number) {
  const w = size * 0.62;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.strokeStyle = color;
  ctx.lineWidth = lw;
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.lineTo(w, 0);
  ctx.lineTo(0, size);
  ctx.lineTo(-w, 0);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

function drawTetra(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, angle: number, color: string, lw: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.strokeStyle = color;
  ctx.lineWidth = lw;
  const pts: [number, number][] = [
    [0, -size],
    [size * 0.866, size * 0.5],
    [-size * 0.866, size * 0.5],
  ];
  const cy = size * 0.167;
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  ctx.lineTo(pts[1][0], pts[1][1]);
  ctx.lineTo(pts[2][0], pts[2][1]);
  ctx.closePath();
  ctx.stroke();
  for (const [px, py] of pts) {
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(0, cy);
    ctx.stroke();
  }
  ctx.restore();
}

/**
 * ParticleCanvas — living wireframe background.
 *
 * Performance rules:
 * - Mobile: max 22 particles, 30fps cap, no tetra shapes (cheaper draw calls)
 * - Desktop: max 70 particles, 60fps, all shape types
 * - Canvas pixel ratio capped at 1.5 to prevent 4× overdraw on Retina mobile
 * - `will-change: transform` promotes canvas to its own GPU layer
 */
export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let shapes: Shape[] = [];
    let isMobile = false;

    // Cap pixel ratio for mobile performance
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5);

    function buildShapes() {
      isMobile = W < 768;
      // Mobile: far fewer particles, smaller sizes, no tetra
      const maxCount = isMobile ? 22 : 70;
      const densityFactor = isMobile ? 30000 : 12000;
      const count = Math.min(maxCount, Math.floor((W * H) / densityFactor) + (isMobile ? 10 : 25));
      const types: ShapeType[] = isMobile ? ["triangle", "diamond"] : TYPES;

      shapes = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * (isMobile ? 0.12 : 0.22),
        vy: (Math.random() - 0.5) * (isMobile ? 0.12 : 0.22),
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * (isMobile ? 0.004 : 0.007),
        size: Math.random() * (isMobile ? 18 : 34) + (isMobile ? 6 : 9),
        type: pick(types),
        color: pick(COLORS),
        lineWidth: isMobile ? 0.6 : Math.random() * 0.5 + 0.5,
      }));
    }

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      // Use CSS pixels — skip device pixel ratio scaling for performance
      canvas!.width = W;
      canvas!.height = H;
      canvas!.style.width = W + "px";
      canvas!.style.height = H + "px";
      buildShapes();
    }

    resize();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };
    window.addEventListener("resize", onResize);

    let rafId: number;
    let lastTime = 0;
    // Target 30fps on mobile, 60fps on desktop
    const frameInterval = 1000 / (isMobile ? 30 : 60);

    function frame(now: number) {
      rafId = requestAnimationFrame(frame);
      const delta = now - lastTime;
      if (delta < frameInterval) return; // Skip frame if not enough time has passed
      lastTime = now - (delta % frameInterval);

      ctx!.clearRect(0, 0, W, H);

      for (const s of shapes) {
        s.x += s.vx;
        s.y += s.vy;
        s.angle += s.spin;

        const pad = s.size * 2;
        if (s.x < -pad) s.x = W + pad;
        else if (s.x > W + pad) s.x = -pad;
        if (s.y < -pad) s.y = H + pad;
        else if (s.y > H + pad) s.y = -pad;

        if (s.type === "triangle") {
          drawTriangle(ctx!, s.x, s.y, s.size, s.angle, s.color, s.lineWidth);
        } else if (s.type === "diamond") {
          drawDiamond(ctx!, s.x, s.y, s.size, s.angle, s.color, s.lineWidth);
        } else {
          drawTetra(ctx!, s.x, s.y, s.size, s.angle, s.color, s.lineWidth);
        }
      }
    }

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        willChange: "transform", // own compositor layer
      }}
    />
  );
}
