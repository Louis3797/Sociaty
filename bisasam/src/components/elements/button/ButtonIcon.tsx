import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonIconProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  children: React.ReactNode;
  bgcolor: string;
  className?: string;
  size: "big" | "small";
};

const sizeClassnames = {
  big: "w-5.5 h-5.5",
  small: "w-5 h-5",
};

const ButtonIcon: React.FC<ButtonIconProps> = ({
  children,
  bgcolor,
  className,
  size,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`flex hover:${bgcolor} hover:bg-opacity-25  disabled:opacity-30 rounded-full items-center justify-center cursor-pointer focus:outline-none transition duration-200 ease-in-out  ${className} ${sizeClassnames[size]}`}
    >
      {children}
    </button>
  );
};

export default ButtonIcon;
