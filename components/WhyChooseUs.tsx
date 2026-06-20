import { Building2, Shield, LineChart, Server, TrendingUp } from "lucide-react";

const reasons = [
  {
    icon: Building2,
    title: "U.S.-Registered Business Entity",
    description: "Legally incorporated in the State of Florida with full corporate governance and regulatory compliance.",
  },
  {
    icon: Shield,
    title: "Structured Governance & Compliance",
    description: "Operational frameworks built on transparency, accountability, and adherence to established business standards.",
  },
  {
    icon: LineChart,
    title: "Data-Driven Decision Making",
    description: "Every strategic initiative is informed by market data, performance analytics, and measurable business outcomes.",
  },
  {
    icon: Server,
    title: "Scalable Infrastructure Models",
    description: "Systems and processes architected to grow with demand without compromising operational integrity or performance.",
  },
  {
    icon: TrendingUp,
    title: "Long-Term Growth Focus",
    description: "Strategic planning oriented toward sustainable expansion, market resilience, and enduring competitive advantage.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
            Why Skill Commerce
          </span>
          <h2 className="heading-lg mt-3 sm:mt-4">
            Built for Enterprise. Engineered for Growth.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mt-10 sm:mt-16">
          {reasons.map((reason) => (
            <div key={reason.title} className="text-center sm:text-left lg:text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/5 mb-4 sm:mb-5">
                <reason.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold font-display text-foreground text-sm sm:text-base">{reason.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
