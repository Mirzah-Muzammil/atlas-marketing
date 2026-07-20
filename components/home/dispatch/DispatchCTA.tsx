import { ButtonLink } from "@/components/ui/ButtonLink";
import { DispatchClosingMotion } from "@/components/home/dispatch/DispatchClosingMotion";

export function DispatchCTA() {
  return (
    <section className="relative overflow-hidden bg-paper pb-20 text-ink" data-testid="dispatch-closing-cover" id="begin"><div aria-hidden="true" className="dispatch-closing-grid absolute inset-0" data-dispatch-closing-grid /><div className="container-shell relative border-2 border-ink p-7 text-center md:p-16" data-dispatch-closing-panel><p className="text-xs font-bold tracking-[0.2em] text-accent">THE NEXT ISSUE IS YOURS</p><h2 className="mx-auto mt-7 max-w-5xl font-editorial text-[clamp(3.4rem,8vw,7.5rem)] leading-[.85] tracking-[-0.065em]">Go abroad with the whole story in view.</h2><div className="mt-9 flex flex-wrap justify-center gap-3"><ButtonLink href="mailto:hello@atlas.study" showArrow>Get started free</ButtonLink><ButtonLink href="mailto:concierge@atlas.study?subject=Atlas%20student%20session" variant="secondary">Book a student session</ButtonLink></div></div><DispatchClosingMotion /></section>
  );
}
