export function ThreeMinuteVisual() {
  return (
    <svg
      aria-label="Three minutes. No card. A connected Atlas plan."
      className="block h-auto w-full overflow-visible"
      data-testid="three-minute-visual"
      fill="none"
      role="img"
      viewBox="0 0 540 228"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="#111114" height="228" rx="18" width="540" />
      <path d="M180 28v172M360 28v172" stroke="rgba(255,255,255,.1)" />

      <g className="three-minute-visual-scene" data-testid="three-minute-visual-scene">
        <circle cx="90" cy="97" r="43" stroke="rgba(255,255,255,.12)" strokeWidth="6" />
        <circle
          className="three-minute-timer-ring"
          cx="90"
          cy="97"
          pathLength="1"
          r="43"
          stroke="#f35a02"
          strokeDasharray="1"
          strokeLinecap="round"
          strokeWidth="6"
        />
        <path d="M90 71v27l18 11" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
        <text fill="rgba(255,255,255,.55)" fontFamily="ui-monospace, SFMono-Regular, monospace" fontSize="10" letterSpacing="1.4" textAnchor="middle" x="90" y="164">
          THREE MINUTES
        </text>
      </g>

      <g className="three-minute-visual-scene three-minute-visual-scene-delay-one" data-testid="three-minute-visual-scene">
        <rect fill="rgba(255,255,255,.055)" height="70" rx="10" stroke="rgba(255,255,255,.13)" width="108" x="216" y="61" />
        <path d="M234 83h37M234 98h23" stroke="rgba(255,255,255,.48)" strokeLinecap="round" strokeWidth="5" />
        <circle cx="297" cy="97" fill="rgba(255,255,255,.18)" r="12" />
        <path className="three-minute-card-strike" d="m228 71 85 51" stroke="#f35a02" strokeLinecap="round" strokeWidth="6" />
        <text fill="rgba(255,255,255,.55)" fontFamily="ui-monospace, SFMono-Regular, monospace" fontSize="10" letterSpacing="1.4" textAnchor="middle" x="270" y="164">
          NO CARD
        </text>
      </g>

      <g className="three-minute-visual-scene three-minute-visual-scene-delay-two" data-testid="three-minute-visual-scene">
        <path className="three-minute-route-line" d="M394 110c18-39 46-39 67 0 14 25 35 25 54-6" pathLength="1" stroke="rgba(255,255,255,.25)" strokeLinecap="round" strokeWidth="4" />
        <circle cx="394" cy="110" fill="#f35a02" r="8" />
        <circle cx="461" cy="110" fill="#f35a02" r="8" />
        <circle cx="515" cy="104" fill="#f35a02" r="8" />
        <path d="m506 104 6 6 12-15" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        <text fill="rgba(255,255,255,.55)" fontFamily="ui-monospace, SFMono-Regular, monospace" fontSize="10" letterSpacing="1.4" textAnchor="middle" x="450" y="164">
          YOUR ATLAS
        </text>
      </g>
    </svg>
  );
}
