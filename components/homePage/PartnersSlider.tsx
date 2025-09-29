// PartnersMarquee.jsx
"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export type Partner = {
  name: string;
  src: string;
  href?: string;
};

const DEFAULT_PARTNERS: Partner[] = [
  { name: "AWS", src: "/images/partners/medomics.png", href: "#" },
  { name: "Azure", src: "/images/partners/udes_white.png", href: "#" },
  { name: "AWS", src: "/images/partners/medomics.png", href: "#" },
  { name: "Azure", src: "/images/partners/udes_white.png", href: "#" },
  { name: "Dell", src: "/images/partners/mcgill.png", href: "#" },
  { name: "Dell", src: "/images/partners/udes_white.png", href: "#" },
];

export default function PartnersSlider({
  partners = DEFAULT_PARTNERS,
  speed = 35, // seconds per full loop
  direction = "left", // "left" | "right"
  className = "",
  section = "Hero",
}) {
  const track = [...partners, ...partners];
  const animName = direction === "left" ? "partnersLeft" : "partnersRight";

  return (
    <div
      className={`py-5  relative overflow-hidden ${className}  ${
        section == "Hero" ? "md:w-9/10" : "md:w-4/10 mx-auto"
      }`}
      aria-label="Partenaires"
    >
      {/* soft fade edges */}
      <div
        className={`pointer-events-none absolute inset-y-0 z-40 left-0 w-10 bg-gradient-to-r to-transparent opacity-50 ${
          section == "Hero" ? "from-foreground " : "from-white"
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 z-40 right-0 w-10 bg-gradient-to-l ${
          section == "Hero" ? "from-foreground " : "from-white"
        } to-transparent opacity-50`}
      />

      <div
        className="flex w-[200%] items-center gap-15 opacity-90 hover:opacity-100"
        style={{ animation: `${animName} ${speed}s linear infinite` }}
      >
        {track.map((p, i) => (
          <Logo key={`${p.name}-${i}`} partner={p} section={section} />
        ))}
      </div>

      {/* scoped keyframes */}
      <style jsx>{`
        @keyframes partnersLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes partnersRight {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

function Logo({
  partner,
  section = "Hero",
}: {
  partner: Partner;
  section: string;
}) {
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <Image
      src={partner.src}
      alt={partner.name}
      className={
        "h-8 w-auto  object-contain  transition grayscale" +
        (section == "Hero" ? " md:h-10" : " md:h-18")
      }
      draggable={false}
      width={160}
      height={60}
    />
  );
  return (
    <div className="shrink-0 flex items-center">
      {partner.href ? (
        <Link
          href={partner.href}
          className="inline-flex items-center"
          aria-label={partner.name}
        >
          {img}
        </Link>
      ) : (
        img
      )}
    </div>
  );
}
