import { essentials } from "@/constants/content";

export function EcosystemSection() {
  return (
    <section className="section-space bg-primary-deep text-white" id="ecosystem"><div className="container-shell grid gap-14 lg:grid-cols-[.7fr_1.3fr]"><div className="lg:sticky lg:top-24 lg:self-start"><p className="text-xs font-bold tracking-[0.2em] text-secondary">CONNECTED ECOSYSTEM</p><h2 className="mt-6 text-5xl leading-[.92] font-semibold tracking-[-0.06em] md:text-7xl">Practical help, in the right orbit.</h2><p className="mt-6 max-w-md text-base leading-7 text-white/55">Atlas brings the essential services into view at the moment they matter. No endless marketplace. No pressure to choose too early.</p></div><div className="rounded-[2.5rem] border border-white/12 bg-night/55 p-5 md:p-8"><div className="aspect-[16/7] rounded-[1.8rem] border border-secondary/20 bg-[radial-gradient(circle_at_center,rgba(20,87,230,.6),transparent_13%),repeating-radial-gradient(circle_at_center,transparent_0_62px,rgba(138,180,255,.13)_63px_64px)]" /><div className="mt-5 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2">{essentials.map((item) => <article className="bg-night p-5" key={item.title}><item.icon className="h-5 w-5 text-secondary" /><h3 className="mt-8 text-lg font-semibold">{item.title === "Housing" ? "Housing" : item.title}</h3><p className="mt-2 text-xs leading-5 text-white/45">{item.description}</p></article>)}</div></div></div></section>
  );
}

