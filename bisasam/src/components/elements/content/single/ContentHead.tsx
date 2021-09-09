import Router, { useRouter } from "next/router";
import React from "react";
import MoreHorizRoundedIcon from "@material-ui/icons/MoreHorizRounded";
import SingleUserAvatar from "../../UserAvatar/SingleUserAvatar";
import ButtonDropdown from "../../button/ButtonDropdown";
import DropdownItem from "../../dropdown/DropdownItem";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import BlockRoundedIcon from "@material-ui/icons/BlockRounded";
import { OperationVariables, useMutation } from "@apollo/client";
import { DELETE_POST } from "../../../../graphql/mutations";
import { useSession } from "next-auth/client";
import Moment from "react-moment";
import { Stringifier } from "postcss";
import { SubscriptionButtonLink } from "../../profile/SubscribtionButton";
interface ContentHeadProps {
  img: string;
  userId: string;
  contentId: string;
  displayName: string;
  time: string;
  subscribed: string;
}

const ContentHead: React.FC<ContentHeadProps> = ({
  img,
  userId,
  contentId,
  displayName,
  time,
  subscribed,
}) => {
  const [session] = useSession();
  const router = useRouter();

  const [deletePost] = useMutation<any, OperationVariables>(DELETE_POST);

  const handleDeletePost = (userId: string, contentId: string): void => {
    deletePost({
      variables: {
        userId: userId,
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
        <div className="flex flex-col w-full h-auto items-start text-justify">
          <p className="text-lg font-semibold text-button mr-1">
            {displayName}
          </p>

          <Moment className="text-button text-opacity-40 text-base" fromNow>
            {time}
          </Moment>
        </div>

        {subscribed !== "isCurrentUser" && userId !== session?.user?.id && (
          <SubscriptionButtonLink
            className=""
            status={subscribed}
            currentUserId={!!session ? session?.user?.id : ""}
            userId={userId}
          />
        )}
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
                handleDeletePost(userId, contentId);
                Router.reload();
                router.push(`/u/${sessionStorage.getItem("UID")}`);
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

export default ContentHead;
