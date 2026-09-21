"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoSearch, IoBagOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-border bg-background">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-3xl font-bold tracking-tight text-foreground"
        >
          Fashion.
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathName === link.href;
            return (
              <Link
                className={`relative text-sm font-medium
  uppercase transition-colors ${
    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
  }`}
                key={link.href}
                href={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            {/* search */}
            <button className="rounded-full p-2 text-foreground transition-colors hover:bg-surface">
              <IoSearch size={22} />
            </button>

            {/* user */}
            <Link
              href="/login"
              className="rounded-full p-2 text-foreground transition-colors hover:bg-surface"
            >
              <FaRegUser size={22} />
            </Link>

            {/* cart badge */}
            <Link
              href="/cart"
              className="rounded-full p-2 text-foreground transition-colors hover:bg-surface"
            >
              <IoBagOutline size={22} />
            </Link>
          </div>

          {/* mobile menu buttons */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className=" text-2xl cursor-pointer text-foreground md:hidden"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col px-4 py-4">
            {navLinks.map((link) => (
              <Link
                className="rounded-md px-2 py-3 text-muted-foreground transition hover:bg-surface hover:text-foreground"
                href={link.href}
                key={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/login"
              className="mt-4 block rounded-lg bg-primary py-3 text-center text-sm font-medium text-primary-foreground transition hover:bg-primary-hover"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
