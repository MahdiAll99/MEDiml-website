"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, PropsWithChildren } from "react";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";
import { Github } from "lucide-react";

export type NavLink = { label: string; href: string; external?: boolean };

type Props = {
  links?: NavLink[];
  cta?: { label: string; href: string; external?: boolean };
  secondaryCta?: { label: string; href: string; external?: boolean };
};

function NavA({
  href,
  external,
  className,
  onClick,
  children,
  ...rest
}: PropsWithChildren<{
  href: string;
  external?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}>) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
        onClick={onClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick} // ✅ This now works
      className={className}
      {...rest}
    >
      {children}
    </Link>
  );
}

export default function Navbar({
  links = [
    { label: "Installation", href: "https://medomicslab.gitbook.io/mediml-app-docs/quick-start", external: true },
    { label: "Tutorials", href: "https://youtube.com/playlist?list=PLEPy2VhC4-D5Eg-UxRyTtmUZRh-D5m_Ru", external: true },
    { label: "IBSI", href: "https://theibsi.github.io/", external: true },
    { label: "Our Lab", href: "https://medomicslab.com/", external: true },
  ],
  cta = { label: "Discord", href: "https://discord.com/invite/ZbaGj8E6mP", external: true },
  secondaryCta = {
    label: "GitHub",
    href: "https://github.com/MEDomicsLab/MEDiml-app",
    external: true,
  },
}: Props) {
  const [open, setOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);
  const pathname = usePathname();

  const docsLinks: NavLink[] = [
    { label: "MEDiml-app", href: "https://medomicslab.gitbook.io/mediml-app-docs", external: true },
    { label: "MEDiml package", href: "https://mediml.readthedocs.io/", external: true },
  ];

  const linkBase =
    "rounded px-1 py-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40";
  const isActive = (href: string) => href !== "/" && pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur text-text">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 md:px-6">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="MEDiml home"
        >
          <Image
            src="/MEDimlLogo.png"
            width={160}
            height={40}
            alt="MEDiml logo"
            className="h-auto w-[70px]"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
          <ul className="flex items-center gap-6 text-sm text-white/80">
            <li className="relative">
              <button
                type="button"
                className={[
                  linkBase,
                  "inline-flex items-center gap-1 text-text hover:text-blue-400",
                ].join(" ")}
                aria-haspopup="menu"
                aria-expanded={docsOpen}
                onClick={() => setDocsOpen((v) => !v)}
              >
                Docs
                <svg
                  className={`h-4 w-4 transition ${docsOpen ? "rotate-180" : "rotate-0"}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <div
                className={`absolute left-0 mt-2 w-56 rounded-lg border border-white/10 bg-background/95 p-2 shadow-lg backdrop-blur ${
                  docsOpen ? "block" : "hidden"
                }`}
                role="menu"
              >
                <ul className="flex flex-col gap-1">
                  {docsLinks.map((doc) => (
                    <li key={doc.href}>
                      <NavA
                        href={doc.href}
                        external={doc.external}
                        className="block rounded-md px-3 py-2 text-sm text-text transition hover:bg-white/5 hover:text-blue-400"
                        onClick={() => setDocsOpen(false)}
                      >
                        {doc.label}
                      </NavA>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href}>
                  <NavA
                    href={l.href}
                    external={l.external}
                    className={[
                      linkBase,
                      active ? "text-white" : "text-text",
                      active
                        ? "underline underline-offset-8 decoration-primary/70"
                        : "hover:text-blue-400",
                    ].join(" ")}
                    aria-current={active ? "page" : undefined}
                  >
                    {l.label}
                  </NavA>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right cluster: Theme + CTA(s) (desktop) */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {/* Secondary CTA (GitHub) */}
          {secondaryCta && (
            <NavA
              href={secondaryCta.href}
              external={secondaryCta.external}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 px-3 py-2 text-sm font-semibold text-text transition hover:bg-foreground/10"
              aria-label={secondaryCta.label}
            >
              <Github className="h-4 w-4" />
              {secondaryCta.label}
            </NavA>
          )}
          {/* Primary CTA */}
          <NavA
            href={cta.href}
            external={cta.external}
            className="inline-flex items-center justify-center rounded-full bg-[#939cfa] px-4 py-2 text-sm font-semibold text-black shadow ring-1 ring-white-500/40 transition hover:brightness-95"
            aria-label={cta.label}
          >
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Discord</title><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
            {cta.label}
          </NavA>
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
          {/* Theme + Secondary at top */}
          <li className="mb-1 flex items-center justify-between">
            <ThemeToggle />
            {secondaryCta && (
              <NavA
                href={secondaryCta.href}
                external={secondaryCta.external}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 px-3 py-2 text-sm transition hover:bg-foreground/10"
                onClick={() => setOpen(false)}
              >
                <Github className="h-4 w-4" />
                {secondaryCta.label}
              </NavA>
            )}
          </li>

          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href}>
                <NavA
                  href={l.href}
                  external={l.external}
                  className={[
                    "block rounded-md px-3 py-2",
                    active ? "bg-white/10 text-white" : "hover:bg-white/5",
                  ].join(" ")}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </NavA>
              </li>
            );
          })}

          <li className="mt-1">
            <div className="px-3 py-1 text-xs uppercase tracking-wide text-white/60">
              Docs
            </div>
            <ul className="flex flex-col gap-1">
              {docsLinks.map((doc) => (
                <li key={doc.href}>
                  <NavA
                    href={doc.href}
                    external={doc.external}
                    className="block rounded-md px-3 py-2 hover:bg-white/5"
                    onClick={() => setOpen(false)}
                  >
                    {doc.label}
                  </NavA>
                </li>
              ))}
            </ul>
          </li>

          <li className="mt-2">
            <NavA
              href={cta.href}
              external={cta.external}
              className="mx-auto block w-2/3 items-center justify-center rounded-full bg-secondary px-4 py-2 text-center text-sm font-semibold text-black shadow ring-1 ring-emerald-500/40"
              onClick={() => setOpen(false)}
            >
              {cta.label}
            </NavA>
          </li>
        </ul>
      </div>
    </header>
  );
}
