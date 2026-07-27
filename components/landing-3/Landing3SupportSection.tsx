"use client";

const testimonials = [
  "Atlas helped me turn a confusing application into a clear plan.",
  "I always knew what to do next.",
  "Real answers, exactly when I needed them.",
  "The fastest, most thoughtful support throughout my move.",
  "It felt like having someone in my corner from day one.",
] as const;

export function Landing3SupportSection() {
  return (
    <section
      className="bg-[#050506] px-4 py-16 text-white"
      data-landing-3-support
    >
      <div data-support-panel>
        <div>
          <h3>Controlled by you. Supported by Atlas.</h3>
          <p>
            Your decisions stay yours. Atlas gives you the guidance, tools,
            and people to move forward with confidence.
          </p>
          <p>Real support, whenever you need it.</p>
        </div>

        <div data-support-visual>
          {testimonials.map((testimonial) => (
            <blockquote data-support-pill key={testimonial}>
              {testimonial}
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
