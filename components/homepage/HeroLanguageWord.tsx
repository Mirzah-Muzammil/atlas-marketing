"use client";

import { useEffect, useState } from "react";

const translations = [
  "abroad",
  "विदेश",
  "வெளிநாடு",
  "విదేశం",
  "വിദേശം",
  "ವಿದೇಶ",
  "বিদেশ",
] as const;

type Phase = "holding" | "deleting" | "typing";

export function HeroLanguageWord() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCharacters, setVisibleCharacters] = useState(
    Array.from(translations[0]).length,
  );
  const [phase, setPhase] = useState<Phase>("holding");
  const activeWord = translations[activeIndex];
  const characters = Array.from(activeWord);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const delay =
      phase === "holding" ? 1450 : phase === "deleting" ? 42 : 78;
    const timeout = window.setTimeout(() => {
      if (phase === "holding") {
        setPhase("deleting");
        return;
      }

      if (phase === "deleting") {
        if (visibleCharacters > 0) {
          setVisibleCharacters((count) => count - 1);
          return;
        }

        setActiveIndex((index) => (index + 1) % translations.length);
        setPhase("typing");
        return;
      }

      if (visibleCharacters < characters.length) {
        setVisibleCharacters((count) => count + 1);
        return;
      }

      setPhase("holding");
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [characters.length, phase, visibleCharacters]);

  return (
    <span
      className="inline-flex min-w-[7ch] items-baseline text-left text-[#f35a02]"
      data-hero-abroad-accent
      data-hero-language-word
      data-language-count={translations.length}
    >
      {characters.slice(0, visibleCharacters).join("")}
      <span
        aria-hidden="true"
        className="hero-language-cursor"
        data-hero-language-cursor
      />
    </span>
  );
}
