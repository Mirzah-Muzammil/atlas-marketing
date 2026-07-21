import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen } from "@testing-library/react";

import HybridPage from "@/app/hybrid/page";
import { DispatchTrustSection } from "@/components/home/dispatch/DispatchTrustSection";

beforeAll(() => {
  Object.defineProperty(window, "scrollTo", {
    configurable: true,
    value: vi.fn(),
    writable: true,
  });
});

it("provides a dedicated hybrid homepage route", () => {
  expect(existsSync(resolve(process.cwd(), "app/hybrid/page.tsx"))).toBe(true);
});

it("combines the normal hero with the two editorial story sections", () => {
  const { container } = render(<HybridPage />);

  expect(
    screen.getByRole("heading", {
      level: 1,
      name: /your operating system for studying and succeeding abroad/i,
    }),
  ).toBeInTheDocument();
  expect(screen.getByText(/why this exists/i)).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /a real product.*not a brochure/i })).toBeInTheDocument();
  expect(container.querySelector(".atlas-hero")).toBeInTheDocument();
  expect(container.querySelector(".editorial-theme")).toBeInTheDocument();
  expect(container.querySelectorAll("main section")).toHaveLength(3);
});

it("uses the Wise palette and typography only on the hybrid route", () => {
  const cssPath = resolve(process.cwd(), "app/hybrid/globals.css");
  const interFontPath = resolve(
    process.cwd(),
    "public/fonts/inter-latin-variable.woff2",
  );
  const wiseSansFontPath = resolve(
    process.cwd(),
    "public/fonts/wise-sans-heavy.woff2",
  );
  const layoutSource = readFileSync(
    resolve(process.cwd(), "app/hybrid/layout.tsx"),
    "utf8",
  );
  const { container } = render(<HybridPage />);

  expect(existsSync(cssPath)).toBe(true);
  const css = existsSync(cssPath) ? readFileSync(cssPath, "utf8") : "";

  expect(container.querySelector(".wise-hybrid-theme")).toBeInTheDocument();
  expect(
    container.querySelector(".wise-hybrid-theme .font-sans"),
  ).not.toBeInTheDocument();
  expect(layoutSource).toContain('import "./globals.css";');
  expect(css).toContain("--wise-bright-green: #9fe870;");
  expect(css).toContain("--wise-forest-green: #163300;");
  expect(css).toContain("--wise-display-tracking: 0;");
  expect(css).toContain('font-family: "Inter"');
  expect(css).toContain('font-family: "Wise Sans"');
  expect(css).toContain('url("/fonts/inter-latin-variable.woff2")');
  expect(css).toContain('url("/fonts/wise-sans-heavy.woff2")');
  expect(css).not.toMatch(/src:\s*url\(["']https?:\/\//);
  expect(existsSync(interFontPath)).toBe(true);
  expect(existsSync(wiseSansFontPath)).toBe(true);
});

  it("gives the hybrid Why this exists section a clean white background", () => {
  const css = readFileSync(
    resolve(process.cwd(), "app/hybrid/globals.css"),
    "utf8",
  );

  expect(css).toContain("--wise-white: #ffffff;");
  expect(css).toMatch(
    /\.wise-hybrid-theme \[data-editorial-trust\]\s*\{\s*background: var\(--wise-white\);\s*\}/,
  );
    expect(css).not.toContain(".wise-hybrid-theme {whit");
  });

  it("blends the green hero into the white trust section", () => {
    const css = readFileSync(
      resolve(process.cwd(), "app/hybrid/globals.css"),
      "utf8",
    );

    expect(css).toMatch(
      /\.wise-hybrid-theme \.atlas-hero::after\s*\{[\s\S]*height: clamp\(10rem, 18vw, 16rem\);[\s\S]*background: linear-gradient\([\s\S]*rgb\(159 232 112 \/ 0\) 0%,[\s\S]*var\(--wise-white\) 100%[\s\S]*\);[\s\S]*pointer-events: none;[\s\S]*\}/,
    );
  });

it("removes the trust cards and reuses the hero title reveal in both editorial sections", () => {
  const { container } = render(<HybridPage />);

  expect(container.querySelectorAll("[data-trust-proof]")).toHaveLength(0);
  expect(
    container.querySelectorAll("[data-editorial-trust] [data-title-reveal]")
      .length,
  ).toBeGreaterThanOrEqual(2);
  expect(
    container.querySelectorAll("[data-editorial-system] [data-title-reveal]")
      .length,
  ).toBeGreaterThanOrEqual(2);
});

it("keeps the shared editorial trust section unchanged by default", () => {
  const { container } = render(<DispatchTrustSection />);

  expect(container.querySelectorAll("[data-trust-proof]")).toHaveLength(3);
  expect(container.querySelector("[data-title-reveal]")).not.toBeInTheDocument();
});

it("keeps the hybrid conversion path keyboard-accessible and avoids dead navigation", () => {
  const { container } = render(<HybridPage />);

  expect(screen.getByRole("link", { name: /get started.*free/i })).toHaveAttribute(
    "href",
    "mailto:hello@atlas.study?subject=GGI%20Atlas%20early%20access",
  );
  expect(container.querySelector("#demo-modal-toggle")).not.toBeInTheDocument();
  expect(container.querySelector('a[href="/get-started"]')).not.toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /how it works|concierge|resources|sign in/i })).not.toBeInTheDocument();
});
