import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import SingleUserAvatar from "../UserAvatar/SingleUserAvatar";

type ResultItemProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  name: string | null;
  displayName: string;
  image: string | null;
  className?: string;
};

const ResultItem: React.FC<ResultItemProps> = ({
  name,
  displayName,
  image,
  className,
  ...props
}) => {
  return (
    <div
      className={`flex flex-row items-center w-full h-full p-2 bg-transparent hover:bg-primary-300 justify-center ${className}`}
      {...props}
    >
      <SingleUserAvatar
        size="small"
        src={image ? image : ""}
        className=" ml-4 mr-4"
        alt=""
        click={() => {}}
      />
      <div className="flex flex-col  w-full h- h-full items-start justify-center">
        <p className="font-normal text-base text-button">{displayName}</p>
        <p className="text-button text-opacity-40 text-sm">@{name}</p>
      </div>
    </div>
  );
};

export default ResultItem;
