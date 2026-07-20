import { ButtonLink } from "@/components/ui/ButtonLink";

export function ConciergeInterlude() {
  return (
    <section className="relative overflow-hidden border-b border-ink/25 bg-accent text-white" data-testid="human-margin-note"><span aria-hidden="true" className="absolute -right-5 -top-8 font-editorial text-[16rem] italic text-white/10">✓</span><div className="container-shell relative grid md:grid-cols-[.35fr_.65fr]"><div className="border-white/25 py-10 md:border-r md:py-20"><p className="text-xs font-bold tracking-[0.2em]">A HUMAN MARGIN NOTE</p><p className="mt-8 max-w-40 text-sm leading-6 text-white/75">The system holds the facts. A specialist holds the moment.</p></div><div className="py-10 md:p-20"><p className="font-editorial text-[clamp(2.8rem,6vw,5.8rem)] leading-[.95] tracking-[-0.05em]">Sometimes the most useful interface is a person who says, “I checked. You’re ready.”</p><div className="mt-9 flex flex-wrap items-center gap-6"><ButtonLink className="bg-ink hover:bg-night" href="mailto:concierge@atlas.study?subject=Atlas%20Concierge" showArrow>Meet Atlas Concierge</ButtonLink><span className="text-xs font-bold tracking-[0.14em] text-white/75">CONTEXT, NOT A TICKET NUMBER</span></div></div></div></section>
  );
}
