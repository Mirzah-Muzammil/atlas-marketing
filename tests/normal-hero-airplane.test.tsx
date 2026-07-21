import { render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import Hero from "@/components/sections/hero";

it("presents the student operating system beside the looping student video", () => {
  const { container } = render(<Hero />);

  expect(
    screen.getByRole("heading", {
      level: 1,
      name: /your operating system for studying and succeeding abroad/i,
    }),
  ).toBeInTheDocument();
  expect(screen.getByText("Get started — free")).toHaveAttribute(
    "for",
    "demo-modal-toggle",
  );
  expect(
    screen.getByRole("link", { name: /explore the platform/i }),
  ).toHaveAttribute("href", "#features");

  const video = container.querySelector<HTMLVideoElement>("[data-hero-video]");
  expect(video).toHaveAttribute("aria-hidden", "true");
  expect(video).toHaveAttribute("autoplay");
  expect(video).toHaveAttribute("loop");
  expect(video).toHaveAttribute("playsinline");
  expect(video).toHaveProperty("muted", true);
  expect(video?.querySelector("source")).toHaveAttribute(
    "src",
    "/videos/atlas-student-study.mp4",
  );
  expect(
    container.querySelector("[data-student-journey-artwork]"),
  ).not.toBeInTheDocument();
});

it("blends the responsive video into the white hero without a divider", () => {
  const css = readFileSync(
    resolve(process.cwd(), "app/normal/globals.css"),
    "utf8",
  );

  expect(css).toContain(".atlas-hero__video-shell");
  expect(css).toContain("mask-image: linear-gradient");
  expect(css).toContain(".atlas-hero__video");
  expect(css).toContain("@media (max-width: 767px)");
  expect(css).toContain("@media (prefers-reduced-motion: reduce)");
  expect(css).not.toContain("atlas-journey-draw");
});
