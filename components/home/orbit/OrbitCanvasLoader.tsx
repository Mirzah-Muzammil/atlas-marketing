"use client";

import dynamic from "next/dynamic";

const OrbitCanvas = dynamic(
  () => import("@/components/home/orbit/OrbitCanvas").then((module) => module.OrbitCanvas),
  { ssr: false },
);

export function OrbitCanvasLoader() {
  return <OrbitCanvas />;
}

