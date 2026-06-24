import HeroCinematic from "@/components/HeroCinematic";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
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
      {/*
        HeroCinematic: pinned video section — scroll drives camera → monitor.
        On mobile / reduced-motion it renders null and Hero shows first.
        On desktop: after the monitor mask fills the viewport, the pin
        releases and Hero (same #09090B dark background) is immediately below —
        the transition is seamless with zero color break.
      */}
      <HeroCinematic />
      {/*
        md:-mt-[100vh]: on desktop, pull <main> up by one viewport height.

        Why: the cinematic wrapper is 500vh but the sticky panel is 100vh,
        so the sticky releases at scroll 400vh — leaving a 100vh "gap" before
        Hero would normally appear at 500vh. The negative margin moves Hero to
        400vh, exactly matching where the sticky releases. Result: when the dark
        mask fills the screen at the end of the cinematic, the Hero section is
        already present at the viewport top — it doesn't scroll up from below.

        On mobile (< md), no margin is applied because HeroCinematic is
        display:none (takes 0 height) and Hero starts at 0 as expected.
      */}
      <main id="main" className="md:-mt-[100vh]">
        {/* Original hero — this is what the user "enters" through the monitor */}
        <Hero />
        <Services />
        <OperationalFramework />
        <WhyChooseUs />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
