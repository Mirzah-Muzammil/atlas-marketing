import { ButtonLink } from "@/components/ui/ButtonLink";
import { OrbitLiftoffMotion } from "@/components/home/orbit/OrbitLiftoffMotion";

export function OrbitCTA() {
  return (
    <section className="relative overflow-hidden bg-white text-primary-deep" data-testid="liftoff-wash" id="launch"><div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(20,87,230,.2),transparent_46%)]" data-liftoff-gradient /><div className="container-shell relative grid min-h-[72vh] place-items-center py-24 text-center"><div data-liftoff-content><p className="text-xs font-bold tracking-[0.2em] text-primary">READY FOR LIFTOFF</p><h2 className="mx-auto mt-7 max-w-6xl text-[clamp(3.6rem,9vw,8.7rem)] leading-[.82] font-semibold tracking-[-0.085em]">Your future is big.<br />Your next step can be small.</h2><ButtonLink className="mt-10" href="mailto:hello@atlas.study" showArrow>Get started free</ButtonLink></div></div><OrbitLiftoffMotion /></section>
  );
}
