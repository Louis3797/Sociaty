import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonLinkProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  text: string;
  click: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
  className?: string;
};

const ButtonLink: React.FC<ButtonLinkProps> = ({
  text,
  click,
  disabled,
  className,
}) => {
  return (
    <button
      disabled={disabled}
      className={`focus:outline-none text-primary-100 underline text-md ${className}`}
      onClick={click}
    >
      {text}
    </button>
  );
};

export default ButtonLink;
