import Image from "next/image";

const dashboardAlt =
  "Atlas dashboard showing a student’s application journey, next steps, and services.";

export function Landing3DashboardShowcase() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#050506] px-5 pb-28 pt-24 text-white sm:px-8 sm:pb-40 sm:pt-32 lg:pb-52 lg:pt-40"
      data-landing-3-showcase
      id="platform"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[12%] top-[32%] h-[45%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(78,73,255,.24),rgba(117,47,180,.08)_44%,transparent_72%)] blur-3xl"
      />

      <div className="relative mx-auto max-w-[1240px]">
        <h2
          aria-label="Take shortcuts, not detours. One interface, everything you need."
          className="mx-auto max-w-none text-balance text-center text-[clamp(2.8rem,5.6vw,5.2rem)] font-semibold leading-[.93] tracking-[-.065em]"
        >
          <span
            className="block text-white/48 xl:whitespace-nowrap"
            data-showcase-line="primary"
          >
            Take shortcuts, not detours.
          </span>
          <span
            className="block text-white xl:whitespace-nowrap"
            data-showcase-line="secondary"
          >
            One interface, everything you need.
          </span>
        </h2>

        <div className="relative mx-auto mt-16 max-w-[1160px] [perspective:1800px] sm:mt-24">
          <div
            className="relative origin-bottom [transform:rotateX(1.5deg)]"
            data-macbook-frame
          >
            <div
              className="relative rounded-[1.15rem] border border-white/16 bg-[linear-gradient(145deg,#383b42,#0b0c10_18%,#111319_82%,#3c3f46)] p-[clamp(.28rem,.65vw,.62rem)] shadow-[0_70px_140px_-50px_rgba(0,0,0,.95),0_0_80px_rgba(93,72,255,.12)] sm:rounded-[1.7rem]"
              data-macbook-screen
            >
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-0 z-10 h-2.5 w-16 -translate-x-1/2 rounded-b-xl bg-[#08090c] sm:h-4 sm:w-28"
              />
              <div className="overflow-hidden rounded-[.72rem] bg-[#0b0c10] sm:rounded-[1.15rem]">
                <Image
                  alt={dashboardAlt}
                  className="block h-auto w-full"
                  height={575}
                  priority
                  sizes="(max-width: 1280px) calc(100vw - 40px), 1160px"
                  src="/images/crm.png"
                  width={1144}
                />
              </div>
            </div>

            <div
              aria-hidden="true"
              className="relative mx-auto"
              data-macbook-base
            >
              <div className="mx-auto h-[clamp(.65rem,1.35vw,1.15rem)] w-[106%] -translate-x-[2.8%] rounded-b-[45%] border-t border-white/20 bg-[linear-gradient(180deg,#9da0a6_0%,#555960_18%,#22252a_58%,#0b0c0e_100%)] shadow-[0_18px_30px_-18px_rgba(0,0,0,.9)] [clip-path:polygon(1.6%_0,98.4%_0,100%_100%,0_100%)]" />
              <div className="mx-auto h-1.5 w-[14%] -translate-y-full rounded-b-full bg-black/45" />
            </div>
          </div>

          <div
            aria-hidden="true"
            className="mx-auto mt-7 h-20 w-[82%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(80,69,145,.2),rgba(0,0,0,.3)_48%,transparent_72%)] blur-xl"
          />
        </div>
      </div>
    </section>
  );
}
