const skeletonCards = Array.from({ length: 3 }, (_, index) => index);

export default function Loading() {
  return (
    <main className="min-h-screen bg-white px-4 pt-28 pb-20 sm:px-6 lg:px-8 ">
      <section className="mx-auto flex max-w-7xl flex-col items-center text-center">
        <div className="mb-6 h-8 w-36 animate-pulse rounded-full bg-[#FFF3EC]" />
        <div className="mb-4 h-12 w-full max-w-2xl animate-pulse rounded-2xl bg-gray-100 sm:h-16" />
        <div className="mb-10 h-5 w-full max-w-xl animate-pulse rounded-full bg-gray-100" />

        <div className="mb-14 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
          <div className="h-12 flex-1 animate-pulse rounded-full bg-[#FFE4D7]" />
          <div className="h-12 flex-1 animate-pulse rounded-full bg-gray-100" />
        </div>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {skeletonCards.map((card) => (
            <div
              key={card}
              className="min-h-[220px] animate-pulse rounded-[28px] border border-gray-100 bg-[#fffbf9] p-6 shadow-xs"
            >
              <div className="mb-6 h-10 w-10 rounded-xl bg-orange-100" />
              <div className="mb-3 h-5 w-2/3 rounded-full bg-gray-100" />
              <div className="mb-2 h-4 w-full rounded-full bg-gray-100" />
              <div className="h-4 w-4/5 rounded-full bg-gray-100" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
