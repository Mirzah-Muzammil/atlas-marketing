"use client";

import { useEffect, useRef } from "react";

const pointerQuery = "(pointer: fine) and (prefers-reduced-motion: no-preference)";
const pointCount = 12;

type RibbonPoint = { x: number; y: number };

export function HeroRibbonCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const landing = canvas?.closest<HTMLElement>(".landing-page");
    if (!canvas || !landing) return;

    const media = window.matchMedia(pointerQuery);
    let context: CanvasRenderingContext2D | null = null;
    const points: RibbonPoint[] = Array.from({ length: pointCount }, () => ({ x: 0, y: 0 }));
    const target = { x: 0, y: 0 };
    let frame = 0;
    let active = false;
    let listenersAttached = false;

    const resize = () => {
      if (!context) return;
      const width = Math.max(1, window.innerWidth);
      const height = Math.max(1, window.innerHeight);
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(scale, 0, 0, scale, 0, 0);
    };

    const draw = () => {
      if (!context) return;
      frame = 0;
      points[0].x += (target.x - points[0].x) * 0.62;
      points[0].y += (target.y - points[0].y) * 0.62;
      for (let index = 1; index < points.length; index += 1) {
        const follow = points[index - 1];
        const point = points[index];
        const ease = Math.max(0.16, 0.34 - index * 0.012);
        point.x += (follow.x - point.x) * ease;
        point.y += (follow.y - point.y) * ease;
      }

      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.lineCap = "round";
      context.lineJoin = "round";
      for (let index = points.length - 1; index > 0; index -= 1) {
        const progress = 1 - index / points.length;
        context.beginPath();
        context.moveTo(points[index].x, points[index].y);
        context.lineTo(points[index - 1].x, points[index - 1].y);
        context.strokeStyle = `rgb(23 26 20 / ${0.08 + progress * 0.24})`;
        context.lineWidth = 3 + progress * 18;
        context.stroke();
      }

      context.beginPath();
      context.arc(points[0].x, points[0].y, 12, 0, Math.PI * 2);
      context.fillStyle = "#9fe870";
      context.fill();

      const settled = points.every(
        (point) => Math.hypot(target.x - point.x, target.y - point.y) < 0.35,
      );
      if (active && !settled) frame = window.requestAnimationFrame(draw);
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      target.x = event.clientX;
      target.y = event.clientY;
      if (!active) {
        points.forEach((point) => {
          point.x = target.x;
          point.y = target.y;
        });
        active = true;
        canvas.dataset.active = "true";
      }
      if (!frame) frame = window.requestAnimationFrame(draw);
    };

    const leave = () => {
      active = false;
      canvas.removeAttribute("data-active");
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      context?.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };

    const attach = () => {
      if (listenersAttached) return;
      context ??= canvas.getContext("2d");
      if (!context) return;
      listenersAttached = true;
      landing.dataset.ribbonCursor = "ready";
      resize();
      landing.addEventListener("pointermove", move);
      landing.addEventListener("pointerleave", leave);
      window.addEventListener("resize", resize);
    };

    const detach = () => {
      if (!listenersAttached) return;
      listenersAttached = false;
      leave();
      landing.removeAttribute("data-ribbon-cursor");
      landing.removeEventListener("pointermove", move);
      landing.removeEventListener("pointerleave", leave);
      window.removeEventListener("resize", resize);
    };

    const sync = () => {
      if (media.matches) attach();
      else detach();
    };

    sync();
    media.addEventListener("change", sync);
    return () => {
      media.removeEventListener("change", sync);
      detach();
    };
  }, []);

  return <canvas aria-hidden="true" className="land-ribbon-cursor" ref={canvasRef} />;
}
