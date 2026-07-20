import {
  ArrowUpRight,
  Check,
  FileText,
  Home,
  Landmark,
  Plane,
  WalletCards,
} from "lucide-react";

import { DispatchSupportingMotion } from "@/components/home/dispatch/DispatchSupportingMotion";
import { MagneticLink } from "@/components/motion/MagneticLink";

export function DispatchSystemSection() {
  return (
    <section
      className="relative overflow-hidden bg-dispatch-ink pt-24 text-dispatch-canvas sm:pb-36 sm:pt-32 lg:pb-44 lg:pt-40"
      data-editorial-system
      id="atlas-system"
    >
      <div
        aria-hidden="true"
        className="editorial-system-grid absolute inset-0 opacity-45"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 top-16 h-80 w-80 rounded-full border border-dispatch-canvas/10"
        data-system-orbit
      />
      <div
        aria-hidden="true"
        className="absolute -right-8 top-40 h-36 w-36 rounded-full border border-dispatch-canvas/10"
        data-system-orbit
      />

      <div className="container-shell relative">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_.65fr] lg:items-end">
          <h2
            className="max-w-[66rem] text-[clamp(4.2rem,9.1vw,9.2rem)] font-semibold leading-[0.81] tracking-[-0.082em]"
            data-system-heading
          >
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="block" data-system-heading-line>
                A real product.
              </span>
            </span>{" "}
            <span className="block overflow-hidden pb-[0.08em]">
              <span
                className="block text-dispatch-mint"
                data-system-heading-line
              >
                Not a brochure.
              </span>
            </span>
          </h2>
          <div className="max-w-sm pb-2 lg:pb-5" data-system-copy>
            <p className="text-lg leading-7 tracking-[-0.02em] text-dispatch-canvas/82">
              Every student who signs up gets the full Student OS, personalised
              by stage and target. Free, with no upgrade nudges every two
              clicks.
            </p>
            <p className="mt-5 text-[10px] font-bold tracking-[0.18em] text-dispatch-mint">
              The product
            </p>
          </div>
        </div>

        <div className="relative mt-20 border-t border-dispatch-canvas/15 sm:mt-24 lg:mt-32">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[1.15rem] top-0 w-px bg-dispatch-canvas/15 sm:left-[1.55rem] lg:left-[3.1rem]"
          >
            <span
              className="block h-1/3 w-px origin-top bg-dispatch-mint"
              data-system-progress
            />
          </div>

          <article
            className="relative grid gap-8 border-b border-dispatch-canvas/15 py-12 pl-12 sm:py-16 sm:pl-16 lg:grid-cols-[.72fr_1.28fr] lg:gap-16 lg:py-20 lg:pl-28"
            data-system-moment
          >
            <span className="absolute left-0 top-12 grid h-9 w-9 place-items-center rounded-full border border-dispatch-canvas/24 bg-dispatch-ink text-[9px] font-bold sm:top-16 sm:h-12 sm:w-12 lg:top-20">
              01
            </span>
            <div className="lg:pt-5">
              <p className="text-[10px] font-bold tracking-[0.18em] text-dispatch-mint">
                PLAN &amp; APPLY
              </p>
              <h3 className="mt-5 max-w-md text-[clamp(2.3rem,4.5vw,4.65rem)] font-semibold leading-[0.91] tracking-[-0.065em]">
                Pick a university. Get in. Without the kickbacks.
              </h3>
              <p className="mt-6 max-w-sm text-sm leading-6 text-dispatch-canvas/82">
                The basics, done well. This part of the journey is what every
                other agent and platform offers — the difference is we
                don&apos;t get paid more for steering you toward the wrong fit.
              </p>
            </div>
            <div
              className="overflow-hidden rounded-[1.6rem] border border-dispatch-canvas/14 bg-dispatch-deep p-3 shadow-dispatch-dark sm:p-5"
              data-system-visual
            >
              <div className="rounded-[1.15rem] bg-dispatch-canvas p-4 text-dispatch-ink sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[8px] font-bold tracking-[0.14em] text-dispatch-ink/82">
                      Your top matches
                    </p>
                    <p className="mt-1 text-xl font-semibold tracking-[-0.05em]">
                      for MSc Computer Science
                    </p>
                  </div>
                  <FileText className="h-5 w-5 text-dispatch-ink/35" />
                </div>
                <div className="mt-5 space-y-2">
                  {[
                    [
                      "Imperial College London",
                      "MSc Advanced Computing · London, UK",
                      "94%",
                    ],
                    [
                      "University of Edinburgh",
                      "MSc AI · Edinburgh, UK",
                      "88%",
                    ],
                    [
                      "King's College London",
                      "MSc Data Science · London, UK",
                      "82%",
                    ],
                  ].map(([university, course, date], index) => (
                    <div
                      className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl bg-dispatch-sage/70 p-3"
                      key={university}
                    >
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-dispatch-ink text-[8px] font-bold text-dispatch-canvas">
                        0{index + 1}
                      </span>
                      <span>
                        <span className="block text-[10px] font-bold">
                          {university}
                        </span>
                        <span className="block text-[8px] text-dispatch-ink/82">
                          {course}
                        </span>
                      </span>
                      <span className="text-[8px] font-semibold text-dispatch-ink/82">
                        {date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <article
            className="relative grid gap-8 border-b border-dispatch-canvas/15 py-12 pl-12 sm:py-16 sm:pl-16 lg:grid-cols-[.72fr_1.28fr] lg:gap-16 lg:py-20 lg:pl-28"
            data-system-moment
          >
            <span className="absolute left-0 top-12 grid h-9 w-9 place-items-center rounded-full border border-dispatch-canvas/24 bg-dispatch-ink text-[9px] font-bold sm:top-16 sm:h-12 sm:w-12 lg:top-20">
              02
            </span>
            <div className="lg:pt-5">
              <p className="text-[10px] font-bold tracking-[0.18em] text-dispatch-mint">
                ARRIVE &amp; SETTLE
              </p>
              <h3 className="mt-5 max-w-md text-[clamp(2.3rem,4.5vw,4.65rem)] font-semibold leading-[0.91] tracking-[-0.065em]">
                Land. Get sorted. In a week, not a month.
              </h3>
              <p className="mt-6 max-w-sm text-sm leading-6 text-dispatch-canvas/82">
                The eight services every international student needs in their
                first month. Set up before you fly. Activated the moment you
                land. Real partners, transparent referral fees, zero markup.
              </p>
            </div>
            <div
              className="overflow-hidden rounded-[1.6rem] border border-dispatch-canvas/14 bg-dispatch-mint p-3 text-dispatch-ink shadow-dispatch-dark sm:p-5"
              data-system-visual
            >
              <div className="grid gap-3 sm:grid-cols-[.82fr_1.18fr]">
                <div className="grid min-h-56 place-items-center rounded-[1.15rem] bg-dispatch-ink p-5 text-center text-dispatch-canvas">
                  <div>
                    <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-dispatch-canvas/22">
                      <span className="text-3xl font-semibold tracking-[-0.07em]">
                        8
                      </span>
                    </div>
                    <p className="mt-4 text-[8px] font-bold tracking-[0.14em] text-dispatch-mint">
                      SERVICES · 23 PARTNERS
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    ["giffgaff eSIM", "80GB · works on landing", Landmark],
                    [
                      "Monzo Student",
                      "£0/mo · open before flight",
                      WalletCards,
                    ],
                    ["EduSafe Insurance", "Health + travel · 12mo", Home],
                  ].map(([label, status, Icon], index) => {
                    const StatusIcon = Icon;
                    return (
                      <div
                        className="flex min-h-[4.15rem] items-center gap-3 rounded-[1.15rem] bg-dispatch-canvas px-3.5"
                        key={String(label)}
                      >
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-dispatch-sage">
                          <StatusIcon className="h-3.5 w-3.5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[9px] font-bold">
                            {String(label)}
                          </span>
                          <span className="block truncate text-[8px] text-dispatch-ink/82">
                            {String(status)}
                          </span>
                        </span>
                        {index < 2 ? (
                          <span className="grid h-5 w-5 place-items-center rounded-full bg-dispatch-success text-white">
                            <Check className="h-3 w-3" />
                          </span>
                        ) : (
                          <span className="h-2 w-2 rounded-full bg-dispatch-ink/25" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </article>

          <article
            className="relative grid gap-8 py-12 pl-12 sm:py-16 sm:pl-16 lg:grid-cols-[.72fr_1.28fr] lg:gap-16 lg:py-20 lg:pl-28"
            data-system-moment
          >
            <span className="absolute left-0 top-12 grid h-9 w-9 place-items-center rounded-full border border-dispatch-canvas/24 bg-dispatch-ink text-[9px] font-bold sm:top-16 sm:h-12 sm:w-12 lg:top-20">
              03
            </span>
            <div className="lg:pt-5">
              <p className="text-[10px] font-bold tracking-[0.18em] text-dispatch-mint">
                BUILD &amp; THRIVE
              </p>
              <h3 className="mt-5 max-w-md text-[clamp(2.3rem,4.5vw,4.65rem)] font-semibold leading-[0.91] tracking-[-0.065em]">
                After you land. The bit nobody else builds.
              </h3>
              <p className="mt-6 max-w-sm text-sm leading-6 text-dispatch-canvas/82">
                Most platforms stop the moment you land — that&apos;s when their
                commission cheque clears. Phase 3 is where we live differently.
                Jobs, community, events, year-round services. Free, for as long
                as you want to use it.
              </p>
            </div>
            <div
              className="relative min-h-72 overflow-hidden rounded-[1.6rem] border border-dispatch-canvas/14 bg-dispatch-sage p-5 text-dispatch-ink shadow-dispatch-dark"
              data-system-visual
            >
              <div
                aria-hidden="true"
                className="editorial-city-map absolute inset-0 opacity-40"
              />
              <div className="relative ml-auto max-w-sm rounded-[1.25rem] bg-dispatch-canvas p-4 shadow-dispatch-panel sm:p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[8px] font-bold tracking-[0.14em] text-dispatch-ink/82">
                      EVENTS
                    </p>
                    <p className="mt-1 text-lg font-semibold tracking-[-0.04em]">
                      Built around your week.
                    </p>
                  </div>
                  <Plane className="h-5 w-5 text-dispatch-ink/38" />
                </div>
                <div className="mt-5 border-l border-dispatch-ink/18 pl-4">
                  {[
                    [
                      "Diwali at the Indian YMCA",
                      "Fitzroy Sq · 6:30 PM · Free",
                    ],
                    ["UK tax 101 (workshop)", "Online · 7:00 PM · Free"],
                    ["Goldman grad night", "Plumtree Court · Invite only"],
                  ].map(([task, detail]) => (
                    <div className="relative pb-4 last:pb-0" key={task}>
                      <span className="absolute -left-[1.27rem] top-1 h-2 w-2 rounded-full bg-dispatch-ink" />
                      <p className="text-[9px] font-semibold">{task}</p>
                      <p className="mt-1 text-[8px] text-dispatch-ink/82">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-7 border-t border-dispatch-canvas/15 pt-9 sm:flex-row sm:items-center lg:mt-20">
          <p className="max-w-lg text-xl font-semibold leading-7 tracking-[-0.035em] sm:text-2xl">
            Built to help you get out, and stay out.
          </p>
          <MagneticLink strength={0.14}>
            <a
              className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-dispatch-canvas px-6 text-sm font-semibold text-dispatch-ink transition-colors hover:bg-dispatch-mint focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dispatch-canvas"
              href="/get-started"
            >
              Get started
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </MagneticLink>
        </div>
      </div>

      <DispatchSupportingMotion />
    </section>
  );
}
