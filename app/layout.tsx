import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://atlas.study"),
  title: {
    default: "Atlas — Your study-abroad journey, in one place",
    template: "%s | Atlas",
  },
  description:
    "Plan applications, visas, money, housing, and arrival with one trusted study-abroad companion.",
  openGraph: {
    title: "Atlas — Your study-abroad journey, in one place",
    description:
      "From first application to first day abroad, Atlas keeps every step clear and connected.",
    type: "website",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f7fb" },
    { media: "(prefers-color-scheme: dark)", color: "#06152e" },
  ],
};

type RootLayoutProps = Readonly<{ children: ReactNode }>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
