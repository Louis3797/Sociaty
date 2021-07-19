import { OperationVariables, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_LIKE, DELETE_LIKE } from "../../../../graphql/mutations";
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
  const [deleteLike] = useMutation<any, OperationVariables>(DELETE_LIKE);
  const [createLike] = useMutation<any, OperationVariables>(CREATE_LIKE);
  function setLike(isLiked: boolean, userId, contentId): void {
    if (isLiked) {
      deleteLike({
        variables: {
          userId: userId,
          contentId: contentId,
        },
      });
    } else {
      createLike({
        variables: {
          userId: userId,
          contentId: contentId,
        },
      });
    }
  }

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
              setLike(like, sessionStorage.getItem("UID"), contentId);
              setlike(!like);
            }}
            liked={like}
          />

          <p className="text-sm font-normal ml-2 ">{likeAmount}</p>
        </div>
      </div>
      {visible && <CommentField contentId={contentId} />}
    </div>
  );
};

export default ContentItemList;
