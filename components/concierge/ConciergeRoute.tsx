const conciergeSteps = [
  {
    label: "Choose a task",
    description: "Hand over your application, visa, or arrival setup.",
  },
  {
    label: "Agree your fixed quote",
    description: "Know the scope and cost before a specialist starts.",
  },
  {
    label: "Review and approve",
    description: "Nothing is submitted until you have signed off.",
  },
] as const;

type ConciergeRouteStep = {
  label: string;
  description: string;
};

type ConciergeRouteProps = {
  ariaLabel?: string;
  steps?: readonly ConciergeRouteStep[];
  variant?: "concierge" | "journey";
};

const conciergeRoutePath =
  "M64 82C152 30 226 96 293 164c68 69 143 58 203 10 31-25 42-39 54-48";

function ConciergeCar() {
  return (
    <g filter="url(#concierge-route-glow)">
      <path
        d="M-19 4h38a4 4 0 0 1 4 4v4H-23V8a4 4 0 0 1 4-4Z"
        fill="#f35a02"
      />
      <path d="m-12 4 6-10H8l10 10Z" fill="#ffb27f" />
      <path d="m-5 2 2-5h8l5 5Z" fill="#2a1710" />
      <circle cx="-12" cy="12" fill="#050506" r="5" />
      <circle cx="12" cy="12" fill="#050506" r="5" />
      <circle cx="-12" cy="12" fill="#fff7ed" r="1.5" />
      <circle cx="12" cy="12" fill="#fff7ed" r="1.5" />
    </g>
  );
}

export function ConciergeRoute({
  ariaLabel = "How Atlas Concierge works",
  steps = conciergeSteps,
  variant = "concierge",
}: ConciergeRouteProps) {
  return (
    <div
      aria-label={ariaLabel}
      className="concierge-route relative mx-auto w-full max-w-[600px]"
      data-concierge-route
      data-how-it-works-route={variant === "journey" ? "" : undefined}
    >
      <svg
        aria-hidden="true"
        className="h-auto w-full overflow-visible"
        viewBox="0 0 600 460"
      >
        <defs>
          <filter id="concierge-route-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          className="concierge-route-road"
          d={conciergeRoutePath}
        />
        <path
          className="concierge-route-road-dashes"
          d={conciergeRoutePath}
        />
        <circle className="concierge-route-stop concierge-route-stop-one" cx="64" cy="82" r="16" />
        <circle className="concierge-route-stop concierge-route-stop-two" cx="293" cy="164" r="16" />
        <circle className="concierge-route-stop concierge-route-stop-three" cx="550" cy="126" r="16" />

        <g className="concierge-route-car-motion" data-concierge-car>
          <animateMotion
            dur="15s"
            path={conciergeRoutePath}
            repeatCount="indefinite"
            rotate="auto"
          />
          <ConciergeCar />
        </g>
        <g
          className="concierge-route-car-static"
          transform="translate(550 126) rotate(-37)"
        >
          <ConciergeCar />
        </g>
      </svg>

      <ol className="pointer-events-none absolute inset-0 m-0 list-none p-0">
        {steps.map((step, index) => (
          <li
            className={`concierge-route-step concierge-route-step-${index + 1}`}
            data-concierge-route-step={index + 1}
            key={step.label}
          >
            <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f35a02]">
              0{index + 1}
            </span>
            <strong className="block text-sm font-medium tracking-[-0.02em] text-white sm:text-base">
              {step.label}
            </strong>
            <span className="mt-1.5 block max-w-[18ch] text-xs leading-5 text-white/48 sm:text-[13px]">
              {step.description}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
