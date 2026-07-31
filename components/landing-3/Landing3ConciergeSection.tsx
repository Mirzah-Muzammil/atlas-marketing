import Landing3AnimatedTitle from "@/components/landing-3/Landing3AnimatedTitle";

const conciergePoints = [
  {
    lead: "One dedicated expert",
    detail: "the same specialist from first message to final document.",
  },
  {
    lead: "No starting over",
    detail: "they already have your documents, deadlines, and timeline.",
  },
  {
    lead: "A fixed fee, agreed upfront",
    detail: "before any work begins.",
  },
] as const;

export function Landing3ConciergeSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#050506] px-5 py-24 text-white sm:px-8 sm:py-32"
      data-landing-3-concierge
      id="atlas-support"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.028)_1px,transparent_1px)] bg-[size:68px_68px] [mask-image:linear-gradient(to_bottom,transparent,black_16%,black_84%,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[22rem] top-1/2 h-[42rem] w-[54rem] -translate-y-1/2 rounded-full bg-[#f35a02]/12 blur-[150px]"
      />

      <div className="relative mx-auto grid w-full max-w-[1180px] items-center gap-16 lg:grid-cols-[.88fr_1.12fr] lg:gap-20">
        <div>
          <Landing3AnimatedTitle
            as="h2"
            className="max-w-[650px] text-[clamp(3rem,5vw,5.5rem)] font-semibold leading-[.92] tracking-[-.07em]"
          >
            The hardest steps, <span className="text-[#f35a02]">handled.</span>
          </Landing3AnimatedTitle>
          <p className="mt-7 max-w-[560px] text-base leading-7 text-white/62 sm:text-lg">
            Hand any step of your move to a specialist who has done it hundreds
            of times — working inside your Atlas, on your case.
          </p>

          <ul className="mt-9 space-y-5" aria-label="Atlas Concierge benefits">
            {conciergePoints.map(({ detail, lead }, index) => (
              <li
                className="grid max-w-[570px] grid-cols-[30px_1fr] items-start gap-3 border-t border-white/[.08] pt-5"
                key={lead}
              >
                <span className="pt-1 font-mono text-[10px] tracking-[.14em] text-[#f35a02]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-[15px] leading-6 text-white/55 sm:text-base">
                  <strong className="font-semibold text-white">{lead}</strong>
                  {" — "}
                  {detail}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a
              className="group relative isolate inline-flex min-h-12 items-center gap-2.5 overflow-hidden rounded-full border border-[#f35a02]/75 bg-transparent px-6 text-sm font-semibold text-white shadow-[0_16px_38px_rgba(243,90,2,.1)] transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-[#f35a02] hover:shadow-[0_20px_46px_rgba(243,90,2,.25)] active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f35a02] motion-reduce:hover:translate-y-0"
              data-concierge-cta
              href="/concierge"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 origin-left scale-x-0 bg-[#f35a02] transition-transform duration-[260ms] [transition-timing-function:cubic-bezier(.23,1,.32,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
                data-concierge-cta-fill
              />
              <span className="relative z-10">Explore Atlas Concierge</span>
            </a>
            <a
              className="min-h-11 border-b border-white/18 py-3 text-sm font-medium text-white/58 transition-[color,border-color] duration-200 ease-out hover:border-white/55 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              href="/concierge#pricing"
            >
              See what it costs
            </a>
          </div>
        </div>

        <div
          aria-label="A Concierge chat where visa specialist Aisha takes over a student's visa application"
          className="overflow-hidden rounded-[20px] border border-white/[.12] bg-[#0b0c0f] shadow-[0_42px_120px_rgba(0,0,0,.55),0_0_100px_rgba(243,90,2,.07)]"
          data-concierge-chat
          data-concierge-computer
          role="region"
        >
          <div className="grid h-11 grid-cols-[1fr_auto_1fr] items-center border-b border-white/[.08] bg-[#121317] px-4">
            <div className="flex items-center gap-2" aria-hidden="true">
              {["bg-[#ff5f57]", "bg-[#febc2e]", "bg-[#28c840]"].map(
                (color) => (
                  <span
                    className={`size-2.5 rounded-full ${color}`}
                    data-concierge-window-control
                    key={color}
                  />
                ),
              )}
            </div>
            <p className="text-[11px] font-medium text-white/45">Messages</p>
            <p className="text-right font-mono text-[9px] uppercase tracking-[.14em] text-white/24">
              Secure
            </p>
          </div>

          <div className="grid min-h-[520px] sm:grid-cols-[152px_1fr]">
            <aside
              className="hidden border-r border-white/[.075] bg-[#0d0e11] p-3 sm:block"
              data-concierge-sidebar
            >
              <p className="px-2 py-2 text-[10px] font-medium uppercase tracking-[.15em] text-white/25">
                Conversations
              </p>
              <div className="mt-2 rounded-xl bg-white/[.075] p-3">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#167d74] text-[9px] font-semibold text-white">
                    AM
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-white/90">
                      Aisha M.
                    </p>
                    <p className="mt-0.5 truncate text-[10px] text-white/36">
                      Visa application
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-1 p-3 text-xs text-white/31">Admissions</div>
              <div className="p-3 text-xs text-white/31">Housing</div>
            </aside>

            <div className="flex min-w-0 flex-col" data-concierge-thread>
              <div className="flex min-h-16 items-center gap-3 border-b border-white/[.075] px-4 sm:px-5">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#167d74] text-[10px] font-semibold text-white">
                  AM
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">Aisha M.</p>
                  <p className="mt-0.5 text-[10px] text-white/34">
                    Visa specialist · 400+ UK cases
                  </p>
                </div>
                <span className="ml-auto inline-flex items-center gap-2 text-[10px] text-white/38">
                  <span className="size-1.5 rounded-full bg-[#4fce8a]" />
                  Online
                </span>
              </div>

              <div className="flex-1 space-y-6 px-4 py-7 sm:px-6">
                <p className="text-center font-mono text-[9px] uppercase tracking-[.12em] text-white/20">
                  Today · 10:42
                </p>
                <div
                  className="flex items-end justify-end gap-2"
                  data-concierge-message="student"
                >
                  <div className="max-w-[84%] rounded-[17px] rounded-br-[5px] bg-[#f35a02] px-4 py-3 text-[12px] leading-5 text-white sm:text-[13px]">
                    My CAS arrived and I fly in six weeks. Can a specialist take
                    over my visa application?
                  </div>
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#7150d7] text-[9px] font-semibold text-white">
                    K
                  </span>
                </div>

                <div
                  className="flex items-end gap-2"
                  data-concierge-message="specialist"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#167d74] text-[8px] font-semibold text-white">
                    AM
                  </span>
                  <div className="max-w-[86%] rounded-[17px] rounded-bl-[5px] bg-white/[.08] px-4 py-3 text-[12px] leading-5 text-white/70 sm:text-[13px]">
                    Consider it done. Your file is complete except the TB
                    certificate — the full application will be ready for your
                    sign-off tomorrow.
                  </div>
                </div>

                <div
                  className="mx-auto max-w-[90%] border-y border-[#4fce8a]/15 py-3 text-center"
                  data-concierge-status
                >
                  <p className="text-[11px] leading-5 text-white/42">
                    <strong className="font-medium text-[#80dda9]">
                      Visa application — in expert hands.
                    </strong>{" "}
                    Fixed fee, agreed upfront.
                  </p>
                </div>
              </div>

              <div className="border-t border-white/[.075] p-3 sm:p-4">
                <div
                  className="flex min-h-11 items-center gap-3 rounded-xl border border-white/[.09] bg-white/[.035] px-3.5"
                  data-concierge-composer
                >
                  <span className="flex-1 text-xs text-white/24">
                    Message Aisha...
                  </span>
                  <span className="rounded-lg bg-[#f35a02] px-3 py-1.5 text-[10px] font-semibold text-white">
                    Send
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
