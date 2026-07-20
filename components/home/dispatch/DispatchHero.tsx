import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function DispatchHero() {
  return (
    <section className="overflow-hidden border-b border-ink/25 bg-paper text-ink">
      <div className="container-shell grid min-h-[82svh] border-x border-ink/20 md:grid-cols-[1fr_1.28fr]">
        <div className="order-2 flex flex-col justify-between border-t border-ink/20 p-6 md:order-1 md:border-t-0 md:border-r md:p-10 lg:p-14">
          <p className="max-w-xs font-editorial text-xl leading-7 italic">An operating system for everything between “I want to go” and “I live here now.”</p>
          <div className="mt-16"><p className="text-xs font-bold tracking-[0.18em]">ATLAS / EDITION 02</p><p className="mt-5 max-w-sm text-base leading-7 text-ink/68">Applications, visas, money, housing, and arrival. One continuous story—not five disconnected services.</p><ButtonLink className="mt-7" href="#dispatches" showArrow>Read the journey</ButtonLink></div>
        </div>
        <div className="order-1 p-4 md:order-2 md:p-8 lg:p-10">
          <div className="flex items-center justify-between border-b border-ink/25 pb-3 text-[10px] font-bold tracking-[0.18em]"><span>ISSUE NO. 01</span><span>FOR STUDENTS GOING PLACES</span></div>
          <h1 className="mt-7 font-editorial text-[clamp(4.8rem,11vw,10.8rem)] leading-[.72] tracking-[-0.075em]">One journey.<br /><span className="italic text-primary">Every border.</span></h1>
          <div className="relative mt-10 h-64 overflow-hidden md:h-80"><Image alt="International student looking toward an airport runway" className="object-cover object-[62%_40%] grayscale-[25%]" fill priority sizes="(max-width:768px) 100vw, 58vw" src="/images/atlas-departure.jpg" /><div className="absolute inset-0 bg-ink/10 mix-blend-multiply" /><p className="absolute bottom-4 left-4 bg-paper px-3 py-2 text-[10px] font-bold tracking-[0.16em]">THE DEPARTURE IS ONLY CHAPTER FOUR</p></div>
          <ArrowDownRight className="ml-auto mt-5 h-8 w-8" />
        </div>
      </div>
    </section>
  );
}
