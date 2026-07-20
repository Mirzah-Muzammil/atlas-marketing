import { ButtonLink } from "@/components/ui/ButtonLink";

export function OrbitCTA() {
  return (
    <section className="bg-white text-primary-deep" id="launch"><div className="container-shell grid min-h-[72vh] place-items-center py-24 text-center"><div><p className="text-xs font-bold tracking-[0.2em] text-primary">READY FOR LIFTOFF</p><h2 className="mx-auto mt-7 max-w-6xl text-[clamp(3.6rem,9vw,8.7rem)] leading-[.82] font-semibold tracking-[-0.085em]">Your future is big.<br />Your next step can be small.</h2><ButtonLink className="mt-10" href="mailto:hello@atlas.study" showArrow>Get started free</ButtonLink></div></div></section>
  );
}

