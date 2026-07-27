export const FRAME_SEQUENCE = {
  count: 379,
  width: 1280,
  height: 720,
  directory: "/images/landing-2/sequence",
} as const;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function framePath(index: number) {
  const boundedIndex = clamp(Math.round(index), 0, FRAME_SEQUENCE.count - 1);
  return `${FRAME_SEQUENCE.directory}/frame-${String(boundedIndex + 1).padStart(4, "0")}.webp`;
}

export function progressToFrameIndex(progress: number) {
  return Math.round(clamp(progress, 0, 1) * (FRAME_SEQUENCE.count - 1));
}

export function getCoverDrawRect(
  sourceWidth: number,
  sourceHeight: number,
  targetWidth: number,
  targetHeight: number,
) {
  const scale = Math.max(targetWidth / sourceWidth, targetHeight / sourceHeight);
  const width = sourceWidth * scale;
  const height = sourceHeight * scale;

  return {
    x: (targetWidth - width) / 2,
    y: (targetHeight - height) / 2,
    width,
    height,
  };
}
