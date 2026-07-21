import { Skiper39 } from "@/components/ui/skiper-ui/skiper39";

export function PremiumHero() {
  return (
    <section
      data-premium-hero
      aria-labelledby="premium-hero-title"
      className="relative h-[100svh] w-full overflow-hidden"
    >
      <div className="pointer-events-none z-0 absolute inset-x-0 top-[21%] z-10 px-4 text-center sm:top-[19%]">
        <h1
          id="premium-hero-title"
          className="mx-auto max-w-5xl text-4xl font-black leading-none tracking-tight text-gray-900 sm:text-5xl lg:text-[70px]"
        >
          <span className="block">Your operating system for</span>{" "}
          <span className="block text-[#f97316]">
            studying and succeeding abroad.
          </span>
        </h1>
      </div>
      <div className="absolute inset-0 z-[999] !bg-transparent">
        <Skiper39
          label="Free, end to end"
          src="/images/premium/student-peeps.png"
        />
      </div>
    </section>
  );
}
