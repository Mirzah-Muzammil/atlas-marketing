import Image from "next/image";
import { Check, MapPin, Sparkles } from "lucide-react";

import { HorizonHeroMotion } from "@/components/home/horizon/HorizonHeroMotion";
import { MagneticLink } from "@/components/motion/MagneticLink";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function HorizonHero() {
  return (
    <section className="relative min-h-[900px] overflow-hidden bg-[radial-gradient(circle_at_20%_15%,rgba(138,180,255,.55),transparent_38%),linear-gradient(180deg,#ddecff_0%,#f5f7fb_82%)] pt-32 md:min-h-[min(960px,100svh)] md:pt-40">
      <div className="absolute -top-20 right-[8%] h-72 w-72 rounded-full bg-white/55 blur-3xl" />
      <div className="container-shell relative z-10 grid gap-12 md:grid-cols-[1.02fr_.98fr] md:items-center">
        <div className="pb-8 md:pb-20">
          <p className="mb-5 flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-primary"><Sparkles className="h-4 w-4" /> STUDY ABROAD, WITHOUT THE CHAOS</p>
          <h1 className="max-w-3xl text-[clamp(3.7rem,7.8vw,7.8rem)] leading-[0.84] font-semibold tracking-[-0.075em] text-primary-deep">
            <span className="block overflow-hidden"><span className="block" data-hero-word>Your whole{" "}</span></span>
            <span className="block overflow-hidden"><span className="block" data-hero-word>study-abroad{" "}</span></span>
            <span className="block overflow-hidden"><span className="block text-primary" data-hero-word>journey.</span></span>
          </h1>
          <div data-hero-copy>
            <p className="mt-7 max-w-xl text-lg leading-8 text-primary-deep/68 md:text-xl">Applications, visa, money, housing, and arrival—connected in one clear plan that moves with you.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticLink><ButtonLink href="#get-started" showArrow>Get started free</ButtonLink></MagneticLink>
              <ButtonLink href="#journey" variant="secondary">See the journey</ButtonLink>
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm text-primary-deep/55"><Check className="h-4 w-4 text-success" /> One plan. Human help when you need it.</p>
          </div>
        </div>

        <div className="relative min-h-[510px] translate-x-3 md:min-h-[650px] md:translate-x-10" data-hero-card>
          <div className="absolute inset-0 translate-x-[var(--hero-x,0)] translate-y-[var(--hero-y,0)] overflow-hidden rounded-[2.5rem] shadow-[0_40px_100px_-40px_rgba(7,29,70,.6)] transition-transform duration-700 ease-out" data-hero-visual>
            <Image alt="Student beginning an international study journey at the airport" className="object-cover object-[64%_center]" fill priority sizes="(max-width: 768px) 100vw, 50vw" src="/images/atlas-departure.jpg" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/60 via-transparent to-white/5" />
          </div>
          <div className="glass-panel absolute -left-6 top-[12%] w-56 rounded-3xl p-4 text-primary-deep md:-left-14" data-hero-card>
            <div className="flex items-center justify-between"><span className="text-[10px] font-bold tracking-[0.15em] text-primary">YOUR JOURNEY</span><span className="h-2 w-2 rounded-full bg-success" /></div>
            <p className="mt-4 text-sm font-semibold">University shortlist</p><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-primary/10"><div className="h-full w-3/4 rounded-full bg-success" /></div><p className="mt-2 text-xs text-muted">3 next steps, clearly ordered</p>
          </div>
          <div className="absolute -right-2 bottom-[8%] rounded-3xl border border-white/25 bg-primary-deep/86 p-5 text-white shadow-soft backdrop-blur-xl md:-right-8" data-hero-card>
            <p className="flex items-center gap-2 text-xs text-secondary"><MapPin className="h-4 w-4" /> NEXT MILESTONE</p><p className="mt-2 font-semibold">Visa document review</p><p className="mt-1 text-xs text-white/55">Everything in one secure checklist</p>
          </div>
        </div>
      </div>
      <HorizonHeroMotion />
    </section>
  );
}
