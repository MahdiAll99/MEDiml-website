"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  Play,
  ArrowRight,
  Sparkles,
  Code,
  Laptop,
  CheckCircle,
} from "lucide-react";

function YouTubeEmbed({ youtubeId }: { youtubeId: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] shadow-2xl">

      {/* 16:9 aspect ratio */}
      <div className="relative aspect-video w-full pt-6">
        <iframe
          className="absolute inset-0 h-full w-full rounded-b-2xl"
          src={`https://www.youtube.com/embed/h38vEpkHSpc?si=LwWwykvqAv_QNjo1`}
          title="MEDiml Introduction Video"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}

const features = [
  {
    icon: <Laptop className="h-5 w-5 text-primary" />,
    title: "Code-Free Interface",
    description: "Intuitive drag-and-drop interface for medical image analysis",
  },
  {
    icon: <Code className="h-5 w-5 text-secondary" />,
    title: "Python Package",
    description: "Flexible code-based solution for advanced customization",
  },
  {
    icon: <CheckCircle className="h-5 w-5 text-primary" />,
    title: "IBSI Compliant",
    description: "Adheres to international radiomics extraction standards",
  },
];

export default function DiscoverMEDimage() {
  const reduced = useReducedMotion();

  return (
    <section className="relative w-full bg-background text-text overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-primary/5 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 10 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.04] px-3 py-1 text-sm">
              <Sparkles className="h-4 w-4 text-secondary" />
              Discover MEDiml
            </div>

            <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
              Transform Medical Images into{" "}
              <span className="text-primary">Insights</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-text/80">
              Watch our introduction video to learn how MEDiml streamlines
              radiomics analysis with its powerful dual-component architecture.
            </p>
          </motion.div>
        </div>

        {/* Main content grid */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-center">
          {/* Video - takes more space */}
          <motion.div
            className="lg:col-span-7"
            initial={reduced ? undefined : { opacity: 0, x: -20 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <YouTubeEmbed youtubeId="gSRsqmDv8mE" />
          </motion.div>

          {/* Features sidebar */}
          <motion.div
            className="lg:col-span-5 space-y-6"
            initial={reduced ? undefined : { opacity: 0, x: 20 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <div className="space-y-4">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={reduced ? undefined : { opacity: 0, y: 10 }}
                  whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group relative rounded-xl border border-foreground/10 bg-foreground/[0.03] p-4 transition hover:bg-foreground/[0.06]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-foreground/[0.06] border border-foreground/10">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-text">{feature.title}</h3>
                      <p className="mt-1 text-sm text-text/70">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
