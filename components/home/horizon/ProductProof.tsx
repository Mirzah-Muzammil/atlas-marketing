import { CheckCircle2, FileCheck2, MessageCircleMore } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function ProductProof() {
  return (
    <section className="section-space overflow-hidden bg-surface">
      <div className="container-shell">
        <Reveal><SectionIntro eyebrow="The calm in your pocket" title="A plan you can actually understand." body="Not another dense dashboard. Atlas shows the next meaningful action, why it matters, and where to get help." /></Reveal>
        <div className="mt-16 grid gap-4 rounded-[2.5rem] bg-background p-3 shadow-soft lg:grid-cols-[.34fr_.66fr] lg:p-5">
          <aside className="rounded-[2rem] bg-primary-deep p-6 text-white md:p-8">
            <p className="text-xs tracking-[0.18em] text-secondary">WELCOME BACK, MAYA</p><h3 className="mt-6 text-3xl font-semibold tracking-[-0.04em]">You are moving well.</h3>
            <nav aria-label="Product preview" className="mt-10 space-y-2 text-sm">{["Journey", "Documents", "Money", "Concierge"].map((item, index) => <p className={index === 0 ? "rounded-xl bg-white/12 px-4 py-3" : "px-4 py-3 text-white/48"} key={item}>{item}</p>)}</nav>
          </aside>
          <div className="rounded-[2rem] bg-white p-6 md:p-9">
            <div className="flex items-start justify-between gap-6"><div><p className="text-xs font-bold tracking-[0.17em] text-primary">THIS WEEK</p><h3 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-primary-deep">Prepare your visa file</h3></div><span className="rounded-full bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">On track</span></div>
            <div className="mt-9 space-y-3">
              <div className="flex items-center gap-4 rounded-2xl border border-border p-4"><CheckCircle2 className="h-6 w-6 text-success" /><div><p className="font-semibold">Offer letter saved</p><p className="text-sm text-muted">Checked and ready</p></div></div>
              <div className="flex items-center gap-4 rounded-2xl border border-primary/30 bg-primary/4 p-4"><FileCheck2 className="h-6 w-6 text-primary" /><div><p className="font-semibold">Review financial evidence</p><p className="text-sm text-muted">Your next best action · about 12 minutes</p></div></div>
              <div className="flex items-center gap-4 rounded-2xl border border-border p-4"><MessageCircleMore className="h-6 w-6 text-primary-deep/45" /><div><p className="font-semibold">Ask Concierge</p><p className="text-sm text-muted">Get a human answer before you submit</p></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
