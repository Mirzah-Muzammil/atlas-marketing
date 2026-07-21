import type { ReactNode } from "react";

import "../normal/globals.css";
import "./globals.css";

export default function HybridLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <div className="min-h-full overflow-x-hidden">{children}</div>;
}
