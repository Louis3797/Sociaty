import React from "react";
import ProfileHeader from "../../modules/ProfileHeader";
import ProfileInfoBox from "../../modules/ProfileInfoBox";

export interface UserProps {
  findUser: any;
  id: number;
  name: string;
  email: string;
  image: string;
  bio: string;
  follower?: number;
  follows?: number;
  posts?: number;
  text?: string;
  contentImg?: string;
  commentAmount?: number;
  likeAmount?: number;
}

interface UserPageProps {
  data?: UserProps;
}

const UserPage: React.FC<UserPageProps> = ({ data }) => {
  return (
    <div className="flex flex-col w-full h-screen bg-primary-900 items-center">
      <div className="flex flex-col max-w-2xl items-center mt-15 h-auto">
        <ProfileHeader
          name={data.findUser.name}
          img={data.findUser.image}
          email={data.findUser.email}
          bio={data.findUser.bio ? data.findUser.bio : "Hey im new here"}
        />
        <ProfileInfoBox follower={0} follows={0} posts={0} />
        <div className="flex flex-colw-full f-full bg-transparent items-center justify-start mt-10">
          <h2>Much emty here :(</h2>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
