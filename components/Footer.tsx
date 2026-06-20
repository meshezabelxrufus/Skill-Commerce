import Link from "next/link";

const Footer = () => {
  return (
    <footer className="section-padding py-12 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display font-semibold text-foreground">Skill Commerce LLC</p>
          <p className="text-xs text-muted-foreground mt-1">
            © {new Date().getFullYear()} Skill Commerce LLC. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-6 flex-wrap justify-center">
          <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Services
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
          <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
