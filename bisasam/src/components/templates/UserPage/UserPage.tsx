import React, { useState } from "react";
import { UserpageContext } from "../../../context/userpageContext";
import { RootProps } from "../../../pages/u/[name]";
import MainLayout from "../../layouts/MainLayout";
import ProfileContent from "../../modules/profile/ProfileContent";
import ProfileHeader from "../../modules/profile/ProfileHeader";
import ProfileInfoBox from "../../modules/profile/ProfileInfoBox";

interface UserPageProps {
  data: RootProps;
}

const UserPage: React.FC<UserPageProps> = ({ data }) => {
  const [userdata, setUserdata] = useState<Object>(data.getUserData);
  return (
    <MainLayout
      rightPanel={
        <div className="w-full h-full">
          <h1>Hallooo</h1>
        </div>
      }
    >
      <div className="flex flex-col w-full items-center bg-transparent h-auto">
        <UserpageContext.Provider value={[userdata, setUserdata]}>
          <ProfileHeader />
          <ProfileInfoBox />
          <ProfileContent />
        </UserpageContext.Provider>
      </div>
    </MainLayout>
  );
};

export default UserPage;
