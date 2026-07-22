import Image from "next/image";

const journeySteps = [
  {
    title: "Match",
    eyebrow: "Find the fit",
    copy: "Tell Atlas where you want to go and what matters. Get a shortlist shaped by your goals—not university commissions.",
    outcome: "A ranked shortlist you can defend",
    image: "/images/normal/product-planning.jpg",
  },
  {
    title: "Apply",
    eyebrow: "Build the case",
    copy: "Turn requirements into one live plan for documents, deadlines, applications, offers, and your visa route.",
    outcome: "Every deadline in one command center",
    image: "/images/normal/visa.jpg",
  },
  {
    title: "Prepare",
    eyebrow: "Sort the landing",
    copy: "Set up housing, banking, insurance, forex, and connectivity in the right order before the flight.",
    outcome: "The essentials ready before take-off",
    image: "/images/normal/housing.jpg",
  },
  {
    title: "Arrive",
    eyebrow: "Keep moving",
    copy: "Land with a working setup, then stay connected to jobs, events, mentors, and practical support for the years after.",
    outcome: "One platform that does not disappear",
    image: "/images/normal/career.jpg",
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
          Four chapters. <span>One move.</span>
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
              className="premium-journey__frame"
              data-premium-journey-frame
              key={step.title}
            >
              <Image
                src={step.image}
                alt=""
                fill
                sizes="(min-width: 900px) 78vw, 94vw"
              />
              <div className="premium-journey__frame-shade" aria-hidden="true" />
              <div className="premium-journey__frame-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")} / 04
              </div>
              <div className="premium-journey__frame-copy">
                <p>{step.eyebrow}</p>
                <h3>{step.title}</h3>
                <div>{step.copy}</div>
                <strong>{step.outcome}</strong>
              </div>
            </article>
          ))}
        </div>
      </div>

      <footer className="premium-journey__finale" data-premium-reveal>
        <div>
          <p className="premium-kicker">Your next chapter</p>
          <h2>Move with a plan.<br />Land with momentum.</h2>
        </div>
        <div className="premium-journey__finale-action">
          <p>Free, end to end. No hidden university kickbacks.</p>
          <a href={earlyAccessHref}>
            Start free
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </footer>
    </section>
  );
}
