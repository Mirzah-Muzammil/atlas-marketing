import AnimatedTitle from "@/components/common/AnimatedTitle";

const journeySignals = [
  "Command Center",
  "University Matcher",
  "Service Bazaar",
  "Community",
  "Events",
  "Career & Jobs",
  "Profile",
];

const trustProofs = [
  {
    index: "01",
    label: "To use, ever",
    value: "£0",
    surface: "bg-dispatch-ink text-dispatch-canvas",
    meta: "text-dispatch-mint",
    rule: "bg-dispatch-mint",
  },
  {
    index: "02",
    label: "To set up",
    value: "3 min",
    surface: "bg-dispatch-mint text-dispatch-ink",
    meta: "text-dispatch-ink/62",
    rule: "bg-dispatch-ink",
  },
  {
    index: "03",
    label: "Required",
    value: "No card",
    surface: "bg-dispatch-sage text-dispatch-ink",
    meta: "text-dispatch-ink/62",
    rule: "bg-dispatch-ink",
  },
];

type DispatchTrustSectionProps = {
  animateTitles?: boolean;
  showProofs?: boolean;
};

export function DispatchTrustSection({
  animateTitles = false,
  showProofs = true,
}: DispatchTrustSectionProps = {}) {
  const headingContent = (
    <>
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
    </>
  );

  return (
    <section
      className="relative overflow-hidden bg-dispatch-canvas pt-24 text-dispatch-ink pb-20 sm:pt-32  lg:pt-40"
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
        {animateTitles ? (
          <AnimatedTitle
            as="p"
            className="text-center uppercase text-[10px] font-bold tracking-[0.2em] text-dispatch-ink/82"
            data-supporting-reveal
          >
            Why this exists
          </AnimatedTitle>
        ) : (
          <p
            className="text-center uppercase text-[10px] font-bold tracking-[0.2em] text-dispatch-ink/82"
            data-supporting-reveal
          >
            Why this exists
          </p>
        )}
        {animateTitles ? (
          <AnimatedTitle
            as="h2"
            className="mx-auto mt-7 max-w-[70rem] text-center text-[clamp(4rem,9vw,8.75rem)] font-semibold leading-[0.82] tracking-[-0.078em]"
            data-supporting-heading
          >
            {headingContent}
          </AnimatedTitle>
        ) : (
          <h2
            className="mx-auto mt-7 max-w-[70rem] text-center text-[clamp(4rem,9vw,8.75rem)] font-semibold leading-[0.82] tracking-[-0.078em]"
            data-supporting-heading
          >
            {headingContent}
          </h2>
        )}
        {animateTitles ? (
          <AnimatedTitle
            as="p"
            className="mx-auto mt-7 max-w-[35rem] text-center text-base leading-7 tracking-[-0.015em] text-dispatch-ink/82 sm:text-lg"
            data-supporting-reveal
          >
            Most agents make money by quietly steering students toward
            universities that pay them the largest kickback. Most &quot;free&quot;
            platforms are a thin layer over the same affiliate economics. The
            student is the product.
          </AnimatedTitle>
        ) : (
          <p
            className="mx-auto mt-7 max-w-[35rem] text-center text-base leading-7 tracking-[-0.015em] text-dispatch-ink/82 sm:text-lg"
            data-supporting-reveal
          >
            Most agents make money by quietly steering students toward
            universities that pay them the largest kickback. Most &quot;free&quot;
            platforms are a thin layer over the same affiliate economics. The
            student is the product.
          </p>
        )}
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

      {showProofs ? (
        <div className="container-shell mt-16 sm:mt-20">
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4 lg:gap-5">
            {trustProofs.map((proof, index) => (
              <div data-trust-proof data-trust-proof-tile key={proof.label}>
                <article
                  className={`group flex min-h-[17rem] flex-col justify-between overflow-hidden p-6 shadow-sm !transition-all !duration-800 ease-out !hover:-translate-y-2 hover:shadow-dispatch-panel sm:min-h-[20rem] sm:p-8 ${
                    index === 1
                      ? "sm:-translate-y-5 sm:hover:-translate-y-7 motion-reduce:sm:transform-none"
                      : ""
                  } ${proof.surface}`}
                >
                  <div className="flex items-start justify-between gap-6">
                    <span
                      className={`text-[10px] font-bold tracking-[0.2em] ${proof.meta}`}
                    >
                      {proof.index}
                    </span>
                    <p
                      className={`text-right text-[10px] font-bold uppercase tracking-[0.2em] ${proof.meta}`}
                    >
                      {proof.label}
                    </p>
                  </div>

                  <div>
                    <span
                      aria-hidden="true"
                      className={`block h-px w-10 transition-[width] duration-500 ease-out group-hover:w-full motion-reduce:transition-none ${proof.rule}`}
                    />
                    <p className="mt-6 text-[clamp(3.35rem,5.6vw,6rem)] font-semibold leading-[0.82] tracking-[-0.075em]">
                      {proof.value}
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
