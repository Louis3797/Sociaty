import React from "react";
import { useRouter } from "next/router";
import MoreHorizRoundedIcon from "@material-ui/icons/MoreHorizRounded";
import SingleUserAvatar from "../../UserAvatar/SingleUserAvatar";

interface ContentHeadProps {
  img: string;
  name: string;
  userId: string;
  time: string;
}

const ContentHead: React.FC<ContentHeadProps> = ({
  img,
  name,
  userId,
  time,
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-row w-full h-9 items-center bg-primary-800 rounded-t-8">
      <SingleUserAvatar
        size="small"
        src={img}
        className=" ml-4 mr-4"
        alt="User Avatar"
        click={() => router.push(`/u/${userId}`)}
      />
      <div className="flex flex-row w-full h-full items-center justify-between">
        <div className="flex flex-col h-full items-start justify-center">
          <p className="text-xl font-semibold tracking-wide ">{name}</p>
          <p className="text-sm text-button text-opacity-40 ">{time}</p>
        </div>
        <MoreHorizRoundedIcon fontSize="default" className="text-button mx-5" />
      </div>
    </div>
  );
};

export default ContentHead;
