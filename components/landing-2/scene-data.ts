export const earlyAccessHref =
  "mailto:hello@atlas.study?subject=Atlas%20early%20access";

export const sceneMarkers = {
  start: 0,
  journey: 0.27,
  essentials: 0.9,
} as const;

export interface CinematicService {
  id: string;
  number: string;
  name: string;
  copy: string;
  note: string;
  image: string;
}

export const services: CinematicService[] = [
  {
    id: "sim",
    number: "01",
    name: "SIM & eSIM",
    copy: "A pre-activated UK eSIM that works the moment you land.",
    note: "80GB data · unlimited UK calls",
    image: "/images/normal/esim.jpg",
  },
  {
    id: "banking",
    number: "02",
    name: "Banking",
    copy: "Open a student-ready account without waiting for move-in week.",
    note: "Open before your flight",
    image: "/images/normal/banking.jpg",
  },
  {
    id: "housing",
    number: "03",
    name: "Housing",
    copy: "Find vetted accommodation and avoid the scams students are warned about too late.",
    note: "Verified options · plain-English terms",
    image: "/images/normal/housing.jpg",
  },
  {
    id: "insurance",
    number: "04",
    name: "Insurance",
    copy: "Health and travel cover explained in plain English.",
    note: "Health + travel · 12 months",
    image: "/images/normal/insurance.jpg",
  },
  {
    id: "forex",
    number: "05",
    name: "Forex",
    copy: "Move tuition and living money with transparent rates and fees.",
    note: "Mid-market rates · no hidden spread",
    image: "/images/normal/forex.jpg",
  },
  {
    id: "loans",
    number: "06",
    name: "Loans",
    copy: "Compare funding for your course and know when a loan is poor value.",
    note: "Course-specific funding",
    image: "/images/normal/loans.jpg",
  },
  {
    id: "tax",
    number: "07",
    name: "Tax filing",
    copy: "Understand your first UK tax year and what changes after graduation.",
    note: "Student-to-graduate guidance",
    image: "/images/normal/tax.jpg",
  },
  {
    id: "visa",
    number: "08",
    name: "Visas",
    copy: "Keep the documents, funds, and deadlines that make the sequence real.",
    note: "Checklist · funds · deadlines",
    image: "/images/normal/visa.jpg",
  },
];

export const criticalAssets = [
  {
    role: "00-flight-window",
    src: "/images/landing-2/flight-window.webp",
    width: 1536,
    height: 1024,
  },
  {
    role: "10-campus-aerial",
    src: "/images/landing-2/campus-aerial.webp",
    width: 1536,
    height: 1024,
  },
  {
    role: "20-classroom-interior",
    src: "/images/landing-2/classroom-interior.webp",
    width: 1536,
    height: 1024,
  },
] as const;
