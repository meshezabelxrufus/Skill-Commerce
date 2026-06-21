"use client";

import { useEffect, useRef } from "react";

/* ── Shape types ─────────────────────────────────────────── */
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

/* ── Brand-palette colors (dark theme variants) ─────────── */
const COLORS = [
  "hsla(220, 72%, 42%, 0.65)",  // navy brand
  "hsla(220, 72%, 52%, 0.45)",  // mid navy
  "hsla(213, 94%, 70%, 0.38)",  // electric blue
  "hsla(221, 83%, 60%, 0.35)",  // blue
  "hsla(220, 55%, 28%, 0.70)",  // deep navy
  "hsla(0, 0%, 100%, 0.18)",    // white ghost
  "hsla(0, 0%, 100%, 0.09)",    // very faint white
  "hsla(213, 94%, 78%, 0.28)",  // sky blue
];

const TYPES: ShapeType[] = ["triangle", "diamond", "tetra"];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ── Draw helpers ────────────────────────────────────────── */
function drawTriangle(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  size: number, angle: number,
  color: string, lw: number
) {
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

function drawDiamond(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  size: number, angle: number,
  color: string, lw: number
) {
  const w = size * 0.62;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.strokeStyle = color;
  ctx.lineWidth = lw;
  // Outer shape
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.lineTo(w, 0);
  ctx.lineTo(0, size);
  ctx.lineTo(-w, 0);
  ctx.closePath();
  ctx.stroke();
  // Inner cross (wireframe feel)
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.lineTo(0, size);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-w, 0);
  ctx.lineTo(w, 0);
  ctx.stroke();
  ctx.restore();
}

function drawTetra(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  size: number, angle: number,
  color: string, lw: number
) {
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
  const cx = 0;
  const cy = size * 0.167;

  // Outer triangle
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  ctx.lineTo(pts[1][0], pts[1][1]);
  ctx.lineTo(pts[2][0], pts[2][1]);
  ctx.closePath();
  ctx.stroke();

  // Lines from vertices to inner centroid (tetrahedron projection)
  for (const [px, py] of pts) {
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(cx, cy);
    ctx.stroke();
  }

  ctx.restore();
}

/* ── Component ───────────────────────────────────────────── */

/**
 * ParticleCanvas — the living background system.
 *
 * A fixed-position canvas that renders 70–100 drifting wireframe
 * geometric shapes (triangles, diamonds, tetrahedra) across the
 * entire viewport at all times. Shapes drift slowly and rotate
 * independently, creating the Dala-style "living background" effect.
 *
 * GPU-friendly: canvas is composited on its own layer.
 * Respects prefers-reduced-motion.
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

    function buildShapes() {
      const count = Math.min(100, Math.floor((W * H) / 12000) + 30);
      shapes = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.007,
        size: Math.random() * 34 + 9,
        type: pick(TYPES),
        color: pick(COLORS),
        lineWidth: Math.random() * 0.5 + 0.5,
      }));
    }

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width = W;
      canvas!.height = H;
      buildShapes();
    }

    resize();
    window.addEventListener("resize", resize);

    let rafId: number;

    function frame() {
      ctx!.clearRect(0, 0, W, H);

      for (const s of shapes) {
        s.x += s.vx;
        s.y += s.vy;
        s.angle += s.spin;

        // Wrap around viewport
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

      rafId = requestAnimationFrame(frame);
    }

    frame();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        willChange: "transform",
      }}
    />
  );
}
