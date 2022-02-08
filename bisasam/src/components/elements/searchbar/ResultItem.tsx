import React, { DetailedHTMLProps, HTMLAttributes } from "react";

type ResultItemProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  text: string;
  className?: string;
};

const ResultItem: React.FC<ResultItemProps> = ({
  text,
  className,
  ...props
}) => {
  return (
    <div
      className={`flex justify-start items-center w-full h-full p-2 bg-transparent hover:bg-primary-300 ${className}`}
      {...props}
    >
      <p className={`font-normal text-sm text-button ml-2`}>{text}</p>
    </div>
  );
};

export default ResultItem;
