import { act, render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import AnimatedTitle from "@/components/common/AnimatedTitle";
import Hero from "@/components/sections/hero";

it("reveals a semantic title as soon as it enters the viewport", () => {
  let onIntersect: IntersectionObserverCallback = () => undefined;

  class IntersectionObserverMock implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = "0px";
    readonly thresholds = [0.15];

    constructor(callback: IntersectionObserverCallback) {
      onIntersect = callback;
    }

    disconnect = vi.fn();
    observe = vi.fn();
    takeRecords = vi.fn(() => []);
    unobserve = vi.fn();
  }

  vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

  render(
    <AnimatedTitle as="h3" className="card-title">
      A card title
    </AnimatedTitle>,
  );

  const title = screen.getByRole("heading", {
    level: 3,
    name: "A card title",
  });

  expect(title).toHaveClass("atlas-title-reveal", "card-title");
  expect(title).toHaveAttribute("data-title-reveal", "pending");

  act(() => {
    onIntersect(
      [
        {
          isIntersecting: true,
          target: title,
        } as unknown as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver,
    );
  });

  expect(title).toHaveAttribute("data-title-reveal", "visible");
});

it("uses the title reveal for every heading on the normal page", () => {
  const sectionFiles = [
    "hero.tsx",
    "modules.tsx",
    "features.tsx",
    "industries.tsx",
    "cta-banner.tsx",
    "faqs.tsx",
    "footer.tsx",
  ];

  const sources = sectionFiles.map((file) =>
    readFileSync(resolve(process.cwd(), "components/sections", file), "utf8"),
  );

  for (const source of sources) {
    expect(source).toContain('from "@/components/common/AnimatedTitle"');
    expect(source).not.toMatch(/<h[1-4]\b/);
  }

  expect(sources[0]).toContain('as="h1"');
  expect(sources.slice(1).join("\n")).toContain('as="h2"');
  expect(sources.slice(1).join("\n")).toContain('as="h3"');
  expect(sources.at(-1)).toContain('as="h4"');

  const animatedSections = sources.slice(0, -1).join("\n");
  expect(animatedSections).toContain('data-aos="fade-up"');
  expect(animatedSections).toContain('data-aos="fade-right"');
  expect(animatedSections).toContain('data-aos="fade-left"');

  const css = readFileSync(
    resolve(process.cwd(), "app/normal/globals.css"),
    "utf8",
  );
  expect(css).toContain(".atlas-title-reveal");
  expect(css).toContain("filter: blur(12px)");
  expect(css).toContain("1.3s cubic-bezier(0.22, 1, 0.36, 1)");
  expect(css).toContain("prefers-reduced-motion: reduce");
});

it("does not layer the old AOS motion onto the hero title", () => {
  const { container } = render(<Hero />);
  const heroTitle = screen.getByRole("heading", { level: 1 });

  expect(heroTitle).not.toHaveAttribute("data-aos");
  expect(heroTitle.querySelector("[data-aos]")).not.toBeInTheDocument();
  expect(container.querySelector('[data-aos="fade-up"]')).toBeInTheDocument();
  expect(container.querySelector('[data-aos="fade-left"]')).toBeInTheDocument();
  expect(container.querySelector('[data-aos="fade-right"]')).toBeInTheDocument();
});
