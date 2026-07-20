const fragments = [
  ["The old way", "Advice in one inbox. Documents in another. Deadlines wherever you last wrote them down."],
  ["The cost", "Every handoff makes the journey feel harder than it is—and makes important context disappear."],
  ["The Atlas edit", "One evolving plan that reveals the next relevant chapter without showing you the whole maze at once."],
];

export function FragmentedJourney() {
  return (
    <section className="bg-paper py-24 text-ink md:py-32"><div className="container-shell"><p className="mb-12 text-center text-xs font-bold tracking-[0.2em]">THE PROBLEM IS NOT A LACK OF INFORMATION</p><h2 className="mx-auto max-w-5xl text-center font-editorial text-[clamp(3.2rem,8vw,7rem)] leading-[.9] tracking-[-0.06em]">The journey was fragmented long before you arrived.</h2><div className="mt-20 grid border-t border-ink/25 md:grid-cols-3">{fragments.map(([title, body], index) => <article className="border-b border-ink/25 py-8 md:border-r md:px-8 md:last:border-r-0" key={title}><p className="text-xs font-bold tracking-[0.16em] text-accent">0{index + 1}</p><h3 className="mt-8 font-editorial text-3xl">{title}</h3><p className="mt-5 text-sm leading-7 text-ink/65">{body}</p></article>)}</div></div></section>
  );
}
