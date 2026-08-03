"use client";

import HomepageAnimatedTitle from "@/components/homepage/HomepageAnimatedTitle";

const articles = [
  {
    category: "Visa guide",
    title: "UK student visa: every document, every deadline",
    meta: "8 min read · Updated July 2026",
    href: "/resources/visa-documents",
    number: "01",
  },
  {
    category: "Financial aid",
    title: "10 fully-funded scholarships for international students",
    meta: "6 min read",
    href: "/resources/scholarships",
    number: "02",
  },
  {
    category: "Settlement",
    title: "First 7 days in London: the only checklist you need",
    meta: "5 min read",
    href: "/resources/first-7-days",
    number: "03",
  },
  {
    category: "Career",
    title: "Graduate Route visa: which jobs actually count",
    meta: "7 min read",
    href: "/resources/graduate-route",
    number: "04",
  },
] as const;

const tools = [
  {
    title: "Budget calculator",
    copy: "Your real monthly cost by city, including the things nobody budgets for.",
    href: "/signup?next=budget-calculator",
    preview: "budget",
  },
  {
    title: "Visa readiness check",
    copy: "See exactly what is missing before your CAS and visa application.",
    href: "/signup?next=visa-checker",
    preview: "visa",
  },
  {
    title: "Downloadable checklists",
    copy: "Packing, documents, and arrival week, synced to your Atlas timeline.",
    href: "/signup?next=checklists",
    preview: "checklist",
  },
] as const;

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ToolPreview({ type }: { type: (typeof tools)[number]["preview"] }) {
  if (type === "budget") {
    return (
      <div
        className="mt-8 border-t border-white/10 pt-5 text-white/65"
        aria-hidden="true"
        data-resource-tool-preview
      >
        <div className="flex items-end justify-between gap-4">
          <span className="text-[10px] uppercase tracking-[.15em]">
            Manchester
          </span>
          <span className="text-xl font-medium tracking-[-.045em] text-white/95">
            £1,480<span className="text-xs text-white/60"> / mo</span>
          </span>
        </div>
        <div className="mt-4 flex h-10 items-end gap-1.5">
          {[44, 68, 36, 52, 28, 46, 62].map((height, index) => (
            <span
              className="flex-1 bg-white/[.09] transition-colors duration-300 group-hover:bg-[#f35a02]/65 group-focus-visible:bg-[#f35a02]/65"
              key={index}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (type === "visa") {
    return (
      <div
        className="mt-8 border-t border-white/10 pt-5 text-white/65"
        aria-hidden="true"
        data-resource-tool-preview
      >
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[.15em]">
          <span>Ready</span>
          <span className="text-white/90">9 / 12</span>
        </div>
        <div className="mt-4 grid grid-cols-12 gap-1">
          {Array.from({ length: 12 }, (_, index) => (
            <span
              className={
                "h-1.5 transition-colors duration-300 " +
                (index < 9
                  ? "bg-white/55 group-hover:bg-[#f35a02] group-focus-visible:bg-[#f35a02]"
                  : "bg-white/10")
              }
              key={index}
            />
          ))}
        </div>
        <p className="mt-4 text-[11px] text-white/68">3 documents still needed</p>
      </div>
    );
  }

  return (
    <div
      className="mt-8 space-y-2 border-t border-white/10 pt-5 text-white/65"
      aria-hidden="true"
      data-resource-tool-preview
    >
      {["Passport and BRP", "Banking documents", "First-week plan"].map(
        (label, index) => (
          <div className="flex items-center gap-2.5" key={label}>
            <span
              className={
                "grid size-3.5 place-items-center border text-[8px] transition-colors duration-300 " +
                (index < 2
                  ? "border-white/35 bg-white/10 text-white/60 group-hover:border-[#f35a02] group-hover:text-[#ff9b62] group-focus-visible:border-[#f35a02] group-focus-visible:text-[#ff9b62]"
                  : "border-white/12 text-transparent")
              }
            >
              ✓
            </span>
            <span className="text-[11px] text-white/68">{label}</span>
          </div>
        ),
      )}
    </div>
  );
}

export function ResourcesSection() {
  return (
    <section
      className="relative overflow-hidden bg-transparent text-white"
      data-atlas-homepage-resources
      id="resources"
    >
      <div className="relative isolate overflow-hidden px-5 pb-24 pt-24 sm:px-8 sm:pb-32 sm:pt-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -bottom-80 -right-56 size-[760px] rounded-full bg-[#f35a02]/10 blur-[180px]" />
        </div>

        <div className="relative mx-auto max-w-[1160px]">
          <HomepageAnimatedTitle
            as="h2"
            className="max-w-[900px] text-[clamp(2.8rem,5vw,5.5rem)] font-semibold leading-[.91] tracking-[-.07em]"
          >
            Resources for the decisions ahead.
          </HomepageAnimatedTitle>

          <div
            className="resource-editorial-enter mt-14 grid gap-8 lg:mt-20 lg:grid-cols-[1.04fr_.96fr] lg:gap-16"
            data-resource-editorial-content
          >
            <a
              className="group relative block min-h-[510px] focus-visible:outline-none sm:min-h-[560px]"
              data-resource-flagship
              href="/resources/uk-2026"
            >
              <span
                aria-hidden="true"
                className="absolute inset-4 translate-x-4 translate-y-4 border border-white/[.06] bg-[#0c0c0f] transition-transform duration-500 ease-out group-hover:translate-x-6 group-hover:translate-y-6 group-focus-visible:translate-x-6 group-focus-visible:translate-y-6 motion-reduce:transform-none motion-reduce:transition-none"
              />
              <span
                aria-hidden="true"
                className="absolute inset-2 translate-x-2 translate-y-2 border border-white/[.08] bg-[#111114] transition-transform duration-500 ease-out group-hover:translate-x-3 group-hover:translate-y-3 group-focus-visible:translate-x-3 group-focus-visible:translate-y-3 motion-reduce:transform-none motion-reduce:transition-none"
              />
              <span className="relative flex min-h-[510px] flex-col overflow-hidden border border-white/[.13] bg-[#101013] p-7 shadow-[0_36px_100px_rgba(0,0,0,.45)] transition-[border-color,transform] duration-500 ease-out group-hover:-translate-y-1 group-hover:border-[#f35a02]/45 group-focus-visible:-translate-y-1 group-focus-visible:border-[#f35a02]/45 motion-reduce:transform-none motion-reduce:transition-none sm:min-h-[560px] sm:p-10">
                <span aria-hidden="true" className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:40px_40px]" />
                <span aria-hidden="true" className="absolute right-0 top-0 h-full w-2 bg-[#f35a02] opacity-75 transition-[width,opacity] duration-500 group-hover:w-3 group-hover:opacity-100 group-focus-visible:w-3 group-focus-visible:opacity-100 motion-reduce:transition-none" />

                <span className="relative flex items-start justify-between gap-5 border-b border-white/10 pb-6">
                  <span className="text-[10px] font-medium uppercase tracking-[.17em] text-white/38">
                    Atlas country guide
                  </span>
                  <span className="font-mono text-[10px] tracking-[.13em] text-[#ff9b62]">
                    2026 / UK
                  </span>
                </span>

                <span className="relative my-auto block py-10">
                  <span className="block font-mono text-[11px] uppercase tracking-[.15em] text-white/30">
                    12 chapters · Kept current
                  </span>
                  <span className="mt-5 block max-w-[520px] text-[clamp(2.15rem,4.4vw,4.25rem)] font-medium leading-[.94] tracking-[-.065em]">
                    The complete UK guide for the 2026 intake.
                  </span>
                  <span className="mt-6 block max-w-[470px] text-sm leading-6 text-white/45 sm:text-base sm:leading-7">
                    From choosing a university to budgeting for your first month. The whole journey, updated as the rules change.
                  </span>
                </span>

                <span className="relative flex items-center justify-between border-t border-white/10 pt-6 text-sm font-medium">
                  <span>Read the guide</span>
                  <Arrow className="size-5 text-[#ff9b62] transition-transform duration-300 group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5 motion-reduce:transform-none motion-reduce:transition-none" />
                </span>
              </span>
            </a>

            <div className="flex flex-col lg:pt-3">
              <div className="flex items-end justify-between border-b border-white/14 pb-5">
                <h3 className="text-xl font-medium tracking-[-.04em] sm:text-2xl">
                  Read before you decide.
                </h3>
                <span className="font-mono text-[9px] uppercase tracking-[.14em] text-white/25">
                  Updated weekly
                </span>
              </div>

              <div className="flex-1">
                {articles.map((article) => (
                  <a
                    className="group grid min-h-[112px] grid-cols-[34px_1fr_22px] items-center gap-3 border-b border-white/[.09] py-5 transition-[background-color,color] duration-300 hover:bg-white/[.025] focus-visible:bg-white/[.025] focus-visible:outline-none motion-reduce:transition-none sm:min-h-[126px] sm:grid-cols-[42px_1fr_24px] sm:gap-4"
                    data-resource-article
                    href={article.href}
                    key={article.title}
                  >
                    <span className="font-mono text-[10px] text-white/20 transition-colors duration-300 group-hover:text-[#ff9b62] group-focus-visible:text-[#ff9b62] motion-reduce:transition-none">
                      {article.number}
                    </span>
                    <span>
                      <span className="block text-[10px] font-medium uppercase tracking-[.14em] text-[#ff8f50]">
                        {article.category}
                      </span>
                      <span className="mt-2 block max-w-[420px] text-[15px] font-medium leading-5 tracking-[-.02em] text-white/78 transition-colors duration-300 group-hover:text-white group-focus-visible:text-white motion-reduce:transition-none sm:text-[17px] sm:leading-6">
                        {article.title}
                      </span>
                      <span className="mt-2 block text-[11px] text-white/25">
                        {article.meta}
                      </span>
                    </span>
                    <Arrow className="size-4 text-white/20 transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-white group-focus-visible:translate-x-1 group-focus-visible:text-white motion-reduce:transform-none motion-reduce:transition-none" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 sm:mt-20">
            <div className="mb-6 flex items-end justify-between gap-6">
              <h3 className="max-w-[520px] text-2xl font-medium leading-tight tracking-[-.045em] sm:text-3xl">
                Tools that do the checking with you.
              </h3>
              <span className="hidden font-mono text-[9px] uppercase tracking-[.14em] text-white/55 sm:block">
                Free with an Atlas account
              </span>
            </div>

            <div className="grid gap-px overflow-hidden border border-white/[.1] bg-white/[.1] lg:grid-cols-3">
              {tools.map((tool, index) => (
                <a
                  className="group relative min-h-[280px] bg-[#0d0d10]/95 p-6 transition-[background-color,transform] duration-300 hover:z-10 hover:-translate-y-1 hover:bg-[#121216] focus-visible:z-10 focus-visible:-translate-y-1 focus-visible:bg-[#121216] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#f35a02] motion-reduce:transform-none motion-reduce:transition-none sm:p-8"
                  data-resource-tool
                  href={tool.href}
                  key={tool.title}
                >
                  <span className="flex items-start justify-between gap-5">
                    <span
                      className="font-mono text-[9px] uppercase tracking-[.15em] text-white/58"
                      data-resource-tool-meta
                    >
                      Tool 0{index + 1}
                    </span>
                    <span
                      className="border border-white/20 px-2 py-1 text-[8px] uppercase tracking-[.1em] text-white/68"
                      data-resource-tool-badge
                    >
                      Free account
                    </span>
                  </span>
                  <span
                    className="mt-7 block text-lg font-medium tracking-[-.035em] text-white/95 sm:text-xl"
                    data-resource-tool-title
                  >
                    {tool.title}
                  </span>
                  <span
                    className="mt-2 block max-w-[310px] text-[13px] leading-5 text-white/70"
                    data-resource-tool-copy
                  >
                    {tool.copy}
                  </span>
                  <ToolPreview type={tool.preview} />
                </a>
              ))}
            </div>
          </div>

          <div
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end"
            data-resource-actions
          >
            <a
              className="group inline-flex min-h-12 items-center justify-center gap-3 border border-white/12 px-6 text-sm font-medium text-white/72 transition-[background-color,border-color,color] duration-300 hover:border-white/24 hover:bg-white/[.04] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white motion-reduce:transition-none"
              href="/resources"
            >
              Browse all resources
              <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none" />
            </a>
            <a
              className="group inline-flex min-h-12 items-center justify-center gap-3 bg-[#f35a02] px-6 text-sm font-semibold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#ff6a19] focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white motion-reduce:transform-none motion-reduce:transition-none"
              href="/signup"
            >
              Unlock the tools - free
              <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none" />
            </a>
          </div>
        </div>

        <style>{`
          @keyframes resourceEditorialEnter {
            from { opacity: 0; transform: translate3d(0, 18px, 0); }
            to { opacity: 1; transform: translate3d(0, 0, 0); }
          }

          .resource-editorial-enter {
            animation: resourceEditorialEnter .7s cubic-bezier(.22, 1, .36, 1) both;
          }

          @media (prefers-reduced-motion: reduce) {
            .resource-editorial-enter { animation: none; }
          }
        `}</style>
      </div>

    </section>
  );
}
