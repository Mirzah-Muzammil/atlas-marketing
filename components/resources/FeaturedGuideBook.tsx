"use client";

import { useEffect, useRef, useState } from "react";

const guides = [
  "Should you actually study in the UK in 2026?",
  "Picking a city: London, but also nine others.",
  "The university shortlist methodology that works.",
  "Honest tuition + living cost numbers, no fluff.",
  "Funding: scholarships, loans, and what's realistic.",
  "The application: SOPs, LORs, transcripts, deadlines.",
  "Visa: every document, every deadline, every fee.",
  "Pre-departure: banking, SIM, insurance, the lot.",
  "Your first 7 days in the UK.",
  "Term 1: studying, friends, money, weather.",
  "Working while studying: the rules nobody reads.",
  "Graduate Route: the 24 months that decide everything.",
] as const;

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function FeaturedGuideBook() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(query.matches);

    updatePreference();
    query.addEventListener("change", updatePreference);

    return () => query.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setProgress(1);
      return;
    }

    let frame = 0;
    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollRange = Math.max(section.offsetHeight - window.innerHeight, 1);
      setProgress(clamp(-rect.top / scrollRange));
    };
    const requestUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateProgress);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [reducedMotion]);

  const slide = reducedMotion ? 1 : clamp((progress - 0.08) / 0.72);
  const bookX = 264 - 510 * slide;
  const pageX = 950 - 686 * slide;
  const bookExit = reducedMotion ? 1 : clamp((slide - 0.7) / 0.22);

  return (
    <section
      className="relative min-h-[240svh] border-t border-white/[.1]"
      data-featured-guide
      data-featured-guide-scroll-window="0.08:0.80"
      ref={sectionRef}
    >
      <div className="sticky top-0 flex min-h-svh items-center overflow-hidden px-5 py-14 sm:px-8">
        <div className="mx-auto w-full max-w-[1120px]" data-featured-guide-book-wrap>
          <svg
            aria-label="Featured guide book"
            className="h-auto w-full overflow-visible"
            role="img"
            viewBox="0 0 900 620"
          >
            <title>Featured guide book</title>
            <defs>
              <linearGradient id="atlas-guide-cover" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#9c3b12" />
                <stop offset=".5" stopColor="#55200d" />
                <stop offset="1" stopColor="#210a04" />
              </linearGradient>
              <linearGradient id="atlas-guide-paper" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#fff9e9" />
                <stop offset="1" stopColor="#e7dcc5" />
              </linearGradient>
              <filter id="atlas-guide-shadow" height="155%" width="160%" x="-30%" y="-25%">
                <feDropShadow dx="0" dy="25" floodOpacity=".4" stdDeviation="18" />
              </filter>
            </defs>

            <ellipse cx="451" cy="555" fill="#000" opacity={0.18 + slide * 0.08} rx={125 + slide * 170} ry={18 + slide * 8} />

            <g
              data-featured-guide-book-motion="exit"
              filter="url(#atlas-guide-shadow)"
              opacity={1 - bookExit}
              transform={`translate(${bookX - 264 - bookExit * 100} 0)`}
            >
              <rect fill="#190803" height="458" rx="6" width="382" x="264" y="59" />
              <rect fill="url(#atlas-guide-cover)" height="450" rx="3" width="372" x="269" y="63" />
              <path d="M290 63 H620 V513 H290 C282 513 276 507 276 499 V77 C276 69 282 63 290 63Z" fill="none" stroke="#ffd0a0" strokeOpacity=".36" />
              <path d="M292 63 V513" stroke="#e98c4e" strokeOpacity=".48" strokeWidth="6" />
              <path d="M600 63 V513" stroke="#180704" strokeOpacity=".36" strokeWidth="3" />
              <text fill="#ffd7ad" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="3" textAnchor="middle" x="455" y="158">ATLAS FIELD NOTES</text>
              <text fill="#fff3e3" fontFamily="var(--font-sans)" fontSize="31" fontWeight="600" textAnchor="middle" x="455" y="253">The UK move,</text>
              <text fill="#fff3e3" fontFamily="var(--font-sans)" fontSize="31" fontWeight="600" textAnchor="middle" x="455" y="294">chapter by chapter.</text>
              <path d="M395 345 H515" stroke="#ffbc7d" strokeOpacity=".55" />
              <text fill="#ffd7ad" fontFamily="var(--font-sans)" fontSize="13" textAnchor="middle" x="455" y="382">A practical Atlas guide</text>
              <path d="M437 513 H474 L468 550 L455 563 L442 550 Z" fill="#f35a02" />
            </g>

            <g opacity={slide} transform={`translate(${pageX - 366} ${16 * (1 - slide)})`}>
              <rect fill="#b5aa93" height="458" rx="3" width="382" x="366" y="59" />
              <rect fill="url(#atlas-guide-paper)" height="450" rx="2" width="372" x="371" y="63" />
              <path d="M401 63 V513" stroke="#d68666" strokeOpacity=".55" strokeWidth="1.5" />
              {[142, ...guides.map((_, index) => 173 + index * 27)].map((line) => (
                <path d={`M382 ${line} H730`} key={line} stroke="#8baec4" strokeOpacity=".3" strokeWidth="1" />
              ))}
              <text fill="#29231d" fontFamily="var(--font-sans)" fontSize="25" fontWeight="600" x="424" y="126">The guides ahead</text>

              {guides.map((guide, index) => {
                const y = 164 + index * 27;

                return (
                  <g key={guide} opacity={slide}>
                    <text fill="#c05a2c" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1.1" x="423" y={y}>{String(index + 1).padStart(2, "0")}</text>
                    <text fill="#352d25" fontFamily="var(--font-sans)" fontSize="10.3" fontWeight="600" x="457" y={y}>{guide}</text>
                  </g>
                );
              })}
              <text fill="#8e8170" fontFamily="var(--font-sans)" fontSize="10.5" x="424" y="497">Free resources for the decisions that follow.</text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
