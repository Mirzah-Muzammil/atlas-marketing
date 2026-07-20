import { journeyStages } from "@/constants/content";
import { JourneyStoryMotion } from "@/components/home/horizon/JourneyStoryMotion";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function JourneyStory() {
  return (
    <section
      className="relative  overflow-hidden bg-primary-deep text-white"
      data-testid="journey-stage"
      id="journey"
    >
      <div className=" py-8 container-shell" data-journey-pin>
        <div className="grid  gap-4 lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:gap-8">
          <div className="self-start">
            <SectionIntro
              eyebrow="One connected journey"
              title="From maybe to moving day."
              body="Atlas understands that an offer letter is not the finish line. Your plan keeps moving through every practical step that follows."
              tone="dark"
            />
            <div
              className="relative mt-10 max-w-sm overflow-hidden border-y border-white/12 py-7"
              data-journey-product
            >
              <p className="text-xs font-bold tracking-[0.2em] text-secondary">
                YOUR JOURNEY PLAN
              </p>
              <div className="relative mt-7 space-y-5 pl-8">
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-2.5 w-px origin-top bg-white/15"
                >
                  <span
                    className="block h-full w-full origin-top bg-accent"
                    data-journey-route-line
                  />
                </span>
                {journeyStages.map((stage) => (
                  <div
                    className="relative"
                    data-journey-product-state
                    key={stage.id}
                  >
                    <span className="absolute -left-8 top-1 h-2.5 w-2.5 rounded-full border border-secondary bg-primary-deep" />
                    <p className="text-[10px] font-bold tracking-[0.16em] text-secondary">
                      {stage.number}
                    </p>
                    <p className="mt-1 text-sm text-white/65">
                      {stage.eyebrow}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className="relative border-l border-white/12 pl-7 md:pl-40"
            data-journey-articles
          >
            {journeyStages.map((stage, index) => (
              <article
                className="min-h-[50vh] border-b border-white/10 md:pl-40 py-12 last:border-none lg:min-h-0 lg:py-10"
                data-journey-article
                data-journey-stage-id={stage.id}
                data-progress-range={index + 1}
                key={stage.id}
              >
                <p className="text-xs font-bold tracking-[0.2em] text-secondary">
                  {stage.number} · {stage.eyebrow.toUpperCase()}
                </p>
                <h3 className="mt-5 text-[clamp(3.8rem,9vw,8.5rem)] leading-none font-semibold tracking-[-0.075em]">
                  {stage.title}
                </h3>
                <p className="mt-7 max-w-lg text-lg leading-8 text-white/65">
                  {stage.description}
                </p>
                <p className="mt-7 border-l-2 border-success pl-4 text-sm text-white/78">
                  {stage.promise}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
      <JourneyStoryMotion />
    </section>
  );
}
