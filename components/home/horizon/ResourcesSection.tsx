import { ArrowUpRight } from "lucide-react";
import { resources } from "@/constants/content";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function ResourcesSection() {
  return (
    <section className="section-space bg-background" id="resources"><div className="container-shell"><SectionIntro eyebrow="Read before you rush" title="Useful answers, without the content mill." /><div className="mt-14 divide-y divide-primary-deep/15 border-y border-primary-deep/15">{resources.map((resource) => <a className="group grid gap-3 py-7 transition-colors hover:text-primary md:grid-cols-[.2fr_1fr_auto] md:items-center" href="#get-started" key={resource.title}><span className="text-xs font-bold tracking-[0.17em] text-primary">{resource.category}</span><h3 className="max-w-3xl text-xl font-semibold tracking-[-0.03em] md:text-2xl">{resource.title}</h3><span className="flex items-center gap-3 text-sm text-muted">{resource.readTime}<ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></span></a>)}</div></div></section>
  );
}

