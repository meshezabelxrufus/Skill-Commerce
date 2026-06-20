import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Skill Commerce LLC",
  description:
    "Skill Commerce LLC is a Florida-registered LLC focused on commerce architecture, marketplace infrastructure, and operational scalability.",
};

const stats = [
  { value: "100%", label: "U.S. Registered" },
  { value: "Governed", label: "Structured Operations" },
  { value: "Scalable", label: "Infrastructure Models" },
  { value: "Compliant", label: "Regulatory Alignment" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 section-padding">
        <div className="max-w-6xl mx-auto">
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
            About the Firm
          </span>
          <h1 className="heading-lg mt-4 max-w-2xl">
            Commerce Architecture for Sustained Growth
          </h1>

          <div className="grid md:grid-cols-2 gap-16 mt-16 items-start">
            <div className="space-y-6">
              <p className="body-md text-muted-foreground">
                Skill Commerce LLC is a Florida-registered limited liability company focused on commerce architecture, marketplace infrastructure, and operational scalability. We design and implement systems that support structured, long-term growth for modern retail operations.
              </p>
              <p className="body-md text-muted-foreground">
                Our approach emphasizes governance, system design, and growth enablement — ensuring every operational layer is built for reliability, compliance, and measurable performance at scale.
              </p>
              <p className="body-md text-muted-foreground">
                Founded by practitioners with deep expertise in e-commerce infrastructure, we bring a disciplined, engineering-first perspective to every engagement. We work with clients across a range of verticals, from emerging brands to established enterprises.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="p-6 rounded-xl border border-border bg-background">
                  <p className="text-2xl font-bold font-display text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 p-10 rounded-2xl border border-border bg-background">
            <h2 className="text-xl font-semibold font-display text-foreground mb-4">Our Mission</h2>
            <p className="body-md text-muted-foreground max-w-2xl">
              To architect commerce systems that endure — built on sound engineering principles, governed operations, and a relentless commitment to sustainable, measurable growth for every client we serve.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
