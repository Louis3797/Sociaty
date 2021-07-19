import { DetailedHTMLProps, HTMLAttributes } from "react";

type DropdownItemProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  text: string;
  icon: React.ReactNode;
  textColor?: string;
  className?: string;
};

const DropdownItem: React.FC<DropdownItemProps> = ({
  text,
  icon,
  textColor,
  className,
  ...props
}) => {
  return (
    <div
      className={`flex justify-start items-center w-24 h-full p-2 bg-transparent hover:bg-primary-300 ${textColor} ${className}`}
      {...props}
    >
      {icon}
      <p className={`text-base font-normal text-button ml-2 ${textColor}`}>
        {text}
      </p>
    </div>
  );
};

export default DropdownItem;
