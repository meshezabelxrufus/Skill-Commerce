import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { NoiseOverlay } from "@/components/layout/NoiseOverlay";
import { PageTransition } from "@/components/layout/PageTransition";
import { ParticleCanvas } from "@/components/layout/ParticleCanvas";

export const metadata: Metadata = {
  title: "Skill Commerce LLC — AI Automation & Custom Commerce Software",
  description:
    "Skill Commerce LLC designs and deploys intelligent automation systems, custom software, and operational infrastructure for commerce businesses scaling past manual operations.",
  metadataBase: new URL("https://skillcommerce.com"),
  openGraph: {
    title: "Skill Commerce LLC — AI Automation & Custom Commerce Software",
    description:
      "We build the systems that let commerce businesses operate without manual intervention.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <Providers>
          {/* Living wireframe particle canvas — covers full viewport, fixed */}
          <ParticleCanvas />
          {/* Premium noise texture overlay */}
          <NoiseOverlay />
          {/* Smooth page transitions between routes */}
          <PageTransition>{children}</PageTransition>
        </Providers>
      </body>
    </html>
  );
}
