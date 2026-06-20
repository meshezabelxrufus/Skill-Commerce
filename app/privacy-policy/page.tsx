import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Skill Commerce LLC",
  description: "Privacy Policy for Skill Commerce LLC.",
};

const sections = [
  {
    title: "Information We Collect",
    content:
      "We collect information you voluntarily provide when you contact us, request a consultation, or engage with our services. This may include your name, business email address, company name, and the content of your inquiry. We do not collect sensitive personal data without explicit consent.",
  },
  {
    title: "How We Use Your Information",
    content:
      "Information collected is used solely to respond to your inquiries, deliver requested services, and maintain our professional relationship with you. We do not sell, rent, or share your personal information with third parties, except as required by law or to facilitate the delivery of our services.",
  },
  {
    title: "Data Retention",
    content:
      "We retain your information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. You may request deletion of your data at any time by contacting us directly at inquiries@skillcommerce.com.",
  },
  {
    title: "Cookies & Tracking",
    content:
      "Our website may use minimal, essential cookies to ensure proper functionality. We do not employ invasive tracking technologies or advertising cookies. Any analytics data collected is aggregated and anonymized.",
  },
  {
    title: "Third-Party Services",
    content:
      "We may use trusted third-party service providers (e.g., email delivery, hosting) to operate our platform. These providers are contractually required to handle your data in accordance with applicable privacy regulations and our data handling standards.",
  },
  {
    title: "Your Rights",
    content:
      "Depending on your jurisdiction, you may have rights to access, correct, or delete personal data we hold about you. To exercise these rights, contact us at inquiries@skillcommerce.com. We will respond to all requests within 30 days.",
  },
  {
    title: "Security",
    content:
      "We implement industry-standard security measures to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
  },
  {
    title: "Changes to This Policy",
    content:
      "We may update this Privacy Policy periodically to reflect changes in our practices or applicable law. The effective date will be updated accordingly. Continued use of our website following any changes constitutes your acceptance of the updated policy.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 section-padding">
        <div className="max-w-3xl mx-auto">
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">Legal</span>
          <h1 className="heading-lg mt-4">Privacy Policy</h1>
          <p className="body-md text-muted-foreground mt-4">Effective Date: January 1, 2025</p>
          <p className="body-md text-muted-foreground mt-6">
            Skill Commerce LLC (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting the privacy of individuals who interact with our website and services. This Privacy Policy outlines how we collect, use, and safeguard your information.
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
            <h2 className="text-lg font-semibold font-display text-foreground mb-2">Contact Us</h2>
            <p className="text-sm text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:inquiries@skillcommerce.com" className="text-primary hover:underline">
                inquiries@skillcommerce.com
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
