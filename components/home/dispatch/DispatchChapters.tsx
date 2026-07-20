import { journeyStages } from "@/constants/content";
import { DispatchChaptersMotion } from "@/components/home/dispatch/DispatchChaptersMotion";

export function DispatchChapters() {
  return (
    <section className="relative bg-ink text-paper" id="dispatches">
      <div className="container-shell flex flex-col py-20" data-dispatch-shell>
        <div className="flex items-end justify-between border-b border-paper/25 pb-5"><div><p className="text-xs font-bold tracking-[0.2em] text-secondary">THE ATLAS DISPATCHES</p><h2 className="mt-3 font-editorial text-5xl tracking-[-0.05em] md:text-7xl">Five chapters. One thread.</h2></div><p className="hidden text-xs tracking-[0.16em] text-paper/50 lg:block">SCROLL TO READ →</p></div>
        <div className="mt-10 flex flex-col gap-5" data-dispatch-track>
          {journeyStages.map((stage, index) => <article className="group relative min-h-[470px] overflow-hidden border border-paper/20 p-7" data-dispatch-card key={stage.id}><div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-700 group-hover:scale-x-100" /><p className="text-xs font-bold tracking-[0.17em] text-secondary">Dispatch 0{index + 1}</p><div className="mt-20 flex items-end justify-between border-b border-paper/20 pb-5"><h3 className="font-editorial text-6xl italic md:text-8xl">{stage.title}</h3><span className="text-5xl text-paper/10">{stage.number}</span></div><p className="mt-7 text-sm font-bold tracking-[0.14em] text-accent">{stage.eyebrow.toUpperCase()}</p><p className="mt-4 max-w-md text-base leading-7 text-paper/70">{stage.description}</p><p className="absolute bottom-7 left-7 font-editorial text-lg italic text-paper/85">“{stage.promise}”</p></article>)}
        </div>
      </div>
      <DispatchChaptersMotion />
    </section>
  );
}
