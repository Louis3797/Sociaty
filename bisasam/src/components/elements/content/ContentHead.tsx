import React from "react";
import SingleUserAvatar from "../UserAvatar/SingleUserAvatar";

export interface ContentHeadProps {
  img: string;
  name: string;
  userId: string;
}

const ContentHead: React.FC<ContentHeadProps> = ({ img, name, userId }) => {
  return (
    <div className="flex flex-row w-full h-7 items-center bg-transparent">
      <SingleUserAvatar
        size="small"
        src={img}
        className=" ml-4 mr-4"
        alt="User Avatar"
      />
      <p className="text-lg font-semibold tracking-wide ">{name}</p>
    </div>
  );
};

export default ContentHead;