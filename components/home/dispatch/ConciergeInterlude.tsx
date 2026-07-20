import { ButtonLink } from "@/components/ui/ButtonLink";

export function ConciergeInterlude() {
  return (
    <section className="border-b border-ink/25 bg-accent text-white"><div className="container-shell grid md:grid-cols-[.35fr_.65fr]"><div className="border-white/25 py-10 md:border-r md:py-20"><p className="text-xs font-bold tracking-[0.2em]">A HUMAN MARGIN NOTE</p></div><div className="py-10 md:p-20"><p className="font-editorial text-[clamp(2.8rem,6vw,5.8rem)] leading-[.95] tracking-[-0.05em]">Sometimes the most useful interface is a person who says, “I checked. You’re ready.”</p><ButtonLink className="mt-9 bg-ink hover:bg-night" href="#begin" showArrow>Meet Atlas Concierge</ButtonLink></div></div></section>
  );
}
