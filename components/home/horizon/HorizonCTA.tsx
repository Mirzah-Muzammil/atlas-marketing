import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { MagneticLink } from "@/components/motion/MagneticLink";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function HorizonCTA() {
  return (
    <section className="overflow-hidden bg-accent text-white" data-testid="horizon-closing-cta" id="get-started">
      <div className="container-shell relative py-24 text-center md:py-32">
        <div aria-hidden="true" className="absolute left-1/2 top-0 h-20 w-px -translate-x-1/2 bg-white/65"><span className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rotate-45 border border-white/65 bg-accent" /></div>
        <p className="relative text-xs font-bold tracking-[0.2em] text-white/75">WHEREVER YOU ARE STARTING FROM</p>
        <h2 className="relative mx-auto mt-5 max-w-5xl text-[clamp(3.2rem,8vw,7.5rem)] leading-[.88] font-semibold tracking-[-0.075em]">Make your next move feel possible.</h2>
        <MagneticLink className="relative mx-auto mt-8"><ButtonLink className="bg-primary-deep hover:bg-night" href="mailto:hello@atlas.study?subject=Atlas%20early%20access" showArrow>Get started free</ButtonLink></MagneticLink>
        <p className="relative mt-4 text-xs text-white/75">Request free Atlas access by email.</p>
        <div className="relative mx-auto mt-16 max-w-2xl border-t border-white/25 pt-10" id="consultation-form">
          <p className="text-xs font-bold tracking-[0.18em] text-white/75">NEED EXPERT GUIDANCE?</p>
          <h3 className="mb-6 mt-3 text-2xl font-semibold tracking-[-0.04em]">Book a separate Concierge consultation.</h3>
          <div className="mx-auto max-w-xl"><ConsultationForm /></div>
        </div>
      </div>
    </section>
  );
}
