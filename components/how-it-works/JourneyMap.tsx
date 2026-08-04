import HomepageAnimatedTitle from "@/components/homepage/HomepageAnimatedTitle";

const stages = [
  {
    label: "Still deciding",
    timing: "Pre-application",
    happening: "Is studying abroad right for me? Which country works?",
    atlas: "Compare costs, visa odds, and career outcomes without being sold to.",
    outcome: "A route you can trust.",
  },
  {
    label: "Shortlisting universities",
    timing: "Pre-application",
    happening: "Which five to ten universities are actually right for me?",
    atlas: "Rank options by admit probability, ROI, and visa success.",
    outcome: "A shortlist built around your profile.",
  },
  {
    label: "Applying",
    timing: "Application window",
    happening: "How do I keep SOPs, LORs, CVs, and deadlines moving?",
    atlas: "Track every document, deadline, template, and next step.",
    outcome: "A complete application, on time.",
  },
  {
    label: "Pre-departure",
    timing: "Four weeks before",
    happening: "What needs to be ready before I fly?",
    atlas: "Line up visa, banking, SIM, insurance, forex, and housing in order.",
    outcome: "Everything ready before boarding.",
  },
  {
    label: "First year and beyond",
    timing: "Long term",
    happening: "How do I build a life and career once I arrive?",
    atlas: "Keep jobs, community, events, and year-round support in one place.",
    outcome: "A network that stays with you.",
  },
] as const;

const rows = [
  { label: "Stage", key: "timing", tone: "bg-[#3a2352]/72" },
  { label: "What is happening", key: "happening", tone: "bg-[#17344b]/72" },
  { label: "What Atlas does", key: "atlas", tone: "bg-[#2d2756]/72" },
  { label: "What moves forward", key: "outcome", tone: "bg-[#193d37]/72" },
] as const;

export function JourneyMap() {
  return (
    <section
      className="relative isolate overflow-hidden px-5 py-24 text-white sm:px-8 sm:py-32"
      data-how-it-works-journey-map-section
      id="journey"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[40rem] w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f35a02]/[.055] blur-[150px]"
      />
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-12">
        <header className="mx-auto max-w-[800px] text-center" data-journey-map-intro>
          <HomepageAnimatedTitle
            as="h2"
            className="text-balance text-[clamp(3rem,5vw,5.35rem)] font-semibold leading-[.9] tracking-[-.07em]"
          >
            From decision to <span className="text-[#f35a02]">promotion.</span>{" "}
            All in one place.
          </HomepageAnimatedTitle>
          <p className="mx-auto mt-6 max-w-[680px] text-pretty text-base leading-7 text-white/62 sm:text-lg">
            Most platforms are built for the small window between picking a
            course and getting a visa. Atlas is built for everything before,
            during, and long after.
          </p>
        </header>

        <div className="overflow-x-auto pb-2" tabIndex={0}>
          <div
            aria-label="Atlas student journey map"
            className="min-w-[790px] overflow-hidden rounded-[24px] border border-white/[.12] bg-[#0c0d10]/92 p-2 shadow-[0_26px_90px_rgba(0,0,0,.36),inset_0_1px_rgba(255,255,255,.05)]"
            role="table"
          >
            <div className="grid grid-cols-[132px_repeat(5,minmax(0,1fr))] gap-1.5" role="rowgroup">
              <div
                className="flex min-h-[62px] items-center rounded-xl bg-white/[.06] px-4 text-xs font-semibold text-white/58"
                role="columnheader"
              >
                Journey stage
              </div>
              {stages.map((stage, index) => (
                <div
                  className="rounded-xl bg-white/[.075] px-3 py-3"
                  key={stage.label}
                  role="columnheader"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[.16em] text-white/38">
                    0{index + 1}
                  </span>
                  <span className="mt-1.5 block text-[13px] font-semibold leading-[1.25] tracking-[-.02em] text-white/88">
                    {stage.label}
                  </span>
                </div>
              ))}

              {rows.map((row) => (
                <div className="contents" key={row.label} role="row">
                  <div
                    className={`flex min-h-[118px] items-center rounded-xl px-4 text-sm font-semibold tracking-[-.02em] text-white/82 ${row.tone}`}
                    role="rowheader"
                  >
                    {row.label}
                  </div>
                  {stages.map((stage) => (
                    <div
                      className={`min-h-[118px] rounded-xl border border-white/[.075] p-3.5 ${row.tone}`}
                      key={`${row.label}-${stage.label}`}
                      role="cell"
                    >
                      <p className="text-[13px] leading-[1.5] tracking-[-.015em] text-white/76">
                        {stage[row.key]}
                      </p>
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
