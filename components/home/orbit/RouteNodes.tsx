import { journeyStages } from "@/constants/content";

export function RouteNodes() {
  return (
    <ol aria-label="Atlas journey route" className="relative z-10 mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/16 pt-6 text-white sm:grid-cols-5">
      {journeyStages.map((stage, index) => <li className={index === 4 ? "text-accent" : "text-white/58"} key={stage.id}><span className="mb-3 block h-2 w-2 rounded-full bg-current shadow-[0_0_18px_currentColor]" /><span className="text-[10px] font-bold tracking-[0.18em]">{stage.number}</span><span className="mt-1 block text-sm font-semibold text-white">{stage.title}</span></li>)}
    </ol>
  );
}

