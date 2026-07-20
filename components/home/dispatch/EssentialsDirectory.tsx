import { essentials } from "@/constants/content";

export function EssentialsDirectory() {
  return (
    <section className="border-y border-ink/25 bg-paper py-24 text-ink"><div className="container-shell"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><h2 className="font-editorial text-6xl tracking-[-0.055em] md:text-8xl">The essentials directory.</h2><p className="max-w-sm text-sm leading-6 text-ink/60">Services enter the story only when they are relevant to the student’s next move.</p></div><div className="mt-16 grid border-l border-t border-ink/25 sm:grid-cols-2 lg:grid-cols-5">{essentials.map((item, index) => <article className="min-h-72 border-r border-b border-ink/25 p-5 transition-colors hover:bg-ink hover:text-paper" key={item.title}><p className="font-editorial text-5xl italic text-accent">{String.fromCharCode(65 + index)}</p><item.icon className="mt-16 h-6 w-6" /><h3 className="mt-5 text-lg font-semibold">{item.title}</h3><p className="mt-3 text-xs leading-5 opacity-60">{item.description}</p></article>)}</div></div></section>
  );
}
