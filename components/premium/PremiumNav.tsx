import { AtlasLogo } from "@/components/ui/AtlasLogo";

const earlyAccessHref =
  "mailto:hello@atlas.study?subject=GGI%20Atlas%20early%20access";

export function PremiumNav() {
  return (
    <nav data-premium-nav aria-label="Primary" className="premium-nav">
      <div className="premium-nav__inner" data-premium-nav-shell>
        <div className="premium-nav__brand-lockup">
          <AtlasLogo href="/premium" className="premium-nav__brand" />
          <span>For students moving abroad</span>
        </div>
        <div className="premium-nav__links">
          <a href="#premium-services" aria-label="Services"><span>[01]</span> Services</a>
          <a href="#premium-journey" aria-label="How it works"><span>[02]</span> The journey</a>
        </div>
        <a className="premium-nav__cta" href={earlyAccessHref}>
          Start free
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </nav>
  );
}
