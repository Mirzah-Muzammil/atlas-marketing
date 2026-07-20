import { CircleDollarSign, FileCheck2, MessageCircleMore, Route } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const productNodes = [
  { icon: Route, label: "Journey", copy: "One route from first research to first semester." },
  { icon: FileCheck2, label: "Documents", copy: "Files stay attached to the step they unlock." },
  { icon: CircleDollarSign, label: "Money", copy: "Costs and payment moments appear in context." },
  { icon: MessageCircleMore, label: "Concierge", copy: "Human guidance joins the same record." },
];

export function ProductConstellation() {
  return (
    <section className="section-space overflow-hidden bg-night text-white" id="constellation"><div className="container-shell"><Reveal><p className="text-xs font-bold tracking-[0.2em] text-secondary">THE PRODUCT CONSTELLATION</p><h2 className="mt-6 max-w-5xl text-[clamp(3.3rem,8vw,7.6rem)] leading-[.86] font-semibold tracking-[-0.075em]">Everything keeps its place around you.</h2></Reveal><div className="relative mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-4"><div className="absolute left-1/2 top-1/2 hidden h-px w-[85%] -translate-x-1/2 bg-gradient-to-r from-transparent via-secondary/40 to-transparent lg:block" />{productNodes.map((node, index) => <article className={"relative z-10 min-h-72 rounded-[2rem] border border-white/12 bg-white/5 p-6 backdrop-blur-xl transition duration-500 hover:-translate-y-3 hover:bg-white/9 " + (index % 2 ? "lg:translate-y-10" : "lg:-translate-y-6")} key={node.label}><div className="grid h-12 w-12 place-items-center rounded-full border border-secondary/25 bg-primary/15"><node.icon className="h-5 w-5 text-secondary" /></div><p className="mt-16 text-[10px] font-bold tracking-[0.18em] text-accent">NODE 0{index + 1}</p><h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">{node.label}</h3><p className="mt-4 text-sm leading-6 text-white/52">{node.copy}</p></article>)}</div></div></section>
  );
}
