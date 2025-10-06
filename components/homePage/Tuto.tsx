"use client";

import React from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
  Variants,
} from "motion/react";

type Step = {
  title: string;
  body: string;
  img: string; // public path e.g. /images/tutorial/01.png
  alt?: string;
  color: string;
};

const steps: Step[] = [
  {
    title: "Connect Clients Securely",
    body: "Securely link all clients through Tailscale and WebSockets, ensuring private and seamless communication between participants.",
    img: "/images/tutos/home.png",
    alt: "Onboarding clients",
    color: "bg-red-400",
  },
  {
    title: "Build your Network",
    body: "Pick your strategy (FedAvg, XGB Bagging), rounds, and DP settings. Track rounds in real-time.",
    img: "/images/tutos/network.png",
    alt: "Training dashboard",
    color: "bg-green-400",
  },
  {
    title: "Compare & Evaluate",
    body: "Visualize AUC/accuracy by round, compare runs, and export results for your paper or report.",
    img: "/images/tutos/dataStats.png",
    alt: "Metrics comparison",
    color: "bg-yellow-400",
  },
  {
    title: "Compare & Evaluate",
    body: "Visualize AUC/accuracy by round, compare runs, and export results for your paper or report.",
    img: "/images/tutos/configs.png",
    alt: "Metrics comparison",
    color: "bg-yellow-400",
  },
  {
    title: "Compare & Evaluate",
    body: "Visualize AUC/accuracy by round, compare runs, and export results for your paper or report.",
    img: "/images/tutos/checkConfig.png",
    alt: "Metrics comparison",
    color: "bg-yellow-400",
  },
  {
    title: "Compare & Evaluate",
    body: "Visualize AUC/accuracy by round, compare runs, and export results for your paper or report.",
    img: "/images/tutos/results.png",
    alt: "Metrics comparison",
    color: "bg-yellow-400",
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
    <section className="relative  container mx-auto w-full text-text">
      <div className=" text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-text md:text-5xl">
          From Setup to Breakthroughs
        </h2>
        <p className="mt-3 text-text font-medium w-full md:w-3/5 mx-auto ">
          Follow our simple step-by-step process to connect sites securely,
          launch federated training with your preferred strategy, and track
          results in real-time with clear visual insights.
        </p>
      </div>
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-16 md:py-24">
        <div className="grid lg:grid-cols-12 gap-10">
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
          <div className="lg:col-span-7 relative ">
            <div className="lg:sticky lg:top-56 border border-white/10 rounded-2xl   bg-white/[0.02] overflow-hidden relative h-[60vh] md:h-[45vh]">
              <div className="absolute inset-0 rounded-xl blur-2xl -z-0 bg-gradient-to-r from-primary via-secondary to-red-primary opacity-50"></div>
              <Image
                className="absolute top-70 opacity-60 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full "
                src="/medfl_logo.png"
                width={1200}
                height={1200}
                alt="medfl logo"
              ></Image>
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
                        className=" rounded-xl   h-full w-full object-cover"
                        priority
                      />

                      {/* soft top/bottom fades for readability */}
                    </motion.div>
                  ) : null
                )}
              </AnimatePresence>

              {/* Simple progress chip */}
              <div className="absolute right-3 bottom-3 rounded-full bg-black/50 px-2 py-1 text-xs">
                {active + 1} / {steps.length}
              </div>
              <div className="absolute left-5 top-3 rounded-full bg-red-400  w-3 h-3 text-xs"></div>
              <div className="absolute left-9 top-3 rounded-full bg-green-400  w-3 h-3 text-xs"></div>
              <div className="absolute left-13 top-3 rounded-full bg-yellow-400  w-3 h-3 text-xs"></div>
            </div>

            {/* Mobile: inline images (when no sticky) */}
            <div className="mt-6 lg:hidden space-y-6">
              {steps.map((s, i) => (
                <div
                  key={`m-${i}`}
                  className="rounded-xl overflow-hidden border border-white/10"
                >
                  <Image
                    src={s.img}
                    alt={s.alt ?? s.title}
                    width={1920}
                    height={1080}
                    className="w-full h-auto object-cover"
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
    <li ref={ref} className="min-h-[70vh] flex items-center py-12 ">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{
          y: inView ? 0 : 10,
          opacity: inView ? 1 : 0.6,
        }}
        transition={{ duration: reducedMotion ? 0 : 0.45, ease: "easeOut" }}
        className="max-w-lg"
      >
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold
              ${active ? " text-black" : "bg-white/10 text-white/80"} ${
              step.color
            }`}
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
