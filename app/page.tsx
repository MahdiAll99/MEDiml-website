"use client";
import Image from "next/image";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import SimpleGlobe from "@/components/Globe";
import GlobeDemo from "@/components/globe-demo";
import Link from "next/link";
import HeroSection from "@/components/homePage/HeroSection";
import { Montserrat } from "next/font/google";
import ScrollTutorial from "@/components/homePage/Tuto";
import OurTeam from "@/components/homePage/OurTeam";
import WorkFlow from "@/components/homePage/WorkFlow";
import Flow from "@/components/homePage/flow";
import GetStartedSection from "@/components/homePage/GetStarted";
import TutorialsSection from "@/components/homePage/Tutorials";


const montserrat = Montserrat({
  weight: ["300", "400", "500", "700"], // Example weights
  subsets: ["latin"],
  display: "swap", // Optimizes font loading
  variable: "--font-montserrat", // Optional: for CSS variables
});
export default function Home() {
  return (
    <div className={`${montserrat.className}  relative bg-foreground`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(1200px 600px at 80% 20%, rgba(0,255,153,0.06), transparent 60%), radial-gradient(800px 400px at 10% 90%, rgba(0,255,153,0.04), transparent 50%)",
        }}
      />
      <HeroSection />
      <ScrollTutorial></ScrollTutorial>
      <OurTeam></OurTeam>
      {/* <WorkFlow/>
      <Flow/> */}
      <GetStartedSection/>
      <TutorialsSection/>
    </div>
  );
}
