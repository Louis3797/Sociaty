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
          content_id: contentId,
        },
      });
    } else {
      createLike({
        variables: {
          userId: userId,
          content_id: contentId,
        },
      });
    }
  }

  return (
    <div className="items-center justify-center flex flex-col w-full h-auto rounded-b-8">
      <div className="items-center justify-start flex flex-row w-full h-6">
        <div className="items-center justify-start flex flex-row w-auto h-full px-4">
          <p className="font-bold mr-1">{commentAmount}</p>
          <p className="text-primary-200">Kommentare</p>
        </div>
        <div className="items-center justify-start flex flex-row w-auto h-full px-4">
          <p className="font-bold mr-1">{likeAmount}</p>
          <p className="text-primary-200">"Gefällt-mir" Angaben</p>
        </div>
      </div>
      <div className="items-center justify-around flex flex-row w-full h-7">
        <ShareButton size="big" click={() => {}} />

        <CommentButton
          size="big"
          click={() => {
            setvisible(!visible);
          }}
        />

        <LikeButton
          size="big"
          click={() => {
            setLike(like, parseInt(sessionStorage.getItem("UID")), contentId);
            setlike(!like);
          }}
          liked={like}
        />
      </div>
      {visible && <CommentField contentId={contentId} />}
    </div>
  );
};

export default ContentItemList;
