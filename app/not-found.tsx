import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="grid min-h-[68svh] place-items-center px-5 py-20 text-center text-white sm:px-8"
      id="main-content"
    >
      <div className="max-w-xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#f35a02]">
          404
        </p>
        <h1 className="mt-5 text-balance text-[clamp(3rem,6vw,5.8rem)] font-semibold leading-[.9] tracking-[-.07em]">
          This page is not on your Atlas.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-pretty text-base leading-7 text-white/60 sm:text-lg">
          Go back to the plan built for your study abroad journey.
        </p>
        <Link
          className="mt-8 inline-flex min-h-11 items-center rounded-full bg-[#f35a02] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#ff7026] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f35a02]"
          href="/"
        >
          Back to Atlas
        </Link>
      </div>
    </main>
  );
}
