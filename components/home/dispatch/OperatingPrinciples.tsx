const principles = ["Show the next meaningful step.", "Keep context across every handoff.", "Use human judgement where certainty matters."];

export function OperatingPrinciples() {
  return (
    <section className="bg-paper py-24 text-ink"><div className="container-shell"><p className="text-center text-xs font-bold tracking-[0.2em]">OUR OPERATING PRINCIPLES</p><ol className="mx-auto mt-14 max-w-5xl">{principles.map((principle, index) => <li className="grid grid-cols-[auto_1fr] gap-6 border-t border-ink/25 py-8 last:border-b md:items-center" key={principle}><span className="text-xs font-bold text-accent">0{index + 1}</span><p className="font-editorial text-3xl italic md:text-5xl">{principle}</p></li>)}</ol></div></section>
  );
}

