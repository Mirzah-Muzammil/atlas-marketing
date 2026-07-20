import { AtlasLogo } from "@/components/ui/AtlasLogo";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function DispatchNav() {
  return (
    <header className="border-b border-ink/25 bg-paper text-ink">
      <nav aria-label="Editorial navigation" className="container-shell grid grid-cols-[1fr_auto] items-center py-5 md:grid-cols-[1fr_auto_1fr]">
        <AtlasLogo />
        <p className="hidden text-center font-editorial text-sm italic md:block">The student journey, edited clearly.</p>
        <div className="flex items-center justify-end gap-5"><a className="hidden text-xs font-bold tracking-[0.16em] sm:block" href="#dispatches">THE DISPATCHES</a><ButtonLink className="min-h-10 px-4 py-2" href="#begin">Begin</ButtonLink></div>
      </nav>
    </header>
  );
}

