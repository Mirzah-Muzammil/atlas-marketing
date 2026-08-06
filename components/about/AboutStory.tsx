"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import HomepageAnimatedTitle from "@/components/homepage/HomepageAnimatedTitle";

const team = [
  {
    initials: "HH",
    name: "Harman Hora",
    role: "Founder & CEO",
    copy: "Six years working with international students before deciding the model needed rebuilding from the ground up.",
    image: "/images/about/team-placeholder.svg",
  },
  {
    initials: "PA",
    name: "Priya Anand",
    role: "Head of Operations",
    copy: "Leads specialist delivery and keeps student outcomes ahead of commission incentives.",
    image: "/images/about/team-placeholder.svg",
  },
  {
    initials: "RM",
    name: "Rohit Menon",
    role: "Lead Engineer",
    copy: "Builds the product infrastructure that keeps an entire student journey in one place.",
    image: "/images/about/team-placeholder.svg",
  },
  {
    initials: "SK",
    name: "Saanvi Krishnan",
    role: "Head of Partnerships",
    copy: "Makes every partnership, fee, and recommendation easy to understand before a student chooses.",
    image: "/images/about/team-placeholder.svg",
  },
  {
    initials: "AT",
    name: "Arjun Tahiliani",
    role: "Editor, Resources",
    copy: "Builds guides and country research for the decisions students make before and after they move.",
    image: "/images/about/team-placeholder.svg",
  },
] as const;

const numbers = [
  { label: "In the field", value: "6 yrs", copy: "Working with international students", color: "#d8df3d" },
  { label: "Network reach", value: "14,000+", copy: "Verified Indian students and alumni", color: "#71afa3" },
  { label: "Universities", value: "120+", copy: "UK institutions covered", color: "#d98a72" },
  { label: "Commissions taken", value: "£0", copy: "From any university, ever", color: "#967244" },
  { label: "Cost to use the OS", value: "Free", copy: "End to end, forever", color: "#a990cf" },
] as const;

const founderQuote =
  "I started Atlas after watching someone close to me pay too much, get matched to the wrong course, and lose support the moment she landed. The problem was not one bad agent. The whole model rewards the wrong behaviour.”";

const horizons = [
  {
    timing: "Now",
    title: "UK, end to end.",
    copy: "The complete free system for students moving to the UK, plus Concierge support for moments that need a specialist.",
    items: ["Full UK route", "Concierge support", "UK country guides"],
    image: "/images/about/hero-study-together.jpg",
    alt: "Students studying together in a library",
  },
  {
    timing: "Next 12 months",
    title: "Ireland. Canada. Germany.",
    copy: "The next highest-volume destinations for Indian students, each with local services, specialist knowledge, and guides.",
    items: ["Country-specific services", "Dedicated specialists", "Expanded resource library"],
    image: "/images/about/hero-library.jpg",
    alt: "Students working quietly in a library",
  },
  {
    timing: "2 to 5 years",
    title: "The default OS. Anywhere.",
    copy: "Wherever an Indian student goes, the system should already know the move, the services, and the people who can help.",
    items: ["More destinations", "Alumni-to-applicant flows", "Portable student profile"],
    image: "/images/about/hero-study-solo.jpg",
    alt: "Student studying independently with a laptop",
  },
] as const;

