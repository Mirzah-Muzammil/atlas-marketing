"use client";

import { type HTMLAttributes, useEffect, useRef, useState } from "react";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "p";

interface Landing3AnimatedTitleProps
  extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingTag;
}

export default function Landing3AnimatedTitle({
  as: Tag = "h2",
  className = "",
  ...props
}: Landing3AnimatedTitleProps) {
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
      className={`landing-3-title-reveal ${className}`.trim()}
      data-landing-3-title-reveal={isVisible ? "visible" : "pending"}
    />
  );
}
