"use client";

import { LifeBuoy } from "lucide-react";
import { useEffect, useRef } from "react";

const testimonials = [
  {
    copy: "Atlas helped me turn a confusing application into a clear plan.",
    className:
      "left-[12%] top-0 w-[94%] min-[810px]:left-[22%] min-[810px]:top-[7%] min-[810px]:min-h-[16%] min-[810px]:w-[78%] min-[810px]:text-[clamp(24px,1.5vw,32px)]",
    gradient: "linear-gradient(135deg, #ff8a32 0%, #ff4d19 100%)",
    glow: "0 22px 58px rgba(255, 92, 38, .25)",
    rotation: 4,
    fromX: 430,
    fromY: -28,
  },
  {
    copy: "Real answers, exactly when I needed them.",
    className:
      "left-[-2%] top-[108px] w-[96%] min-[810px]:left-[-7%] min-[810px]:top-[31%] min-[810px]:min-h-[22%] min-[810px]:w-[80%] min-[810px]:text-[clamp(30px,2.4vw,48px)]",
    gradient: "linear-gradient(135deg, #ff72df 0%, #ee4fff 100%)",
    glow: "0 22px 62px rgba(238, 79, 255, .25)",
    rotation: -5,
    fromX: 330,
    fromY: 18,
  },
  {
    copy: "The fastest, most thoughtful support throughout my move.",
    className:
      "left-[12%] top-[202px] w-[96%] min-[810px]:left-[1%] min-[810px]:top-[49%] min-[810px]:min-h-[17%] min-[810px]:w-[88%] min-[810px]:text-[clamp(23px,1.5vw,32px)]",
    gradient: "linear-gradient(135deg, #a668ff 0%, #7547f5 100%)",
    glow: "0 22px 58px rgba(117, 71, 245, .24)",
    rotation: 3,
    fromX: 520,
    fromY: 30,
  },
  {
    copy: "I always knew what to do next.",
    className:
      "left-[-3%] top-[292px] w-[78%] min-[810px]:left-[1%] min-[810px]:top-[57%] min-[810px]:min-h-[15%] min-[810px]:w-[49%] min-[810px]:text-[clamp(28px,2vw,42px)]",
    gradient: "linear-gradient(135deg, #367cff 0%, #244bea 100%)",
    glow: "0 22px 58px rgba(36, 75, 234, .25)",
    rotation: 2,
    fromX: 280,
    fromY: 54,
  },
  {
    copy: "It felt like having someone in my corner from day one.",
    className:
      "left-[8%] top-[372px] w-[98%] min-[810px]:left-[15%] min-[810px]:top-[72%] min-[810px]:min-h-[22%] min-[810px]:w-[81%] min-[810px]:text-[clamp(24px,1.55vw,33px)]",
    gradient: "linear-gradient(135deg, #ff463d 0%, #f01935 100%)",
    glow: "0 24px 64px rgba(240, 25, 53, .25)",
    rotation: -4,
    fromX: 470,
    fromY: 82,
  },
] as const;

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

