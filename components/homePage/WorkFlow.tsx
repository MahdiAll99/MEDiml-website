"use client";

import React from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  Variants,
  useReducedMotion,
} from "motion/react";

type Step = {
  key: string;
  title: string;
  body: string;
  icon?: React.ReactNode; // optional emoji/SVG
};

const steps: Step[] = [
  {
    key: "dataset",
    title: "Dataset",
    body: "3D medical images (DICOM / NIfTI) loaded into the workflow.",
    icon: <span className="text-3xl">🗄️</span>,
  },
  {
    key: "datamgr",
    title: "DataManager",
    body: "Scans parsed; key metadata extracted for downstream tasks.",
    icon: <span className="text-3xl">🧰</span>,
  },
  {
    key: "input",
    title: "Input",
    body: "Images transformed to binary (Pickle) objects for feature extraction.",
    icon: <span className="text-3xl">🧪</span>,
  },
  {
    key: "subpkgs",
    title: "Subpackages",
    body: "Processing, biomarkers, filters, wrangling, utils & learning modules.",
    icon: <span className="text-3xl">🧩</span>,
  },
  {
    key: "output",
    title: "Output",
    body: "Shape, intensity, texture, linear & textural filters computed.",
    icon: <span className="text-3xl">📈</span>,
  },
  {
    key: "extra",
    title: "Additional Features",
    body: "Pre-checks, data cleaning, feature selection, model training.",
    icon: <span className="text-3xl">⚙️</span>,
  },
];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export default function WorkFlow() {
  const [active, setActive] = React.useState(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative w-full bg-background text-text">
      {/* Header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        className="text-center pt-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          From Dataset to Decisions
        </h2>
        <p className="opacity-80 mt-3">
          Scroll to follow the pipeline. The arrow stays. The story unfolds.
        </p>
      </motion.div>

      <div className="mx-auto max-w-7xl px-6 md:px-10 py-16 md:py-24">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* LEFT: scroll steps */}
          <div className="lg:col-span-6">
            <ol className="relative">
              {steps.map((s, i) => (
                <StepBlock
                  key={s.key}
                  step={s}
                  index={i}
                  onEnter={() => setActive(i)}
                  active={active === i}
                  reducedMotion={!!prefersReducedMotion}
                />
              ))}
            </ol>
          </div>

          {/* RIGHT: sticky arrow + staged cards */}
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-28 relative h-[70vh]">
              {/* Arrow rail */}
              <motion.div
                aria-hidden
                className="absolute left-10 top-4 bottom-4 w-1 rounded-full bg-white/10 overflow-hidden"
              >
                {/* progress fill grows with step */}
                <motion.div
                  className="absolute left-0 top-0 w-full bg-gradient-to-b from-sky-400 via-fuchsia-400 to-amber-300"
                  style={{
                    height: `${((active + 1) / steps.length) * 100}%`,
                  }}
                />
              </motion.div>

              {/* Arrow head that sticks and slides along the rail */}
              <motion.div
                className="absolute left-7 w-7 h-7 rounded-full bg-white text-black grid place-items-center shadow"
                animate={{
                  top: `calc(${((active + 0.5) / steps.length) * 100}% - 14px)`,
                }}
                transition={{ duration: 0.5, ease }}
              >
                ➤
              </motion.div>

              {/* Stage content (changes per active step) */}
              <div className="absolute left-20 right-0 top-0 bottom-0">
                <AnimatePresence mode="popLayout" initial={false}>
                  {steps.map((s, i) =>
                    i === active ? (
                      <motion.div
                        key={s.key}
                        className="absolute inset-0 border border-white/10 rounded-2xl bg-white/[0.03] p-6 md:p-8"
                        initial={
                          prefersReducedMotion
                            ? { opacity: 0 }
                            : { opacity: 0, scale: 0.98 }
                        }
                        animate={
                          prefersReducedMotion
                            ? { opacity: 1 }
                            : { opacity: 1, scale: 1 }
                        }
                        exit={
                          prefersReducedMotion
                            ? { opacity: 0 }
                            : { opacity: 0, scale: 1.01 }
                        }
                        transition={{ duration: 0.45, ease: "easeOut" }}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05, duration: 0.4 }}
                          className="flex items-center gap-3"
                        >
                          <span>{s.icon}</span>
                          <h3 className="text-2xl md:text-3xl font-bold">
                            {s.title}
                          </h3>
                        </motion.div>

                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.12, duration: 0.4 }}
                          className="opacity-80 mt-3"
                        >
                          {s.body}
                        </motion.p>

                        {/* Optional: gradient shadow/glow for flair */}
                        <div className="absolute -inset-4 -z-10 rounded-2xl blur-2xl opacity-40 bg-gradient-to-r from-sky-500 via-fuchsia-500 to-amber-400" />
                      </motion.div>
                    ) : null
                  )}
                </AnimatePresence>

                {/* Progress chip */}
                <div className="absolute right-3 bottom-3 rounded-full bg-black/60 px-2 py-1 text-xs">
                  {active + 1} / {steps.length}
                </div>
              </div>
            </div>

            {/* Mobile fallback: inline cards */}
            <div className="mt-8 lg:hidden space-y-4">
              {steps.map((s, i) => (
                <div
                  key={`m-${s.key}`}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="flex items-center gap-2">
                    <span>{s.icon}</span>
                    <h4 className="font-semibold">{s.title}</h4>
                  </div>
                  <p className="opacity-80 text-sm mt-1">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
    <li ref={ref} className="min-h-[70vh] flex items-center py-12">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: inView ? 0 : 10, opacity: inView ? 1 : 0.5 }}
        transition={{ duration: reducedMotion ? 0 : 0.45, ease: "easeOut" }}
        className="max-w-xl"
      >
        <div className="flex items-center gap-3 mb-3">
          <span
            className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold
              ${active ? "bg-white text-black" : "bg-white/10 text-white/80"}`}
          >
            {index + 1}
          </span>
          <h3 className="text-xl md:text-2xl font-bold">{step.title}</h3>
        </div>
        <p className="text-sm md:text-base opacity-80">{step.body}</p>
      </motion.div>
    </li>
  );
}
