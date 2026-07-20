const orbitStages = ["Apply", "Visa", "Finance", "Housing", "Arrival", "Thrive"];

export function RouteNodes() {
  return (
    <ol aria-label="Atlas journey route" className="relative z-10 mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/16 pt-6 text-white sm:grid-cols-6">
      {orbitStages.map((stage, index) => <li className={index === orbitStages.length - 1 ? "text-accent" : "text-white/65"} key={stage}><span className="mb-3 block h-2 w-2 rounded-full bg-current shadow-[0_0_18px_currentColor]" /><span className="text-[10px] font-bold tracking-[0.18em]">0{index + 1}</span><span className="mt-1 block text-sm font-semibold text-white">{stage}</span></li>)}
    </ol>
  );
}
