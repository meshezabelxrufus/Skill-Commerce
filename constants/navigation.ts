import type { NavLink, ServiceDropdownItem } from "@/types/navigation";

export const SERVICE_DROPDOWN_ITEMS: ServiceDropdownItem[] = [
  {
    label: "AI Automation",
    href: "#capabilities",
    iconName: "Zap",
    description: "Intelligent workflows that eliminate manual operations",
  },
  {
    label: "Custom Software",
    href: "#capabilities",
    iconName: "Layers",
    description: "Purpose-built applications for your commerce stack",
  },
  {
    label: "Business Systems",
    href: "#capabilities",
    iconName: "Network",
    description: "Operational infrastructure engineered to scale",
  },
];

export const NAV_LINKS: NavLink[] = [
  { label: "How We Work", href: "#how-we-work" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "About", href: "#about" },
];

export const MOBILE_NAV_LINKS: NavLink[] = [
  { label: "Services", href: "#capabilities" },
  { label: "How We Work", href: "#how-we-work" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const FOOTER_LINKS = {
  services: [
    { label: "AI Automation", href: "#capabilities" },
    { label: "Custom Software", href: "#capabilities" },
    { label: "Business Systems", href: "#capabilities" },
    { label: "Data Analytics", href: "#capabilities" },
    { label: "Fulfillment Systems", href: "#capabilities" },
  ],
  company: [
    { label: "How We Work", href: "#how-we-work" },
    { label: "Why Skill Commerce", href: "#why-us" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
} as const;
