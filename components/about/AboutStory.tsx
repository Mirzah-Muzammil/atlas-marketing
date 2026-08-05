import HomepageAnimatedTitle from "@/components/homepage/HomepageAnimatedTitle";

const team = [
  {
    initials: "HH",
    name: "Harman Hora",
    role: "Founder & CEO",
    copy: "Six years working with international students before deciding the model needed rebuilding from the ground up.",
  },
  {
    initials: "PA",
    name: "Priya Anand",
    role: "Head of Operations",
    copy: "Leads specialist delivery and keeps student outcomes ahead of commission incentives.",
  },
  {
    initials: "RM",
    name: "Rohit Menon",
    role: "Lead Engineer",
    copy: "Builds the product infrastructure that keeps an entire student journey in one place.",
  },
  {
    initials: "SK",
    name: "Saanvi Krishnan",
    role: "Head of Partnerships",
    copy: "Makes every partnership, fee, and recommendation easy to understand before a student chooses.",
  },
  {
    initials: "AT",
    name: "Arjun Tahiliani",
    role: "Editor, Resources",
    copy: "Builds guides and country research for the decisions students make before and after they move.",
  },
] as const;

const numbers = [
  { label: "In the field", value: "6 yrs", copy: "Working with international students" },
  { label: "Network reach", value: "14,000+", copy: "Verified Indian students and alumni" },
  { label: "Universities", value: "120+", copy: "UK institutions covered" },
  { label: "Commissions taken", value: "£0", copy: "From any university, ever" },
  { label: "Cost to use the OS", value: "Free", copy: "End to end, forever" },
] as const;

const horizons = [
  {
    number: "01",
    timing: "Now",
    title: "UK, end to end.",
    copy: "The complete free system for students moving to the UK, plus Concierge support for moments that need a specialist.",
    items: ["Full UK route", "Concierge support", "UK country guides"],
  },
  {
    number: "02",
    timing: "Next 12 months",
    title: "Ireland. Canada. Germany.",
    copy: "The next highest-volume destinations for Indian students, each with local services, specialist knowledge, and guides.",
    items: ["Country-specific services", "Dedicated specialists", "Expanded resource library"],
  },
  {
    number: "03",
    timing: "2 to 5 years",
    title: "The default OS. Anywhere.",
    copy: "Wherever an Indian student goes, the system should already know the move, the services, and the people who can help.",
    items: ["More destinations", "Alumni-to-applicant flows", "Portable student profile"],
  },
] as const;

