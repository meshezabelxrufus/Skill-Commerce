import { Server, LayoutGrid, BarChart3, Truck, Monitor, Compass } from "lucide-react";

const capabilities = [
  {
    icon: Server,
    title: "Commerce Infrastructure Development",
    description:
      "Design and deployment of robust commerce platforms engineered for high availability, operational continuity, and enterprise-grade performance.",
  },
  {
    icon: LayoutGrid,
    title: "Multi-Channel Retail Architecture",
    description:
      "Integrated systems architecture spanning marketplaces, direct-to-consumer channels, and wholesale distribution networks.",
  },
  {
    icon: BarChart3,
    title: "Data & Performance Engineering",
    description:
      "Analytics infrastructure and performance monitoring systems that enable data-driven decision making across all operational layers.",
  },
  {
    icon: Truck,
    title: "Supply Chain & Fulfillment Systems",
    description:
      "End-to-end fulfillment coordination, inventory management, and logistics infrastructure designed for reliability at scale.",
  },
  {
    icon: Monitor,
    title: "Digital Asset & Storefront Engineering",
    description:
      "Systematic development and optimization of digital storefronts, product content systems, and brand asset management frameworks.",
  },
  {
    icon: Compass,
    title: "Strategic Commerce Advisory",
    description:
      "Executive-level guidance on market positioning, operational strategy, and technology roadmapping for sustained commerce growth.",
  },
];

const Services = () => {
  return (
    <section id="capabilities" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <span className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
          Core Capabilities
        </span>
        <h2 className="heading-lg mt-4 max-w-xl">
          Enterprise Commerce Systems
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {capabilities.map((item) => (
            <div
              key={item.title}
              className="group p-8 rounded-xl border border-border bg-background transition-all duration-300 hover:shadow-[var(--card-shadow-hover)] hover:border-primary/20"
            >
              <item.icon className="w-5 h-5 text-primary mb-6" strokeWidth={1.5} />
              <h3 className="font-semibold font-display text-foreground text-lg">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
