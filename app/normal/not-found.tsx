import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white px-4 pt-28 pb-20 sm:px-6 lg:px-8">
      <section className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="mb-5 rounded-full bg-[#FFF3EC] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
          404
        </span>
        <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base">
          The page you are looking for does not exist, or the route has moved.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-primary px-7 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/10 transition-all hover:bg-primary-hover active:scale-[0.98]"
          >
            Back to home
          </Link>
          <Link
            href="/normal#features"
            className="rounded-full border border-gray-200 bg-white px-7 py-3 text-sm font-bold text-gray-800 transition-all hover:bg-gray-50 active:scale-[0.98]"
          >
            See how it works
          </Link>
        </div>
      </section>
    </main>
  );
}
