import HomepageAnimatedTitle from "@/components/homepage/HomepageAnimatedTitle";

type Phase = {
  id: string;
  number: string;
  title: string;
  description: string;
  studentContext: string;
  atlasContext: string;
  timeline: string;
  scene: "matcher" | "arrival" | "thrive";
};

const phases: readonly Phase[] = [
  {
    id: "plan-apply",
    number: "01",
    title: "Pick a university. Get in. Without the kickbacks.",
    description:
      "The basics, done well. Atlas does not get paid more for steering you toward the wrong fit.",
    studentContext:
      "You are weighing countries, universities, and budgets, and trying to figure out who to trust.",
    atlasContext:
      "Use real profile data to compare admit probability, projected ROI, visa success, and the costs that matter in real cities.",
    timeline: "3 to 6 months before applications close",
    scene: "matcher",
  },
  {
    id: "arrive-settle",
    number: "02",
    title: "Land. Get sorted. In a week, not a month.",
    description:
      "Set up the essentials before you fly, then activate them the moment you land.",
    studentContext:
      "You are trying to set up a life from 4,000 miles away, while most official advice is slow, wrong, or pay-walled.",
    atlasContext:
      "Atlas sequences the services in the right order and makes every direct, partner, and coupon relationship clear.",
    timeline: "4 weeks before to 2 weeks after departure",
    scene: "arrival",
  },
  {
    id: "build-thrive",
    number: "03",
    title: "After you land. The bit nobody else builds.",
    description:
      "Jobs, community, events, and year-round services live in the same place as your move.",
    studentContext:
      "Your degree is only the beginning. You need a life, a network, and a career that continue after your offer letter.",
    atlasContext:
      "Keep sponsorship-friendly roles, your student community, useful events, and practical support close from day one.",
    timeline: "Free throughout your degree and after graduation",
    scene: "thrive",
  },
];

function MatchRow({
  rank,
  university,
  course,
  match,
}: {
  rank: string;
  university: string;
  course: string;
  match: string;
}) {
  return (
    <div className="grid grid-cols-[2rem_minmax(0,1fr)_auto] gap-3 border-t border-white/[.1] py-4 first:border-t-0 sm:grid-cols-[2.5rem_minmax(0,1fr)_6rem] sm:gap-5">
      <span className="font-mono text-sm text-white/34">{rank}</span>
      <div>
        <h3 className="text-sm font-medium tracking-[-.02em] text-white sm:text-base">
          {university}
        </h3>
        <p className="mt-1 text-xs text-white/48 sm:text-sm">{course}</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold leading-none tracking-[-.04em] text-white sm:text-xl">
          {match}
        </p>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[.13em] text-white/38">
          match
        </p>
      </div>
    </div>
  );
}

