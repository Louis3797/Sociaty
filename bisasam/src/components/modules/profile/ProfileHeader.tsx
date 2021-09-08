import { useSession } from "next-auth/client";
import React, { useEffect, useState } from "react";
import useHandleSubscription from "../../../hooks/useHandleSubscribtion";
import ButtonOutlined from "../../elements/button/ButtonOutlined";
import SubscriptionButton from "../../elements/profile/SubscribtionButton";
import SingleUserAvatar from "../../elements/UserAvatar/SingleUserAvatar";
import EditProfileModal from "../modal/EditProfileModal";

export interface ProfileCompOneProps {
  name: string;
  displayName: string;
  img: string;
  bannerUrl: string | null;
  bio: string;
  userId: string;
  subscribed: string;
}

const ProfileHeader: React.FC<ProfileCompOneProps> = ({
  name,
  displayName,
  img,
  bannerUrl,
  bio,
  userId,
  subscribed,
}) => {
  const [session] = useSession();
  const [visible, setvisible] = useState(false);
  const [sub, setSub] = useState<boolean>(
    subscribed === "true" ? true : subscribed === "false" ? false : false
  );

  const [handleSub] = useHandleSubscription();

  useEffect(() => {
    setSub(
      subscribed === "true" ? true : subscribed === "false" ? false : false
    );
    return () => {
      sub;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribed]);
  return (
    <div className="flex flex-col w-full bg-primary-800 rounded-8">
      <div className="h-10 w-full bg-transparent">
        {/* eslint-disable-next-line @next/next/no-img-element */}
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
        {subscribed === "isCurrentUser" && userId === session?.user?.id ? (
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
            status={sub}
            onClick={() => {
              handleSub(sub, !!session ? session?.user.id : "", userId);
              setSub(!sub);
            }}
          />
        )}
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
