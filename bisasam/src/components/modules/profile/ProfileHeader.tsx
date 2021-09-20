import { useSession } from "next-auth/react";
import React, { useContext, useState } from "react";
import { UserpageContext } from "../../../context/userpageContext";
import ButtonOutlined from "../../elements/button/ButtonOutlined";
import { SubscriptionButton } from "../../elements/profile/SubscribtionButton";
import SingleUserAvatar from "../../elements/UserAvatar/SingleUserAvatar";
import EditProfileModal from "../modal/EditProfileModal";

const ProfileHeader: React.FC = () => {
  const { data: session } = useSession();
  const [visible, setvisible] = useState(false);
  const [userdata, setUserdata] = useContext(UserpageContext);

  return (
    <div className="flex flex-col w-full bg-primary-800 rounded-8">
      <div className="h-10 w-full bg-transparent">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            userdata.bannerUrl === null || userdata.bannerUrl?.length === 0
              ? "https://source.unsplash.com/random"
              : userdata.bannerUrl
          }
          alt="banner"
          className="object-cover h-15 w-full rounded-t-8"
        />
      </div>
      <div className="flex flex-row w-full h-auto bg-transparent justify-start items-center my-6 ">
        <SingleUserAvatar
          size="big"
          src={userdata.image}
          alt="User Avatar"
          className="mr-5 ml-5 mt-1 bg-primary-800 p-1.5"
        />

        <div className="flex flex-col w-full h-5/6 items-start text-justify mt-4">
          <p className="text-2xl font-semibold mt-1 text-button">
            {userdata.displayName}
          </p>
          <p className="text-button text-opacity-40 text-base">
            @{userdata.name}
          </p>
        </div>
        {userdata.subscribed === "isCurrentUser" &&
        userdata.id === session?.user?.id ? (
          <ButtonOutlined
            text="Bearbeiten"
            variant="primary"
            size="big"
            className="mr-3"
            onClick={() => setvisible(true)}
          />
        ) : (
          <SubscriptionButton
            className="mr-3"
            status={userdata.subscribed}
            currentUserId={
              !!session && typeof session.user?.id === "string"
                ? session?.user?.id
                : ""
            }
            userId={userdata.id}
          />
        )}
      </div>
      <p className="text-secondary text-base tracking-wider ml-5 mb-4  font-medium">
        {userdata.bio ? userdata.bio : "Hey I'm new here !"}
      </p>
      <EditProfileModal
        isOpen={visible}
        onRequestClose={() => setvisible(false)}
        bannerUri={userdata.bannerUrl}
        displayedName={userdata.displayName}
        bio={userdata.bio ? userdata.bio : "Hey I'm new here !"}
      />
    </div>
  );
};

export default ProfileHeader;
