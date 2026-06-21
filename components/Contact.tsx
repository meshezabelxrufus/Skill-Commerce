"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Building, ArrowRight, CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/motion/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

/* ── Floating Label Field ────────────────────────────────── */
function FloatingField({
  id, label, type = "text", value, onChange, required,
}: {
  id: string; label: string; type?: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const up = focused || value.length > 0;

  return (
    <div className="relative">
      <motion.label
        htmlFor={id}
        className="absolute left-4 pointer-events-none origin-left text-muted-foreground text-sm"
        animate={{
          y: up ? -20 : 0,
          scale: up ? 0.78 : 1,
          color: focused ? "hsl(var(--primary))" : "hsl(var(--text-secondary))",
        }}
        style={{ top: "0.85rem" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {label}{required && <span className="text-primary/70 ml-0.5">*</span>}
      </motion.label>
      <motion.input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 pt-6 pb-2.5 rounded-lg bg-white/[0.04] border text-foreground text-sm outline-none"
        animate={{
          borderColor: focused ? "hsl(var(--primary))" : "hsl(var(--border-default))",
          boxShadow: focused ? "0 0 0 3px hsl(var(--primary) / 0.10)" : "none",
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}

function FloatingTextarea({
  id, label, value, onChange, required, rows = 4,
}: {
  id: string; label: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean; rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const up = focused || value.length > 0;

  return (
    <div className="relative">
      <motion.label
        htmlFor={id}
        className="absolute left-4 pointer-events-none origin-left text-muted-foreground text-sm"
        animate={{
          y: up ? -20 : 0,
          scale: up ? 0.78 : 1,
          color: focused ? "hsl(var(--primary))" : "hsl(var(--text-secondary))",
        }}
        style={{ top: "0.85rem" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {label}{required && <span className="text-primary/70 ml-0.5">*</span>}
      </motion.label>
      <motion.textarea
        id={id}
        required={required}
        rows={rows}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 pt-7 pb-3 rounded-lg bg-white/[0.04] border text-foreground text-sm outline-none resize-none"
        animate={{
          borderColor: focused ? "hsl(var(--primary))" : "hsl(var(--border-default))",
          boxShadow: focused ? "0 0 0 3px hsl(var(--primary) / 0.10)" : "none",
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────── */
const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const f = (k: keyof typeof form) => ({
    value: form[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [k]: e.target.value }),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current, { opacity: 0, x: -60 }, {
        opacity: 1, x: 0, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", end: "top 38%", scrub: 1.3 },
      });
      gsap.fromTo(rightRef.current, { opacity: 0, x: 60 }, {
        opacity: 1, x: 0, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", end: "top 38%", scrub: 1.3 },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="section-padding relative" style={{ zIndex: 1 }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "hsl(var(--bg-canvas) / 0.7)" }} aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          {/* Info */}
          <div ref={leftRef} className="space-y-6 sm:space-y-8">
            <div>
              <span className="text-label">Contact</span>
              <h2 className="heading-lg mt-3 sm:mt-4">Engage With Us</h2>
              <p className="body-md text-muted-foreground mt-3 sm:mt-4 max-w-md">
                For inquiries regarding our capabilities, partnership opportunities, or consultation requests.
              </p>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {[
                { Icon: Mail, text: "inquiries@skillcommerce.com" },
                { Icon: MapPin, text: "7901 4th St N #31234, St. Petersburg, FL 33702" },
                { Icon: Building, text: "Skill Commerce LLC" },
              ].map(({ Icon, text }) => (
                <motion.div
                  key={text}
                  className="flex items-start gap-3 text-muted-foreground"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Icon className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm leading-relaxed break-all">{text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div ref={rightRef}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="flex flex-col items-center justify-center min-h-[340px] text-center gap-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
                    className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 border border-primary/20"
                  >
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </motion.div>
                  <p className="font-semibold font-display text-foreground text-lg">Inquiry Received</p>
                  <p className="text-sm text-muted-foreground max-w-xs">Our team will respond within one business day.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <FloatingField id="name" label="Full Name" required {...f("name")} />
                  <FloatingField id="email" label="Business Email" type="email" required {...f("email")} />
                  <FloatingField id="company" label="Company / Organization" {...f("company")} />
                  <FloatingTextarea id="message" label="Message" required {...(f("message") as any)} />
                  <MagneticButton className="w-full">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary text-primary-foreground py-3.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-60 group"
                    >
                      {loading ? (
                        <>
                          <motion.div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} />
                          Sending...
                        </>
                      ) : (
                        <>
                          Submit Inquiry
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </MagneticButton>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
