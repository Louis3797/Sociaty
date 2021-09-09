import Router, { useRouter } from "next/router";
import React from "react";
import MoreHorizRoundedIcon from "@material-ui/icons/MoreHorizRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import BlockRoundedIcon from "@material-ui/icons/BlockRounded";
import SingleUserAvatar from "../UserAvatar/SingleUserAvatar";
import ButtonDropdown from "../button/ButtonDropdown";
import DropdownItem from "../dropdown/DropdownItem";
import { DELETE_COMMENT } from "../../../graphql/mutations";
import { OperationVariables, useMutation } from "@apollo/client";
import { useSession } from "next-auth/client";

interface CommentHeadProps {
  img: string;
  name: string;
  userId: string;
  displayName: string;
  commentId: string;
  contentId: string;
}

const CommentHead: React.FC<CommentHeadProps> = ({
  img,
  name,
  userId,
  displayName,
  commentId,
  contentId,
}) => {
  const [session] = useSession();
  const router = useRouter();
  const [deleteComment] = useMutation<any, OperationVariables>(DELETE_COMMENT);

  const handleDeleteComment = (commentId: string): void => {
    deleteComment({
      variables: {
        commentId: commentId,
        contentId: contentId,
      },
    });
  };

  return (
    <div className="flex flex-row w-full h-7 items-center bg-primary-800 rounded-8">
      <SingleUserAvatar
        size="small"
        src={img}
        className=" ml-4 mr-4"
        alt="User Avatar"
        click={() =>
          router.push(
            `/u/${encodeURIComponent(
              decodeURIComponent(
                // @ts-ignore
                displayName
              ).replace(/\s+/g, "")
            )}`
          )
        }
      />
      <div className="flex flex-row w-full h-full items-center justify-evenly">
        <div className="flex flex-row w-full h-auto items-start text-justify">
          <p className="text-lg font-semibold text-button mr-1">
            {displayName}
          </p>
          <p className="text-button text-opacity-40 text-base">@{name}</p>
        </div>

        <ButtonDropdown
          icon={
            <MoreHorizRoundedIcon fontSize="default" className="text-button" />
          }
          variant="transparent"
          size="small"
          className="mx-5"
        >
          {userId === session?.user?.id && (
            <DropdownItem
              icon={<DeleteForeverRoundedIcon fontSize="default" />}
              text="Delete"
              textColor="text-like"
              onClick={() => {
                handleDeleteComment(commentId);
                Router.reload();
              }}
            />
          )}
          {userId !== session?.user?.id && (
            <DropdownItem
              icon={<BlockRoundedIcon fontSize="default" />}
              text="Block User"
              textColor="text-primary-200"
              onClick={() => {}}
            />
          )}
        </ButtonDropdown>
      </div>
    </div>
  );
};

export default CommentHead;
