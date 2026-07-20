import { cn } from "@/utils/cn";

type LoaderMarkProps = { className?: string };

export function LoaderMark({ className }: LoaderMarkProps) {
  return (
    <svg aria-hidden="true" className={cn("h-14 w-14", className)} viewBox="0 0 32 32">
      <path d="M4 23.5 15.2 4h2.1L28 23.5l-7.1-3.8-4.7 8.3-4.9-8.3L4 23.5Z" fill="currentColor" />
      <path className="text-accent" d="m11.3 19.7 4.9-8.5 4.7 8.5-4.7-2.5-4.9 2.5Z" fill="currentColor" />
    </svg>
  );
}
