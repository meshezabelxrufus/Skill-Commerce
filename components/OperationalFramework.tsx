const steps = [
  {
    number: "01",
    title: "Assessment & Strategic Planning",
    description:
      "Comprehensive evaluation of existing commerce operations, market positioning, and infrastructure requirements to define a clear strategic roadmap.",
  },
  {
    number: "02",
    title: "Architecture & System Design",
    description:
      "Structured design of commerce architecture, technology stack selection, and integration planning aligned with operational objectives and scalability targets.",
  },
  {
    number: "03",
    title: "Deployment & Integration",
    description:
      "Systematic implementation and integration of commerce systems, ensuring operational continuity, data integrity, and stakeholder alignment throughout rollout.",
  },
  {
    number: "04",
    title: "Optimization & Continuous Improvement",
    description:
      "Ongoing performance monitoring, process refinement, and system optimization to maintain operational excellence and drive sustained growth.",
  },
];

const OperationalFramework = () => {
  return (
    <section className="section-padding section-alt">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
            Our Approach
          </span>
          <h2 className="heading-lg mt-3 sm:mt-4">Operational Framework</h2>
          <p className="body-md text-muted-foreground mt-3 sm:mt-4">
            A structured, phased methodology designed to deliver measurable outcomes at every stage of engagement.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-10 sm:mt-16">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <span className="text-4xl sm:text-5xl font-bold font-display text-primary/10">{step.number}</span>
              <h3 className="font-semibold font-display text-foreground mt-2 sm:mt-3 text-base sm:text-lg">{step.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OperationalFramework;
