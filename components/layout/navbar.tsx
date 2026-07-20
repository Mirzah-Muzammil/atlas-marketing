"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "How it works", href: "#features" },
    { label: "Product", href: "#modules" },
    { label: "Services", href: "#industries" },
    { label: "Thrive", href: "#modules" },
    { label: "FAQs", href: "#faq" },
  ];

  return (
    <>
      {/* Outer Floating Wrapper */}
      <div
        data-aos="fade-down"
        data-aos-delay="300"
        className="fixed top-0 left-0 right-0 z-50 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4"
      >
        {/* Floating Capsule */}
        <div
          className={`w-full bg-white/50 backdrop-blur-md rounded-full px-6 py-2.5 flex items-center justify-between border border-orange-100/40 transition-all duration-300 ${
            isScrolled ? "shadow-md shadow-orange-500/5" : "shadow-xs"
          }`}
        >
          {/* Logo with script D */}
          <Link href="#" className="flex items-center gap-1 group">
            <span className="font-extrabold text-xl text-[#f97316] tracking-tight font-sans">
              GGI Atlas
            </span>
          </Link>

          {/* Desktop Navigation & CTA Row */}
          <div className="hidden lg:flex items-center justify-center gap-8">
            <nav className="flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-normal text-gray-650 hover:text-[#f97316] transition-colors tracking-tight"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <label
            htmlFor="demo-modal-toggle"
            className="bg-black text-white hidden lg:flex hover:bg-neutral-900 active:scale-[0.98] font-bold text-xs px-5 py-2.5 rounded-xl border border-transparent shadow-xs tracking-tight transition-all cursor-pointer select-none text-center block"
          >
            Get started
          </label>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 text-gray-600 hover:text-gray-900 focus:outline-none cursor-pointer rounded-full hover:bg-orange-50/50"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-20 right-4 z-45 w-64 bg-[#FEF5F0]/95 backdrop-blur-md border border-orange-100/40 p-6 rounded-2xl shadow-xl transition-all duration-300 lg:hidden ${
          isMobileMenuOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6">
          <nav className="flex flex-col gap-3.5">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-bold text-gray-700 hover:text-[#f97316] transition-colors py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-orange-100/40">
            <label
              htmlFor="demo-modal-toggle"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full bg-black text-white hover:bg-neutral-900 rounded-xl py-2.5 text-xs font-bold block text-center cursor-pointer select-none"
            >
              Get started
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
