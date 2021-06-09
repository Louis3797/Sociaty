import { OperationVariables, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_LIKE, DELETE_LIKE } from "../../../graphql/mutations";
import { ShareIcon, SolidChatBubble, SolidRocket } from "../../../icons";
import ButtonIcon from "../button/ButtonIcon";

export interface ContentItemListProps {
  commentAmount: number;
  likeAmount: number;
  liked: boolean;
  contentId: number;
}

const ContentItemList: React.FC<ContentItemListProps> = ({
  commentAmount,
  likeAmount,
  liked,
  contentId,
}) => {
  console.log(liked);
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
    <div className="items-center justify-end bg-transparent flex flex-row w-full h-5.5">
      <div className="flex items-center mr-7">
        <ButtonIcon size="small" click={() => {}} bgcolor="bg-secondary">
          <ShareIcon />
        </ButtonIcon>
      </div>
      <div className="flex flex-row items-center mr-7">
        <ButtonIcon size="small" click={() => {}} bgcolor="bg-secondary">
          <SolidChatBubble />
        </ButtonIcon>
        <p className="text-sm font-normal ml-2">{commentAmount}</p>
      </div>

      <div className="flex flex-row items-center mr-7">
        <ButtonIcon
          size="small"
          click={() => {
            setLike(like, parseInt(sessionStorage.getItem("UID")), contentId);
            setlike(!like);
          }}
          bgcolor="bg-secondary"
        >
          <SolidRocket className={`${like ? "text-error" : ""}`} />
        </ButtonIcon>

        <p className="text-sm font-normal ml-2 ">{likeAmount}</p>
      </div>
    </div>
  );
};

export default ContentItemList;
