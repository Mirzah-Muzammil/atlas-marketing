"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (testimonials.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    if (testimonials.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className=" pt-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3" data-aos="fade-up">
          <span className="text-sm font-semibold text-[#FF5E1A] tracking-wider uppercase block">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight leading-tight">
            Proven Results. Real Feedback.
          </h2>
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
            Here’s what our customers experienced.
          </p>
        </div>

        {/* Dynamic testimonial check */}
        {!testimonials || testimonials.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-custom border border-gray-150/80 shadow-xs max-w-lg mx-auto p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-1">No Testimonials Found</h3>
          </div>
        ) : (
          <>
            {/* 1. Desktop & Tablet Layout (Static 3-Column Grid) */}
            <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
              {testimonials.slice(0, 3).map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-150/70 rounded-[24px] p-8 flex flex-col justify-between shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-1 h-full space-y-6"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  <div className="space-y-4">
                    {/* Rating Stars and Score */}
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 fill-current ${
                              i < Math.floor(item.rating) ? "text-amber-500" : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-gray-700 ml-1">
                        {item.rating.toFixed(1)}
                      </span>
                    </div>

                    {/* Testimonial Quote */}
                    <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-normal">
                      {item.quote}
                    </p>
                  </div>

                  {/* Customer Details Avatar/Name/Role */}
                  <div className="flex items-center gap-3.5 pt-4 border-t border-gray-50">
                    <div className="w-10 h-10 rounded-full bg-orange-100 text-primary flex items-center justify-center font-bold text-sm">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-gray-900">{item.name}</span>
                      <span className="block text-xs text-gray-500">{item.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 2. Mobile Layout (Carousel with Navigation Arrows) */}
            <div className="block md:hidden max-w-sm mx-auto space-y-6" data-aos="fade-up">
              {/* Active Slide Card */}
              {testimonials[activeIndex] && (
                <div className="bg-white border border-gray-150/70 rounded-[24px] p-8 flex flex-col justify-between shadow-sm min-h-[260px] space-y-6">
                  <div className="space-y-4">
                    {/* Rating Stars and Score */}
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 fill-current ${
                              i < Math.floor(testimonials[activeIndex].rating)
                                ? "text-amber-500"
                                : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-gray-700 ml-1">
                        {testimonials[activeIndex].rating.toFixed(1)}
                      </span>
                    </div>

                    {/* Testimonial Quote */}
                    <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-normal italic">
                      &ldquo;{testimonials[activeIndex].quote}&rdquo;
                    </p>
                  </div>

                  {/* Customer Details Avatar/Name/Role */}
                  <div className="flex items-center gap-3.5 pt-4 border-t border-gray-50">
                    <div className="w-10 h-10 rounded-full bg-orange-100 text-primary flex items-center justify-center font-bold text-sm">
                      {testimonials[activeIndex].name.charAt(0)}
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-gray-900">
                        {testimonials[activeIndex].name}
                      </span>
                      <span className="block text-xs text-gray-500">
                        {testimonials[activeIndex].role}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Controls: Arrows and Dots */}
              <div className="flex items-center justify-between px-2">
                {/* Pagination Dots */}
                <div className="flex gap-1.5">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                        idx === activeIndex ? "bg-primary w-5" : "bg-gray-250"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Arrow Controls */}
                <div className="flex gap-2">
                  <button
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all text-gray-600 cursor-pointer"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all text-gray-600 cursor-pointer"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

      </div>
    </section>
  );
}
