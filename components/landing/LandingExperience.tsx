"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CircleDollarSign,
  Clock3,
  Compass,
  FileCheck2,
  GraduationCap,
  Home,
  Landmark,
  MessageCircle,
  Menu,
  Plane,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  X,
} from "lucide-react";

import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { HeroRibbonCursor } from "@/components/landing/HeroRibbonCursor";

const getStartedHref = "mailto:hello@atlas.study?subject=Atlas%20early%20access";
const conciergeHref = "mailto:hello@atlas.study?subject=Atlas%20Concierge";

const chapters = [
  {
    id: "plan",
    number: "01",
    kicker: "Before the offer",
    title: "Plan & apply",
    copy: "Match universities, track applications, secure your visa, and keep scholarships and documents in one place.",
    items: ["University Matcher", "Applications", "Visa checklist", "Scholarships"],
  },
  {
    id: "settle",
    number: "02",
    kicker: "Before the flight",
    title: "Arrive & settle",
    copy: "Banking, SIM, insurance, housing, forex, loans, and tax - sorted in the order you need them.",
    items: ["Banking", "Housing", "SIM & eSIM", "Insurance"],
  },
  {
    id: "thrive",
    number: "03",
    kicker: "After you land",
    title: "Build & thrive",
    copy: "Jobs, community, events, career tools, and Graduate Route guidance stay with you after arrival.",
    items: ["Career hub", "Community", "Events", "Graduate Route"],
  },
] as const;

const services = [
  {
    id: "sim",
    name: "SIM & eSIM",
    number: "01",
    copy: "A pre-activated UK eSIM that works the moment you land.",
    note: "80GB data · unlimited UK calls",
    icon: Smartphone,
  },
  {
    id: "banking",
    name: "Banking",
    number: "02",
    copy: "Open a student-ready account without waiting for move-in week.",
    note: "Open before your flight",
    icon: Landmark,
  },
  {
    id: "housing",
    name: "Housing",
    number: "03",
    copy: "Find vetted accommodation and avoid the scams students are warned about too late.",
    note: "Verified options · plain-English terms",
    icon: Home,
  },
  {
    id: "insurance",
    name: "Insurance",
    number: "04",
    copy: "Health and travel cover explained in plain English.",
    note: "Health + travel · 12 months",
    icon: ShieldCheck,
  },
  {
    id: "forex",
    name: "Forex",
    number: "05",
    copy: "Move tuition and living money with transparent rates and fees.",
    note: "Mid-market rates · no hidden spread",
    icon: CircleDollarSign,
  },
  {
    id: "loans",
    name: "Loans",
    number: "06",
    copy: "Compare funding for your course and know when a loan is poor value.",
    note: "Course-specific funding",
    icon: GraduationCap,
  },
  {
    id: "tax",
    name: "Tax filing",
    number: "07",
    copy: "Understand your first UK tax year and what changes after graduation.",
    note: "Student-to-graduate guidance",
    icon: FileCheck2,
  },
  {
    id: "visa",
    name: "Visas",
    number: "08",
    copy: "Keep the documents, funds, and deadlines that make the sequence real.",
    note: "Checklist · funds · deadlines",
    icon: Plane,
  },
] as const;

const faqs = [
  {
    question: "Is it really free?",
    answer:
      "Yes. Matcher, Essentials, Profile, Community, Events, and Career cost nothing to use. Concierge is a separate paid service for students who want a human specialist to run the journey with them.",
  },
  {
    question: "How do you make money?",
    answer:
      "When you choose an Essentials partner, that partner may pay Atlas a referral fee. We disclose it on the card. Concierge has one published price. We do not take secret university kickbacks or mark up partner prices.",
  },
  {
    question: "What about after I land - does Atlas stop?",
    answer:
      "No. Jobs, community, events, year-round services, tax, second-year housing, and Graduate Route guidance are the part Atlas is specifically built to keep covering.",
  },
  {
    question: "Where are you based, and who runs this?",
    answer:
      "Atlas is built in London by a team with six years of experience working with international students, universities, employers, the British Council, and the UK government.",
  },
  {
    question: "What's the catch?",
    answer:
      "There is not one. The model works when useful partners earn genuine student trust. If an offer stops being good for students, it stops belonging in Atlas.",
  },
] as const;

