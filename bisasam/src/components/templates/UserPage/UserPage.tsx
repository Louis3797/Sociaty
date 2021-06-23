import React, { useEffect, useState } from "react";
import { RootProps } from "../../../pages/u/[id]";
import MainLayout from "../../layouts/MainLayout";
import ListContent from "../../modules/content/ListContent";
import ProfileContent from "../../modules/profile/ProfileContent";
import ProfileHeader from "../../modules/profile/ProfileHeader";
import ProfileInfoBox from "../../modules/profile/ProfileInfoBox";

interface UserPageProps {
  data: RootProps;
}

const UserPage: React.FC<UserPageProps> = ({ data }) => {
  const [userdata, setuserdata] = useState(null);

  useEffect(() => {
    setuserdata(data.getUserData);
  }, []);

  return (
    <MainLayout
      rightPanel={
        <div className="w-full h-full">
          <h1>Hallooo</h1>
        </div>
      }
    >
      <div className="flex flex-col w-full items-center bg-transparent h-auto">
        <ProfileHeader
          name={userdata?.name}
          img={userdata?.image}
          displayName={userdata?.displayName}
          bannerUrl={userdata?.bannerUrl}
          bio={userdata?.bio ? userdata?.bio : "Hey im new here"}
        />
        <ProfileInfoBox
          follower={userdata?.numFollowers}
          follows={userdata?.numFollowing}
          posts={userdata?.numContributions}
        />
        <ProfileContent />
      </div>
    </MainLayout>
  );
};

export default UserPage;
