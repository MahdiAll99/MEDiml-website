/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Color, Fog, PerspectiveCamera, Scene, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Update this import path to your actual geojson
import countries from "@/data/globe.json";

/* ========================= Types ========================= */

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: { lat: number; lng: number };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

/* ====================== Helpers ====================== */

const RING_PROPAGATION_SPEED = 3;
const cameraZ = 300;

function hexToRgb(hex: string) {
  const shorthand = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthand, (_, r, g, b) => r + r + g + g + b + b);
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) }
    : null;
}

function genRandomNumbers(min: number, max: number, count: number) {
  const arr: number[] = [];
  while (arr.length < Math.max(0, Math.min(count, Math.max(0, max - min)))) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (!arr.includes(r)) arr.push(r);
  }
  return arr;
}

/* ===================================================== */
/* ===============   Low-level Globe mesh   ============= */
/* ===================================================== */

function Globe({ globeConfig, data }: WorldProps) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const groupRef = useRef<any | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const cfg = useMemo<Required<GlobeConfig>>(
    () => ({
      pointSize: 1,
      atmosphereColor: "#ffffff",
      showAtmosphere: true,
      atmosphereAltitude: 0.1,
      polygonColor: "rgba(255,255,255,0.7)",
      globeColor: "#1e1e1e",
      emissive: "#ffffff",
      emissiveIntensity: 0.1,
      shininess: 0.9,
      arcTime: 2000,
      arcLength: 0.9,
      rings: 1,
      maxRings: 3,
      ambientLight: "#ffffff",
      directionalLeftLight: "#ffffff",
      directionalTopLight: "#ffffff",
      pointLight: "#ffffff",
      initialPosition: { lat: 0, lng: 0 },
      autoRotate: true,
      autoRotateSpeed: 1,
      ...globeConfig,
    }),
    [globeConfig]
  );

  // Initialize ThreeGlobe once and attach to a group
  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      globeRef.current = new ThreeGlobe();
      groupRef.current.add(globeRef.current);
      setIsInitialized(true);

      // Optional: position to initial lat/lng
      if (cfg.initialPosition) {
        const { lat, lng } = cfg.initialPosition;
        // three-globe supports pointOfView on the instance:
        try {
          (globeRef.current as any).pointOfView({ lat, lng, altitude: 2.2 });
        } catch {}
      }
    }

    return () => {
      // Cleanup on unmount
      if (groupRef.current && globeRef.current) {
        groupRef.current.remove(globeRef.current);
      }
      globeRef.current = null;
    };
  }, [cfg.initialPosition]);

  // Update globe material when ready or when material-related props change
  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    const globeMaterial = globeRef.current.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };

    globeMaterial.color = new Color(cfg.globeColor);
    globeMaterial.emissive = new Color(cfg.emissive);
    globeMaterial.emissiveIntensity = cfg.emissiveIntensity;
    globeMaterial.shininess = cfg.shininess;
  }, [
    isInitialized,
    cfg.globeColor,
    cfg.emissive,
    cfg.emissiveIntensity,
    cfg.shininess,
  ]);

  // Build polygons, arcs, and points when data/cfg change
  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    // --- points from arc endpoints (dedup) ---
    const pts: Array<{
      size: number;
      order: number;
      color: string;
      lat: number;
      lng: number;
    }> = [];
    for (let i = 0; i < data.length; i++) {
      const a = data[i];
      hexToRgb(a.color); // (kept if you want to validate color)
      pts.push({
        size: cfg.pointSize,
        order: a.order,
        color: a.color,
        lat: a.startLat,
        lng: a.startLng,
      });
      pts.push({
        size: cfg.pointSize,
        order: a.order,
        color: a.color,
        lat: a.endLat,
        lng: a.endLng,
      });
    }
    const uniquePts = pts.filter(
      (v, i, a) => a.findIndex((w) => w.lat === v.lat && w.lng === v.lng) === i
    );

    globeRef.current
      .hexPolygonsData((countries as any).features || [])
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(cfg.showAtmosphere!)
      .atmosphereColor(cfg.atmosphereColor!)
      .atmosphereAltitude(cfg.atmosphereAltitude!)
      .hexPolygonColor(() => cfg.polygonColor!);

    globeRef.current
      .arcsData(data)
      .arcStartLat((d: any) => d.startLat)
      .arcStartLng((d: any) => d.startLng)
      .arcEndLat((d: any) => d.endLat)
      .arcEndLng((d: any) => d.endLng)
      .arcColor((d: any) => d.color)
      .arcAltitude((d: any) => d.arcAlt)
      .arcStroke(() => [0.32, 0.28, 0.3][Math.floor(Math.random() * 3)])
      .arcDashLength(cfg.arcLength!)
      .arcDashInitialGap((d: any) => d.order)
      .arcDashGap(15)
      .arcDashAnimateTime(cfg.arcTime!);

    globeRef.current
      .pointsData(uniquePts)
      .pointColor((d: any) => d.color)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(2);

    globeRef.current
      .ringsData([])
      .ringColor(() => cfg.polygonColor!)
      .ringMaxRadius(cfg.maxRings!)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod(
        (cfg.arcTime! * cfg.arcLength!) / Math.max(1, cfg.rings!)
      );
  }, [
    isInitialized,
    data,
    cfg.pointSize,
    cfg.showAtmosphere,
    cfg.atmosphereColor,
    cfg.atmosphereAltitude,
    cfg.polygonColor,
    cfg.arcLength,
    cfg.arcTime,
    cfg.rings,
    cfg.maxRings,
  ]);

  // Rings animation loop with cleanup
  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    const id = setInterval(() => {
      if (!globeRef.current) return;
      const idxs = genRandomNumbers(
        0,
        data.length,
        Math.floor((data.length * 4) / 5)
      );
      const ringsData = data
        .filter((_, i) => idxs.includes(i))
        .map((d) => ({ lat: d.startLat, lng: d.startLng, color: d.color }));
      globeRef.current.ringsData(ringsData);
    }, 2000);

    return () => clearInterval(id);
  }, [isInitialized, data]);

  return <group ref={groupRef as any} />;
}

