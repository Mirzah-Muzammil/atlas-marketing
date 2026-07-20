export function DispatchConnectorArtwork() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-[-12vw] bottom-4 top-0 hidden text-dispatch-ink/48 lg:block"
      data-editorial-connectors
    >
      <svg
        className="h-full w-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 1600 430"
      >
        <path
          d="M0 235H152c26 0 35-17 35-38v-26c0-20 9-37 34-37h210c30 0 38 21 38 43v15c0 25 12 42 42 42h92"
          data-dispatch-draw-step="0"
          data-editorial-connector
          pathLength="1"
          stroke="currentColor"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M1600 179h-163c-29 0-39 20-39 43v18c0 24-11 43-43 43h-213"
          data-dispatch-draw-step="1"
          data-editorial-connector
          pathLength="1"
          stroke="currentColor"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M165 235c10-20 20-20 30 0s20 20 30 0 20-20 30 0 20 20 30 0 20-20 30 0 20 20 30 0"
          data-dispatch-draw-step="2"
          data-editorial-coil
          pathLength="1"
          stroke="currentColor"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M1268 283c10-20 20-20 30 0s20 20 30 0 20-20 30 0 20 20 30 0 20-20 30 0"
          data-dispatch-draw-step="3"
          data-editorial-coil
          pathLength="1"
          stroke="currentColor"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
        <circle cx="60" cy="235" data-dispatch-connector-node fill="currentColor" r="4" />
        <circle cx="1540" cy="179" data-dispatch-connector-node fill="currentColor" r="4" />
        <circle
          cx="484"
          cy="134"
          data-dispatch-connector-node
          fill="var(--color-dispatch-canvas)"
          r="8"
          stroke="currentColor"
        />
        <circle
          cx="1398"
          cy="222"
          data-dispatch-connector-node
          fill="var(--color-dispatch-canvas)"
          r="8"
          stroke="currentColor"
        />
      </svg>
    </div>
  );
}
