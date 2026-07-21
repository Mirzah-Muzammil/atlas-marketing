import {
  Building2,
  Check,
  CircleDollarSign,
  FileCheck2,
  Home,
  MapPin,
  Plane,
} from "lucide-react";

export function DispatchJourneyPanel() {
  return (
    <div
      className="relative overflow-hidden border border-dispatch-ink/10"
      data-dispatch-draw-icons
      data-dispatch-panel-entrance
      data-editorial-panel
    >
      <div
        aria-hidden="true"
        className="absolute -left-10 top-12 h-28 w-28 rounded-full border border-dispatch-ink/10"
        data-editorial-panel-orbit
      />
      <div
        aria-hidden="true"
        className="absolute -right-8 bottom-5 h-20 w-20 rounded-full /70 blur-2xl"
        data-editorial-panel-orbit
      />

      <div className="relative overflow-hidden  bg-dispatch-canvas/96">
        <div className="flex h-10 items-center justify-between border-b border-dispatch-ink/10 px-3.5 sm:px-5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-[-0.02em] text-dispatch-ink">
              GGI atlas
            </span>
          </div>
          <div className="flex items-center gap-2 text-[8px] font-semibold text-dispatch-ink/82">
            <span className="hidden sm:inline">
              STAGE: APPLYING · UPDATED 2M AGO
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-dispatch-success" />
            <span className="grid h-5 w-5 place-items-center rounded-full  text-[7px] text-dispatch-ink">
              AM
            </span>
          </div>
        </div>

        <div className="relative" data-journey-state-stack>
          <section
            aria-labelledby="atlas-tab-apply"
            className="editorial-journey-state"
            data-active
            data-journey-state
            data-journey-state-index="0"
            id="atlas-stage-apply"
            role="tabpanel"
          >
            <div className="grid h-full grid-cols-[3.25rem_1fr] sm:grid-cols-[4.25rem_1fr]">
              <aside className="flex flex-col items-center gap-4 border-r border-dispatch-ink/8 py-5 text-dispatch-ink/30">
                <span className="grid h-7 w-7 place-items-center rounded-lg  text-dispatch-ink">
                  <Building2 className="h-3.5 w-3.5" />
                </span>
                <FileCheck2 className="h-3.5 w-3.5" />
                <CircleDollarSign className="h-3.5 w-3.5" />
                <Home className="h-3.5 w-3.5" />
              </aside>

              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[8px] font-bold tracking-[0.14em] text-dispatch-ink/82">
                      Plan &amp; apply
                    </p>
                    <h2 className="mt-1.5 text-[1.35rem] font-semibold tracking-[-0.055em] sm:text-[1.65rem]">
                      Your top matches for MSc Computer Science
                    </h2>
                  </div>
                  <span className="rounded-full  px-2.5 py-1 text-[8px] font-bold text-dispatch-ink">
                    3 things left
                  </span>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-[1.25fr_.75fr]">
                  <div className="rounded-xl border border-dispatch-ink/9 bg-white p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-bold tracking-[0.12em] text-dispatch-ink/82">
                        WHAT&apos;S NEXT
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-dispatch-success" />
                    </div>
                    <p className="mt-3 text-[12px] font-semibold">
                      Upload final transcripts
                    </p>
                    <p className="mt-1 text-[9px] leading-4 text-dispatch-ink/82">
                      Imperial wants Sem-8 by 14 Nov.
                    </p>
                    <span className="mt-3 inline-flex rounded-full  px-2.5 py-1 text-[8px] font-semibold text-dispatch-ink">
                      Due in 9 days
                    </span>
                  </div>

                  <div className="space-y-2">
                    {[
                      "Imperial College London",
                      "University of Edinburgh",
                      "King's College London",
                    ].map((university, index) => (
                      <div
                        className="flex items-center gap-2 rounded-xl border border-dispatch-sage/65 px-2.5 py-2"
                        key={university}
                      >
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-dispatch-ink/12 text-[7px] font-bold">
                          0{index + 1}
                        </span>
                        <span className="truncate text-[8px] font-semibold">
                          {university}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            aria-labelledby="atlas-tab-settle"
            className="editorial-journey-state"
            data-journey-state
            data-journey-state-index="1"
            id="atlas-stage-prepare"
            role="tabpanel"
          >
            <div className="grid h-full grid-cols-[3.25rem_1fr] sm:grid-cols-[4.25rem_1fr]">
              <aside className="flex flex-col items-center gap-4 border-r border-dispatch-ink/8 py-5 text-dispatch-ink/30">
                <Building2 className="h-3.5 w-3.5" />
                <span className="grid h-7 w-7 place-items-center rounded-lg  text-dispatch-ink">
                  <FileCheck2 className="h-3.5 w-3.5" />
                </span>
                <CircleDollarSign className="h-3.5 w-3.5" />
                <Plane className="h-3.5 w-3.5" />
              </aside>

              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[8px] font-bold tracking-[0.14em] text-dispatch-ink/82">
                      Arrive &amp; settle
                    </p>
                    <h2 className="mt-1.5 text-[1.35rem] font-semibold tracking-[-0.055em] sm:text-[1.65rem]">
                      Pre-arrival essentials
                    </h2>
                  </div>
                  <span className="rounded-full  px-2.5 py-1 text-[8px] font-bold text-dispatch-ink">
                    8 SERVICES
                  </span>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-[.8fr_1.2fr]">
                  <div className="grid place-items-center rounded-xl  p-3 text-center text-dispatch-ink">
                    <div className="grid h-16 w-16 place-items-center rounded-full border border-dispatch-canvas/22">
                      <span className="text-xl font-semibold tracking-[-0.05em]">
                        23
                      </span>
                    </div>
                    <p className="mt-2 text-[8px] font-semibold text-dispatch-ink/82">
                      PARTNERS
                    </p>
                  </div>
                  <div className="space-y-2">
                    {[
                      ["giffgaff eSIM", "Coupon"],
                      ["Monzo Student", "Partner"],
                      ["EduSafe Insurance", "Direct"],
                    ].map(([item, status], index) => (
                      <div
                        className="flex items-center justify-between rounded-xl border border-dispatch-ink/9 bg-white px-3 py-2.5"
                        key={item}
                      >
                        <span className="flex items-center gap-2 text-[9px] font-semibold">
                          <span
                            className={
                              index < 2
                                ? "grid h-4 w-4 place-items-center rounded-full bg-dispatch-success text-white"
                                : "grid h-4 w-4 place-items-center rounded-full border border-dispatch-ink/18"
                            }
                          >
                            {index < 2 && <Check className="h-2.5 w-2.5" />}
                          </span>
                          {item}
                        </span>
                        <span className="text-[7px] font-bold text-dispatch-ink/82">
                          {status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            aria-labelledby="atlas-tab-thrive"
            className="editorial-journey-state"
            data-journey-state
            data-journey-state-index="2"
            id="atlas-stage-arrive"
            role="tabpanel"
          >
            <div className="grid h-full grid-cols-[3.25rem_1fr] sm:grid-cols-[4.25rem_1fr]">
              <aside className="flex flex-col items-center gap-4 border-r border-dispatch-ink/8 py-5 text-dispatch-ink/30">
                <Plane className="h-3.5 w-3.5" />
                <Home className="h-3.5 w-3.5" />
                <span className="grid h-7 w-7 place-items-center rounded-lg  text-dispatch-ink">
                  <MapPin className="h-3.5 w-3.5" />
                </span>
                <CircleDollarSign className="h-3.5 w-3.5" />
              </aside>

              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[8px] font-bold tracking-[0.14em] text-dispatch-ink/82">
                      Events
                    </p>
                    <h2 className="mt-1.5 text-[1.35rem] font-semibold tracking-[-0.055em] sm:text-[1.65rem]">
                      Built around your week.
                    </h2>
                  </div>
                  <span className="rounded-full  px-2.5 py-1 text-[8px] font-bold text-dispatch-ink">
                    Year 1
                  </span>
                </div>

                <div className="relative mt-4 overflow-  rounded-xl p-3">
                  <div
                    aria-hidden="true"
                    className=" absolute inset-0 opacity-45"
                  />
                  <div className="relative grid gap-2 sm:grid-cols-3">
                    {[
                      ["14 Nov", "Diwali at the Indian YMCA", Home],
                      ["21 Nov", "UK tax 101 (workshop)", CircleDollarSign],
                      ["02 Dec", "Goldman grad night", Building2],
                    ].map(([day, task, Icon]) => {
                      const TaskIcon = Icon;
                      return (
                        <div
                          className="rounded-xl border border-dispatch-canvas bg-dispatch-canvas/92 p-3"
                          key={String(day)}
                        >
                          <TaskIcon className="h-4 w-4 text-dispatch-ink/45" />
                          <p className="mt-5 text-[7px] font-bold tracking-[0.11em] text-dispatch-ink/82">
                            {String(day)}
                          </p>
                          <p className="mt-1 text-[9px] font-semibold leading-4">
                            {String(task)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
