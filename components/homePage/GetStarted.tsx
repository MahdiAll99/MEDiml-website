"use client";

import Link from "next/link";
import React from "react";
import CodeBlock from "./CodeBlocs";
import {
  Package,
  Download,
  BookOpen,
  Github,
  Terminal,
  Server,
  Laptop,
  Rocket,
} from "lucide-react";
import Image from "next/image";

export default function GetStartedSection() {
  const [tab, setTab] = React.useState<"python" | "desktop">("python");

  const pipCmd = `pip install MEDiml`;

  const extractionExample = `from MEDiml import MEDiml
import json

# Load extraction parameters
with open("extraction_params.json") as f:
    params = json.load(f)

# Initialize MEDiml with a scan
med = MEDiml()
med.init_from_nifti(
    path_to_nifti="path/to/scan.nii.gz",
    path_to_roi="path/to/mask.nii.gz"
)

# Extract radiomics features (IBSI-compliant)
features = med.extract_features(params)
print(features)`;

  const batchExample = `from MEDiml.biomarkers.batch import BatchExtractor

# Configure batch extraction
extractor = BatchExtractor(
    path_to_data="./data/scans/",
    path_to_params="./extraction_params.json",
    path_to_output="./results/"
)

# Run extraction on all scans
extractor.run()

# Export results to CSV
extractor.export_to_csv("radiomics_features.csv")`;

  return (
    <section className="relative w-full  text-text">
      {/* <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(800px_400px_at_80%_10%,rgba(59,130,246,0.08),transparent_60%),radial-gradient(600px_300px_at_10%_90%,rgba(6,182,212,0.06),transparent_50%)]" /> */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        {/* Header */}
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10  bg-foreground/[0.03]  px-3 py-1 text-xs">
              <Rocket className="h-3.5 w-3.5 text-secondary" />
              <span className="text-secondary">Get started</span>
            </div>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold leading-[1.05]">
              Analyze your images now
            </h2>
            <p className="mt-3 max-w-2xl text-text/80">
              Use MEDiml as a Python package or install the desktop application.
              No Python knowledge required — enjoy an all-in-one interface for medical image analysis with drag-drop style feature extraction and model training.
            </p>
          </div>

          {/* Quick links */}
        
        </div>

        {/* Tabs */}
        <div className="mt-10 inline-flex rounded-2xl border border-foreground/10  bg-foreground/[0.04]   p-1">
          <TabButton
            active={tab === "python"}
            onClick={() => setTab("python")}
            icon={<Package className="h-4 w-4" />}
            label="Python package"
          />
          <TabButton
            active={tab === "desktop"}
            onClick={() => setTab("desktop")}
            icon={<Laptop className="h-4 w-4 " />}
            label="Desktop app"
          />
        </div>

        {/* Content */}
        {tab === "python" ? (
          <div>
              <div className="flex gap-2 mt-8">
            <CTA
              href="https://mediml.readthedocs.io/"
              icon={<BookOpen className="h-4 w-4 text-primary" />}
            >
              Docs
            </CTA>
            <CTA
              href="https://pypi.org/project/MEDimage/"
              icon={<Download className="h-4 w-4 text-secondary" />}
            >
              PyPI
            </CTA>
            <CTA
              href="https://github.com/MEDomicsLab/MEDiml"
              icon={<Github className="h-4 w-4 text-yellow-400" />}
            >
              GitHub
            </CTA>
          </div>
  <div className="mt-8 grid lg:grid-cols-2 gap-6">
            <Card
              title="Install with pip"
              icon={<Terminal className="h-5 w-5" />}
            >
              <CodeBlock lang="bash" code={pipCmd} />
              <p className="mt-3 text-sm text-text/70">
                Requires Python 3.8+. Compatible with DICOM and NIfTI formats.
                Adheres to IBSI international standards.
              </p>
            </Card>

            <Card
              title="Extract radiomics features"
              icon={<Package className="h-5 w-5" />}
            >
              <CodeBlock lang="python" code={extractionExample} />
            </Card>
          </div>
          </div>
        
        ) : (
          <div>
            <div className="flex gap-2 mt-8">
            <CTA
              href="https://medomicslab.gitbook.io/mediml-app-docs"
              icon={<BookOpen className="h-4 w-4 text-primary" />}
            >
              Docs
            </CTA>
            <CTA
              href="https://medomicslab.gitbook.io/mediml-app-docs/quick-start"
              icon={<Download className="h-4 w-4 text-secondary" />}
            >
              Quick Start
            </CTA>
            <CTA
              href="https://github.com/MEDomicsLab/MEDiml-app"
              icon={<Github className="h-4 w-4 text-yellow-400" />}
            >
              GitHub
            </CTA>
          </div>
          <div className="mt-8 grid lg:grid-cols-3 gap-6">
            <Card title="Download" icon={<Download className="h-5 w-5" />}>
              <div className="grid grid-cols-1 gap-2">
                <LinkBtn href="https://github.com/MEDomicsLab/MEDiml-app/releases/download/v0.0.1/MEDimage-app-0.0.1-win.exe">Windows (.exe)</LinkBtn>
                <LinkBtn href="https://github.com/MEDomicsLab/MEDiml-app/releases/download/v0.0.1/MEDimage-app-0.0.1-mac.dmg">macOS (.dmg)</LinkBtn>
                <LinkBtn href="https://github.com/MEDomicsLab/MEDiml-app/releases/download/v0.0.1/MEDimage-app-0.0.1-ubuntu.deb">Linux (.AppImage)</LinkBtn>
              </div>
              <p className="mt-3 text-sm text-text/70">
                Drag-and-drop interface for easy feature extraction and model training.
                No coding required.
              </p>
              <div className="mt-3">
                <SmallLink href="https://medomicslab.gitbook.io/mediml-app-docs/quick-start">
                  Install guide
                </SmallLink>
              </div>
            </Card>

            <Card title="Key Features" icon={<Server className="h-5 w-5" />}>
              <ul className="text-sm space-y-2 text-text/80 list-disc pl-5">
                <li>
                  Code-free intuitive interface for medical image analysis
                </li>
                <li>
                  IBSI-compliant radiomics feature extraction
                </li>
                <li>
                  Support for DICOM and NIfTI formats
                </li>
                <li>
                  Tailored functionalities for model training
                </li>
              </ul>
            </Card>

            <Card
              title="Resources"
              icon={<BookOpen className="h-5 w-5" />}
            >
              <ul className="text-sm space-y-2 text-text/80 list-disc pl-5">
                <li>Guided video tutorials for step-by-step learning</li>
                <li>Tutorials and code examples on GitHub</li>
                <li>Comprehensive documentation website</li>
              </ul>
              <div className="mt-3 flex gap-2">
                <SmallLink href="https://medomicslab.gitbook.io/mediml-app-docs">Docs</SmallLink>
                <SmallLink href="https://github.com/MEDomicsLab/MEDiml/tree/main/notebooks">
                  Notebooks
                </SmallLink>
              </div>
            </Card>
          </div>
          </div>
               
        )}
      </div>
    </section>
  );
}

/* ------- UI helpers ------- */

function CTA({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="blank"
      className="inline-flex items-center gap-2 rounded-xl border border-foreground/15   bg-foreground/[0.06]   px-3 py-2 text-sm hover:bg-white/[0.1] transition"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-sm transition
      ${
        active
          ? "bg-secondary text-black font-medium"
          : "text-text hover:bg-white/10"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function Card({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="relative rounded-2xl border border-foreground/10  bg-foreground/[0.03]  p-4 md:p-5 md:pt-10">
      <div className="absolute left-5 top-3 rounded-full bg-red-400  w-3 h-3 text-xs"></div>
      <div className="absolute left-9 top-3 rounded-full bg-green-400  w-3 h-3 text-xs"></div>
      <div className="absolute left-13 top-3 rounded-full bg-yellow-400  w-3 h-3 text-xs"></div>
      <div className="flex items-center gap-2 text-sm text-text/70 my-3">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.06]   border border-white/10">
          {icon}
        </div>
        <span className="uppercase tracking-wide">{title}</span>
      </div>
      {children}
    </div>
  );
}

function SmallLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-lg px-2 py-1 text-xs bg-foreground/[0.06]   border border-foreground/10 hover:bg-white/[0.1] transition"
    >
      {children}
    </Link>
  );
}

function LinkBtn({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm bg-white text-black hover:opacity-90 transition"
    >
      {children}
    </Link>
  );
}
