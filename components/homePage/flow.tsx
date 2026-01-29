"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Lightbulb,
  Laptop,
  CheckCircle,
  Globe,
  FileImage,
  Settings,
  BarChart3,
  Download,
  Code,
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
    title: "Load Medical Images",
    body: "Import DICOM or NIfTI scans with their segmentation masks into MEDiml.",
    icon: <FileImage className="h-7 w-7 text-primary" />,
    link: "https://medomicslab.gitbook.io/mediml-app-docs", 
  },
  {
    title: "Configure & Extract",
    body: "Set up radiomics feature extraction parameters and run feature extraction on single scans or entire datasets.",
    icon: <Settings className="h-7 w-7 text-secondary" />,
    link: "https://mediml.readthedocs.io/",
  },
  {
    title: "Train & Export",
    body: "Build predictive models and export results for clinical research.",
    icon: <Download className="h-7 w-7 text-secondary" />,
    link: "https://medomicslab.gitbook.io/mediml-app-docs",
  },
  {
    title: "Generate Code",
    body: "Turn your graphical workflow into executable code for reproducibility and collaboration.",
    icon: <Code className="h-7 w-7 text-secondary" />,
    link: "https://medomicslab.gitbook.io/mediml-app-docs",
  },
];

function StepCard({
  step,
  animated,
}: {
  step: Step;
  animated?: boolean;
}) {
  return (
    <motion.div
      // ✅ keep conditional styling (no scroll progress)
      style={animated ? { opacity: 1, scale: 1 } : undefined}
      className="
        relative rounded-xl border border-foreground/10 bg-foreground/[0.04]
        p-4 backdrop-blur-sm
      "
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
      </div>
    </motion.div>
  );
}

export default function Flow() {
  return (
    <section className="relative w-full bg-background text-text">
      {/* MOBILE / TABLET: normal layout */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:hidden">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Radiomics Analysis in {steps.length} Steps
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-pretty">
            Load images, configure extraction, extract IBSI-compliant features,
            and train models for clinical insights.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {steps.map((step, i) => (
            <StepCard key={i} step={step} />
          ))}
        </div>
      </div>

      {/* DESKTOP: same layout (no scroll progress / no rail) */}
      <div className="relative hidden lg:block">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-16 text-center">
            <h2 className="text-balance text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Radiomics Analysis in {steps.length} Steps
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-pretty">
              Load images, configure extraction, extract IBSI-compliant features,
              and train models for clinical insights.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <StepCard key={i} step={step} animated />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
