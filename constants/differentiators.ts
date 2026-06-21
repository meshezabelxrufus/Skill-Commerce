import type { Differentiator } from "@/types/content";

export const DIFFERENTIATORS: Differentiator[] = [
  {
    id: "builders",
    title: "We build, we don't consult.",
    description:
      "Every engagement ends with working software in your operation — not a report, a deck, or a list of recommendations. We measure success by what runs, not what we advised.",
    iconName: "Code2",
  },
  {
    id: "ownership",
    title: "You own everything we build.",
    description:
      "Every system, every line of code, every workflow we deliver is fully owned by you at handoff. No vendor lock-in. No subscription dependency on us. You can operate, modify, and extend it entirely on your own.",
    iconName: "PackageCheck",
  },
  {
    id: "scale",
    title: "Built for scale from day one.",
    description:
      "We architect for the operation you're growing into, not just where you are today. Every system we build handles 10× your current volume without requiring a rebuild.",
    iconName: "ArrowUpRight",
  },
  {
    id: "documented",
    title: "Documented so your team can own it.",
    description:
      "We document every system we build — architecture, configuration, edge cases, and runbooks. Your team can maintain and extend our work without us being in the room.",
    iconName: "FileText",
  },
  {
    id: "roi",
    title: "90-day ROI or we keep working.",
    description:
      "We scope every engagement around a measurable outcome. If we don't deliver the efficiency gains we committed to within 90 days of handoff, we continue working until we do.",
    iconName: "RefreshCw",
  },
];
