import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { normalServices } from "@/constants/normal-page-data";

const serviceImages = [
  "/images/normal/esim.jpg",
  "/images/normal/banking.jpg",
  "/images/normal/insurance.jpg",
  "/images/normal/visa.jpg",
  "/images/normal/housing.jpg",
  "/images/normal/forex.jpg",
  "/images/normal/tax.jpg",
  "/images/normal/loans.jpg",
];

it("uses the local photography set for every visible normal-page image slot", () => {
  expect(normalServices.map(({ image }) => image)).toEqual(serviceImages);

  const componentImages = [
    ["components/sections/modules.tsx", "/images/normal/product-planning.jpg"],
    ["components/sections/features.tsx", "/images/normal/service-planning.jpg"],
    ["components/sections/features.tsx", "/images/normal/career.jpg"],
    ["components/sections/cta-banner.tsx", "/images/normal/cta-student-cutout-v3.png"],
    ["components/sections/footer.tsx", "/images/normal/atlas-wordmark.png"],
  ] as const;

  for (const [component, image] of componentImages) {
    const source = readFileSync(resolve(process.cwd(), component), "utf8");
    expect(source).toContain(image);
  }

  for (const image of [...serviceImages, ...componentImages.map(([, image]) => image)]) {
    expect(existsSync(resolve(process.cwd(), "public", image.slice(1)))).toBe(true);
  }
});

it("keeps the CTA constrained to the mobile viewport", () => {
  const source = readFileSync(
    resolve(process.cwd(), "components/sections/cta-banner.tsx"),
    "utf8",
  );

  expect(source).toContain('className="relative mx-auto mt-24 w-full max-w-7xl');
  expect(source).not.toContain('className="min-w-7xl mx-auto');
});
