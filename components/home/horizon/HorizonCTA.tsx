import { MagneticLink } from "@/components/motion/MagneticLink";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ConsultationForm } from "@/components/forms/ConsultationForm";

export function HorizonCTA() {
  return (
    <section className="overflow-hidden bg-accent text-white" id="get-started"><div className="container-shell relative py-24 text-center md:py-32"><div className="absolute -left-24 top-1/3 h-64 w-64 -translate-y-1/2 rounded-full border border-white/25" /><div className="absolute -right-24 top-1/3 h-96 w-96 -translate-y-1/2 rounded-full border border-white/20" /><p className="relative text-xs font-bold tracking-[0.2em] text-white/65">WHEREVER YOU ARE STARTING FROM</p><h2 className="relative mx-auto mt-5 max-w-5xl text-[clamp(3.2rem,8vw,7.5rem)] leading-[.88] font-semibold tracking-[-0.075em]">Make your next move feel possible.</h2><MagneticLink className="relative mx-auto mt-8"><ButtonLink className="bg-primary-deep hover:bg-night" href="#consultation-form" showArrow>Get started free</ButtonLink></MagneticLink><div className="relative mx-auto mt-12 max-w-3xl" id="consultation-form"><ConsultationForm /></div></div></section>
  );
}
