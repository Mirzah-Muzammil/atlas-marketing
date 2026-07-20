import { journeyStages } from "@/constants/content";
import { JourneyStoryMotion } from "@/components/home/horizon/JourneyStoryMotion";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function JourneyStory() {
  return (
    <section className="relative overflow-hidden bg-primary-deep text-white" id="journey">
      <div className="container-shell grid gap-16 py-24 lg:grid-cols-[.82fr_1.18fr] lg:py-36">
        <div className="self-start lg:sticky lg:top-24">
          <SectionIntro eyebrow="One connected journey" title="From maybe to moving day." body="Atlas understands that an offer letter is not the finish line. Your plan keeps moving through every practical step that follows." tone="dark" />
          <div className="relative mt-14 aspect-square max-w-sm rounded-full border border-white/10" data-journey-orbit>
            <div className="absolute inset-[18%] rounded-full border border-secondary/30" /><div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_70px_rgba(20,87,230,.7)]" /><div className="absolute right-[5%] top-1/2 h-5 w-5 rounded-full bg-accent shadow-[0_0_24px_rgba(255,107,44,.8)]" />
          </div>
        </div>
        <div className="relative border-l border-white/12 pl-7 md:pl-12">
          <JourneyStoryMotion />
          {journeyStages.map((stage) => (
            <article className="min-h-[66vh] border-b border-white/10 py-12 last:border-none lg:flex lg:flex-col lg:justify-center" data-journey-card key={stage.id}>
              <p className="text-xs font-bold tracking-[0.2em] text-secondary">{stage.number} · {stage.eyebrow.toUpperCase()}</p>
              <h3 className="mt-5 text-[clamp(3.8rem,9vw,8.5rem)] leading-none font-semibold tracking-[-0.075em]">{stage.title}</h3>
              <p className="mt-7 max-w-lg text-lg leading-8 text-white/65">{stage.description}</p>
              <p className="mt-7 w-fit rounded-full border border-success/40 bg-success/10 px-4 py-2 text-sm text-white/78">{stage.promise}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
