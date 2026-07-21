import { readFileSync } from "node:fs";
import { resolve } from "node:path";

it("uses Google Sans Flex throughout only the normal route", () => {
  const css = readFileSync(
    resolve(process.cwd(), "app/normal/globals.css"),
    "utf8",
  );
  const layout = readFileSync(
    resolve(process.cwd(), "app/normal/layout.tsx"),
    "utf8",
  );

  expect(css).toContain(
    "family=Google+Sans+Flex:opsz,wght@6..144,1..1000",
  );
  expect(css).toContain('--font-sans: "Google Sans Flex", sans-serif;');
  expect(css).toContain('font-family: "Google Sans Flex", sans-serif;');
  expect(layout).not.toContain("Host_Grotesk");
  expect(layout).not.toContain("hostGrotesk.variable");
});
