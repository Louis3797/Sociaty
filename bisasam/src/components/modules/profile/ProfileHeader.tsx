import React, { useState } from "react";
import ButtonOutlined from "../../elements/button/ButtonOutlined";
import SingleUserAvatar from "../../elements/UserAvatar/SingleUserAvatar";
import EditProfileModal from "../modal/EditProfileModal";

export interface ProfileCompOneProps {
  name: string;
  displayName: string;
  img: string;
  bannerUrl: string | null;
  bio: string;
}

const ProfileHeader: React.FC<ProfileCompOneProps> = ({
  name,
  displayName,
  img,
  bannerUrl,
  bio,
}) => {
  const [visible, setvisible] = useState(false);
  return (
    <div className="flex flex-col w-full bg-primary-800 rounded-8">
      <div className="h-10 w-full bg-transparent">
        <img
          src={
            bannerUrl === null || bannerUrl?.length === 0
              ? "https://source.unsplash.com/random"
              : bannerUrl
          }
          alt="banner"
          className="object-cover h-15 w-full rounded-t-8"
        />
      </div>
      <div className="flex flex-row w-full h-auto bg-transparent justify-start items-center my-6 ">
        <SingleUserAvatar
          size="big"
          src={img}
          alt="User Avatar"
          className="mr-5 ml-5 mt-1 bg-primary-800 p-1.5"
        />

        <div className="flex flex-col w-full h-5/6 items-start text-justify mt-4">
          <p className="text-2xl font-semibold mt-1 text-button">
            {displayName}
          </p>
          <p className="text-button text-opacity-40 text-base">@{name}</p>
        </div>
        <ButtonOutlined
          text="Bearbeiten"
          variant="primary"
          size="big"
          className="mr-3"
          onClick={() => setvisible(true)}
        />
      </div>
      <p className="text-secondary text-base tracking-wider ml-5 mb-4  font-medium">
        {bio}
      </p>
      <EditProfileModal
        isOpen={visible}
        onRequestClose={() => setvisible(false)}
        bannerUri={bannerUrl}
        displayedName={displayName}
        bio={bio}
      />
    </div>
  );
};

export default ProfileHeader;
