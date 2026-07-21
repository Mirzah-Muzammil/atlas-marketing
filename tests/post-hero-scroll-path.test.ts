import { readFileSync } from "node:fs";
import { resolve } from "node:path";

it("starts the decorative scroll path after the hero and carries it through later sections", () => {
  const source = readFileSync(
    resolve(process.cwd(), "app/normal/page.tsx"),
    "utf8",
  );
  const pathSource = readFileSync(
    resolve(process.cwd(), "components/common/PostHeroScrollPath.tsx"),
    "utf8",
  );

  expect(source).toContain("PostHeroScrollPath");
  expect(pathSource).toContain("data-post-hero-scroll-story");
  expect(source.indexOf("<Hero />")).toBeLessThan(
    source.indexOf("<PostHeroScrollPath>"),
  );
  expect(source.indexOf("<PostHeroScrollPath>")).toBeLessThan(
    source.indexOf("<Modules"),
  );
});
