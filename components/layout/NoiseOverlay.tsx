"use client";

/**
 * NoiseOverlay — Fixed-position SVG noise texture.
 * Applied globally to add premium grain/texture feel.
 * GPU-friendly: static element, no JS, no repaints.
 * Pointer-events: none — never interrupts interaction.
 */
export function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999, mixBlendMode: "soft-light" }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", inset: 0, opacity: 0.035 }}
      >
        <filter id="noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-filter)" />
      </svg>
    </div>
  );
}
