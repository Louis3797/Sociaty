import React, { DetailedHTMLProps, ImgHTMLAttributes } from "react";

type SingleUserAvatarProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  src: string;
  size: "big" | "small";
  className?: string;
  alt: string;
  click?: (event: React.MouseEvent<HTMLImageElement>) => void;
};

const sizeClassnames = {
  big: "w-10 h-10",
  small: "w-6 h-6",
};

const SingleUserAvatar: React.FC<SingleUserAvatarProps> = ({
  src,
  size,
  className,
  alt,
  click,
}) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      onClick={click}
      src={src}
      alt={alt}
      className={`${sizeClassnames[size]} rounded-full object-cover ${className}`}
    />
  );
};

export default SingleUserAvatar;
