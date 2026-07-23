import Image from "next/image";

const journeySteps = [
  {
    title: "Plan & Apply",
    eyebrow: "Stage 1",
    copy: "The basics, done well. Every other agent and platform does this part — we just do it without the kickbacks.",
    outcome: "Match unis. Track applications. Get the visa.",
    label: "Plan",
    image: "/images/normal/product-planning.jpg",
    points: ["Matcher", "Visa tracker", "Loans & scholarships", "SOP / LOR / CV"],
  },
  {
    title: "Arrive & Settle",
    eyebrow: "Stage 2",
    copy: "Banking, SIM, insurance, housing, forex, loans, tax, food. Pre-arrival to post-arrival. Real partners, transparent pricing, zero kickbacks. This is the spine of GGI Atlas — the bit you'll use every week.",
    outcome: "The actual backbone. Every service you need, sorted.",
    label: "Settle",
    image: "/images/normal/housing.jpg",
    points: [
      "Banking",
      "SIM / eSIM",
      "Insurance",
      "Housing",
      "Forex",
      "Loans",
      "Tax",
      "Food",
    ],
  },
  {
    title: "Build & Thrive",
    eyebrow: "Stage 3",
    copy: "Most platforms stop the day you arrive — that's when their commission cheque clears. GGI Atlas is built for what comes after: jobs, community, events, year-round services. Free, forever.",
    outcome: "After you land. The bit nobody else does.",
    label: "Thrive",
    image: "/images/normal/career.jpg",
    points: [
      "Land the job you came here for.",
      "14,000+ Indian students already here.",
      "Built around your week.",
      "We're with you for the whole stretch.",
    ],
  },
];

const earlyAccessHref =
  "mailto:hello@atlas.study?subject=GGI%20Atlas%20early%20access";

export function PremiumJourney() {
  return (
    <section
      id="premium-journey"
      data-premium-journey
      aria-labelledby="premium-journey-title"
      className="premium-journey"
    >
      <header className="premium-journey__header" data-premium-reveal>
        <div>
          <p className="premium-kicker">One continuous route</p>
          <span className="premium-journey__edition">Atlas / Field guide 2026</span>
        </div>
        <h2 id="premium-journey-title">
          Meet Atlas, your OS for not just studying, but{" "}
          <span>succeeding</span> abroad.
        </h2>
        <p className="premium-journey__lede">
          From the first shortlist to the first morning in a new city, every
          next step stays in frame.
        </p>
      </header>

      <div className="premium-journey__cinema" data-premium-horizontal-shell>
        <div className="premium-journey__track" data-premium-horizontal-track>
          {journeySteps.map((step, index) => (
            <article
              className={`premium-journey__frame premium-journey__frame--stage premium-journey__frame--stage-${index + 1}`}
              data-premium-journey-frame
              data-premium-stage-panel
              key={step.title}
            >
              <Image
                className="premium-journey__stage-photo"
                data-premium-stage-photo
                src={step.image}
                alt=""
                fill
                sizes="(min-width: 900px) 68rem, calc(100vw - 2rem)"
                aria-hidden="true"
              />
              <div className="premium-journey__frame-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")} / 03
              </div>
              <div className="premium-journey__stage-word" aria-hidden="true">
                {step.label}
              </div>
              <div className="premium-journey__frame-copy">
                <p>{step.eyebrow}</p>
                <h3>{step.title}</h3>
                <div>{step.copy}</div>
                <strong>{step.outcome}</strong>
              </div>
              <ol className="premium-journey__stage-points">
                {step.points.map((point, pointIndex) => (
                  <li key={point}>
                    <span>{String(pointIndex + 1).padStart(2, "0")}</span>
                    {point}
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PremiumJourneyFinale() {
  return (
    <footer className="premium-journey__finale" data-premium-reveal>
      <div>
        <p className="premium-kicker">Your next chapter</p>
        <h2>
          Move with a plan.
          <br />
          Land with momentum.
        </h2>
      </div>
      <div className="premium-journey__finale-action">
        <p>Free, end to end. No hidden university kickbacks.</p>
        <a href={earlyAccessHref}>
          Start free
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </footer>
  );
}
