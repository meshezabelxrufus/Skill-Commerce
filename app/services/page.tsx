import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Server, LayoutGrid, BarChart3, Truck, Monitor, Compass } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Skill Commerce LLC",
  description:
    "Enterprise commerce systems: infrastructure, multi-channel architecture, data engineering, fulfillment, storefront engineering, and strategic advisory.",
};

const capabilities = [
  {
    icon: Server,
    title: "Commerce Infrastructure Development",
    description:
      "Design and deployment of robust commerce platforms engineered for high availability, operational continuity, and enterprise-grade performance.",
    detail: "Our infrastructure team delivers platforms that handle millions of transactions with zero tolerance for downtime. We architect distributed systems, configure failover strategies, and ensure your commerce engine is resilient by design.",
  },
  {
    icon: LayoutGrid,
    title: "Multi-Channel Retail Architecture",
    description:
      "Integrated systems architecture spanning marketplaces, direct-to-consumer channels, and wholesale distribution networks.",
    detail: "We unify your sales channels into a cohesive operational model — syncing inventory, orders, and customer data across every touchpoint to eliminate silos and reduce operational friction.",
  },
  {
    icon: BarChart3,
    title: "Data & Performance Engineering",
    description:
      "Analytics infrastructure and performance monitoring systems that enable data-driven decision making across all operational layers.",
    detail: "From data pipelines to executive dashboards, we build the analytics foundation that transforms raw commerce data into actionable insights — enabling real-time decisions at every level of your organization.",
  },
  {
    icon: Truck,
    title: "Supply Chain & Fulfillment Systems",
    description:
      "End-to-end fulfillment coordination, inventory management, and logistics infrastructure designed for reliability at scale.",
    detail: "We design fulfillment architectures that reduce cost, improve delivery speed, and scale seamlessly with demand. Our systems integrate with leading 3PLs, WMS platforms, and carrier networks.",
  },
  {
    icon: Monitor,
    title: "Digital Asset & Storefront Engineering",
    description:
      "Systematic development and optimization of digital storefronts, product content systems, and brand asset management frameworks.",
    detail: "We engineer storefronts and product content systems that convert. Every element — from page architecture to asset delivery — is optimized for performance, brand consistency, and customer experience.",
  },
  {
    icon: Compass,
    title: "Strategic Commerce Advisory",
    description:
      "Executive-level guidance on market positioning, operational strategy, and technology roadmapping for sustained commerce growth.",
    detail: "Our advisory engagements deliver structured, evidence-based strategy. We help leadership teams align technology investments with business objectives — ensuring every initiative drives measurable commercial outcomes.",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 section-padding">
        <div className="max-w-6xl mx-auto">
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
            Core Capabilities
          </span>
          <h1 className="heading-lg mt-4 max-w-xl">Enterprise Commerce Systems</h1>
          <p className="body-md text-muted-foreground mt-6 max-w-2xl">
            Our service portfolio is purpose-built for organizations that require structured, scalable commerce infrastructure. Every capability is delivered with rigor, precision, and a commitment to long-term performance.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {capabilities.map((item) => (
              <div
                key={item.title}
                className="group p-8 rounded-xl border border-border bg-background transition-all duration-300 hover:shadow-[var(--card-shadow-hover)] hover:border-primary/20"
              >
                <item.icon className="w-5 h-5 text-primary mb-6" strokeWidth={1.5} />
                <h3 className="font-semibold font-display text-foreground text-lg">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{item.description}</p>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
