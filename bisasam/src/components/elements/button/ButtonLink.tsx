import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonLinkProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  text: string;
  className?: string;
};

const ButtonLink: React.FC<ButtonLinkProps> = ({
  text,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`focus:outline-none text-primary-100 underline text-md ${className}`}
    >
      {text}
    </button>
  );
};

export default ButtonLink;
