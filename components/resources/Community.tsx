import Link from "next/link";

import HomepageAnimatedTitle from "@/components/homepage/HomepageAnimatedTitle";

const communityRows = [
  ["London", "4,820", "Tonight · Bloomsbury"],
  ["Manchester", "2,340", "Thu · Oxford Road"],
  ["Birmingham", "1,760", "Fri · Selly Oak"],
  ["Edinburgh", "1,210", "Sat · Old Town"],
] as const;

export function Community() {
  return (
    <section className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32" id="community">
      <div className="mx-auto grid max-w-[1320px] border border-white/[.12] bg-[#0b0c0e]/94 lg:grid-cols-[.9fr_1.1fr]">
        <div className="flex flex-col justify-center border-b border-white/[.1] p-7 sm:p-12 lg:border-b-0 lg:border-r lg:p-16">
          <HomepageAnimatedTitle as="h2" className="max-w-[620px] text-balance text-[clamp(3rem,5vw,5.35rem)] font-semibold leading-[.9] tracking-[-.07em]">
            14,000+ Indians. Already <span className="text-[#f35a02]">in your corner.</span>
          </HomepageAnimatedTitle>
          <p className="mt-7 max-w-[580px] text-base leading-7 text-white/58">
            Groups by city and university, weekly events on every major campus, a mentor pool of alumni working at top firms, and an alumni network you can reach in two clicks.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-px border-y border-white/[.1] bg-white/[.1]">
            <CommunityStat label="Verified Indian students" value="14,000+" />
            <CommunityStat label="UK universities covered" value="120+" />
            <CommunityStat label="Campus rhythm" value="Weekly" />
          </div>
          <Link className="mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-[#f35a02] px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#f35a02]" href="/get-started">
            Sign up free <span>→</span>
          </Link>
        </div>

        <div className="relative min-h-[620px] overflow-hidden p-4 sm:p-8">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_62%_48%,rgba(243,90,2,.19),transparent_42%)]" />
          <div
            aria-label="Atlas Community application window"
            className="relative mx-auto flex h-full min-h-[560px] max-w-[760px] flex-col overflow-hidden rounded-[20px] border border-white/[.18] bg-[#090a0c] shadow-[0_34px_100px_rgba(0,0,0,.58),0_0_0_1px_rgba(255,255,255,.035)]"
            role="region"
          >
            <header className="grid h-12 shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b border-black/70 bg-[#1c1d20] px-4 shadow-[inset_0_1px_rgba(255,255,255,.08)]">
              <div aria-hidden="true" className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full border border-black/20 bg-[#ff5f57] shadow-[inset_0_0_0_0.5px_rgba(255,255,255,.25)]" />
                <span className="h-2.5 w-2.5 rounded-full border border-black/20 bg-[#febc2e] shadow-[inset_0_0_0_0.5px_rgba(255,255,255,.25)]" />
                <span className="h-2.5 w-2.5 rounded-full border border-black/20 bg-[#28c840] shadow-[inset_0_0_0_0.5px_rgba(255,255,255,.25)]" />
              </div>
              <p className="text-[11px] font-medium tracking-[-.01em] text-white/62">Atlas Community</p>
              <span className="flex items-center justify-self-end gap-1.5 text-[10px] text-white/38"><span className="h-1.5 w-1.5 rounded-full bg-[#f35a02]" /> Live</span>
            </header>

            <div className="grid min-h-0 flex-1 sm:grid-cols-[104px_minmax(0,1fr)]">
              <aside className="hidden flex-col border-r border-white/[.08] bg-[#0c0d0f] p-3 sm:flex">
                <div className="flex h-10 items-center gap-2 px-2">
                  <span className="grid h-6 w-6 place-items-center rounded-[7px] bg-[#f35a02] text-[10px] font-bold text-white">A</span>
                  <span className="text-xs font-semibold text-white/86">Atlas</span>
                </div>
                <nav aria-label="Community application">
                  <ul className="mt-4 space-y-1">
                    {["Home", "Circles", "Events", "Mentors"].map((item) => (
                      <li key={item}>
                        <span className={`flex h-9 items-center rounded-lg px-3 text-[11px] ${item === "Circles" ? "bg-white/[.09] font-medium text-white" : "text-white/38"}`}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="mt-auto border-t border-white/[.08] pt-3">
                  <div className="flex items-center gap-2 px-2">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#312117] text-[9px] font-semibold text-[#ff9b65]">AS</span>
                    <div className="min-w-0">
                      <p className="truncate text-[10px] font-medium text-white/72">Aarav</p>
                      <p className="text-[9px] text-white/28">Student</p>
                    </div>
                  </div>
                </div>
              </aside>

              <div className="flex min-w-0 flex-col bg-[#0a0b0d]">
                <div className="flex min-h-14 items-center justify-between gap-3 border-b border-white/[.08] px-4 sm:px-5">
                  <div>
                    <p className="text-sm font-medium text-white/90">Community</p>
                    <p className="mt-0.5 text-[10px] text-white/34">186 students online</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden rounded-lg border border-white/[.09] bg-white/[.035] px-3 py-2 text-[10px] text-white/30 md:block">Search community</span>
                    <span className="rounded-lg bg-[#f35a02] px-3 py-2 text-[10px] font-semibold text-white">New post</span>
                  </div>
                </div>

                <div className="grid min-h-0 flex-1 md:grid-cols-[170px_minmax(0,1fr)]">
                  <div className="border-b border-white/[.08] p-4 md:border-b-0 md:border-r">
                    <p className="font-mono text-[9px] uppercase tracking-[.14em] text-white/34">Active circles</p>
                    <div className="mt-4 space-y-1">
                      {["Computer Science · 2026", "London newcomers", "Graduate Route", "Weekend football", "Finance & scholarships"].map((name, index) => (
                        <div className={`rounded-lg px-3 py-2.5 text-[11px] leading-4 ${index === 0 ? "bg-white/[.09] text-white" : "text-white/43"}`} key={name}>
                          {name}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="min-w-0 p-4 sm:p-5">
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-[9px] uppercase tracking-[.14em] text-white/34">This week around you</p>
                      <span className="text-[10px] text-white/28">UK local time</span>
                    </div>
                    <div className="mt-3">
                      {communityRows.map(([city, members, event], index) => (
                        <div className="grid grid-cols-[30px_minmax(0,1fr)_auto] items-center gap-3 border-t border-white/[.08] py-3" key={city}>
                          <span className="grid h-7 w-7 place-items-center rounded-md bg-white/[.05] font-mono text-[9px] text-white/42">0{index + 1}</span>
                          <div className="min-w-0">
                            <p className="truncate text-[11px] font-medium text-white/82">{city}</p>
                            <p className="mt-0.5 truncate text-[10px] text-white/34">{event}</p>
                          </div>
                          <span className="font-mono text-[9px] text-white/30">{members}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 rounded-xl border border-white/[.1] bg-white/[.035] p-4 shadow-[0_12px_30px_rgba(0,0,0,.2)]">
                      <div className="flex items-center gap-2">
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-[#25342d] text-[8px] font-semibold text-[#81d7ad]">PM</span>
                        <div>
                          <p className="text-[10px] font-medium text-white/76">Priya Menon</p>
                          <p className="text-[9px] text-white/28">London newcomers · 2m</p>
                        </div>
                      </div>
                      <p className="mt-3 text-[11px] leading-5 text-white/68">Anyone landing at Heathrow on the 18th? We are splitting a cab to Bloomsbury.</p>
                      <p className="mt-3 text-[9px] font-medium text-[#ff7a34]">6 replies</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommunityStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#0b0c0e] px-3 py-5 sm:px-5">
      <p className="text-xl font-medium tracking-[-.04em] text-white sm:text-2xl">{value}</p>
      <p className="mt-2 text-[10px] leading-4 text-white/34 sm:text-xs">{label}</p>
    </div>
  );
}
