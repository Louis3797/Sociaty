import React, { forwardRef, useEffect, useState } from "react";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  textarea?: boolean;
  rows?: number;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, textarea, rows, ...props }, ref) => {
    const style = `w-full text-primary-100 placeholder-primary-200 focus:outline-none bg-transparent`;

    return textarea ? (
      <textarea
        className={`${style} resize-none mb-2`}
        ref={ref as any}
        {...(props as any)}
        rows={rows}
      />
    ) : (
      <input
        type="text"
        className={`${style} ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
