import { journeyStages } from "@/constants/content";
import { DispatchChaptersMotion } from "@/components/home/dispatch/DispatchChaptersMotion";

export function DispatchChapters() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper" id="dispatches">
      <div className="container-shell flex flex-col py-20" data-dispatch-shell>
        <div className="flex items-end justify-between border-b border-paper/25 pb-5"><div><p className="text-xs font-bold tracking-[0.2em] text-secondary">THE ATLAS DISPATCHES</p><h2 className="mt-3 font-editorial text-5xl tracking-[-0.05em] md:text-7xl">Five chapters. One thread.</h2></div><div className="hidden items-center gap-4 text-xs tracking-[0.16em] text-paper/60 lg:flex"><span className="h-px w-16 bg-paper/30" />SCROLL TO READ →</div></div>
        <div aria-hidden="true" className="mt-7 hidden items-center justify-between text-[10px] font-bold tracking-[0.18em] text-paper/45 lg:flex" data-testid="dispatch-progress-thread">{journeyStages.map((stage, index) => <span data-dispatch-progress key={stage.id}>0{index + 1} · {stage.title}</span>)}</div>
        <div className="relative mt-10 flex flex-col gap-5" data-dispatch-track>
          <div aria-hidden="true" className="absolute left-0 top-0 hidden h-px w-full origin-left bg-accent lg:block" data-dispatch-thread-line />
          {journeyStages.map((stage, index) => <article className="group relative min-h-[470px] overflow-hidden border border-paper/20 p-7 transition-colors duration-500 hover:border-secondary/70" data-dispatch-card data-dispatch-index={index} key={stage.id}><span aria-hidden="true" className="absolute -right-4 -top-14 font-editorial text-[13rem] leading-none text-paper/[0.045] transition-transform duration-700 group-hover:scale-110">0{index + 1}</span><div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-700 group-hover:scale-x-100" /><p className="relative text-xs font-bold tracking-[0.17em] text-secondary">Dispatch 0{index + 1}</p><div className="relative mt-20 flex items-end justify-between border-b border-paper/20 pb-5"><h3 className="font-editorial text-6xl italic md:text-8xl">{stage.title}</h3><span className="text-5xl text-paper/10">{stage.number}</span></div><p className="relative mt-7 text-sm font-bold tracking-[0.14em] text-accent">{stage.eyebrow.toUpperCase()}</p><p className="relative mt-4 max-w-md text-base leading-7 text-paper/75">{stage.description}</p><p className="absolute bottom-7 left-7 font-editorial text-lg italic text-paper/85">“{stage.promise}”</p></article>)}
        </div>
      </div>
      <DispatchChaptersMotion />
    </section>
  );
}
