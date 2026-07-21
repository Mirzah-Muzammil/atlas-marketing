import type { Metadata } from "next";
import "./globals.css";

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
    <div className="min-h-full flex flex-col font-sans antialiased !overflow-x-hidden">
      {children}
    </div>
  );
}
