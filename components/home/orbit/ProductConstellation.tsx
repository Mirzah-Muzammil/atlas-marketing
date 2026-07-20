import { CircleDollarSign, FileCheck2, MessageCircleMore, Route } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ProductConstellationMotion } from "@/components/home/orbit/ProductConstellationMotion";

const productNodes = [
  { icon: Route, label: "Journey", copy: "One route from first research to first semester." },
  { icon: FileCheck2, label: "Documents", copy: "Files stay attached to the step they unlock." },
  { icon: CircleDollarSign, label: "Money", copy: "Costs and payment moments appear in context." },
  { icon: MessageCircleMore, label: "Concierge", copy: "Human guidance joins the same record." },
];

export function ProductConstellation() {
  return (
    <section className="relative overflow-hidden bg-night text-white" data-testid="product-node-stage" id="constellation"><div className="container-shell py-24 lg:py-0" data-constellation-scroll><div className="lg:grid lg:min-h-screen lg:items-center" data-constellation-pin><div><Reveal><p className="text-xs font-bold tracking-[0.2em] text-secondary">THE PRODUCT CONSTELLATION</p><h2 className="mt-6 max-w-5xl text-[clamp(3.3rem,8vw,7.6rem)] leading-[.86] font-semibold tracking-[-0.075em]">Everything keeps its place around you.</h2></Reveal><div className="relative mt-16 grid gap-4 md:grid-cols-2 lg:mt-20 lg:min-h-[32rem] lg:grid-cols-1" data-constellation-stage><div aria-hidden="true" className="absolute left-1/2 top-1/2 hidden h-px w-[85%] -translate-x-1/2 bg-gradient-to-r from-transparent via-secondary/40 to-transparent lg:block" data-constellation-line />{productNodes.map((node, index) => <article className="relative z-10 min-h-64 rounded-[2rem] border border-white/12 bg-white/5 p-6 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:bg-white/9 lg:min-h-[25rem] lg:max-w-xl" data-orbit-node data-orbit-node-index={index} key={node.label}><div className="grid h-12 w-12 place-items-center rounded-full border border-secondary/25 bg-primary/15"><node.icon className="h-5 w-5 text-secondary" /></div><p className="mt-12 text-[10px] font-bold tracking-[0.18em] text-accent">NODE 0{index + 1}</p><h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">{node.label}</h3><p className="mt-4 max-w-sm text-sm leading-6 text-white/65">{node.copy}</p><span aria-hidden="true" className="absolute bottom-7 right-7 text-[10px] font-bold tracking-[0.16em] text-secondary">ACTIVE SIGNAL</span></article>)}</div></div></div></div><ProductConstellationMotion /></section>
  );
}
