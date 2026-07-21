"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Users,
  CheckSquare,
  UserCog,
  Kanban,
  Calculator,
  ShoppingCart,
  Megaphone,
  Boxes,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import AnimatedTitle from "@/components/common/AnimatedTitle";

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  "check-square": CheckSquare,
  "user-cog": UserCog,
  kanban: Kanban,
  calculator: Calculator,
  "shopping-cart": ShoppingCart,
  megaphone: Megaphone,
  boxes: Boxes,
};

interface Module {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
}

interface ModulesProps {
  modules: Module[];
}

export default function Modules({ modules }: ModulesProps) {
  const [activeId, setActiveId] = useState<string>(
    () => modules?.[0]?.id || "crm",
  );
  const [search, setSearch] = useState<string>("");

  const filteredModules = (modules || []).filter(
    (mod) =>
      mod.name.toLowerCase().includes(search.toLowerCase()) ||
      mod.description.toLowerCase().includes(search.toLowerCase()),
  );

  const activeModule =
    filteredModules.find((m) => m.id === activeId) || filteredModules[0];

  return (
    <section id="modules" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center flex flex-col items-center justify-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest block">
            The product
          </span>
          <AnimatedTitle
            as="h2"
            className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight leading-tight"
          >
            A real product. Not a brochure.
          </AnimatedTitle>
        </div>

        {/* Dynamic content rendering */}
        {filteredModules.length === 0 ? (
          // Empty State
          <div className="text-center py-16 bg-white rounded-custom border border-gray-150/80 shadow-xs max-w-lg mx-auto p-8">
            <AnimatedTitle as="h3" className="text-lg font-bold text-gray-900">
              {search ? `“${search}”` : "A real product. Not a brochure."}
            </AnimatedTitle>
          </div>
        ) : (
          // Layout
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Interactive Module Tabs (Arranged to wrap, centered) */}
            <div
              className="flex flex-wrap justify-center gap-3.5 max-w-5xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {filteredModules.map((mod) => {
                const IconComp = iconMap[mod.icon] || HelpCircle;
                const isActive = activeId === mod.id;

                return (
                  <button
                    key={mod.id}
                    onClick={() => setActiveId(mod.id)}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold tracking-tight border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-white/50 backdrop-blur-md rounded-full text-black border-transparent shadow-md shadow-orange-500/10"
                        : "bg-white/50 backdrop-blur-md text-gray-700 border-gray-200/80 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <IconComp
                      className={`w-4 h-4 ${isActive ? "text-black" : "text-gray-500"}`}
                    />
                    {mod.name}
                  </button>
                );
              })}
            </div>

            {/* Active Content Showcase Box */}
            {activeModule && (
              <div className="bg-[#FFF8F5]/50 backdrop-blur-md border border-orange-100/30 rounded-[24px] p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 shadow-xs transition-all duration-500">
                {/* Left: Product image */}
                <div
                  className=" flex justify-end items-end w-full max-w-xl relative rounded-xl overflow-hidden border border-orange-100/20 shadow-md bg-white"
                  data-aos="fade-right"
                  data-aos-delay="100"
                >
                  <Image
                    src="/images/normal/product-planning.jpg"
                    alt="International students planning together on campus"
                    width={1400}
                    height={900}
                    className="w-full h-auto object-contain block"
                  />
                </div>

                {/* Right: Description details */}
                <div
                  className="flex-1 space-y-4 text-left"
                  data-aos="fade-left"
                  data-aos-delay="100"
                >
                  <AnimatedTitle
                    as="h3"
                    className="text-3xl font-black text-gray-900 font-semibold tracking-tight font-sans"
                  >
                    {activeModule.name}
                  </AnimatedTitle>
                  <p className="text-base text-gray-500 leading-relaxed font-sans">
                    {activeModule.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