export function AboutStory() {
  return (
    <>
      <section className="border-t border-white/[.1] px-5 py-24 text-white sm:px-8 sm:py-32" id="team">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-end lg:gap-20">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#f35a02]">The team</p>
              <HomepageAnimatedTitle
                as="h2"
                className="mt-6 text-balance text-[clamp(2.8rem,4.5vw,5.15rem)] font-semibold leading-[.91] tracking-[-.07em]"
              >
                A small team in London.
              </HomepageAnimatedTitle>
            </div>
            <HomepageAnimatedTitle
              as="p"
              className="atlas-homepage-title-3d max-w-[36rem] text-pretty text-base leading-7 text-white/60 sm:text-lg"
            >
              Six people, all in. Our backgrounds span higher education, product,
              engineering, operations, and journalism. Most of us have been an
              international student, an agent&apos;s customer, or both.
            </HomepageAnimatedTitle>
          </div>

          <div className="mt-14 grid border-l border-t border-white/[.12] sm:grid-cols-2 lg:grid-cols-5">
            {team.map((member) => (
              <article className="min-h-[235px] border-b border-r border-white/[.12] p-6" key={member.name}>
                <span className="grid size-10 place-items-center border border-[#f35a02]/40 bg-[#f35a02]/10 font-mono text-[11px] tracking-[.1em] text-[#ff9a5f]">
                  {member.initials}
                </span>
                <h3 className="mt-10 text-lg font-medium tracking-[-.04em] text-white">{member.name}</h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[.14em] text-[#f35a02]">{member.role}</p>
                <p className="mt-5 text-sm leading-6 text-white/50">{member.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/[.1] bg-white/[.018] px-5 py-20 text-white sm:px-8 sm:py-24" id="numbers">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#f35a02]">By the numbers</p>
              <HomepageAnimatedTitle
                as="h2"
                className="mt-5 text-balance text-[clamp(2.2rem,3.8vw,4rem)] font-semibold leading-[.93] tracking-[-.065em]"
              >
                Concrete things, honestly counted.
              </HomepageAnimatedTitle>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[.15em] text-white/38">Updated August 2026</p>
          </div>

          <dl className="mt-12 grid border-l border-t border-white/[.12] sm:grid-cols-2 lg:grid-cols-5">
            {numbers.map((stat) => (
              <div className="min-h-[168px] border-b border-r border-white/[.12] p-6" key={stat.label}>
                <dt className="font-mono text-[10px] uppercase tracking-[.14em] text-white/42">{stat.label}</dt>
                <dd className="mt-8 text-[clamp(2rem,3vw,3rem)] font-semibold leading-none tracking-[-.06em] text-[#f35a02]">
                  {stat.value}
                </dd>
                <p className="mt-3 text-sm leading-5 text-white/52">{stat.copy}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-white/[.1] px-5 py-24 text-white sm:px-8 sm:py-32" id="vision">
        <div className="mx-auto max-w-[1240px]">
          <header className="mx-auto max-w-[720px] text-center">
            <p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#f35a02]">Where we&apos;re going</p>
            <HomepageAnimatedTitle
              as="h2"
              className="mt-6 text-balance text-[clamp(2.8rem,4.5vw,5.15rem)] font-semibold leading-[.91] tracking-[-.07em]"
            >
              The default OS for going abroad.
            </HomepageAnimatedTitle>
            <HomepageAnimatedTitle
              as="p"
              className="atlas-homepage-title-3d mx-auto mt-6 max-w-[38rem] text-pretty text-base leading-7 text-white/60 sm:text-lg"
            >
              Three honest horizons. We will not claim ground we have not taken, and we
              will not pretend it happens overnight.
            </HomepageAnimatedTitle>
          </header>

          <div className="mt-14 grid border-l border-t border-white/[.12] lg:grid-cols-3">
            {horizons.map((horizon) => (
              <article className="min-h-[360px] border-b border-r border-white/[.12] p-7 sm:p-8" key={horizon.number}>
                <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[.14em]">
                  <span className="text-[#f35a02]">Horizon {horizon.number}</span>
                  <span className="text-white/40">{horizon.timing}</span>
                </div>
                <h3 className="mt-12 text-[clamp(1.8rem,2.8vw,2.5rem)] font-medium leading-[.96] tracking-[-.055em] text-white">
                  {horizon.title}
                </h3>
                <p className="mt-5 max-w-[25rem] text-sm leading-6 text-white/56">{horizon.copy}</p>
                <ul className="mt-8 space-y-3 border-t border-white/[.1] pt-5 text-sm leading-5 text-white/72">
                  {horizon.items.map((item) => (
                    <li className="flex gap-3" key={item}>
                      <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-[#f35a02]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[.1] bg-white/[.018] px-5 py-24 text-white sm:px-8 sm:py-32" id="founder-note">
        <div className="mx-auto max-w-[920px]">
          <span aria-hidden="true" className="font-serif text-[7rem] leading-none text-[#f35a02]/40 sm:text-[10rem]">“</span>
          <blockquote className="-mt-12 text-balance text-[clamp(1.8rem,3.25vw,3.65rem)] font-medium leading-[1.1] tracking-[-.055em] text-white/88 sm:-mt-16">
            I started Atlas after watching someone close to me pay too much, get matched to
            the wrong course, and lose support the moment she landed. The problem was not
            one bad agent. The whole model rewards the wrong behaviour.
          </blockquote>
          <p className="mt-8 max-w-[44rem] text-pretty text-base leading-7 text-white/56 sm:text-lg">
            The answer is not another agent. It is a transparent system that students can
            use for free, with paid specialist help only when human expertise adds real value.
          </p>
          <footer className="mt-10 flex items-center gap-4 border-t border-white/[.1] pt-5">
            <span className="grid size-11 place-items-center border border-[#f35a02]/40 bg-[#f35a02]/10 font-mono text-xs font-medium text-[#ff9a5f]">HH</span>
            <div>
              <p className="text-sm font-semibold text-white">Harman Hora</p>
              <p className="mt-0.5 text-xs text-white/46">Founder & CEO, Atlas</p>
            </div>
          </footer>
        </div>
      </section>
    </>
  );
}
