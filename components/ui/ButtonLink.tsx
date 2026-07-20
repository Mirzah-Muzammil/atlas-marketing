import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/utils/cn";

type ButtonLinkProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "inverse";
  showArrow?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

const variants = {
  primary: "bg-accent text-white shadow-card hover:bg-accent-hover focus-visible:outline-accent",
  secondary: "border border-primary-deep/15 bg-white text-primary-deep hover:border-primary-deep/35",
  ghost: "text-primary-deep hover:bg-primary-deep/6",
  inverse: "border border-white/25 bg-white/10 text-white hover:bg-white/16",
};

export function ButtonLink({ children, className, href, showArrow = false, variant = "primary", ...props }: ButtonLinkProps) {
  return (
    <Link className={cn("group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-4", variants[variant], className)} href={href} {...props}>
      <span>{children}</span>
      {showArrow && <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
    </Link>
  );
}
