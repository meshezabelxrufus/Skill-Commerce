import type { ProcessStep } from "@/types/content";

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Operational Audit",
    description:
      "We map every process, tool, and handoff in your current operation. Not to understand your tech stack — to understand where time, money, and margin are being lost. Most clients discover 3–5 automatable bottlenecks in the first week.",
  },
  {
    number: "02",
    title: "System Architecture",
    description:
      "We design the technical blueprint before writing a line of code. Every integration, data flow, and automation trigger is defined upfront. You see exactly what will be built, what it connects to, and what happens when it runs.",
  },
  {
    number: "03",
    title: "Build & Integration",
    description:
      "We deploy in phases, not in a single launch. Each phase ships working automation that your team can operate immediately. No 6-month wait for a big reveal — you get compounding value from week one.",
  },
  {
    number: "04",
    title: "Handoff & Optimization",
    description:
      "We document everything and train your team to own the systems we build. After handoff, we monitor performance, resolve edge cases, and optimize for efficiency. Most clients see measurable ROI within 90 days.",
  },
];
