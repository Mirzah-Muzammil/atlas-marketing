import HomepageAnimatedTitle from "@/components/homepage/HomepageAnimatedTitle";
import styles from "./FreeProductSection.module.css";

const productStories = [
  {
    id: "careers",
    label: "Careers & jobs",
    title: "Roles that actually sponsor.",
    copy: "Atlas shows sponsorship and Graduate Route fit before you apply, so you can focus on roles that can genuinely work for you.",
    points: [
      "Filter by sponsorship, salary, and visa route",
      "See employers that hire international graduates",
    ],
  },
  {
    id: "events",
    label: "Events",
    title: "What’s happening around you",
    copy: "Find useful briefings, city meetups, employer sessions, and university events matched to your plans.",
    points: [
      "Matched to your city, university, and intake",
      "Online before you fly, in person after you land",
    ],
  },
  {
    id: "community",
    label: "Community",
    title: "Ask someone who’s already there.",
    copy: "Join course and city groups where current students can answer the questions only experience teaches.",
    points: [
      "Matched to your course, city, and intake",
      "Real accounts from verified students",
    ],
  },
] as const;

function CareersPreview() {
  const jobs = [
    {
      brand: "N",
      brandClass: "bg-[#6448e8]",
      role: "Graduate Software Engineer",
      meta: "London · £38–45k",
      badge: "Sponsors visa",
      badgeClass: "border-emerald-300/20 bg-emerald-300/10 text-emerald-200",
    },
    {
      brand: "M",
      brandClass: "bg-[#087f75]",
      role: "Data Analyst, Consumer Insights",
      meta: "Manchester · £32–36k",
      badge: "Graduate Route",
      badgeClass: "border-[#ff9e67]/20 bg-[#f35a02]/10 text-[#ffb187]",
    },
    {
      brand: "A",
      brandClass: "bg-[#9f244c]",
      role: "Marketing Executive",
      meta: "Birmingham · £28–31k",
      badge: "Sponsors visa",
      badgeClass: "border-emerald-300/20 bg-emerald-300/10 text-emerald-200",
    },
  ] as const;

  return (
    <div className="relative flex h-full flex-col justify-center gap-3 px-4 py-8 sm:px-7">
      <div className="mb-2 flex items-center justify-between px-1 text-[11px] uppercase tracking-[.13em] text-white/35">
        <span>Recommended for you</span>
        <span>12 roles</span>
      </div>
      {jobs.map((job, index) => (
        <div
          className={`${styles.jobRow} flex items-center justify-between gap-3 rounded-[13px] border border-white/[.075] bg-white/[.045] px-3.5 py-3.5 shadow-[inset_0_1px_rgba(255,255,255,.035)] sm:px-4`}
          key={job.role}
          style={{ animationDelay: `${index * -1.8}s` }}
        >
          <div className="flex min-w-0 items-center gap-3">
            <span
              className={`${job.brandClass} grid size-9 shrink-0 place-items-center rounded-[9px] text-[12px] font-semibold text-white shadow-lg`}
            >
              {job.brand}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-medium text-white/90 sm:text-sm">
                {job.role}
              </span>
              <span className="mt-0.5 block text-[11px] text-white/38 sm:text-xs">
                {job.meta}
              </span>
            </span>
          </div>
          <span
            className={`${job.badgeClass} hidden shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-medium sm:block`}
          >
            {job.badge}
          </span>
        </div>
      ))}
    </div>
  );
}

