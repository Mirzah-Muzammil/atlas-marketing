import { AtlasLogo } from "@/components/ui/AtlasLogo";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function OrbitNav() {
  return (
    <header className="absolute inset-x-0 top-0 z-40 pt-5 text-white"><nav aria-label="Orbit navigation" className="container-shell flex items-center justify-between rounded-full border border-white/12 bg-night/55 px-4 py-2.5 backdrop-blur-xl"><AtlasLogo className="text-white" /><div className="hidden items-center gap-6 text-xs font-semibold tracking-[0.12em] text-white/55 md:flex"><a href="#constellation">PRODUCT</a><a href="#ecosystem">ECOSYSTEM</a><a href="#route">ROUTE</a></div><ButtonLink className="min-h-10 px-4 py-2" href="#launch">Enter Atlas</ButtonLink></nav></header>
  );
}

