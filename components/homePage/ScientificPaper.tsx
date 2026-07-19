"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  FileText,
  ExternalLink,
  Download,
  Users,
  Calendar,
  BookOpen,
  ArrowRight,
} from "lucide-react";

const PAPER = {
  title:
    "Unraveling Radiomics Complexity: Strategies for Optimal Simplicity in Predictive Modeling",
  arxivId: "2407.04888",
  arxivUrl: "https://arxiv.org/abs/2407.04888",
  pdfUrl: "https://arxiv.org/pdf/2407.04888.pdf",
  published: "July 5, 2024",
  authors:
    "Loutfi et al.",
  abstract:
    "The high dimensionality of radiomic feature sets and potentially high computational requirements underscore the need for an effective method to identify the smallest set of predictive features. This work develops a methodology and tools—MEDiml—to identify and explain the smallest set of predictive radiomic features across five cancer datasets (n=2,104), estimating the optimal radiomics complexity level for specific medical outcomes.",
  highlights: [
    { label: "Datasets", value: "5 cancer cohorts" },
    { label: "Patients", value: "2,104" },
    { label: "Features", value: "89,714 extracted" },
    { label: "Subject", value: "eess.IV / cs.CV" },
  ],
};

export default function ScientificPaper() {
  const reduced = useReducedMotion();

  return (
    <section
      id="paper"
      className="relative scroll-mt-24 w-full bg-background text-text overflow-hidden"
    >
      <div
        className="absolute right-0 top-1/4 w-[500px] h-[400px] rounded-full bg-secondary/5 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 10 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.04] px-3 py-1 text-sm">
              <FileText className="h-4 w-4 text-secondary" />
              Scientific Paper
            </div>
            <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
              The{" "}
              <span className="text-primary">research</span> behind MEDiml
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-text/80">
              Explore the methodology that powers MEDiml—published on arXiv and
              developed to simplify radiomics predictive modeling.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 items-start">
          {/* Meta + abstract */}
          <motion.div
            className="lg:col-span-5 space-y-6"
            initial={reduced ? undefined : { opacity: 0, x: -16 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
          >
            <div className="relative rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-5 md:p-6">
              <div className="absolute left-5 top-3 h-3 w-3 rounded-full bg-red-400" />
              <div className="absolute left-9 top-3 h-3 w-3 rounded-full bg-green-400" />
              <div className="absolute left-[3.25rem] top-3 h-3 w-3 rounded-full bg-yellow-400" />

              <div className="mt-5 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  arXiv:{PAPER.arxivId}
                </div>

                <h3 className="text-xl font-bold leading-snug md:text-2xl">
                  {PAPER.title}
                </h3>

                <div className="flex flex-col gap-2 text-sm text-text/75">
                  <div className="flex items-start gap-2">
                    <Users className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    <span>{PAPER.authors}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 shrink-0 text-secondary" />
                    <span>Image and Video Processing (eess.IV)</span>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-text/80 border-t border-foreground/10 pt-4">
                  {PAPER.abstract}
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-3">
              {PAPER.highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-foreground/10 bg-foreground/[0.03] px-4 py-3"
                >
                  <div className="text-xs uppercase tracking-wide text-text/55">
                    {item.label}
                  </div>
                  <div className="mt-1 text-sm font-semibold">{item.value}</div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Link
                href={PAPER.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-black transition hover:brightness-95"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Link>
              <Link
                href={PAPER.arxivUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-foreground/20 bg-transparent px-5 py-2.5 text-sm transition hover:bg-foreground/10"
              >
                View on arXiv
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* PDF viewer */}
          <motion.div
            className="lg:col-span-7"
            initial={reduced ? undefined : { opacity: 0, x: 16 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.05 }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] shadow-2xl">
              <div className="flex items-center justify-between border-b border-foreground/10 bg-foreground/[0.04] px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="ml-2 text-xs text-text/60 truncate">
                    {PAPER.arxivId}.pdf
                  </span>
                </div>
                <Link
                  href={PAPER.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                >
                  Open
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="relative h-[420px] sm:h-[520px] lg:h-[640px] w-full bg-white">
                <iframe
                  title="MEDiml scientific paper PDF"
                  src={`${PAPER.pdfUrl}#view=FitH`}
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                />
              </div>
            </div>

            <p className="mt-3 text-center text-xs text-text/55">
              If the PDF does not load in your browser, use{" "}
              <Link
                href={PAPER.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                Download PDF
              </Link>{" "}
              or view it on{" "}
              <Link
                href={PAPER.arxivUrl}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                arXiv
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
