import { AtlasLogo } from "@/components/ui/AtlasLogo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { primaryNavigation } from "@/constants/navigation";

export function HorizonNav() {
  return (
    <header className="absolute inset-x-0 top-0 z-40 pt-5">
      <nav aria-label="Primary navigation" className="container-shell flex items-center justify-between rounded-full border border-white/50 bg-white/72 px-4 py-2.5 shadow-soft backdrop-blur-xl md:px-5">
        <AtlasLogo className="text-primary-deep" />
        <ul className="hidden items-center gap-7 text-sm font-medium text-primary-deep/70 lg:flex">
          {primaryNavigation.map((item) => <li key={item.label}><a className="transition-colors hover:text-primary-deep" href={item.href}>{item.label}</a></li>)}
        </ul>
        <ButtonLink className="min-h-10 px-4 py-2" href="#get-started">Get started free</ButtonLink>
      </nav>
    </header>
  );
}

