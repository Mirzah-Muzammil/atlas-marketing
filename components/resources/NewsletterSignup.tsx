"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

import HomepageAnimatedTitle from "@/components/homepage/HomepageAnimatedTitle";

export function NewsletterSignup() {
  const [submitted, setSubmitted] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="border-y border-white/[.1] px-5 py-24 sm:px-8 sm:py-32" id="newsletter">
      <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[24px] border border-white/[.14] bg-[#0b0c0e] shadow-[0_30px_90px_rgba(0,0,0,.34)]">
        <div className="grid lg:grid-cols-[.95fr_1.05fr]">
          <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
            <HomepageAnimatedTitle as="h2" className="max-w-[720px] text-balance text-[clamp(3rem,5vw,5.35rem)] font-semibold leading-[.9] tracking-[-.07em]">
              The journey, <span className="text-[#f35a02]">one Tuesday at a time.</span>
            </HomepageAnimatedTitle>
            <p className="mt-7 max-w-[650px] text-base leading-7 text-white/56">
              The new guides we publish, deadlines you should know about, scholarships closing soon. One email per week, and we genuinely treat unsubscribes as feedback, not as drop-off to A/B test.
            </p>
            <div className="mt-10">
              {submitted ? (
              <div className="border-y border-white/[.14] py-8" role="status">
                <p className="text-2xl font-medium tracking-[-.035em] text-white">You are on the list.</p>
                <p className="mt-3 text-sm text-white/45">The next useful Tuesday email will find you.</p>
              </div>
            ) : (
              <form aria-label="Subscribe to Atlas resources" className="flex flex-col gap-3 sm:flex-row" onSubmit={submit}>
                <label className="sr-only" htmlFor="atlas-resource-email">Email address</label>
                <input
                  className="min-h-14 min-w-0 flex-1 border border-white/[.14] bg-white/[.035] px-5 text-base text-white outline-none transition-colors placeholder:text-white/28 focus:border-[#f35a02]"
                  id="atlas-resource-email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  type="email"
                />
                <button className="min-h-14 bg-[#f35a02] px-7 text-sm font-semibold text-white transition-[background-color,transform] hover:bg-[#ff7026] active:scale-[.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#f35a02]" type="submit">Subscribe</button>
              </form>
              )}
              <p className="mt-4 font-mono text-[10px] uppercase leading-5 tracking-[.12em] text-white/32">No spam · Unsubscribe in one click · Read by 14,000+ students</p>
            </div>
          </div>

          <figure className="relative min-h-[420px] overflow-hidden border-t border-white/[.1] lg:min-h-[610px] lg:border-l lg:border-t-0">
            <Image
              alt="Indian students planning their UK move"
              className="object-cover object-center"
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              src="/images/atlas-newsletter-students.jpg"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,6,.08),rgba(5,5,6,.2)_55%,rgba(5,5,6,.86))]" />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/[.18] bg-black/58 p-5 shadow-[0_20px_50px_rgba(0,0,0,.34)] backdrop-blur-md sm:inset-x-7 sm:bottom-7 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[9px] uppercase tracking-[.16em] text-[#ff8b4c]">Tuesday dispatch · 07:30 IST</p>
                <span className="rounded-full border border-white/[.16] px-2.5 py-1 text-[9px] text-white/54">Issue 38</span>
              </div>
              <p className="mt-4 max-w-[34rem] text-xl font-medium leading-tight tracking-[-.035em] text-white sm:text-2xl">The five visa dates worth putting in your calendar this week.</p>
              <figcaption className="mt-4 text-[10px] text-white/45">Photo by Kiran Pokuri Photography on Pexels</figcaption>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
