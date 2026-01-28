"use client";

import React from "react";
import {
  Rocket,
  Package,
  Laptop,
  BarChart3,
  ArrowRight,
  FileImage,
  Settings,
  Brain,
} from "lucide-react";

type Tutorial = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

const tutorials: Tutorial[] = [
  {
    title: "Install MEDiml (Python)",
    description: "Set up a virtual environment and install MEDiml via pip in minutes.",
    href: "https://medimage.readthedocs.io/en/latest/Installation.html",
    icon: <Package className="h-5 w-5" />,
  },
  {
    title: "Prepare your data",
    description:
      "Prepare and organize your DICOM and NIfTI scans with segmentation masks.",
    href: "https://medimage.readthedocs.io/en/latest/input_data.html",
    icon: <FileImage className="h-5 w-5" />,
  },
  {
    title: "Configure Extraction",
    description:
      "Set up IBSI-compliant radiomics feature extraction parameters.",
    href: "https://medimage.readthedocs.io/en/latest/configurations_file.html",
    icon: <Settings className="h-5 w-5" />,
  },
  {
    title: "Data Manager",
    description:
      "Convert your DICOM and NIfTI data into manageable binary files.",
    href: "https://medimage.readthedocs.io/en/latest/tutorials.html#datamanager",
    icon: <FileImage className="h-5 w-5" />,
  },
  {
    title: "Batch Extractor",
    description:
      "Run batch extraction on individual scans or entire datasets.",
    href: "https://medimage.readthedocs.io/en/latest/tutorials.html#batchextractor",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Machine Learning",
    description:
      "Train and evaluate machine learning models using the extracted features.",
    href: "https://medimage.readthedocs.io/en/latest/tutorials.html#learning",
    icon: <Brain className="h-5 w-5" />,
  },
];

export default function TutorialsSection() {
  return (
    <section className="relative w-full  text-text">
      {/* soft radial accents */}
      {/* <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(900px_450px_at_80%_10%,rgba(59,130,246,0.08),transparent_60%),radial-gradient(700px_350px_at_10%_90%,rgba(6,182,212,0.06),transparent_50%)]" /> */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        {/* Header */}
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs">
              <Rocket className="h-3.5 w-3.5" />
              <span>Tutorials</span>
            </div>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold leading-[1.05]">
              Learn to use the Python library, step by step
            </h2>
            <p className="mt-3 max-w-2xl text-text/80">
              Follow focused, practical guides to get MEDiml python library running — from pip
              install to radiomics feature extraction and model training.
            </p>
          </div>
        </div>

        {/* Grid of tutorial cards */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tutorials.map((t, i) => (
            <TutorialCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TutorialCard({ title, description, href, icon }: Tutorial) {
  return (
    <div className="group relative rounded-2xl border  border-foreground/10 bg-foreground/[0.03]  p-5 pt-10  md:p-6 md:pt-10 transition">
      {/* glow on hover */}
      <div className="absolute left-5 top-3 rounded-full bg-red-400  w-3 h-3 text-xs"></div>
      <div className="absolute left-9 top-3 rounded-full bg-green-400  w-3 h-3 text-xs"></div>
      <div className="absolute left-13 top-3 rounded-full bg-yellow-400  w-3 h-3 text-xs"></div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent  transition" />

      <div className="flex items-center gap-3 text-sm text-text/70 mb-3">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] border border-white/10">
          {icon}
        </div>
      </div>

      <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-text/75">{description}</p>

      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-2 hover:bg-primary text-sm rounded-lg px-3 bg-primary/10 py-2 border border-primary/20 text-text  transition"
        aria-label={`Open tutorial: ${title}`}
      >
        Open tutorial
        <ArrowRight className="h-4 w-4" />
      </a>

      {/* make whole card clickable (accessible) */}
      <a
        target="_blank"
        rel="noreferrer"
        href={href}
        aria-hidden
        className="absolute inset-0"
        tabIndex={-1}
      />
    </div>
  );
}
