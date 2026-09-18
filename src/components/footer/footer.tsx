import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border p-10 text-sm text-muted-foreground md:flex-row">
        <p>&copy; {new Date().getFullYear()} Fashion. All rights reserved.</p>

        <div className="flex gap-6">
          <Link href="/terms">Terms</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/cookies">Cookies</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
