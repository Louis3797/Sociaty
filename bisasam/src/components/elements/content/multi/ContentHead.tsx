import { useRouter } from "next/router";
import React from "react";
import MoreHorizRoundedIcon from "@material-ui/icons/MoreHorizRounded";
import SingleUserAvatar from "../../UserAvatar/SingleUserAvatar";
import Moment from "react-moment";

interface ContentHeadProps {
  img: string;
  name: string;
  userId: string;
  time: string;
  displayName: string;
}

const ContentHead: React.FC<ContentHeadProps> = ({
  img,
  name,
  userId,
  time,
  displayName,
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-row w-full h-7 items-center bg-primary-800 rounded-8">
      <SingleUserAvatar
        size="small"
        src={img}
        className=" ml-4 mr-4"
        alt="User Avatar"
        click={() => router.push(`/u/${userId}`)}
      />
      <div className="flex flex-row w-full h-full items-center justify-evenly">
        <div className="flex flex-row w-full h-auto items-start text-justify">
          <p className="text-lg font-semibold text-button mr-1">
            {displayName}
          </p>
          <p className="text-button text-opacity-40 text-base">@{name}</p>
          <span className="text-button text-opacity-40 text-base font-extrabold mx-1">
            ·
          </span>
          <Moment className="text-button text-opacity-40 text-base" fromNow>
            {time}
          </Moment>
        </div>

        <MoreHorizRoundedIcon fontSize="default" className="text-button mx-5" />
      </div>
    </div>
  );
};

export default ContentHead;
