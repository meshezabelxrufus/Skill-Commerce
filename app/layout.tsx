import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Skill Commerce LLC — Commerce Architecture & Infrastructure",
  description:
    "Skill Commerce LLC delivers structured, data-driven commerce systems for modern online retail operations. Commerce architecture, marketplace infrastructure, and operational scalability.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
