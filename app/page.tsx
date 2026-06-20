import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import OperationalFramework from "@/components/OperationalFramework";
import WhyChooseUs from "@/components/WhyChooseUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skill Commerce LLC — Engineering Scalable Digital Commerce Infrastructure",
  description:
    "Skill Commerce LLC delivers structured, data-driven commerce systems for modern online retail operations.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <OperationalFramework />
      <WhyChooseUs />
      <Contact />
      <Footer />
    </div>
  );
}
