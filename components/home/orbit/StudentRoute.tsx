import { StudentRouteMotion } from "@/components/home/orbit/StudentRouteMotion";

const routeMoments = [
  ["Today", "Choose the next three applications worth your energy."],
  ["After an offer", "Turn visa requirements into a personal checklist."],
  ["Before departure", "Connect housing, money, travel, and arrival details."],
  ["After landing", "Keep the route alive while your new life begins."],
];

export function StudentRoute() {
  return (
    <section className="section-space relative overflow-hidden bg-night text-white" data-testid="student-flight-path" id="route"><div aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-secondary/25 to-transparent" /><div className="container-shell relative"><div className="grid gap-12 lg:grid-cols-[.55fr_1.45fr]"><div><p className="text-xs font-bold tracking-[0.2em] text-accent">A ROUTE, NOT A FUNNEL</p><h2 className="mt-6 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">Your life does not move in perfect stages.</h2><p className="mt-7 max-w-sm text-sm leading-7 text-white/65">The route changes shape as life does. Atlas keeps the next useful decision visible.</p></div><ol className="relative border-l border-secondary/25 pl-8 md:pl-14">{routeMoments.map(([time, copy], index) => <li className="relative min-h-48 border-b border-white/10 py-8 last:border-none" data-flight-milestone data-flight-index={index} key={time}><span className="absolute -left-[2.32rem] top-10 h-3 w-3 rounded-full border-2 border-night bg-secondary shadow-[0_0_22px_rgba(138,180,255,.8)] md:-left-[3.82rem]" /><p className="text-xs font-bold tracking-[0.17em] text-secondary">0{index + 1} / {time.toUpperCase()}</p><p className="mt-5 max-w-2xl text-2xl leading-9 text-white/80 md:text-4xl md:leading-[1.15]">{copy}</p></li>)}</ol></div></div><StudentRouteMotion /></section>
  );
}
