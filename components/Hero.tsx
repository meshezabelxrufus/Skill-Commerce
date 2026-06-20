import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="section-padding min-h-[90vh] flex items-center">
      <div className="max-w-4xl">
        <div className="animate-fade-up">
          <span className="inline-block mb-6 text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
            Skill Commerce LLC — Florida, USA
          </span>
        </div>
        <h1 className="heading-xl animate-fade-up-delay-1 text-balance">
          Engineering Scalable<br />Digital Commerce Infrastructure
        </h1>
        <p className="mt-6 max-w-2xl body-lg text-muted-foreground animate-fade-up-delay-2 text-balance">
          Skill Commerce LLC delivers structured, data-driven commerce systems for modern online retail operations.
        </p>
        <div className="mt-10 animate-fade-up-delay-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium text-base transition-all duration-200 hover:opacity-90 hover:gap-3"
          >
            Request Consultation
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
