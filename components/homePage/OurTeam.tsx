"use client";
import Image from "next/image";
import React from "react";

export type Member = {
  name: string;
  role: string;
  src: string;
};

const DEFAULT_TEAM: Member[] = [
  {
    name: "Ouael Nedjem Eddine SAHBI",
    role: "Student (M. Sc. Software Engineering)",
    src: "/images/team/ouael.jpg",
  },
  {
    name: "Martin Vallières",
    role: "Associate Professor, Department of Oncology",
    src: "/images/team/martin.png",
  },
  { name: "Hithem Lamri", role: "Former intern", src: "/images/team/haithem.jpg" },
];

/**
 * TeamMarquee — team cards that auto-scroll infinitely (two rows, opposite directions)
 * - Big title + subtitle (FR)
 * - Card with rounded image and bottom text overlay (matches the mock)
 * - Infinite marquee using CSS keyframes; content duplicated for seamless loop
 */
export default function OurTeam({
  team = DEFAULT_TEAM,
}: {
  team?: Member[];
}) {
  return (
    <section className="mx-auto max-w-7xl px-2 py-28 md:px-10">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-balance text-white text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
          Rencontrez notre équipe incroyable.
        </h2>
        <p className="mx-auto text-white mt-3 max-w-3xl text-pretty ">
          Nous sommes une équipe d’ingénieurs, de techniciens et de consultants
          passionnés par la performance et la sécurité de vos infrastructures
          IT.
        </p>
      </div>

      {/* Row 1 — L→R */}
      <MarqueeRow items={team} direction="left" className="mt-10" />

      {/* Keyframes (scoped) */}
      <style jsx>{`
        @keyframes marqueeLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes marqueeRight {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}

function MarqueeRow({
  items,
  direction = "left",
  className = "",
  speed = 30,
}: {
  items: Member[];
  direction?: "left" | "right";
  className?: string;
  /** seconds for a full loop */
  speed?: number;
}) {
  // Duplicate the array to create a seamless loop
  const track = [...items, ...items];
  const animName = direction === "left" ? "marqueeLeft" : "marqueeRight";
  return (
    <div className={`relative overflow-hidden ${className}`}>
 
      <div
        className="flex  gap-6 md:gap-10 justify-around"
        // style={{ animation: `${animName} ${speed}s linear infinite` }}
      >
        {DEFAULT_TEAM.map((m, i) => (
          <Card key={`${m.name}-${i}`} member={m} />
        ))}
      </div>

      <div></div>
    </div>
  );
}

function Card({ member }: { member: Member }) {
  return (
    
    <figure className="relative h-[300px] w-[300px] min-w-[300px] overflow-hidden rounded-[2rem] shadow-lg ring-1 ring-black/5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {/* <div className="absolute inset-0 rounded-xl blur-2xl -z-0 bg-gradient-to-r from-primary via-secondary to-red-primary opacity-50"></div> */}

      <Image
        src={member.src}
        alt={member.name}
        className="absolute inset-0 h-full w-full object-cover grayscale"
        width={300}
        height={300}
      />
      {/* bottom gradient overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <figcaption className="absolute bottom-4 left-4 right-4 text-center">
        <div className="text-white">
          <div className="text-lg font-semibold drop-shadow">{member.name}</div>
          <div className="text-sm text-white/80">{member.role}</div>
        </div>
      </figcaption>
    </figure>
  );
}
