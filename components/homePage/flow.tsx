"use client";

import React from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
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
    title: "Connect clients",
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

function StepCard({
  step,
  index,
  total,
  scrollYProgress,
}: {
  step: Step;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  // Hooks are now at the top level of a component ✅
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(scrollYProgress, [start, end], [0.25, 1]);
  const scale = useTransform(scrollYProgress, [start, end], [0.95, 1]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="min-w-[18%] relative rounded-xl border border-foreground/10 bg-foreground/[0.04] p-3 backdrop-blur-sm"
    >
      {/* window dots */}
      <div className="absolute left-5 top-3 h-3 w-3 rounded-full bg-red-400" />
      <div className="absolute left-9 top-3 h-3 w-3 rounded-full bg-green-400" />
      <div className="absolute left-[3.25rem] top-3 h-3 w-3 rounded-full bg-yellow-400" />

      <div className="mb-4 flex items-center justify-end gap-2">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-foreground/5">
          {step.icon}
        </span>
      </div>

      <div className="flex w-full flex-col justify-between">
        <h3 className="mb-2 font-semibold">{step.title}</h3>
        <p className="text-sm opacity-80">{step.body}</p>
        <Link
          href={step.link || "#"}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-3 py-2 text-sm text-text transition hover:bg-primary hover:text-black"
          aria-label={`Open tutorial: ${step.title}`}
        >
          Read more
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function Flow() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // progress for rail fill & arrow
  const progressPct = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative w-full bg-background text-text">
      <div ref={containerRef} className="relative h-[500vh]">
        {/* Sticky stage */}
        <div className="sticky top-20 flex h-[70vh] flex-col items-center justify-center">
          <div className="mb-20 text-center">
            <h2 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-text md:text-5xl">
              Federated Training in 5 Steps.
            </h2>
            <p className="text-pretty mx-auto mt-3 max-w-3xl text-text">
              Connect clients, check compatibility, create pipelines, run and
              track training, then analyze and store your findings—fast and
              reliable.
            </p>
          </div>

          {/* Rail */}
          <div className="relative h-2 w-[80%] rounded-full bg-foreground/10">
            <motion.div
              className="absolute left-0 top-0 h-2 rounded-full bg-gradient-to-r from-primary via-secondary to-red-primary"
              style={{ width: progressPct }}
            />
            <motion.div
              className="absolute top-1/2 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow"
              style={{ left: progressPct }}
              aria-hidden
            >
              ➤
            </motion.div>
          </div>

          {/* Steps */}
          <div className="mt-12 flex w-[80%] gap-6 overflow-hidden">
            {steps.map((step, i) => (
              <StepCard
                key={i}
                step={step}
                index={i}
                total={steps.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
