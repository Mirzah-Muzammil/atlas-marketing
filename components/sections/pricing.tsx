"use client";

import React, {  useState } from "react";
import {
  Check,
  Rocket,
  Clock,
  Laptop,
  Users,
  Home,
  BarChart3,
  Accessibility,
} from "lucide-react";

interface DBPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  currency: string;
  isPopular: boolean;
  features: string[] | string;
  billing?: "monthly" | "annual";
  price?: number;
  originalPrice?: number;
  discountPercent?: number;
  pricePerMonth?: number;
}

interface PricingProps {
  monthlyPlans: DBPlan[];
  annualPlans: DBPlan[];
  onRequestDemo?: (plan?: string) => void;
}

function parsePlanFeatures(features: string[] | string): string[] {
  if (Array.isArray(features)) {
    return features;
  }

  try {
    const parsedFeatures: unknown = JSON.parse(features);
    return Array.isArray(parsedFeatures)
      ? parsedFeatures.filter((feature): feature is string => typeof feature === "string")
      : [features];
  } catch {
    return [features];
  }
}

export default function Pricing({ monthlyPlans, annualPlans }: PricingProps) {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  
  const plans = billing === "monthly" ? monthlyPlans : annualPlans;

  const normalizedPlans = plans.map((plan) => ({
    ...plan,
    billing: plan.billing ?? billing,
    price: plan.price ?? plan.monthlyPrice,
    features: parsePlanFeatures(plan.features),
  }));

  const advantageChips = [
    { icon: Rocket, label: "Grows with you" },
    { icon: Clock, label: "Save time" },
    { icon: Laptop, label: "1-month free trial" },
    { icon: Accessibility, label: "Work on the go" },
    { icon: Users, label: "Better Teamwork & Collaboration" },
    { icon: Home, label: "Stay compliant" },
    { icon: BarChart3, label: "Keep Finances on Track" },
  ];

  const hasPlans = monthlyPlans && monthlyPlans.length > 0;

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3" data-aos="fade-up">
          <span className="text-sm font-semibold text-[#FF5E1A] tracking-wider uppercase block">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight leading-tight">
            Find the Right Plan for You
          </h2>
          
          {/* Pills Toggle */}
          <div className="pt-6 flex flex-col items-center space-y-2">
            <div className="bg-[#EAEAEA] p-1 rounded-2xl flex items-center shadow-xs">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-6 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  billing === "monthly"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("annual")}
                className={`px-6 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  billing === "annual"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Annual
              </button>
            </div>
            <span className="text-xs text-[#FF5E1A] font-semibold">
              -15% off on annual payments
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        {!hasPlans ? (
          <div className="text-center py-16 bg-white rounded-custom border border-gray-150/80 shadow-xs max-w-lg mx-auto p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-1">No plans found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto mt-12">
            {normalizedPlans.map((plan, idx) => {
              const displayPrice =
                plan.billing === "annual"
                  ? plan.pricePerMonth ?? plan.price
                  : plan.price;
              const isPopular = plan.id === "pro"; // Pro Plan is the styled highlight center card

              return (
                <div
                  key={plan.id}
                  className={`rounded-[32px] relative flex flex-col justify-between transition-all duration-300 p-8 shadow-xs ${
                    isPopular
                      ? "border-[4px] border-[#FF5E1A] bg-[#FFF5F1] pt-14 pb-8 shadow-md"
                      : "border border-gray-200/80 bg-white hover:shadow-md hover:border-gray-300"
                  }`}
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  {/* Top Popular Highlight Bar */}
                  {isPopular && (
                    <div className="bg-[#FF5E1A] text-white text-[10px] font-black uppercase tracking-widest text-center py-2 w-full absolute top-0 left-0 rounded-t-[24px]">
                      Most Popular Plan
                    </div>
                  )}

                  {/* Header Meta */}
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-1.5">
                        {plan.name}
                        {plan.id === "pro" && <span className="text-lg">⚡</span>}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed min-h-[40px]">
                        {plan.tagline}
                      </p>
                    </div>

                    {/* Price Block */}
                    <div className="pb-6 border-b border-gray-100/80">
                      <div className="flex items-baseline text-gray-900">
                        <span className="text-2xl font-bold text-gray-900 mr-0.5">₹</span>
                        <span className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900">
                          {displayPrice?.toLocaleString("en-IN")}
                        </span>
                        <span className="ml-1.5 text-sm font-semibold text-gray-700">/per user</span>
                      </div>
                      
                      {plan.billing === "annual" && (
                        <div className="mt-2 space-y-1">
                          <span className="text-xs text-gray-400 block font-medium">
                            Billed annually (₹{plan.price?.toLocaleString("en-IN")}/yr)
                          </span>
                          <span className="text-[10px] inline-block font-bold text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-md">
                            Saved {plan.discountPercent ?? 15}% on annual subscription
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Features checklist list */}
                    <ul className="space-y-4 pt-2">
                      {plan.features.map((feature, idx) => {
                        // First feature of Pro and Enterprise plan has orange check mark icon
                        const isOrangeCheck = (plan.id === "pro" || plan.id === "enterprise") && idx === 0;

                        return (
                          <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                            <Check
                              className={`w-4.5 h-4.5 flex-shrink-0 mt-0.5 ${
                                isOrangeCheck ? "text-[#FF5E1A] stroke-[3]" : "text-gray-400 stroke-[2]"
                              }`}
                            />
                            <span className={`leading-snug ${isOrangeCheck ? "font-semibold text-gray-900" : ""}`}>
                              {feature}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* CTA button (actions not needed as per request) */}
                  <div className="pt-8 space-y-2.5">
                    <button className="bg-[#111827] text-white py-3 rounded-xl font-bold w-full text-center hover:bg-gray-800 transition-colors cursor-pointer text-sm">
                      Select plan
                    </button>
                    {plan.id === "pro" && (
                      <span className="text-xs text-gray-500 font-semibold block text-center">
                        or contact sales
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Experience the Dooyt Advantage Chips */}
        <div className="pt-24 space-y-8" id="benefits" data-aos="fade-up">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest text-center">
            Experience the Dooyt Advantage
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {advantageChips.map((chip, idx) => {
              const IconComp = chip.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FFF5F1] px-5 py-2.5 rounded-full flex items-center gap-2 text-xs font-bold text-gray-700 shadow-2xs hover:bg-[#FBECE6] transition-colors cursor-default"
                >
                  <IconComp className="w-4 h-4 text-[#FF5E1A] stroke-[2.5]" />
                  {chip.label}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
