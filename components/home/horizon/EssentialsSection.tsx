import { essentials } from "@/constants/content";
import { Reveal } from "@/components/motion/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function EssentialsSection() {
  return (
    <section className="section-space bg-background" id="essentials">
      <div className="container-shell">
        <Reveal><SectionIntro eyebrow="Student essentials" title="The practical parts, finally connected." body="Useful services appear in context—after you know what you need and why—not as a marketplace dropped in your lap." /></Reveal>
        <div className="mt-14 flex snap-x gap-4 overflow-x-auto pb-5 md:grid md:grid-cols-5 md:overflow-visible">
          {essentials.map((item, index) => <article className="min-w-[78vw] snap-start rounded-[1.75rem] border border-border bg-white p-6 shadow-card transition duration-500 hover:-translate-y-2 hover:border-primary/30 md:min-w-0" key={item.title}><item.icon className="h-7 w-7 text-primary" /><p className="mt-12 text-xs font-bold tracking-[0.18em] text-muted">0{index + 1}</p><h3 className="mt-3 text-xl font-semibold tracking-[-0.035em]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-muted">{item.description}</p></article>)}
        </div>
      </div>
    </section>
  );
}
