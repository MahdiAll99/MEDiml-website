"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export type NavLink = { label: string; href: string };

type Props = {
  links?: NavLink[];
  cta?: { label: string; href: string };
};

export default function Navbar({
  links = [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blogs" },
  ],
  cta = { label: "Contact us", href: "/contact" },
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background text-text">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/medfl_logo.png"
            width={200}
            height={50}
            alt="logo"
            className="w-15"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
          <ul className="flex items-center gap-8 text-sm text-white/80">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded px-1 py-1 hover:text-white text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right cluster: Theme + CTA (desktop) */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Link
            href={cta.href}
            className="inline-flex items-center justify-center rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-black shadow ring-1 ring-emerald-500/40 transition hover:brightness-95"
          >
            {cta.label}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-white/80 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            className={`h-5 w-5 ${open ? "hidden" : "block"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
          <svg
            className={`h-5 w-5 ${open ? "block" : "hidden"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden ${
          open ? "block" : "hidden"
        } border-t border-white/10 bg-background`}
      >
        <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-white/90">
          {/* Theme toggle at top on mobile */}
          <li className="flex justify-end">
            <ThemeToggle />
          </li>

          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block rounded-md px-3 text-center py-2 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="mt-2">
            <Link
              href={cta.href}
              className="block mx-auto text-center w-2/3 items-center justify-center rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-black shadow ring-1 ring-emerald-500/40"
              onClick={() => setOpen(false)}
            >
              {cta.label}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
