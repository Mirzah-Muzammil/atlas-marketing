import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const projectRoot = process.cwd();

function filesWithin(relativeDirectory: string): string[] {
  const directory = path.join(projectRoot, relativeDirectory);

  if (!existsSync(directory)) return [];

  return readdirSync(directory).flatMap((entry) => {
    const absolutePath = path.join(directory, entry);
    const relativePath = path.relative(projectRoot, absolutePath);

    return statSync(absolutePath).isDirectory()
      ? filesWithin(relativePath)
      : [relativePath];
  });
}

describe("production homepage architecture", () => {
  it("serves Atlas from the root route without draft naming", () => {
    expect(existsSync(path.join(projectRoot, "app/atlas-homepage"))).toBe(false);
    expect(existsSync(path.join(projectRoot, "components/atlas-homepage"))).toBe(false);
    expect(existsSync(path.join(projectRoot, "public/images/atlas-homepage"))).toBe(false);

    const homepage = readFileSync(path.join(projectRoot, "app/page.tsx"), "utf8");
    expect(homepage).toContain("data-atlas-homepage-global-grid");
  });

  it("contains no atlas-homepage route, symbol, file, or asset references", () => {
    const sourceFiles = ["app", "components", "public"]
      .flatMap(filesWithin)
      .filter((file) => /\.(?:css|js|jsx|ts|tsx)$/.test(file));
    const legacyName = ["landing", "3"].join("-");
    const legacySymbol = ["Landing", "3"].join("");

    const matches = sourceFiles.filter((file) => {
      const contents = readFileSync(path.join(projectRoot, file), "utf8");
      return (
        file.includes(legacyName) ||
        contents.includes(legacyName) ||
        contents.includes(legacySymbol)
      );
    });

    expect(matches).toEqual([]);
  });

  it("keeps global navigation and the footer in the root layout with recovery routes", () => {
    const layout = readFileSync(path.join(projectRoot, "app/layout.tsx"), "utf8");

    expect(layout).toContain("<SiteHeader />");
    expect(layout).toContain("<Footer />");
    expect(existsSync(path.join(projectRoot, "app/not-found.tsx"))).toBe(true);
    expect(existsSync(path.join(projectRoot, "app/error.tsx"))).toBe(true);
  });
});
