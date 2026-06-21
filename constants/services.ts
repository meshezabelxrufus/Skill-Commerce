import type { ServiceItem } from "@/types/content";

export const SERVICES: ServiceItem[] = [
  {
    id: "ai-automation",
    title: "AI Automation",
    description:
      "We replace manual commerce workflows with intelligent automation. Order routing, inventory decisions, pricing adjustments, and supplier coordination — handled by systems we build and configure for your exact operation.",
    iconName: "Zap",
  },
  {
    id: "custom-software",
    title: "Custom Software",
    description:
      "Off-the-shelf platforms weren't built for your business. We design and build the software layer your commerce operation actually needs — internal tools, integrations, and applications that fit your workflows precisely.",
    iconName: "Layers",
  },
  {
    id: "business-systems",
    title: "Business Systems",
    description:
      "Fragmented tools, disconnected data, and manual handoffs kill efficiency at scale. We architect the operational infrastructure that connects your channels, automates your processes, and gives you a single source of truth.",
    iconName: "Network",
  },
  {
    id: "data-analytics",
    title: "Data & Analytics Infrastructure",
    description:
      "Real decisions require real data. We build the analytics pipelines, dashboards, and reporting systems that surface the operational intelligence you need — without wading through spreadsheets to find it.",
    iconName: "BarChart3",
  },
  {
    id: "fulfillment-systems",
    title: "Fulfillment & Supply Chain Systems",
    description:
      "We design and deploy end-to-end fulfillment systems — from warehouse management to carrier logic to returns processing — built to handle volume without adding headcount.",
    iconName: "Truck",
  },
  {
    id: "commerce-strategy",
    title: "Commerce Strategy & Architecture",
    description:
      "Before we build, we think. We assess your current operation, identify where automation creates the most leverage, and design a technical roadmap that prioritizes impact over complexity.",
    iconName: "Compass",
  },
];
