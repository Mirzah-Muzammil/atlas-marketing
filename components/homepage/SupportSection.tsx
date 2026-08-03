import { LifeBuoy } from "lucide-react";

import HomepageAnimatedTitle from "@/components/homepage/HomepageAnimatedTitle";

const testimonials = [
  {
    copy: "Atlas helped me turn a confusing application into a clear plan.",
    name: "Maya Patel",
    initials: "MP",
    avatar: "linear-gradient(145deg,#ffd6b8,#ff7b46)",
    color: "#e95f2f",
    className:
      "left-[7%] top-0 w-[88%] min-[810px]:left-[23%] min-[810px]:top-[3%] min-[810px]:min-h-[16%] min-[810px]:w-[74%]",
    rotation: 1,
  },
  {
    copy: "Real answers, exactly when I needed them.",
    name: "Arjun Nair",
    initials: "AN",
    avatar: "linear-gradient(145deg,#d8cbff,#7b61ff)",
    color: "#7a5be3",
    className:
      "left-[3%] top-[118px] w-[90%] min-[810px]:left-[4%] min-[810px]:top-[23%] min-[810px]:min-h-[18%] min-[810px]:w-[70%]",
    rotation: -1,
  },
  {
    copy: "The fastest, most thoughtful support throughout my move.",
    name: "Sofia Chen",
    initials: "SC",
    avatar: "linear-gradient(145deg,#ffc8ef,#e74fd1)",
    color: "#d94ca7",
    className:
      "left-[8%] top-[236px] w-[88%] min-[810px]:left-[20%] min-[810px]:top-[43%] min-[810px]:min-h-[18%] min-[810px]:w-[73%]",
    rotation: 1,
  },
  {
    copy: "I always knew what to do next.",
    name: "Daniel Okafor",
    initials: "DO",
    avatar: "linear-gradient(145deg,#b9e8ff,#2788ff)",
    color: "#3375db",
    className:
      "left-[3%] top-[354px] w-[82%] min-[810px]:left-[3%] min-[810px]:top-[63%] min-[810px]:min-h-[15%] min-[810px]:w-[52%]",
    rotation: -1,
  },
  {
    copy: "It felt like having someone in my corner from day one.",
    name: "Lina Hassan",
    initials: "LH",
    avatar: "linear-gradient(145deg,#d5ffd9,#42bd6b)",
    color: "#278c69",
    className:
      "left-[8%] top-[472px] w-[88%] min-[810px]:left-[22%] min-[810px]:top-[80%] min-[810px]:min-h-[18%] min-[810px]:w-[72%]",
    rotation: 1,
  },
] as const;

export function SupportSection() {
  return (
    <section
      className="relative overflow-clip bg-transparent px-4 pb-20 pt-8 text-white min-[810px]:pb-28 min-[810px]:pt-12"
      data-atlas-homepage-support
      id="student-stories"
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
            <LifeBuoy
              className="size-7 min-[810px]:size-10"
              strokeWidth={2.8}
            />
          </div>

          <HomepageAnimatedTitle
            as="h2"
            className="mt-7 text-[42px] font-semibold leading-[1.03] tracking-[-.055em] text-[#0d0d0f] min-[810px]:mt-8"
          >
            <span className="block">Real stories.</span>{" "}
            <span className="block">Real support.</span>
          </HomepageAnimatedTitle>

          <p className="mt-6 max-w-[470px] text-[17px] leading-[1.42] tracking-[-.025em] text-[#747681]">
            Your decisions stay yours. Atlas gives you the guidance, tools, and
            people to move forward with confidence.
          </p>
          <p className="mt-4 text-[17px] font-semibold tracking-[-.025em] text-[#111217]">
            Real support, whenever you need it.
          </p>
        </div>

        <div
          aria-label="What students say about Atlas support"
          className="relative z-10 h-[600px] min-[810px]:h-full"
          data-support-visual
        >
          {testimonials.map((testimonial) => (
            <blockquote
              className={`absolute z-10 isolate flex min-h-[100px] origin-center cursor-default flex-col items-start justify-center overflow-visible px-5 py-3 text-white outline-none transition-[scale,translate,filter] duration-300 ease-out will-change-[scale,translate] hover:z-50 hover:-translate-y-3 hover:scale-[1.1] hover:drop-shadow-[0_30px_36px_rgba(0,0,0,.3)] focus-visible:z-50 focus-visible:-translate-y-3 focus-visible:scale-[1.1] focus-visible:drop-shadow-[0_30px_36px_rgba(0,0,0,.3)] focus-visible:ring-2 focus-visible:ring-[#3f3f42] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f4f5fc] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:translate-y-0 min-[810px]:px-9 min-[810px]:py-4 ${testimonial.className}`}
              data-support-pill
              key={testimonial.copy}
              tabIndex={0}
              style={{
                opacity: 1,
                rotate: `${testimonial.rotation}deg`,
              }}
            >
              <footer
                className="relative z-10 mb-2 ml-2 flex items-center gap-2.5 text-[#37383d]"
                data-support-identity
              >
                <span
                  aria-label={`${testimonial.name} avatar`}
                  className="grid size-8 shrink-0 place-items-center rounded-full border border-white/80 text-[10px] font-bold tracking-[-.02em] text-white shadow-[inset_0_1px_rgba(255,255,255,.45),0_4px_12px_rgba(0,0,0,.15)] min-[810px]:size-9 min-[810px]:text-[11px]"
                  data-support-avatar
                  role="img"
                  style={{ background: testimonial.avatar }}
                >
                  {testimonial.initials}
                </span>
                <span className="text-[13px] font-semibold tracking-[-.02em] text-[#45464c] min-[810px]:text-[14px]">
                  {testimonial.name}
                </span>
              </footer>
              <div
                className="relative z-10 w-full rounded-[28px] px-5 py-4 text-[#f5f5f7] shadow-[inset_0_1px_rgba(255,255,255,.16),0_14px_30px_rgba(20,20,24,.2)] min-[810px]:rounded-[34px] min-[810px]:px-7 min-[810px]:py-5"
                data-support-color={testimonial.color}
                data-support-message
                style={{ backgroundColor: testimonial.color }}
              >
                <svg
                  aria-hidden="true"
                  className="absolute -bottom-px -left-4 h-6 w-7 overflow-visible"
                  data-support-tail
                  style={{ color: testimonial.color }}
                  viewBox="0 0 28 24"
                >
                  <path
                    d="M28 0C27.7 11.8 20.2 20.7 4 24c7.9-4.9 12-11.7 12-20 0-1.5-.1-2.8-.4-4C20 0 24 0 28 0Z"
                    data-support-tail-piece
                    fill="currentColor"
                  />
                </svg>
                <p className="relative z-10 text-[17px] font-medium leading-[1.22] tracking-[-.025em] min-[810px]:text-[clamp(18px,1.3vw,22px)]">
                  “{testimonial.copy}”
                </p>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
