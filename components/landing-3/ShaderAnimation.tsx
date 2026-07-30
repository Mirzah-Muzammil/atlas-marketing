"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export const SHADER_ANIMATION_MODE = "continuous-slow";
export const SHADER_COLOR_INTENSITY = 0.22;
export const SHADER_COLOR_CAP = 0.38;
const SHADER_TIME_STEP = 0.025;

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.05;
        float lineWidth = 0.002;

        vec3 color = vec3(0.0);
        for (int j = 0; j < 3; j++) {
          for (int i = 0; i < 5; i++) {
            color[j] += lineWidth * float(i * i) / abs(fract(t - 0.01 * float(j) + float(i) * 0.01) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.2));
          }
        }

        color *= ${SHADER_COLOR_INTENSITY.toFixed(2)};
        color = min(color, vec3(${SHADER_COLOR_CAP.toFixed(2)}));
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    let animationId = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let geometry: THREE.PlaneGeometry | null = null;
    let material: THREE.ShaderMaterial | null = null;

    try {
      const camera = new THREE.Camera();
      camera.position.z = 1;

      const scene = new THREE.Scene();
      const activeGeometry = new THREE.PlaneGeometry(2, 2);
      geometry = activeGeometry;
      const uniforms = {
        time: { value: 1 },
        resolution: { value: new THREE.Vector2() },
      };
      const activeMaterial = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
      });
      material = activeMaterial;
      scene.add(new THREE.Mesh(activeGeometry, activeMaterial));

      const activeRenderer = new THREE.WebGLRenderer({ antialias: true });
      renderer = activeRenderer;
      activeRenderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, 2),
      );
      activeRenderer.domElement.setAttribute("aria-hidden", "true");
      activeRenderer.domElement.style.display = "block";
      container.appendChild(activeRenderer.domElement);

      const resize = () => {
        activeRenderer.setSize(container.clientWidth, container.clientHeight);
        uniforms.resolution.value.x = activeRenderer.domElement.width;
        uniforms.resolution.value.y = activeRenderer.domElement.height;
      };

      resize();
      window.addEventListener("resize", resize);

      const renderFrame = () => activeRenderer.render(scene, camera);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        renderFrame();
      } else {
        const animate = () => {
          uniforms.time.value += SHADER_TIME_STEP;
          renderFrame();
          animationId = requestAnimationFrame(animate);
        };

        animate();
      }

      return () => {
        window.removeEventListener("resize", resize);
        if (animationId) cancelAnimationFrame(animationId);
        if (activeRenderer.domElement.parentNode === container) {
          container.removeChild(activeRenderer.domElement);
        }
        activeRenderer.dispose();
        activeGeometry.dispose();
        activeMaterial.dispose();
      };
    } catch {
      if (renderer?.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer?.dispose();
      geometry?.dispose();
      material?.dispose();
    }
  }, []);

  return (
    <div
      className="h-full w-full bg-[radial-gradient(circle_at_50%_45%,#3f1a73_0%,#12091e_46%,#050506_76%)]"
      data-animation-mode={SHADER_ANIMATION_MODE}
      data-brightness="reduced"
      data-testid="landing-3-shader"
      ref={containerRef}
    />
  );
}
