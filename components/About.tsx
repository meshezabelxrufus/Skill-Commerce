const About = () => {
  return (
    <section id="about" className="section-padding section-alt">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
              About the Firm
            </span>
            <h2 className="heading-lg mt-4">
              Commerce Architecture for Sustained Growth
            </h2>
          </div>
          <div className="space-y-6">
            <p className="body-md text-muted-foreground">
              Skill Commerce LLC is a Florida-registered limited liability company focused on commerce architecture, marketplace infrastructure, and operational scalability. We design and implement systems that support structured, long-term growth for modern retail operations.
            </p>
            <p className="body-md text-muted-foreground">
              Our approach emphasizes governance, system design, and growth enablement — ensuring every operational layer is built for reliability, compliance, and measurable performance at scale.
            </p>
            <div className="grid grid-cols-3 gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold font-display text-foreground">100%</p>
                <p className="text-sm text-muted-foreground mt-1">U.S. Registered</p>
              </div>
              <div>
                <p className="text-3xl font-bold font-display text-foreground">Governed</p>
                <p className="text-sm text-muted-foreground mt-1">Structured Operations</p>
              </div>
              <div>
                <p className="text-3xl font-bold font-display text-foreground">Scalable</p>
                <p className="text-sm text-muted-foreground mt-1">Infrastructure Models</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
