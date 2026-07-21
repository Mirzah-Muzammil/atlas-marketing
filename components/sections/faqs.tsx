"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import AnimatedTitle from "@/components/common/AnimatedTitle";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

interface FaqsProps {
  faqs: FAQ[];
}

export default function Faqs({ faqs }: FaqsProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white relative"
    >
      <div className="mb-10 text-left w-full">
        <AnimatedTitle
          as="h2"
          className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight"
        >
          Real questions. The honest answers.
        </AnimatedTitle>
      </div>
      {!faqs || faqs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-custom border border-gray-150/80 shadow-xs max-w-lg mx-auto p-8">
          <AnimatedTitle
            as="h3"
            className="text-lg font-bold text-gray-900 mb-1"
          >
            The honest answers.
          </AnimatedTitle>
        </div>
      ) : (
        <div className="space-y-4 w-full">
          {faqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-[#F9FAFB] transition-all duration-200 overflow-hidden"
                // data-aos="fade-up"
                // data-aos-delay={idx * 50}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left px-8 py-6 font-semibold text-gray-900 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base md:text-[18px] font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#111827] flex items-center justify-center text-white flex-shrink-0 transition-transform duration-200">
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5 text-white stroke-[3]" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-white stroke-[3]" />
                    )}
                  </div>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="px-8 pb-6 text-sm sm:text-base text-gray-500 leading-relaxed max-w-[85%]">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
