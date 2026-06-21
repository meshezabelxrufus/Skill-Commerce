"use client";

import { useLenisContext } from "@/providers/LenisProvider";

export function useLenis() {
  return useLenisContext().lenis;
}
