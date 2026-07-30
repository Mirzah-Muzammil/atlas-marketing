import Landing3AnimatedTitle from "@/components/landing-3/Landing3AnimatedTitle";

const freeProducts = [
  {
    id: "careers",
    label: "Careers & jobs",
    title: "Opportunities shaped around student life",
    copy: "Flexible work, internships, and graduate roles matched to where you are now and where you want to go.",
  },
  {
    id: "events",
    label: "Events",
    title: "What’s happening around you",
    copy: "Useful workshops, welcome events, employer sessions, and student meetups in one clear place.",
  },
  {
    id: "community",
    label: "Community",
    title: "Find your people before you land",
    copy: "Meet students by university, course, city, and intake, then keep those connections as you settle in.",
  },
] as const;

function FreeProductArtwork({ id }: { id: (typeof freeProducts)[number]["id"] }) {
  if (id === "careers") {
    return (
      <svg
        aria-hidden="true"
        className="size-[62px] text-white"
        data-free-product-artwork
        viewBox="0 0 64 64"
      >
        <path d="M10 22h44v31H10z" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M23 22v-7h18v7M10 33h44M27 33v6h10v-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        <path d="m39 15 8-8m0 0h-6m6 0v6" fill="none" stroke="#f35a02" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
      </svg>
    );
  }

  if (id === "events") {
    return (
      <svg
        aria-hidden="true"
        className="size-[62px] text-white"
        data-free-product-artwork
        viewBox="0 0 64 64"
      >
        <rect x="9" y="13" width="46" height="42" rx="3" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M9 25h46M20 8v10M44 8v10" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
        <path d="m32 31 3.2 6.4 7.1 1-5.1 5 1.2 7-6.4-3.4-6.4 3.4 1.2-7-5.1-5 7.1-1Z" fill="none" stroke="#f35a02" strokeLinejoin="round" strokeWidth="2.2" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="size-[62px] text-white"
      data-free-product-artwork
      viewBox="0 0 64 64"
    >
      <circle cx="32" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="15" cy="27" r="6" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="49" cy="27" r="6" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="M17 54c1-14 6-21 15-21s14 7 15 21M4 54c1-10 5-15 11-15 4 0 7 2 9 6M60 54c-1-10-5-15-11-15-4 0-7 2-9 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
      <path d="M27 50h10" stroke="#f35a02" strokeLinecap="round" strokeWidth="3" />
    </svg>
  );
}

export function Landing3FreeProductSection() {
  return (
    <section
      className="relative isolate overflow-hidden border-y border-white/[.07] bg-[#050506] px-5 py-24 text-white sm:px-8 sm:py-28"
      data-landing-3-free-product
      data-orange-origin="right"
      id="free-with-atlas"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:84px_84px]" />
        <div className="absolute -bottom-[42%] -right-[7%] h-[112%] w-[78%] rounded-[50%] bg-[#f35a02]/45 blur-[105px]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#050506_0%,rgba(5,5,6,.96)_22%,rgba(5,5,6,.56)_57%,rgba(5,5,6,.12)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#050506_0%,transparent_24%,transparent_76%,rgba(5,5,6,.42)_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[520px] max-w-[1160px] flex-col items-center justify-center">
        <Landing3AnimatedTitle
          as="h2"
          className="max-w-[860px] text-center text-[clamp(2.7rem,4.4vw,4.6rem)] font-medium leading-[.95] tracking-[-.062em]"
        >
          Free with Atlas. Built for everything after the offer.
        </Landing3AnimatedTitle>

        <div className="mt-16 grid w-full gap-6 sm:grid-cols-3 lg:mt-20 lg:gap-9">
          {freeProducts.map((product) => (
            <article
              className="group relative flex min-h-[320px] flex-col items-center overflow-hidden rounded-[18px] border border-white/[.14] bg-black/35 px-7 py-8 text-center shadow-[inset_0_1px_rgba(255,255,255,.035),0_24px_64px_rgba(0,0,0,.22)] backdrop-blur-[2px] transition-[transform,border-color,background-color,box-shadow] duration-500 hover:-translate-y-1.5 hover:border-white/28 hover:bg-black/45 hover:shadow-[inset_0_1px_rgba(255,255,255,.08),0_30px_76px_rgba(0,0,0,.35),0_0_38px_rgba(243,90,2,.1)] motion-reduce:hover:translate-y-0 sm:min-h-[340px] lg:px-8 lg:py-9"
              data-free-product-card
              key={product.id}
            >
              <div className="grid min-h-[76px] place-items-center transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105 motion-reduce:transition-none">
                <FreeProductArtwork id={product.id} />
              </div>
              <p className="mt-5 text-sm font-medium uppercase tracking-[.16em] text-[#ff8a49]">
                {product.label}
              </p>
              <h3 className="mt-3 max-w-[270px] text-[clamp(1.25rem,1.7vw,1.6rem)] font-medium leading-[1.08] tracking-[-.035em]">
                {product.title}
              </h3>
              <p className="mt-4 max-w-[280px] text-[13px] leading-6 text-white/54">
                {product.copy}
              </p>
              <span
                aria-hidden="true"
                className="absolute inset-x-12 bottom-0 h-px origin-center scale-x-0 bg-[#f35a02] transition-transform duration-500 group-hover:scale-x-100"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