/* ===================================================== */
/* ===============   Renderer / Camera fit  ============ */
/* ===================================================== */

function WebGLRendererConfig() {
  const { gl } = useThree();
  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setClearColor(0x000000, 0); // transparent bg
  }, [gl]);
  return null;
}

function FitCameraToViewport() {
  const { camera, size } = useThree();
  useEffect(() => {
    const cam = camera as PerspectiveCamera;
    cam.aspect = size.width / size.height;
    cam.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}

/* ===================================================== */
/* ====================   World   ====================== */
/* ===================================================== */

export function World(props: WorldProps) {
  const { globeConfig } = props;

  // Scene with fog (optional)
  const scene = useMemo(() => {
    const s = new Scene();
    s.fog = new Fog(0xffffff, 400, 2000);
    return s;
  }, []);

  return (
    <Canvas
      scene={scene}
      camera={{ fov: 50, near: 180, far: 1800, position: [0, 0, cameraZ] }}
      // Make sure parent container gives the canvas a real height in CSS
      // style={{ width: "100%", height: "100%" }}
    >
      <WebGLRendererConfig />
      <FitCameraToViewport />

      <ambientLight
        color={globeConfig.ambientLight ?? "#ffffff"}
        intensity={0.6}
      />
      <directionalLight
        color={globeConfig.directionalLeftLight ?? "#ffffff"}
        position={new Vector3(-400, 100, 400)}
      />
      <directionalLight
        color={globeConfig.directionalTopLight ?? "#ffffff"}
        position={new Vector3(-200, 500, 200)}
      />
      <pointLight
        color={globeConfig.pointLight ?? "#ffffff"}
        position={new Vector3(-200, 500, 200)}
        intensity={0.8}
      />

      <Globe {...props} />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotate={globeConfig.autoRotate ?? true}
        autoRotateSpeed={globeConfig.autoRotateSpeed ?? 1}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
}
