"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import { cn } from "@/utils/cn";

export interface HoverExpandImage {
  src: string;
  alt: string;
  code: string;
  title: string;
  description: string;
}

interface HoverExpandProps {
  images: HoverExpandImage[];
  className?: string;
}

const Skiper52 = ({ images, className }: HoverExpandProps) => {
  return (
    <div
      className="flex w-full items-center justify-center overflow-hidden bg-white"
      data-product-expand-gallery
    >
      <HoverExpand_001 className={className} images={images} />
    </div>
  );
};

const HoverExpand_001 = ({ images, className }: HoverExpandProps) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <motion.div
      animate={{ opacity: 1, translateY: 0 }}
      className={cn("relative w-full max-w-7xl", className)}
      initial={{ opacity: 0, translateY: 28 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="flex w-full items-stretch gap-2 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:justify-center sm:gap-2.5 sm:overflow-visible sm:px-0 sm:pb-0"
        data-product-track
      >
        {images.map((image, index) => {
          const isActive = activeImage === index;

          return (
            <motion.article
              animate={{
                width: isActive ? "24rem" : "4.75rem",
              }}
              aria-label={`${image.title}: ${image.description}`}
              className="group relative h-[30rem] shrink-0 cursor-pointer overflow-hidden rounded-[1.75rem] bg-gray-100 outline-none ring-offset-4 focus-visible:ring-2 focus-visible:ring-[#FF5E1A] sm:h-[34rem]"
              data-active={isActive}
              data-product-panel
              initial={false}
              key={image.title}
              onClick={() => setActiveImage(index)}
              onFocus={() => setActiveImage(index)}
              onHoverStart={() => setActiveImage(index)}
              tabIndex={0}
              transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                alt={image.alt}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                fill
                sizes="(max-width: 640px) 384px, 384px"
                src={image.src}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/5" />

              <motion.div
                animate={{ opacity: isActive ? 1 : 0 }}
                className="absolute inset-x-0 bottom-0 min-w-[22rem] p-6 text-left text-white sm:p-7"
                transition={{ duration: 0.25, delay: isActive ? 0.16 : 0 }}
              >
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/60">
                  {image.code}
                </p>
                <h3 className="mt-3 text-3xl font-semibold leading-none tracking-[-0.04em]">
                  {image.title}
                </h3>
                <p className="mt-4 max-w-xs text-sm leading-6 text-white/70">
                  {image.description}
                </p>
              </motion.div>

              <motion.span
                animate={{ opacity: isActive ? 0 : 1 }}
                aria-hidden="true"
                className="absolute inset-x-0 bottom-8 mx-auto text-center text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white [writing-mode:vertical-rl]"
                transition={{ duration: 0.2 }}
              >
                {image.title}
              </motion.span>
            </motion.article>
          );
        })}
      </div>
    </motion.div>
  );
};

export { HoverExpand_001, Skiper52 };

/**
 * Adapted from Skiper UI 52 (ExpandOnHover).
 * Original component: https://skiper-ui.com/v1/skiper52
 */
