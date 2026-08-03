"use client";

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

export type AuroraBackgroundProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  children?: ReactNode;
  gradientColors?: readonly [string, string];
  pulseDuration?: number;
  starCount?: number;
};

const defaultGradientColors = [
  "var(--aurora-color1, rgba(243,90,2,0.22))",
  "var(--aurora-color2, rgba(255,177,94,0.16))",
] as const;

function isBrightStar(index: number) {
  return index % 5 === 0;
}

function starStyle(index: number): CSSProperties {
  const bright = isBrightStar(index);

  return {
    left: `${(index * 37 + 13) % 100}%`,
    top: `${(index * 61 + 19) % 100}%`,
    animationDelay: `${-((index % 11) * 0.47)}s`,
    animationDuration: `${2.8 + (index % 6) * 0.42}s`,
    "--aurora-star-dim": bright ? "0.28" : "0.1",
    "--aurora-star-bright": bright ? "0.96" : "0.58",
    "--aurora-star-size": bright ? "2px" : "1px",
    "--aurora-star-scale": bright ? "1.45" : "1.18",
  } as CSSProperties;
}

export default function AuroraBackground({
  children,
  className,
  gradientColors = defaultGradientColors,
  pulseDuration = 8,
  starCount = 80,
  style,
  ...props
}: AuroraBackgroundProps) {
  const [primaryColor, secondaryColor] = gradientColors;
  const stars = Array.from({ length: Math.max(0, Math.floor(starCount)) });
  const auroraStyle = {
    "--aurora-color-1": primaryColor,
    "--aurora-color-2": secondaryColor,
    "--aurora-duration": `${pulseDuration}s`,
    ...style,
  } as CSSProperties;

  return (
    <div
      {...props}
      className={cn("aurora-background relative isolate overflow-hidden", className)}
      data-testid="aurora-background"
      style={auroraStyle}
    >
      <div aria-hidden="true" className="absolute inset-0" data-aurora-sky>
        <div className="aurora-light aurora-light-primary absolute -inset-[35%]" />
        <div className="aurora-light aurora-light-secondary absolute -inset-[35%]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,transparent_0%,rgba(5,5,6,.3)_58%,rgba(5,5,6,.9)_100%)]" />
        {stars.map((_, index) => (
          <span
            className="aurora-star absolute rounded-full bg-white"
            data-aurora-star-tier={isBrightStar(index) ? "bright" : "ambient"}
            data-testid="aurora-star"
            key={index}
            style={starStyle(index)}
          />
        ))}
      </div>
      {children ? <div className="relative z-10">{children}</div> : null}
    </div>
  );
}
