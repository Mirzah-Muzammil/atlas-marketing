"use client";

import { useState } from "react";

interface PremiumServiceMarqueeProps {
  services: string[];
}

export function PremiumServiceMarquee({ services }: PremiumServiceMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="premium-services__marquee-shell">
      <button
        type="button"
        className="premium-services__marquee-toggle"
        onClick={() => setIsPaused((paused) => !paused)}
      >
        <span aria-hidden="true">{isPaused ? "▶" : "Ⅱ"}</span>
        {isPaused ? "Play services" : "Pause services"}
      </button>
      <div
        data-premium-services-marquee
        data-paused={isPaused}
        className="premium-services__marquee"
        aria-label="Atlas services"
      >
        <div className="premium-services__marquee-track">
          {[...services, ...services].map((service, index) => (
            <span key={`${service}-${index}`} aria-hidden={index >= services.length}>
              {service}
              <b aria-hidden="true">✦</b>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
