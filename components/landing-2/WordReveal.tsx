import { createElement, Fragment } from "react";
import type { CSSProperties, ElementType } from "react";

type WordRevealProps = {
  as?: ElementType;
  children: string;
  className?: string;
  end?: number;
  start?: number;
};

type WordStyle = CSSProperties & {
  "--word-gain": number;
  "--word-start": number;
};

const formatTiming = (value: number) => Number(value.toFixed(3));

export function WordReveal({
  as: Tag = "span",
  children,
  className,
  end = 0.5,
  start = 0.12,
}: WordRevealProps) {
  const words = children.trim().split(/\s+/);
  const timingSpan = Math.max(end - start, 0);
  const revealDuration = Math.min(0.22, Math.max(0.08, timingSpan * 0.55));
  const lastWordStart = Math.max(start, end - revealDuration);
  const staggerSpan = lastWordStart - start;

  return createElement(
    Tag,
    {
      "aria-label": children,
      className: ["cine-word-reveal", className].filter(Boolean).join(" "),
    },
    words.map((word, index) => {
        const amount = words.length > 1 ? index / (words.length - 1) : 0;
        const wordStart = formatTiming(start + staggerSpan * amount);
        const style = {
          "--word-gain": Number((1 / revealDuration).toFixed(4)),
          "--word-start": wordStart,
        } as WordStyle;

        return (
          <Fragment key={`${word}-${index}`}>
            <span
              aria-hidden="true"
              className="cine-word-mask"
              style={style}
            >
              <span className="cine-word">{word}</span>
            </span>
            {index < words.length - 1 ? " " : null}
          </Fragment>
        );
      }),
  );
}
