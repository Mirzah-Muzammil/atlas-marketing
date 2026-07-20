import { resources } from "@/constants/content";

export function FieldGuide() {
  return (
    <section className="bg-paper py-24 text-ink" id="field-guide"><div className="container-shell grid gap-12 lg:grid-cols-[.36fr_.64fr]"><div><p className="text-xs font-bold tracking-[0.2em] text-accent">THE FIELD GUIDE</p><h2 className="mt-5 font-editorial text-6xl leading-[.9] tracking-[-0.055em]">Keep the useful pages.</h2><p className="mt-6 max-w-sm text-sm leading-7 text-ink/62">Practical explanations written for the moment you need them—not for search-engine volume.</p></div><div className="border-t border-ink/30">{resources.map((resource, index) => <a className="group grid grid-cols-[auto_1fr_auto] gap-5 border-b border-ink/30 py-6" href="#begin" key={resource.title}><span className="font-editorial text-2xl italic text-accent">0{index + 1}</span><span><span className="text-[10px] font-bold tracking-[0.16em]">{resource.category}</span><span className="mt-2 block text-lg font-semibold transition-transform group-hover:translate-x-2">{resource.title}</span></span><span className="text-xs text-ink/50">{resource.readTime}</span></a>)}</div></div></section>
  );
}
