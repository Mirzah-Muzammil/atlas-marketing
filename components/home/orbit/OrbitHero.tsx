import { MoveDown } from "lucide-react";
import { OrbitCanvas } from "@/components/home/orbit/OrbitCanvas";
import { RouteNodes } from "@/components/home/orbit/RouteNodes";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function OrbitHero() {
  return (
    <section className="relative min-h-[960px] overflow-hidden bg-night pt-36 text-white md:min-h-screen md:pt-44">
      <div className="orbit-aura absolute left-1/2 top-[38%] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-[110px]" />
      <OrbitCanvas />
      <div className="container-shell relative z-10"><div className="flex items-center justify-between text-[10px] font-bold tracking-[0.2em] text-secondary"><span>ATLAS ORBIT / 03</span><span className="hidden sm:block">A LIVING MAP FOR STUDYING ABROAD</span></div><h1 className="mt-14 max-w-6xl text-[clamp(4.2rem,10vw,10rem)] leading-[.78] font-semibold tracking-[-0.085em]">Map the whole journey.<br /><span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,.45)]">Move one step.</span></h1><div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><p className="max-w-xl text-lg leading-8 text-white/60">Atlas connects every requirement, payment, decision, and human conversation to the route ahead—so progress feels spatial, not scattered.</p><ButtonLink href="#constellation" variant="inverse">Explore the system</ButtonLink></div><RouteNodes /><p className="mt-16 flex items-center gap-3 text-xs tracking-[0.14em] text-white/38"><MoveDown className="h-4 w-4" /> FOLLOW THE ROUTE</p></div>
    </section>
  );
}

