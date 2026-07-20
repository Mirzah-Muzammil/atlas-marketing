import { ArrowUpRight } from "lucide-react";

import { resources } from "@/constants/content";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function ResourcesSection() {
  return (
    <section className="section-space bg-background" id="resources">
      <div className="container-shell">
        <SectionIntro eyebrow="Read before you rush" title="Useful answers, without the content mill." />
        <div className="mt-14 grid gap-5 md:grid-cols-3" data-testid="resource-tear-sheets">
          {resources.map((resource, index) => (
            <a className="group relative min-h-96 overflow-hidden border border-primary-deep/15 bg-paper p-7 transition-colors duration-500 [clip-path:polygon(0_0,calc(100%-1.25rem)_0,100%_1.25rem,100%_100%,0_100%)] hover:bg-white focus-visible:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" href="#get-started" key={resource.title}>
              <span aria-hidden="true" className="absolute right-0 top-0 h-5 w-5 border-b border-l border-primary-deep/15" />
              <span className="block text-xs font-bold tracking-[0.17em] text-primary transition-transform duration-500 group-hover:translate-x-2 group-focus-visible:translate-x-2">{resource.category} · 0{index + 1}</span>
              <h3 className="mt-16 text-3xl font-semibold leading-tight tracking-[-0.045em] text-primary-deep transition-transform duration-500 group-hover:-translate-y-2 group-focus-visible:-translate-y-2">{resource.title}</h3>
              <span className="absolute inset-x-7 bottom-7 flex items-center justify-between border-t border-primary-deep/15 pt-5 text-sm text-muted">{resource.readTime}<ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1" /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
