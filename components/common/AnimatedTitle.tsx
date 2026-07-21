"use client";

import { type HTMLAttributes, useEffect, useRef, useState } from "react";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "p";

interface AnimatedTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingTag;
}

export default function AnimatedTitle({
  as: Tag = "h2",
  className = "",
  ...props
}: AnimatedTitleProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const title = titleRef.current;

    if (!title || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.15 },
    );

    observer.observe(title);

    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={titleRef}
      {...props}
      className={`atlas-title-reveal ${className}`.trim()}
      data-title-reveal={isVisible ? "visible" : "pending"}
    />
  );
}
