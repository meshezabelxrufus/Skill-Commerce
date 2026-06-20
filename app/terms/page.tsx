import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — Skill Commerce LLC",
  description: "Terms and Conditions for Skill Commerce LLC.",
};

const sections = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing or using the Skill Commerce LLC website and services, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our website or engage our services.",
  },
  {
    title: "Services",
    content:
      "Skill Commerce LLC provides commerce architecture, marketplace infrastructure, and operational scalability consulting services. The specific scope, deliverables, and terms of any engagement will be defined in a separate service agreement between Skill Commerce LLC and the client.",
  },
  {
    title: "Intellectual Property",
    content:
      "All content on this website — including text, graphics, logos, and design elements — is the proprietary property of Skill Commerce LLC and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written consent.",
  },
  {
    title: "Confidentiality",
    content:
      "Any information shared with Skill Commerce LLC during an inquiry or engagement will be treated with strict professional confidentiality. We will not disclose your confidential business information to third parties without your prior written consent, except as required by law.",
  },
  {
    title: "Limitation of Liability",
    content:
      "To the fullest extent permitted by law, Skill Commerce LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our website or services, even if we have been advised of the possibility of such damages.",
  },
  {
    title: "Disclaimer of Warranties",
    content:
      "Our website and related content are provided on an 'as-is' and 'as-available' basis without warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of harmful components.",
  },
  {
    title: "Governing Law",
    content:
      "These Terms & Conditions shall be governed by and construed in accordance with the laws of the State of Florida, United States, without regard to its conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of Florida.",
  },
  {
    title: "Modifications",
    content:
      "We reserve the right to modify these Terms & Conditions at any time. Changes will be effective upon posting to our website. Your continued use of the website following any modifications constitutes your acceptance of the revised terms.",
  },
  {
    title: "Contact",
    content:
      "For questions regarding these Terms & Conditions, please contact us at inquiries@skillcommerce.com.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 section-padding">
        <div className="max-w-3xl mx-auto">
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">Legal</span>
          <h1 className="heading-lg mt-4">Terms &amp; Conditions</h1>
          <p className="body-md text-muted-foreground mt-4">Effective Date: January 1, 2025</p>
          <p className="body-md text-muted-foreground mt-6">
            These Terms &amp; Conditions govern your use of the Skill Commerce LLC website located at skillcommerce.com and any related services. Please read these terms carefully before using our website.
          </p>

          <div className="mt-12 space-y-10">
            {sections.map((section, index) => (
              <div key={section.title}>
                <h2 className="text-lg font-semibold font-display text-foreground mb-3">
                  {index + 1}. {section.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-xl border border-border bg-background">
            <h2 className="text-lg font-semibold font-display text-foreground mb-2">Questions?</h2>
            <p className="text-sm text-muted-foreground">
              Contact us at{" "}
              <a href="mailto:inquiries@skillcommerce.com" className="text-primary hover:underline">
                inquiries@skillcommerce.com
              </a>{" "}
              for any questions regarding these Terms &amp; Conditions.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
