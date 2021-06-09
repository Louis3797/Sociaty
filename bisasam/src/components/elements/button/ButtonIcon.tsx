import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonIconProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  children: React.ReactNode;
  click: (event: React.MouseEvent<HTMLButtonElement>) => void;
  bgcolor: string;
  className?: string;
  size: "big" | "small";
  disabled?: boolean;
  disabledColor?: string;
};

const sizeClassnames = {
  big: "w-5.5 h-5.5",
  small: "w-5 h-5",
};

const ButtonIcon: React.FC<ButtonIconProps> = ({
  children,
  disabled,
  click,
  bgcolor,
  className,
  size,
}) => {
  return (
    <button
      disabled={disabled}
      className={`hover:${bgcolor} disabled:opacity-30 rounded-full items-center flex justify-center cursor-pointer focus:outline-none transition duration-200 ease-in-out  ${className} ${sizeClassnames[size]}`}
      onClick={click}
    >
      {children}
    </button>
  );
};

export default ButtonIcon;
