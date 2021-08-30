import React, { forwardRef, useEffect, useState } from "react";
import { Input } from "./Input";

export const InputField: React.FC<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & {
    name: string;
    counter?: number;
    label?: string;
    textarea?: boolean;
    rows?: number;
  }
> = ({ label, textarea, counter, rows, ref: _, className, ...props }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(props.value ? props.value.toString() : "");
  }, [props.value]);

  const ring =
    text.length > counter ? `ring-1 ring-error` : `ring-1 ring-primary-300`;
  return (
    <div
      className={`flex flex-col w-full rounded-8 bg-primary-800 px-2 pb-2 relative ${ring} ${className} `}
    >
      <div className="flex flex-row bg-transparent justify-between items-center w-full my-1">
        {label ? (
          <p className="text-button text-opacity-50 font-medium text-sm">
            {label}
          </p>
        ) : null}
        {counter ? (
          <p
            className={`${
              text.length > counter
                ? "text-error"
                : "text-button text-opacity-50"
            } font-medium text-sm top-0 right-0`}
          >
            {text.length}/{counter}
          </p>
        ) : null}
      </div>
      <Input textarea={textarea} rows={rows} {...props} />
    </div>
  );
};
