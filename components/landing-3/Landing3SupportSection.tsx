"use client";

import { LifeBuoy } from "lucide-react";
import { useEffect, useRef } from "react";

const testimonials = [
  {
    copy: "Atlas helped me turn a confusing application into a clear plan.",
    className:
      "left-[12%] top-0 w-[94%] min-[810px]:left-[23%] min-[810px]:top-[5%] min-[810px]:w-[74%]",
    gradient: "linear-gradient(135deg, #ff8a32 0%, #ff4d19 100%)",
    rotation: 4,
    fromX: 430,
    fromY: -28,
  },
  {
    copy: "Real answers, exactly when I needed them.",
    className:
      "left-[-2%] top-[108px] w-[96%] min-[810px]:left-[1%] min-[810px]:top-[27%] min-[810px]:w-[66%]",
    gradient: "linear-gradient(135deg, #ff72df 0%, #ee4fff 100%)",
    rotation: -5,
    fromX: 330,
    fromY: 18,
  },
  {
    copy: "The fastest, most thoughtful support throughout my move.",
    className:
      "left-[12%] top-[202px] w-[96%] min-[810px]:left-[25%] min-[810px]:top-[46%] min-[810px]:w-[70%]",
    gradient: "linear-gradient(135deg, #a668ff 0%, #7547f5 100%)",
    rotation: 3,
    fromX: 520,
    fromY: 30,
  },
  {
    copy: "I always knew what to do next.",
    className:
      "left-[-3%] top-[292px] w-[78%] min-[810px]:left-[4%] min-[810px]:top-[60%] min-[810px]:w-[47%]",
    gradient: "linear-gradient(135deg, #367cff 0%, #244bea 100%)",
    rotation: 2,
    fromX: 280,
    fromY: 54,
  },
  {
    copy: "It felt like having someone in my corner from day one.",
    className:
      "left-[8%] top-[372px] w-[98%] min-[810px]:left-[17%] min-[810px]:top-[77%] min-[810px]:w-[78%]",
    gradient: "linear-gradient(135deg, #ff463d 0%, #f01935 100%)",
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
        className="relative mx-auto grid min-h-[900px] w-full max-w-[1360px] overflow-hidden rounded-[34px] border border-white/[.085] bg-[#0b0c10] shadow-[inset_0_1px_rgba(255,255,255,.045),0_40px_120px_rgba(0,0,0,.48)] min-[810px]:min-h-[720px] min-[810px]:grid-cols-[36%_64%] min-[810px]:rounded-[42px]"
        data-support-panel
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_37%,rgba(150,78,255,.13),transparent_31%),radial-gradient(circle_at_55%_92%,rgba(48,191,255,.09),transparent_28%),linear-gradient(135deg,rgba(255,255,255,.025),transparent_42%)]"
        />

        <div className="relative z-20 px-7 pb-4 pt-10 min-[810px]:flex min-[810px]:flex-col min-[810px]:justify-center min-[810px]:px-[clamp(44px,4.2vw,68px)] min-[810px]:py-16">
          <div className="grid size-12 place-items-center rounded-full border border-white/12 bg-white/[.055] text-white/82 shadow-[inset_0_1px_rgba(255,255,255,.08)] min-[810px]:size-14">
            <LifeBuoy className="size-6 min-[810px]:size-7" strokeWidth={1.7} />
          </div>

          <h3 className="mt-7 text-[42px] font-semibold leading-[.98] tracking-[-.055em] min-[810px]:mt-9 min-[810px]:text-[clamp(38px,3vw,44px)]">
            <span className="block w-fit bg-[linear-gradient(90deg,#ff9a42,#ff6534)] px-1.5 pb-1 text-black">
              Controlled by you.
            </span>{" "}
            <span className="mt-1 block">Supported by Atlas.</span>
          </h3>

          <p className="mt-6 max-w-[430px] text-[17px] leading-[1.48] tracking-[-.02em] text-white/57 min-[810px]:text-[19px]">
            Your decisions stay yours. Atlas gives you the guidance, tools,
            and people to move forward with confidence.
          </p>
          <p className="mt-4 text-[17px] font-semibold tracking-[-.025em] text-white min-[810px]:text-[19px]">
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
              className={`absolute flex min-h-[78px] origin-center items-center rounded-[24px] border border-white/20 px-6 py-4 text-[17px] font-semibold leading-[1.15] tracking-[-.035em] text-white shadow-[inset_0_1px_rgba(255,255,255,.19),0_24px_60px_rgba(0,0,0,.32)] will-change-[transform,opacity] min-[810px]:min-h-[104px] min-[810px]:rounded-[30px] min-[810px]:px-9 min-[810px]:py-6 min-[810px]:text-[clamp(21px,2vw,29px)] ${testimonial.className}`}
              data-support-pill
              key={testimonial.copy}
              style={{
                background: testimonial.gradient,
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
