import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";

const hostGrotesk = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "GGI Atlas — Your operating system for studying and succeeding abroad.",
  description: "Match universities. Sort your services. Settle in. Then build a life. All in one place — from your first application to long after you've landed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${hostGrotesk.variable} h-full antialiased !overflow-x-hidden`}>
      <body className="min-h-full flex flex-col font-sans">
          {children}
      </body>
    </html>
  );
}
