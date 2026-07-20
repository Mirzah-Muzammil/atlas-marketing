const principles = ["Show the next meaningful step.", "Keep context across every handoff.", "Use human judgement where certainty matters."];

export function OperatingPrinciples() {
  return (
    <section className="overflow-hidden bg-paper py-24 text-ink" data-dispatch-principles><div className="container-shell"><p className="text-center text-xs font-bold tracking-[0.2em]">OUR OPERATING PRINCIPLES</p><ol className="mt-14">{principles.map((principle, index) => <li className="group grid grid-cols-[auto_1fr_auto] gap-6 border-t border-ink/25 py-9 last:border-b md:items-center md:py-13" data-principle-beat key={principle}><span className="text-xs font-bold text-accent">0{index + 1}</span><p className="font-editorial text-[clamp(2.4rem,5.8vw,6rem)] leading-[.9] italic tracking-[-0.05em]">{principle}</p><span aria-hidden="true" className="hidden text-4xl text-accent transition-transform duration-500 group-hover:translate-x-3 md:block">→</span></li>)}</ol></div></section>
  );
}
