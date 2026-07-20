import { essentials } from "@/constants/content";
import { Reveal } from "@/components/motion/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function EssentialsSection() {
  const [active, ...signals] = essentials;
  const connections = [
    "Connects when your shortlist needs a place to live.",
    "Connects when your budget moves from estimate to payment.",
    "Connects when your arrival plan becomes real.",
    "Connects when your first week needs local context.",
  ];

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
                <article className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-7 outline-none transition-colors focus-within:bg-primary/5 hover:bg-primary/5 lg:px-8" tabIndex={0}>
                  <span className="text-xs font-bold tracking-[0.16em] text-primary">0{index + 2}</span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.035em] text-primary-deep">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
                    <p className="mt-3 max-h-0 overflow-hidden text-xs font-semibold leading-5 text-primary opacity-0 transition-all duration-300 group-hover:max-h-12 group-hover:opacity-100 group-focus-within:max-h-12 group-focus-within:opacity-100" data-essential-connection id={`essential-connection-${index}`}>
                      {connections[index]}
                    </p>
                  </div>
                  <button aria-describedby={`essential-connection-${index}`} aria-label={`Reveal how ${item.title} connects to your journey`} className="grid h-10 w-10 place-items-center rounded-full border border-primary-deep/15 text-primary-deep/65 transition duration-300 hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary group-hover:translate-x-1" type="button">
                    <item.icon className="h-5 w-5" />
                  </button>
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
