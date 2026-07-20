import { cn } from "@/utils/cn";

type RouteTransitionLineProps = { className?: string };

export function RouteTransitionLine({ className }: RouteTransitionLineProps) {
  return (
    <span aria-hidden="true" className={cn("block h-px overflow-hidden", className)}>
      <span className="block h-full origin-left bg-current" data-transition-line />
    </span>
  );
}
