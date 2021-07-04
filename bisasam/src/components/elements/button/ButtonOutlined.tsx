import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonOutlined = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  text: string;
  variant: "primary" | "secondary";
  className?: string;
  size: "big" | "small";
};

const sizeClassnames = {
  big: "px-2 py-1 text-sm rounded-md",
  small: "px-1 text-sm rounded-5",
};

const colorClassnames = {
  primary:
    "text-button bg-transparent ring-accent ring-1 transition duration-200 ease-in-out hover:ring-accent-hover disabled:ring-accent-disabled",
  secondary:
    "text-button bg-transparent ring-secondary ring-1 transition duration-200 ease-in-out hover:ring-secondary-600 disabled:ring-primary-300",
};

const ButtonOutlined: React.FC<ButtonOutlined> = ({
  text,
  variant,
  className,
  size,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${colorClassnames[variant]} font-bold cursor-pointer focus:outline-none ${className} ${sizeClassnames[size]}`}
    >
      {text}
    </button>
  );
};

export default ButtonOutlined;
