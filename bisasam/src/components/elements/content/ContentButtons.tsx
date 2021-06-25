import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import ShareRoundedIcon from "@material-ui/icons/ShareRounded";

type ContentButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  className?: string;
  size: "big" | "small";
  click: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

type LikeButtonProps = ContentButtonProps & {
  liked?: boolean;
};

const sizeClassnames = {
  big: "w-5.5 h-5.5",
  small: "w-5 h-5",
};

export const LikeButton: React.FC<LikeButtonProps> = ({
  size,
  click,
  liked,
}) => {
  return (
    <button
      className={`flex hover:bg-like hover:bg-opacity-25 hover:text-like rounded-full items-center  justify-center cursor-pointer focus:outline-none transition duration-200 ease-in-out ${sizeClassnames[size]}`}
      onClick={click}
    >
      {liked ? (
        <FavoriteRoundedIcon fontSize="small" className="text-like" />
      ) : (
        <FavoriteBorderRoundedIcon fontSize="small" />
      )}
    </button>
  );
};

export const CommentButton: React.FC<ContentButtonProps> = ({
  size,
  click,
}) => {
  return (
    <button
      className={`flex hover:bg-comment hover:bg-opacity-25 hover:text-comment text-button rounded-full items-center  justify-center cursor-pointer focus:outline-none transition duration-200 ease-in-out ${sizeClassnames[size]}`}
      onClick={click}
    >
      {<ChatBubbleOutlineRoundedIcon fontSize="small" />}
    </button>
  );
};

export const ShareButton: React.FC<ContentButtonProps> = ({ size, click }) => {
  return (
    <button
      className={`flex hover:bg-share hover:bg-opacity-25 hover:text-share text-button rounded-full items-center  justify-center cursor-pointer focus:outline-none transition duration-200 ease-in-out ${sizeClassnames[size]}`}
      onClick={click}
    >
      {<ShareRoundedIcon fontSize="small" />}
    </button>
  );
};
