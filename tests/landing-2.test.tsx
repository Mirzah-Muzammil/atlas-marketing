import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import Landing2Page from "@/app/landing-2/page";
import { ServiceRail } from "@/components/landing-2/ServiceRail";
import { services } from "@/components/landing-2/scene-data";
import { setTimelineLayerInteractive } from "@/components/landing-2/useCinematicTimeline";

async function renderLanding2() {
  const result = render(<Landing2Page />);
  await waitFor(() => {
    expect(result.container.querySelector("[data-scene-ready]")).toHaveAttribute(
      "data-scene-ready",
      "true",
    );
  });
  return result;
}

it("renders one cinematic world with three continuous destination plates", async () => {
  const { container } = await renderLanding2();

  expect(container.querySelector("[data-cinematic-scroll]")).not.toBeNull();
  expect(container.querySelectorAll("[data-cinematic-stage]")).toHaveLength(1);
  expect(container.querySelector('[data-layer-role="00-flight-window"]')).not.toBeNull();
  expect(container.querySelector('[data-layer-role="10-campus-aerial"]')).not.toBeNull();
  expect(container.querySelector('[data-layer-role="20-classroom-interior"]')).not.toBeNull();
  expect(container.querySelector('[data-layer-role="30-classroom-video"]')).not.toBeNull();
  expect(container.querySelector('[data-layer-role="30-hero-object"]')).toBeNull();
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Your operating system for studying and succeeding abroad",
  );
  expect(
    screen.getByRole("heading", { name: /the route changes/i }),
  ).toBeVisible();
  expect(
    screen.getByRole("heading", { name: /everything you need/i }),
  ).toBeVisible();
  expect(
    screen.getAllByRole("link", { name: /start free/i }).length,
  ).toBeGreaterThan(0);
  expect(screen.getByRole("link", { name: "Journey" })).toHaveAttribute(
    "href",
    "#journey",
  );
  expect(screen.getByRole("link", { name: "Essentials" })).toHaveAttribute(
    "href",
    "#essentials",
  );
});

it("exposes deterministic scene variables and jumps to local markers", async () => {
  const scrollTo = vi.fn();
  vi.stubGlobal("scrollTo", scrollTo);

  const { container } = await renderLanding2();
  const section = container.querySelector<HTMLElement>("[data-cinematic-scroll]")!;

  expect(section.style.getPropertyValue("--scene-progress")).toBe("0");
  fireEvent.click(screen.getByRole("link", { name: "Journey" }));
  expect(scrollTo).toHaveBeenCalledWith(
    expect.objectContaining({ behavior: "smooth" }),
  );

  vi.unstubAllGlobals();
});

it("keeps timeline-hidden controls out of the accessibility tree", async () => {
  const { container } = await renderLanding2();
  const catalog = container.querySelector<HTMLElement>(".cine-catalog")!;

  expect(container.querySelector(".cine-intro")).not.toHaveAttribute("inert");
  expect(catalog).toHaveAttribute("inert");
  expect(catalog).toHaveAttribute("aria-hidden", "true");
});

it("hands focus to persistent navigation before hiding an active scene", () => {
  const layer = document.createElement("section");
  const activeButton = document.createElement("button");
  const fallback = document.createElement("a");
  fallback.href = "#essentials";
  layer.append(activeButton);
  document.body.append(layer, fallback);
  activeButton.focus();

  setTimelineLayerInteractive(layer, false, fallback);

  expect(document.activeElement).toBe(fallback);
  expect(layer).toHaveAttribute("inert");
  expect(layer).toHaveAttribute("aria-hidden", "true");
  layer.remove();
  fallback.remove();
});

it("moves through all eight services with buttons and keyboard", () => {
  render(<ServiceRail reducedMotion={false} services={services} />);
  const rail = screen.getByRole("region", { name: /atlas essentials/i });

  expect(screen.getByText("SIM & eSIM")).toBeVisible();
  fireEvent.click(screen.getByRole("button", { name: "Next service" }));
  expect(screen.getByRole("status")).toHaveTextContent("Banking, 2 of 8");
  fireEvent.keyDown(rail, { key: "ArrowRight" });
  expect(screen.getByRole("status")).toHaveTextContent("Housing, 3 of 8");
  fireEvent.keyDown(rail, { key: "Home" });
  expect(screen.getByRole("status")).toHaveTextContent("SIM & eSIM, 1 of 8");
});