function AtlasMark() {
  return (
    <span aria-hidden="true" className="land-mark">
      <span />
      <span />
    </span>
  );
}

export function LandingExperience() {
  const scope = useRef<HTMLDivElement>(null);
  const serviceFocus = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeServiceId, setActiveServiceId] =
    useState<(typeof services)[number]["id"]>("sim");
  const [menuOpen, setMenuOpen] = useState(false);
  const [constellationOpen, setConstellationOpen] = useState(false);
  const [stampOpen, setStampOpen] = useState(false);
  const [stampRotation, setStampRotation] = useState(-7);
  const activeService = services.find((service) => service.id === activeServiceId) ?? services[0];
  const ActiveServiceIcon = activeService.icon;

  useEffect(() => {
    let sequence = "";
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches?.("input, textarea, select, [contenteditable='true']")) return;

      sequence = `${sequence}${event.key.toUpperCase()}`.slice(-5);
      if (sequence === "ATLAS") setConstellationOpen(true);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useGsapContext(
    scope,
    ({ gsap, ScrollTrigger }) => {
      if (prefersReducedMotion) return;

      const nav = scope.current?.querySelector(".land-nav");
      const product = scope.current?.querySelector<HTMLElement>(".land-product");
      gsap.from("[data-land-hero-line]", {
        yPercent: 112,
        rotate: 1.5,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
      });
      gsap.from("[data-land-hero-card]", {
        y: 90,
        scale: 0.9,
        rotate: -2,
        opacity: 0,
        duration: 1.25,
        ease: "power3.out",
      });
      gsap.from("[data-land-hero-copy]", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.06,
        delay: 0.35,
        ease: "power2.out",
      });
      gsap.fromTo(
        ".land-route-map__path",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, delay: 0.45, ease: "power2.inOut", transformOrigin: "left center" },
      );
      gsap.from(".land-route-map__plane", {
        x: -150,
        y: 72,
        duration: 1.2,
        delay: 0.45,
        ease: "power2.inOut",
      });
      gsap.to("[data-land-route-progress]", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-land-story]",
          start: "top 65%",
          end: "bottom 35%",
          scrub: 0.5,
        },
      });
      gsap.utils.toArray<HTMLElement>("[data-land-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 48,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 84%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-land-scroll-text]").forEach((element) => {
        gsap.fromTo(
          element,
          { "--land-text-reveal": "0%" },
          {
            "--land-text-reveal": "115%",
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
              end: "bottom 34%",
              scrub: 0.45,
            },
          },
        );
      });
      gsap.utils.toArray<HTMLElement>("[data-land-chapter]").forEach((element) => {
        gsap.from(element, {
          clipPath: "inset(12% 7% 12% 7%)",
          scale: 0.96,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 80%", once: true },
        });
      });
      gsap.from("[data-land-dashboard]", {
        scale: 0.9,
        rotateX: 7,
        transformPerspective: 1200,
        ease: "none",
        scrollTrigger: {
          trigger: ".land-product",
          start: "top 65%",
          end: "center center",
          scrub: 0.6,
        },
      });
      gsap.from(".land-after__image img", {
        scale: 1.18,
        ease: "none",
        scrollTrigger: {
          trigger: ".land-after",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      gsap.from("[data-land-concierge-letter]", {
        y: 100,
        x: -40,
        rotate: -7,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".land-concierge",
          start: "top 62%",
          once: true,
        },
      });
      gsap.from("[data-land-concierge-dossier]", {
        y: 120,
        x: 50,
        rotate: 7,
        opacity: 0,
        duration: 1.05,
        delay: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".land-concierge",
          start: "top 62%",
          once: true,
        },
      });
      gsap.from("[data-land-concierge-thread]", {
        scaleX: 0,
        duration: 1.2,
        ease: "power2.inOut",
        transformOrigin: "left center",
        scrollTrigger: {
          trigger: ".land-concierge",
          start: "top 62%",
          once: true,
        },
      });
      gsap.from(".land-final__card", {
        scale: 0.92,
        borderRadius: "3rem",
        ease: "none",
        scrollTrigger: {
          trigger: ".land-final",
          start: "top bottom",
          end: "center center",
          scrub: 0.7,
        },
      });

      ScrollTrigger.create({
        trigger: "[data-land-story]",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) =>
          scope.current?.style.setProperty("--land-story-progress", String(self.progress)),
      });
      const productTrigger = ScrollTrigger.create({
        trigger: ".land-product",
        start: "top 70%",
        end: "bottom 35%",
        onUpdate: (self) => {
          const stage = self.progress < 0.34 ? "journey" : self.progress < 0.67 ? "next" : "motion";
          product?.setAttribute("data-product-stage", stage);
        },
      });
      const navTrigger = ScrollTrigger.create({
        trigger: ".land-hero",
        start: "bottom top+=100",
        onEnter: () => nav?.setAttribute("data-scrolled", "true"),
        onLeaveBack: () => nav?.removeAttribute("data-scrolled"),
      });

      return () => {
        productTrigger.kill();
        navTrigger.kill();
        product?.setAttribute("data-product-stage", "journey");
        nav?.removeAttribute("data-scrolled");
      };
    },
    [prefersReducedMotion],
  );

  return (
    <div
      className="landing-page"
      data-motion={prefersReducedMotion ? "reduced" : "full"}
      ref={scope}
    >
      <HeroRibbonCursor />
      <header className="land-nav">
        <div className="landing-shell land-nav__inner">
          <a aria-label="Atlas landing home" className="land-brand" href="#top">
            <AtlasMark />
            <span>atlas</span>
          </a>
          <nav aria-label="Landing navigation" className="land-nav__links" data-open={menuOpen}>
            <a href="#journey" onClick={() => setMenuOpen(false)}>Journey</a>
            <a href="#product" onClick={() => setMenuOpen(false)}>Product</a>
            <a href="#essentials" onClick={() => setMenuOpen(false)}>Essentials</a>
            <a href="#concierge" onClick={() => setMenuOpen(false)}>Concierge</a>
          </nav>
          <button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            className="land-nav__menu"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
          </button>
          <a className="land-button land-button--nav" href={getStartedHref}>
            Get started <ArrowUpRight aria-hidden="true" size={15} />
          </a>
        </div>
      </header>

      <main id="main-content">
        <section className="land-hero" id="top">
          <div aria-hidden="true" className="land-hero__coordinate land-hero__coordinate--left">
            28.6139° N<br />77.2090° E
          </div>
          <div aria-hidden="true" className="land-hero__coordinate land-hero__coordinate--right">
            51.5072° N<br />0.1276° W
          </div>
          <div className="landing-shell land-hero__grid">
            <div className="land-hero__copy">
              <p className="land-kicker" data-land-hero-copy><span /> Free, end to end</p>
              <h1 aria-label="Your operating system for studying and succeeding abroad">
                <span className="land-hero__line"><span data-land-hero-line>Your operating system</span></span>
                <span className="land-hero__line"><span data-land-hero-line>for studying and</span></span>
                <span className="land-hero__line land-hero__line--accent"><span data-land-hero-line>succeeding abroad.</span></span>
              </h1>
              <p className="land-hero__lead" data-land-hero-copy>
                Match universities. Sort your services. Settle in. Then build a life.
                One personal system from your first application to long after you land.
              </p>
              <div className="land-hero__actions" data-land-hero-copy>
                <a className="land-button land-button--primary" href={getStartedHref}>
                  Get started - free <ArrowRight aria-hidden="true" size={17} />
                </a>
                <a className="land-text-link" href="#journey">
                  Follow the journey <span aria-hidden="true">↓</span>
                </a>
              </div>
              <dl className="land-hero__meta" data-land-hero-copy>
                <div><dt>£0</dt><dd>to use, ever</dd></div>
                <div><dt>3 min</dt><dd>to set up</dd></div>
                <div><dt>14,000+</dt><dd>in the network</dd></div>
              </dl>
            </div>

            <div className="land-field-card-wrap" data-land-hero-card>
            <div
              aria-label="Komal's Atlas journey preview"
              className="land-field-card"
              onPointerLeave={(event) => {
                event.currentTarget.style.removeProperty("--land-tilt-x");
                event.currentTarget.style.removeProperty("--land-tilt-y");
              }}
              onPointerMove={(event) => {
                if (prefersReducedMotion || event.pointerType === "touch") return;
                const bounds = event.currentTarget.getBoundingClientRect();
                const x = (event.clientX - bounds.left) / bounds.width - 0.5;
                const y = (event.clientY - bounds.top) / bounds.height - 0.5;
                event.currentTarget.style.setProperty("--land-tilt-x", `${-y * 4}deg`);
                event.currentTarget.style.setProperty("--land-tilt-y", `${x * 5}deg`);
              }}
            >
              <div className="land-field-card__topline">
                <span>Field note / 001</span>
                <span>Sep · 2026</span>
              </div>
              <div aria-hidden="true" className="land-route-map">
                <span className="land-route-map__origin">DEL</span>
                <span className="land-route-map__path" />
                <span className="land-route-map__plane"><Plane size={18} /></span>
                <span className="land-route-map__destination">LHR</span>
              </div>
              <div className="land-field-card__hello">
                <span className="land-avatar">K</span>
                <div>
                  <p>Hi Komal.</p>
                  <span>Targeting Imperial · Sep 2026</span>
                </div>
                <span className="land-live"><span /> Live</span>
              </div>
              <div className="land-field-card__progress">
                <div>
                  <span>Profile ready</span>
                  <strong>85%</strong>
                </div>
                <span className="land-progress"><span /></span>
              </div>
              <div className="land-field-card__tasks">
                <p><span>Next move</span><strong>Upload semester 8 transcript</strong></p>
                <span className="land-task-date">14 Nov</span>
              </div>
              <div className="land-field-card__foot">
                <span><Check size={13} /> Visa funds checked</span>
                <span><Sparkles size={13} /> 4 things in motion</span>
              </div>
            </div>
            </div>
          </div>
          <div aria-hidden="true" className="land-hero__index">ATLAS / THE FIELD GUIDE / 2026</div>
        </section>

        <section className="land-story" data-land-story id="journey">
          <div className="landing-shell land-section-head" data-land-reveal>
            <p className="land-kicker">One system · every stage</p>
            <h2 data-land-scroll-text>The route changes.<br /><em>Your Atlas stays.</em></h2>
            <p>Most platforms stop at admission. Atlas is designed around the full life you are trying to build.</p>
          </div>
          <div className="landing-shell land-story__body">
            <aside aria-hidden="true" className="land-story__rail">
              <span className="land-story__rail-track" />
              <span className="land-story__rail-progress" data-land-route-progress />
              <Compass className="land-story__compass" size={28} />
            </aside>
            <div className="land-story__chapters">
              {chapters.map((chapter) => (
                <article className={`land-chapter land-chapter--${chapter.id}`} data-land-chapter key={chapter.id}>
                  <div className="land-chapter__number">{chapter.number}</div>
                  <div className="land-chapter__copy">
                    <p>{chapter.kicker}</p>
                    <h2>{chapter.title}</h2>
                    <p>{chapter.copy}</p>
                    <ul>
                      {chapter.items.map((item) => <li key={item}><Check size={14} />{item}</li>)}
                    </ul>
                  </div>
                  <div aria-hidden="true" className="land-chapter__ticket">
                    <span>STAGE {chapter.number}</span>
                    <strong>{chapter.title.split(" ")[0]}</strong>
                    <span>ATLAS · UK 2026</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="land-product" data-product-stage="journey" id="product">
          <div className="landing-shell land-product__intro" data-land-reveal>
            <p className="land-kicker land-kicker--light">Product proof · 01</p>
            <h2 data-land-scroll-text>A real product.<br /><em>Not a brochure.</em></h2>
            <p>Answer a few questions. Atlas opens already shaped around your stage, target, intake, and needs.</p>
          </div>
          <div className="landing-shell land-dashboard-frame" data-land-dashboard>
            <div className="land-dashboard-frame__bar">
              <div><span /><span /><span /></div>
              <p>atlas.study / my-atlas</p>
              <span>Personal system</span>
            </div>
            <div className="land-dashboard">
              <aside className="land-dashboard__side">
                <div className="land-brand land-brand--panel"><AtlasMark /><span>atlas</span></div>
                <nav aria-label="Product preview">
                  <span className="is-active">Today</span>
                  <span>Journey</span>
                  <span>Applications</span>
                  <span>Essentials</span>
                  <span>Career</span>
                </nav>
                <span className="land-dashboard__profile"><span>K</span> Komal S.</span>
              </aside>
              <div className="land-dashboard__main">
                <div className="land-dashboard__welcome">
                  <div><p>Tuesday, 14 November</p><h3>Good morning, Komal.</h3></div>
                  <span className="land-dashboard__weather">LDN · 12°C</span>
                </div>
                <div className="land-dashboard__grid">
                  <article className="land-dashboard__journey">
                    <div className="land-dashboard__eyebrow"><span>Journey</span><span>Stage 03 / 06</span></div>
                    <h4>You are 85% set for Imperial.</h4>
                    <div className="land-dashboard__steps">
                      <span className="is-done">Explore</span><span className="is-done">Shortlist</span><span className="is-active">Apply</span><span>Accept</span><span>Depart</span><span>Settle</span>
                    </div>
                  </article>
                  <article className="land-dashboard__next">
                    <div className="land-dashboard__eyebrow"><span>What&apos;s next</span><Clock3 size={14} /></div>
                    <h4>Imperial wants Semester 8.</h4>
                    <p>Upload by 14 November</p>
                    <button type="button">Open task <ArrowUpRight size={14} /></button>
                  </article>
                  <article className="land-dashboard__motion">
                    <div className="land-dashboard__eyebrow"><span>In motion</span><span>4</span></div>
                    <ul><li><span>Visa</span><strong>Funds ready</strong></li><li><span>Housing</span><strong>3 saved</strong></li><li><span>SIM</span><strong>Ready to activate</strong></li></ul>
                  </article>
                  <article className="land-dashboard__profile-card">
                    <span>My Atlas</span><strong>Everything you save,<br />back in one place.</strong><a href="#essentials">View profile <ArrowRight size={13} /></a>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="land-essentials" id="essentials">
          <div className="landing-shell land-essentials__head" data-land-reveal>
            <div><p className="land-kicker">The actual backbone · 02</p><h2 data-land-scroll-text>Everything you need.<br /><em>Already in order.</em></h2></div>
            <p>You were going to buy these anyway. Atlas finds the student-ready option, explains the trade-offs, and tells you exactly how we get paid.</p>
          </div>
          <div className="landing-shell land-essentials__desk" data-land-reveal>
            <div className="land-service-index" role="list" aria-label="Atlas Essentials">
              {services.map((service) => {
                const Icon = service.icon;
                const isActive = service.id === activeService.id;
                return (
                  <button
                    aria-controls="land-service-detail"
                    aria-label={`Explore ${service.name}`}
                    aria-pressed={isActive}
                    className="land-service-button"
                    key={service.id}
                    onBlur={(event) => {
                      if (!event.currentTarget.parentElement?.contains(event.relatedTarget as Node | null)) {
                        serviceFocus.current = false;
                      }
                    }}
                    onClick={() => setActiveServiceId(service.id)}
                    onFocus={() => {
                      serviceFocus.current = true;
                      setActiveServiceId(service.id);
                    }}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse" && !serviceFocus.current) {
                        setActiveServiceId(service.id);
                      }
                    }}
                    type="button"
                  >
                    <span>{service.number}</span><Icon aria-hidden="true" size={18} /><strong>{service.name}</strong><ArrowUpRight aria-hidden="true" size={15} />
                  </button>
                );
              })}
            </div>
            <article aria-live="polite" className="land-service-detail" id="land-service-detail">
              <div className="land-service-detail__stamp">VETTED<br />BY ATLAS</div>
              <div className="land-service-detail__icon"><ActiveServiceIcon aria-hidden="true" size={34} /></div>
              <p>Essential {activeService.number}</p>
              <h3>{activeService.name}</h3>
              <p>{activeService.copy}</p>
              <div className="land-service-detail__note"><Check size={14} />{activeService.note}</div>
              <footer><span>Partner disclosure</span><p>You pay the provider directly. Atlas may receive a referral fee.</p></footer>
            </article>
          </div>
        </section>

        <section className="land-after">
          <div className="land-after__image" aria-hidden="true">
            <Image alt="" fill sizes="(max-width: 800px) 100vw, 48vw" src="/images/normal/career.jpg" />
          </div>
          <div className="land-after__copy" data-land-reveal>
            <p className="land-kicker land-kicker--light">After you land · 03</p>
            <h2 data-land-scroll-text>The bit nobody else<br /><em>stays to build.</em></h2>
            <p>Arrival is not the finish line. It is when the network, career tools, events, and year-round guidance start doing their best work.</p>
            <div className="land-after__stats">
              <article><Users size={20} /><strong>14,000+ students and alumni</strong><span>City, university, and course communities.</span></article>
              <article><BriefcaseBusiness size={20} /><strong>Sponsorship-friendly jobs</strong><span>Internships, graduate roles, CV and interview tools.</span></article>
              <article><CalendarDays size={20} /><strong>Built around your week</strong><span>Events, meetups, deadlines, and what comes next.</span></article>
            </div>
          </div>
        </section>

        <section className="land-concierge" id="concierge">
          <div className="landing-shell land-concierge__scene">
            <header className="land-concierge__heading" data-land-reveal>
              <p className="land-kicker land-kicker--light">Concierge · The human layer</p>
              <h2 aria-label="One person. Every moving part." data-land-scroll-text>One person.<br /><em>Every moving part.</em></h2>
              <p>Applications, visa, accommodation, and arrival — held together by a specialist who knows what comes next.</p>
            </header>

            <div aria-hidden="true" className="land-concierge__thread" data-land-concierge-thread />

            <article className="land-concierge__letter" data-land-concierge-letter>
              <div className="land-concierge__letter-meta">
                <span>Private correspondence · 014</span>
                <span>London · 14 November</span>
              </div>
              <p className="land-concierge__salutation">Dear Komal,</p>
              <blockquote>I keep the whole move in view — the application you are editing today, the visa evidence you will need next, and the room you will arrive to.</blockquote>
              <footer>
                <span className="land-avatar land-avatar--specialist">AM</span>
                <div><strong>Anika Mehta</strong><span>Your Atlas specialist</span></div>
                <em>Anika</em>
              </footer>
            </article>

            <aside className="land-concierge__dossier" data-land-concierge-dossier>
              <div className="land-concierge__dossier-head">
                <span>Journey dossier</span>
                <strong>DEL → LHR</strong>
                <span>SEP · 2026</span>
              </div>
              <ol>
                <li className="is-complete"><span>01</span><div><strong>University shortlist</strong><small>Signed off together</small></div><Check size={14} /></li>
                <li className="is-active"><span>02</span><div><strong>Applications</strong><small>Personal statement in review</small></div><MessageCircle size={14} /></li>
                <li><span>03</span><div><strong>Visa & documents</strong><small>Prepared before your offer</small></div><FileCheck2 size={14} /></li>
                <li><span>04</span><div><strong>Arrival & accommodation</strong><small>Built around your move date</small></div><Plane size={14} /></li>
              </ol>
              <div className="land-concierge__ticket">
                <div><strong>£1,500</strong><span>one-time · end to end</span></div>
                <a className="land-button land-button--signal" href={conciergeHref}>Meet Concierge <ArrowUpRight size={16} /></a>
              </div>
            </aside>
          </div>
        </section>

        <section className="land-honest" id="about">
          <div className="landing-shell land-honest__grid" data-land-reveal>
            <div className="land-honest__title"><p className="land-kicker">The model · in plain English</p><h2 data-land-scroll-text>The student<br /><em>is not the product.</em></h2></div>
            <div className="land-honest__copy">
              <p>Studying abroad is a huge decision. The industry treating it like a commission opportunity is the problem.</p>
              <p>Atlas takes the other route: build the operating system students actually need, keep it free and complete, disclose partner referral fees, and charge only when someone deliberately chooses a real specialist.</p>
              <p>We do not take secret university kickbacks. We do not mark up partner prices. We do not disappear after arrival.</p>
              <div className="land-honest__signature"><span>Built in London</span><strong>For the whole journey.</strong></div>
            </div>
          </div>
        </section>

        <section className="land-faq">
          <div className="landing-shell land-faq__grid" data-land-reveal>
            <div><p className="land-kicker">No fine print</p><h2 data-land-scroll-text>The honest answers.</h2><p>Five questions every student should ask before trusting a platform with a decision this big.</p></div>
            <div className="land-faq__list">
              {faqs.map((faq, index) => (
                <details key={faq.question}>
                  <summary><span>0{index + 1}</span>{faq.question}<span className="land-faq__plus" aria-hidden="true">+</span></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="land-final">
          <div className="landing-shell land-final__card">
            <div aria-hidden="true" className="land-final__stamp"><Plane size={22} /><span>Cleared<br />to begin</span></div>
            <p className="land-kicker">Departure gate · now boarding</p>
            <h2 data-land-scroll-text>Built to help you get out,<br /><em>and stay out.</em></h2>
            <p>Free to start. Three minutes to set up. No card. No tier upgrades. Just your Atlas.</p>
            <a className="land-button land-button--primary" href={getStartedHref}>Get started - free <ArrowRight size={17} /></a>
          </div>
        </section>
      </main>

      <footer className="land-footer">
        <div className="landing-shell land-footer__top">
          <div><a aria-label="Atlas landing home" className="land-brand" href="#top"><AtlasMark /><span>atlas</span></a><p>Your operating system for studying and succeeding abroad.</p></div>
          <div><span>Explore</span><a href="#journey">Journey</a><a href="#essentials">Essentials</a><a href="#concierge">Concierge</a></div>
          <div><span>Discover</span><a href="#about">About</a><a href="#product">Product</a><a href="#journey">Career tools</a></div>
          <div><span>Details</span><span className="land-footer__link">Free, end to end</span><span className="land-footer__link">Built in London</span><span className="land-footer__link">Transparent referrals</span></div>
        </div>
        <div className="landing-shell land-footer__bottom">
          <span>© 2026 GGI Atlas · Edutuxia Ltd</span>
          <button
            onClick={() => {
              setStampRotation(((Date.now() % 17) - 8));
              setStampOpen(true);
            }}
            type="button"
          >
            Coordinates · 51.5072° N, 0.1276° W
          </button>
        </div>
      </footer>

      {constellationOpen ? (
        <div className="land-constellation" role="status">
          <button aria-label="Close constellation" onClick={() => setConstellationOpen(false)} type="button">
            <X aria-hidden="true" size={17} />
          </button>
          <div aria-hidden="true" className="land-constellation__stars">
            {Array.from({ length: 15 }, (_, index) => <span key={index} />)}
          </div>
          <p>Atlas field note · hidden route</p>
          <strong>You found the long way home.</strong>
          <span>Some journeys only appear when you know what to type.</span>
        </div>
      ) : null}

      {stampOpen ? (
        <div className="land-departure-stamp" role="status" style={{ rotate: `${stampRotation}deg` }}>
          <button aria-label="Dismiss departure stamp" onClick={() => setStampOpen(false)} type="button">
            <X aria-hidden="true" size={15} />
          </button>
          <Plane aria-hidden="true" size={24} />
          <strong>Cleared for departure</strong>
          <span>LHR · Atlas · 2026</span>
        </div>
      ) : null}
    </div>
  );
}
