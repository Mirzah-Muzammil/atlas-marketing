const trustPoints = ["Built around the real student journey", "Application → arrival → beyond", "Technology with a human safety net"];

export function TrustStrip() {
  return (
    <section aria-label="Atlas principles" className="border-y border-border/70 bg-surface py-7">
      <div className="container-shell grid gap-5 text-center text-sm font-medium text-primary-deep/62 md:grid-cols-3 md:divide-x md:divide-border">
        {trustPoints.map((point) => <p key={point}>{point}</p>)}
      </div>
    </section>
  );
}
