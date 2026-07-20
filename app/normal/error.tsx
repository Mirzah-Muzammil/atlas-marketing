"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-white px-4 pt-28 pb-20 sm:px-6 lg:px-8">
      <section className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="mb-5 rounded-full bg-red-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-red-600">
          Something went wrong
        </span>
        <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
          We could not load this page.
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base">
          Please try again.
        </p>

        {error.digest && (
          <p className="mt-4 rounded-xl bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-500">
            Error reference: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="rounded-full bg-primary px-7 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/10 transition-all hover:bg-primary-hover active:scale-[0.98]"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-gray-200 bg-white px-7 py-3 text-sm font-bold text-gray-800 transition-all hover:bg-gray-50 active:scale-[0.98]"
          >
            GGI Atlas
          </Link>
        </div>
      </section>
    </main>
  );
}
