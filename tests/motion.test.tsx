import { render, screen } from "@testing-library/react";

import { Reveal } from "@/components/motion/Reveal";

it("keeps reveal content present before animation initializes", () => {
  render(<Reveal><p>Always readable</p></Reveal>);
  expect(screen.getByText("Always readable")).toBeVisible();
});
