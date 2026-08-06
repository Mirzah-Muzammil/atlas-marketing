import { fireEvent, render, screen, within } from "@testing-library/react";

import ResourcesPage from "@/app/resources/page";

describe("Resources page", () => {
  it("opens with a searchable resources hero and the shared final CTA", () => {
    render(<ResourcesPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Knowledge & tools." }),
    ).toBeVisible();
    expect(screen.getByRole("search", { name: "Search Atlas resources" })).toBeVisible();
    expect(
      screen.getByRole("searchbox", { name: "Search guides, tools, and checklists" }),
    ).toHaveAttribute("name", "q");
    expect(screen.getByRole("button", { name: "Search resources" })).toBeVisible();
    expect(screen.getByText("UK student visa")).toBeVisible();
    expect(screen.getByRole("group", { name: "Filter resources by category" })).toBeVisible();
    expect(screen.getByRole("button", { name: "All resources" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "Applications 11" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(screen.getByRole("button", { name: "Visa 9" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Country guides" })).toBeVisible();
    expect(screen.getByLabelText("Featured guide book")).toBeVisible();
    expect(document.querySelector("[data-featured-guide]")).toHaveAttribute(
      "data-featured-guide-scroll-window",
      "0.08:0.80",
    );
    expect(document.querySelector("[data-featured-guide-book-motion='exit']")).toBeTruthy();
    expect(screen.getByText("Should you actually study in the UK in 2026?")).toBeVisible();
    expect(screen.getByText("Graduate Route: the 24 months that decide everything.")).toBeVisible();
    expect(screen.queryByText("ATLAS RESOURCE INDEX")).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "What 14,000+ students are actually reading." }),
    ).toBeVisible();
    expect(screen.getByTestId("trending-reading-grid")).toBeVisible();
    expect(
      screen.getAllByText("UK student visa: every document, every deadline.").length,
    ).toBeGreaterThan(0);
    expect(screen.queryByText(/Tweet 1742983975340327184/)).not.toBeInTheDocument();
    expect(
      screen.getByRole("table", { name: "Browse resources by study stage" }),
    ).toBeVisible();
    expect(screen.getByText("Wherever you are")).toBeVisible();
    expect(screen.getByText("UK vs Ireland vs Canada: a 2026 head-to-head.")).toBeVisible();
    expect(
      screen.getByRole("heading", { level: 2, name: "Four tools that do real work." }),
    ).toBeVisible();
    expect(screen.getByRole("heading", { level: 3, name: "Budget calculator." })).toBeVisible();
    expect(
      screen.getByRole("heading", { level: 3, name: "Pre-departure checklist." }),
    ).toBeVisible();
    expect(screen.getByRole("heading", { level: 3, name: "Forex rate tracker." })).toBeVisible();
    expect(screen.getByRole("heading", { level: 3, name: "Timezone planner." })).toBeVisible();
    expect(
      screen.getByRole("heading", { level: 2, name: "Where do you actually want to go?" }),
    ).toBeVisible();
    expect(screen.getByRole("button", { name: "United Kingdom guide" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(document.querySelector("[data-country-guide-flow='true']")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Ireland guide" })).toBeVisible();
    expect(document.querySelectorAll("[data-tool-window='true']")).toHaveLength(4);
    expect(
      screen.getByRole("heading", { level: 2, name: "14,000+ Indians. Already in your corner." }),
    ).toBeVisible();
    const communityApp = screen.getByRole("region", {
      name: "Atlas Community application window",
    });
    expect(within(communityApp).getByText("Atlas Community")).toBeVisible();
    expect(within(communityApp).getByText("Circles")).toBeVisible();
    expect(
      screen.getByRole("form", { name: "Subscribe to Atlas resources" }),
    ).toBeVisible();
    expect(
      screen.getByRole("img", { name: "Indian students planning their UK move" }),
    ).toBeVisible();
    expect(screen.getByRole("textbox", { name: "Email address" })).toBeVisible();
    expect(
      screen.getByRole("heading", { level: 2, name: "Done reading? Set yourself up free." }),
    ).toBeVisible();
  });

  it("lets students use the resource previews", () => {
    render(<ResourcesPage />);

    const visaTask = screen.getByRole("button", { name: /Apply for student visa/ });
    expect(visaTask).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(visaTask);
    expect(visaTask).toHaveAttribute("aria-pressed", "false");

    const irelandGuide = screen.getByRole("button", { name: "Ireland guide" });
    fireEvent.click(irelandGuide);
    expect(irelandGuide).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByText(/The fast-rising option for Indian students/),
    ).toBeVisible();

    fireEvent.change(screen.getByRole("textbox", { name: "Email address" }), {
      target: { value: "student@example.com" },
    });
    fireEvent.submit(screen.getByRole("form", { name: "Subscribe to Atlas resources" }));
    expect(screen.getByRole("status")).toHaveTextContent("You are on the list.");
  });
});
