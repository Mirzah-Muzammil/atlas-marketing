import { essentials } from "@/constants/content";
import { Reveal } from "@/components/motion/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function EssentialsSection() {
  const [active, ...signals] = essentials;

  return (
    <section className="section-space relative bg-background" data-testid="contextual-essentials" id="essentials">
      <span aria-hidden="true" className="absolute left-1/2 top-0 h-12 w-px -translate-x-1/2 bg-primary-deep/20" />
      <div className="container-shell">
        <Reveal><SectionIntro eyebrow="Student essentials" title="The practical parts, finally connected." body="Useful services appear in context—after you know what you need and why—not as a marketplace dropped in your lap." /></Reveal>
        <div className="mt-14 border-y border-primary-deep/15 lg:grid lg:grid-cols-[1.15fr_.85fr]">
          <article className="relative overflow-hidden bg-primary-deep px-7 py-10 text-white md:px-12 md:py-14" data-essential-active data-essential-service>
            <active.icon className="h-9 w-9 text-secondary" />
            <p className="mt-20 text-xs font-bold tracking-[0.18em] text-secondary">ACTIVE FOR VISA PREPARATION</p>
            <h3 className="mt-4 max-w-lg text-5xl font-semibold tracking-[-0.055em] md:text-6xl">{active.title}</h3>
            <p className="mt-6 max-w-lg text-lg leading-8 text-white/65">{active.description}</p>
            <span aria-hidden="true" className="absolute bottom-0 right-10 h-28 w-px bg-accent" />
          </article>
          <ol className="divide-y divide-primary-deep/15" aria-label="Supporting route signals">
            {signals.map((item, index) => (
              <li data-essential-service key={item.title}>
                <article className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-7 lg:px-8">
                  <span className="text-xs font-bold tracking-[0.16em] text-primary">0{index + 2}</span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.035em] text-primary-deep">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
                  </div>
                  <item.icon className="h-6 w-6 text-primary-deep/40 transition-transform duration-300 group-hover:translate-x-1" />
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <span aria-hidden="true" className="absolute bottom-0 left-1/2 h-12 w-px -translate-x-1/2 bg-accent" />
    </section>
  );
}
