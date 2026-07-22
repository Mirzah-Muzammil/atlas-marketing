import { Skiper39 } from "@/components/ui/skiper-ui/skiper39";

export function PremiumHero() {
  return (
    <section
      data-premium-hero
      aria-labelledby="premium-hero-title"
      className="premium-hero relative h-[100svh] w-full overflow-hidden"
    >
      <div
        className="premium-hero__intro pointer-events-none absolute inset-x-0 z-10 px-4 text-center"
        data-premium-hero-intro
      >
        <p className="premium-hero__eyebrow">[ Atlas / Your move abroad ]</p>
        <h1 id="premium-hero-title" className="premium-hero__title">
          <span
            className="premium-hero__title-line premium-hero__title-line--intro"
            data-premium-hero-title-line
          >
            <span>Your operating system for</span>
          </span>{" "}
          <span
            className="premium-hero__title-line premium-hero__title-line--main"
            data-premium-hero-title-line
          >
            <span>studying and succeeding</span>
          </span>{" "}
          <span
            className="premium-hero__title-line premium-hero__title-line--accent"
            data-premium-hero-title-line
          >
            <span>abroad.</span>
          </span>
        </h1>
      </div>
      <div
        className="premium-hero__crowd absolute inset-0 z-[999] !bg-transparent"
        data-premium-hero-crowd
      >
        <Skiper39
          label="Free, end to end"
          src="/images/premium/student-peeps.png"
          hiddenBackPeeps={30}
        />
      </div>
    </section>
  );
}
