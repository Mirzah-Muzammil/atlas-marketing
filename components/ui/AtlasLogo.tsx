import Link from "next/link";
import { cn } from "@/utils/cn";

type AtlasLogoProps = { className?: string; href?: string; markOnly?: boolean };

export function AtlasLogo({ className, href = "/", markOnly = false }: AtlasLogoProps) {
  return (
    <Link aria-label="Atlas home" className={cn("inline-flex items-center gap-2.5 font-semibold tracking-[-0.03em]", className)} href={href}>
      <svg aria-hidden="true" className="h-8 w-8" viewBox="0 0 32 32">
        <path d="M4 23.5 15.2 4h2.1L28 23.5l-7.1-3.8-4.7 8.3-4.9-8.3L4 23.5Z" fill="currentColor" />
        <path d="m11.3 19.7 4.9-8.5 4.7 8.5-4.7-2.5-4.9 2.5Z" fill="var(--color-accent)" />
      </svg>
      {!markOnly && <span className="text-xl">atlas</span>}
    </Link>
  );
}

