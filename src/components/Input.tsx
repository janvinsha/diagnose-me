import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import React, { forwardRef, useId } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  className?: string;
  validationError?: string;
}
const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, type = "text", validationError, className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <label className="w-full" htmlFor={id}>
      {label && (
        <div className="flex items-center mb-1 space-x-1.5">
          <div className="text-[11px] font-semibold uppercase opacity-70">
            {label}
          </div>
        </div>
      )}
      <div className="flex">
        <input
          id={id}
          className={clsx(
            {
              "focus:ring-[#36152D]": !validationError?.length,
              "!border-red-500": validationError?.length,
            },
            "bg-[#D9D9D9] rounded-md text-sm px-2.5 py-2  outline-none disabled:opacity-60 disabled:bg-gray-500 disabled:bg-opacity-20 w-full",
            className
          )}
          ref={ref}
          type={type}
          {...props}
        />
      </div>
      {validationError && (
        <div className="mx-1 mt-1 text-xs font-medium text-red-500">
          {validationError}
        </div>
      )}
    </label>
  );
});
export default Input;
