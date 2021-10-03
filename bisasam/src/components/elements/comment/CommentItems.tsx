import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useHandleCommentLike } from "../../../hooks/useHandleCommentLike";
import { LikeButton } from "../content/ContentButtons";

export interface CommentItemsProps {
  likeAmount: number;
  liked: boolean;
  commentId: string;
  time: string;
}

const CommentItems: React.FC<CommentItemsProps> = ({
  likeAmount,
  liked,
  commentId,
  time,
}) => {
  const [likeHandler] = useHandleCommentLike();
  const [like, setlike] = useState(liked);
  const [numLikes, setnumLikes] = useState(likeAmount);

  useEffect(() => {
    setlike(liked);
  }, [liked]);

  return (
    <div className="items-center justify-between flex flex-row w-full h-auto rounded-b-8 bg-primary-800">
      <Moment className="text-button text-opacity-40 text-base px-4" fromNow>
        {time}
      </Moment>
      <div className="items-center justify-start flex flex-row w-auto h-full px-4">
        <p className="font-bold mr-1">{numLikes}</p>
        <LikeButton
          size="big"
          onClick={() => {
            // @ts-ignore
            likeHandler(like, window.sessionStorage.getItem("UID"), commentId);
            if (like) {
              setnumLikes(numLikes - 1);
            } else {
              setnumLikes(numLikes + 1);
            }
            setlike(!like);
            console.log(like);
          }}
          liked={like}
        />
      </div>
    </div>
  );
};

export default CommentItems;