function EventsPreview() {
  const events = [
    {
      day: "14",
      month: "AUG",
      title: "UK pre-departure briefing",
      meta: "Online · 1,200 going",
    },
    {
      day: "02",
      month: "SEP",
      title: "Freshers’ meetup, London",
      meta: "Shoreditch · in person",
    },
    {
      day: "09",
      month: "SEP",
      title: "Ask a second-year: live Q&A",
      meta: "Online · free",
    },
  ] as const;

  return (
    <div className="relative flex h-full flex-col justify-center px-5 py-8 sm:px-8">
      <div className="absolute bottom-12 left-[54px] top-12 w-px bg-white/[.08] sm:left-[70px]" />
      <div className="space-y-3.5">
        {events.map((event, index) => (
          <div
            className={`${styles.eventRow} relative flex items-center gap-4 rounded-[14px] border border-white/[.075] bg-white/[.04] p-3.5 pr-5 shadow-[inset_0_1px_rgba(255,255,255,.035)]`}
            key={event.title}
            style={{ animationDelay: `${index * -2.4}s` }}
          >
            <span className="relative z-10 grid size-[52px] shrink-0 place-items-center rounded-[11px] border border-white/10 bg-[#101014] text-center shadow-[0_8px_24px_rgba(0,0,0,.3)]">
              <span>
                <span className="block text-base font-medium leading-none text-white/90">
                  {event.day}
                </span>
                <span className="mt-1 block text-[9px] tracking-[.13em] text-white/38">
                  {event.month}
                </span>
              </span>
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-medium text-white/90 sm:text-sm">
                {event.title}
              </span>
              <span className="mt-1 flex items-center gap-1.5 text-[11px] text-white/38 sm:text-xs">
                {index !== 1 && (
                  <span className={`${styles.liveDot} size-1.5 rounded-full bg-emerald-300`} />
                )}
                {event.meta}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommunityPreview() {
  return (
    <div className="relative flex h-full flex-col justify-center gap-5 px-5 py-9 sm:px-8">
      <div className={`${styles.message} flex items-start gap-3`}>
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#7150de] text-[11px] font-semibold text-white">
          P
        </span>
        <span className="min-w-0">
          <span className="mb-1.5 block text-[11px] font-medium text-white/60">
            Priya <span className="font-normal text-white/28">· arriving September</span>
          </span>
          <span className="block rounded-[5px_15px_15px_15px] border border-white/[.07] bg-white/[.055] px-4 py-3 text-[12px] leading-[1.55] text-white/68 sm:text-[13px]">
            Should I arrange housing before I fly to Leeds, or view it after I land?
          </span>
        </span>
      </div>
      <div
        className={`${styles.message} ml-8 flex items-start gap-3 sm:ml-14`}
        style={{ animationDelay: "-4.5s" }}
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#148276] text-[11px] font-semibold text-white">
          K
        </span>
        <span className="min-w-0">
          <span className="mb-1.5 block text-[11px] font-medium text-white/60">
            Karan <span className="font-normal text-white/28">· second year, Leeds</span>
          </span>
          <span className="block rounded-[5px_15px_15px_15px] border border-white/[.07] bg-white/[.055] px-4 py-3 text-[12px] leading-[1.55] text-white/68 sm:text-[13px]">
            Book two temporary weeks, then view in person. I’ll send you the checklist I used.
          </span>
        </span>
      </div>
      <div className={`${styles.typing} ml-[84px] flex w-fit gap-1 rounded-full border border-white/[.07] bg-white/[.045] px-3 py-2`}>
        <span className="size-1 rounded-full bg-white/45" />
        <span className="size-1 rounded-full bg-white/45" />
        <span className="size-1 rounded-full bg-white/45" />
      </div>
    </div>
  );
}

function ProductPreview({ id }: { id: (typeof productStories)[number]["id"] }) {
  const labels = {
    careers: "Atlas jobs board showing roles with visa sponsorship",
    events: "Upcoming Atlas events matched to a student’s plans",
    community: "Atlas community conversation between new and current students",
  } as const;

  return (
    <div
      aria-label={labels[id]}
      className="relative min-h-[330px] overflow-hidden rounded-[20px] border border-white/[.11] bg-white/[.045] shadow-[inset_0_1px_rgba(255,255,255,.06),0_32px_90px_rgba(0,0,0,.32)] backdrop-blur-xl sm:min-h-[370px]"
      data-free-product-motion
      data-free-product-preview={id}
      role="img"
    >
      <div aria-hidden="true" className="absolute inset-0">
        <div className={`${styles.previewGlow} absolute -right-24 -top-28 size-[330px] rounded-full bg-[#f35a02]/[.13] blur-[80px]`} />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,.045),transparent_42%)]" />
        <div className={`${styles.glassSweep} absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/[.045] to-transparent`} />
      </div>
      <div aria-hidden="true" className="relative h-full min-h-[330px] sm:min-h-[370px]">
        {id === "careers" && <CareersPreview />}
        {id === "events" && <EventsPreview />}
        {id === "community" && <CommunityPreview />}
      </div>
    </div>
  );
}

export function FreeProductSection() {
  return (
    <section
      className="relative isolate overflow-hidden border-y border-white/[.07] bg-transparent px-5 py-24 text-white sm:px-8 sm:py-32"
      data-atlas-homepage-free-product
      data-orange-origin="right"
      id="free-with-atlas"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-[22%] top-[8%] h-[84%] w-[72%] rounded-[50%] bg-[#f35a02]/15 blur-[135px]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#050506_0%,rgba(5,5,6,.9)_36%,rgba(5,5,6,.48)_72%,rgba(5,5,6,.76)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-[1160px]">
        <HomepageAnimatedTitle
          as="h2"
          className="mx-auto max-w-[940px] text-center text-[clamp(2.7rem,4.4vw,4.6rem)] font-medium leading-[.95] tracking-[-.062em]"
        >
          Free with Atlas. Built for everything after the offer.
        </HomepageAnimatedTitle>

        <div className="mt-20 space-y-24 sm:mt-28 sm:space-y-32">
          {productStories.map((product, index) => (
            <article
              className="grid items-center gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-20"
              data-free-product-card
              key={product.id}
            >
              <div className={index === 1 ? "lg:order-2" : undefined}>
                <h3
                  className="max-w-[520px] text-[clamp(2.5rem,4vw,4rem)] font-medium leading-[.95] tracking-[-.06em] text-white"
                  data-free-product-heading
                >
                  {product.label}
                </h3>
                <p
                  className="mt-4 max-w-[520px] text-[clamp(1.2rem,1.7vw,1.55rem)] font-medium leading-[1.15] tracking-[-.035em] text-white/68"
                  data-free-product-subheading
                >
                  {product.title}
                </p>
                <p className="mt-5 max-w-[470px] text-[15px] leading-7 text-white/50 sm:text-base">
                  {product.copy}
                </p>
                <ul className="mt-7 space-y-3 text-[13px] text-white/58 sm:text-sm">
                  {product.points.map((point) => (
                    <li className="flex items-start gap-3" key={point}>
                      <span className="mt-[9px] h-px w-4 shrink-0 bg-white/35" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={index === 1 ? "lg:order-1" : undefined}>
                <ProductPreview id={product.id} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
