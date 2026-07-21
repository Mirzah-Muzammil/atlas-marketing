import { AtlasLogo } from "@/components/ui/AtlasLogo";

export function DispatchNav() {
  return (
    <header
      className="pointer-events-none bg-white/10 backdrop-blur-md fixed inset-x-0 top-4 z-50 px-3 mx-10 rounded-3xl flex flex-col justify-center items-center  text-dispatch-ink sm:px-5"
      data-dispatch-entrance="nav"
      data-editorial-nav
    >
      <div className="container-shell flex w-full items-center justify-center">
        <nav
          aria-label="Site navigation"
          className="flex min-h-16 w-full items-center justify-between gap-5 rounded-b-[1.35rem]  px-4 shadow-dispatch-nav  sm:px-6"
        >
          <AtlasLogo
            className="editorial-logo shrink-0 text-dispatch-ink"
            href="/editorial"
          />

          <ul className="hidden items-center gap-7 text-[13px] font-medium text-dispatch-ink/82 lg:flex">
            <li>
              <a
                className="transition-colors hover:text-dispatch-ink"
                href="/how-it-works"
              >
                How it works
              </a>
            </li>
            <li>
              <a
                className="transition-colors hover:text-dispatch-ink"
                href="/concierge"
              >
                Concierge
              </a>
            </li>
            <li>
              <a
                className="transition-colors hover:text-dispatch-ink"
                href="/resources-marketing"
              >
                Resources
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              className="hidden text-[13px] font-semibold text-dispatch-ink/82 transition-colors hover:text-dispatch-ink sm:block"
              href="/dashboard"
            >
              Sign in
            </a>
            <a
              className="inline-flex min-h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-dispatch-ink px-4 text-[13px] font-semibold text-dispatch-canvas transition-colors hover:bg-dispatch-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dispatch-ink sm:px-5"
              href="/get-started"
            >
              Get started
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
