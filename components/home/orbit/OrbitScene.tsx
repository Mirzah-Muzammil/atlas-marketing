"use client";

import { Float, Line, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

const points: [number, number, number][] = [[-4, -1.8, 0], [-2.2, 1.3, -0.4], [0, -0.2, 0.3], [2.2, 1.5, -0.2], [4.2, -0.8, 0.2]];

export function OrbitScene() {
  const route = useRef<Group>(null);

  useFrame((state) => {
    if (!route.current) return;
    const scroll = window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1);
    route.current.rotation.z = scroll * 0.38;
    route.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.12;
    state.camera.position.x += ((state.pointer.x * 0.35) - state.camera.position.x) * 0.025;
    state.camera.position.y += ((state.pointer.y * 0.25) - state.camera.position.y) * 0.025;
  });

  return (
    <group ref={route}>
      <Stars count={620} depth={22} factor={2.2} fade radius={12} speed={0.25} />
      <Line color="#8ab4ff" lineWidth={1.3} opacity={0.52} points={points} transparent />
      {points.map((point, index) => (
        <Float floatIntensity={index === 2 ? 1.1 : 0.55} rotationIntensity={0.35} speed={1 + index * 0.08} key={point.join("-")}>
          <mesh position={point}>
            <icosahedronGeometry args={[index === 2 ? 0.56 : 0.28, 1]} />
            <meshStandardMaterial color={index === 4 ? "#ff6b2c" : "#1457e6"} emissive={index === 4 ? "#ff6b2c" : "#1457e6"} emissiveIntensity={0.8} roughness={0.28} />
          </mesh>
        </Float>
      ))}
      <ambientLight intensity={0.45} /><pointLight color="#8ab4ff" intensity={18} position={[0, 2, 5]} />
    </group>
  );
}

