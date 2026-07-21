import { render, screen } from "@testing-library/react";

import Industries from "@/components/sections/industries";
import { normalServices } from "@/constants/normal-page-data";

it("presents Arrive & Settle as three alternating service marquees", () => {
  const { container } = render(<Industries industries={normalServices} />);

  const section = container.querySelector("#industries");
  expect(section).toHaveClass("bg-white", "text-gray-900");
  expect(section).not.toHaveClass("bg-[#090909]");

  expect(
    screen.getByRole("heading", {
      level: 2,
      name: "Every service you need, sorted.",
    }),
  ).toBeInTheDocument();

  const tracks = container.querySelectorAll("[data-service-marquee]");
  expect(tracks).toHaveLength(3);
  expect(
    Array.from(tracks, (track) => track.getAttribute("data-marquee-direction")),
  ).toEqual(["left", "right", "left"]);

  normalServices.forEach((service) => {
    expect(
      screen.getByRole("heading", { level: 3, name: service.name }),
    ).toBeInTheDocument();
  });
}, 10_000);
