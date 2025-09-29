"use client";

import React, { useEffect, useRef, useState } from "react";
import { Smile, Sparkles, Zap } from "lucide-react";
import PartnersSlider from "./PartnersSlider";
import Image from "next/image";
import { motion, Variants, animate, useInView } from "framer-motion";
import GlobeDemo from "../globe-demo";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

// Tiny count-up that starts when visible
function Counter({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

export default function HeroSection() {
  return (
    <section className="relative md:pb-40 h-screen isolate flex flex-col justify-center bg-foreground text-white">
      {/* glows + grid */}


      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 pt-14 md:px-10 lg:grid-cols-12 lg:gap-16 lg:pt-20">
        {/* LEFT: copy */}
        <div
          
          className="pb-15 relative flex flex-col justify-center gap-4 lg:col-span-6 xl:col-span-6"
        >
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            <span className="text-secondary relative">
              {" "}
              <div className="absolute w-3 bottom-2 h-3 rounded-full bg-red-primary left-0"></div>{" "}
              <span className=" relative">MEDfl</span>
            </span>{" "}
            , a Federated Learning framework for{" "}
            <span className="text-primary relative">
              <div className="absolute w-3 bottom-1 h-3 rounded-full bg-yellow-300 right-0"></div>{" "}
              <span className="relative">Healthcare</span>{" "}
            </span>
          </h1>
          <p className="mt-4 text-sm md:text-lg">
            De l’infrastructure réseau à la cybersécurité avancée, SERVSI vous
            accompagne pour construire et protéger votre environnement
            numérique.
          </p>

          <div
            className="flex gap-4"
          >
            <button className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-3 text-xs font-medium text-black shadow-lg transition hover:brightness-95 md:px-10 md:text-md">
              En savoir plus
            </button>
            <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-xs font-medium text-black shadow-lg transition hover:brightness-95 md:text-md">
              Découvrir nos services
            </button>
          </div>

          <div
            className="mt-2 relative"
          >
            <PartnersSlider />
            {/* <div
              className="absolute w-1/2 left-20 -inset-6 rounded-[2.5rem] bg-emerald-400/10 blur-3xl transition-opacity duration-500"
              aria-hidden
            /> */}
          </div>
        </div>

        {/* RIGHT: image + floating badges/cards */}
        <div
         
          className="lg:col-span-6 xl:col-span-6"
        >
          <div className="relative mx-auto">
            <div className="relative">
              <div
                className="absolute -inset-6 rounded-[2.5rem]  blur-3xl transition-opacity duration-500"
                aria-hidden
              />
              <div className="relative  -mt-10 rounded-[1.75rem]">
                {/* <Image
                  className="absolute top-50 opacity-40 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full "
                  src="/medfl_logo.png"
                  width={1200}
                  height={1200}
                  alt="medfl logo"
                ></Image> */}
                <GlobeDemo />
              </div>

              {/* Left-top badge */}
              <div
    
                className="absolute right-0 top-20 -translate-y-1/2 sm:block md:left-0"
              >
                <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 backdrop-blur-sm ">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg">
                    <Sparkles className="h-4 w-4 text-secondary " />
                  </span>
                  <span className="text-sm font-medium text-white/90">
                    Performance et fiabilité
                  </span>
                </div>
              </div>

              {/* Right-middle chip */}
              <div
              
                className="absolute right-0 top-2/3 -translate-y-1/2 sm:block md:-right-10 md:top-1/2"
              >
                <div className="inline-flex items-center rounded-full bg-white/10 px-2 py-2 backdrop-blur-sm">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg">
                    <Smile className="h-6 w-6 text-primary" />
                  </span>
                </div>
              </div>

              {/* Bottom-left stats card with count-up */}
              <div
  
                className="absolute bottom-20 z-40 w-[270px] max-w-[70vw] md:-left-0"
              >
                <div className="rounded-2xl bg-white/10 p-2 text-white/90 backdrop-blur-md ring-1 ring-white/15 md:p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full  ring-1 ring-emerald-400/30">
                      <Zap className="h-4 w-4 text-secondary" />
                    </span>
                    <div>
                      <span className="text-sm font-medium text-white md:text-md">
                        <span className="text-secondary">
                          +<Counter to={500} />
                        </span>{" "}
                        Infrastructures
                      </span>
                      <p className="text-xs text-white/80">Sécurisées</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
