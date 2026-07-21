"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";

function InitialScrollReset() {
  useLayoutEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    const scrollToStart = () => {
      window.scrollTo({ behavior: "instant" as ScrollBehavior, left: 0, top: 0 });
    };

    window.history.scrollRestoration = "manual";
    scrollToStart();
    window.addEventListener("pageshow", scrollToStart);

    return () => {
      window.removeEventListener("pageshow", scrollToStart);
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  return null;
}

function AOSInitializer() {
  useEffect(() => {
    const initAOS = () => {
      const isMobile = window.innerWidth < 768;
      AOS.init({
        disable: () => window.innerWidth < 768,
        duration: 800, // Keep animations quick and sleek
        once: true,    // Run animations only once when scrolling down
        offset: isMobile ? 30 : 120, // Smaller offset on mobile so elements animate earlier
        easing: "ease-out-cubic",
      });
    };

    if (document.readyState === "complete") {
      initAOS();
    } else {
      window.addEventListener("load", initAOS);
      return () => window.removeEventListener("load", initAOS);
    }
  }, []);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5 * 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <InitialScrollReset />
      {children}
      <AOSInitializer />
    </QueryClientProvider>
  );
}