it("keeps rail controls bounded and service actions real", () => {
  render(<ServiceRail reducedMotion={false} services={services} />);

  expect(
    screen.getByRole("button", { name: "Previous service" }),
  ).toBeDisabled();
  expect(screen.getAllByRole("link", { name: /ask atlas about/i })[0]).toHaveAttribute(
    "href",
    expect.stringContaining("mailto:hello@atlas.study"),
  );
});

it("reserves geometry for every cinematic plate and exposes readiness state", async () => {
  const { container } = await renderLanding2();

  expect(container.querySelectorAll('img[width="1536"][height="1024"]')).toHaveLength(3);
  expect(container.querySelector('video[src="/videos/atlas-student-study.mp4"]')).not.toBeNull();
  expect(container.querySelector("[data-scene-ready]")).toHaveAttribute(
    "data-scene-ready",
    "true",
  );
});

it("keeps all narrative content available in reduced motion", async () => {
  const originalMatchMedia = window.matchMedia;
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query.includes("prefers-reduced-motion"),
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));

  const { container } = await renderLanding2();
  await waitFor(() => {
    expect(container.querySelector('[data-reduced-motion="true"]')).not.toBeNull();
  });
  expect(
    screen.getByRole("heading", { name: /the route changes/i }),
  ).toBeVisible();
  expect(
    screen.getByRole("heading", { name: /everything you need/i }),
  ).toBeVisible();

  window.matchMedia = originalMatchMedia;
});

it("uses instant rail positioning when reduced motion is requested", () => {
  const scrollIntoView = vi.fn();
  Object.defineProperty(Element.prototype, "scrollIntoView", {
    configurable: true,
    value: scrollIntoView,
  });

  render(<ServiceRail reducedMotion services={services} />);
  fireEvent.click(screen.getByRole("button", { name: "Next service" }));
  expect(scrollIntoView).toHaveBeenCalledWith(
    expect.objectContaining({ behavior: "auto" }),
  );
});

it("synchronizes the active service after native horizontal scrolling", () => {
  render(<ServiceRail reducedMotion={false} services={services} />);
  const viewport = screen.getByRole("region", { name: /atlas essentials/i });
  const cards = viewport.querySelectorAll("li");
  cards.forEach((card, index) => {
    Object.defineProperty(card, "offsetLeft", {
      configurable: true,
      value: index * 400,
    });
  });
  Object.defineProperty(viewport, "clientWidth", { configurable: true, value: 800 });
  Object.defineProperty(viewport, "scrollWidth", { configurable: true, value: 3200 });
  Object.defineProperty(viewport, "scrollLeft", { configurable: true, value: 400, writable: true });

  fireEvent.scroll(viewport);
  expect(screen.getByRole("status")).toHaveTextContent("Banking, 2 of 8");
});

it("keeps the final service active when the rail reaches its clamped end", () => {
  render(<ServiceRail reducedMotion={false} services={services} />);
  const viewport = screen.getByRole("region", { name: /atlas essentials/i });
  const cards = viewport.querySelectorAll("li");
  cards.forEach((card, index) => {
    Object.defineProperty(card, "offsetLeft", {
      configurable: true,
      value: index * 400,
    });
  });
  Object.defineProperty(viewport, "clientWidth", { configurable: true, value: 800 });
  Object.defineProperty(viewport, "scrollWidth", { configurable: true, value: 3200 });
  Object.defineProperty(viewport, "scrollLeft", { configurable: true, value: 2400, writable: true });

  fireEvent.scroll(viewport);
  expect(screen.getByRole("status")).toHaveTextContent("Visas, 8 of 8");
});

it("does not announce intermediate cards during smooth programmatic navigation", () => {
  render(<ServiceRail reducedMotion={false} services={services} />);
  const viewport = screen.getByRole("region", { name: /atlas essentials/i });
  const cards = viewport.querySelectorAll("li");
  cards.forEach((card, index) => {
    Object.defineProperty(card, "offsetLeft", {
      configurable: true,
      value: index * 400,
    });
  });
  Object.defineProperty(viewport, "clientWidth", { configurable: true, value: 800 });
  Object.defineProperty(viewport, "scrollWidth", { configurable: true, value: 3200 });
  Object.defineProperty(viewport, "scrollLeft", { configurable: true, value: 0, writable: true });

  fireEvent.keyDown(viewport, { key: "End" });
  expect(screen.getByRole("status")).toHaveTextContent("Visas, 8 of 8");
  expect(screen.getByRole("button", { name: "Next service" })).toBeDisabled();

  viewport.scrollLeft = 800;
  fireEvent.scroll(viewport);
  expect(screen.getByRole("status")).toHaveTextContent("Visas, 8 of 8");
  expect(screen.getByRole("button", { name: "Next service" })).toBeDisabled();
});
