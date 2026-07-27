"use client";

import type { RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  FRAME_SEQUENCE,
  framePath,
  getCoverDrawRect,
} from "@/components/landing-2/frame-sequence";

const LOAD_RADIUS = 8;
const MAX_CONCURRENT_LOADS = 4;
const MAX_DECODED_FRAMES = 28;

interface FrameSequenceOptions {
  reducedMotion: boolean;
}

export function useFrameSequenceCanvas(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  { reducedMotion }: FrameSequenceOptions,
) {
  const [ready, setReady] = useState(false);
  const cacheRef = useRef(new Map<number, HTMLImageElement>());
  const queueRef = useRef<number[]>([]);
  const pendingRef = useRef(new Set<number>());
  const activeLoadsRef = useRef(0);
  const desiredFrameRef = useRef(0);
  const drawnFrameRef = useRef(-1);
  const mountedRef = useRef(false);
  const pumpQueueRef = useRef<() => void>(() => undefined);

  const drawCachedFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const image = cacheRef.current.get(index);
      if (!canvas || !image) return false;

      const context = canvas.getContext("2d");
      const cssWidth = canvas.clientWidth;
      const cssHeight = canvas.clientHeight;
      if (!context || cssWidth <= 0 || cssHeight <= 0) return false;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.round(cssWidth * pixelRatio));
      const height = Math.max(1, Math.round(cssHeight * pixelRatio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      const rect = getCoverDrawRect(
        FRAME_SEQUENCE.width,
        FRAME_SEQUENCE.height,
        width,
        height,
      );
      context.clearRect(0, 0, width, height);
      context.drawImage(image, rect.x, rect.y, rect.width, rect.height);
      canvas.dataset.frameIndex = String(index);
      drawnFrameRef.current = index;
      setReady(true);
      return true;
    },
    [canvasRef],
  );

  const trimCache = useCallback(() => {
    while (cacheRef.current.size > MAX_DECODED_FRAMES) {
      const removable = cacheRef.current.keys().find(
        (index) => index !== 0 && index !== desiredFrameRef.current,
      );
      if (removable === undefined) return;
      cacheRef.current.delete(removable);
    }
  }, []);

  pumpQueueRef.current = () => {
    while (
      mountedRef.current &&
      activeLoadsRef.current < MAX_CONCURRENT_LOADS &&
      queueRef.current.length > 0
    ) {
      const index = queueRef.current.shift();
      if (
        index === undefined ||
        cacheRef.current.has(index) ||
        pendingRef.current.has(index)
      ) {
        continue;
      }

      activeLoadsRef.current += 1;
      pendingRef.current.add(index);
      const image = new Image();
      image.decoding = "async";

      const settle = () => {
        activeLoadsRef.current -= 1;
        pendingRef.current.delete(index);
        pumpQueueRef.current();
      };

      image.onload = () => {
        if (!mountedRef.current) return settle();
        cacheRef.current.delete(index);
        cacheRef.current.set(index, image);
        trimCache();
        if (index === desiredFrameRef.current || drawnFrameRef.current < 0) {
          drawCachedFrame(index);
        }
        settle();
      };
      image.onerror = settle;
      image.src = framePath(index);
    }
  };

  const renderFrame = useCallback(
    (requestedIndex: number) => {
      const index = reducedMotion
        ? 0
        : Math.min(
            FRAME_SEQUENCE.count - 1,
            Math.max(0, Math.round(requestedIndex)),
          );
      desiredFrameRef.current = index;

      if (drawCachedFrame(index)) return;

      const priority: number[] = [index];
      for (let offset = 1; offset <= LOAD_RADIUS; offset += 1) {
        if (index + offset < FRAME_SEQUENCE.count) priority.push(index + offset);
        if (index - offset >= 0) priority.push(index - offset);
      }
      queueRef.current = priority.filter(
        (candidate) =>
          !cacheRef.current.has(candidate) && !pendingRef.current.has(candidate),
      );
      pumpQueueRef.current();
    },
    [drawCachedFrame, reducedMotion],
  );

  useEffect(() => {
    mountedRef.current = true;
    renderFrame(0);
    const pendingFrames = pendingRef.current;
    const cachedFrames = cacheRef.current;

    const canvas = canvasRef.current;
    const observer =
      canvas && "ResizeObserver" in window
        ? new ResizeObserver(() => {
            const index = drawnFrameRef.current >= 0 ? drawnFrameRef.current : 0;
            drawCachedFrame(index);
          })
        : undefined;
    if (canvas) observer?.observe(canvas);

    return () => {
      mountedRef.current = false;
      observer?.disconnect();
      queueRef.current = [];
      pendingFrames.clear();
      cachedFrames.clear();
    };
  }, [canvasRef, drawCachedFrame, renderFrame]);

  return { ready, renderFrame };
}
