import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import OperationalFramework from "@/components/OperationalFramework";
import WhyChooseUs from "@/components/WhyChooseUs";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skill Commerce LLC — AI Automation & Custom Commerce Software",
  description:
    "Skill Commerce LLC designs and deploys intelligent automation systems, custom software, and operational infrastructure for commerce businesses scaling past manual operations.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        {/* Services before About — show what we build before who we are */}
        <Services />
        {/* Process before proof of character */}
        <OperationalFramework />
        {/* Differentiators */}
        <WhyChooseUs />
        {/* Company context — after the work is established */}
        <About />
        {/* Conversion — CTA section */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
