import React from "react";
import ProfileHeader from "../../elements/ProfileHeader";
import ProfileInfoBox from "../../elements/ProfileInfoBox";

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
    <div className="flex flex-col w-full h-screen bg-bg items-center">
      <div className="flex flex-col w-11/12 items-center mt-40 h-auto">
        <ProfileHeader
          name={data.findUser.name}
          img={data.findUser.image}
          email={data.findUser.email}
          bio={data.findUser.bio ? data.findUser.bio : "Hey im new here"}
        />
        <ProfileInfoBox follower={0} follows={0} posts={0} />
        <div className="flex flex-col 2xl:w-2/5 lg:w-3/5 md:w-2/5 sm:w-3/5 f-full bg-transparent items-center justify-start mt-10">
          <h2>Much emty here :(</h2>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
