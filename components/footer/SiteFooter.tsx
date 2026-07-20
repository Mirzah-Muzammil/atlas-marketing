import { AtlasLogo } from "@/components/ui/AtlasLogo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { editionNavigation, footerNavigation } from "@/constants/navigation";
import { cn } from "@/utils/cn";

type SiteFooterProps = { tone?: "light" | "dark" };

export function SiteFooter({ tone = "dark" }: SiteFooterProps) {
  const isDark = tone === "dark";
  return (
    <footer className={cn("border-t py-10", isDark ? "border-white/10 bg-night text-white" : "border-border bg-surface text-foreground")}>
      <div className="container-shell">
        <div className="grid gap-10 border-b border-current/10 pb-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <AtlasLogo className={isDark ? "text-white" : "text-primary-deep"} />
            <p className={cn("mt-5 max-w-sm text-sm leading-6", isDark ? "text-white/60" : "text-muted")}>The whole study-abroad journey, connected from application to arrival and beyond.</p>
            <ButtonLink className="mt-7" href="/#concierge" showArrow>Talk to Concierge</ButtonLink>
          </div>
          <nav aria-label="Atlas links">
            <p className="mb-4 text-xs font-bold tracking-[0.16em] opacity-50">EXPLORE</p>
            <ul className="space-y-3 text-sm">{footerNavigation.map((item) => <li key={item.label}><a className="transition-opacity hover:opacity-55" href={item.href}>{item.label}</a></li>)}</ul>
          </nav>
          <nav aria-label="Homepage editions">
            <p className="mb-4 text-xs font-bold tracking-[0.16em] opacity-50">THREE DIRECTIONS</p>
            <ul className="space-y-3 text-sm">{editionNavigation.map((item) => <li key={item.label}><a className="transition-opacity hover:opacity-55" href={item.href}>{item.label}</a></li>)}</ul>
          </nav>
        </div>
        <div className={cn("flex flex-col gap-3 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between", isDark ? "text-white/42" : "text-muted")}>
          <p>© {new Date().getFullYear()} Atlas. Your next chapter starts clearly.</p>
          <p>Built for students moving across borders.</p>
        </div>
      </div>
    </footer>
  );
}
