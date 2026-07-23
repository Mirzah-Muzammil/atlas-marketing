"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { type ReactNode, useState } from "react";

import { cn } from "@/utils/cn";

const Skiper53 = () => {
  const images = [
    {
      src: "/images/x.com/13.jpeg",
      alt: "Illustrations by my fav AarzooAly",
      code: "# 23",
    },
    {
      src: "/images/x.com/9.jpeg",
      alt: "Illustrations by ©AarzooAly",
      code: "# 23",
    },
    {
      src: "/images/x.com/20.jpeg",
      alt: "Illustrations by ©AarzooAly",
      code: "# 23",
    },
    {
      src: "/images/x.com/21.jpeg",
      alt: "Illustrations by ©AarzooAly",
      code: "# 23",
    },
    {
      src: "/images/x.com/25.jpeg",
      alt: "Illustrations by ©AarzooAly",
      code: "# 23",
    },

    {
      src: "/images/x.com/32.jpeg",
      alt: "Illustrations by ©AarzooAly",
      code: "# 23",
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-[#f5f4f3]">
      <HoverExpand_002 className="" images={images} />
    </div>
  );
};

export { Skiper53 };

const HoverExpand_002 = ({
  images,
  className,
  activeIndex,
  onActiveIndexChange,
  renderPanel,
}: {
  images: { src: string; alt: string; code: string }[];
  className?: string;
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  renderPanel?: (
    image: { src: string; alt: string; code: string },
    index: number,
    active: boolean,
  ) => ReactNode;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const resolvedIndex = activeIndex ?? hoveredIndex;

  const selectPanel = (index: number) => {
    if (activeIndex === undefined) setHoveredIndex(index);
    onActiveIndexChange?.(index);
  };

  return (
    <motion.div
      className={cn("skiper53 relative w-full", className)}
    >
      <motion.div
        className="w-full"
      >
        <div className="skiper53__list flex w-full flex-col items-center justify-center gap-1">
          {images.map((image, index) => (
            <motion.div
              key={`${image.src}-${index}`}
              className="skiper53__panel group relative cursor-pointer overflow-hidden rounded-3xl"
              initial={false}
              animate={{
                height: resolvedIndex === index ? "24rem" : "2.5rem",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={() => selectPanel(index)}
              onHoverStart={() => selectPanel(index)}
            >
              <AnimatePresence>
                {resolvedIndex === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute z-[1] h-full w-full bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {resolvedIndex === index && !renderPanel && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute flex h-full w-full flex-col items-end justify-end px-4 pb-5"
                  >
                    <p className="text-left text-xs text-white/50">
                      {image.code}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              <Image
                src={image.src}
                className="skiper53__image absolute inset-0 size-full object-cover"
                alt={image.alt}
                fill
                sizes="100vw"
              />
              {renderPanel?.(image, index, resolvedIndex === index)}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export { HoverExpand_002 };

/**
 * Skiper 53 HoverExpand_002 — React + Framer Motion
 * Illustrations by AarzooAly - https://x.com/AarzooAly
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.me
 * Twitter: https://x.com/Gur__vi
 */