export function Landing3SupportSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const visual = visualRef.current;
    if (!section || !visual) return;

    const pills = Array.from(
      visual.querySelectorAll<HTMLElement>("[data-support-pill]"),
    );

    const paint = (progress: number) => {
      const isDesktop = window.matchMedia("(min-width: 810px)").matches;

      pills.forEach((pill, index) => {
        const config = testimonials[index];
        const delay = index * 0.045;
        const localProgress = clamp((progress - delay) / (1 - delay));
        const eased = easeOutCubic(localProgress);
        const mobileFactor = isDesktop ? 1 : 0.42;
        const x = config.fromX * mobileFactor * (1 - eased);
        const y = config.fromY * (1 - eased);
        const rotation = config.rotation + 7 * (1 - eased);
        const scale = 0.94 + 0.06 * eased;

        pill.style.opacity = `${0.28 + 0.72 * eased}`;
        pill.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg) scale(${scale})`;
      });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paint(1);
      return;
    }

    let animationFrame = 0;
    const update = () => {
      animationFrame = 0;
      const rect = section.getBoundingClientRect();
      const travel = window.innerHeight + Math.min(rect.height * 0.4, 340);
      paint(clamp((window.innerHeight - rect.top) / travel));
    };
    const scheduleUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      className="relative overflow-clip bg-[#050506] px-4 pb-20 pt-8 text-white min-[810px]:pb-28 min-[810px]:pt-12"
      data-landing-3-support
      id="atlas-support"
      ref={sectionRef}
    >
      <div
        className="relative mx-auto grid min-h-[900px] w-full max-w-[1980px] overflow-hidden rounded-[34px] border border-[#dfe5ef] bg-[#f4f5fc] text-[#0d0d0f] shadow-[0_40px_120px_rgba(0,0,0,.28)] min-[810px]:min-h-[clamp(720px,40vw,820px)] min-[810px]:grid-cols-[35%_65%] min-[810px]:rounded-[64px]"
        data-support-panel
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_54%_105%,rgba(57,255,222,.43),transparent_35%),radial-gradient(ellipse_at_94%_88%,rgba(214,194,255,.36),transparent_42%),linear-gradient(180deg,#f7f8fc_0%,#f0eff9_100%)]"
        />

        <div className="relative z-20 px-7 pb-4 pt-10 min-[810px]:flex min-[810px]:flex-col min-[810px]:justify-center min-[810px]:px-[clamp(44px,4.2vw,68px)] min-[810px]:py-16">
          <div className="grid size-12 place-items-center rounded-full border-[3px] border-[#15171b] bg-[radial-gradient(circle,#f8f9ff_42%,#b5ebf1_44%,#98a5b7_62%,#111318_64%)] text-[#111318] shadow-[0_5px_0_rgba(0,0,0,.13)] min-[810px]:size-16">
            <LifeBuoy className="size-7 min-[810px]:size-10" strokeWidth={2.8} />
          </div>

          <h3 className="mt-7 text-[42px] font-semibold leading-[1.03] tracking-[-.055em] text-[#0d0d0f] min-[810px]:mt-8 min-[810px]:text-[clamp(38px,2.6vw,52px)]">
            <span className="block">Controlled by you.</span>{" "}
            <span className="block">Supported by Atlas.</span>
          </h3>

          <p className="mt-6 max-w-[470px] text-[17px] leading-[1.42] tracking-[-.025em] text-[#747681] min-[810px]:text-[clamp(18px,1.35vw,27px)]">
            Your decisions stay yours. Atlas gives you the guidance, tools,
            and people to move forward with confidence.
          </p>
          <p className="mt-4 text-[17px] font-semibold tracking-[-.025em] text-[#111217] min-[810px]:text-[clamp(19px,1.35vw,28px)]">
            Real support, whenever you need it.
          </p>
        </div>

        <div
          aria-label="What students say about Atlas support"
          className="relative z-10 h-[500px] min-[810px]:h-full"
          data-support-visual
          ref={visualRef}
        >
          {testimonials.map((testimonial, index) => (
            <blockquote
              className={`absolute flex min-h-[78px] origin-center items-center rounded-[24px] border border-white/20 px-6 py-4 text-[17px] font-semibold leading-[1.15] tracking-[-.035em] text-white will-change-[transform,opacity] min-[810px]:rounded-[42px] min-[810px]:px-12 min-[810px]:py-7 ${testimonial.className}`}
              data-support-pill
              key={testimonial.copy}
              style={{
                background: testimonial.gradient,
                boxShadow: `inset 0 1px rgba(255,255,255,.26), ${testimonial.glow}`,
                opacity: 0.28,
                transform: `translate3d(${testimonial.fromX}px, ${testimonial.fromY}px, 0) rotate(${testimonial.rotation + 7}deg) scale(.94)`,
                zIndex: 10 + index,
              }}
            >
              {testimonial.copy}
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
