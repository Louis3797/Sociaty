import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useSnackbar, VariantType } from "notistack";
import { useHandleContentLike } from "../../../../hooks/useHandleContentLike";
import { LikeButton, ShareButton } from "../ContentButtons";

interface ContentItemListProps {
  commentAmount: number;
  likeAmount: number;
  liked: boolean;
  contentId: string;
  userId: string;
  time: string;
}

const ContentItemList: React.FC<ContentItemListProps> = ({
  commentAmount,
  likeAmount,
  liked,
  contentId,
  userId,
  time,
}) => {
  const [like, setlike] = useState(liked);
  const [likeHandler] = useHandleContentLike();
  const [numLikes, setnumLikes] = useState(likeAmount);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleAlert = (variant: VariantType): void => {
    enqueueSnackbar("Copied Link", { variant: variant });
  };

  useEffect(() => {
    setlike(liked);
  }, [liked]);

  return (
    <div className="items-center justify-center flex flex-col w-full h-auto rounded-b-8 bg-primary-800">
      <div className="items-center justify-start flex flex-row w-full h-auto">
        <div className="items-center justify-start flex flex-row w-auto h-full px-4">
          <p className="font-bold mr-1">{commentAmount}</p>
          <p className="text-primary-200">Kommentare</p>
        </div>
        <div className="items-center justify-start flex flex-row w-auto h-full px-4">
          <p className="font-bold mr-1">{numLikes}</p>
          <p className="text-primary-200">{'"Gefällt-mir" Angaben'}</p>
        </div>
        <Moment className="text-button text-opacity-40 text-base px-4" fromNow>
          {time}
        </Moment>
      </div>
      <div className="items-center justify-around flex flex-row w-full h-7">
        <ShareButton
          size="big"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            handleAlert("info");
          }}
        />
        <LikeButton
          size="big"
          onClick={() => {
            likeHandler(like, sessionStorage.getItem("UID"), contentId);
            if (like) {
              setnumLikes(numLikes - 1);
            } else {
              setnumLikes(numLikes + 1);
            }
            setlike(!like);
          }}
          liked={like}
        />
      </div>
    </div>
  );
};

export default ContentItemList;
