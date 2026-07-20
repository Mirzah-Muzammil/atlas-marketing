"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

import { CanvasErrorBoundary } from "@/components/home/orbit/CanvasErrorBoundary";
import { OrbitScene } from "@/components/home/orbit/OrbitScene";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function OrbitCanvas() {
  const container = useRef<HTMLDivElement>(null);
  const [canRender, setCanRender] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setCanRender(false);
      return;
    }
    try {
      const probe = document.createElement("canvas");
      const context = probe.getContext("webgl2") ?? probe.getContext("webgl");
      setCanRender(Boolean(context));
    } catch {
      setCanRender(false);
    }
  }, [reducedMotion]);

  useEffect(() => {
    if (!container.current || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { rootMargin: "200px" });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  return <div aria-hidden="true" className="absolute inset-0" ref={container}>{canRender && <CanvasErrorBoundary><Canvas camera={{ fov: 48, position: [0, 0, 8.5] }} dpr={[1, 1.5]} frameloop={isVisible ? "always" : "never"} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}><OrbitScene /></Canvas></CanvasErrorBoundary>}</div>;
}
