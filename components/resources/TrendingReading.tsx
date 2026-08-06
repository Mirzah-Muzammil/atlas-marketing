const trendingReads = [
  {
    category: "Visa",
    title: "UK student visa: every document, every deadline.",
    readTime: "8 min read",
    date: "Apr 2026",
  },
  {
    category: "Financial aid",
    title: "10 fully-funded scholarships for international students.",
    readTime: "6 min read",
    date: "Mar 2026",
  },
  {
    category: "Settlement",
    title: "First 7 days in London: the only checklist you need.",
    readTime: "5 min read",
    date: "Apr 2026",
  },
  {
    category: "Career",
    title: "Graduate Route visa: which jobs actually count.",
    readTime: "7 min read",
    date: "Mar 2026",
  },
];

export function TrendingReading() {
  return (
    <section className="border-t border-white/[.1] px-5 py-24 sm:px-8 sm:py-32" id="trending-reading">
      <div className="mx-auto max-w-[1160px]">
        <header className="flex flex-col gap-6 border-b border-white/[.1] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[680px]">
            <h2 className="text-balance text-[clamp(2.2rem,3.8vw,4rem)] font-semibold leading-[.96] tracking-[-.06em] text-white">
              What 14,000+ students are{" "}
              <span className="text-[#f35a02]">actually reading.</span>
            </h2>
          </div>
          <p className="text-sm text-white/45 sm:pb-1">April 2026</p>
        </header>

        <div
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          data-testid="trending-reading-grid"
        >
          {trendingReads.map((article) => (
            <article
              className="group rounded-2xl border border-white/[.14] bg-[#111214] p-5 shadow-[0_12px_40px_rgba(0,0,0,.18)] transition duration-300 hover:-translate-y-1 hover:border-white/[.28] hover:bg-[#151619]"
              key={article.title}
            >
              <div className="flex items-center gap-2 text-sm leading-tight">
                <p className="font-semibold text-white">Atlas resources</p>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/35" />
                <p className="text-white/45">{article.category}</p>
              </div>

              <h3 className="mt-5 text-pretty text-[1.08rem] font-normal leading-[1.42] tracking-[-.02em] text-white">
                {article.title}
              </h3>

              <div className="mt-6 flex items-center gap-2 border-t border-white/[.1] pt-4 text-sm text-white/45">
                <span>{article.readTime}</span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/35" />
                <span>{article.date}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
