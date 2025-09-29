import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture, Line } from "@react-three/drei";
import * as THREE from "three";

/** Types */
interface Point {
  startLat: number;
  startLon: number;
  endLat: number;
  endLon: number;
}

interface GlobeMeshProps {
  radius: number;
  textureUrl: string;
}

interface LinesProps {
  points: Point[];
  radius: number;
  colors?: string[];
  dashSpeed?: number;
  dotSpeed?: number;
  dotCountPerArc?: number;
}

/** Helpers */
const latLongToVector3 = (
  lat: number,
  lon: number,
  radius: number
): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
};

/** Rotating globe */
function GlobeMesh({ radius, textureUrl }: GlobeMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(textureUrl);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

/** One animated arc */
function AnimatedArc({
  start,
  end,
  color = "white",
  radius,
  dashSpeed = 0.6,
  dotSpeed = 0.25,
  dotCountPerArc = 2,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color?: string;
  radius: number;
  dashSpeed?: number;
  dotSpeed?: number;
  dotCountPerArc?: number;
}) {
  const curve = useMemo(() => {
    return new THREE.CubicBezierCurve3(
      start,
      start.clone().multiplyScalar(1.3),
      end.clone().multiplyScalar(1.3),
      end
    );
  }, [start, end]);

  const points = useMemo(() => curve.getPoints(150), [curve]);

  // Flowing dashed line
  const lineRef = useRef<any>(null);
  useFrame((_, delta) => {
    if (lineRef.current?.material && lineRef.current.material.dashed) {
      lineRef.current.material.dashOffset -= delta * dashSpeed;
    }
  });

  // Traveling dots
  const dotMeshes = useMemo(
    () =>
      new Array(dotCountPerArc).fill(0).map((_, i) => ({
        ref: React.createRef<THREE.Mesh>(),
        offset: (i / dotCountPerArc) % 1,
      })),
    [dotCountPerArc]
  );

  useFrame((state) => {
    const tBase = (state.clock.getElapsedTime() * dotSpeed) % 1;
    dotMeshes.forEach(({ ref, offset }) => {
      const t = (tBase + offset) % 1;
      const pos = curve.getPointAt(t);
      ref.current?.position.copy(pos);
      ref.current?.scale.setScalar(0.025 * radius);
    });
  });

  return (
    <group>
      <Line
        ref={lineRef}
        points={points}
        color={color}
        lineWidth={1.5}
        dashed
        dashScale={1}
        dashSize={0.2}
        gapSize={0.16}
      />
      {dotMeshes.map(({ ref }, i) => (
        <mesh ref={ref} key={i}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
}

/** Lines wrapper */
function Lines({
  points,
  radius,
  colors = ["#ffffff", "#00ffd0", "#ff8a00", "#7aa2ff", "#ff66c4"],
  dashSpeed = 0.7,
  dotSpeed = 0.35,
  dotCountPerArc = 2,
}: LinesProps) {
  return (
    <group>
      {points.map((p, i) => {
        const start = latLongToVector3(p.startLat, p.startLon, radius);
        const end = latLongToVector3(p.endLat, p.endLon, radius);
        const color = colors[i % colors.length];
        return (
          <AnimatedArc
            key={i}
            start={start}
            end={end}
            color={color}
            radius={radius}
            dashSpeed={dashSpeed}
            dotSpeed={dotSpeed}
            dotCountPerArc={dotCountPerArc}
          />
        );
      })}
    </group>
  );
}

/** Main component */
export default function SimpleGlobe() {
  const globeRadius = 3.2;

  // Expanded routes list (30+)
  // Québec City → USA, France, Germany, Algeria, South Africa, China, Japan, Russia, Argentina, Brazil
  const points: Point[] = [
    // USA (New York City)
    { startLat: 46.8139, startLon: -71.208, endLat: 40.7128, endLon: -74.006 },

    // France (Paris)
    { startLat: 46.8139, startLon: -71.208, endLat: 48.8566, endLon: 2.3522 },

    // Germany (Berlin)
    { startLat: 46.8139, startLon: -71.208, endLat: 52.52, endLon: 13.405 },

    // Algeria (Algiers)
    {
      startLat: 46.8139,
      startLon: -71.208,
      endLat: 28.434883,
      endLon: 5.014139,
    },
      {
      startLat: 46.8139,
      startLon: -71.208,
      endLat: 67.125155,
      endLon: -598.747897,
    },


    // South Africa (Johannesburg)
    { startLat: 46.8139, startLon: -71.208, endLat: -26.2041, endLon: 28.0473 },
     { startLat: 46.8139, startLon: -71.208, endLat:82.650330, endLon:-73.672977 },

    // China (Beijing)
    { startLat: 46.8139, startLon: -71.208, endLat: 39.9042, endLon: 116.4074 },

    // Japan (Tokyo)
    { startLat: 46.8139, startLon: -71.208, endLat: 35.6895, endLon: 139.6917 },

    // Russia (Moscow)
    { startLat: 46.8139, startLon: -71.208, endLat: 55.7558, endLon: 37.6176 },

    // Argentina (Buenos Aires)
    {
      startLat: 46.8139,
      startLon: -71.208,
      endLat: -34.6037,
      endLon: -58.3816,
    },

    // Brazil (São Paulo)
    {
      startLat: 46.8139,
      startLon: -71.208,
      endLat: -23.5505,
      endLon: -46.6333,
    },
  ];

  // OPTIONAL: generate many random routes for a dense effect
  // const points = useMemo(() => {
  //   const rand = (min: number, max: number) => Math.random() * (max - min) + min;
  //   const n = 150;
  //   return Array.from({ length: n }, () => ({
  //     startLat: rand(-70, 70),
  //     startLon: rand(-180, 180),
  //     endLat: rand(-70, 70),
  //     endLon: rand(-180, 180),
  //   }));
  // }, []);

  return (
    <Canvas camera={{ position: [0, 0, 6.5], fov: 70 }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} />
      <GlobeMesh radius={globeRadius} textureUrl="/textures/earth3.jpg" />
      <Lines
        points={points}
        radius={globeRadius}
        colors={["#ffffff", "#00ffd0", "#ff8a00", "#7aa2ff", "#ff66c4"]}
        dashSpeed={0.8}
        dotSpeed={0.4}
        dotCountPerArc={2}
      />
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        enablePan={false}
        enableZoom={false}
      />
    </Canvas>
  );
}
