"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
  Variants,
} from "motion/react";
import {
  Plug,
  ShieldCheck,
  Network,
  Workflow,
  FileCog,
  BookOpen,
  Rocket,
  PlayCircle,
  LineChart,
  BarChart3,
  Play,
  Github,
  FileImage,
  Settings,
  Layers,
  Download,
  Brain,
  FileOutput,
} from "lucide-react";

type Action = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  variant?: "primary" | "ghost" | "red" | "yellow";
  aria?: string;
};

type Step = {
  title: string;
  body: string;
  img: string; // public path e.g. /images/tutorial/01.png
  alt?: string;
  color: string;
  icon: React.ReactNode;
  link?: string; // default/primary link (Guide)
  actions?: Action[];
};

const steps: Step[] = [
  {
    title: "Load Medical Images",
    body: "Import DICOM or NIfTI scans along with segmentation masks. MEDiml supports widely used medical imaging formats.",
    img: "/images/tutos/DataManager.JPG",
    alt: "Loading medical images",
    color: "bg-red-400",
    icon: <FileImage className="h-5 w-5 text-primary" />,
    link: "https://medomicslab.gitbook.io/mediml-app-docs",
    actions: [
      {
        label: "",
        href: "https://medomicslab.gitbook.io/mediml-app-docs/radiomics/data-processing/data-manager",
        icon: <BookOpen className="h-4 w-4" />,
        variant: "ghost",
        aria: "Open documentation",
      },
      {
        label: " ",
        href: "https://www.youtube.com/watch?v=JS6CWvUkMFY",
        icon: <Play className="h-4 w-4" />,
        variant: "red",
        aria: "Open tutorial",
      },
      {
        label: "",
        href: "https://github.com/MEDomicsLab/MEDiml",
        icon: <Github className="h-4 w-4" />,
        variant: "primary",
        aria: "Open GitHub",  
      },
    ],
  },
  {
    title: "Explore Your Data",
    body: "Visualize scans and ROIs, inspect metadata, and review data statistics before extraction.",
    img: "/images/tutos/ImageViewer.jpg",
    alt: "Data exploration",
    color: "bg-green-400",
    icon: <Layers className="h-5 w-5 text-secondary" />,
    link: "https://medomicslab.gitbook.io/mediml-app-docs/radiomics/data-processing/radiomics-pre-checks",
    actions: [
      {
        label: "",
        href: "https://medomicslab.gitbook.io/mediml-app-docs/radiomics/data-processing/radiomics-pre-checks",
        icon: <BookOpen className="h-4 w-4" />,
        variant: "ghost",
        aria: "Open documentation",
      },
      {
        label: " ",
        href: "https://www.youtube.com/watch?v=rkpRYdb18k4&list=PLEPy2VhC4-D5Eg-UxRyTtmUZRh-D5m_Ru&index=5&pp=iAQB",
        icon: <Play className="h-4 w-4" />,
        variant: "red",
        aria: "Watch tutorials",
      },
      {
        label: "",
        href: "https://github.com/MEDomicsLab/MEDiml",
        icon: <Github className="h-4 w-4" />,
        variant: "primary",
        aria: "Open GitHub",
      },
    ],
  },
  {
    title: "Configure Extraction",
    body: "Set up IBSI-compliant radiomics feature extraction parameters. Customize filters, discretization, and feature families.",
    img: "/images/tutos/FeaturesToExtractrPage.PNG",
    alt: "Extraction configuration",
    color: "bg-yellow-400",
    icon: <Settings className="h-5 w-5 text-primary" />,
    link: "https://medimage.readthedocs.io/",
    actions: [
      {
        label: "",
        href: "https://medimage.readthedocs.io/en/latest/configurations_file.html",
        icon: <BookOpen className="h-4 w-4" />,
        variant: "ghost",
        aria: "Open code documentation",
      },
      {
        label: " ",
        href: "https://theibsi.github.io/",
        icon: <ShieldCheck className="h-4 w-4" />,
        variant: "red",
        aria: "IBSI standards",
      },
      {
        label: "",
        href: "https://github.com/MEDomicsLab/MEDiml/tree/main/notebooks/tutorial/settings",
        icon: <Github className="h-4 w-4" />,
        variant: "primary",
        aria: "View settings",
      },
    ],
  },
  {
    title: "Extract Features",
    body: "Run batch extraction on individual scans or entire datasets. Features are computed following the IBSI workflow.",
    img: "/images/tutos/ExtractionPipeline.PNG",
    alt: "Feature extraction",
    color: "bg-blue-400",
    icon: <BarChart3 className="h-5 w-5 text-secondary" />,
    link: "https://medomicslab.gitbook.io/mediml-app-docs",
    actions: [
      {
        label: "",
        href: "https://medomicslab.gitbook.io/mediml-app-docs/radiomics/feature-extraction",
        icon: <BookOpen className="h-4 w-4" />,
        variant: "ghost",
        aria: "Open documentation",
      },
      {
        label: " ",
        href: "https://www.youtube.com/watch?v=BDFuzRM1fes&list=PLEPy2VhC4-D5Eg-UxRyTtmUZRh-D5m_Ru&index=8&pp=iAQB",
        icon: <Rocket className="h-4 w-4" />,
        variant: "red",
        aria: "Quick start",
      },
      {
        label: "",
        href: "https://github.com/MEDomicsLab/MEDiml/blob/main/notebooks/tutorial/BatchExtractor-Tutorial.ipynb",
        icon: <Github className="h-4 w-4" />,
        variant: "primary",
        aria: "Open GitHub",
      },
    ],
  },
  {
    title: "Train Models",
    body: "Use extracted features to train predictive models. MEDiml offers tailored functionalities for model training and validation.",
    img: "/images/tutos/LearningPipeline.JPG",
    alt: "Model training",
    color: "bg-purple-400",
    icon: <Brain className="h-5 w-5 text-primary" />,
    link: "https://medomicslab.gitbook.io/mediml-app-docs",
    actions: [
      {
        label: "",
        href: "https://medomicslab.gitbook.io/mediml-app-docs/learning",
        icon: <BookOpen className="h-4 w-4" />,
        variant: "ghost",
        aria: "Open documentation",
      },
      {
        label: " ",
        href: "https://www.youtube.com/watch?v=Q4Y5xsvi9G0&list=PLEPy2VhC4-D5Eg-UxRyTtmUZRh-D5m_Ru&index=7&pp=iAQB",
        icon: <Play className="h-4 w-4" />,
        variant: "red",
        aria: "Watch tutorials",
      },
      {
        label: "",
        href: "https://github.com/MEDomicsLab/MEDiml/blob/main/notebooks/tutorial/Learning-Tutorial.ipynb",
        icon: <Github className="h-4 w-4" />,
        variant: "primary",
        aria: "Open GitHub",
      },
    ],
  },
  {
    title: "Analyze & Export",
    body: "Visualize results, compare experiments, and export features and models for reproducibility and clinical research.",
    img: "/images/tutos/ResultsAnalysis.PNG",
    alt: "Results and exports",
    color: "bg-emerald-400",
    icon: <FileOutput className="h-5 w-5 text-secondary" />,
    link: "https://medomicslab.gitbook.io/mediml-app-docs",
    actions: [
      {
        label: "",
        href: "https://medomicslab.gitbook.io/mediml-app-docs/demonstration",
        icon: <BookOpen className="h-4 w-4" />,
        variant: "ghost",
        aria: "Open documentation",
      },
      {
        label: " ",
        href: "https://www.youtube.com/watch?v=-6lYVOfyebE",
        icon: <Rocket className="h-4 w-4" />,
        variant: "red",
        aria: "Watch tutorials",
      },
      {
        label: "",
        href: "https://github.com/MEDomicsLab/MEDiml/blob/main/notebooks/tutorial/Learning-Tutorial.ipynb",
        icon: <Github className="h-4 w-4" />,
        variant: "primary",
        aria: "Open GitHub",
      },
    ],
  },
];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export default function ScrollTutorial() {
  const [active, setActive] = React.useState(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative container mx-auto w-full text-text">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-text md:text-5xl">
          From Images to Insights
        </h2>
        <p className="mx-auto mt-3 px-4 w-full font-medium text-text md:w-3/5">
          Load medical images, configure extraction parameters, extract IBSI-compliant 
          radiomics features, train models, and export results—all in one platform.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* LEFT: scroll steps */}
          <div className="lg:col-span-5">
            <ol className="relative">
              {steps.map((s, i) => (
                <StepBlock
                  key={i}
                  index={i}
                  step={s}
                  onEnter={() => setActive(i)}
                  active={active === i}
                  reducedMotion={!!prefersReducedMotion}
                />
              ))}
            </ol>
          </div>

          {/* RIGHT: sticky stage */}
          <div className="relative lg:col-span-7 hidden md:block">
            <div className="relative h-[60vh] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] lg:sticky lg:top-56 md:h-[45vh]">
              <div className="absolute inset-0 -z-0 rounded-xl bg-gradient-to-r from-primary via-secondary to-red-primary opacity-50 blur-2xl"></div>
              <Image
                className="absolute left-1/2 top-70 w-full -translate-x-1/2 -translate-y-1/2 opacity-60"
                src="/MEDimlLogo.png"
                width={1200}
                height={1200}
                alt="MEDiml logo"
              />
              <AnimatePresence mode="popLayout" initial={false}>
                {steps.map((s, i) =>
                  i === active ? (
                    <motion.div
                      key={i}
                      className="absolute inset-0 w-full p-5 pt-8"
                      initial={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, scale: 0.985 }
                      }
                      animate={
                        prefersReducedMotion
                          ? { opacity: 1 }
                          : { opacity: 1, scale: 1 }
                      }
                      exit={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, scale: 1.005 }
                      }
                      transition={{ duration: 0.45, ease: "easeOut" }}
                    >
                      <Image
                        src={s.img}
                        alt={s.alt ?? s.title}
                        width={1920}
                        height={1080}
                        className="h-full w-full rounded-xl object-cover"
                        priority
                      />
                    </motion.div>
                  ) : null
                )}
              </AnimatePresence>

              {/* Simple progress chip */}
              <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2 py-1 text-xs">
                {active + 1} / {steps.length}
              </div>
              <div className="absolute left-5 top-3 h-3 w-3 rounded-full bg-red-400 text-xs"></div>
              <div className="absolute left-9 top-3 h-3 w-3 rounded-full bg-green-400 text-xs"></div>
              <div className="absolute left-[3.25rem] top-3 h-3 w-3 rounded-full bg-yellow-400 text-xs"></div>
            </div>

            {/* Mobile: inline images (when no sticky) */}
            <div className="mt-6 space-y-6 lg:hidden">
              {steps.map((s, i) => (
                <div
                  key={`m-${i}`}
                  className="overflow-hidden rounded-xl border border-white/10"
                >
                  <Image
                    src={s.img}
                    alt={s.alt ?? s.title}
                    width={1920}
                    height={1080}
                    className="h-auto w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** One scroll-triggered step */
function StepBlock({
  step,
  index,
  onEnter,
  active,
  reducedMotion,
}: {
  step: Step;
  index: number;
  onEnter: () => void;
  active: boolean;
  reducedMotion: boolean;
}) {
  const ref = React.useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { amount: 0.6, margin: "-10% 0px -10% 0px" });

  React.useEffect(() => {
    if (inView) onEnter();
  }, [inView, onEnter]);

  return (
    <li ref={ref} className="flex md:min-h-[70vh] items-center py-12">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{
          y: inView ? 0 : 10,
          opacity: inView ? 1 : 0.6,
        }}
        transition={{ duration: reducedMotion ? 0 : 0.45, ease: "easeOut" }}
        className="max-w-lg"
      >
        <div className="mb-4 flex items-center gap-3">
          <span
            className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold
              ${active ? "text-black" : "bg-white/10 text-white/80"} ${
              step.color
            }`}
          >
            {index + 1}
          </span>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-foreground/10">
              {step.icon}
            </span>
            <h3 className="text-xl font-bold md:text-2xl">{step.title}</h3>
          </div>
        </div>

        <p className="text-sm opacity-80 md:text-base">{step.body}</p>

        {/* Actions */}
        {(step.link || step.actions?.length) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {/* {step.link && (
              <Link
                href={step.link}
                aria-label={`Open guide: ${step.title}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary px-3 py-2 text-sm font-medium text-black transition hover:brightness-95"
              >
                <BookOpen className="h-4 w-4" />
                Guide
              </Link>
            )} */}
            {step.actions?.map((a, idx) => (
              <a
                key={`${step.title}-action-${idx}`}
                href={a.href}
                target="_blank"
                rel="noreferrer"
                aria-label={a.aria || a.label}
                className={[
                  "inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm transition",
                  a.variant === "primary"
                    ? "text-primary border border-primary/20  hover:brightness-95"
                    : a.variant === "red"
                    ? "text-secondary border border-secondary/40  hover:brightness-95"
                    : "border border-foreground/20 bg-transparent hover:bg-foreground/10",
                ].join(" ")}
              >
                {a.icon}
                {a.label}
              </a>
            ))}
          </div>
        )}
      </motion.div>
    </li>
  );
}
