import React from "react";
import SingleUserAvatar from "../../elements/UserAvatar/SingleUserAvatar";

export interface ProfileCompOneProps {
  name: string;
  img: string;
  email: string;
  bio: string;
}

const ProfileHeader: React.FC<ProfileCompOneProps> = ({
  name,
  img,
  email,
  bio,
}) => {
  return (
    <div className="flex flex-col w-full bg-primary-800 rounded-8">
      <div className="h-10 w-full bg-transparent">
        <img
          src="https://source.unsplash.com/random"
          alt="banner"
          className="object-cover h-15 w-full rounded-t-8"
        />
      </div>
      <div className="flex flex-row w-full h-auto bg-transparent justify-start items-center my-6 ">
        <SingleUserAvatar
          size="big"
          src={img}
          alt="User Avatar"
          className="mr-5 ml-5 mt-1"
        />

        <div className="flex flex-col w-full h-5/6 items-start text-justify mt-4">
          <p className="text-2xl font-semibold tracking-wide mt-1 text-button">
            {name}
          </p>
          <p className="text-primary-200 text-base tracking-wider">{email}</p>
        </div>
      </div>
      <p className="text-secondary-600 text-base tracking-wider ml-5 mb-4  font-medium">
        Status: {bio}
      </p>
    </div>
  );
};

export default ProfileHeader;
