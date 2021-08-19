import { OperationVariables, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_LIKE, DELETE_LIKE } from "../../../../graphql/mutations";
import { useHandleContentLike } from "../../../../hooks/useHandleContentLike";
import CommentField from "../../comment/CommentField";
import { CommentButton, LikeButton, ShareButton } from "../ContentButtons";

interface ContentItemListProps {
  commentAmount: number;
  likeAmount: number;
  liked: boolean;
  contentId: string;
}

const ContentItemList: React.FC<ContentItemListProps> = ({
  commentAmount,
  likeAmount,
  liked,
  contentId,
}) => {
  const [visible, setvisible] = useState(false);
  const [like, setlike] = useState(liked);
  const [likeHandler] = useHandleContentLike();
  const [numLikes, setnumLikes] = useState(likeAmount);

  return (
    <div className="items-center justify-center bg-primary-800 flex flex-col w-full h-auto rounded-8">
      <div className="items-center justify-evenly flex flex-row w-full h-5.5">
        <div className="flex items-center mr-7">
          <ShareButton size="small" onClick={() => {}} />
        </div>
        <div className="flex flex-row items-center mr-7">
          <CommentButton
            size="small"
            onClick={() => {
              setvisible(!visible);
            }}
          />
          <p className="text-sm font-normal ml-2">{commentAmount}</p>
        </div>

        <div className="flex flex-row items-center mr-7">
          <LikeButton
            size="small"
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

          <p className="text-sm font-normal ml-2 ">{numLikes}</p>
        </div>
      </div>
      {visible && <CommentField contentId={contentId} />}
    </div>
  );
};

export default ContentItemList;
