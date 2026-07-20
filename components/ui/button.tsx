import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={twMerge(
          clsx(
            "inline-flex items-center justify-center font-medium rounded-custom transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
            {
              // Variants
              "bg-primary text-white hover:bg-primary-hover shadow-sm shadow-orange-500/10 hover:shadow-md hover:shadow-orange-500/20 active:scale-[0.98]":
                variant === "primary",
              "bg-secondary text-secondary-foreground hover:bg-gray-200 active:scale-[0.98]":
                variant === "secondary",
              "bg-transparent border border-border text-foreground hover:bg-gray-50 active:scale-[0.98]":
                variant === "outline",
              "bg-transparent text-muted-foreground hover:text-foreground hover:bg-gray-100":
                variant === "ghost",

              // Sizes
              "text-xs px-3 py-1.5": size === "sm",
              "text-sm px-5 py-2.5": size === "md",
              "text-base px-6 py-3": size === "lg",
            }
          ),
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
