import { readFileSync } from "node:fs";
import { resolve } from "node:path";

it("presents Concierge on a light editorial field", () => {
  const css = readFileSync(resolve(process.cwd(), "app/landing/landing.css"), "utf8");
  const conciergeRule = css.match(/\.land-concierge\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";

  expect(conciergeRule).toContain("#f2eee5");
  expect(conciergeRule).toContain("color: var(--land-ink)");
  expect(conciergeRule).not.toContain("#080b12");
});
