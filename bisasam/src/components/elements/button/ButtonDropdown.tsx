import { Children, useEffect, useRef, useState } from "react";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonDropdownProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  icon?: React.ReactNode;
  variant: "primary" | "secondary" | "transparent";
  className?: string;
  size: "big" | "small";
};

const sizeClassnames = {
  big: "px-2 py-1 text-sm rounded-full",
  small: "px-1 py-1 text-sm rounded-full",
};

const colorClassnames = {
  primary:
    "text-button bg-accent  hover:bg-secondary hover:bg-opacity-25 transition duration-200 ease-in-out hover:bg-accent-hover disabled:bg-accent-disabled",
  secondary:
    " hover:bg-secondary hover:bg-opacity-25 text-button bg-primary-600 transition duration-200 ease-in-out hover:bg-primary-300 disabled:bg-primary-200",
  transparent:
    "text-button bg-transparent transition duration-200 ease-in-out  hover:bg-secondary hover:bg-opacity-25 ",
};

const ButtonDropdown: React.FC<ButtonDropdownProps> = ({
  children,
  icon,
  variant,
  className,
  size,
  ...props
}) => {
  const [visible, setvisible] = useState(false);

  return (
    <DropdownWrapper>
      <button
        {...props}
        onClick={() => setvisible(!visible)}
        className={`${colorClassnames[variant]} font-bold cursor-pointer focus:outline-none  ${className} ${sizeClassnames[size]}`}
      >
        {icon}
      </button>
      {visible && (
        <DropdownItemWrapper close={() => setvisible(false)}>
          {children}
        </DropdownItemWrapper>
      )}
    </DropdownWrapper>
  );
};

export default ButtonDropdown;

export const DropdownWrapper: React.FC = ({ children }) => {
  return <div className="relative inline-block">{children}</div>;
};

interface DropdownWrapperProps {
  close: () => void;
}

export const DropdownItemWrapper: React.FC<DropdownWrapperProps> = ({
  children,
  close,
}) => {
  const wrapperRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      // @ts-ignore
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        close();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [close, wrapperRef]);
  return (
    <div
      ref={wrapperRef}
      className="flex flex-col h-auto absolute bg-primary-600 w-24 z-10 right-5 top-0 rounded-5 transition duration-1000 ease-in-out ring-1 ring-primary-300"
    >
      {children}
    </div>
  );
};
