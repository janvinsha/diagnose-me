import clsx from "clsx";
import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import React, { forwardRef } from "react";

import Loader from "./Loader";

export type ButtonVariants = "primary" | "secondary" | "danger" | "material";

interface Props
  extends DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
  > {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: ButtonVariants;
  loading?: boolean;
  children?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    className = "",
    size = "md",
    variant = "primary",
    loading,
    children,
    icon,
    ...rest
  },
  ref
) {
  return (
    <button
      ref={ref}
      className={clsx(
        "relative inline-block disabled:opacity-50 rounded-lg md:rounded-xl group",
        {
          "px-4 py-1.5 text-xs": size === "sm",
          "px-5 md:py-2 py-1.5 text-sm": size === "md",
          "px-6 py-3 text-base": size === "lg",
          "px-8 py-4 text-lg": size === "xl",
        },
        className
      )}
      disabled={loading}
      {...rest}
    >
      <span
        className={clsx(
          "absolute focus:outline-none inset-0 w-full h-full transition duration-200 ease-in-out transform rounded-md md:rounded-md",
          {
            "border border-[#4a2765]": variant === "primary",
            "bg-transparent": variant === "secondary",
            "bg-opacity-25 dark:group-hover:bg-indigo-900 group-hover:bg-indigo-100 !transition-none":
              variant === "material",
            "border-red-500 border": variant === "danger",
            "group-hover:translate-x-0.5 group-hover:translate-y-0.5":
              !rest.disabled && variant !== "material",
          }
        )}
      />
      <span
        className={clsx("absolute inset-0 w-full h-full rounded-md", {
          "bg-[#4a2765] border border-[#4a2765] md:rounded-md":
            variant === "primary",
          "bg-transparent md:rounded-md": variant === "secondary",
          "bg-red-500 border border-red-500 md:rounded-md":
            variant === "danger",
          "md:rounded-md": size === "sm",
        })}
      />
      <span
        className={clsx("relative flex items-center justify-center space-x-2", {
          "text-white": variant !== "secondary" && variant !== "material",
        })}
      >
        {icon}
        {loading && <Loader size="sm" />}
        <span
          className={clsx("whitespace-nowrap", {
            "font-medium": variant !== "secondary",
          })}
        >
          {children}
        </span>
      </span>
    </button>
  );
});

export default Button;
