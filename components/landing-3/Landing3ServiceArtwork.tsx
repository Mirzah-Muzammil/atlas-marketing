export type ServiceVisualKey =
  | "shortlist"
  | "application"
  | "visa"
  | "loan"
  | "scholarship"
  | "airport"
  | "checklist"
  | "stay"
  | "orientation"
  | "welcome"
  | "homes"
  | "bank"
  | "mobile"
  | "health"
  | "forex"
  | "jobs"
  | "career"
  | "community"
  | "experiences"
  | "alumni";

type ArtworkProps = {
  index: number;
  visual: ServiceVisualKey;
};

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 2,
};

function ArtworkScene({ visual }: Pick<ArtworkProps, "visual">) {
  switch (visual) {
    case "shortlist":
      return (
        <>
          <circle cx="160" cy="124" r="70" {...strokeProps} opacity=".24" />
          <circle cx="160" cy="124" r="48" {...strokeProps} opacity=".56" />
          <path d="m119 143 26 25 58-68" {...strokeProps} strokeWidth="5" />
          <circle cx="103" cy="73" r="9" fill="var(--service-accent)" />
          <circle cx="224" cy="154" r="6" fill="currentColor" opacity=".75" />
        </>
      );
    case "application":
      return (
        <>
          <rect x="84" y="50" width="142" height="164" rx="14" fill="currentColor" opacity=".07" />
          <rect x="98" y="37" width="142" height="164" rx="14" {...strokeProps} opacity=".74" />
          <path d="M124 80h76M124 104h90M124 128h62M124 164h42" {...strokeProps} opacity=".48" />
          <circle cx="202" cy="164" r="22" fill="var(--service-accent)" />
          <path d="m191 164 8 8 14-18" {...strokeProps} stroke="white" strokeWidth="3" />
        </>
      );
    case "visa":
      return (
        <>
          <path d="M94 44h136v174H94z" fill="currentColor" opacity=".055" />
          <path d="M105 38h124v174H105z" {...strokeProps} opacity=".72" />
          <circle cx="167" cy="114" r="40" {...strokeProps} opacity=".55" />
          <path d="M128 114h78M167 74c13 12 20 25 20 40s-7 28-20 40c-13-12-20-25-20-40s7-28 20-40Z" {...strokeProps} opacity=".7" />
          <path d="M127 181h80" {...strokeProps} stroke="var(--service-accent)" strokeWidth="4" />
        </>
      );
    case "loan":
      return (
        <>
          <path d="M74 188h180" {...strokeProps} opacity=".28" />
          {[0, 1, 2, 3].map((step) => (
            <g key={step}>
              <ellipse cx={105 + step * 38} cy={174 - step * 24} rx="25" ry="9" fill="currentColor" opacity={0.1 + step * 0.08} />
              <path d={`M${80 + step * 38} ${158 - step * 24}v16c0 5 11 9 25 9s25-4 25-9v-16`} {...strokeProps} opacity={0.38 + step * 0.12} />
            </g>
          ))}
          <path d="m96 104 35-29 34 16 64-49" {...strokeProps} stroke="var(--service-accent)" strokeWidth="4" />
          <path d="m211 43 19-2-2 19" {...strokeProps} stroke="var(--service-accent)" strokeWidth="4" />
        </>
      );
    case "scholarship":
      return (
        <>
          <path d="M78 72h164v112H78z" fill="currentColor" opacity=".055" />
          <rect x="86" y="64" width="148" height="112" rx="8" {...strokeProps} opacity=".62" />
          <path d="M113 97h94M113 119h64" {...strokeProps} opacity=".38" />
          <circle cx="191" cy="145" r="30" fill="var(--service-accent)" opacity=".9" />
          <path d="m191 126 6 12 14 2-10 10 3 14-13-7-13 7 3-14-10-10 14-2Z" fill="white" opacity=".92" />
          <path d="m178 170-9 39 22-12 22 12-9-39" {...strokeProps} opacity=".72" />
        </>
      );
    case "airport":
      return (
        <>
          <path d="M61 170c54-73 124-97 202-76" {...strokeProps} strokeDasharray="7 10" opacity=".42" />
          <path d="m184 91 56-43-20 55 31 18-13 11-37-9-25 28-12-7 15-38-34-17 8-10Z" fill="currentColor" opacity=".86" />
          <rect x="64" y="154" width="118" height="57" rx="10" fill="currentColor" opacity=".08" />
          <path d="M82 174h62M82 191h41" {...strokeProps} opacity=".48" />
          <circle cx="155" cy="183" r="14" fill="var(--service-accent)" />
        </>
      );
    case "checklist":
      return (
        <>
          <rect x="82" y="35" width="156" height="188" rx="18" fill="currentColor" opacity=".06" />
          {[0, 1, 2, 3].map((row) => (
            <g key={row} transform={`translate(0 ${row * 38})`}>
              <rect x="103" y="62" width="20" height="20" rx="5" {...strokeProps} opacity=".7" />
              {row < 3 ? <path d="m108 72 5 5 10-13" {...strokeProps} stroke="var(--service-accent)" strokeWidth="3" /> : null}
              <path d="M140 70h73M140 79h50" {...strokeProps} opacity=".32" />
            </g>
          ))}
        </>
      );
    case "stay":
      return (
        <>
          <path d="m69 119 91-72 91 72" {...strokeProps} opacity=".75" />
          <path d="M86 112v100h148V112" fill="currentColor" opacity=".055" stroke="currentColor" strokeWidth="2" />
          <path d="M112 167h96v45h-96zM112 153v31M205 153v31M122 153h28c12 0 20 8 20 18h-48Z" {...strokeProps} opacity=".62" />
          <rect x="178" y="86" width="29" height="29" rx="3" fill="var(--service-accent)" opacity=".9" />
        </>
      );
    case "orientation":
      return (
        <>
          <path d="m66 62 58-18 72 22 58-20v155l-58 20-72-22-58 18Z" fill="currentColor" opacity=".055" stroke="currentColor" strokeWidth="2" />
          <path d="M124 44v155M196 66v155M82 179c39-44 62-29 84-61s44-24 72-50" {...strokeProps} strokeDasharray="6 9" opacity=".55" />
          <path d="M167 81c0 24-28 48-28 48s-28-24-28-48a28 28 0 1 1 56 0Z" fill="var(--service-accent)" />
          <circle cx="139" cy="81" r="9" fill="white" opacity=".9" />
        </>
      );
    case "welcome":
      return (
        <>
          <circle cx="122" cy="103" r="29" fill="currentColor" opacity=".14" />
          <circle cx="199" cy="103" r="29" fill="currentColor" opacity=".24" />
          <path d="M72 200c4-42 22-63 50-63s47 21 51 63M148 200c4-42 22-63 51-63s46 21 50 63" {...strokeProps} opacity=".62" />
          <path d="M126 49c17-20 62-20 79 0l-15 25h-49Z" fill="var(--service-accent)" opacity=".9" />
          <path d="m152 73 9 17 15-17" {...strokeProps} stroke="var(--service-accent)" strokeWidth="4" />
        </>
      );
    case "homes":
      return (
        <>
          <path d="m54 133 54-45 55 45v78H54ZM157 113l52-52 57 52v98H157Z" fill="currentColor" opacity=".07" stroke="currentColor" strokeWidth="2" />
          <path d="m46 132 62-52 62 52M149 112l60-59 64 59" {...strokeProps} opacity=".72" />
          <path d="M86 165h43v46H86zM193 142h32v32h-32z" fill="var(--service-accent)" opacity=".82" />
          <path d="M49 219h220" {...strokeProps} opacity=".28" />
        </>
      );
    case "bank":
      return (
        <>
          <path d="m66 93 94-49 94 49Z" fill="currentColor" opacity=".13" stroke="currentColor" strokeWidth="2" />
          <path d="M76 101h168M67 198h186M58 213h204" {...strokeProps} opacity=".66" />
          {[94, 138, 182, 226].map((x) => <path d={`M${x} 108v82`} {...strokeProps} strokeWidth="8" opacity=".4" key={x} />)}
          <circle cx="160" cy="74" r="18" fill="var(--service-accent)" />
          <path d="M153 74h14M160 67v14" {...strokeProps} stroke="white" strokeWidth="2" />
        </>
      );
    case "mobile":
      return (
        <>
          <rect x="105" y="27" width="110" height="202" rx="24" fill="currentColor" opacity=".055" stroke="currentColor" strokeWidth="2" />
          <path d="M139 48h42M146 205h28" {...strokeProps} opacity=".42" />
          <path d="M132 159c14-14 42-14 56 0M140 143c10-10 30-10 40 0M151 128c5-5 13-5 18 0" {...strokeProps} stroke="var(--service-accent)" strokeWidth="5" />
          <circle cx="160" cy="177" r="7" fill="var(--service-accent)" />
        </>
      );
    case "health":
      return (
        <>
          <path d="M160 215S73 169 73 99c0-32 23-53 51-53 20 0 32 10 36 24 5-14 17-24 37-24 28 0 50 21 50 53 0 70-87 116-87 116Z" fill="currentColor" opacity=".075" stroke="currentColor" strokeWidth="2" />
          <path d="M91 130h39l15-34 28 67 19-42h37" {...strokeProps} stroke="var(--service-accent)" strokeWidth="5" />
        </>
      );
    case "forex":
      return (
        <>
          <circle cx="118" cy="128" r="56" fill="currentColor" opacity=".06" stroke="currentColor" strokeWidth="2" />
          <circle cx="203" cy="128" r="56" fill="currentColor" opacity=".1" stroke="currentColor" strokeWidth="2" />
          <text x="101" y="145" fill="currentColor" fontSize="48" fontWeight="600">£</text>
          <text x="188" y="145" fill="currentColor" fontSize="48" fontWeight="600">€</text>
          <path d="M102 55h115l-16-16M218 201H103l16 16" {...strokeProps} stroke="var(--service-accent)" strokeWidth="4" />
        </>
      );
    case "jobs":
      return (
        <>
          {[0, 1, 2].map((row) => (
            <g key={row} transform={`translate(0 ${row * 52})`}>
              <rect x="68" y="52" width="184" height="42" rx="10" fill="currentColor" opacity={0.06 + row * 0.045} stroke="currentColor" strokeWidth="1.5" />
              <circle cx="92" cy="73" r="10" fill={row === 1 ? "var(--service-accent)" : "currentColor"} opacity={row === 1 ? 1 : 0.28} />
              <path d="M113 67h76M113 78h50" {...strokeProps} opacity=".34" />
              <path d="M220 68h14M227 61v14" {...strokeProps} opacity=".46" />
            </g>
          ))}
        </>
      );
    case "career":
      return (
        <>
          <path d="M60 211h55v-44h50v-45h48V77h48" fill="currentColor" opacity=".07" stroke="currentColor" strokeWidth="2" />
          <path d="M82 191c38-45 68-45 91-71s43-23 69-54" {...strokeProps} stroke="var(--service-accent)" strokeWidth="4" />
          <path d="m224 66 21-3-3 21" {...strokeProps} stroke="var(--service-accent)" strokeWidth="4" />
          {[82, 143, 184, 242].map((x, i) => <circle cx={x} cy={191 - i * 41} r="7" fill="currentColor" opacity={0.35 + i * 0.15} key={x} />)}
        </>
      );
    case "community":
      return (
        <>
          <path d="M91 87 160 55l70 43M91 87l12 88 57 31 69-42 1-66M103 175l57-53 69 42M160 55v67" {...strokeProps} opacity=".26" />
          {[[91,87],[160,55],[230,98],[103,175],[160,122],[160,206],[229,164]].map(([x,y], i) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r={i === 4 ? 19 : 13} fill={i === 4 ? "var(--service-accent)" : "currentColor"} opacity={i === 4 ? 1 : 0.4 + i * 0.05} />
              <circle cx={x} cy={y - 3} r={i === 4 ? 5 : 3.5} fill="white" opacity=".85" />
              <path d={`M${x - (i === 4 ? 9 : 6)} ${y + (i === 4 ? 9 : 6)}c2-7 ${i === 4 ? 16 : 10}-7 ${i === 4 ? 18 : 12} 0`} {...strokeProps} stroke="white" strokeWidth="1.5" />
            </g>
          ))}
        </>
      );
    case "experiences":
      return (
        <>
          <path d="M48 203h224M72 203V95h58v108M190 203V66h58v137M142 203v-70h36v70" {...strokeProps} opacity=".62" />
          <path d="M59 95h82M178 66h82M135 133h50" {...strokeProps} strokeWidth="5" opacity=".3" />
          <circle cx="160" cy="84" r="31" fill="var(--service-accent)" />
          <path d="M160 65v38M141 84h38" {...strokeProps} stroke="white" strokeWidth="3" />
          <path d="M91 119h19M91 146h19M211 91h17M211 119h17M211 147h17" {...strokeProps} opacity=".32" />
        </>
      );
    case "alumni":
      return (
        <>
          <circle cx="160" cy="118" r="67" fill="currentColor" opacity=".055" stroke="currentColor" strokeWidth="2" />
          <circle cx="160" cy="118" r="38" fill="var(--service-accent)" opacity=".82" />
          <path d="m160 92 8 17 19 3-14 13 4 19-17-9-17 9 4-19-14-13 19-3Z" fill="white" opacity=".92" />
          <path d="m126 174-14 52 48-24 48 24-14-52" {...strokeProps} opacity=".56" />
        </>
      );
  }
}

export function Landing3ServiceArtwork({ index, visual }: ArtworkProps) {
  return (
    <svg
      aria-hidden="true"
      className="h-full w-full origin-center text-white transition-[transform,filter,opacity] duration-700 ease-out group-hover:scale-[1.035] group-hover:opacity-100 group-hover:[filter:drop-shadow(0_0_18px_rgba(255,255,255,.12))] motion-reduce:transition-none"
      data-service-artwork
      data-service-artwork-index={index}
      fill="none"
      viewBox="0 0 320 250"
    >
      <g className="opacity-35">
        {Array.from({ length: 9 }).map((_, line) => (
          <path
            d={`M0 ${24 + line * 26}H320`}
            key={line}
            stroke="currentColor"
            strokeOpacity=".055"
          />
        ))}
      </g>
      <g className="transition-transform duration-700 ease-out group-hover:-translate-y-1 motion-reduce:transition-none">
        <ArtworkScene visual={visual} />
      </g>
    </svg>
  );
}
