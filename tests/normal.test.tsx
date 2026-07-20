import { render, screen } from "@testing-library/react";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { ReactNode } from "react";

const landingApi = vi.hoisted(() => ({
  getLandingPageData: vi.fn(async () => ({
    modules: [],
    industries: [],
    monthlyPlans: [],
    annualPlans: [],
    testimonials: [],
    faqs: [],
  })),
}));

vi.mock("@/lib/api-services", () => landingApi);

vi.mock("@/components/providers", () => ({
  default: ({ children }: { children: ReactNode }) => (
    <div data-testid="normal-providers">{children}</div>
  ),
}));
vi.mock("@/components/layout/navbar", () => ({
  default: () => <div data-normal-section="navbar" />,
}));
vi.mock("@/components/sections/hero", () => ({
  default: () => <div data-normal-section="hero" />,
}));
vi.mock("@/components/sections/modules", () => ({
  default: ({ modules }: { modules: unknown[] }) => (
    <div data-normal-section="modules" data-item-count={modules.length} />
  ),
}));
vi.mock("@/components/sections/features", () => ({
  default: () => <div data-normal-section="features" />,
}));
vi.mock("@/components/sections/industries", () => ({
  default: ({ industries }: { industries: unknown[] }) => (
    <div data-normal-section="industries" data-item-count={industries.length} />
  ),
}));
vi.mock("@/components/sections/cta-banner", () => ({
  default: () => <div data-normal-section="cta" />,
}));
vi.mock("@/components/sections/pricing", () => ({
  default: () => <div data-normal-section="pricing" />,
}));
vi.mock("@/components/sections/testimonials", () => ({
  default: () => <div data-normal-section="testimonials" />,
}));
vi.mock("@/components/sections/faqs", () => ({
  default: ({ faqs }: { faqs: unknown[] }) => (
    <div data-normal-section="faqs" data-item-count={faqs.length} />
  ),
}));
vi.mock("@/components/sections/footer", () => ({
  default: () => <div data-normal-section="footer" />,
}));
vi.mock("@/components/modal/modal", () => ({
  default: () => <div data-normal-section="modal" />,
}));

import NormalPage from "@/app/normal/page";
import {
  normalFaqs,
  normalModules,
  normalServices,
} from "@/constants/normal-page-data";

afterEach(() => {
  vi.restoreAllMocks();
});

const retainedDesignFiles = [
  "app/normal/page.tsx",
  "app/normal/layout.tsx",
  "components/layout/navbar.tsx",
  "components/sections/hero.tsx",
  "components/sections/modules.tsx",
  "components/sections/features.tsx",
  "components/sections/industries.tsx",
  "components/sections/cta-banner.tsx",
  "components/sections/faqs.tsx",
  "components/sections/footer.tsx",
  "components/modal/modal.tsx",
  "components/forms/demo-form.tsx",
  "components/providers.tsx",
];

const fixedDesignFiles = ["app/normal/globals.css", "components/ui/button.tsx"];

function classNameDigest() {
  const expressions = retainedDesignFiles.flatMap((file) => {
    const source = readFileSync(resolve(process.cwd(), file), "utf8");
    return source.match(
      /className\s*=\s*(?:"[^"]*"|'[^']*'|{\s*`[\s\S]*?`\s*}|{\s*"[^"]*"\s*}|{\s*'[^']*'\s*})/g,
    ) ?? [];
  });

  const fixedSources = fixedDesignFiles.map((file) =>
    readFileSync(resolve(process.cwd(), file), "utf8"),
  );

  return createHash("sha256")
    .update([...expressions, ...fixedSources].join("\0"))
    .digest("hex");
}

it("renders /normal from static data without the unsupported sections", async () => {
  const fetchSpy = vi.spyOn(globalThis, "fetch");
  const page = await NormalPage();
  render(page);

  expect(landingApi.getLandingPageData).not.toHaveBeenCalled();
  expect(fetchSpy).not.toHaveBeenCalled();
  expect(
    Array.from(document.querySelectorAll<HTMLElement>("[data-normal-section]"), (node) =>
      node.dataset.normalSection,
    ),
  ).toEqual([
    "navbar",
    "hero",
    "modules",
    "features",
    "industries",
    "cta",
    "faqs",
    "footer",
    "modal",
  ]);

  expect(screen.getByTestId("normal-providers")).toBeInTheDocument();
  for (const section of ["modules", "industries", "faqs"]) {
    expect(document.querySelector(`[data-normal-section="${section}"]`)).not.toHaveAttribute(
      "data-item-count",
      "0",
    );
  }

  fetchSpy.mockRestore();
});

it("keeps every retained design class expression unchanged", () => {
  expect(classNameDigest()).toBe("4667b5c660c770abae9b01d3a5e1b92205f5409a3522db2553d7fbe8c5d7f773");
});

it("contains no legacy Dooyt or ERP content in the retained page", () => {
  const pageSource = retainedDesignFiles
    .map((file) => readFileSync(resolve(process.cwd(), file), "utf8"))
    .join("\n");

  expect(pageSource).not.toMatch(/Dooyt|ERP/i);
});

it("uses the supplied GGI Atlas product, service, and FAQ data", () => {
  expect(normalModules.map(({ name }) => name)).toEqual([
    "Command Center",
    "University Matcher",
    "Service Bazaar",
    "Community",
    "Events",
    "Career & Jobs",
    "Profile",
    "Inbox",
  ]);
  expect(normalServices.map(({ name }) => name)).toEqual([
    "SIM & eSIM",
    "Banking",
    "Insurance",
    "Visas",
    "Housing",
    "Forex",
    "Tax filing",
    "Loans",
  ]);
  expect(normalFaqs.map(({ question }) => question)).toEqual([
    "Is it really free?",
    "How do you make money?",
    "What about after I land — does the platform stop?",
    "Where are you based, and who runs this?",
    "What's the catch?",
  ]);
});
