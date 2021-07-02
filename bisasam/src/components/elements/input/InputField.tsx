import React, { forwardRef, useEffect, useState } from "react";

export interface InputFieldProps
  extends React.ComponentPropsWithoutRef<"input"> {
  textarea?: boolean;
  error?: boolean;
  counter?: number;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  label?: string;
}
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { className, textarea, error, counter, handleChange, label, ...props },
    ref
  ) => {
    const [text, settext] = useState(
      props.value != null ? props.value.toString() : ""
    );

    const handleInputChange = (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      settext(event.currentTarget.value);
    };

    const ring =
      error || text.length > counter
        ? `ring-1 ring-error`
        : `ring-1 ring-primary-300`;
    const style = `w-full mb-2 text-primary-100 placeholder-primary-300 focus:outline-none bg-transparent`;

    return (
      <div
        className={`flex flex-col w-full rounded-8 bg-primary-800 px-2 relative ${ring} ${className} `}
      >
        <div className="flex flex-row bg-transparent justify-between items-center w-full my-1 relative">
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
              } font-medium text-sm top-0 right-0 absolute`}
            >
              {text.length}/{counter}
            </p>
          ) : null}
        </div>
        {textarea ? (
          <textarea
            className={`${style} resize-none mb-2`}
            ref={ref as any}
            {...(props as any)}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              handleInputChange(e);
              handleChange(e);
            }}
            placeholder={props.placeholder}
            rows={4}
            value={text}
          />
        ) : (
          <input
            type="text"
            className={style}
            ref={ref}
            {...props}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(e);
              handleChange(e);
            }}
            placeholder={props.placeholder}
            value={text}
          />
        )}
      </div>
    );
  }
);
