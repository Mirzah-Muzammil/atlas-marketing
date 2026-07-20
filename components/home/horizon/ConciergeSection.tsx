import { MessageCircle, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";

export function ConciergeSection() {
  return (
    <section className="section-space bg-surface" id="concierge">
      <div className="container-shell">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-[radial-gradient(circle_at_88%_18%,rgba(138,180,255,.5),transparent_30%),linear-gradient(135deg,#0b2a66,#06152e)] p-8 text-white md:p-14 lg:p-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_.72fr] lg:items-end">
            <div><p className="text-xs font-bold tracking-[0.2em] text-secondary">ATLAS CONCIERGE</p><h2 className="mt-5 max-w-4xl text-[clamp(3rem,7vw,6.4rem)] leading-[.92] font-semibold tracking-[-0.065em]">Technology for the plan. People for the moments that matter.</h2><p className="mt-7 max-w-xl text-lg leading-8 text-white/62">When a requirement is ambiguous or a deadline feels too close, speak to someone who understands the journey—not a generic support queue.</p><ButtonLink className="mt-8" href="#get-started" showArrow>Talk to Concierge</ButtonLink></div>
            <div className="rounded-[2rem] border border-white/15 bg-white/8 p-5 backdrop-blur-xl"><div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-full bg-secondary font-bold text-primary-deep">AK</div><div><p className="font-semibold">Aisha · Student specialist</p><p className="text-xs text-white/48">Typical reply during your session</p></div></div><div className="mt-5 rounded-2xl bg-white p-4 text-sm leading-6 text-primary-deep"><MessageCircle className="mb-3 h-5 w-5 text-primary" />I’ve checked the sequence. Submit the bank statement after the updated offer letter so the dates align.</div><p className="mt-4 flex items-center gap-2 text-xs text-white/50"><ShieldCheck className="h-4 w-4 text-success" /> Guidance stays connected to your plan</p></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

