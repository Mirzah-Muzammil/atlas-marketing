import { ButtonLink } from "@/components/ui/ButtonLink";

export function DispatchCTA() {
  return (
    <section className="bg-paper pb-20 text-ink" id="begin"><div className="container-shell border-2 border-ink p-7 text-center md:p-16"><p className="text-xs font-bold tracking-[0.2em] text-accent">THE NEXT ISSUE IS YOURS</p><h2 className="mx-auto mt-7 max-w-5xl font-editorial text-[clamp(3.4rem,8vw,7.5rem)] leading-[.85] tracking-[-0.065em]">Go abroad with the whole story in view.</h2><div className="mt-9 flex flex-wrap justify-center gap-3"><ButtonLink href="mailto:hello@atlas.study" showArrow>Get started free</ButtonLink><ButtonLink href="mailto:concierge@atlas.study" variant="secondary">Book a student session</ButtonLink></div></div></section>
  );
}
