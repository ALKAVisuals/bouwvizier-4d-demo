"use client";

import { Canvas } from "@react-three/fiber";
import { Edges, Grid, OrbitControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import type { BuildingPart, BuildingPhase } from "@/lib/types";
import { partStatusAtDate, statusColors } from "./status";

function Scene({ parts, currentDate, enabledPhases, selectedPartId, onSelect, resetSignal }: {
  parts: BuildingPart[];
  currentDate: Date;
  enabledPhases: Set<BuildingPhase>;
  selectedPartId: string | null;
  onSelect: (id: string) => void;
  resetSignal: number;
}) {
  const controls = useRef<any>(null);
  useEffect(() => controls.current?.reset(), [resetSignal]);

  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight position={[10, 14, 8]} intensity={2.2} castShadow />
      <directionalLight position={[-8, 6, -10]} intensity={0.6} />
      <group position={[0, -1.15, 0]}>
        {parts.map((part) => {
          if (!enabledPhases.has(part.phase)) return null;
          const status = partStatusAtDate(part, currentDate);
          const selected = selectedPartId === part.id;
          const opacity = status === "Niet gestart" ? 0.18 : part.id === "walls-inner" || part.id === "finish" ? 0.12 : part.id === "installations" ? 0.6 : 0.86;
          return (
            <mesh
              key={part.id}
              position={part.position}
              scale={part.scale}
              rotation={part.rotation ?? [0, 0, 0]}
              onClick={(event) => { event.stopPropagation(); onSelect(part.id); }}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial
                color={statusColors[status]}
                transparent
                opacity={selected ? Math.min(1, opacity + .12) : opacity}
                roughness={0.72}
                metalness={part.phase === "Ruwbouw" ? 0.18 : 0.03}
                emissive={selected ? "#f1b961" : "#000000"}
                emissiveIntensity={selected ? 0.45 : 0}
                wireframe={part.id === "installations"}
                depthWrite={opacity > 0.2}
              />
              <Edges color={selected ? "#15191c" : "#5e686e"} threshold={15} />
            </mesh>
          );
        })}
      </group>
      <Grid position={[0, -1.42, 0]} args={[30, 30]} cellSize={1} cellThickness={0.5} cellColor="#aeb6ba" sectionSize={5} sectionThickness={1} sectionColor="#7c878d" fadeDistance={35} infiniteGrid />
      <OrbitControls ref={controls} makeDefault minDistance={8} maxDistance={28} maxPolarAngle={Math.PI / 2.05} target={[0, 1.2, 0]} />
    </>
  );
}

export function BuildingViewer(props: Parameters<typeof Scene>[0]) {
  return (
    <Canvas camera={{ position: [12, 10, 14], fov: 43 }} dpr={[1, 1.8]} shadows onPointerMissed={() => props.onSelect("")}>
      <color attach="background" args={["#edf0ef"]} />
      <fog attach="fog" args={["#edf0ef", 25, 42]} />
      <Scene {...props} />
    </Canvas>
  );
}
