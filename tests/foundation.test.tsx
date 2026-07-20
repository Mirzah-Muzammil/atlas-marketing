import RootLayout from "@/app/layout";

it("exposes the Atlas brand and main content landmark", () => {
  const document = RootLayout({
    children: <main id="main-content">Atlas test content</main>,
  });

  expect(document.type).toBe("html");
  expect(document.props.lang).toBe("en");
  expect(document.props.children.type).toBe("body");
});
