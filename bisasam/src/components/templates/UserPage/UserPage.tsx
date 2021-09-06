// @ts-nocheck

import React, { useEffect, useState } from "react";
import { RootProps } from "../../../pages/u/[name]";
import MainLayout from "../../layouts/MainLayout";
import ProfileContent from "../../modules/profile/ProfileContent";
import ProfileHeader from "../../modules/profile/ProfileHeader";
import ProfileInfoBox from "../../modules/profile/ProfileInfoBox";

interface UserPageProps {
  data: RootProps;
}

const UserPage: React.FC<UserPageProps> = ({ data }) => {
  const [userdata, setuserdata] = useState(null);

  useEffect(() => {
    return setuserdata(data.getUserData);
  }, [data]);

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
          userId={userdata?.id}
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

// {
//   "User:ckrf7xswh0008b4ttmdodw4sf": {
//       "id": "ckrf7xswh0008b4ttmdodw4sf",
//       "__typename": "User",
//       "name": "Gamer 3797",
//       "displayName": "Louis2002",
//       "image": "https://lh3.googleusercontent.com/a-/AOh14GgFSr2cUejuPJ3mffa6ajFGTq7DYLpIm5f7Hr7MmQ=s96-c",
//       "bannerUrl": "https://pbs.twimg.com/media/EtXfpgGWYAEIa7y.jpg:large",
//       "bio": "Hey im new here",
//       "created_at": "2021-07-22T17:58:52.000Z",
//       "numFollowing": 0,
//       "numFollowers": 0,
//       "numContributions": 17,
//       "online": false
//   },
//   "ROOT_QUERY": {
//       "__typename": "Query",
//       "getUserData({\"displayName\":\"Louis2002\"})": {
//           "__ref": "User:ckrf7xswh0008b4ttmdodw4sf"
//       }
//   }
// }
