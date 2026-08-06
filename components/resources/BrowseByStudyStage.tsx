import HomepageAnimatedTitle from "@/components/homepage/HomepageAnimatedTitle";

const stages = [
  {
    label: "Deciding",
    timing: "~12 months out",
    guides: [
      "Why study abroad in 2026, and the honest counter-case.",
      "UK vs Ireland vs Canada: a 2026 head-to-head.",
      "ROI by degree: how to actually estimate it for yourself.",
      "What world rankings don't tell you about teaching quality.",
    ],
  },
  {
    label: "Applying",
    timing: "~9 months out",
    guides: [
      "Writing an SOP that doesn't sound like every other SOP.",
      "LORs: who to ask, what to ask for, when to nudge.",
      "10 fully-funded scholarships for international students.",
      "The hidden cost of agent-led applications.",
    ],
  },
  {
    label: "Pre-departure",
    timing: "~3 months out",
    guides: [
      "UK student visa: every document, every deadline.",
      "Forex strategy: when to convert, how much, what to avoid.",
      "Pre-departure checklist: the only one you'll actually need.",
      "Banking before you fly: what's actually possible from India.",
    ],
  },
  {
    label: "After landing",
    timing: "Year 1 onwards",
    guides: [
      "First 7 days in London: the only checklist you need.",
      "Council tax exemption: the £1,800 most students miss.",
      "Graduate Route visa: which jobs actually count.",
      "Second-year housing: when to start looking, where to live.",
    ],
  },
] as const;

const rows = ["Start here", "Read next", "Plan for", "Keep close"] as const;
const tones = ["bg-[#3a2352]/72", "bg-[#17344b]/72", "bg-[#2d2756]/72", "bg-[#193d37]/72"] as const;

export function BrowseByStudyStage() {
  return (
    <section className="relative isolate overflow-hidden border-y border-white/[.1] px-5 py-24 sm:px-8 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[40rem] w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f35a02]/[.055] blur-[150px]"
      />
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-12">
        <header className="mx-auto max-w-[800px] text-center">
          <HomepageAnimatedTitle
            as="h2"
            className="text-balance text-[clamp(3rem,5vw,5.35rem)] font-semibold leading-[.9] tracking-[-.07em]"
          >
            Wherever you are <span className="text-[#f35a02]">in the journey.</span>
          </HomepageAnimatedTitle>
          <p className="mx-auto mt-6 max-w-[680px] text-pretty text-base leading-7 text-white/62 sm:text-lg">
            Pick the stage that matches where you actually are. We&apos;ll show you what most students need to read at this point, not what ranks well on Google.
          </p>
        </header>

        <div className="overflow-x-auto pb-2" tabIndex={0}>
          <div
            aria-label="Browse resources by study stage"
            className="min-w-[790px] overflow-hidden rounded-[24px] border border-white/[.12] bg-[#0c0d10]/92 p-2 shadow-[0_26px_90px_rgba(0,0,0,.36),inset_0_1px_rgba(255,255,255,.05)]"
            role="table"
          >
            <div className="grid grid-cols-[132px_repeat(4,minmax(0,1fr))] gap-1.5" role="rowgroup">
              <div className="flex min-h-[62px] items-center rounded-xl bg-white/[.06] px-4 text-xs font-semibold text-white/58" role="columnheader">
                Study stage
              </div>
              {stages.map((stage, index) => (
                <div className="rounded-xl bg-white/[.075] px-3 py-3" key={stage.label} role="columnheader">
                  <span className="font-mono text-[10px] uppercase tracking-[.16em] text-white/38">0{index + 1}</span>
                  <span className="mt-1.5 block text-[13px] font-semibold leading-[1.25] tracking-[-.02em] text-white/88">{stage.label}</span>
                  <span className="mt-1 block text-[11px] text-white/42">{stage.timing}</span>
                </div>
              ))}

              {rows.map((row, rowIndex) => (
                <div className="contents" key={row} role="row">
                  <div className={`flex min-h-[108px] items-center rounded-xl px-4 text-sm font-semibold tracking-[-.02em] text-white/82 ${tones[rowIndex]}`} role="rowheader">
                    {row}
                  </div>
                  {stages.map((stage) => (
                    <div className={`min-h-[108px] rounded-xl border border-white/[.075] p-3.5 ${tones[rowIndex]}`} key={`${row}-${stage.label}`} role="cell">
                      <p className="text-[13px] leading-[1.5] tracking-[-.015em] text-white/76">{stage.guides[rowIndex]}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
