"use client";

import React from "react";
import { motion, useScroll, useTransform } from "motion/react";

const steps = [
  { title: "Dataset", body: "3D medical images (DICOM/NIfTI)", icon: "🗄️" },
  { title: "DataManager", body: "Parse scans & extract metadata", icon: "🧰" },
  { title: "Input", body: "Convert images to binary objects", icon: "🧪" },
  { title: "Subpackages", body: "Processing, biomarkers, filters…", icon: "🧩" },
  { title: "Output", body: "Shape / Intensity / Texture", icon: "📈" },
  { title: "Extras", body: "Cleaning, selection, training", icon: "⚙️" },
];

export default function Flow() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // arrow progress
  const arrowX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative w-full bg-foreground text-white">
      <div ref={containerRef} className="h-[500vh] relative">
        {/* Sticky timeline */}
        <div className="sticky top-20 h-[70vh] flex flex-col items-center justify-center">
          {/* Rail */}
          <div className="relative w-[80%] h-2 bg-white/10 rounded-full">
            <motion.div
              className="absolute top-0 left-0 h-2 bg-gradient-to-r from-sky-400 via-fuchsia-400 to-amber-300 rounded-full"
              style={{ width: arrowX }}
            />
            {/* Arrow */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-black grid place-items-center shadow"
              style={{ x: arrowX }}
            >
              ➤
            </motion.div>
          </div>

          {/* Steps row */}
          <div className="flex gap-6 mt-12 w-[80%] overflow-hidden">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                style={{
                  opacity: useTransform(
                    scrollYProgress,
                    [i / steps.length, (i + 1) / steps.length],
                    [0.2, 1]
                  ),
                  scale: useTransform(
                    scrollYProgress,
                    [i / steps.length, (i + 1) / steps.length],
                    [0.9, 1]
                  ),
                }}
                className="min-w-[200px] bg-white/[0.05] border border-white/10 rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span>{s.icon}</span>
                  <h3 className="font-semibold">{s.title}</h3>
                </div>
                <p className="text-sm opacity-80">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
