export interface NormalModule {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
}

export interface NormalService {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface NormalFaq {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export const normalModules: NormalModule[] = [
  {
    id: "command-center",
    name: "Command Center",
    category: "Apply",
    icon: "boxes",
    description:
      "Every student who signs up gets the full Student OS, personalised by stage and target. Free, with no upgrade nudges every two clicks.",
  },
  {
    id: "university-matcher",
    name: "University Matcher",
    category: "Apply",
    icon: "check-square",
    description:
      "Match unis. Track applications. Get the visa. The basics, done well. Every other agent and platform does this part — we just do it without the kickbacks.",
  },
  {
    id: "service-bazaar",
    name: "Service Bazaar",
    category: "Settle",
    icon: "shopping-cart",
    description:
      "Banking, SIM, insurance, housing, forex, loans, tax, food. Everything you need, sorted by stage.",
  },
  {
    id: "community",
    name: "Community",
    category: "Thrive",
    icon: "users",
    description:
      "Plug into the network. WhatsApp groups by city and uni, alumni meetups, course-specific cohorts.",
  },
  {
    id: "events",
    name: "Events",
    category: "Thrive",
    icon: "kanban",
    description:
      "Term 1, term 2, summer. Friends, internships, part-time roles, your first tax year. Community, jobs, and events all live in the same dashboard you've been using.",
  },
  {
    id: "career-jobs",
    name: "Career & Jobs",
    category: "Thrive",
    icon: "user-cog",
    description:
      "A live job board curated for international students. Internships, graduate schemes, sponsorship-friendly roles. Plus CV reviews, mock interviews, and an alumni mentor network.",
  },
  {
    id: "profile",
    name: "Profile",
    category: "You",
    icon: "calculator",
    description:
      "Your profile carries over. We'll re-rank your Matcher results, swap the relevant Bazaar partners, and update your checklist.",
  },
  {
    id: "inbox",
    name: "Inbox",
    category: "You",
    icon: "megaphone",
    description:
      "Same OS, same login, same data — driven by the 14,000+ students and alumni you're now part of.",
  },
];

export const normalServices: NormalService[] = [
  {
    id: "solar",
    name: "SIM & eSIM",
    description:
      "Pre-activated UK eSIM. 80GB data, unlimited UK calls. Works the moment you land.",
    image: "/images/normal/esim.jpg",
  },
  {
    id: "manufacturing",
    name: "Banking",
    description: "Monzo Student. £0/mo · open before flight.",
    image: "/images/normal/banking.jpg",
  },
  {
    id: "it-saas",
    name: "Insurance",
    description: "EduSafe Insurance. Health + travel · 12mo. £185 · Buy here.",
    image: "/images/normal/insurance.jpg",
  },
  {
    id: "education",
    name: "Visas",
    description:
      "Sequenced over four weeks: visa, banking, SIM, insurance, forex, housing, flight, packing.",
    image: "/images/normal/visa.jpg",
  },
  {
    id: "construction",
    name: "Housing",
    description:
      "You need a UK bank account, a SIM that works on landing, accommodation that won't get you scammed, insurance that's actually good, forex that doesn't bleed you dry.",
    image: "/images/normal/housing.jpg",
  },
  {
    id: "ecommerce",
    name: "Forex",
    description: "Wise Forex. Mid-market FX rate. 0.4% fee · Visit Wise.",
    image: "/images/normal/forex.jpg",
  },
  {
    id: "logistics",
    name: "Tax filing",
    description:
      "Tax season, second-year housing, internships, graduation, post-study work visa. Same dashboard. Same team. Free, every year.",
    image: "/images/normal/tax.jpg",
  },
  {
    id: "digital-marketing",
    name: "Loans",
    description:
      "Find the cheapest funding for your specific course and country. We tell you when a loan is bad value.",
    image: "/images/normal/loans.jpg",
  },
];

export const normalFaqs: NormalFaq[] = [
  {
    id: "really-free",
    question: "Is it really free?",
    answer:
      "Yes. The whole platform — Matcher, Bazaar, Profile, Community, Events, Career — costs you nothing to use, ever. There's no premium tier. Concierge is a separate paid service for people who want a human specialist, but you don't need it to use the platform.",
    order: 1,
  },
  {
    id: "business-model",
    question: "How do you make money?",
    answer:
      "Two ways. First, when you choose to use a partner from our Bazaar — a SIM, a bank, an insurer — that partner pays us a referral fee. We disclose this on every card. Second, Concierge: £1,500 one-time, for full end-to-end service. That's it. We don't take secret kickbacks from universities, and we never mark up partner prices.",
    order: 2,
  },
  {
    id: "after-landing",
    question: "What about after I land — does the platform stop?",
    answer:
      "No, that's the whole point. The post-arrival layer — jobs, community, events, year-round services — is the bit no one else does. You keep using GGI Atlas for free for as long as you want, through your degree, your first job, your post-study work visa, and beyond.",
    order: 3,
  },
  {
    id: "based-and-run",
    question: "Where are you based, and who runs this?",
    answer:
      "London, UK. We've spent six years working with universities, the British Council, the UK government, and tens of thousands of international students directly. GGI Atlas is the product we always wished existed.",
    order: 4,
  },
  {
    id: "the-catch",
    question: "What's the catch?",
    answer:
      "Honestly, none — but the model only works if our Bazaar partners are genuinely good. We say no to partners who can't beat what's already available. If a partner stops being good for students, we drop them. That's the discipline. The platform is free because it has to be free for our positioning to be true.",
    order: 5,
  },
];
