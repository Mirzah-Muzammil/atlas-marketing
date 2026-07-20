const journeySignals = [
  "Command Center",
  "University Matcher",
  "Service Bazaar",
  "Community",
  "Events",
  "Career & Jobs",
  "Profile",
];

export function DispatchTrustSection() {
  return (
    <section
      className="relative overflow-hidden bg-dispatch-canvas pb-28 pt-24 text-dispatch-ink sm:pb-36 sm:pt-32 lg:pb-44 lg:pt-40"
      data-editorial-trust
      id="journey"
    >
      <svg
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-20 w-[120%] -translate-x-1/2 text-dispatch-ink/28"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 1440 100"
      >
        <path
          d="M-20 22c225 82 424 82 598 1 153-71 316-53 491 7 114 39 245 36 391-8"
          data-supporting-line
          pathLength="1"
          stroke="currentColor"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="container-shell relative">
        <p
          className="text-center text-[10px] font-bold tracking-[0.2em] text-dispatch-ink/82"
          data-supporting-reveal
        >
          Why this exists
        </p>
        <h2
          className="mx-auto mt-7 max-w-[70rem] text-center text-[clamp(4rem,9vw,8.75rem)] font-semibold leading-[0.82] tracking-[-0.078em]"
          data-supporting-heading
        >
          <span className="block overflow-hidden pb-5">
            <span className="block" data-supporting-heading-line>
              Studying abroad
            </span>
          </span>{" "}
          <span className="block overflow-hidden pb-5">
            <span
              className="block text-dispatch-ink/38"
              data-supporting-heading-line
            >
              is a huge decision.{" "}
            </span>
          </span>
        </h2>
        <p
          className="mx-auto mt-7 max-w-[35rem] text-center text-base leading-7 tracking-[-0.015em] text-dispatch-ink/82 sm:text-lg"
          data-supporting-reveal
        >
          Most agents make money by quietly steering students toward
          universities that pay them the largest kickback. Most &quot;free&quot;
          platforms are a thin layer over the same affiliate economics. The
          student is the product.
        </p>
      </div>

      <div
        aria-hidden="true"
        className="mt-16 overflow-hidden border-y border-dispatch-ink/12 py-3 sm:mt-20"
      >
        <div className="editorial-marquee-track flex w-max items-center">
          {[...journeySignals, ...journeySignals].map((signal, index) => (
            <div
              className="flex items-center gap-6 pr-6 text-[clamp(1.45rem,2.5vw,2.35rem)] font-semibold tracking-[-0.045em] text-dispatch-ink/68"
              key={`${signal}-${index}`}
            >
              <span>{signal}</span>
              <span className="h-2 w-2 rounded-full border border-dispatch-ink/45" />
            </div>
          ))}
        </div>
      </div>

      <ul className="sr-only">
        {journeySignals.map((signal) => (
          <li key={signal}>{signal}</li>
        ))}
      </ul>

      <div className="container-shell mt-16 grid border-t border-dispatch-ink/15 sm:mt-20 sm:grid-cols-3">
        <article
          className="border-b border-dispatch-ink/15 py-6 sm:border-b-0 sm:border-r sm:pr-8"
          data-trust-proof
        >
          <p className="text-[9px] font-bold tracking-[0.18em] text-dispatch-ink/82">
            To use, ever
          </p>
          <p className="mt-4 max-w-xs text-lg font-semibold leading-6 tracking-[-0.03em]">
            £0
          </p>
        </article>
        <article
          className="border-b border-dispatch-ink/15 py-6 sm:border-b-0 sm:border-r sm:px-8"
          data-trust-proof
        >
          <p className="text-[9px] font-bold tracking-[0.18em] text-dispatch-ink/82">
            To set up
          </p>
          <p className="mt-4 max-w-xs text-lg font-semibold leading-6 tracking-[-0.03em]">
            3 min
          </p>
        </article>
        <article className="py-6 sm:pl-8" data-trust-proof>
          <p className="text-[9px] font-bold tracking-[0.18em] text-dispatch-ink/82">
            Required
          </p>
          <p className="mt-4 max-w-xs text-lg font-semibold leading-6 tracking-[-0.03em]">
            No card
          </p>
        </article>
      </div>
    </section>
  );
}
