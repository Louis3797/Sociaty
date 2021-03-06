import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  text: string;
  variant: "primary" | "secondary" | "white";
  className?: string;
  size: "big" | "small";
};

const sizeClassnames = {
  big: "px-2 py-1 text-sm rounded-md",
  small: "px-1 text-sm rounded-5",
};

const colorClassnames = {
  primary:
    "text-button bg-accent transition duration-200 ease-in-out hover:bg-accent-hover disabled:bg-accent-disabled",
  secondary:
    "text-button bg-primary-600 transition duration-200 ease-in-out hover:bg-primary-300 disabled:bg-primary-200",

  white:
    "text-primary-800 bg-button transition duration-200 ease-in-out hover:bg-primary-200 disabled:bg-primary-100",
};

const Button: React.FC<ButtonProps> = ({
  text,
  variant,
  className,
  size,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${colorClassnames[variant]} font-bold cursor-pointer focus:outline-none  ${className} ${sizeClassnames[size]}`}
    >
      {text}
    </button>
  );
};

export default Button;
