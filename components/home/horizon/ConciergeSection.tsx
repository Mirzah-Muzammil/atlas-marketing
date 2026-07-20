import { MessageCircle, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function ConciergeSection() {
  return (
    <section className="relative bg-surface pb-28 pt-20" id="concierge">
      <div aria-hidden="true" className="absolute left-1/2 top-0 h-20 w-px -translate-x-1/2 bg-accent" />
      <div className="container-shell">
        <Reveal className="relative overflow-hidden bg-primary-deep px-8 py-14 text-white md:px-14 lg:px-20 lg:py-24">
          <span aria-hidden="true" className="absolute left-1/2 top-0 h-16 w-px -translate-x-1/2 bg-secondary/55" />
          <div className="grid gap-14 lg:grid-cols-[1fr_.72fr] lg:items-end">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-secondary">A SEPARATE PREMIUM PATH · ATLAS CONCIERGE</p>
              <h2 className="mt-5 max-w-4xl text-[clamp(3rem,7vw,6.4rem)] leading-[.92] font-semibold tracking-[-0.065em]">Technology for the plan. People for the moments that matter.</h2>
              <p className="mt-7 max-w-xl text-lg leading-8 text-white/72">When a requirement is ambiguous or a deadline feels too close, speak to someone who understands the journey—not a generic support queue.</p>
              <ButtonLink className="mt-8" href="#consultation-form" showArrow>Talk to Concierge</ButtonLink>
            </div>
            <div className="border-l border-white/15 pl-6 md:pl-9" data-testid="concierge-conversation">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-secondary font-bold text-primary-deep">AK</div>
                <div><p className="font-semibold">Aisha · Student specialist</p><p className="text-xs text-white/75">Typical reply during your session</p></div>
              </div>
              <div className="mt-6 bg-white p-5 text-sm leading-6 text-primary-deep"><MessageCircle className="mb-4 h-5 w-5 text-primary" />I’ve checked the sequence. Submit the bank statement after the updated offer letter so the dates align.</div>
              <p className="mt-4 flex items-center gap-2 text-xs text-white/75"><ShieldCheck className="h-4 w-4 text-success" /> Guidance stays connected to your plan</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
