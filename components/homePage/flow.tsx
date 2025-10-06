"use client";

import React from "react";
import { motion, useScroll, useTransform } from "motion/react"; // or: 'framer-motion'
import {
  Plug,
  ShieldCheck,
  Workflow,
  PlayCircle,
  LineChart,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

type Step = {
  title: string;
  body: string;
  icon: React.ReactNode;
  link: string;
};

const steps: Step[] = [
  {
    title: "Connect clients ",
    body: "Secure Tailscale + WebSocket handshake.",
    icon: <Plug className="h-7 w-7 text-primary" />,
    link: "",
  },
  {
    title: "Check compatibility & validate",
    body: "OS/GPU/dataset checks. Ensure every client is ready.",
    icon: <ShieldCheck className="h-7 w-7 text-secondary" />,
    link: "",
  },
  {
    title: "Create your pipelines",
    body: "Pick models, DP, FL strategy, rounds, and metrics.",
    icon: <Workflow className="h-7 w-7 text-primary" />,
    link: "",
  },
  {
    title: "Run & track training",
    body: "Live rounds, logs, metrics, client statuses.",
    icon: <PlayCircle className="h-7 w-7 text-secondary" />,
    link: "",
  },
  {
    title: "Analyze & save results",
    body: "Compare configs, AUC/ROC, export & archive.",
    icon: <LineChart className="h-7 w-7 text-primary" />,
    link: "",
  },
];

export default function Flow() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Progress (0 → 100%) for width and arrow left position
  const progressPct = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative w-full bg-background text-text">
      <div ref={containerRef} className="relative h-[500vh]">
        {/* Sticky stage */}
        <div className="sticky top-20 h-[70vh] flex flex-col items-center justify-center">
          <div className="text-center mb-20 ">
            <h2 className="text-balance text-text text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Federated Training in 5 Steps.
            </h2>
            <p className="mx-auto text-text mt-3 max-w-3xl text-pretty ">
              Connect clients, check compatibility, create pipelines, run and
              track training, then analyze and store your findings—fast and
              reliable.
            </p>
          </div>
          {/* Rail */}
          <div className="relative w-[80%] h-2 rounded-full bg-foreground/10">
            {/* Fill */}
            <motion.div
              className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-primary via-secondary to-red-primary"
              style={{ width: progressPct }}
            />
            {/* Arrow — use `left`, not `x` */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-black grid place-items-center shadow"
              style={{ left: progressPct }}
              aria-hidden
            >
              ➤
            </motion.div>
          </div>

          {/* Steps */}
          <div className="mt-12 flex w-[80%] gap-6 overflow-hidden">
            {steps.map((s, i) => {
              const start = i / steps.length;
              const end = (i + 1) / steps.length;
              const opacity = useTransform(
                scrollYProgress,
                [start, end],
                [0.25, 1]
              );
              const scale = useTransform(
                scrollYProgress,
                [start, end],
                [0.95, 1]
              );

              return (
                <motion.div
                  key={i}
                  style={{ opacity, scale }}
                  className="min-w-[18%] relative   rounded-xl border border-foreground/10 bg-foreground/[0.04] p-3 backdrop-blur-sm"
                >
                  <div className="absolute left-5 top-3 rounded-full bg-red-400  w-3 h-3 text-xs"></div>
                  <div className="absolute left-9 top-3 rounded-full bg-green-400  w-3 h-3 text-xs"></div>
                  <div className="absolute left-13 top-3 rounded-full bg-yellow-400  w-3 h-3 text-xs"></div>

                  <div className="mb-4 flex justify-end   items-center gap-2">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-foreground/5">
                      {s.icon}
                    </span>
                  </div>
                  <div className="flex w-full  flex-col justify-between">
                    <h3 className="font-semibold mb-2 ">{s.title}</h3>
                    <p className="text-sm opacity-80">{s.body}</p>
                    <Link
                      href={s.link}
                      className="mt-4 inline-flex justify-center items-center gap-2 hover:bg-primary hover:text-black text-sm rounded-lg px-3 bg-primary/10 py-2 border border-primary/20 text-text  transition"
                      aria-label={`Open tutorial: ${s.title}`}
                    >
                      Read more
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