function MatcherScene() {
  return (
    <article
      className="overflow-hidden border-y border-white/[.14] bg-white/[.025] shadow-[0_28px_80px_rgba(0,0,0,.23)]"
      data-journey-phase-scene
    >
      <div className="flex items-center justify-between border-b border-white/[.1] px-5 py-4 sm:px-7">
        <span className="text-sm font-medium text-white/86">University Matcher</span>
        <span className="font-mono text-[10px] uppercase tracking-[.15em] text-white/38">
          MSc Computer Science
        </span>
      </div>

      <div className="px-5 py-7 sm:px-7 sm:py-9">
        <p className="max-w-[18ch] text-[clamp(1.75rem,3vw,2.85rem)] font-medium leading-[.96] tracking-[-.065em] text-white">
          A shortlist that can explain itself.
        </p>
        <p className="mt-4 max-w-[38rem] text-sm leading-6 text-white/54 sm:text-base">
          Rank each option by your actual profile, not by a partner agreement.
        </p>

        <div className="mt-10">
          <MatchRow
            course="MSc Advanced Computing · London"
            match="94%"
            rank="01"
            university="Imperial College London"
          />
          <MatchRow
            course="MSc AI · Edinburgh"
            match="88%"
            rank="02"
            university="University of Edinburgh"
          />
          <MatchRow
            course="MSc Data Science · London"
            match="82%"
            rank="03"
            university="King’s College London"
          />
        </div>
      </div>

      <div className="grid border-t border-white/[.1] sm:grid-cols-3">
        {[
          ["Application tracker", "Deadlines and documents"],
          ["Loans & scholarships", "Funding that fits"],
          ["Visa support", "CAS to vignette"],
        ].map(([title, copy]) => (
          <div className="border-t border-white/[.1] px-5 py-5 first:border-t-0 sm:border-l sm:border-t-0 sm:first:border-l-0 sm:px-6" key={title}>
            <p className="text-sm font-medium text-white/86">{title}</p>
            <p className="mt-1.5 text-xs leading-5 text-white/48">{copy}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function ArrivalStep({
  time,
  title,
  detail,
  active = false,
}: {
  time: string;
  title: string;
  detail: string;
  active?: boolean;
}) {
  return (
    <div className="grid grid-cols-[5.5rem_1px_minmax(0,1fr)] gap-4 py-4 sm:grid-cols-[7rem_1px_minmax(0,1fr)] sm:gap-5">
      <p className="font-mono text-[10px] uppercase tracking-[.14em] text-white/38">{time}</p>
      <span className={`relative block w-px bg-white/[.12] ${active ? "before:absolute before:left-1/2 before:top-0 before:size-2.5 before:-translate-x-1/2 before:rounded-full before:bg-[#f35a02]" : ""}`} />
      <div className="pb-1">
        <h3 className="text-base font-medium tracking-[-.025em] text-white/92">{title}</h3>
        <p className="mt-1.5 max-w-[38rem] text-sm leading-6 text-white/52">{detail}</p>
      </div>
    </div>
  );
}

function ArrivalScene() {
  return (
    <article
      className="overflow-hidden border-y border-white/[.14] bg-white/[.025] shadow-[0_28px_80px_rgba(0,0,0,.23)]"
      data-journey-phase-scene
    >
      <div className="flex items-center justify-between border-b border-white/[.1] px-5 py-4 sm:px-7">
        <span className="text-sm font-medium text-white/86">Pre-departure checklist</span>
        <span className="font-mono text-[10px] uppercase tracking-[.15em] text-white/38">
          September intake
        </span>
      </div>

      <div className="px-5 py-7 sm:px-7 sm:py-9">
        <p className="max-w-[19ch] text-[clamp(1.75rem,3vw,2.85rem)] font-medium leading-[.96] tracking-[-.065em] text-white">
          The right thing, at the right time.
        </p>
        <div className="mt-9">
          <ArrivalStep
            detail="Visa documents, CAS, mock interview practice, and every deadline in one view."
            time="4 weeks"
            title="Visa support"
          />
          <ArrivalStep
            active
            detail="Open your bank account, activate an eSIM, choose insurance, and make the first housing payment."
            time="3 weeks"
            title="Your essentials"
          />
          <ArrivalStep
            detail="Lock flights, forex, packing, and the first week’s setup list."
            time="1 week"
            title="The UK Settler's Handbook"
          />
          <ArrivalStep
            detail="GP registration, council tax exemption, address proof, and the life admin that follows landing."
            time="Week one"
            title="Settle in"
          />
        </div>
      </div>

      <div className="border-t border-white/[.1] px-5 py-5 sm:px-7">
        <p className="text-sm leading-6 text-white/54">
          Banking, SIM, insurance, housing, forex, and travel are all shown in sequence, with every partner relationship clearly labelled.
        </p>
      </div>
    </article>
  );
}

function ThriveScene() {
  return (
    <article
      className="overflow-hidden border-y border-white/[.14] bg-white/[.025] shadow-[0_28px_80px_rgba(0,0,0,.23)]"
      data-journey-phase-scene
    >
      <div className="flex items-center justify-between border-b border-white/[.1] px-5 py-4 sm:px-7">
        <span className="text-sm font-medium text-white/86">Life after the offer</span>
        <span className="font-mono text-[10px] uppercase tracking-[.15em] text-white/38">
          Your first term
        </span>
      </div>

      <div className="grid lg:grid-cols-[1.08fr_.92fr]">
        <div className="px-5 py-7 sm:px-7 sm:py-9">
          <p className="max-w-[17ch] text-[clamp(1.75rem,3vw,2.85rem)] font-medium leading-[.96] tracking-[-.065em] text-white">
            Keep the next opportunity nearby.
          </p>
          <div className="mt-9 divide-y divide-white/[.1] border-y border-white/[.1]">
            {[
              ["Graduate Software Engineer", "London · £38 to 45k · Sponsors visa"],
              ["Strategy Analyst Intern", "Manchester · £900 per week · Applications open"],
              ["Product Intern", "Edinburgh · Summer placement · CV review ready"],
            ].map(([role, detail], index) => (
              <div className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 py-4" key={role}>
                <span className="font-mono text-sm text-white/34">0{index + 1}</span>
                <div>
                  <h3 className="text-sm font-medium text-white/92 sm:text-base">{role}</h3>
                  <p className="mt-1 text-xs leading-5 text-white/48 sm:text-sm">{detail}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm font-medium text-white/82">Career & jobs</p>
        </div>

        <div className="border-t border-white/[.1] px-5 py-7 sm:px-7 sm:py-9 lg:border-l lg:border-t-0">
          <div className="border-b border-white/[.1] pb-7">
            <p className="text-sm font-medium text-white/90">Community</p>
            <p className="mt-3 text-[clamp(1.55rem,2.4vw,2.3rem)] font-medium leading-[1] tracking-[-.055em] text-white">
              14,000+ students already here.
            </p>
            <p className="mt-4 text-sm leading-6 text-white/52">
              City groups, alumni meetups, and course cohorts that make a new place feel less new.
            </p>
          </div>
          <div className="pt-7">
            <p className="text-sm font-medium text-white/90">Events</p>
            <div className="mt-4 space-y-3">
              <p className="text-sm leading-5 text-white/58">
                <span className="mr-3 font-mono text-white/35">14 NOV</span>
                UK tax 101 workshop
              </p>
              <p className="text-sm leading-5 text-white/58">
                <span className="mr-3 font-mono text-white/35">21 NOV</span>
                London graduate careers night
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[.1] px-5 py-5 sm:px-7">
        <p className="text-sm leading-6 text-white/54">
          Year-round support stays useful through tax season, second-year housing, PSW visa questions, and life after graduation.
        </p>
      </div>
    </article>
  );
}

function PhaseScene({ type }: { type: Phase["scene"] }) {
  if (type === "matcher") return <MatcherScene />;
  if (type === "arrival") return <ArrivalScene />;
  return <ThriveScene />;
}

export function JourneyPhases() {
  return (
    <div data-how-it-works-phases>
      {phases.map((phase, index) => {
        const reverse = index % 2 === 1;

        return (
          <section
            className="relative overflow-hidden border-t border-white/[.1] px-5 py-24 text-white sm:px-8 sm:py-32"
            data-journey-phase-layout="editorial"
            id={phase.id}
            key={phase.id}
          >
            <div className="mx-auto grid w-full max-w-[1180px] gap-12 lg:grid-cols-[minmax(0,.82fr)_minmax(0,1.18fr)] lg:items-center lg:gap-20">
              <header className={reverse ? "lg:order-2" : undefined}>
                <span className="font-mono text-[clamp(4.5rem,9vw,8.5rem)] font-medium leading-none tracking-[-.1em] text-white/[.13]">
                  {phase.number}
                </span>
                <HomepageAnimatedTitle
                  as="h2"
                  className="mt-7 max-w-[12ch] text-balance text-[clamp(2.8rem,4.5vw,5.25rem)] font-semibold leading-[.89] tracking-[-.075em]"
                >
                  {phase.title}
                </HomepageAnimatedTitle>
                <p className="mt-6 max-w-[34rem] text-base leading-7 text-white/64 sm:text-lg">
                  {phase.description}
                </p>
                <div className="mt-10 max-w-[36rem] border-l border-white/[.22] pl-5 sm:pl-6">
                  <p className="text-[clamp(1.35rem,2vw,1.85rem)] font-medium leading-[1.12] tracking-[-.04em] text-white/92">
                    {phase.studentContext}
                  </p>
                  <p className="mt-5 text-sm leading-6 text-white/56 sm:text-base">
                    {phase.atlasContext}
                  </p>
                </div>
                <p className="mt-9 font-mono text-[10px] uppercase tracking-[.16em] text-white/38">
                  {phase.timeline}
                </p>
              </header>

              <div className={reverse ? "lg:order-1" : undefined}>
                <PhaseScene type={phase.scene} />
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