export function AboutStory() {
  const [activeMemberName, setActiveMemberName] = useState<(typeof team)[number]["name"]>(team[0].name);
  const [founderNoteVisible, setFounderNoteVisible] = useState(false);
  const activeMember = team.find((member) => member.name === activeMemberName) ?? team[0];
  const memberRefs = useRef<Record<string, HTMLElement | null>>({});
  const galleryRef = useRef<HTMLDivElement>(null);
  const founderNoteRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    const member = memberRefs.current[activeMemberName];
    if (!gallery || !member) return;

    gallery.scrollTo({
      behavior: "smooth",
      left: Math.max(member.offsetLeft - gallery.offsetLeft, 0),
    });
  }, [activeMemberName]);

  useEffect(() => {
    const section = founderNoteRef.current;
    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      setFounderNoteVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setFounderNoteVisible(true);
        observer.disconnect();
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const selectMember = (memberName: (typeof team)[number]["name"]) => {
    setActiveMemberName(memberName);
  };

  return (
    <>
      <section className="border-t border-white/[.1] px-5 py-24 text-white sm:px-8 sm:py-32" id="team">
        <div className="mx-auto max-w-[1240px]">
          <header className="mx-auto max-w-[770px]">
            <HomepageAnimatedTitle
              as="h2"
              className="text-balance text-[clamp(2.3rem,3.35vw,3.35rem)] font-medium leading-[.98] tracking-[-.06em]"
            >
              A small team in London.
            </HomepageAnimatedTitle>
            <HomepageAnimatedTitle
              as="p"
              className="atlas-homepage-title-3d mt-2 max-w-[40rem] text-pretty text-[clamp(1.45rem,2.15vw,2rem)] leading-[1.08] tracking-[-.045em] text-white/48"
            >
              Six people, all in. Our backgrounds span higher education, product,
              engineering, operations, and journalism.
            </HomepageAnimatedTitle>
          </header>

          <div className="mt-14 grid gap-7 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-12">
            <div aria-label="Atlas team" className="space-y-2" role="tablist">
              {team.map((member) => {
                const isActive = member.name === activeMember.name;

                return (
                  <button
                    aria-selected={isActive}
                    className={`flex w-full items-center gap-3 text-left text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f35a02] ${
                      isActive ? "text-white" : "text-white/40 hover:text-white/70"
                    }`}
                    key={member.name}
                    onClick={() => selectMember(member.name)}
                    role="tab"
                    type="button"
                  >
                    <span
                      aria-hidden="true"
                      className={`size-2 rounded-full border ${
                        isActive ? "border-[#f35a02] bg-[#f35a02]" : "border-white/35"
                      }`}
                    />
                    {member.name}
                  </button>
                );
              })}
            </div>

            <div
              className="flex snap-x gap-px overflow-x-auto border border-white/[.12] bg-white/[.12] pb-px [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              data-about-team-gallery
              ref={galleryRef}
            >
              {team.map((member) => {
                const isActive = member.name === activeMember.name;

                return (
                  <article
                    className={`group relative min-h-[460px] shrink-0 snap-start overflow-hidden bg-[#101012] transition-[flex-basis] duration-500 ease-out motion-reduce:transition-none sm:min-h-[560px] ${
                      isActive ? "basis-[min(78vw,460px)]" : "basis-[min(52vw,310px)]"
                    }`}
                    data-about-team-member-active={isActive || undefined}
                    key={member.name}
                    ref={(node) => {
                      memberRefs.current[member.name] = node;
                    }}
                  >
                    <Image
                      alt={`Placeholder portrait for ${member.name}`}
                      className="object-cover opacity-80 transition-transform duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      fill
                      sizes={isActive ? "(min-width: 1024px) 38vw, 78vw" : "(min-width: 1024px) 25vw, 52vw"}
                      src={member.image}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(5,5,6,.96))] px-6 pb-6 pt-28">
                      <h3 className="text-[clamp(1.1rem,1.45vw,1.35rem)] font-medium leading-none tracking-[-.04em] text-white">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-sm leading-5 text-white/56">{member.role}</p>
                      {isActive ? (
                        <p className="mt-5 max-w-[28rem] text-sm leading-6 text-white/64">{member.copy}</p>
                      ) : null}
                    </div>
                  </article>
                );
              })}
              <div
                aria-hidden="true"
                className="min-h-px shrink-0 basis-[min(78vw,460px)]"
                data-about-team-carousel-tail
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[.1] bg-white/[.018] px-5 py-24 text-white sm:px-8 sm:py-32" id="numbers">
        <div className="mx-auto max-w-[1240px]" data-about-proof-ledger>
          <dl className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-10">
            {numbers.map((stat) => {
              const isCompactValue = stat.value.length > 5;

              return (
                <div
                  className="group relative flex min-h-[220px] flex-col items-center justify-end overflow-hidden py-2 text-center lg:min-h-[250px]"
                  data-about-proof-item
                  key={stat.label}
                >
                  <dd
                    className={`pointer-events-none absolute left-1/2 top-0 w-max max-w-full -translate-x-1/2 select-none whitespace-nowrap font-semibold leading-[.78] tracking-[-.1em] transition-transform duration-500 ease-out group-hover:-translate-y-1 motion-reduce:transition-none ${
                      isCompactValue
                        ? "text-[clamp(3rem,3.15vw,3.55rem)]"
                        : "text-[clamp(4.8rem,7.6vw,8.25rem)]"
                    }`}
                    data-about-number-size={isCompactValue ? "compact" : "standard"}
                    data-about-number-stat
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </dd>
                <div className="relative flex flex-col items-center pt-24">
                  <dt className="text-[clamp(1.2rem,1.7vw,1.55rem)] font-medium leading-none tracking-[-.045em] text-white">
                    {stat.label}
                  </dt>
                  <p className="mt-3 max-w-[17rem] text-sm leading-6 text-white/56 sm:text-base">{stat.copy}</p>
                </div>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      <section
        className="border-t border-white/[.1] px-5 py-16 text-white sm:px-8 lg:h-[calc(100svh-5rem)] lg:py-10"
        data-about-horizons-editorial
        id="vision"
      >
        <div className="mx-auto flex h-full max-w-[1240px] flex-col">
          <header className="mx-auto mb-8 max-w-[680px] text-center lg:mb-6">
            <HomepageAnimatedTitle
              as="h2"
              className="text-balance text-[clamp(2rem,3vw,3.15rem)] font-medium leading-[.98] tracking-[-.06em]"
            >
              The default OS for going abroad.
            </HomepageAnimatedTitle>
            <HomepageAnimatedTitle
              as="p"
              className="atlas-homepage-title-3d mx-auto mt-3 max-w-[38rem] text-pretty text-sm leading-6 text-white/56 sm:text-base"
            >
              Three honest horizons. We will not claim ground we have not taken, and we
              will not pretend it happens overnight.
            </HomepageAnimatedTitle>
          </header>

          <div className="grid flex-1 grid-rows-3 border-t border-white/[.12]">
            {horizons.map((horizon, index) => {
              const imageOnRight = index % 2 === 1;

              return (
                <article
                  className={`grid min-h-[255px] grid-cols-1 lg:min-h-0 lg:grid-cols-2 ${
                    index === horizons.length - 1 ? "" : "border-b border-white/[.12]"
                  }`}
                  data-about-horizon-editorial
                  key={horizon.title}
                >
                  <figure
                    className={`relative min-h-[140px] overflow-hidden bg-[#101012] lg:min-h-0 ${
                      imageOnRight ? "lg:order-2" : ""
                    }`}
                    data-about-horizon-image
                  >
                    <Image
                      alt={horizon.alt}
                      className="object-cover saturate-[.72]"
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      src={horizon.image}
                    />
                  </figure>
                  <div className="flex min-h-0 flex-col justify-center px-6 py-7 sm:px-10 lg:px-12 lg:py-5">
                    <p
                      className="font-mono text-[10px] uppercase tracking-[.14em] text-white"
                      data-about-horizon-timing
                    >
                      {horizon.timing}
                    </p>
                    <h3 className="mt-3 text-[clamp(1.35rem,2vw,2rem)] font-medium leading-[.98] tracking-[-.055em] text-white">
                      {horizon.title}
                    </h3>
                    <p className="mt-3 max-w-[29rem] text-sm leading-5 text-white/56">{horizon.copy}</p>
                    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs leading-5 text-white/70">
                      {horizon.items.map((item) => (
                        <li className="flex items-center gap-2" key={item}>
                          <span aria-hidden="true" className="size-1 shrink-0 rounded-full bg-[#f35a02]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="flex min-h-[80svh] items-center border-y border-white/[.1] bg-white/[.018] px-5 py-24 text-center text-white sm:px-8 sm:py-32"
        data-about-founder-reveal-trigger="viewport-center"
        id="founder-note"
        ref={founderNoteRef}
      >
        <div className="mx-auto max-w-[920px]">
          <span aria-hidden="true" className="font-serif text-[7rem] leading-none text-[#f35a02]/40 sm:text-[10rem]">“</span>
          <blockquote
            aria-label={founderQuote}
            className="-mt-12 text-balance text-[clamp(1.8rem,3.25vw,3.65rem)] font-medium leading-[1.1] tracking-[-.055em] text-white/88 sm:-mt-16"
            data-about-founder-reveal
          >
            <span aria-hidden="true">
              {Array.from(founderQuote).map((character, index) => (
                <span
                  className={`about-founder-letter ${
                    character === " " ? "about-founder-letter-space" : ""
                  } ${founderNoteVisible ? "about-founder-letter-visible" : ""}`}
                  data-about-founder-letter
                  key={`${character}-${index}`}
                  style={{ animationDelay: `${index * 14}ms` }}
                >
                  {character}
                </span>
              ))}
            </span>
          </blockquote>
          <p className="mx-auto mt-8 max-w-[44rem] text-pretty text-base leading-7 text-white/56 sm:text-lg">
            The answer is not another agent. It is a transparent system that students can
            use for free, with paid specialist help only when human expertise adds real value.
          </p>
          <footer className="mx-auto mt-10 flex max-w-[44rem] items-center justify-center gap-4 border-t border-white/[.1] pt-5">
            <span
              className="relative size-11 shrink-0 overflow-hidden rounded-full border border-white/[.16] bg-[#171719]"
              data-about-founder-avatar
            >
              <Image
                alt="Placeholder portrait for Harman Hora"
                className="object-cover"
                fill
                sizes="44px"
                src="/images/about/team-placeholder.svg"
              />
            </span>
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
