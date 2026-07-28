import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { landing3Universities } from "@/components/landing-3/universities";

it("contains the complete current Universities UK member set", () => {
  expect(landing3Universities).toHaveLength(143);
  expect(new Set(landing3Universities.map(({ name }) => name)).size).toBe(143);
  expect(new Set(landing3Universities.map(({ domain }) => domain)).size).toBe(
    143,
  );
});

it("uses official HTTPS destinations and locally stored marks", () => {
  for (const university of landing3Universities) {
    expect(university.href).toBe(`https://${university.domain}`);
    expect(university.logo).toMatch(
      /^\/images\/landing-3\/universities-white\/[a-z0-9-]+\.png$/,
    );
    expect(
      existsSync(resolve(process.cwd(), "public", university.logo.slice(1))),
    ).toBe(true);
  }
});
