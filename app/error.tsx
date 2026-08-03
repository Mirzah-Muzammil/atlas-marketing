"use client";

import Link from "next/link";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main
      className="grid min-h-[68svh] place-items-center px-5 py-20 text-center text-white sm:px-8"
      data-error-digest={error.digest}
      id="main-content"
    >
      <div className="max-w-xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#f35a02]">
          Something went wrong
        </p>
        <h1 className="mt-5 text-balance text-[clamp(3rem,6vw,5.8rem)] font-semibold leading-[.9] tracking-[-.07em]">
          Your Atlas is still here.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-pretty text-base leading-7 text-white/60 sm:text-lg">
          Try again, or return to the homepage and pick up where you left off.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            className="inline-flex min-h-11 items-center rounded-full bg-[#f35a02] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#ff7026] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f35a02]"
            onClick={reset}
            type="button"
          >
            Try again
          </button>
          <Link
            className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            href="/"
          >
            Back to Atlas
          </Link>
        </div>
      </div>
    </main>
  );
}
