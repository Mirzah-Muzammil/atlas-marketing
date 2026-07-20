import { cn } from "@/utils/cn";

type SectionIntroProps = { eyebrow: string; title: string; body?: string; align?: "left" | "center"; tone?: "light" | "dark"; className?: string };

export function SectionIntro({ align = "left", body, className, eyebrow, title, tone = "light" }: SectionIntroProps) {
  return (
    <header className={cn("max-w-3xl", align === "center" && "mx-auto text-center", tone === "dark" ? "text-white" : "text-foreground", className)}>
      <p className={cn("mb-5 text-xs font-bold tracking-[0.18em]", tone === "dark" ? "text-secondary" : "text-primary")}>{eyebrow.toUpperCase()}</p>
      <h2 className="text-balance text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.96] font-semibold tracking-[-0.06em]">{title}</h2>
      {body && <p className={cn("mt-6 max-w-2xl text-base leading-7 md:text-lg", tone === "dark" ? "text-white/68" : "text-muted")}>{body}</p>}
    </header>
  );
}
