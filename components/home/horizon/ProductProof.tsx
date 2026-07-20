import { CheckCircle2, CircleDollarSign, FileCheck2, Home, ListChecks } from "lucide-react";

import { ProductProofMotion } from "@/components/home/horizon/ProductProofMotion";
import { Reveal } from "@/components/motion/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";

const productStates = [
  {
    label: "Shortlist",
    eyebrow: "BUILD THE RIGHT SHORTLIST",
    decision: "Compare programmes and choose what belongs on your shortlist.",
    reassurance: "No spreadsheet archaeology.",
    icon: ListChecks,
  },
  {
    label: "Visa preparation",
    eyebrow: "PREPARE YOUR VISA FILE",
    decision: "Review financial evidence before you submit.",
    reassurance: "Clarity before every submission.",
    icon: FileCheck2,
  },
  {
    label: "Money plan",
    eyebrow: "PLAN THE REAL COST",
    decision: "See tuition, deposits, living costs, and essential payments together.",
    reassurance: "Fewer expensive surprises.",
    icon: CircleDollarSign,
  },
  {
    label: "Arrival plan",
    eyebrow: "LAND READY",
    decision: "Coordinate housing, travel, and the practical details of your first week.",
    reassurance: "A softer landing.",
    icon: Home,
  },
];

export function ProductProof() {
  return (
    <section className="relative overflow-hidden bg-surface pb-24 pt-28 lg:pb-36" data-testid="product-proof-scene">
      <div aria-hidden="true" className="absolute left-1/2 top-0 h-24 w-px -translate-x-1/2 bg-primary-deep/20" data-product-route-entry>
        <span className="block h-full w-full origin-top bg-accent" data-product-route-line />
      </div>
      <div className="container-shell">
        <Reveal>
          <SectionIntro eyebrow="The calm in your pocket" title="A plan you can actually understand." body="Not another dense dashboard. Atlas shows the next meaningful action, why it matters, and where to get help." />
        </Reveal>
        <div className="mt-14 lg:grid lg:grid-cols-[.34fr_.66fr] lg:items-start lg:gap-5" data-product-scroll>
          <aside className="bg-primary-deep p-7 text-white lg:sticky lg:top-6 lg:min-h-[38rem] lg:p-9" data-product-shell>
            <p className="text-xs tracking-[0.18em] text-secondary">WELCOME BACK, MAYA</p>
            <h3 className="mt-6 text-3xl font-semibold tracking-[-0.04em]">Your whole plan, in motion.</h3>
            <ol className="mt-10 space-y-1 text-sm" aria-label="Product preview states">
              {productStates.map((state, index) => (
                <li className="flex items-center gap-4 border-b border-white/10 py-4" data-product-signal key={state.label}>
                  <span className="text-[10px] font-bold tracking-[0.16em] text-secondary">0{index + 1}</span>
                  <span>{state.label}</span>
                </li>
              ))}
            </ol>
          </aside>
          <div className="relative bg-background p-3 lg:min-h-[38rem]" data-product-frame>
            <span aria-hidden="true" className="absolute -top-14 left-1/2 h-14 w-px -translate-x-1/2 bg-accent" data-product-frame-entry />
            <div className="relative space-y-3 lg:min-h-[36.5rem]" data-product-state-stack>
              {productStates.map((state, index) => (
                <article className="flex min-h-[25rem] flex-col justify-between bg-white p-7 shadow-card md:p-10 lg:min-h-[36.5rem]" data-product-state key={state.label}>
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="text-xs font-bold tracking-[0.17em] text-primary">{state.eyebrow}</p>
                      <h3 className="mt-3 max-w-xl text-4xl font-semibold tracking-[-0.05em] text-primary-deep md:text-5xl">{state.label}</h3>
                    </div>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/8 text-primary"><state.icon className="h-6 w-6" /></span>
                  </div>
                  <div className="mt-12 grid gap-4 md:grid-cols-[1fr_.8fr] md:items-end">
                    <div className="border-l-2 border-primary pl-5" data-product-decision>
                      <p className="text-xs font-bold tracking-[0.16em] text-muted">YOUR DECISION</p>
                      <p className="mt-3 text-xl leading-8 text-primary-deep">{state.decision}</p>
                    </div>
                    <p className="flex items-center gap-3 border-t border-border pt-5 text-sm text-muted md:border-l md:border-t-0 md:pl-6 md:pt-0" data-product-reassurance>
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />{state.reassurance}
                    </p>
                  </div>
                  {index === productStates.length - 1 && <span aria-hidden="true" className="absolute bottom-0 left-1/2 h-16 w-px translate-y-full bg-accent" />}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ProductProofMotion />
    </section>
  );
}
