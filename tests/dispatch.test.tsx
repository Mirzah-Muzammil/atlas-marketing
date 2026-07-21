import { render, screen } from "@testing-library/react";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import EditorialPage, { metadata } from "@/app/editorial/page";

const editorialDesignFiles = [
  "app/editorial/page.tsx",
  "components/navigation/DispatchNav.tsx",
  "components/home/dispatch/DispatchHero.tsx",
  "components/home/dispatch/DispatchJourneyPanel.tsx",
  "components/home/dispatch/DispatchTrustSection.tsx",
  "components/home/dispatch/DispatchSystemSection.tsx",
];

const fixedEditorialDesignFiles = [
  "components/home/dispatch/DispatchHeroMotion.tsx",
  "components/home/dispatch/DispatchSupportingMotion.tsx",
  "components/home/dispatch/DispatchConnectorArtwork.tsx",
  "styles/globals.css",
];

function editorialDesignDigest() {
  const parts = editorialDesignFiles.flatMap((file) => {
    const source = readFileSync(resolve(process.cwd(), file), "utf8");
    return [
      ...(source.match(
        /className\s*=\s*(?:"[^"]*"|'[^']*'|{\s*`[\s\S]*?`\s*}|{\s*"[^"]*"\s*}|{\s*'[^']*'\s*}|{[\s\S]*?})/g,
      ) ?? []),
      ...(source.match(/(?:data-[\w-]+|id|role)\s*=\s*(?:"[^"]*"|{[^}]*})/g) ?? []),
    ];
  });

  for (const file of fixedEditorialDesignFiles) {
    parts.push(readFileSync(resolve(process.cwd(), file), "utf8"));
  }

  return createHash("sha256").update(parts.join("\0")).digest("hex");
}

it("presents one focused three-stage Atlas journey", () => {
  const { container } = render(<EditorialPage />);

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    /your operating system for studying and succeeding abroad/i,
  );
  expect(screen.getAllByRole("link", { name: /^get started$/i })).not.toHaveLength(0);

  const journey = screen.getByRole("tablist", { name: /your journey/i });
  expect(journey).toBeInTheDocument();
  expect(screen.getByRole("tab", { name: /apply/i })).toBeInTheDocument();
  expect(screen.getByRole("tab", { name: /settle/i })).toBeInTheDocument();
  expect(screen.getByRole("tab", { name: /thrive/i })).toBeInTheDocument();

  expect(screen.getByRole("heading", { name: /studying abroad is a huge decision.*the industry treating it like a commission opportunity is the problem/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /a real product.*not a brochure/i })).toBeInTheDocument();
  expect(container.querySelectorAll("main > section")).toHaveLength(3);
});

it("uses only supplied GGI Atlas marketing copy", () => {
  render(<EditorialPage />);

  expect(metadata.title).toBe(
    "GGI Atlas — Your operating system for studying and succeeding abroad",
  );
  expect(metadata.description).toBe(
    "Match universities, sort your services, settle in, and thrive abroad — all in one place. Free, end to end.",
  );
  expect(
    screen.getByText(
      "Match universities. Sort your services. Settle in. Then build a life. All in one place — from your first application to long after you've landed.",
    ),
  ).toBeInTheDocument();
  expect(screen.getByText("Your top matches for MSc Computer Science")).toBeInTheDocument();
  expect(screen.getByText("Built to help you get out, and stay out.")).toBeInTheDocument();

  for (const unsupported of [
    "Study abroad the easy way",
    "One calm plan",
    "Every decision remembers",
    "Your next step stays obvious",
    "Journey synced",
    "Make the decision with the whole picture",
    "See readiness, not scattered checklists",
    "Keep Atlas after the plane lands",
    "The move is big",
    "Talk to us",
    "Get started free",
  ]) {
    expect(screen.queryByText(new RegExp(unsupported, "i"))).not.toBeInTheDocument();
  }
});

it("keeps the editorial design and motion fingerprint unchanged", () => {
  expect(editorialDesignDigest()).toBe(
    "f03360f9e8c7546d2cecde712a565af1c738e6581555eec14ba607d1c02163aa",
  );
});

it("marks the Dispatch hero artwork for its first-load draw sequence", () => {
  const { container } = render(<EditorialPage />);

  const panel = container.querySelector("[data-dispatch-panel-entrance]");
  expect(panel).toBeInTheDocument();
  expect(panel).toHaveAttribute("data-dispatch-draw-icons");
  expect(panel?.querySelectorAll("svg").length).toBeGreaterThan(0);

  const drawPaths = container.querySelectorAll("[data-dispatch-draw-step]");
  expect(drawPaths).toHaveLength(4);
  expect(
    Array.from(drawPaths).map((path) => path.getAttribute("data-dispatch-draw-step")),
  ).toEqual(["0", "1", "2", "3"]);
  expect(container.querySelectorAll("[data-dispatch-connector-node]")).toHaveLength(4);
});

it("marks hero copy so its entrance state exists on the first paint", () => {
  const { container } = render(<EditorialPage />);

  expect(container.querySelectorAll('[data-dispatch-entrance="nav"]')).toHaveLength(1);
  expect(container.querySelectorAll('[data-dispatch-entrance="heading"]')).toHaveLength(2);
  expect(container.querySelectorAll('[data-dispatch-entrance="intro"]')).toHaveLength(1);
});

it("presents the trust proofs as three numbered editorial tiles", () => {
  const { container } = render(<EditorialPage />);

  const tiles = Array.from(
    container.querySelectorAll<HTMLElement>("[data-trust-proof-tile]"),
  );

  expect(tiles).toHaveLength(3);
  expect(tiles[0]).toHaveTextContent(/01.*To use, ever.*£0/);
  expect(tiles[1]).toHaveTextContent(/02.*To set up.*3 min/);
  expect(tiles[2]).toHaveTextContent(/03.*Required.*No card/);
  expect(tiles.every((tile) => tile.hasAttribute("data-trust-proof"))).toBe(true);
});
