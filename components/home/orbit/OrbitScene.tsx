"use client";

import { Float, Line, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { Group } from "three";

import { useOrbitStory } from "@/components/home/orbit/OrbitStory";

const points: [number, number, number][] = [[-4.4, -1.8, 0], [-2.8, 1.2, -0.4], [-1, -0.3, 0.3], [0.8, 1.5, -0.2], [2.7, 0.4, 0.15], [4.4, -1.1, 0.2]];

export function OrbitScene() {
  const route = useRef<Group>(null);
  const { activeScene, progress } = useOrbitStory();
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);

  useEffect(() => {
    const updateVisibility = () => setIsDocumentVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useFrame((state) => {
    if (!route.current || !isDocumentVisible) return;
    const targetX = (activeScene - 1.5) * 0.32 + state.pointer.x * 0.28;
    const targetY = state.pointer.y * 0.2 - progress * 0.24;
    route.current.rotation.z += ((progress * 0.52) - route.current.rotation.z) * 0.035;
    route.current.rotation.y += ((Math.sin(state.clock.elapsedTime * 0.12) * 0.1) - route.current.rotation.y) * 0.03;
    state.camera.position.x += (targetX - state.camera.position.x) * 0.035;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.035;
    state.camera.position.z += ((8.5 - progress * 0.72) - state.camera.position.z) * 0.035;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={route}>
      <Stars count={620} depth={22} factor={2.2} fade radius={12} speed={0.25} />
      <Line color="#8ab4ff" lineWidth={1.3} opacity={0.52} points={points} transparent />
      {points.map((point, index) => (
        <Float floatIntensity={index === 2 ? 1.1 : 0.55} rotationIntensity={0.35} speed={1 + index * 0.08} key={point.join("-")}>
          <mesh position={point}>
            <icosahedronGeometry args={[index === 2 ? 0.56 : 0.28, 1]} />
            <meshStandardMaterial color={index === points.length - 1 ? "#c84712" : "#1457e6"} emissive={index === points.length - 1 ? "#c84712" : "#1457e6"} emissiveIntensity={0.8} roughness={0.28} />
          </mesh>
        </Float>
      ))}
      <ambientLight intensity={0.45} /><pointLight color="#8ab4ff" intensity={18} position={[0, 2, 5]} />
    </group>
  );
}
