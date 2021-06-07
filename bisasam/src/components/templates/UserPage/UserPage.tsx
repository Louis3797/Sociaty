import React from "react";
import Content from "../../elements/Content";
import ProfileContentFeed from "../../modules/ProfileContentFeed";
import ProfileHeader from "../../modules/ProfileHeader";
import ProfileInfoBox from "../../modules/ProfileInfoBox";

export interface UserProps {
  findUser: any;
}

interface UserPageProps {
  data?: UserProps;
}

const UserPage: React.FC<UserPageProps> = ({ data }) => {
  return (
    <div className="flex flex-col w-full h-screen bg-primary-900 items-center">
      <div className="flex flex-col max-w-2xl items-center bg-transparent mt-15 h-auto">
        <ProfileHeader
          name={data.findUser.name}
          img={data.findUser.image}
          email={data.findUser.email}
          bio={data.findUser.bio ? data.findUser.bio : "Hey im new here"}
        />
        <ProfileInfoBox follower={0} follows={0} posts={0} />
        <div className="flex flex-col w-full h-full bg-transparent items-center justify-start mt-10">
          <Content
            name={data.findUser.name}
            userImg={data.findUser.image}
            text={data.findUser.content[0].content_text}
            likeAmount={data.findUser.content[0].liked.length}
            commentAmount={
              data.findUser.content[0].comments === null
                ? 0
                : data.findUser.content[0].comments.length
            }
          />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
